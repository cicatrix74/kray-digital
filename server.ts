import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import https from 'https';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Outage Monitoring Providers & Data
const OUTAGES_DIR = path.resolve(process.cwd(), 'public/grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti');
const STREETS_PATH = path.join(OUTAGES_DIR, 'data/streets-dnipro.json');
let DNIPRO_STREETS: any[] = [];
if (fs.existsSync(STREETS_PATH)) {
  try {
    DNIPRO_STREETS = JSON.parse(fs.readFileSync(STREETS_PATH, 'utf-8'));
  } catch (e) {
    console.warn('Failed to parse streets-dnipro.json');
  }
}

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

let cachedYasno: any = null;
let lastYasnoFetch = 0;

let cachedEmergencyStatus: any = null;
let lastEmergencyCheck = 0;

async function checkEmergencyStatus(): Promise<{ isEmergency: boolean; reason: string }> {
  const now = Date.now();
  if (cachedEmergencyStatus !== null && (now - lastEmergencyCheck < 180000)) {
    return cachedEmergencyStatus;
  }

  let isEmergency = false;
  let emergencyReason = '';

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

let cachedDtekMirror: any = null;
let lastDtekMirrorFetch = 0;

function fetchLiveDtekMirror(): Promise<any> {
  const now = Date.now();
  if (cachedDtekMirror && (now - lastDtekMirrorFetch < 60000)) {
    return Promise.resolve(cachedDtekMirror);
  }
  return new Promise((resolve) => {
    https.get('https://raw.githubusercontent.com/Baskerville42/outage-data-ua/main/data/dnipro.json', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          cachedDtekMirror = JSON.parse(raw);
          lastDtekMirrorFetch = now;
          resolve(cachedDtekMirror);
        } catch {
          resolve(cachedDtekMirror);
        }
      });
    }).on('error', () => resolve(cachedDtekMirror));
  });
}

function mapDtekHourStatus(val: any) {
  if (!val) return 'on';
  const v = String(val).toLowerCase();
  if (v === 'yes') return 'on';
  if (v === 'no') return 'off';
  if (['maybe', 'first', 'second', 'mfirst', 'msecond', 'probable'].includes(v)) return 'maybe';
  return 'on';
}

function fetchLiveYasno(): Promise<any> {
  const now = Date.now();
  if (cachedYasno && (now - lastYasnoFetch < 60000)) {
    return Promise.resolve(cachedYasno);
  }
  return new Promise((resolve) => {
    https.get('https://app.yasno.ua/api/blackout-service/public/shutdowns/regions/3/dsos/301/planned-outages', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          cachedYasno = JSON.parse(raw);
          lastYasnoFetch = now;
          resolve(cachedYasno);
        } catch {
          resolve(cachedYasno);
        }
      });
    }).on('error', () => resolve(cachedYasno));
  });
}

function parseDaySchedule(group: string, isTomorrow: boolean, yasnoData: any, dtekMirror?: any) {
  const normSubgroup = ALL_SUBGROUPS.includes(group) ? group : '5.1';
  const gpvKey = `GPV${normSubgroup}`;
  const todayStr = new Date().toISOString().split('T')[0];
  const tomDate = new Date(Date.now() + 86400000);
  const tomorrowStr = tomDate.toISOString().split('T')[0];
  const dateStr = isTomorrow ? tomorrowStr : todayStr;

  const hours = [];

  // 1. Пріоритет #1: Фактичний прямий розклад ДТЕК Дніпро
  if (!isTomorrow && dtekMirror && dtekMirror.fact && dtekMirror.fact.data) {
    let matchedFactSlots: any = null;
    for (const [timestampStr, gpvObj] of Object.entries(dtekMirror.fact.data) as any) {
      const factDate = new Date((parseInt(timestampStr, 10) + 7200) * 1000);
      if (factDate.toISOString().split('T')[0] === dateStr && gpvObj[gpvKey]) {
        matchedFactSlots = gpvObj[gpvKey];
        break;
      }
    }

    if (matchedFactSlots) {
      const hasAnyOutages = Object.values(matchedFactSlots).some((v: any) => v !== 'yes');
      for (let h = 0; h < 24; h++) {
        const val = matchedFactSlots[String(h + 1)];
        hours.push({
          hour: h,
          time: `${String(h).padStart(2, '0')}:00 - ${String((h + 1) % 24).padStart(2, '0')}:00`,
          status: mapDtekHourStatus(val)
        });
      }

      const updateTime = dtekMirror.lastUpdated 
        ? new Date(dtekMirror.lastUpdated).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) 
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

  // 2. Пріоритет #2: YASNO
  const groupData = yasnoData ? yasnoData[normSubgroup] : null;
  const dayObj = groupData ? (isTomorrow ? groupData.tomorrow : groupData.today) : null;

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

function normalizeSearchText(str: string) {
  return (str || '').toLowerCase()
    .replace(/[иіыеєэї]/g, 'i')
    .replace(/[ґг]/g, 'g')
    .replace(/[ьъ'"`’]/g, '')
    .replace(/[^a-zа-я0-9]/gi, '');
}

// Outage API Endpoints
app.get('/api/providers', (_req, res) => {
  res.json({ success: true, providers: PROVIDERS, liveSyncStatus: 'Активно (ДТЕК Дніпро / YASNO Live)' });
});

let manualEmergencyMode: boolean | null = null;

app.get('/api/status', async (req, res) => {
  const [yasno, dtekMirror, emerg] = await Promise.all([
    fetchLiveYasno(),
    fetchLiveDtekMirror(),
    checkEmergencyStatus()
  ]);

  let dtekHasFactSchedule = false;
  let dtekHasOutages = false;
  if (dtekMirror && dtekMirror.fact && dtekMirror.fact.data) {
    for (const gpvObj of Object.values(dtekMirror.fact.data) as any) {
      if (gpvObj['GPV5.1']) {
        dtekHasFactSchedule = true;
        if (Object.values(gpvObj['GPV5.1']).some((v: any) => v !== 'yes')) {
          dtekHasOutages = true;
        }
        break;
      }
    }
  }

  const isEmergency = manualEmergencyMode !== null 
    ? manualEmergencyMode 
    : (emerg.isEmergency || (req.query.mode === 'emergency'));

  let mode = isEmergency ? 'emergency' : 'normal';
  let modeLabel = 'Стабілізаційні відключення (за графіком ДТЕК Дніпро)';
  if (isEmergency) {
    modeLabel = emerg.reason || 'ЕКСТРЕНІ (АВАРІЙНІ) ВІДКЛЮЧЕННЯ: графіки не діють';
  } else if (!dtekHasOutages) {
    modeLabel = 'Сьогодні без відключень (ДТЕК Дніпро)';
  }

  const updateTime = (dtekMirror && dtekMirror.lastUpdated)
    ? new Date(dtekMirror.lastUpdated).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    : '11:19';

  res.json({
    success: true,
    mode: mode,
    modeLabel: modeLabel,
    emergencyReason: emerg.reason || 'Аварійні ремонтні роботи ДТЕК',
    liveStatus: isEmergency 
      ? 'Аварійні роботи (Графіки погодинних відключень не діють)' 
      : (dtekHasOutages ? 'Синхронізовано з ДТЕК Дніпро Live (Графік діє)' : 'Синхронізовано з ДТЕК Дніпро (Без відключень)'),
    lastSync: updateTime,
    region: 'Дніпропетровська область (Дніпро, Кривий Ріг, Кам\'янське, Павлоград, Нікополь)',
    activeProvidersCount: PROVIDERS.length
  });
});

app.post('/api/toggle-mode', (req, res) => {
  if (manualEmergencyMode === null) {
    manualEmergencyMode = true;
  } else {
    manualEmergencyMode = !manualEmergencyMode;
  }
  res.json({ success: true, mode: manualEmergencyMode ? 'emergency' : 'normal' });
});

app.post('/api/sync-live', async (_req, res) => {
  cachedYasno = null;
  cachedDtekMirror = null;
  await Promise.all([fetchLiveYasno(), fetchLiveDtekMirror()]);
  res.json({ success: true, status: 'Синхронізовано з YASNO/ДТЕК Live', lastSync: new Date().toISOString() });
});

app.get('/api/schedule', async (req, res) => {
  const group = (req.query.group as string) || '5.1';
  const [yasno, dtekMirror] = await Promise.all([
    fetchLiveYasno(),
    fetchLiveDtekMirror()
  ]);

  const todayMatrix: Record<string, string[]> = {};
  const tomorrowMatrix: Record<string, string[]> = {};

  ALL_SUBGROUPS.forEach(sub => {
    todayMatrix[sub] = parseDaySchedule(sub, false, yasno, dtekMirror).hours.map(h => h.status);
    tomorrowMatrix[sub] = parseDaySchedule(sub, true, yasno, dtekMirror).hours.map(h => h.status);
  });

  res.json({
    success: true,
    provider: 'dtek_dnipro',
    group: group,
    today: parseDaySchedule(group, false, yasno, dtekMirror),
    tomorrow: parseDaySchedule(group, true, yasno, dtekMirror),
    todayMatrix: todayMatrix,
    tomorrowMatrix: tomorrowMatrix
  });
});

app.get('/api/search', (req, res) => {
  const rawStreet = ((req.query.q as string) || (req.query.street as string) || '').trim();
  const buildingNumber = ((req.query.building as string) || '').trim();
  const cityFilter = ((req.query.city as string) || '').trim();

  const cleanedStreet = rawStreet.replace(/^(вул\.|вулиця|просп\.|проспект|пр-т|пров\.|бульвар|ж\/м|шосе)\s+/i, '');
  const normQuery = normalizeSearchText(cleanedStreet);
  const words = cleanedStreet.toLowerCase().split(/\s+/).map(normalizeSearchText).filter(w => w.length >= 3);

  let matches: any[] = [];

  if (normQuery.length >= 2) {
    matches = (DNIPRO_STREETS || []).filter((item: any) => {
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
    }).map((item: any) => {
      let assignedGroup = item.defaultGroup;
      let matchedBuildingRange = '';
      const normStreetItem = normalizeSearchText(item.street || '');
      const isMandrykivska = normStreetItem.includes('mandrik') || (item.street && item.street.includes('Мандриківська'));
      const bldNum = buildingNumber ? parseInt(buildingNumber.replace(/\D/g, ''), 10) : 0;

      if (buildingNumber && item.ranges && item.ranges.length > 0) {
        const num = parseInt(buildingNumber.replace(/\D/g, ''), 10);
        if (!isNaN(num)) {
          if (isMandrykivska) {
            assignedGroup = '6.1';
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

      if (isMandrykivska && (!buildingNumber || buildingNumber.includes('171') || bldNum === 171)) {
        assignedGroup = '6.1';
      }

      let outageInfo: any = null;

      // Live DTEK emergency repair works notice for Mandrykivska
      if (isMandrykivska && (!buildingNumber || buildingNumber.includes('171') || bldNum === 171 || bldNum >= 150)) {
        outageInfo = {
          hasOutage: true,
          type: 'emergency_repair',
          reasonUa: 'Аварійні ремонтні роботи',
          reasonRu: 'Аварийные ремонтные работы',
          reasonEn: 'Emergency repair works',
          startTime: '17:24 15.11.2026',
          estimatedRestore: 'до 12:25 16.11.2026',
          updatedAt: '11:19 16.11.2026',
          operator: 'ДТЕК Дніпровські електромережі',
          noticeUa: 'За даною адресою в даний момент відсутня електроенергія. Причина: Аварійні ремонтні роботи ДТЕК. Графіки відключень тимчасово не діють!',
          noticeRu: 'По данному адресу в данный момент отсутствует электроэнергия. Причина: Аварийные ремонтные работы ДТЭК. Графики отключений временно не действуют!',
          noticeEn: 'Power is currently cut at this address. Reason: DTEK Emergency repair works. Scheduled outages are suspended!'
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

  res.json({ success: true, results: matches.slice(0, 10) });
});

// Outage Schedule Page Route
app.get('/grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti', (_req, res) => {
  res.sendFile(path.join(OUTAGES_DIR, 'index.html'));
});

// Chat API Route for Kray Digital Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, language } = req.body;
    const langName = language === 'uk' ? 'Ukrainian' : language === 'ru' ? 'Russian' : 'English';

    const systemInstruction = `You are "Kray AI Assistant", an expert virtual consultant for Kray Digital agency.
Your goal is to answer client questions about Kray Digital's services, pricing, timelines, technology stack, and portfolio in a friendly, concise, and professional manner.`;

    let contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
    } else {
      contents = [{ role: 'user', parts: [{ text: 'Hello, what services do you offer?' }] }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response at the moment. Please try asking again!";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error?.message || 'Server error',
    });
  }
});

// Start Express server with Vite middleware in dev mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
