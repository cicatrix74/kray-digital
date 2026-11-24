import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import https from 'https';
import crypto from 'crypto';
import sharp from 'sharp';
import os from 'os';
import { execFile } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { renderTimerGif } from './server/timerGif';
import { createShortLink, resolveShortLink, getShortLinkStats } from './server/shortLinks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.json({ limit: '50mb' }));

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

  // 1. Primary source: Telegram feeds (newest -> oldest)
  try {
    const urls = ['https://t.me/s/dtek_ua', 'https://t.me/s/Ukrenergo'];
    for (const u of urls) {
      const res = await fetch(u, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      if (res.ok) {
        const html = await res.text();
        const matches = html.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/gi) || [];
        const recent = matches.slice(-6).reverse().map(m => m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase());
        for (const post of recent) {
          const hasDnipro = post.includes('дніпро') || post.includes('днепр');
          if (!hasDnipro) continue;
          const isCancelled = post.includes('скасован') || post.includes('відмін') || post.includes('повернулися до графіків');
          if (isCancelled) break;

          // Check sentence-by-sentence so "аварійні відключення у Харківській/Сумській" in another sentence doesn't trigger for Dnipro
          const sentences = post.split(/[.!?\n]+/);
          const hasDniproEmergency = sentences.some((s) => {
            if (!s.includes('дніпро') && !s.includes('днепр')) return false;
            if (s.includes('уникнути екстрених')) return false;
            return /екстрені\s+відключення|аварійні\s+відключення|графіки\s+не\s+діють|введено\s+гав/.test(s);
          });
          if (hasDniproEmergency) {
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

  // 2. Fallback: YASNO / DTEK Live API
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
  if (v === 'first') return 'off-first';
  if (v === 'second') return 'off-second';
  if (['maybe', 'mfirst', 'msecond', 'probable'].includes(v)) return 'maybe';
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

    const getHalfStatus = (min: number) => {
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

function formatKyivDateTime(isoStr?: string): string {
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
  const get = (type: string) => parts.find(p => p.type === type)?.value || '';
  return `${get('hour')}:${get('minute')} ${get('day')}.${get('month')}.${get('year')}`;
}

let manualEmergencyMode: boolean | null = null;
let emergencyStartedAt: string | null = null;
let emergencyEndedAt: string | null = null;
let lastObservedEmergency = false;

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

  if (isEmergency && !lastObservedEmergency) {
    emergencyStartedAt = new Date().toISOString();
    emergencyEndedAt = null;
  } else if (!isEmergency && lastObservedEmergency) {
    emergencyEndedAt = new Date().toISOString();
  }
  lastObservedEmergency = isEmergency;

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

  const reqGroup = (req.query.group as string) || '5.1';
  const yasnoGroup = yasno && yasno[reqGroup] ? yasno[reqGroup] : (yasno ? yasno['5.1'] : null);
  const startIso = emergencyStartedAt || (yasnoGroup && yasnoGroup.updatedOn) || (dtekMirror && dtekMirror.lastUpdated);
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

  res.json({
    success: true,
    mode: mode,
    modeLabel: modeLabel,
    emergencyReason: emerg.reason || 'Аварійні ремонтні роботи ДТЕК',
    emergencyDetails: emergencyDetails,
    emergencyStartedAt: startIso || null,
    emergencyEndedAt: emergencyEndedAt,
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
  if (manualEmergencyMode) {
    emergencyStartedAt = new Date().toISOString();
    emergencyEndedAt = null;
  } else {
    emergencyEndedAt = new Date().toISOString();
  }
  lastObservedEmergency = manualEmergencyMode;
  res.json({
    success: true,
    mode: manualEmergencyMode ? 'emergency' : 'normal',
    emergencyStartedAt,
    emergencyEndedAt
  });
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

app.get('/api/search', async (req, res) => {
  const [yasno, dtekMirror] = await Promise.all([
    fetchLiveYasno(),
    fetchLiveDtekMirror()
  ]);
  const rawStreet = ((req.query.q as string) || (req.query.street as string) || '').trim();
  const buildingNumber = ((req.query.building as string) || '').trim();
  const cityFilter = ((req.query.city as string) || '').trim();

  const streetPrefixRegex = /^(вул\.|вулиця|просп\.|проспект|пр-т|пров\.|провулок|бул\.|бульвар|ж\/м|шосе|пл\.|площа)\s+/i;
  const cleanedStreet = rawStreet.replace(streetPrefixRegex, '').trim();
  const normQuery = normalizeSearchText(cleanedStreet);
  const queryWords = cleanedStreet.toLowerCase().split(/\s+/).map(normalizeSearchText).filter(w => w.length >= 2);

  let matches: any[] = [];

  if (normQuery.length >= 2) {
    const scoredMatches: { item: any; score: number }[] = [];

    for (const item of (DNIPRO_STREETS || [])) {
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
    matches = scoredMatches.slice(0, 20).map(m => m.item).map((item: any) => {
      let assignedGroup = item.defaultGroup;
      let matchedBuildingRange = '';
      const normStreetItem = normalizeSearchText(item.street || '');
      const isMandrykivska = normStreetItem.includes('mandrik') || (item.street && item.street.includes('Мандриківська'));
      const bldNum = buildingNumber ? parseInt(buildingNumber.replace(/\D/g, ''), 10) : 0;

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

      let outageInfo: any = null;
      const yasnoGroup = yasno && yasno[assignedGroup] ? yasno[assignedGroup] : null;
      const isGroupEmergency = manualEmergencyMode === true || (yasnoGroup && yasnoGroup.today && yasnoGroup.today.status === 'EmergencyShutdowns');

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

  res.json({ success: true, results: matches.slice(0, 10) });
});

interface TelegramOutagePost {
  source: string;
  handle: string;
  text: string;
  timeHint: string | null;
  publishedAt: string;
  url: string;
}

let cachedTelegramOutages: TelegramOutagePost[] | null = null;
let lastTelegramOutagesFetch = 0;

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'");
}

function extractTimeHint(text: string): string | null {
  const rangeMatch = text.match(/(?:з|с)\s+\d{1,2}[:.]\d{2}\s+(?:до|по)\s+\d{1,2}[:.]\d{2}/i);
  if (rangeMatch) return rangeMatch[0];
  const untilMatch = text.match(/(?:орієнтовно\s+)?(?:до|о|в)\s+\d{1,2}[:.]\d{2}/i);
  if (untilMatch) return untilMatch[0];
  if (/скасован|відмін|повернулися до графіків/i.test(text)) {
    return 'Скасування ГАВ / повернення до ГПВ';
  }
  return null;
}

app.get('/api/outages-telegram', async (_req, res) => {
  const now = Date.now();
  if (cachedTelegramOutages && now - lastTelegramOutagesFetch < 180000) {
    return res.json({ success: true, posts: cachedTelegramOutages });
  }

  const feeds: { handle: string; source: string; url: string; dniproOnly: boolean }[] = [
    { handle: '@cek_info', source: 'ЦЕК (Дніпро)', url: 'https://t.me/s/cek_info', dniproOnly: false },
    { handle: '@dtek_ua', source: 'ДТЕК', url: 'https://t.me/s/dtek_ua', dniproOnly: true },
    { handle: '@Ukrenergo', source: 'Укренерго', url: 'https://t.me/s/Ukrenergo', dniproOnly: true },
  ];

  const collected: TelegramOutagePost[] = [];

  await Promise.all(
    feeds.map(async (feed) => {
      try {
        const resp = await fetch(feed.url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        });
        if (!resp.ok) return;
        const html = await resp.text();
        const blocks = html.split('tgme_widget_message_wrap').slice(-10).reverse();

        for (const block of blocks) {
          const textMatch = block.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/i);
          if (!textMatch) continue;
          const cleanText = decodeHtmlEntities(
            textMatch[1]
              .replace(/<br\s*\/?>/gi, '\n')
              .replace(/<\/p>/gi, '\n')
              .replace(/<[^>]+>/g, ' '),
          )
            .replace(/[ \t]+/g, ' ')
            .replace(/\n\s+/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();

          if (cleanText.length < 25) continue;

          const lower = cleanText.toLowerCase();
          if (feed.dniproOnly) {
            const mentionsDnipro =
              lower.includes('дніпро') || lower.includes('днепр') || lower.includes('гпв') || lower.includes('гав');
            if (!mentionsDnipro) continue;
          }

          const timeMatch = block.match(/<time[^>]*datetime="([^"]+)"/i);
          const linkMatch = block.match(/class="tgme_widget_message_date"[^>]*href="([^"]+)"/i);
          const publishedAt = timeMatch ? timeMatch[1] : new Date().toISOString();
          const postUrl = linkMatch ? linkMatch[1] : feed.url;

          collected.push({
            source: feed.source,
            handle: feed.handle,
            text: cleanText,
            timeHint: extractTimeHint(cleanText),
            publishedAt,
            url: postUrl,
          });
          break;
        }
      } catch {
        // ignore individual feed errors
      }
    }),
  );

  collected.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  cachedTelegramOutages = collected.slice(0, 3);
  lastTelegramOutagesFetch = now;

  return res.json({ success: true, posts: cachedTelegramOutages });
});

function registerMultilingualTool(slug: string, sourceDir: string) {
  const sendLocalizedHtml = (langPrefix: '' | 'ru' | 'en', res: express.Response) => {
    if (process.env.NODE_ENV === 'production') {
      const distFile = langPrefix
        ? path.resolve(process.cwd(), 'dist', langPrefix, slug, 'index.html')
        : path.resolve(process.cwd(), 'dist', slug, 'index.html');
      if (fs.existsSync(distFile)) {
        return res.sendFile(distFile);
      }
    }
    return res.sendFile(path.join(sourceDir, 'index.html'));
  };

  app.get(`/${slug}`, (req, res) => {
    if (!req.originalUrl.split('?')[0].endsWith('/')) {
      return res.redirect(301, `/${slug}/`);
    }
    return sendLocalizedHtml('', res);
  });

  for (const lang of ['ru', 'en'] as const) {
    app.get(`/${lang}/${slug}`, (req, res) => {
      if (!req.originalUrl.split('?')[0].endsWith('/')) {
        return res.redirect(301, `/${lang}/${slug}/`);
      }
      return sendLocalizedHtml(lang, res);
    });
    app.use(`/${lang}/${slug}`, express.static(sourceDir));
  }
}

// Outage Schedule Page Route
registerMultilingualTool('grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti', OUTAGES_DIR);

// Air Raid Alerts Live API (/api/air-alerts) with raion-level red/yellow/green support
let cachedAirAlerts: any = null;
let lastAirAlertsFetch = 0;

function fetchLiveAirAlerts(): Promise<any> {
  const now = Date.now();
  if (cachedAirAlerts && (now - lastAirAlertsFetch < 15000)) {
    return Promise.resolve(cachedAirAlerts);
  }
  return new Promise((resolve) => {
    https.get('https://vadimklimenko.com/map/statuses.json', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.states) {
            cachedAirAlerts = parsed;
            lastAirAlertsFetch = now;
            return resolve(parsed);
          }
          resolve(cachedAirAlerts);
        } catch {
          resolve(cachedAirAlerts);
        }
      });
    }).on('error', () => resolve(cachedAirAlerts));
  });
}

app.get('/api/air-alerts', async (_req, res) => {
  const data = await fetchLiveAirAlerts();
  if (!data || !data.states) {
    return res.status(503).json({ success: false, error: 'Air alerts feed temporarily unavailable' });
  }

  const regions: Record<string, {
    status: 'red' | 'yellow' | 'green';
    alertNow: boolean;
    changed: string;
    activeDistricts: string[];
    totalDistricts: number;
  }> = {};

  for (const [rawName, info] of Object.entries(data.states) as any) {
    // Normalize Crimea name to match GeoJSON
    const regionName = rawName === 'АР Крим' ? 'Автономна Республіка Крим' : rawName;
    const distEntries = Object.entries(info.districts || {}) as [string, any][];
    const totalDistricts = distEntries.length;
    const activeDistricts = distEntries.filter(([, dv]) => dv && dv.enabled).map(([dn]) => dn);
    const activeCount = activeDistricts.length;

    const stateEnabled = Boolean(info && info.enabled);
    const allDistrictsActive = totalDistricts > 0 && activeCount === totalDistricts;

    let status: 'red' | 'yellow' | 'green' = 'green';
    if (stateEnabled || allDistrictsActive || info.alert_level === 'red') {
      status = 'red';
    } else if (activeCount > 0 || info.alert_level === 'yellow') {
      status = 'yellow';
    }

    const changedRaw = info.enabled_at || info.disabled_at || '';
    let changed = '';
    if (changedRaw) {
      changed = formatKyivDateTime(changedRaw);
    }

    regions[regionName] = {
      status,
      alertNow: status !== 'green',
      changed,
      activeDistricts,
      totalDistricts
    };
  }

  res.json({
    success: true,
    source: 'Ukraine Air Alerts Live (Raion-level)',
    cachedAt: new Date().toISOString(),
    regions
  });
});

const KARTA_TREVOG_DIR = path.resolve(process.cwd(), 'public/karta-trevog');
registerMultilingualTool('karta-trevog', KARTA_TREVOG_DIR);

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

// Telegram Phone Verification (Option 2 - Local/Bot integration)
const TG_BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
const TG_BOT_USERNAME = (process.env.TELEGRAM_BOT_USERNAME || '').replace(/^@/, '').trim();

interface PhoneVerificationSession {
  status: 'pending' | 'verified';
  enteredPhone: string;
  verifiedPhone: string | null;
  chatId?: number;
  createdAt: number;
}

const phoneVerifications = new Map<string, PhoneVerificationSession>();
const chatIdToToken = new Map<number, string>();

// Clean up expired sessions (> 15 min) periodically
setInterval(() => {
  const cutoff = Date.now() - 15 * 60 * 1000;
  for (const [tok, sess] of phoneVerifications.entries()) {
    if (sess.createdAt < cutoff) phoneVerifications.delete(tok);
  }
}, 60000);

async function tgApiCall(method: string, payload: Record<string, any>) {
  if (!TG_BOT_TOKEN) return null;
  const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

let tgLastUpdateId = 0;
async function pollTelegramUpdates() {
  if (!TG_BOT_TOKEN) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/getUpdates?offset=${tgLastUpdateId + 1}&timeout=15`);
    if (res.ok) {
      const data: any = await res.json();
      if (data.ok && Array.isArray(data.result)) {
        for (const upd of data.result) {
          tgLastUpdateId = Math.max(tgLastUpdateId, upd.update_id);
          const msg = upd.message;
          if (!msg || !msg.chat) continue;
          const chatId = msg.chat.id;
          const text = (msg.text || '').trim();

          if (text.startsWith('/start')) {
            const parts = text.split(/\s+/);
            const token = parts[1] || '';
            if (token && phoneVerifications.has(token)) {
              chatIdToToken.set(chatId, token);
              const sess = phoneVerifications.get(token)!;
              sess.chatId = chatId;
              await tgApiCall('sendMessage', {
                chat_id: chatId,
                text: 'Натисніть кнопку нижче, щоб підтвердити ваш номер телефону для заявки на сайті KRAY DIGITAL:',
                reply_markup: {
                  keyboard: [[{ text: '📱 Поділитися номером телефону', request_contact: true }]],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
            } else {
              await tgApiCall('sendMessage', {
                chat_id: chatId,
                text: 'Будь ласка, перейдіть за посиланням підтвердження безпосередньо з форми на сайті.'
              });
            }
          } else if (msg.contact && msg.contact.phone_number) {
            // Ensure contact belongs to the Telegram sender
            if (msg.contact.user_id && msg.from && msg.contact.user_id !== msg.from.id) {
              await tgApiCall('sendMessage', {
                chat_id: chatId,
                text: '⚠️ Будь ласка, надішліть саме свій власний контакт.'
              });
              continue;
            }
            const token = chatIdToToken.get(chatId);
            if (token && phoneVerifications.has(token)) {
              const sess = phoneVerifications.get(token)!;
              const rawPhone = String(msg.contact.phone_number);
              sess.verifiedPhone = rawPhone.startsWith('+') ? rawPhone : `+${rawPhone}`;
              sess.status = 'verified';
              await tgApiCall('sendMessage', {
                chat_id: chatId,
                text: `✅ Номер ${sess.verifiedPhone} підтверджено! Поверніться на сайт — заявка відправиться автоматично.`,
                reply_markup: { remove_keyboard: true }
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('TG polling error:', err);
  }
  setTimeout(pollTelegramUpdates, 1000);
}

if (TG_BOT_TOKEN) {
  pollTelegramUpdates();
}

app.post('/api/verify-phone/start', (req, res) => {
  const enteredPhone = String((req.body && req.body.phone) || '').trim();
  if (!TG_BOT_TOKEN || !TG_BOT_USERNAME) {
    return res.json({
      success: false,
      needsBotConfig: true,
      message: 'Telegram Bot не налаштований у .env (потрібні TELEGRAM_BOT_TOKEN та TELEGRAM_BOT_USERNAME)'
    });
  }

  const token = crypto.randomBytes(12).toString('hex');
  phoneVerifications.set(token, {
    status: 'pending',
    enteredPhone,
    verifiedPhone: null,
    createdAt: Date.now()
  });

  res.json({
    success: true,
    token,
    botUrl: `https://t.me/${TG_BOT_USERNAME}?start=${token}`
  });
});

app.get('/api/verify-phone/status', (req, res) => {
  const token = String(req.query.token || '').trim();
  if (!token || !phoneVerifications.has(token)) {
    return res.status(404).json({ success: false, status: 'expired' });
  }
  const sess = phoneVerifications.get(token)!;
  res.json({
    success: true,
    status: sess.status,
    verifiedPhone: sess.verifiedPhone
  });
});

const TOOL_ROUTE_DIRS: [string, string][] = [
  ['konvertor-webp', 'public/konvertor-webp'],
  ['photoeditor', 'public/photoeditor'],
  ['password-generator', 'public/password-generator'],
  ['generator-gif', 'public/generator-gif'],
  ['pdf-to-jpg', 'public/pdf-to-jpg'],
  ['qr-generator', 'public/qr-generator'],
  ['favicon-generator', 'public/favicon-generator'],
  ['code-online', 'public/code-online'],
  ['timer-generator', 'public/timer-generator'],
  ['url-shortener', 'public/url-shortener'],
];

for (const [slug, relDir] of TOOL_ROUTE_DIRS) {
  registerMultilingualTool(slug, path.resolve(process.cwd(), relDir));
}

app.post('/api/shorten', express.json(), (req, res) => {
  const { url, alias } = req.body || {};
  const result = createShortLink(url, alias);
  if (result.ok === false) {
    return res.status(400).json({ ok: false, error: result.error });
  }
  return res.json({ ok: true, ...result.record });
});

app.get('/api/shorten/:code', (req, res) => {
  const rec = getShortLinkStats(req.params.code);
  if (!rec) return res.status(404).json({ ok: false, error: 'NOT_FOUND' });
  return res.json({ ok: true, ...rec });
});

app.get('/s/:code', (req, res) => {
  const rec = resolveShortLink(req.params.code);
  if (!rec) return res.status(404).send('Short link not found');
  return res.redirect(302, rec.url);
});

app.get('/api/timer.gif', async (req, res) => {
  const rawC = typeof req.query.c === 'string' ? req.query.c : '';
  if (!rawC) {
    return res.status(400).send('Missing timer config');
  }
  try {
    const gifBuf = await renderTimerGif(rawC);
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    if (req.query.download === '1') {
      res.setHeader('Content-Disposition', 'attachment; filename="timer.gif"');
    }
    return res.send(gifBuf);
  } catch (err) {
    console.error('[timer.gif] render failed:', err);
    return res.status(500).send('Failed to render GIF timer');
  }
});

app.post('/api/video-to-gif', express.raw({ type: '*/*', limit: '100mb' }), async (req, res) => {
  if (!ffmpegPath) {
    return res.status(500).json({ success: false, error: 'FFmpeg binary not found' });
  }
  const inputBuf = req.body;
  if (!Buffer.isBuffer(inputBuf) || inputBuf.length === 0) {
    return res.status(400).json({ success: false, error: 'Empty video payload' });
  }

  const startSec = Math.max(0, parseFloat(String(req.query.start || '0')) || 0);
  const durationSec = Math.min(30, Math.max(0.5, parseFloat(String(req.query.duration || '10')) || 10));
  const fps = Math.min(25, Math.max(5, parseInt(String(req.query.fps || '12'), 10) || 12));
  const width = Math.min(960, Math.max(200, parseInt(String(req.query.width || '480'), 10) || 480));
  const rawExt = String(req.query.ext || 'mp4').replace(/[^a-z0-9]/gi, '').slice(0, 6) || 'mp4';

  const id = crypto.randomBytes(8).toString('hex');
  const inFile = path.join(os.tmpdir(), `kray_in_${id}.${rawExt}`);
  const outFile = path.join(os.tmpdir(), `kray_out_${id}.gif`);

  try {
    await fs.promises.writeFile(inFile, inputBuf);

    const vf = `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5`;
    await new Promise<void>((resolve, reject) => {
      execFile(
        ffmpegPath as string,
        ['-y', '-ss', String(startSec), '-t', String(durationSec), '-i', inFile, '-vf', vf, '-loop', '0', outFile],
        { timeout: 120000, maxBuffer: 10 * 1024 * 1024 },
        (err) => (err ? reject(err) : resolve())
      );
    });

    const outBuf = await fs.promises.readFile(outFile);
    res.json({
      success: true,
      originalSize: inputBuf.length,
      gifSize: outBuf.length,
      duration: durationSec,
      fps,
      width,
      dataUrl: `data:image/gif;base64,${outBuf.toString('base64')}`
    });
  } catch (err: any) {
    console.error('Video to GIF error:', err);
    res.status(500).json({ success: false, error: err?.message || 'Conversion failed' });
  } finally {
    fs.promises.unlink(inFile).catch(() => {});
    fs.promises.unlink(outFile).catch(() => {});
  }
});

function getKyivWorkHoursState(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(now);

  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;

  const dayMap: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
  const day = dayMap[map.weekday || 'Mon'] ?? 1;
  const hour = parseInt(map.hour || '0', 10) % 24;
  const minute = parseInt(map.minute || '0', 10);
  const mins = hour * 60 + minute;

  const isWorkDay = day >= 1 && day <= 5;
  const isWorkingHours = isWorkDay && mins >= 9 * 60 && mins < 18 * 60;
  return { isWorkingHours, day, mins };
}

app.get('/api/contact-phone', (_req, res) => {
  const state = getKyivWorkHoursState();
  if (!state.isWorkingHours) {
    return res.json({ isWorkingHours: false });
  }
  const parts = ['+38', '063', '767', '83', '20'];
  return res.json({
    isWorkingHours: true,
    display: `${parts[0]} (${parts[1]}) ${parts[2]}-${parts[3]}-${parts[4]}`,
    href: `tel:${parts.join('')}`
  });
});

app.post('/api/convert-image', async (req, res) => {
  try {
    const { dataUrl, filename, format, quality, lossless } = req.body || {};
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ success: false, error: 'Missing image data' });
    }

    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ success: false, error: 'Invalid base64 dataUrl' });
    }

    const mimeIn = match[1].toLowerCase();
    const inputBuf = Buffer.from(match[2], 'base64');
    const targetFmt = format === 'avif' ? 'avif' : 'webp';
    const q = Math.min(100, Math.max(1, parseInt(quality, 10) || 80));
    const isLossless = Boolean(lossless);
    const isGif = mimeIn.includes('gif');

    let pipeline = sharp(inputBuf, { animated: isGif && targetFmt === 'webp', limitInputPixels: false });
    const meta = await pipeline.metadata();

    let outBuf: Buffer;
    if (targetFmt === 'avif') {
      outBuf = await pipeline.avif({ quality: q, lossless: isLossless, effort: 4 }).toBuffer();
    } else {
      outBuf = await pipeline.webp({ quality: q, lossless: isLossless, effort: 4 }).toBuffer();
    }

    const baseName = String(filename || 'image').replace(/\.[^/.]+$/, '');
    const outName = `${baseName}.${targetFmt}`;
    const outMime = targetFmt === 'avif' ? 'image/avif' : 'image/webp';
    const savingsPercent = inputBuf.length > 0
      ? Math.round(((inputBuf.length - outBuf.length) / inputBuf.length) * 100)
      : 0;

    res.json({
      success: true,
      filename: outName,
      format: targetFmt,
      originalSize: inputBuf.length,
      convertedSize: outBuf.length,
      savingsPercent,
      width: meta.width || 0,
      height: meta.height || 0,
      dataUrl: `data:${outMime};base64,${outBuf.toString('base64')}`
    });
  } catch (err: any) {
    console.error('Image convert error:', err);
    res.status(500).json({ success: false, error: err?.message || 'Conversion failed' });
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
    const detectAcceptLang = (header?: string): 'uk' | 'ru' | 'en' => {
      if (!header) return 'uk';
      const parts = header
        .split(',')
        .map((part) => {
          const [tag, qPart] = part.trim().split(';');
          const q = qPart && qPart.trim().startsWith('q=') ? parseFloat(qPart.trim().slice(2)) : 1;
          return { tag: tag.toLowerCase().trim(), q: Number.isFinite(q) ? q : 1 };
        })
        .sort((a, b) => b.q - a.q);

      for (const { tag } of parts) {
        if (tag.startsWith('uk') || tag.startsWith('ua')) return 'uk';
        if (tag.startsWith('ru') || tag.startsWith('be') || tag.startsWith('kk')) return 'ru';
        if (tag.startsWith('en')) return 'en';
      }
      return 'uk';
    };

    app.get(['/ru/', '/ru/index.html'], (_req, res, next) => {
      const filePath = path.resolve(process.cwd(), 'dist', 'ru', 'index.html');
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
      return next();
    });

    app.get(['/en/', '/en/index.html'], (_req, res, next) => {
      const filePath = path.resolve(process.cwd(), 'dist', 'en', 'index.html');
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
      return next();
    });

    app.get('/ru', (req, res, next) => (req.path === '/ru' ? res.redirect(301, '/ru/') : next()));
    app.get('/en', (req, res, next) => (req.path === '/en' ? res.redirect(301, '/en/') : next()));

    app.get(['/', '/index.html'], (_req, res, next) => {
      const filePath = path.resolve(process.cwd(), 'dist', 'index.html');
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
      return next();
    });

    app.use('/assets', express.static('dist/assets', { maxAge: '1y', immutable: true }));
    app.use(express.static('dist'));

    app.use((req, res) => {
      const lang = detectAcceptLang(req.headers['accept-language']);
      const fileName = lang === 'uk' ? '404.html' : `404.${lang}.html`;
      const filePath = path.resolve(process.cwd(), 'dist', fileName);
      if (fs.existsSync(filePath)) {
        res.setHeader('Vary', 'Accept-Language');
        return res.status(404).sendFile(filePath);
      }
      const fallbackPath = path.resolve(process.cwd(), 'dist', '404.html');
      if (fs.existsSync(fallbackPath)) {
        return res.status(404).sendFile(fallbackPath);
      }
      return res.status(404).send('404 Not Found');
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
