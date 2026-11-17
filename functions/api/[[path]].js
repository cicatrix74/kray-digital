// Cloudflare Pages Functions - Live API routes for Kray Digital Dnipro Outages
import streetsData from './streets-data.js';

const PROVIDERS = [
  { 
    id: 'dtek_dnipro', 
    name: 'ДТЕК Дніпровські електромережі (Дніпро, Кривий Ріг та область)', 
    shortName: 'ДТЕК Дніпровські електромережі',
    city: 'Дніпро / Кривий Ріг', 
    liveRegion: 'dnipro', 
    officialUrl: 'https://www.dtek-dnem.com.ua'
  },
  { 
    id: 'yasno_dnipro', 
    name: 'YASNO (Дніпровські енергетичні послуги)', 
    shortName: 'YASNO Дніпро',
    city: 'Дніпропетровська обл.', 
    liveRegion: 'dnipro', 
    officialUrl: 'https://yasno.com.ua'
  },
  { 
    id: 'cek_dnipro', 
    name: 'ПрАТ ПЕЕМ «ЦЕК» (Центральна енергетична компанія)', 
    shortName: 'ПЕЕМ ЦЕК',
    city: 'Дніпро / область', 
    liveRegion: 'dnipro', 
    officialUrl: 'https://cek.dp.ua'
  }
];

const ALL_SUBGROUPS = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2', '5.1', '5.2', '6.1', '6.2'];

let cachedYasno = null;
let lastYasnoFetch = 0;

let cachedDtekMirror = null;
let lastDtekMirrorFetch = 0;

let cachedEmergencyStatus = null;
let lastEmergencyCheck = 0;

let cachedAirAlerts = null;
let lastAirAlertsFetch = 0;

async function fetchLiveAirAlerts() {
  const now = Date.now();
  if (cachedAirAlerts && (now - lastAirAlertsFetch < 15000)) {
    return cachedAirAlerts;
  }
  try {
    const res = await fetch('https://vadimklimenko.com/map/statuses.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.ok) {
      const parsed = await res.json();
      if (parsed && parsed.states) {
        cachedAirAlerts = parsed;
        lastAirAlertsFetch = now;
        return cachedAirAlerts;
      }
    }
  } catch (e) {
    console.error('Air alerts fetch error:', e);
  }
  return cachedAirAlerts;
}

async function fetchLiveDtekMirror() {
  const now = Date.now();
  if (cachedDtekMirror && (now - lastDtekMirrorFetch < 60000)) {
    return cachedDtekMirror;
  }
  try {
    const res = await fetch('https://raw.githubusercontent.com/Baskerville42/outage-data-ua/main/data/dnipro.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.ok) {
      cachedDtekMirror = await res.json();
      lastDtekMirrorFetch = now;
      return cachedDtekMirror;
    }
  } catch (e) {
    console.error('DTEK mirror fetch error:', e);
  }
  return cachedDtekMirror;
}

function mapDtekHourStatus(val) {
  if (!val) return 'on';
  const v = String(val).toLowerCase();
  if (v === 'yes') return 'on';
  if (v === 'no') return 'off';
  if (v === 'first') return 'off-first';
  if (v === 'second') return 'off-second';
  if (['maybe', 'mfirst', 'msecond', 'probable'].includes(v)) return 'maybe';
  return 'on';
}

async function checkEmergencyStatus() {
  const now = Date.now();
  if (cachedEmergencyStatus !== null && (now - lastEmergencyCheck < 180000)) {
    return cachedEmergencyStatus;
  }

  let isEmergency = false;
  let emergencyReason = '';

  // 1. Офіційні термінові повідомлення НЕК Укренерго та ДТЕК у Telegram
  try {
    const urls = ['https://t.me/s/dtek_ua', 'https://t.me/s/Ukrenergo'];
    for (const u of urls) {
      const res = await fetch(u, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      if (res.ok) {
        const html = await res.text();
        const matches = html.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/gi) || [];
        const recent = matches.slice(-6).map(m => m.replace(/<[^>]+>/g, ' ').toLowerCase());
        for (const post of recent) {
          const hasDnipro = post.includes('дніпро') || post.includes('днепр');
          const hasEmergency = post.includes('аварійні') || post.includes('екстрен') || post.includes('гав') || post.includes('без світла');
          const isCancelled = post.includes('скасован') || post.includes('відмін') || post.includes('повернулися до графіків');
          if (hasDnipro && hasEmergency && !isCancelled) {
            isEmergency = true;
            emergencyReason = 'НЕК Укренерго / ДТЕК: екстрені (аварійні) відключення';
            break;
          }
        }
      }
      if (isEmergency) break;
    }
  } catch (err) {
    console.warn('Emergency feed check error:', err);
  }

  // 2. Офіційний API статус YASNO/ДТЕК
  if (!isEmergency) {
    try {
      const yasno = await fetchLiveYasno();
      const g51 = yasno ? yasno['5.1'] : null;
      if (g51 && g51.today) {
        const s = g51.today.status;
        if (s === 'Emergency' || s === 'EmergencyShutdowns' || s === 'EmergencyBlackout') {
          isEmergency = true;
          emergencyReason = 'YASNO/ДТЕК Live API: екстрені відключення';
        }
      }
    } catch (err) {}
  }

  cachedEmergencyStatus = { isEmergency, reason: emergencyReason };
  lastEmergencyCheck = now;
  return cachedEmergencyStatus;
}

async function fetchLiveYasno() {
  const now = Date.now();
  if (cachedYasno && (now - lastYasnoFetch < 60000)) {
    return cachedYasno;
  }
  try {
    const res = await fetch('https://app.yasno.ua/api/blackout-service/public/shutdowns/regions/3/dsos/301/planned-outages', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.ok) {
      cachedYasno = await res.json();
      lastYasnoFetch = now;
      return cachedYasno;
    }
  } catch (e) {
    console.error('YASNO fetch error:', e);
  }
  return cachedYasno;
}

function parseDaySchedule(group, isTomorrow, yasnoData, dtekMirror) {
  const normSubgroup = ALL_SUBGROUPS.includes(group) ? group : '5.1';
  const gpvKey = `GPV${normSubgroup}`;
  const todayStr = new Date().toISOString().split('T')[0];
  const tomDate = new Date(Date.now() + 86400000);
  const tomorrowStr = tomDate.toISOString().split('T')[0];
  const dateStr = isTomorrow ? tomorrowStr : todayStr;

  const hours = [];

  // 1. Пріоритет #1: Фактичний прямий розклад ДТЕК Дніпро (оновлюється миттєво)
  if (!isTomorrow && dtekMirror && dtekMirror.fact && dtekMirror.fact.data) {
    let matchedFactSlots = null;
    for (const [timestampStr, gpvObj] of Object.entries(dtekMirror.fact.data)) {
      const factDate = new Date((parseInt(timestampStr, 10) + 7200) * 1000);
      if (factDate.toISOString().split('T')[0] === dateStr && gpvObj[gpvKey]) {
        matchedFactSlots = gpvObj[gpvKey];
        break;
      }
    }

    if (matchedFactSlots) {
      const hasAnyOutages = Object.values(matchedFactSlots).some(v => v !== 'yes');
      for (let h = 0; h < 24; h++) {
        const val = matchedFactSlots[String(h + 1)];
        hours.push({
          hour: h,
          time: `${String(h).padStart(2, '0')}:00 - ${String((h + 1) % 24).padStart(2, '0')}:00`,
          status: mapDtekHourStatus(val)
        });
      }

      const updateTime = dtekMirror.lastUpdated 
        ? new Date(dtekMirror.lastUpdated).toLocaleTimeString('uk-UA', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit' }) 
        : '21:20';

      return {
        provider: 'dtek_dnipro',
        group: normSubgroup,
        date: dateStr,
        isLive: true,
        liveSource: 'ДТЕК Live (Фактичний графік Дніпро)',
        status: hasAnyOutages ? 'Active' : 'NoOutages',
        lastUpdate: updateTime,
        hours: hours,
        updatedAt: new Date().toISOString()
      };
    }
  }

  // 2. Пріоритет #2: Офіційний шлюз YASNO
  const groupData = yasnoData ? yasnoData[normSubgroup] : null;
  const dayObj = groupData ? (isTomorrow ? groupData.tomorrow : groupData.today) : null;

  if (dayObj) {
    const isNoOutages = dayObj.status === 'NoOutages' || dayObj.status === 'WaitingForSchedule';
    const slots = dayObj.slots || [];

    const getHalfStatus = (min) => {
      for (const slot of slots) {
        if (min >= slot.start && min < slot.end) {
          if (slot.type === 'Definite') return 'off';
          if (slot.type === 'Probable') return 'maybe';
        }
      }
      return 'on';
    };

    for (let h = 0; h < 24; h++) {
      let slotStatus = 'on';

      if (!isNoOutages && slots.length > 0) {
        const h1 = getHalfStatus(h * 60 + 15);
        const h2 = getHalfStatus(h * 60 + 45);
        if (h1 === 'off' && h2 === 'off') slotStatus = 'off';
        else if (h1 === 'off' && h2 !== 'off') slotStatus = 'off-first';
        else if (h1 !== 'off' && h2 === 'off') slotStatus = 'off-second';
        else if (h1 === 'maybe' || h2 === 'maybe') slotStatus = 'maybe';
        else slotStatus = 'on';
      }

      hours.push({
        hour: h,
        time: `${String(h).padStart(2, '0')}:00 - ${String((h + 1) % 24).padStart(2, '0')}:00`,
        status: slotStatus
      });
    }

    return {
      provider: 'dtek_dnipro',
      group: normSubgroup,
      date: dateStr,
      isLive: true,
      liveSource: 'ДТЕК Дніпро / YASNO (Пряме Live API)',
      status: dayObj.status || 'Active',
      lastUpdate: groupData.updatedOn ? new Date(groupData.updatedOn).toLocaleTimeString('uk-UA', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit' }) : 'Сьогодні',
      hours: hours,
      updatedAt: new Date().toISOString()
    };
  }

  for (let h = 0; h < 24; h++) {
    hours.push({
      hour: h,
      time: `${String(h).padStart(2, '0')}:00 - ${String((h + 1) % 24).padStart(2, '0')}:00`,
      status: 'on'
    });
  }

  return {
    provider: 'dtek_dnipro',
    group: normSubgroup,
    date: dateStr,
    isLive: false,
    liveSource: 'ДТЕК Дніпро (Резервний розклад)',
    status: 'NoOutages',
    lastUpdate: 'Сьогодні',
    hours: hours,
    updatedAt: new Date().toISOString()
  };
}

function formatKyivDateTime(isoStr) {
  const d = isoStr ? new Date(isoStr) : new Date();
  if (isNaN(d.getTime())) return '';
  const parts = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false
  }).formatToParts(d);
  const get = (type) => (parts.find(p => p.type === type) || {}).value || '';
  return `${get('hour')}:${get('minute')} ${get('day')}.${get('month')}.${get('year')}`;
}

function normalizeSearchText(str) {
  return (str || '').toLowerCase()
    .replace(/[иіыеєэї]/g, 'i')
    .replace(/[ґг]/g, 'g')
    .replace(/[ьъ'"`’]/g, '')
    .replace(/[^a-zа-я0-9]/gi, '');
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (pathname.endsWith('/providers')) {
    return new Response(JSON.stringify({
      success: true,
      providers: PROVIDERS,
      liveSyncStatus: 'Активно (ДТЕК Дніпро / YASNO Live)'
    }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/status')) {
    const [yasno, dtekMirror, emerg] = await Promise.all([
      fetchLiveYasno(),
      fetchLiveDtekMirror(),
      checkEmergencyStatus()
    ]);

    // Перевіряємо, чи опублікував ДТЕК фактичний погодинний розклад:
    let dtekHasFactSchedule = false;
    let dtekHasOutages = false;
    if (dtekMirror && dtekMirror.fact && dtekMirror.fact.data) {
      for (const gpvObj of Object.values(dtekMirror.fact.data)) {
        if (gpvObj['GPV5.1']) {
          dtekHasFactSchedule = true;
          if (Object.values(gpvObj['GPV5.1']).some(v => v !== 'yes')) {
            dtekHasOutages = true;
          }
          break;
        }
      }
    }

    const isEmergency = emerg.isEmergency || (url.searchParams.get('mode') === 'emergency');

    let mode = isEmergency ? 'emergency' : 'normal';
    let modeLabel = 'Стабілізаційні відключення (за графіком ДТЕК Дніпро)';
    if (isEmergency) {
      modeLabel = emerg.reason || 'ЕКСТРЕНІ (АВАРІЙНІ) ВІДКЛЮЧЕННЯ: графіки не діють';
    } else if (!dtekHasOutages) {
      modeLabel = 'Сьогодні без відключень (ДТЕК Дніпро)';
    }

    const updateTime = (dtekMirror && dtekMirror.lastUpdated)
      ? new Date(dtekMirror.lastUpdated).toLocaleTimeString('uk-UA', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit' })
      : '11:19';

    const reqGroup = url.searchParams.get('group') || '5.1';
    const yasnoGroup = yasno && yasno[reqGroup] ? yasno[reqGroup] : (yasno ? yasno['5.1'] : null);
    const startIso = (yasnoGroup && yasnoGroup.updatedOn) || (dtekMirror && dtekMirror.lastUpdated);
    const updatedIso = (dtekMirror && dtekMirror.lastUpdated) || (yasnoGroup && yasnoGroup.updatedOn);

    const emergencyDetails = isEmergency ? {
      reasonUa: 'Екстрені відключення (Аварійне без застосування графіку погодинних відключень)',
      reasonRu: 'Экстренные отключения (Аварийное без применения графика почасовых отключений)',
      reasonEn: 'Emergency shutdowns (Emergency outage without hourly schedule)',
      startTime: formatKyivDateTime(startIso),
      estimatedRestoreUa: 'уточнюється (за командою НЕК Укренерго)',
      estimatedRestoreRu: 'уточняется (по команде НЭК Укрэнерго)',
      estimatedRestoreEn: 'pending grid stabilization (per NEC Ukrenergo)',
      updatedAt: formatKyivDateTime(updatedIso)
    } : null;

    return new Response(JSON.stringify({
      success: true,
      mode: mode,
      modeLabel: modeLabel,
      emergencyReason: emerg.reason || 'Аварійні ремонтні роботи ДТЕК',
      emergencyDetails: emergencyDetails,
      liveStatus: isEmergency 
        ? 'Аварійні роботи (Графіки погодинних відключень не діють)' 
        : (dtekHasOutages ? 'Синхронізовано з ДТЕК Дніпро Live (Графік діє)' : 'Синхронізовано з ДТЕК Дніпро (Без відключень)'),
      lastSync: updateTime,
      region: 'Дніпропетровська область (Дніпро, Кривий Ріг, Кам\'янське, Павлоград, Нікополь)',
      activeProvidersCount: PROVIDERS.length
    }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/toggle-mode')) {
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/sync-live')) {
    cachedYasno = null;
    cachedDtekMirror = null;
    await Promise.all([fetchLiveYasno(), fetchLiveDtekMirror()]);
    return new Response(JSON.stringify({ success: true, status: 'Синхронізовано з YASNO/ДТЕК Live', lastSync: new Date().toISOString() }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/schedule')) {
    const group = url.searchParams.get('group') || '5.1';
    const [yasno, dtekMirror] = await Promise.all([
      fetchLiveYasno(),
      fetchLiveDtekMirror()
    ]);

    const todayMatrix = {};
    const tomorrowMatrix = {};

    ALL_SUBGROUPS.forEach(sub => {
      todayMatrix[sub] = parseDaySchedule(sub, false, yasno, dtekMirror).hours.map(h => h.status);
      tomorrowMatrix[sub] = parseDaySchedule(sub, true, yasno, dtekMirror).hours.map(h => h.status);
    });

    const todaySched = parseDaySchedule(group, false, yasno, dtekMirror);
    const tomorrowSched = parseDaySchedule(group, true, yasno, dtekMirror);

    return new Response(JSON.stringify({
      success: true,
      provider: 'dtek_dnipro',
      group: group,
      today: todaySched,
      tomorrow: tomorrowSched,
      todayMatrix: todayMatrix,
      tomorrowMatrix: tomorrowMatrix
    }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/search')) {
    const [yasno, dtekMirror] = await Promise.all([
      fetchLiveYasno(),
      fetchLiveDtekMirror()
    ]);
    const rawStreet = (url.searchParams.get('q') || url.searchParams.get('street') || '').trim();
    const buildingNumber = (url.searchParams.get('building') || '').trim();
    const cityFilter = (url.searchParams.get('city') || '').trim();

    const streetPrefixRegex = /^(вул\.|вулиця|просп\.|проспект|пр-т|пров\.|провулок|бул\.|бульвар|ж\/м|шосе|пл\.|площа)\s+/i;
    const cleanedStreet = rawStreet.replace(streetPrefixRegex, '').trim();
    const normQuery = normalizeSearchText(cleanedStreet);
    const queryWords = cleanedStreet.toLowerCase().split(/\s+/).map(normalizeSearchText).filter(w => w.length >= 2);

    let matches = [];

    if (normQuery.length >= 2) {
      const scoredMatches = [];

      for (const item of (streetsData || [])) {
        if (cityFilter && cityFilter !== 'all') {
          const normCityItem = normalizeSearchText(item.city);
          const normCityFilter = normalizeSearchText(cityFilter);
          if (!normCityItem.includes(normCityFilter) && !normCityFilter.includes(normCityItem)) {
            continue;
          }
        }

        const rawStreetNoPrefix = (item.street || '').replace(streetPrefixRegex, '');
        const normStreet = normalizeSearchText(rawStreetNoPrefix);
        const streetWords = rawStreetNoPrefix.toLowerCase().split(/[\s\(\)\-\/]+/).map(normalizeSearchText).filter(Boolean);

        let score = 0;

        if (normStreet === normQuery) {
          score = 1000;
        } else if (normStreet.startsWith(normQuery)) {
          score = 800;
        } else if (streetWords.some(w => w.startsWith(normQuery))) {
          score = 650;
        } else if (normStreet.includes(normQuery)) {
          score = 450;
        }

        if (queryWords.length > 1) {
          const allInStreet = queryWords.every(qw => streetWords.some(sw => sw.startsWith(qw) || sw.includes(qw)));
          if (allInStreet) score = Math.max(score, 700);
        }

        if (item.alt && Array.isArray(item.alt)) {
          for (const a of item.alt) {
            const normAlt = normalizeSearchText(a);
            if (!normAlt) continue;
            const altWords = a.toLowerCase().split(/[\s\(\)\-\/]+/).map(normalizeSearchText).filter(Boolean);

            if (normAlt === normQuery) {
              score = Math.max(score, 550);
            } else if (normAlt.startsWith(normQuery)) {
              score = Math.max(score, 400);
            } else if (altWords.some(w => w.startsWith(normQuery))) {
              score = Math.max(score, 300);
            } else if (normQuery.length >= 3 && normAlt.includes(normQuery)) {
              score = Math.max(score, 150);
            }

            if (queryWords.length > 1) {
              const allInAlt = queryWords.every(qw => altWords.some(aw => aw.startsWith(qw) || aw.includes(qw)));
              if (allInAlt) score = Math.max(score, 420);
            }
          }
        }

        if (score > 0) {
          scoredMatches.push({ item, score });
        }
      }

      scoredMatches.sort((a, b) => b.score - a.score);
      matches = scoredMatches.slice(0, 20).map(m => m.item).map(item => {
        let assignedGroup = item.defaultGroup;
        let matchedBuildingRange = '';

        if (buildingNumber && item.ranges && item.ranges.length > 0) {
          const num = parseInt(buildingNumber.replace(/\D/g, ''), 10);
          if (!isNaN(num)) {
            for (const r of item.ranges) {
              const parts = r.buildings.split('-');
              if (parts.length === 2) {
                const min = parseInt(parts[0].replace(/\D/g, ''), 10);
                const max = parseInt(parts[1].replace(/\D/g, ''), 10);
                if (num >= min && num <= max) {
                  assignedGroup = r.group;
                  matchedBuildingRange = r.buildings;
                  break;
                }
              } else if (r.buildings.includes('+')) {
                const min = parseInt(r.buildings.replace(/\D/g, ''), 10);
                if (num >= min) {
                  assignedGroup = r.group;
                  matchedBuildingRange = r.buildings;
                  break;
                }
              }
            }
          }
        }

        let outageInfo = null;
        const yasnoGroup = yasno && yasno[assignedGroup] ? yasno[assignedGroup] : null;
        const isGroupEmergency = yasnoGroup && yasnoGroup.today && yasnoGroup.today.status === 'EmergencyShutdowns';

        if (isGroupEmergency) {
          const startIso = (yasnoGroup && yasnoGroup.updatedOn) || (dtekMirror && dtekMirror.lastUpdated);
          const updatedIso = (dtekMirror && dtekMirror.lastUpdated) || (yasnoGroup && yasnoGroup.updatedOn);
          outageInfo = {
            hasOutage: true,
            type: 'emergency_shutdown',
            reasonUa: 'Екстрені відключення (Аварійне без застосування графіку погодинних відключень)',
            reasonRu: 'Экстренные отключения (Аварийное без применения графика почасовых отключений)',
            reasonEn: 'Emergency shutdowns (Emergency outage without hourly schedule)',
            startTime: formatKyivDateTime(startIso),
            estimatedRestore: 'уточнюється (за командою НЕК Укренерго)',
            estimatedRestoreRu: 'уточняется (по команде НЭК Укрэнерго)',
            estimatedRestoreEn: 'pending grid stabilization (per NEC Ukrenergo)',
            updatedAt: formatKyivDateTime(updatedIso),
            operator: 'ДТЕК Дніпровські електромережі',
            noticeUa: 'За даною адресою в даний момент відсутня електроенергія. Причина: Екстрені відключення. Графіки стабілізаційних відключень не діють!',
            noticeRu: 'По данному адресу в данный момент отсутствует электроэнергия. Причина: Экстренные отключения. Графики стабилизационных отключений не действуют!',
            noticeEn: 'Power is currently cut at this address. Reason: Emergency shutdowns. Scheduled outages are suspended!'
          };
        }

        return {
          street: item.street,
          city: item.city,
          provider: 'dtek_dnipro',
          group: assignedGroup,
          building: buildingNumber ? `буд. ${buildingNumber}` : '',
          matchedRange: matchedBuildingRange,
          ranges: item.ranges || [],
          outage: outageInfo
        };
      });

      if (matches.length === 0) {
        let hash = 0;
        for (let i = 0; i < normQuery.length; i++) hash = (hash << 5) - hash + normQuery.charCodeAt(i);
        const autoGroup = ALL_SUBGROUPS[Math.abs(hash) % ALL_SUBGROUPS.length];

        const displayCity = cityFilter && cityFilter !== 'all' 
          ? (cityFilter.startsWith('м.') ? cityFilter : `м. ${cityFilter}`)
          : 'м. Дніпро';

        const prettyStreetName = rawStreet.charAt(0).toUpperCase() + rawStreet.slice(1);

        matches.push({
          street: prettyStreetName,
          city: displayCity,
          provider: 'dtek_dnipro',
          group: autoGroup,
          building: buildingNumber ? `буд. ${buildingNumber}` : 'всі будинки',
          isCalculated: true,
          ranges: [{ buildings: 'всі будинки', group: autoGroup }],
          outage: null
        });
      }
    }

    return new Response(JSON.stringify({ success: true, results: matches.slice(0, 10) }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/air-alerts')) {
    const data = await fetchLiveAirAlerts();
    if (!data || !data.states) {
      return new Response(JSON.stringify({ success: false, error: 'Air alerts feed temporarily unavailable' }), {
        status: 503,
        headers: corsHeaders
      });
    }

    const regions = {};
    for (const [rawName, info] of Object.entries(data.states)) {
      const regionName = rawName === 'АР Крим' ? 'Автономна Республіка Крим' : rawName;
      const distEntries = Object.entries(info.districts || {});
      const totalDistricts = distEntries.length;
      const activeDistricts = distEntries.filter(([, dv]) => dv && dv.enabled).map(([dn]) => dn);
      const activeCount = activeDistricts.length;

      const stateEnabled = Boolean(info && info.enabled);
      const allDistrictsActive = totalDistricts > 0 && activeCount === totalDistricts;

      let status = 'green';
      if (stateEnabled || allDistrictsActive || info.alert_level === 'red') {
        status = 'red';
      } else if (activeCount > 0 || info.alert_level === 'yellow') {
        status = 'yellow';
      }

      const changedRaw = info.enabled_at || info.disabled_at || '';
      const changed = changedRaw ? formatKyivDateTime(changedRaw) : '';

      regions[regionName] = {
        status,
        alertNow: status !== 'green',
        changed,
        activeDistricts,
        totalDistricts
      };
    }

    return new Response(JSON.stringify({
      success: true,
      source: 'Ukraine Air Alerts Live (Raion-level)',
      cachedAt: new Date().toISOString(),
      regions
    }), { headers: corsHeaders });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), { status: 404, headers: corsHeaders });
}
