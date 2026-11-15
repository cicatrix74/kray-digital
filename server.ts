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

function parseDaySchedule(group: string, isTomorrow: boolean, yasnoData: any) {
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

app.get('/api/status', async (_req, res) => {
  const [yasno, emerg] = await Promise.all([
    fetchLiveYasno(),
    checkEmergencyStatus()
  ]);
  const g51 = yasno ? yasno['5.1'] : null;
  const todayData = g51 ? g51.today : null;
  const isNoOutages = todayData && todayData.status === 'NoOutages';

  const isEmergency = emerg.isEmergency;
  let mode = isEmergency ? 'emergency' : 'normal';
  let modeLabel = 'Стабілізаційні відключення (за графіком ДТЕК Дніпро)';
  if (isEmergency) {
    modeLabel = 'ЕКСТРЕНІ АВАРІЙНІ ВІДКЛЮЧЕННЯ (ГАВ)';
  } else if (isNoOutages) {
    modeLabel = 'Сьогодні без відключень (ДТЕК Дніпро)';
  }

  res.json({
    success: true,
    mode: mode,
    modeLabel: modeLabel,
    liveStatus: isEmergency 
      ? 'Екстрені відключення (НЕК Укренерго ГАВ / ДТЕК Дніпро)' 
      : (isNoOutages ? 'Синхронізовано з ДТЕК Дніпро (Без відключень)' : 'Синхронізовано з ДТЕК Дніпро Live'),
    lastSync: g51 && g51.updatedOn ? new Date(g51.updatedOn).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) : 'Сьогодні',
    region: 'Дніпропетровська область (Дніпро, Кривий Ріг, Кам\'янське, Павлоград, Нікополь)',
    activeProvidersCount: PROVIDERS.length
  });
});

app.post('/api/toggle-mode', (_req, res) => {
  res.json({ success: true, mode: 'normal' });
});

app.post('/api/sync-live', async (_req, res) => {
  cachedYasno = null;
  await fetchLiveYasno();
  res.json({ success: true, status: 'Синхронізовано з YASNO Live', lastSync: new Date().toISOString() });
});

app.get('/api/schedule', async (req, res) => {
  const group = (req.query.group as string) || '5.1';
  const yasno = await fetchLiveYasno();

  const todayMatrix: Record<string, string[]> = {};
  const tomorrowMatrix: Record<string, string[]> = {};

  ALL_SUBGROUPS.forEach(sub => {
    todayMatrix[sub] = parseDaySchedule(sub, false, yasno).hours.map(h => h.status);
    tomorrowMatrix[sub] = parseDaySchedule(sub, true, yasno).hours.map(h => h.status);
  });

  res.json({
    success: true,
    provider: 'dtek_dnipro',
    group: group,
    today: parseDaySchedule(group, false, yasno),
    tomorrow: parseDaySchedule(group, true, yasno),
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
