(function () {
  const I18N = {
    ua: {
      pageTitle: 'Конвертер зображень JPG, PNG, GIF у WebP та AVIF онлайн — Стиснення без втрати якості | KRAY DIGITAL',
      badge: 'WEB TOOLS • WEBP & AVIF CONVERTER',
      linkOutages: '⚡ Графік світла',
      linkAlerts: '🚨 Карта тривог',
      orderText: 'Замовити сайт',
      title: 'Конвертер JPG, PNG, GIF у WebP та AVIF онлайн',
      subtitle: 'Миттєва оптимізація зображень для вашого сайту з гнучким налаштуванням стиснення. Підтримується пакетне завантаження та анімовані GIF.',
      studioTitle: 'Стиснення файлу',
      qualityLabel: 'Рівень стиснення та якості:',
      lossless: 'Lossless (без втрат)',
      scaleLow: 'Сильне стиснення',
      scaleOpt: 'Оптимально',
      scaleHigh: 'Макс. якість',
      sizeInfoLabel: 'Інформація про розмір',
      sizeEmpty: 'Оберіть файли нижче для стиснення',
      myPresetsTitle: 'Мої пресети',
      saveCurrent: 'Зберегти поточні налаштування',
      saveCurrentOk: 'Збережено!',
      saveAsPreset: 'Зберегти як пресет',
      presetPlaceholder: 'Назва пресету...',
      userPresetsTitle: 'Користувацькі пресети',
      resetDefault: 'Скинути',
      saveAndApply: 'Зберегти та застосувати',
      presetDefault1: 'Для Web (швидко)',
      presetDefault2: 'Максимальна якість',
      presetDefault3: 'Ультра-стиснення AVIF',
      renamePrompt: 'Нова назва пресету:',
      genIdle: 'Перетягніть зображення сюди або натисніть для вибору',
      genWorking: 'Йде оптимізація та стиснення...',
      genDone: 'Оптимізацію та стиснення завершено!',
      dropTitle: 'Перетягніть зображення сюди або натисніть для вибору',
      dropHint: 'Підтримуються JPG, PNG, GIF (зокрема анімовані) • Можна обрати декілька файлів одразу',
      chooseBtn: 'Обрати файли',
      reconvert: 'Переконвертувати з новими налаштуваннями',
      downloadAll: 'Завантажити всі',
      clearAll: 'Очистити',
      processed: 'Оброблено:',
      savedTotal: 'Заощаджено:',
      converting: 'Конвертація...',
      download: 'Завантажити',
      errFailed: 'Помилка конвертації',
      seoH2: 'Навіщо конвертувати JPG, PNG та GIF у WebP і AVIF?',
      seoP1: 'Сучасні формати <strong>WebP</strong> та <strong>AVIF</strong> стискають зображення на 40–85% ефективніше за класичні JPEG, PNG і GIF при збереженні тієї самої візуальної якості.',
      seoC1Title: '⚡ WebP — універсальний стандарт',
      seoC1Text: 'Підтримується 98%+ браузерів, зберігає прозорість (альфа-канал з PNG) та підтримує анімацію з GIF при значно меншій вазі файлу.',
      seoC2Title: '🚀 AVIF — максимальне стиснення',
      seoC2Text: 'Новітній формат на базі кодека AV1, який дає ще на 20–30% менший розмір файлу порівняно з WebP. Ідеально для великих банерів та фотогалерей.',
      seoC3Title: '🎚️ Гнучке керування якістю',
      seoC3Text: 'Регулюйте повзунок якості від 10% до 100% або увімкніть режим Lossless без втрат. Для більшості сайтів оптимальним балансом є 75–85%.',
      seoGuideTitle: 'Як обрати оптимальний рівень стиснення для сайту та PageSpeed',
      seoGuideIntro: 'Правильний баланс між вагою файлу та чіткістю картинки безпосередньо впливає на метрику <strong>Largest Contentful Paint (LCP)</strong> у Google PageSpeed Insights. Замість завантаження важких 2–5 МБ фотографій із камери або Figma, оптимізуйте їх перед публікацією:',
      seoStep1Title: '1. 50–70% — для прев’ю та мобільних галерей',
      seoStep1Text: 'Максимальна економія трафіку та миттєве завантаження карток товарів в інтернет-магазинах на слабкому 4G.',
      seoStep2Title: '2. 75–85% — золотий стандарт для сайтів',
      seoStep2Text: 'Оптимальне співвідношення: зменшення ваги на 65–80% без помітних артефактів для банерів, блогів і лендінгів.',
      seoStep3Title: '3. 90–100% або Lossless — для UI та портфоліо',
      seoStep3Text: 'Ідеально для скріншотів інтерфейсів, логотипів, текстів на зображеннях та фотографій з дрібними деталями.',
      seoStep4Title: '4. Збереження власних пресетів',
      seoStep4Text: 'Збережіть свої улюблені комбінації формату та стиснення в панелі «Мої пресети», щоб застосовувати їх в один клік.',
      seoFaqTitle: 'Часті запитання про конвертацію у WebP та AVIF',
      faq1Q: 'Чи зберігається прозорість при конвертації PNG у WebP/AVIF?',
      faq1A: 'Так, і WebP, і AVIF повністю підтримують альфа-канал (прозорий фон) при кратно меншому розмірі файлу порівняно з PNG.',
      faq2Q: 'Чи можна конвертувати анімовані GIF у WebP?',
      faq2A: 'Так! При виборі формату WebP наш конвертер автоматично зберігає всі кадри анімації GIF, зменшуючи вагу файлу на 50–80%.',
      faq3Q: 'Що краще для SEO — WebP чи AVIF?',
      faq3A: 'Обидва формати рекомендовані Google PageSpeed. WebP має універсальну підтримку 98%+ браузерів, а AVIF стискає ще сильніше на 20–30%.',
      faq4Q: 'Чи зберігаються мої зображення на сервері?',
      faq4A: 'Ні. Картинки обробляються в оперативній пам’яті виключно під час запиту на конвертацію і ніде не зберігаються.',
      footerOutages: 'Графіки світла',
      footerAlerts: 'Карта тривог'
    },
    ru: {
      pageTitle: 'Конвертер картинок JPG, PNG, GIF в WebP и AVIF онлайн — Регулируемое сжатие | KRAY DIGITAL',
      badge: 'WEB TOOLS • WEBP & AVIF CONVERTER',
      linkOutages: '⚡ График света',
      linkAlerts: '🚨 Карта тревог',
      orderText: 'Заказать сайт',
      title: 'Конвертер JPG, PNG, GIF в WebP и AVIF онлайн',
      subtitle: 'Мгновенная оптимизация изображений для вашего сайта с гибкой настройкой сжатия. Поддерживается пакетная загрузка и анимированные GIF.',
      studioTitle: 'Сжатие файла',
      qualityLabel: 'Степень сжатия и качество:',
      lossless: 'Lossless (без потерь)',
      scaleLow: 'Низкое',
      scaleOpt: 'Оптимальное',
      scaleHigh: 'Максимальное',
      sizeInfoLabel: 'Информация о файле',
      sizeEmpty: 'Выберите файлы ниже для сжатия',
      myPresetsTitle: 'Мои пресеты',
      saveCurrent: 'Сохранить текущие настройки',
      saveCurrentOk: 'Сохранено!',
      saveAsPreset: 'Сохранить как пресет',
      presetPlaceholder: 'Название пресета...',
      userPresetsTitle: 'Пользовательские пресеты',
      resetDefault: 'Сбросить',
      saveAndApply: 'Сохранить и применить',
      presetDefault1: 'Для Web (быстро)',
      presetDefault2: 'Максимальное качество',
      presetDefault3: 'Ультра-сжатие AVIF',
      renamePrompt: 'Новое название пресета:',
      genIdle: 'Перетащите изображения сюда или нажмите для выбора',
      genWorking: 'Идёт оптимизация и сжатие...',
      genDone: 'Оптимизация и сжатие завершены!',
      dropTitle: 'Перетащите изображения сюда или нажмите для выбора',
      dropHint: 'Поддерживаются JPG, PNG, GIF (включая анимированные) • Можно выбрать сразу несколько файлов',
      chooseBtn: 'Выбрать файлы',
      reconvert: 'Переконвертировать с новыми настройками',
      downloadAll: 'Скачать все',
      clearAll: 'Очистить',
      processed: 'Обработано:',
      savedTotal: 'Сэкономлено:',
      converting: 'Конвертация...',
      download: 'Скачать',
      errFailed: 'Ошибка конвертации',
      seoH2: 'Зачем конвертировать JPG, PNG и GIF в WebP и AVIF?',
      seoP1: 'Современные форматы <strong>WebP</strong> и <strong>AVIF</strong> сжимают изображения на 40–85% эффективнее классических JPEG, PNG и GIF при сохранении того же визуального качества. Это напрямую ускоряет загрузку сайта и повышает Google PageSpeed.',
      seoC1Title: '⚡ WebP — универсальный стандарт',
      seoC1Text: 'Поддерживается 98%+ браузеров, сохраняет прозрачность (альфа-канал из PNG) и поддерживает анимацию из GIF при кратно меньшем весе файла.',
      seoC2Title: '🚀 AVIF — максимальное сжатие',
      seoC2Text: 'Новейший формат на базе кодека AV1, который даёт ещё на 20–30% меньший размер файла по сравнению с WebP. Идеально для крупных баннеров и фотогалерей.',
      seoC3Title: '🎚️ Гибкое управление качеством',
      seoC3Text: 'Регулируйте ползунок качества от 10% до 100% или включите режим Lossless без потерь. Для большинства сайтов оптимальным балансом является 75–85%.',
      seoGuideTitle: 'Как выбрать оптимальный уровень сжатия для сайта и PageSpeed',
      seoGuideIntro: 'Правильный баланс между весом файла и чёткостью картинки напрямую влияет на метрику <strong>Largest Contentful Paint (LCP)</strong> в Google PageSpeed Insights. Вместо загрузки тяжёлых 2–5 МБ фотографий с камеры или из Figma, сжимайте их перед публикацией:',
      seoStep1Title: '1. 50–70% — для превью и мобильных галерей',
      seoStep1Text: 'Максимальная экономия трафика и мгновенная загрузка карточек товаров в интернет-магазинах на медленном 4G.',
      seoStep2Title: '2. 75–85% — золотой стандарт для сайтов',
      seoStep2Text: 'Оптимальное соотношение: уменьшение веса на 65–80% без заметных артефактов для баннеров, блогов и лендингов.',
      seoStep3Title: '3. 90–100% или Lossless — для UI и портфолио',
      seoStep3Text: 'Идеально для скриншотов интерфейсов, логотипов, текста на картинках и фотографий с мелкими деталями.',
      seoStep4Title: '4. Сохранение своих пресетов',
      seoStep4Text: 'Сохраняйте любимые комбинации формата и сжатия в панели «Мои пресеты», чтобы применять их в один клик.',
      seoFaqTitle: 'Частые вопросы о конвертации в WebP и AVIF',
      faq1Q: 'Сохраняется ли прозрачность при конвертации PNG в WebP/AVIF?',
      faq1A: 'Да, и WebP, и AVIF полностью поддерживают альфа-канал (прозрачный фон) при кратно меньшем размере файла по сравнению с PNG.',
      faq2Q: 'Можно ли конвертировать анимированные GIF в WebP?',
      faq2A: 'Да! При выборе формата WebP наш конвертер автоматически сохраняет все кадры анимации GIF, уменьшая вес файла на 50–80%.',
      faq3Q: 'Что лучше для SEO — WebP или AVIF?',
      faq3A: 'Оба формата рекомендованы Google PageSpeed. WebP поддерживается 98%+ браузеров, а AVIF сжимает ещё сильнее на 20–30%.',
      faq4Q: 'Сохраняются ли мои изображения на сервере?',
      faq4A: 'Нет. Картинки обрабатываются в оперативной памяти только на время конвертации и нигде не хранятся.',
      footerOutages: 'Графики света',
      footerAlerts: 'Карта тревог'
    },
    en: {
      pageTitle: 'Online JPG, PNG, GIF to WebP & AVIF Converter — Adjustable Compression | KRAY DIGITAL',
      badge: 'WEB TOOLS • WEBP & AVIF CONVERTER',
      linkOutages: '⚡ Power Outages',
      linkAlerts: '🚨 Air Alerts Map',
      orderText: 'Order Website',
      title: 'Online JPG, PNG, GIF to WebP & AVIF Converter',
      subtitle: 'Instant image optimization for your website with adjustable compression quality. Supports batch uploads and animated GIFs.',
      studioTitle: 'File Compression',
      qualityLabel: 'Compression & Quality Level:',
      lossless: 'Lossless',
      scaleLow: 'High Compression',
      scaleOpt: 'Optimal',
      scaleHigh: 'Max Quality',
      sizeInfoLabel: 'File Size Info',
      sizeEmpty: 'Drop or select images below to compress',
      myPresetsTitle: 'My Presets',
      saveCurrent: 'Save Current Settings',
      saveCurrentOk: 'Saved!',
      saveAsPreset: 'Save as Preset',
      presetPlaceholder: 'Preset name...',
      userPresetsTitle: 'User Presets',
      resetDefault: 'Reset',
      saveAndApply: 'Save & Apply',
      presetDefault1: 'For Web (Fast)',
      presetDefault2: 'Max Quality',
      presetDefault3: 'Ultra Compression AVIF',
      renamePrompt: 'New preset name:',
      genIdle: 'Drag & drop images here or click to select',
      genWorking: 'Optimizing and compressing...',
      genDone: 'Optimization & compression complete!',
      dropTitle: 'Drag & drop images here or click to browse',
      dropHint: 'Supports JPG, PNG, GIF (including animated) • Multiple files supported',
      chooseBtn: 'Choose Files',
      reconvert: 'Re-convert with New Settings',
      downloadAll: 'Download All',
      clearAll: 'Clear',
      processed: 'Processed:',
      savedTotal: 'Saved:',
      converting: 'Converting...',
      download: 'Download',
      errFailed: 'Conversion failed',
      seoH2: 'Why Convert JPG, PNG, and GIF to WebP & AVIF?',
      seoP1: 'Modern <strong>WebP</strong> and <strong>AVIF</strong> formats compress images 40–85% smaller than legacy JPEG, PNG, and GIF files at equivalent visual quality, boosting Core Web Vitals and Google PageSpeed scores.',
      seoC1Title: '⚡ WebP — Universal Standard',
      seoC1Text: 'Supported by 98%+ of browsers, preserves PNG alpha transparency and GIF animation at a fraction of the file size.',
      seoC2Title: '🚀 AVIF — Maximum Compression',
      seoC2Text: 'Next-gen AV1-based image format delivering an extra 20–30% file size reduction compared to WebP.',
      seoC3Title: '🎚️ Flexible Quality Control',
      seoC3Text: 'Adjust quality from 10% to 100% or toggle Lossless mode. 75–85% is ideal for most websites.',
      seoGuideTitle: 'How to Choose the Best Compression Level for PageSpeed',
      seoGuideIntro: 'The right balance between file weight and visual sharpness directly improves <strong>Largest Contentful Paint (LCP)</strong> in Google PageSpeed Insights. Optimize heavy images before publishing:',
      seoStep1Title: '1. 50–70% — Thumbnails & Mobile Galleries',
      seoStep1Text: 'Maximum bandwidth savings and instant loading for e-commerce product grids on mobile networks.',
      seoStep2Title: '2. 75–85% — The Golden Standard for Websites',
      seoStep2Text: '65–80% smaller files with virtually no visible artifacts for hero banners, blogs, and landing pages.',
      seoStep3Title: '3. 90–100% or Lossless — UI & Portfolios',
      seoStep3Text: 'Best for UI screenshots, logos, text overlays, and photography with fine details.',
      seoStep4Title: '4. Save Your Custom Presets',
      seoStep4Text: 'Store your favorite format and quality combinations in "My Presets" for one-click reuse.',
      seoFaqTitle: 'Frequently Asked Questions about WebP & AVIF',
      faq1Q: 'Is PNG transparency preserved in WebP and AVIF?',
      faq1A: 'Yes, both WebP and AVIF fully preserve alpha transparency at a fraction of the original PNG file size.',
      faq2Q: 'Can I convert animated GIFs to WebP?',
      faq2A: 'Yes! When WebP is selected, our converter preserves all GIF animation frames while cutting file size by 50–80%.',
      faq3Q: 'Which is better for SEO — WebP or AVIF?',
      faq3A: 'Both are recommended by Google PageSpeed. WebP works in 98%+ of browsers, while AVIF offers an extra 20–30% compression.',
      faq4Q: 'Are my uploaded images stored on your server?',
      faq4A: 'No. Images are processed in memory only during conversion and are never stored on disk.',
      footerOutages: 'Power Outages',
      footerAlerts: 'Air Alerts Map'
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
    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const setHtml = (id, v) => { const el = document.getElementById(id); if (el) el.innerHTML = v; };
    setText('i18nBadge', dict.badge);
    setText('i18nLinkOutages', dict.linkOutages);
    setText('i18nLinkAlerts', dict.linkAlerts);
    setText('i18nOrderText', dict.orderText);
    setText('i18nTitle', dict.title);
    setText('i18nSubtitle', dict.subtitle);
    setText('i18nStudioTitle', dict.studioTitle);
    setText('i18nQualityLabel', dict.qualityLabel);
    setText('i18nLossless', dict.lossless);
    setText('i18nScaleLow', dict.scaleLow);
    setText('i18nScaleHigh', dict.scaleHigh);
    setText('i18nSizeInfoLabel', dict.sizeInfoLabel);
    setText('i18nMyPresetsTitle', dict.myPresetsTitle);
    setText('i18nSaveCurrent', dict.saveCurrent);
    setText('i18nSaveAsPreset', dict.saveAsPreset);
    setText('i18nUserPresetsTitle', dict.userPresetsTitle);
    setText('i18nResetDefault', dict.resetDefault);
    setText('i18nSaveAndApply', dict.saveAndApply);
    setText('i18nDropTitle', dict.dropTitle);
    setText('i18nDropHint', dict.dropHint);
    setText('btnChooseFiles', dict.chooseBtn);
    setText('i18nReconvert', dict.reconvert);
    setText('i18nDownloadAll', dict.downloadAll);
    setText('i18nClearAll', dict.clearAll);
    setText('i18nSeoH2', dict.seoH2);
    setHtml('i18nSeoP1', dict.seoP1);
    setText('i18nSeoC1Title', dict.seoC1Title);
    setText('i18nSeoC1Text', dict.seoC1Text);
    setText('i18nSeoC2Title', dict.seoC2Title);
    setText('i18nSeoC2Text', dict.seoC2Text);
    setText('i18nSeoC3Title', dict.seoC3Title);
    setText('i18nSeoC3Text', dict.seoC3Text);
    setText('i18nSeoGuideTitle', dict.seoGuideTitle);
    setHtml('i18nSeoGuideIntro', dict.seoGuideIntro);
    setText('i18nSeoStep1Title', dict.seoStep1Title);
    setText('i18nSeoStep1Text', dict.seoStep1Text);
    setText('i18nSeoStep2Title', dict.seoStep2Title);
    setText('i18nSeoStep2Text', dict.seoStep2Text);
    setText('i18nSeoStep3Title', dict.seoStep3Title);
    setText('i18nSeoStep3Text', dict.seoStep3Text);
    setText('i18nSeoStep4Title', dict.seoStep4Title);
    setText('i18nSeoStep4Text', dict.seoStep4Text);
    setText('i18nSeoFaqTitle', dict.seoFaqTitle);
    setText('i18nFaq1Q', dict.faq1Q);
    setText('i18nFaq1A', dict.faq1A);
    setText('i18nFaq2Q', dict.faq2Q);
    setText('i18nFaq2A', dict.faq2A);
    setText('i18nFaq3Q', dict.faq3Q);
    setText('i18nFaq3A', dict.faq3A);
    setText('i18nFaq4Q', dict.faq4Q);
    setText('i18nFaq4A', dict.faq4A);
    setText('i18nFooterOutages', dict.footerOutages);
    setText('i18nFooterAlerts', dict.footerAlerts);

    const nameInput = document.getElementById('newPresetNameInput');
    if (nameInput) nameInput.placeholder = dict.presetPlaceholder;
  }
  applyI18n();

  const STORAGE_SETTINGS_KEY = 'kray_conv_settings_v2';
  const STORAGE_PRESETS_KEY = 'kray_conv_presets_list_v2';
  const RING_CIRCUMFERENCE = 439.82; // 2 * pi * 70

  let targetFormat = 'webp';
  let quality = 80;
  let isLossless = false;
  let activePresetId = null;
  let presetsList = [];
  let sourceItems = []; // { id, name, srcDataUrl, originalSize, status, progress, converted }

  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const btnChooseFiles = document.getElementById('btnChooseFiles');
  const qualitySlider = document.getElementById('qualitySlider');
  const qualityValueBadge = document.getElementById('qualityValueBadge');
  const losslessCheck = document.getElementById('losslessCheck');

  const gearStage = dropZone;
  const genGearWrap = document.getElementById('genGearWrap');
  const ringProgressCircle = document.getElementById('ringProgressCircle');
  const genPercentBadge = document.getElementById('genPercentBadge');
  const genProgressFill = document.getElementById('genProgressFill');
  const genProgressTitle = document.getElementById('genProgressTitle');
  const studioSizeValues = document.getElementById('studioSizeValues');

  const btnSaveCurrent = document.getElementById('btnSaveCurrent');
  const i18nSaveCurrent = document.getElementById('i18nSaveCurrent');
  const btnSaveAsPreset = document.getElementById('btnSaveAsPreset');
  const newPresetForm = document.getElementById('newPresetForm');
  const newPresetNameInput = document.getElementById('newPresetNameInput');
  const btnConfirmPreset = document.getElementById('btnConfirmPreset');
  const userPresetsList = document.getElementById('userPresetsList');
  const btnResetDefault = document.getElementById('btnResetDefault');
  const btnSaveAndApply = document.getElementById('btnSaveAndApply');

  const resultsToolbar = document.getElementById('resultsToolbar');
  const toolbarStats = document.getElementById('toolbarStats');
  const resultsGrid = document.getElementById('resultsGrid');
  const btnReconvert = document.getElementById('btnReconvert');
  const btnDownloadAll = document.getElementById('btnDownloadAll');
  const btnClearAll = document.getElementById('btnClearAll');

  function formatBytes(bytes) {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function saveCurrentSettings() {
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify({
        format: targetFormat,
        quality,
        lossless: isLossless,
        activePresetId
      }));
    } catch {}
  }

  function savePresetsList() {
    try {
      localStorage.setItem(STORAGE_PRESETS_KEY, JSON.stringify(presetsList));
    } catch {}
  }

  function getDefaultPresets() {
    return [
      { id: 'def_web', name: dict.presetDefault1, format: 'webp', quality: 75, lossless: false },
      { id: 'def_hq', name: dict.presetDefault2, format: 'webp', quality: 92, lossless: false },
      { id: 'def_avif', name: dict.presetDefault3, format: 'avif', quality: 65, lossless: false }
    ];
  }

  function renderPresetsList() {
    const subhead = document.getElementById('i18nUserPresetsTitle');
    if (subhead) subhead.style.display = presetsList.length ? '' : 'none';
    userPresetsList.style.display = presetsList.length ? 'flex' : 'none';
    userPresetsList.innerHTML = '';
    presetsList.forEach(p => {
      const row = document.createElement('div');
      row.className = 'preset-row' + (p.id === activePresetId ? ' active' : '');
      const qLabel = p.lossless ? 'Lossless' : `${p.quality}%`;
      row.innerHTML = `
        <div class="preset-row-main">
          <div class="preset-row-name">${escapeHtml(p.name)}</div>
          <div class="preset-row-meta">${(p.format || 'webp').toUpperCase()} • ${qLabel}</div>
        </div>
        <div class="preset-row-icons">
          <button type="button" class="preset-icon-btn edit" title="Rename">✎</button>
          <button type="button" class="preset-icon-btn del" title="Delete">🗑</button>
        </div>
      `;

      row.addEventListener('click', (e) => {
        if (e.target.closest('.preset-icon-btn')) return;
        targetFormat = p.format === 'avif' ? 'avif' : 'webp';
        quality = p.quality || 80;
        isLossless = Boolean(p.lossless);
        activePresetId = p.id;
        syncSettingsUI();
        saveCurrentSettings();
      });

      row.querySelector('.edit').addEventListener('click', (e) => {
        e.stopPropagation();
        const nextName = prompt(dict.renamePrompt, p.name);
        if (nextName && nextName.trim()) {
          p.name = nextName.trim().slice(0, 32);
          savePresetsList();
          renderPresetsList();
        }
      });

      row.querySelector('.del').addEventListener('click', (e) => {
        e.stopPropagation();
        presetsList = presetsList.filter(x => x.id !== p.id);
        if (activePresetId === p.id) activePresetId = null;
        savePresetsList();
        saveCurrentSettings();
        renderPresetsList();
      });

      userPresetsList.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function syncSettingsUI() {
    document.querySelectorAll('.fmt-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.fmt === targetFormat);
    });
    qualitySlider.value = quality;
    losslessCheck.checked = isLossless;
    qualitySlider.disabled = isLossless;
    qualityValueBadge.textContent = isLossless ? 'Lossless' : `${dict.scaleOpt} (${quality}%)`;
    renderPresetsList();
  }

  function loadSavedState() {
    try {
      const rawPresets = localStorage.getItem(STORAGE_PRESETS_KEY);
      if (rawPresets) {
        const parsed = JSON.parse(rawPresets);
        if (Array.isArray(parsed)) {
          presetsList = parsed;
        }
      }
    } catch {}

    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.format === 'webp' || s.format === 'avif') targetFormat = s.format;
        if (s.quality) quality = Math.min(100, Math.max(10, parseInt(s.quality, 10) || 80));
        isLossless = Boolean(s.lossless);
        activePresetId = s.activePresetId || null;
      }
    } catch {}
    syncSettingsUI();
  }
  loadSavedState();

  document.querySelectorAll('.fmt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      targetFormat = btn.dataset.fmt || 'webp';
      activePresetId = null;
      syncSettingsUI();
      saveCurrentSettings();
    });
  });

  qualitySlider.addEventListener('input', () => {
    quality = parseInt(qualitySlider.value, 10) || 80;
    activePresetId = null;
    syncSettingsUI();
    saveCurrentSettings();
  });

  losslessCheck.addEventListener('change', () => {
    isLossless = losslessCheck.checked;
    activePresetId = null;
    syncSettingsUI();
    saveCurrentSettings();
  });

  btnSaveCurrent.addEventListener('click', () => {
    if (activePresetId) {
      const target = presetsList.find(p => p.id === activePresetId);
      if (target) {
        target.format = targetFormat;
        target.quality = quality;
        target.lossless = isLossless;
        savePresetsList();
      }
    } else {
      const newId = 'u_' + Date.now().toString(36);
      const qTxt = isLossless ? 'Lossless' : `${quality}%`;
      presetsList.unshift({
        id: newId,
        name: `${targetFormat.toUpperCase()} ${qTxt}`,
        format: targetFormat,
        quality,
        lossless: isLossless
      });
      activePresetId = newId;
      savePresetsList();
    }
    syncSettingsUI();
    saveCurrentSettings();

    btnSaveCurrent.classList.add('saved');
    if (i18nSaveCurrent) i18nSaveCurrent.textContent = dict.saveCurrentOk;
    setTimeout(() => {
      btnSaveCurrent.classList.remove('saved');
      if (i18nSaveCurrent) i18nSaveCurrent.textContent = dict.saveCurrent;
    }, 1500);
  });

  btnSaveAsPreset.addEventListener('click', () => {
    const visible = newPresetForm.style.display !== 'none';
    newPresetForm.style.display = visible ? 'none' : 'flex';
    if (!visible) {
      const qTxt = isLossless ? 'Lossless' : `${quality}%`;
      newPresetNameInput.value = `${targetFormat.toUpperCase()} ${qTxt}`;
      newPresetNameInput.focus();
      newPresetNameInput.select();
    }
  });

  function createNamedPreset() {
    const rawName = (newPresetNameInput.value || '').trim();
    const qTxt = isLossless ? 'Lossless' : `${quality}%`;
    const name = rawName || `${targetFormat.toUpperCase()} ${qTxt}`;
    const newId = 'u_' + Date.now().toString(36);
    presetsList.unshift({
      id: newId,
      name: name.slice(0, 32),
      format: targetFormat,
      quality,
      lossless: isLossless
    });
    activePresetId = newId;
    newPresetForm.style.display = 'none';
    savePresetsList();
    saveCurrentSettings();
    syncSettingsUI();
  }

  btnConfirmPreset.addEventListener('click', createNamedPreset);
  newPresetNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') createNamedPreset();
  });

  btnResetDefault.addEventListener('click', () => {
    targetFormat = 'webp';
    quality = 80;
    isLossless = false;
    activePresetId = null;
    syncSettingsUI();
    saveCurrentSettings();
  });

  btnSaveAndApply.addEventListener('click', () => {
    saveCurrentSettings();
    if (sourceItems.length > 0) {
      sourceItems.forEach(item => convertItem(item));
    } else {
      btnSaveAndApply.textContent = dict.saveCurrentOk;
      setTimeout(() => { btnSaveAndApply.textContent = dict.saveAndApply; }, 1200);
    }
  });

  btnChooseFiles.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });
  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files) handleFiles(fileInput.files);
    fileInput.value = '';
  });

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const MINI_GEAR_SVG = `<svg class="card-gear-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;

  function updateProgressVisuals() {
    if (sourceItems.length === 0) {
      genPercentBadge.style.display = 'none';
      genPercentBadge.textContent = '';
      ringProgressCircle.style.strokeDashoffset = RING_CIRCUMFERENCE;
      genProgressFill.style.width = '0%';
      genProgressTitle.textContent = dict.genIdle;
      genGearWrap.classList.remove('spinning');
      gearStage.classList.remove('is-done');
      studioSizeValues.textContent = dict.sizeEmpty;
      return;
    }

    const total = sourceItems.length;
    const finishedCount = sourceItems.filter(i => i.status === 'done' || i.status === 'error').length;
    const sumProgress = sourceItems.reduce((acc, i) => {
      if (i.status === 'done' || i.status === 'error') return acc + 100;
      return acc + (i.progress || 0);
    }, 0);
    const overallPct = Math.min(100, Math.max(0, Math.round(sumProgress / total)));
    const isAllFinished = finishedCount === total;

    genPercentBadge.style.display = 'flex';
    genPercentBadge.textContent = `${overallPct}%`;
    const offset = RING_CIRCUMFERENCE * (1 - overallPct / 100);
    ringProgressCircle.style.strokeDashoffset = offset.toFixed(2);
    genProgressFill.style.width = `${overallPct}%`;
    genProgressTitle.textContent = isAllFinished ? `${dict.genDone} (${finishedCount}/${total})` : `${dict.genWorking} (${finishedCount}/${total})`;
    genGearWrap.classList.toggle('spinning', !isAllFinished);
    gearStage.classList.toggle('is-done', isAllFinished);

    const doneItems = sourceItems.filter(i => i.status === 'done' && i.converted);
    if (doneItems.length > 0) {
      const totalOrig = doneItems.reduce((acc, i) => acc + (i.converted.originalSize || 0), 0);
      const totalConv = doneItems.reduce((acc, i) => acc + (i.converted.convertedSize || 0), 0);
      const pctSaved = totalOrig > 0 ? Math.round(((totalOrig - totalConv) / totalOrig) * 100) : 0;
      studioSizeValues.innerHTML = `${formatBytes(totalOrig)} → <span class="size-green">${formatBytes(totalConv)} (${pctSaved >= 0 ? '-' + pctSaved : '+' + Math.abs(pctSaved)}%)</span>`;
    } else {
      const totalIn = sourceItems.reduce((acc, i) => acc + (i.originalSize || 0), 0);
      studioSizeValues.textContent = `${formatBytes(totalIn)} → ...`;
    }
  }
  updateProgressVisuals();

  function updateCardProgressDOM(item) {
    const card = resultsGrid.querySelector(`[data-item-id="${item.id}"]`);
    if (card) {
      const pctEl = card.querySelector('.card-pct-text');
      const fillEl = card.querySelector('.card-mini-fill');
      if (pctEl) pctEl.textContent = `${item.progress}%`;
      if (fillEl) fillEl.style.width = `${item.progress}%`;
    }
    updateProgressVisuals();
  }

  async function convertViaCanvas(srcDataUrl, filename, origSize, format, quality, lossless) {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = srcDataUrl;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let targetFmt = format === 'avif' ? 'avif' : 'webp';
    let mimeOut = targetFmt === 'avif' ? 'image/avif' : 'image/webp';
    const q = lossless ? 1.0 : Math.min(1, Math.max(0.01, (parseInt(quality, 10) || 80) / 100));

    let blob = await new Promise(resolve => canvas.toBlob(resolve, mimeOut, q));
    if (!blob || (targetFmt === 'avif' && blob.type !== 'image/avif')) {
      targetFmt = 'webp';
      mimeOut = 'image/webp';
      blob = await new Promise(resolve => canvas.toBlob(resolve, mimeOut, q));
    }
    if (!blob) throw new Error('Canvas conversion failed');

    const outDataUrl = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });

    const baseName = String(filename || 'image').replace(/\.[^/.]+$/, '');
    const outName = `${baseName}.${targetFmt}`;
    const originalSize = origSize || Math.round((srcDataUrl.length * 3) / 4);
    const convertedSize = blob.size;
    const savingsPercent = originalSize > 0
      ? Math.round(((originalSize - convertedSize) / originalSize) * 100)
      : 0;

    return {
      success: true,
      filename: outName,
      format: targetFmt,
      originalSize,
      convertedSize,
      savingsPercent,
      width: canvas.width,
      height: canvas.height,
      dataUrl: outDataUrl
    };
  }

  async function convertItem(item) {
    item.status = 'converting';
    item.progress = 14;
    renderResults();

    const timer = setInterval(() => {
      if (item.status !== 'converting') {
        clearInterval(timer);
        return;
      }
      if (item.progress < 93) {
        const step = item.progress < 45 ? 5 : item.progress < 75 ? 3 : 1;
        item.progress = Math.min(93, item.progress + step);
        updateCardProgressDOM(item);
      }
    }, 70);

    try {
      let data = null;
      try {
        const res = await fetch('/api/convert-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl: item.srcDataUrl,
            filename: item.name,
            format: targetFormat,
            quality: quality,
            lossless: isLossless
          })
        });
        if (res.ok) {
          data = await res.json();
        }
      } catch {
        data = null;
      }

      if (!data || !data.success) {
        data = await convertViaCanvas(item.srcDataUrl, item.name, item.originalSize, targetFormat, quality, isLossless);
      }

      clearInterval(timer);
      if (data && data.success) {
        item.progress = 100;
        item.status = 'done';
        item.converted = data;
      } else {
        item.progress = 100;
        item.status = 'error';
      }
    } catch {
      clearInterval(timer);
      item.progress = 100;
      item.status = 'error';
    }
    renderResults();
  }

  async function handleFiles(fileList) {
    const valid = Array.from(fileList).filter(f => /\.(jpe?g|png|gif)$/i.test(f.name) || /^image\/(jpeg|png|gif)$/i.test(f.type));
    for (const file of valid) {
      const srcDataUrl = await readFileAsDataUrl(file);
      const item = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        originalSize: file.size,
        srcDataUrl,
        status: 'converting',
        progress: 10,
        converted: null
      };
      sourceItems.push(item);
      convertItem(item);
    }
    renderResults();
  }

  function renderResults() {
    updateProgressVisuals();

    if (sourceItems.length === 0) {
      resultsToolbar.style.display = 'none';
      resultsGrid.innerHTML = '';
      return;
    }

    resultsToolbar.style.display = 'flex';
    const doneItems = sourceItems.filter(i => i.status === 'done' && i.converted);
    const totalOrig = doneItems.reduce((acc, i) => acc + (i.converted.originalSize || 0), 0);
    const totalConv = doneItems.reduce((acc, i) => acc + (i.converted.convertedSize || 0), 0);
    const totalSaved = totalOrig > 0 ? Math.round(((totalOrig - totalConv) / totalOrig) * 100) : 0;

    toolbarStats.textContent = `${dict.processed} ${doneItems.length} / ${sourceItems.length} • ${dict.savedTotal} ${formatBytes(Math.max(0, totalOrig - totalConv))} (${totalSaved}%)`;

    resultsGrid.innerHTML = '';
    sourceItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.dataset.itemId = item.id;

      const thumbSrc = (item.converted && item.converted.dataUrl) || item.srcDataUrl;
      let detailsHtml = '';

      if (item.status === 'converting') {
        const pct = item.progress || 10;
        detailsHtml = `
          <div class="card-gear-row">
            ${MINI_GEAR_SVG}
            <span>${dict.converting}</span>
            <span class="card-pct-text" style="margin-left:auto;">${pct}%</span>
          </div>
          <div class="card-mini-track">
            <div class="card-mini-fill" style="width: ${pct}%;"></div>
          </div>
        `;
      } else if (item.status === 'error' || !item.converted) {
        detailsHtml = `<div class="result-sizes" style="color:#f87171;">${dict.errFailed}</div>`;
      } else {
        const c = item.converted;
        const pct = c.savingsPercent;
        const badgeCls = pct >= 0 ? 'savings-badge' : 'savings-badge is-larger';
        const pctLabel = pct >= 0 ? `-${pct}%` : `+${Math.abs(pct)}%`;
        detailsHtml = `
          <div class="result-sizes">
            ${formatBytes(c.originalSize)} → <strong>${formatBytes(c.convertedSize)}</strong>
            <span class="${badgeCls}">${pctLabel}</span>
          </div>
          <a href="${c.dataUrl}" download="${c.filename}" class="btn-download-item">⬇️ ${dict.download} (.${c.format})</a>
        `;
      }

      card.innerHTML = `
        <img class="result-thumb" src="${thumbSrc}" alt="${escapeHtml(item.name)}">
        <div class="result-info">
          <div class="result-name" title="${escapeHtml(item.name)}">${escapeHtml((item.converted && item.converted.filename) || item.name)}</div>
          ${detailsHtml}
        </div>
      `;
      resultsGrid.appendChild(card);
    });
  }

  btnReconvert.addEventListener('click', () => {
    sourceItems.forEach(item => convertItem(item));
  });

  btnDownloadAll.addEventListener('click', () => {
    const doneItems = sourceItems.filter(i => i.status === 'done' && i.converted);
    doneItems.forEach((item, idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = item.converted.dataUrl;
        a.download = item.converted.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, idx * 180);
    });
  });

  btnClearAll.addEventListener('click', () => {
    sourceItems = [];
    renderResults();
  });
})();
