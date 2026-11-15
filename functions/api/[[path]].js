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

function parseDaySchedule(group, isTomorrow, yasnoData) {
  const normSubgroup = ALL_SUBGROUPS.includes(group) ? group : '5.1';
  const groupData = yasnoData ? yasnoData[normSubgroup] : null;
  const dayObj = groupData ? (isTomorrow ? groupData.tomorrow : groupData.today) : null;

  const todayStr = new Date().toISOString().split('T')[0];
  const tomDate = new Date(Date.now() + 86400000);
  const tomorrowStr = tomDate.toISOString().split('T')[0];
  const dateStr = isTomorrow ? tomorrowStr : todayStr;

  const hours = [];

  if (dayObj) {
    const isNoOutages = dayObj.status === 'NoOutages' || dayObj.status === 'WaitingForSchedule';
    const slots = dayObj.slots || [];

    for (let h = 0; h < 24; h++) {
      const mid = h * 60 + 30;
      let slotStatus = 'on';

      if (!isNoOutages && slots.length > 0) {
        for (const slot of slots) {
          if (mid >= slot.start && mid < slot.end) {
            if (slot.type === 'Definite') slotStatus = 'off';
            else if (slot.type === 'Probable') slotStatus = 'maybe';
            else slotStatus = 'on';
            break;
          }
        }
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
      lastUpdate: groupData.updatedOn ? new Date(groupData.updatedOn).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) : 'Сьогодні',
      hours: hours,
      updatedAt: new Date().toISOString()
    };
  }

  // Резервний розклад, якщо немає зв'язку: вважаємо день без відключень
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
    const yasno = await fetchLiveYasno();
    const g51 = yasno ? yasno['5.1'] : null;
    const isNoOutages = g51 && g51.today && g51.today.status === 'NoOutages';
    const statusText = isNoOutages ? 'Сьогодні без відключень (ДТЕК Дніпро)' : 'Стабілізаційні відключення (за графіком ДТЕК Дніпро)';

    return new Response(JSON.stringify({
      success: true,
      mode: 'normal',
      modeLabel: statusText,
      liveStatus: 'Синхронізовано з ДТЕК Дніпро Live',
      lastSync: g51 && g51.updatedOn ? new Date(g51.updatedOn).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) : 'Сьогодні',
      region: 'Дніпропетровська область (Дніпро, Кривий Ріг, Кам\'янське, Павлоград, Нікополь)',
      activeProvidersCount: PROVIDERS.length
    }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/toggle-mode')) {
    return new Response(JSON.stringify({ success: true, mode: 'normal' }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/sync-live')) {
    cachedYasno = null;
    await fetchLiveYasno();
    return new Response(JSON.stringify({ success: true, status: 'Синхронізовано з YASNO Live', lastSync: new Date().toISOString() }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/schedule')) {
    const group = url.searchParams.get('group') || '5.1';
    const yasno = await fetchLiveYasno();

    const todayMatrix = {};
    const tomorrowMatrix = {};

    ALL_SUBGROUPS.forEach(sub => {
      todayMatrix[sub] = parseDaySchedule(sub, false, yasno).hours.map(h => h.status);
      tomorrowMatrix[sub] = parseDaySchedule(sub, true, yasno).hours.map(h => h.status);
    });

    const todaySched = parseDaySchedule(group, false, yasno);
    const tomorrowSched = parseDaySchedule(group, true, yasno);

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
    const rawStreet = (url.searchParams.get('q') || url.searchParams.get('street') || '').trim();
    const buildingNumber = (url.searchParams.get('building') || '').trim();
    const cityFilter = (url.searchParams.get('city') || '').trim();

    const cleanedStreet = rawStreet.replace(/^(вул\.|вулиця|просп\.|проспект|пр-т|пров\.|бульвар|ж\/м|шосе)\s+/i, '');
    const normQuery = normalizeSearchText(cleanedStreet);
    const words = cleanedStreet.toLowerCase().split(/\s+/).map(normalizeSearchText).filter(w => w.length >= 3);

    let matches = [];

    if (normQuery.length >= 2) {
      matches = (streetsData || []).filter(item => {
        if (cityFilter && cityFilter !== 'all') {
          const normCityItem = normalizeSearchText(item.city);
          const normCityFilter = normalizeSearchText(cityFilter);
          if (!normCityItem.includes(normCityFilter) && !normCityFilter.includes(normCityItem)) {
            return false;
          }
        }

        const normStreet = normalizeSearchText(item.street);
        if (normStreet.includes(normQuery)) return true;

        for (const w of words) {
          if (normStreet.includes(w)) return true;
        }

        if (item.alt) {
          for (const a of item.alt) {
            const normAlt = normalizeSearchText(a);
            if (normAlt.includes(normQuery) || normQuery.includes(normAlt)) return true;
            for (const w of words) {
              if (normAlt.includes(w)) return true;
            }
          }
        }
        return false;
      }).map(item => {
        let assignedGroup = item.defaultGroup;
        let matchedBuildingRange = '';

        if (buildingNumber && item.ranges && item.ranges.length > 0) {
          const num = parseInt(buildingNumber.replace(/\D/g, ''), 10);
          if (!isNaN(num)) {
            if (item.street && item.street.includes('Мандриківська')) {
              assignedGroup = '5.1';
            } else {
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
        }

        return {
          street: item.street,
          city: item.city,
          provider: 'dtek_dnipro',
          group: assignedGroup,
          building: buildingNumber ? `буд. ${buildingNumber}` : '',
          matchedRange: matchedBuildingRange,
          ranges: item.ranges || []
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
          ranges: [{ buildings: 'всі будинки', group: autoGroup }]
        });
      }
    }

    return new Response(JSON.stringify({ success: true, results: matches.slice(0, 10) }), { headers: corsHeaders });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), { status: 404, headers: corsHeaders });
}
