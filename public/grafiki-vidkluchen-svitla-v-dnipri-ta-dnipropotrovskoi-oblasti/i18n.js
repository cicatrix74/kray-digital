// Multi-language system (UA / RU / EN) with auto-detection & SEO optimization
(function() {
  const TRANSLATIONS = {
    ua: {
      orderSiteBtn: 'Замовити сайт',
      seoTitle: 'Графік відключень світла — Дніпро та Дніпропетровська область ДТЕК | Неофіційний моніторинг',
      metaDesc: 'Неофіційний сервіс моніторингу графіків відключень світла у Дніпрі та Дніпропетровській області (відкриті дані ДТЕК, ЦЕК, YASNO). Пошук черги за адресою будинку, інтерактивна карта та таймер.',
      brandBadge: 'Дніпропетровська область • Неофіційний моніторинг',
      emergencyBannerTitle: 'УВАГА: В області застосовано екстрені (аварійні) відключення світла!',
      emergencyBannerSub: 'За розпорядженням НЕК Укренерго графіки погодинних відключень тимчасово не діють.',
      h1Title: 'Графік відключень світла: Дніпро та Дніпропетровська область',
      h1Subtitle: 'Неофіційний інформаційний ресурс на основі відкритих даних ДТЕК Дніпровські електромережі, ЦЕК та YASNO. Пряма синхронізація, зворотний відлік до перемикання та точний пошук підгрупи за номером будинку.',
      badgeUnofficial: 'Неофіційний ресурс',
      disclaimerNotice: 'Дані сформовано з відкритих джерел ДТЕК/ЦЕК для зручності жителів. Сервіс не є офіційним представником енергетичних компаній.',
      liveDtekTag: '🟢 ДТЕК ДНІПРО: LIVE',
      labelOperator: 'Оператор електромереж:',
      labelSubgroups: 'Оберіть вашу підгрупу відключень (1.1–6.2):',
      subgroupHint: 'ДТЕК Дніпро',
      labelSearchAddress: 'Пошук черги за адресою:',
      regionHint: 'Дніпропетровська обл.',
      cityAll: '🌐 Усі міста області',
      cityDnipro: '🏙️ м. Дніпро',
      cityKryvyiRih: '⛏️ м. Кривий Ріг',
      cityKamianske: '🏭 м. Кам\'янське',
      cityPavlohrad: '⚒️ м. Павлоград',
      cityNikopol: '🌊 м. Нікополь',
      placeholderStreet: 'Вулиця (напр. Мандриківська, Миру, Гагаріна)...',
      placeholderBld: 'Буд....',
      btnFind: 'Знайти',
      statusPowerOn: 'Світло зараз Є',
      statusPowerMaybe: 'Можливе відключення',
      statusPowerOff: 'Світло ВІДСУТНЄ',
      statusEmergencyTitle: 'Аварійні та екстрені відключення (ГАВ)',
      countdownLabelToOff: 'До відключення:',
      countdownLabelToOn: 'До увімкнення:',
      countdownLabelToMaybe: 'До жовтої зони:',
      countdownNoChanges: 'Змін у найближчі години не очікується',
      countdownCalc: 'Розрахунок часу...',
      tabToday: 'Сьогодні',
      tabTomorrow: 'Завтра',
      autoSyncLabel: 'Автоматичне оновлення з ДТЕК Дніпро',
      legendOn: 'Світло є (гарантовано)',
      legendMaybe: 'Можливе відключення / перехід (жовта зона)',
      legendOff: 'Світло відсутнє (сіра зона)',
      statGuaranteed: 'Світло гарантовано',
      statMaybe: 'Можливі відключення',
      statOff: 'Відключено за графіком',
      statEmergencyValue: 'Аварійні',
      unitHour: 'год',
      markerNow: 'Зараз',
      mapTitle: 'Інтерактивна карта відключень: м. Дніпро',
      mapSubtitle: 'Переважаючі черги житлових масивів обох берегів. Для 100% точності за номером будинку використовуйте пошук вище',
      mapLegendHint: '⚡ Клік по району автоматично перемикає розклад на відповідну підгрупу ДТЕК',
      mapPopupCity: 'м. Дніпро • ДТЕК Дніпровські електромережі',
      mapPopupPowerOn: '🟢 Світло зараз є',
      mapPopupEmergency: '🚨 Аварійне знеструмлення',
      mapPopupPowerOff: '⚡ Світло відсутнє',
      mapPopupPowerMaybe: '🟠 Можливе відключення',
      matrixTitle: 'Зведена таблиця всіх 12 підгруп Дніпропетровської області на 24 години',
      matrixColGroup: 'Підгрупа',
      matrixHint: '* Натисніть на будь-який рядок для перегляду підгрупи',
      matrixStatusNormal: '🟢 Сьогодні: без відключень',
      matrixStatusEmergency: '🚨 Аварійні відключення: графіки не діють!',
      footerCopyright: 'неофіційний ресурс онлайн-моніторингу графіків відключень для Дніпропетровської області.',
      footerSource: 'Джерело даних: відкриті графіки ДТЕК Дніпровські електромережі / ЦЕК / YASNO',
      providerDtek: 'ДТЕК Дніпровські електромережі',
      providerYasno: 'YASNO (Дніпровські енергетичні послуги)',
      providerCek: 'ПрАТ ПЕЕМ «ЦЕК» (Центральна енергетична компанія)',
      subgroupPrefix: 'Підгрупа',
      sourceEmergency: 'НЕК Укренерго (ГАВ/САВ)',
      sourceLive: 'ДТЕК Live Дніпро',
      buildingPrefix: 'буд.',
      testEmergencyBtn: '⚡ Тест: Аварійний / Стабілізаційний режим',
      countdown247: '24/7 БЕЗ ВІДКЛЮЧЕНЬ',
      countdownNoOutagesSub: 'Укренерго та ДТЕК не застосовують графіків на сьогодні',
      countdownPowerStatus: 'Статус електропостачання:',
      countdownUntilChange: 'До зміни стану:',
      countdownExpectedAt: 'О {time}:00 очікується {status}',
      searchNotFound: 'Вулицю не знайдено. Введіть назву без скорочень (напр. "Хмельницького", "Поля", "Мандриківська").',
      mapTooltipEmergency: '🚨 Аварійні відключення (графік не діє)',
      mapTooltipOff: '🔴 Відключено за графіком',
      mapTooltipMaybe: '🟠 Можливе відключення (жовта зона)',
      mapTooltipOn: '🟢 Світло є (гарантовано)',
      months: ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд']
    },
    ru: {
      orderSiteBtn: 'Заказать сайт',
      seoTitle: 'График отключений света — Днепр и Днепропетровская область ДТЭК | Неофициальный мониторинг',
      metaDesc: 'Неофициальный сервис мониторинга графиков отключений света в Днепре и Днепропетровской области (открытые данные ДТЭК, ЦЭК, YASNO). Поиск очереди по адресу дома, интерактивная карта и таймер.',
      brandBadge: 'Днепропетровская область • Неофициальный мониторинг',
      emergencyBannerTitle: 'ВНИМАНИЕ: В области введены экстренные (аварийные) отключения света!',
      emergencyBannerSub: 'По распоряжению НЭК Укрэнерго почасовые графики отключений временно не действуют.',
      h1Title: 'График отключений света: Днепр и Днепропетровская область',
      h1Subtitle: 'Неофициальный информационный ресурс на основе открытых данных ДТЭК Днепровские электросети, ЦЭК и YASNO. Прямая синхронизация, обратный отсчет до переключения и точный поиск подгруппы по номеру дома.',
      badgeUnofficial: 'Неофициальный ресурс',
      disclaimerNotice: 'Данные сформированы из открытых источников ДТЭК/ЦЭК для удобства жителей. Сервис не является официальным представителем энергетических компаний.',
      liveDtekTag: '🟢 ДТЭК ДНЕПР: LIVE',
      labelOperator: 'Оператор электросетей:',
      labelSubgroups: 'Выберите вашу подгруппу отключений (1.1–6.2):',
      subgroupHint: 'ДТЭК Днепр',
      labelSearchAddress: 'Поиск очереди по адресу:',
      regionHint: 'Днепропетровская обл.',
      cityAll: '🌐 Все города области',
      cityDnipro: '🏙️ г. Днепр',
      cityKryvyiRih: '⛏️ г. Кривой Рог',
      cityKamianske: '🏭 г. Каменское',
      cityPavlohrad: '⚒️ г. Павлоград',
      cityNikopol: '🌊 г. Никополь',
      placeholderStreet: 'Улица (напр. Мандрыковская, Мира, Гагарина)...',
      placeholderBld: 'Дом...',
      btnFind: 'Найти',
      statusPowerOn: 'Свет сейчас ЕСТЬ',
      statusPowerMaybe: 'Возможное отключение',
      statusPowerOff: 'Свет ОТСУТСТВУЕТ',
      statusEmergencyTitle: 'Аварийные и экстренные отключения (ГАО)',
      countdownLabelToOff: 'До отключения:',
      countdownLabelToOn: 'До включения:',
      countdownLabelToMaybe: 'До желтой зоны:',
      countdownNoChanges: 'Изменений в ближайшие часы не ожидается',
      countdownCalc: 'Расчет времени...',
      tabToday: 'Сегодня',
      tabTomorrow: 'Завтра',
      autoSyncLabel: 'Автоматическое обновление с ДТЭК Днепр',
      legendOn: 'Свет есть (гарантированно)',
      legendMaybe: 'Возможное отключение / переход (желтая зона)',
      legendOff: 'Свет отсутствует (серая зона)',
      statGuaranteed: 'Свет гарантирован',
      statMaybe: 'Возможные отключения',
      statOff: 'Отключено по графику',
      statEmergencyValue: 'Аварийные',
      unitHour: 'ч',
      markerNow: 'Сейчас',
      mapTitle: 'Интерактивная карта отключений: г. Днепр',
      mapSubtitle: 'Преобладающие очереди жилых массивов обоих берегов. Для 100% точности по номеру дома используйте поиск выше',
      mapLegendHint: '⚡ Клик по району автоматически переключает расписание на соответствующую подгруппу ДТЭК',
      mapPopupCity: 'г. Днепр • ДТЭК Днепровские электросети',
      mapPopupPowerOn: '🟢 Свет сейчас есть',
      mapPopupEmergency: '🚨 Аварийное обесточивание',
      mapPopupPowerOff: '⚡ Свет отсутствует',
      mapPopupPowerMaybe: '🟠 Возможное отключение',
      matrixTitle: 'Сводная таблица всех 12 подгрупп Днепропетровской области на 24 часа',
      matrixColGroup: 'Подгруппа',
      matrixHint: '* Нажмите на любую строку для просмотра расписания подгруппы',
      matrixStatusNormal: '🟢 Сегодня: без отключений',
      matrixStatusEmergency: '🚨 Аварийные отключения: графики не действуют!',
      footerCopyright: 'неофициальный ресурс онлайн-мониторинга графиков отключений для Днепропетровской области.',
      footerSource: 'Источник данных: открытые графики ДТЭК Днепровские электросети / ЦЭК / YASNO',
      providerDtek: 'ДТЭК Днепровские электросети',
      providerYasno: 'YASNO (Днепровские энергетические услуги)',
      providerCek: 'ЧАО ПЭЭМ «ЦЭК» (Центральная энергетическая компания)',
      subgroupPrefix: 'Подгруппа',
      sourceEmergency: 'НЭК Укрэнерго (ГАО/САО)',
      sourceLive: 'ДТЭК Live Днепр',
      buildingPrefix: 'д.',
      testEmergencyBtn: '⚡ Тест: Аварийный / Стабилизационный режим',
      countdown247: '24/7 БЕЗ ОТКЛЮЧЕНИЙ',
      countdownNoOutagesSub: 'Укрэнерго и ДТЭК не применяют графиков на сегодня',
      countdownPowerStatus: 'Статус электроснабжения:',
      countdownUntilChange: 'До изменения состояния:',
      countdownExpectedAt: 'В {time}:00 ожидается {status}',
      searchNotFound: 'Улица не найдена. Введите название без сокращений (напр. "Хмельницкого", "Поля", "Мандрыковская").',
      mapTooltipEmergency: '🚨 Аварийные отключения (график не действует)',
      mapTooltipOff: '🔴 Отключено по графику',
      mapTooltipMaybe: '🟠 Возможное отключение (желтая зона)',
      mapTooltipOn: '🟢 Свет есть (гарантированно)',
      months: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
    },
    en: {
      orderSiteBtn: 'Order a Website',
      seoTitle: 'Power Outage Schedule Dnipro & Region | Unofficial Live Monitoring',
      metaDesc: 'Unofficial power outage schedule monitoring for Dnipro and Dnipropetrovsk region (based on open data from DTEK, CEK, YASNO). Address lookup, interactive map, and countdown timer.',
      brandBadge: 'Dnipropetrovsk Region • Unofficial Monitor',
      emergencyBannerTitle: 'ATTENTION: Emergency power outages are in effect in the region!',
      emergencyBannerSub: 'By order of NEC Ukrenergo, hourly scheduled stabilizer power cuts are temporarily suspended.',
      h1Title: 'Power Outage Schedule: Dnipro and Dnipropetrovsk Region',
      h1Subtitle: 'Unofficial community resource based on public data from DTEK Dnipro Grids, CEK and YASNO. Live synchronization, switching countdown timer, and exact subgroup address lookup.',
      badgeUnofficial: 'Unofficial resource',
      disclaimerNotice: 'Data is compiled from public DTEK/CEK sources for community convenience. Not an official affiliate of utility companies.',
      liveDtekTag: '🟢 DTEK DNIPRO: LIVE',
      labelOperator: 'Power grid operator:',
      labelSubgroups: 'Choose your outage subgroup (1.1–6.2):',
      subgroupHint: 'DTEK Dnipro',
      labelSearchAddress: 'Find subgroup by address:',
      regionHint: 'Dnipropetrovsk reg.',
      cityAll: '🌐 All region cities',
      cityDnipro: '🏙️ Dnipro',
      cityKryvyiRih: '⛏️ Kryvyi Rih',
      cityKamianske: '🏭 Kamianske',
      cityPavlohrad: '⚒️ Pavlohrad',
      cityNikopol: '🌊 Nikopol',
      placeholderStreet: 'Street name (e.g. Mandrykivska, Heroiv, Nauky)...',
      placeholderBld: 'Bld...',
      btnFind: 'Search',
      statusPowerOn: 'Power is ON now',
      statusPowerMaybe: 'Possible outage',
      statusPowerOff: 'Power is OFF',
      statusEmergencyTitle: 'Emergency Power Outages (GAO)',
      countdownLabelToOff: 'Until power off:',
      countdownLabelToOn: 'Until power on:',
      countdownLabelToMaybe: 'Until yellow zone:',
      countdownNoChanges: 'No scheduled changes in the coming hours',
      countdownCalc: 'Calculating time...',
      tabToday: 'Today',
      tabTomorrow: 'Tomorrow',
      autoSyncLabel: 'Automated live sync with DTEK Dnipro',
      legendOn: 'Power guaranteed (green)',
      legendMaybe: 'Possible outage (yellow zone)',
      legendOff: 'Power cut (grey zone)',
      statGuaranteed: 'Guaranteed power',
      statMaybe: 'Possible cuts',
      statOff: 'Cut by schedule',
      statEmergencyValue: 'Emergency',
      unitHour: 'hrs',
      markerNow: 'Now',
      mapTitle: 'Interactive Power Outages Map: Dnipro City',
      mapSubtitle: 'Main subgroup coverage across both river banks. For 100% precision by house number, use address search above',
      mapLegendHint: '⚡ Clicking any district automatically switches schedule to that DTEK subgroup',
      mapPopupCity: 'Dnipro • DTEK Dnipro Grids',
      mapPopupPowerOn: '🟢 Power is ON',
      mapPopupEmergency: '🚨 Emergency outage',
      mapPopupPowerOff: '⚡ Power is cut',
      mapPopupPowerMaybe: '🟠 Possible outage',
      matrixTitle: 'Summary 24-Hour Matrix for All 12 Subgroups (Dnipropetrovsk Region)',
      matrixColGroup: 'Subgroup',
      matrixHint: '* Click any row to view individual subgroup schedule',
      matrixStatusNormal: '🟢 Today: no outages',
      matrixStatusEmergency: '🚨 Emergency outages: schedules inactive!',
      footerCopyright: 'unofficial live power outage monitoring resource for Dnipropetrovsk region.',
      footerSource: 'Data source: open public schedules from DTEK Dnipro Grids / CEK / YASNO',
      providerDtek: 'DTEK Dnipro Grids',
      providerYasno: 'YASNO (Dnipro Energy Services)',
      providerCek: 'CEK Power Grids (Dnipro & Region)',
      subgroupPrefix: 'Subgroup',
      sourceEmergency: 'NEC Ukrenergo (GAO)',
      sourceLive: 'DTEK Live Dnipro',
      buildingPrefix: 'bld.',
      testEmergencyBtn: '⚡ Test: Emergency / Stabilization Mode',
      countdown247: '24/7 NO OUTAGES',
      countdownNoOutagesSub: 'Ukrenergo & DTEK have not scheduled power cuts for today',
      countdownPowerStatus: 'Power supply status:',
      countdownUntilChange: 'Until status change:',
      countdownExpectedAt: 'At {time}:00 expected: {status}',
      searchNotFound: 'Street not found. Enter the name without abbreviations (e.g. "Khmelnytskoho", "Polia", "Mandrykivska").',
      mapTooltipEmergency: '🚨 Emergency outages (schedules suspended)',
      mapTooltipOff: '🔴 Cut by schedule',
      mapTooltipMaybe: '🟠 Possible outage (yellow zone)',
      mapTooltipOn: '🟢 Power guaranteed',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const STORAGE_KEY = 'kray_digital_lang';

  function detectInitialLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;

    const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    const code = navLang.toLowerCase();

    if (code.startsWith('ru')) return 'ru';
    if (code.startsWith('en')) return 'en';
    return 'ua';
  }

  let currentLang = detectInitialLanguage();

  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'ua';
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;

    const dict = TRANSLATIONS[lang];

    // SEO Title & Description
    document.title = dict.seoTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = dict.metaDesc;

    // Elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Operator select options
    const provSelect = document.getElementById('providerSelect');
    if (provSelect && provSelect.options.length >= 3) {
      provSelect.options[0].textContent = dict.providerDtek + ' (Дніпро, Кривий Ріг)';
      provSelect.options[1].textContent = dict.providerYasno;
      provSelect.options[2].textContent = dict.providerCek;
    }

    // Needle marker text
    const markerPin = document.querySelector('.marker-pin');
    if (markerPin) {
      markerPin.textContent = dict.markerNow;
    }

    // Emergency test button
    const testBtn = document.getElementById('btnFooterToggleEmergency');
    if (testBtn) {
      testBtn.textContent = dict.testEmergencyBtn;
    }

    // Dates in tabs
    const now = new Date();
    const tomorrow = new Date(Date.now() + 86400000);
    const todayStrEl = document.getElementById('todayDateStr');
    const tomStrEl = document.getElementById('tomorrowDateStr');
    if (todayStrEl) {
      const m = dict.months[now.getMonth()] || '';
      todayStrEl.textContent = lang === 'en' ? `${m} ${now.getDate()}` : `${now.getDate()} ${m}`;
    }
    if (tomStrEl) {
      const m = dict.months[tomorrow.getMonth()] || '';
      tomStrEl.textContent = lang === 'en' ? `${m} ${tomorrow.getDate()}` : `${tomorrow.getDate()} ${m}`;
    }

    // Active lang button highlight
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Toggle Multilingual SEO Articles
    document.querySelectorAll('.seo-lang-block').forEach(b => {
      b.style.display = b.dataset.lang === lang ? 'block' : 'none';
    });

    // Notify other modules
    if (window.onLanguageChange) {
      window.onLanguageChange(lang, dict);
    }
  }

  window.i18n = {
    get current() { return currentLang; },
    get dict() { return TRANSLATIONS[currentLang]; },
    t: (key) => (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key,
    formatDate: (d) => {
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ua;
      const m = dict.months[d.getMonth()] || '';
      return currentLang === 'en' ? `${m} ${d.getDate()}` : `${d.getDate()} ${m}`;
    },
    setLanguage: applyLanguage
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.dataset.lang);
      });
    });
  });
})();
