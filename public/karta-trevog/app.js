(function () {
  const I18N = {
    ua: {
      pageTitle: 'Карта повітряних тривог України онлайн зараз (Live) — Червона, жовта, зелена зони | KRAY DIGITAL',
      badge: 'УКРАЇНА • МОНІТОРИНГ ТРИВОГ LIVE',
      linkOutages: '⚡ Графік світла (Дніпро)',
      orderText: 'Замовити сайт',
      title: 'Карта повітряних тривог України онлайн — моніторинг у реальному часі',
      subtitle: 'Актуальний статус повітряної небезпеки по областях та районах України зараз: червона, жовта та зелена зони з автооновленням кожні 20 секунд.',
      statRed: 'Червона зона (Вся область)',
      statYellow: 'Жовта зона (Окремі райони)',
      statGreen: 'Зелена зона (Спокійно)',
      legRed: 'Червона — тривога по всій області',
      legYellow: 'Жовта — часткова тривога (окремі райони)',
      legGreen: 'Зелена — тривоги немає',
      listTitle: 'Регіони зараз',
      listHint: 'Натисніть на область',
      noteTitle: 'Офіційні джерела та безпека:',
      noteText: 'Карта відображає реальний статус повітряних тривог по областях та районах України з відкритого API моніторигу. Координати цілей ППО не публікуються у відкритому доступі з міркувань безпеки — актуальні повідомлення про загрози читайте в офіційному каналі Повітряних Сил ЗСУ (<a href="https://t.me/kpszsu" target="_blank" rel="noopener noreferrer">@kpszsu</a>).',
      footerOutages: 'Графіки відключень світла',
      statusRed: 'Тривога',
      statusYellow: 'Часткова',
      statusGreen: 'Спокійно',
      updated: 'Оновлено:',
      raionsLabel: 'р-нів',
      kyivName: 'м. Київ',
      seoH2: 'Онлайн карта повітряних тривог України зараз: як читати зони та отримувати точні дані',
      seoP1: 'Оперативна <strong>карта повітряних тривог України онлайн</strong> дозволяє в один клік перевірити поточну ситуацію у всіх 24 областях України, м. Києві та АР Крим. Сервіс працює в режимі реального часу та синхронізується з порайонними даними оповіщення.',
      seoC1Title: '🔴 Червона зона — повна тривога',
      seoC1Text: 'Позначає області, де сигнал повітряної тривоги активований на всій території регіону (усі райони області). За такого статусу необхідно негайно пройти до найближчого укриття.',
      seoC2Title: '🟡 Жовта зона — часткова тривога по районах',
      seoC2Text: 'Відображає області, де небезпека оголошена точково — лише в окремих районах. Наведіть курсор на область або перегляньте список праворуч, щоб дізнатися активні райони.',
      seoC3Title: '🟢 Зелена зона — відбій тривоги',
      seoC3Text: 'Означає відсутність активного сигналу повітряної тривоги в усіх районах області. Система автоматично оновлює статуси кожні 20 секунд.',
      seoLinksLabel: 'Корисні сервіси:',
      seoLinkOutages: 'Графік відключень світла Дніпро та область (ДТЕК / ЦЕК / YASNO)'
    },
    ru: {
      pageTitle: 'Карта воздушных тревог Украины онлайн сейчас (Live) — Красная, жёлтая, зелёная зоны | KRAY DIGITAL',
      badge: 'УКРАИНА • МОНИТОРИНГ ТРЕВОГ LIVE',
      linkOutages: '⚡ График света (Днепр)',
      orderText: 'Заказать сайт',
      title: 'Карта воздушных тревог Украины онлайн — мониторинг в реальном времени',
      subtitle: 'Актуальный статус воздушной опасности по областям и районам Украины сейчас: красная, жёлтая и зелёная зоны с автообновлением каждые 20 секунд.',
      statRed: 'Красная зона (Вся область)',
      statYellow: 'Жёлтая зона (Отдельные районы)',
      statGreen: 'Зелёная зона (Спокойно)',
      legRed: 'Красная — тревога по всей области',
      legYellow: 'Жёлтая — частичная тревога (отдельные районы)',
      legGreen: 'Зелёная — тревоги нет',
      listTitle: 'Регионы сейчас',
      listHint: 'Нажмите на область',
      noteTitle: 'Официальные источники и безопасность:',
      noteText: 'Карта отображает реальный статус воздушных тревог по областям и районам Украины из открытого API мониторинга. Координаты целей ПВО не публикуются в открытом доступе из соображений безопасности — актуальные сводки об угрозах читайте в официальном канале Воздушных Сил ВСУ (<a href="https://t.me/kpszsu" target="_blank" rel="noopener noreferrer">@kpszsu</a>).',
      footerOutages: 'Графики отключений света',
      statusRed: 'Тревога',
      statusYellow: 'Частичная',
      statusGreen: 'Спокойно',
      updated: 'Обновлено:',
      raionsLabel: 'р-нов',
      kyivName: 'г. Киев',
      seoH2: 'Онлайн карта воздушных тревог Украины сейчас: как читать зоны и получать точные данные',
      seoP1: 'Оперативная <strong>карта воздушных тревог Украины онлайн</strong> позволяет в один клик проверить текущую обстановку во всех областях Украины, г. Киеве и АР Крым. Сервис работает в реальном времени и синхронизируется с порайонными данными оповещения.',
      seoC1Title: '🔴 Красная зона — полная тревога',
      seoC1Text: 'Обозначает области, где сигнал воздушной тревоги активирован на всей территории региона (все районы области). При таком статусе необходимо немедленно пройти в ближайшее укрытие.',
      seoC2Title: '🟡 Жёлтая зона — частичная тревога по районам',
      seoC2Text: 'Отображает области, где опасность объявлена точечно — только в отдельных районах (например, при угрозе БПЛА или обстрелов). Наведите курсор на область или посмотрите список справа, чтобы увидеть активные районы.',
      seoC3Title: '🟢 Зелёная зона — отбой тревоги',
      seoC3Text: 'Означает отсутствие активного сигнала воздушной тревоги во всех районах области. Система автоматически обновляет статусы каждые 20 секунд без перезагрузки страницы.',
      seoLinksLabel: 'Полезные сервисы:',
      seoLinkOutages: 'График отключений света Днепр и область (ДТЭК / ЦЭК / YASNO)'
    },
    en: {
      pageTitle: 'Ukraine Air Raid Alerts Map Live — KRAY DIGITAL',
      badge: 'UKRAINE • LIVE AIR ALERTS',
      linkOutages: '⚡ Power Outages (Dnipro)',
      orderText: 'Order Website',
      title: 'Ukraine Air Raid Alerts Map (Live)',
      subtitle: 'Real-time air raid alert status across all regions of Ukraine. Auto-updates every 20 seconds.',
      statRed: 'Red Zone (Full Region)',
      statYellow: 'Yellow Zone (Partial Districts)',
      statGreen: 'Green Zone (Clear)',
      legRed: 'Red — full region air raid alert',
      legYellow: 'Yellow — partial district-level alert',
      legGreen: 'Green — no active alert',
      listTitle: 'Regions Status',
      listHint: 'Click any region',
      noteTitle: 'Official Sources & Safety:',
      noteText: 'This map shows real-time air raid alert status by region and district from open monitoring APIs. Live air defense target coordinates are not publicly exposed for security reasons — follow official Ukrainian Air Force updates at (<a href="https://t.me/kpszsu" target="_blank" rel="noopener noreferrer">@kpszsu</a>).',
      footerOutages: 'Power Outage Schedules',
      statusRed: 'Alert',
      statusYellow: 'Partial',
      statusGreen: 'Clear',
      updated: 'Updated:',
      raionsLabel: 'districts',
      kyivName: 'Kyiv City',
      seoH2: 'Ukraine Air Raid Alerts Map Live: Understanding Alert Zones',
      seoP1: 'Our real-time <strong>Ukraine air raid alerts map</strong> lets you instantly check the current safety status across all regions of Ukraine, Kyiv City, and Crimea with district-level precision.',
      seoC1Title: '🔴 Red Zone — Full Region Alert',
      seoC1Text: 'Indicates regions where air raid sirens are active across the entire oblast (all districts). Proceed immediately to the nearest shelter.',
      seoC2Title: '🟡 Yellow Zone — Partial District Alert',
      seoC2Text: 'Indicates regions where alerts are active in specific districts only. Hover over a region or check the sidebar to see the exact active districts.',
      seoC3Title: '🟢 Green Zone — All Clear',
      seoC3Text: 'Indicates no active air raid alerts in any district of the region. Statuses refresh automatically every 20 seconds.',
      seoLinksLabel: 'Useful Services:',
      seoLinkOutages: 'Dnipro & Region Power Outage Schedules (DTEK / CEK / YASNO)'
    }
  };

  function detectLang() {
    const nav = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    if (nav.startsWith('ru')) return 'ru';
    if (nav.startsWith('en')) return 'en';
    return 'ua';
  }

  const lang = detectLang();
  const dict = I18N[lang] || I18N.ua;

  function applyI18n() {
    document.title = dict.pageTitle;
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
    setText('i18nBadge', dict.badge);
    setText('i18nLinkOutages', dict.linkOutages);
    setText('i18nOrderText', dict.orderText);
    setText('i18nTitle', dict.title);
    setText('i18nSubtitle', dict.subtitle);
    setText('i18nStatRed', dict.statRed);
    setText('i18nStatYellow', dict.statYellow);
    setText('i18nStatGreen', dict.statGreen);
    setText('i18nLegRed', dict.legRed);
    setText('i18nLegYellow', dict.legYellow);
    setText('i18nLegGreen', dict.legGreen);
    setText('i18nListTitle', dict.listTitle);
    setText('i18nListHint', dict.listHint);
    setText('i18nNoteTitle', dict.noteTitle);
    setHtml('i18nNoteText', dict.noteText);
    setText('i18nSeoH2', dict.seoH2);
    setHtml('i18nSeoP1', dict.seoP1);
    setText('i18nSeoC1Title', dict.seoC1Title);
    setText('i18nSeoC1Text', dict.seoC1Text);
    setText('i18nSeoC2Title', dict.seoC2Title);
    setText('i18nSeoC2Text', dict.seoC2Text);
    setText('i18nSeoC3Title', dict.seoC3Title);
    setText('i18nSeoC3Text', dict.seoC3Text);
    setText('i18nSeoLinksLabel', dict.seoLinksLabel);
    setText('i18nSeoLinkOutages', dict.seoLinkOutages);
    setText('i18nFooterOutages', dict.footerOutages);
  }

  applyI18n();

  const COLORS = {
    red: { fill: '#ef4444', stroke: '#ff5252', fillOpacity: 0.62 },
    yellow: { fill: '#facc15', stroke: '#fde047', fillOpacity: 0.54 },
    green: { fill: '#22c55e', stroke: '#4ade80', fillOpacity: 0.44 }
  };

  const OBLAST_CENTERS = [
    { coords: [50.4501, 30.5234], ua: 'Київ', ru: 'Киев', en: 'Kyiv', capital: true },
    { coords: [48.4647, 35.0462], ua: 'Дніпро', ru: 'Днепр', en: 'Dnipro' },
    { coords: [49.9935, 36.2304], ua: 'Харків', ru: 'Харьков', en: 'Kharkiv' },
    { coords: [46.4825, 30.7233], ua: 'Одеса', ru: 'Одесса', en: 'Odesa' },
    { coords: [49.8397, 24.0297], ua: 'Львів', ru: 'Львов', en: 'Lviv' },
    { coords: [47.8388, 35.1396], ua: 'Запоріжжя', ru: 'Запорожье', en: 'Zaporizhzhia' },
    { coords: [49.2331, 28.4682], ua: 'Вінниця', ru: 'Винница', en: 'Vinnytsia' },
    { coords: [49.5883, 34.5514], ua: 'Полтава', ru: 'Полтава', en: 'Poltava' },
    { coords: [51.4982, 31.2893], ua: 'Чернігів', ru: 'Чернигов', en: 'Chernihiv' },
    { coords: [49.4444, 32.0598], ua: 'Черкаси', ru: 'Черкассы', en: 'Cherkasy' },
    { coords: [50.2547, 28.6587], ua: 'Житомир', ru: 'Житомир', en: 'Zhytomyr' },
    { coords: [50.9077, 34.7981], ua: 'Суми', ru: 'Сумы', en: 'Sumy' },
    { coords: [49.4229, 26.9871], ua: 'Хмельницький', ru: 'Хмельницкий', en: 'Khmelnytskyi' },
    { coords: [50.6199, 26.2516], ua: 'Рівне', ru: 'Ровно', en: 'Rivne' },
    { coords: [48.9226, 24.7111], ua: 'Івано-Франківськ', ru: 'Ивано-Франковск', en: 'Ivano-Frankivsk' },
    { coords: [49.5535, 25.5948], ua: 'Тернопіль', ru: 'Тернополь', en: 'Ternopil' },
    { coords: [50.7472, 25.3254], ua: 'Луцьк', ru: 'Луцк', en: 'Lutsk' },
    { coords: [48.6208, 22.2879], ua: 'Ужгород', ru: 'Ужгород', en: 'Uzhhorod' },
    { coords: [48.2921, 25.9358], ua: 'Чернівці', ru: 'Черновцы', en: 'Chernivtsi' },
    { coords: [48.5079, 32.2623], ua: 'Кропивницький', ru: 'Кропивницкий', en: 'Kropyvnytskyi' },
    { coords: [46.9750, 31.9946], ua: 'Миколаїв', ru: 'Николаев', en: 'Mykolaiv' },
    { coords: [46.6354, 32.6169], ua: 'Херсон', ru: 'Херсон', en: 'Kherson' },
    { coords: [48.0159, 37.8028], ua: 'Донецьк', ru: 'Донецк', en: 'Donetsk' },
    { coords: [48.5740, 39.3078], ua: 'Луганськ', ru: 'Луганск', en: 'Luhansk' },
    { coords: [44.9521, 34.1024], ua: 'Сімферополь', ru: 'Симферополь', en: 'Simferopol' }
  ];

  let map = null;
  let geoLayer = null;
  let kyivMarker = null;
  let geoData = null;
  let latestAlerts = null;
  const featureLayersByUkName = {};

  function renderCenterLabels() {
    if (!map || typeof L === 'undefined') return;
    OBLAST_CENTERS.forEach(c => {
      const label = c[lang] || c.ua;
      const cls = c.capital ? 'oblast-label-inner is-capital' : 'oblast-label-inner';
      L.marker(c.coords, {
        interactive: false,
        zIndexOffset: 500,
        icon: L.divIcon({
          className: 'oblast-center-label',
          html: `<span class="${cls}">${label}</span>`,
          iconSize: [0, 0]
        })
      }).addTo(map);
    });
  }

  function initMap() {
    const el = document.getElementById('ukraineAlertsMap');
    if (!el || typeof L === 'undefined') return;

    map = L.map('ukraineAlertsMap', {
      center: [48.55, 31.3],
      zoom: 6,
      minZoom: 5,
      maxZoom: 10,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    renderCenterLabels();
  }

  function getDisplayName(props) {
    if (lang === 'ru') return props.nameRu || props.name;
    if (lang === 'en') return props.nameEn || props.name;
    return props.name;
  }

  function getStatusLabel(status) {
    if (status === 'red') return dict.statusRed;
    if (status === 'yellow') return dict.statusYellow;
    return dict.statusGreen;
  }

  function formatRegionTooltip(displayName, alertInfo) {
    const st = alertInfo ? alertInfo.status : 'green';
    const badgeColor = st === 'red' ? '#f87171' : (st === 'yellow' ? '#fbbf24' : '#34d399');
    const distInfo = (alertInfo && alertInfo.activeDistricts && alertInfo.activeDistricts.length > 0 && st === 'yellow')
      ? `<div style="font-size:11.5px; color:#fcd34d; margin-top:3px; max-width:240px; white-space:normal;">${alertInfo.activeDistricts.slice(0, 4).join(', ')}${alertInfo.activeDistricts.length > 4 ? ` (+${alertInfo.activeDistricts.length - 4})` : ''}</div>`
      : '';
    const timeStr = (alertInfo && alertInfo.changed && !alertInfo.changed.startsWith('1970-'))
      ? `<div style="font-size:11.5px; color:#94a3b8; margin-top:2px;">${alertInfo.changed}</div>`
      : '';
    return `
      <strong>${displayName}</strong><br>
      <span style="color:${badgeColor}; font-weight:700;">● ${getStatusLabel(st)}</span>
      ${distInfo}
      ${timeStr}
    `;
  }

  function renderMapAndList() {
    if (!geoData || !latestAlerts || !map) return;

    const regionsMap = latestAlerts.regions || {};

    if (geoLayer) map.removeLayer(geoLayer);
    Object.keys(featureLayersByUkName).forEach(k => delete featureLayersByUkName[k]);

    geoLayer = L.geoJSON(geoData, {
      style: (feature) => {
        const ukName = feature.properties.name;
        const info = regionsMap[ukName];
        const st = info ? info.status : 'green';
        const c = COLORS[st] || COLORS.green;
        return {
          color: c.stroke,
          weight: st === 'red' ? 2 : 1.2,
          fillColor: c.fill,
          fillOpacity: c.fillOpacity
        };
      },
      onEachFeature: (feature, layer) => {
        const ukName = feature.properties.name;
        const dispName = getDisplayName(feature.properties);
        const info = regionsMap[ukName];
        featureLayersByUkName[ukName] = layer;
        layer.bindTooltip(formatRegionTooltip(dispName, info), {
          sticky: true,
          className: 'alert-tooltip'
        });
        layer.on('click', () => {
          map.fitBounds(layer.getBounds(), { padding: [30, 30], maxZoom: 8 });
        });
      }
    }).addTo(map);

    // Kyiv City Marker
    const kyivInfo = regionsMap['м. Київ'];
    const kyivStatus = kyivInfo ? kyivInfo.status : 'green';
    const kc = COLORS[kyivStatus] || COLORS.green;
    if (kyivMarker) map.removeLayer(kyivMarker);
    kyivMarker = L.circleMarker([50.4501, 30.5234], {
      radius: 8,
      color: '#ffffff',
      weight: 2,
      fillColor: kc.fill,
      fillOpacity: 0.9
    }).addTo(map);
    kyivMarker.bindTooltip(formatRegionTooltip(dict.kyivName, kyivInfo), {
      className: 'alert-tooltip'
    });

    // Stats & Sidebar list
    let countRed = 0, countYellow = 0, countGreen = 0;
    const listItems = [];

    geoData.features.forEach(f => {
      const ukName = f.properties.name;
      const info = regionsMap[ukName] || { status: 'green', alertNow: false, changed: '', minutesAgo: null };
      if (info.status === 'red') countRed++;
      else if (info.status === 'yellow') countYellow++;
      else countGreen++;

      listItems.push({
        ukName,
        displayName: getDisplayName(f.properties),
        ...info
      });
    });

    // Include Kyiv City in list
    if (kyivInfo) {
      if (kyivInfo.status === 'red') countRed++;
      else if (kyivInfo.status === 'yellow') countYellow++;
      else countGreen++;
      listItems.push({
        ukName: 'м. Київ',
        displayName: dict.kyivName,
        ...kyivInfo
      });
    }

    document.getElementById('countRed').textContent = countRed;
    document.getElementById('countYellow').textContent = countYellow;
    document.getElementById('countGreen').textContent = countGreen;

    const orderWeight = { red: 0, yellow: 1, green: 2 };
    listItems.sort((a, b) => {
      const diff = orderWeight[a.status] - orderWeight[b.status];
      return diff !== 0 ? diff : a.displayName.localeCompare(b.displayName);
    });

    const listContainer = document.getElementById('regionsList');
    listContainer.innerHTML = '';
    listItems.forEach(item => {
      const row = document.createElement('div');
      row.className = `region-item is-${item.status}`;
      const distCount = (item.activeDistricts && item.activeDistricts.length > 0 && item.totalDistricts > 0)
        ? `${item.activeDistricts.length} / ${item.totalDistricts} ${dict.raionsLabel}`
        : '';
      const metaText = distCount || (item.changed && !item.changed.startsWith('1970-') ? item.changed : '—');
      row.innerHTML = `
        <div>
          <div class="region-name">${item.displayName}</div>
          <div class="region-meta">${metaText}</div>
        </div>
        <span class="region-badge badge-${item.status}">${getStatusLabel(item.status)}</span>
      `;
      row.addEventListener('click', () => {
        if (item.ukName === 'м. Київ' && kyivMarker) {
          map.flyTo([50.4501, 30.5234], 9, { duration: 0.7 });
          kyivMarker.openTooltip();
        } else if (featureLayersByUkName[item.ukName]) {
          const lyr = featureLayersByUkName[item.ukName];
          map.fitBounds(lyr.getBounds(), { padding: [30, 30], maxZoom: 8 });
          lyr.openTooltip();
        }
      });
      listContainer.appendChild(row);
    });

    const syncEl = document.getElementById('syncTimeLabel');
    if (syncEl) {
      const timeOnly = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      syncEl.textContent = `${dict.updated} ${timeOnly}`;
    }
  }

  async function refreshAlerts() {
    const btn = document.getElementById('btnRefresh');
    if (btn) btn.style.transform = 'rotate(360deg)';
    setTimeout(() => { if (btn) btn.style.transform = 'none'; }, 400);

    try {
      const res = await fetch('/api/air-alerts');
      const data = await res.json();
      if (data && data.success) {
        latestAlerts = data;
        renderMapAndList();
      }
    } catch (e) {
      console.error('Failed to fetch air alerts:', e);
    }
  }

  async function bootstrap() {
    initMap();
    try {
      const [geoRes, alertsRes] = await Promise.all([
        fetch('./ukraine-regions.json'),
        fetch('/api/air-alerts')
      ]);
      if (geoRes.ok) geoData = await geoRes.json();
      if (alertsRes.ok) {
        const data = await alertsRes.json();
        if (data && data.success) latestAlerts = data;
      }
      renderMapAndList();
    } catch (e) {
      console.error('Failed to bootstrap alerts map:', e);
    }
    setInterval(refreshAlerts, 20000);
  }

  const btnRefresh = document.getElementById('btnRefresh');
  if (btnRefresh) btnRefresh.addEventListener('click', refreshAlerts);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
