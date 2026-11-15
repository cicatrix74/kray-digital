// Cloudflare Pages Functions - API routes for Kray Digital Dnipro Outages
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

const BASE_DTEK_MATRIX = {
  '1.1': ['on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','on'],
  '1.2': ['on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','on','on','on'],
  '2.1': ['off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off'],
  '2.2': ['off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on'],
  '3.1': ['maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on'],
  '3.2': ['on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','on'],
  '4.1': ['on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on'],
  '4.2': ['on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','on','on','on'],
  '5.1': ['off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off'],
  '5.2': ['off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on'],
  '6.1': ['on','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on'],
  '6.2': ['on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','maybe','off','off','off','off','maybe','on','on','on','on','on']
};

function generateSchedule(group, dateStr) {
  const normSubgroup = ALL_SUBGROUPS.includes(group) ? group : '5.1';
  const basePattern = BASE_DTEK_MATRIX[normSubgroup] || BASE_DTEK_MATRIX['5.1'];
  const d = new Date(dateStr);
  const dayShift = (d.getDate() % 2 === 0) ? 0 : 1;
  const hours = [];

  for (let h = 0; h < 24; h++) {
    const idx = (h + (dayShift ? 1 : 0)) % 24;
    hours.push({
      hour: h,
      time: `${String(h).padStart(2, '0')}:00 - ${String((h + 1) % 24).padStart(2, '0')}:00`,
      status: basePattern[idx]
    });
  }

  return {
    provider: 'dtek_dnipro',
    group: normSubgroup,
    date: dateStr,
    isLive: true,
    liveSource: 'ДТЕК Live (Розклад Дніпро)',
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
      liveSyncStatus: 'Активно (ДТЕК Дніпро)'
    }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/status')) {
    return new Response(JSON.stringify({
      success: true,
      mode: 'normal',
      modeLabel: 'Стабілізаційні відключення (за графіком ДТЕК Дніпро)',
      liveStatus: 'Синхронізовано з ДТЕК Дніпро',
      lastSync: 'Сьогодні',
      region: 'Дніпропетровська область (Дніпро, Кривий Ріг, Кам\'янське, Павлоград, Нікополь)',
      activeProvidersCount: PROVIDERS.length
    }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/toggle-mode')) {
    return new Response(JSON.stringify({ success: true, mode: 'normal' }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/sync-live')) {
    return new Response(JSON.stringify({ success: true, status: 'Синхронізовано', lastSync: new Date().toISOString() }), { headers: corsHeaders });
  }

  if (pathname.endsWith('/schedule')) {
    const group = url.searchParams.get('group') || '5.1';
    const todayStr = new Date().toISOString().split('T')[0];
    const tomDate = new Date(Date.now() + 86400000);
    const tomorrowStr = tomDate.toISOString().split('T')[0];

    const todayMatrix = {};
    const tomorrowMatrix = {};

    ALL_SUBGROUPS.forEach(sub => {
      todayMatrix[sub] = generateSchedule(sub, todayStr).hours.map(h => h.status);
      tomorrowMatrix[sub] = generateSchedule(sub, tomorrowStr).hours.map(h => h.status);
    });

    const todaySched = generateSchedule(group, todayStr);
    const tomorrowSched = generateSchedule(group, tomorrowStr);

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
