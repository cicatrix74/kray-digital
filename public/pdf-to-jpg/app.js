const I18N = {
  uk: {
    pageTitle: 'Конвертер PDF у JPG та PNG онлайн безкоштовно — Без завантаження на сервер | KRAY DIGITAL',
    badge: 'WEB TOOLS • PDF TO JPG CONVERTER',
    linkEditor: '🎨 Фоторедактор',
    linkWebp: '🖼️ Конвертер WebP',
    linkPass: '🔐 Паролі',
    linkGif: '🎬 Відео в GIF',
    orderText: 'Замовити сайт',
    title: 'Конвертер PDF у JPG та PNG онлайн',
    subtitle: 'Миттєве перетворення сторінок PDF у якісні зображення прямо у вашому браузері. Документи не передаються на сервер — 100% приватність і жодних обмежень.',
    dropTitle: '1. Завантажте PDF-файл',
    resetBtn: 'Очистити',
    dropMain: 'Перетягніть PDF сюди або натисніть для вибору',
    dropSub: 'Підтримуються багатосторінкові PDF будь-якого розміру',
    pickBtn: 'Обрати PDF-файл',
    localBadge: '🔒 Обробка локально в браузері',
    settingsTitle: '2. Налаштування експорту',
    dpiLabel: 'Роздільна здатність (DPI)',
    qualityLabel: 'Якість JPG',
    convertBtn: 'Конвертувати сторінки',
    convertingBtn: 'Обробка...',
    downloadZipBtn: 'Завантажити ZIP',
    resultsTitle: 'Готові сторінки',
    selectAll: 'Обрати всі',
    deselectAll: 'Зняти вибір',
    downloadOne: 'Завантажити',
    pagesWord: (n) => `${n} стор.`,
    progressFmt: (done, total) => `${done} / ${total} стор.`,
    summaryFmt: (done, fmt, dpi) => `Згенеровано ${done} зображень у форматі ${fmt.toUpperCase()} (${dpi} DPI)`,
    feat1Title: '100% Конфіденційність',
    feat1Desc: 'PDF-документ обробляється виключно в пам\'яті вашого браузера через PDF.js. Договори, паспорти та рахунки не покидають ваш пристрій.',
    feat2Title: 'Чіткість до 300 DPI',
    feat2Desc: 'Обирайте 100–150 DPI для легкої відправки в месенджерах або 200–300 DPI для чіткого тексту, сканів та друку.',
    feat3Title: 'Поодинці або в ZIP',
    feat3Desc: 'Завантажуйте окремі потрібні сторінки одним кліком або зберіть увесь документ в один ZIP-архів.',
    faqTitle: 'Часті запитання',
    faq1Q: 'Як конвертувати PDF у JPG онлайн?',
    faq1A: 'Перетягніть PDF у вікно завантаження, оберіть формат (JPG або PNG) та потрібне DPI, після чого натисніть «Конвертувати сторінки». Готові картинки з\'являться нижче.',
    faq2Q: 'Чи безпечно завантажувати конфіденційні документи?',
    faq2A: 'Так. На відміну від більшості сервісів, ваші файли не передаються на сервер. Уся конвертація відбувається локально у вашому браузері.',
    faq3Q: 'Який DPI обрати для тексту та документів?',
    faq3A: 'Для екрану та месенджерів оптимально 150 DPI. Для дрібного тексту, креслень або подальшого друку обирайте 200 або 300 DPI.',
    footHome: 'Головна',
    footWebp: 'Конвертер WebP',
    footPhoto: 'Фоторедактор',
    footPass: 'Генератор паролів',
    footGif: 'GIF Генератор',
    errNotPdf: 'Будь ласка, оберіть файл у форматі PDF.',
    errLoad: 'Не вдалося прочитати PDF. Можливо, файл пошкоджений або захищений паролем.'
  },
  ru: {
    pageTitle: 'Конвертер PDF в JPG и PNG онлайн бесплатно — Без загрузки на сервер | KRAY DIGITAL',
    badge: 'WEB TOOLS • PDF TO JPG CONVERTER',
    linkEditor: '🎨 Фоторедактор',
    linkWebp: '🖼️ Конвертер WebP',
    linkPass: '🔐 Пароли',
    linkGif: '🎬 Видео в GIF',
    orderText: 'Заказать сайт',
    title: 'Конвертер PDF в JPG и PNG онлайн',
    subtitle: 'Мгновенное преобразование страниц PDF в качественные изображения прямо в вашем браузере. Документы не отправляются на сервер — 100% приватность.',
    dropTitle: '1. Загрузите PDF-файл',
    resetBtn: 'Очистить',
    dropMain: 'Перетащите PDF сюда или нажмите для выбора',
    dropSub: 'Поддерживаются многостраничные PDF любого размера',
    pickBtn: 'Выбрать PDF-файл',
    localBadge: '🔒 Обработка локально в браузере',
    settingsTitle: '2. Настройки экспорта',
    dpiLabel: 'Разрешение (DPI)',
    qualityLabel: 'Качество JPG',
    convertBtn: 'Конвертировать страницы',
    convertingBtn: 'Обработка...',
    downloadZipBtn: 'Скачать ZIP',
    resultsTitle: 'Готовые страницы',
    selectAll: 'Выбрать все',
    deselectAll: 'Снять выбор',
    downloadOne: 'Скачать',
    pagesWord: (n) => `${n} стр.`,
    progressFmt: (done, total) => `${done} / ${total} стр.`,
    summaryFmt: (done, fmt, dpi) => `Создано ${done} изображений в формате ${fmt.toUpperCase()} (${dpi} DPI)`,
    feat1Title: '100% Конфиденциальность',
    feat1Desc: 'PDF-документ обрабатывается исключительно в памяти вашего браузера через PDF.js. Договоры, паспорта и счета не покидают ваше устройство.',
    feat2Title: 'Чёткость до 300 DPI',
    feat2Desc: 'Выбирайте 100–150 DPI для быстрой отправки в мессенджерах или 200–300 DPI для чёткого текста, сканов и печати.',
    feat3Title: 'По одной или в ZIP',
    feat3Desc: 'Скачивайте отдельные нужные страницы в один клик или соберите весь документ в один ZIP-архив.',
    faqTitle: 'Частые вопросы',
    faq1Q: 'Как конвертировать PDF в JPG онлайн?',
    faq1A: 'Перетащите PDF в окно загрузки, выберите формат (JPG или PNG) и нужное DPI, затем нажмите «Конвертировать страницы». Готовые картинки появятся ниже.',
    faq2Q: 'Безопасно ли загружать конфиденциальные документы?',
    faq2A: 'Да. В отличие от большинства сервисов, ваши файлы не передаются на сервер. Вся конвертация происходит локально в вашем браузере.',
    faq3Q: 'Какое DPI выбрать для текста и документов?',
    faq3A: 'Для экрана и мессенджеров оптимально 150 DPI. Для мелкого текста, чертежей или печати выбирайте 200 или 300 DPI.',
    footHome: 'Главная',
    footWebp: 'Конвертер WebP',
    footPhoto: 'Фоторедактор',
    footPass: 'Генератор паролей',
    footGif: 'GIF Генератор',
    errNotPdf: 'Пожалуйста, выберите файл в формате PDF.',
    errLoad: 'Не удалось прочитать PDF. Возможно, файл повреждён или защищён паролем.'
  },
  en: {
    pageTitle: 'Free PDF to JPG & PNG Converter Online — 100% Client-Side | KRAY DIGITAL',
    badge: 'WEB TOOLS • PDF TO JPG CONVERTER',
    linkEditor: '🎨 Photo Editor',
    linkWebp: '🖼️ WebP Converter',
    linkPass: '🔐 Passwords',
    linkGif: '🎬 Video to GIF',
    orderText: 'Order Website',
    title: 'PDF to JPG & PNG Converter Online',
    subtitle: 'Convert multi-page PDF documents into crisp images directly in your browser. Zero server uploads — 100% private and instant.',
    dropTitle: '1. Upload PDF File',
    resetBtn: 'Clear',
    dropMain: 'Drag & drop PDF here or click to browse',
    dropSub: 'Supports multi-page PDF documents of any size',
    pickBtn: 'Choose PDF File',
    localBadge: '🔒 Processed locally in browser',
    settingsTitle: '2. Export Settings',
    dpiLabel: 'Resolution (DPI)',
    qualityLabel: 'JPG Quality',
    convertBtn: 'Convert Pages',
    convertingBtn: 'Processing...',
    downloadZipBtn: 'Download ZIP',
    resultsTitle: 'Converted Pages',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    downloadOne: 'Download',
    pagesWord: (n) => `${n} pages`,
    progressFmt: (done, total) => `${done} / ${total} pages`,
    summaryFmt: (done, fmt, dpi) => `Generated ${done} ${fmt.toUpperCase()} images (${dpi} DPI)`,
    feat1Title: '100% Privacy',
    feat1Desc: 'Your PDF is rendered entirely inside your browser via PDF.js. Contracts, IDs, and invoices never leave your device.',
    feat2Title: 'Up to 300 DPI',
    feat2Desc: 'Pick 100–150 DPI for lightweight sharing or 200–300 DPI for razor-sharp text, scans, and printing.',
    feat3Title: 'Single or ZIP',
    feat3Desc: 'Download individual pages in one click or bundle selected pages into a single ZIP archive.',
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'How to convert PDF to JPG online?',
    faq1A: 'Drop your PDF into the upload box, choose JPG or PNG and your preferred DPI, then click "Convert Pages". Ready images will appear below.',
    faq2Q: 'Is it safe for confidential documents?',
    faq2A: 'Yes. Unlike server-based tools, your files are never uploaded anywhere. Everything runs locally in your browser.',
    faq3Q: 'Which DPI should I choose?',
    faq3A: '150 DPI is ideal for screens and messaging apps. Choose 200 or 300 DPI for small text, blueprints, or printing.',
    footHome: 'Home',
    footWebp: 'WebP Converter',
    footPhoto: 'Photo Editor',
    footPass: 'Password Generator',
    footGif: 'GIF Generator',
    errNotPdf: 'Please select a valid PDF file.',
    errLoad: 'Failed to read PDF. The file may be corrupted or password-protected.'
  }
};

function detectLang() {
  const p = (window.location.pathname || '').toLowerCase();
  if (p === '/ru' || p.startsWith('/ru/')) return 'ru';
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  return 'uk';
}

const lang = detectLang();
const T = I18N[lang];
document.documentElement.lang = lang;
document.title = T.pageTitle;

const textMap = {
  i18nBadge: 'badge',
  i18nLinkEditor: 'linkEditor',
  i18nLinkWebp: 'linkWebp',
  i18nLinkPass: 'linkPass',
  i18nLinkGif: 'linkGif',
  i18nOrderText: 'orderText',
  i18nTitle: 'title',
  i18nSubtitle: 'subtitle',
  i18nDropTitle: 'dropTitle',
  i18nResetBtn: 'resetBtn',
  i18nDropMain: 'dropMain',
  i18nDropSub: 'dropSub',
  i18nPickBtn: 'pickBtn',
  i18nLocalBadge: 'localBadge',
  i18nSettingsTitle: 'settingsTitle',
  i18nDpiLabel: 'dpiLabel',
  i18nQualityLabel: 'qualityLabel',
  i18nConvertBtn: 'convertBtn',
  i18nDownloadZipBtn: 'downloadZipBtn',
  i18nResultsTitle: 'resultsTitle',
  i18nSelectAll: 'selectAll',
  i18nDeselectAll: 'deselectAll',
  i18nFeat1Title: 'feat1Title',
  i18nFeat1Desc: 'feat1Desc',
  i18nFeat2Title: 'feat2Title',
  i18nFeat2Desc: 'feat2Desc',
  i18nFeat3Title: 'feat3Title',
  i18nFeat3Desc: 'feat3Desc',
  i18nFaqTitle: 'faqTitle',
  i18nFaq1Q: 'faq1Q',
  i18nFaq1A: 'faq1A',
  i18nFaq2Q: 'faq2Q',
  i18nFaq2A: 'faq2A',
  i18nFaq3Q: 'faq3Q',
  i18nFaq3A: 'faq3A',
  i18nFootHome: 'footHome',
  i18nFootWebp: 'footWebp',
  i18nFootPhoto: 'footPhoto',
  i18nFootPass: 'footPass',
  i18nFootGif: 'footGif'
};

for (const [id, key] of Object.entries(textMap)) {
  const el = document.getElementById(id);
  if (el) el.textContent = T[key];
}

// State
let pdfjsLib = null;
let pdfDoc = null;
let currentFileName = 'document';
let outputFormat = 'jpeg';
let selectedDpi = 150;
let jpgQuality = 0.9;
let renderedPages = []; // { pageNum, blob, url, width, height, selected }

// Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const pickFileBtn = document.getElementById('pickFileBtn');
const resetBtn = document.getElementById('resetBtn');
const fileMetaCard = document.getElementById('fileMetaCard');
const fileNameLabel = document.getElementById('fileNameLabel');
const filePagesBadge = document.getElementById('filePagesBadge');
const fileSizeLabel = document.getElementById('fileSizeLabel');
const formatSwitch = document.getElementById('formatSwitch');
const dpiSwitch = document.getElementById('dpiSwitch');
const dpiHint = document.getElementById('dpiHint');
const qualityGroup = document.getElementById('qualityGroup');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const convertBtn = document.getElementById('convertBtn');
const downloadZipBtn = document.getElementById('downloadZipBtn');
const progressWrap = document.getElementById('progressWrap');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const resultsSection = document.getElementById('resultsSection');
const resultsSummary = document.getElementById('resultsSummary');
const pagesGrid = document.getElementById('pagesGrid');
const selectAllBtn = document.getElementById('selectAllBtn');
const deselectAllBtn = document.getElementById('deselectAllBtn');

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function ensurePdfJs() {
  if (!pdfjsLib) {
    pdfjsLib = await import('/pdf-to-jpg/vendor/pdf.min.mjs');
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-to-jpg/vendor/pdf.worker.min.mjs';
  }
  return pdfjsLib;
}

function ensureJsZip() {
  if (window.JSZip) return Promise.resolve(window.JSZip);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/pdf-to-jpg/vendor/jszip.min.js';
    s.onload = () => resolve(window.JSZip);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function clearResults() {
  for (const p of renderedPages) {
    URL.revokeObjectURL(p.url);
  }
  renderedPages = [];
  pagesGrid.innerHTML = '';
  resultsSection.hidden = true;
  downloadZipBtn.disabled = true;
  progressWrap.hidden = true;
  progressFill.style.width = '0%';
}

function resetAll() {
  clearResults();
  pdfDoc = null;
  fileInput.value = '';
  fileMetaCard.hidden = true;
  resetBtn.hidden = true;
  convertBtn.disabled = true;
}

async function handleFile(file) {
  if (!file) return;
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    alert(T.errNotPdf);
    return;
  }

  clearResults();
  currentFileName = file.name.replace(/\.pdf$/i, '') || 'document';
  fileNameLabel.textContent = file.name;
  fileSizeLabel.textContent = formatBytes(file.size);
  filePagesBadge.textContent = '...';
  fileMetaCard.hidden = false;
  resetBtn.hidden = false;

  try {
    const lib = await ensurePdfJs();
    const buf = await file.arrayBuffer();
    pdfDoc = await lib.getDocument({ data: buf }).promise;
    filePagesBadge.textContent = T.pagesWord(pdfDoc.numPages);
    convertBtn.disabled = false;
  } catch (err) {
    console.error('PDF load error:', err);
    alert(T.errLoad);
    resetAll();
  }
}

async function convertAllPages() {
  if (!pdfDoc) return;
  clearResults();

  convertBtn.disabled = true;
  const convertSpan = document.getElementById('i18nConvertBtn');
  if (convertSpan) convertSpan.textContent = T.convertingBtn;

  const total = pdfDoc.numPages;
  const scale = selectedDpi / 72;
  const mime = outputFormat === 'png' ? 'image/png' : 'image/jpeg';
  const ext = outputFormat === 'png' ? 'png' : 'jpg';

  progressWrap.hidden = false;
  progressText.textContent = T.progressFmt(0, total);
  resultsSection.hidden = false;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  for (let i = 1; i <= total; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);

    // Fill white background so transparent PDFs render cleanly as JPG
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, mime, outputFormat === 'jpeg' ? jpgQuality : undefined)
    );
    const url = URL.createObjectURL(blob);
    const item = {
      pageNum: i,
      blob,
      url,
      ext,
      width: canvas.width,
      height: canvas.height,
      selected: true
    };
    renderedPages.push(item);
    appendPageCard(item);

    const pct = Math.round((i / total) * 100);
    progressFill.style.width = `${pct}%`;
    progressText.textContent = T.progressFmt(i, total);
  }

  resultsSummary.textContent = T.summaryFmt(total, ext, selectedDpi);
  downloadZipBtn.disabled = false;
  convertBtn.disabled = false;
  if (convertSpan) convertSpan.textContent = T.convertBtn;
}

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function appendPageCard(item) {
  const card = document.createElement('div');
  card.className = 'page-card selected';

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'page-thumb-wrap';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'page-check';
  checkbox.checked = true;
  checkbox.addEventListener('change', () => {
    item.selected = checkbox.checked;
    card.classList.toggle('selected', checkbox.checked);
    updateZipBtnState();
  });

  const pill = document.createElement('span');
  pill.className = 'page-num-pill';
  pill.textContent = `#${item.pageNum}`;

  const img = document.createElement('img');
  img.src = item.url;
  img.alt = `${currentFileName} page ${item.pageNum}`;
  img.loading = 'lazy';

  thumbWrap.append(checkbox, pill, img);

  const body = document.createElement('div');
  body.className = 'page-card-body';

  const dims = document.createElement('div');
  dims.className = 'page-dims';
  dims.innerHTML = `<span>${item.width}×${item.height}</span><span>${formatBytes(item.blob.size)}</span>`;

  const dlBtn = document.createElement('button');
  dlBtn.type = 'button';
  dlBtn.className = 'page-dl-btn';
  dlBtn.textContent = `⬇ ${T.downloadOne} .${item.ext.toUpperCase()}`;
  dlBtn.addEventListener('click', () => {
    triggerDownload(item.url, `${currentFileName}_page_${item.pageNum}.${item.ext}`);
  });

  body.append(dims, dlBtn);
  card.append(thumbWrap, body);
  pagesGrid.appendChild(card);
}

function updateZipBtnState() {
  const anySelected = renderedPages.some(p => p.selected);
  downloadZipBtn.disabled = !anySelected;
}

async function downloadZip() {
  const selected = renderedPages.filter(p => p.selected);
  if (selected.length === 0) return;

  downloadZipBtn.disabled = true;
  try {
    const JSZip = await ensureJsZip();
    const zip = new JSZip();
    for (const p of selected) {
      zip.file(`${currentFileName}_page_${String(p.pageNum).padStart(3, '0')}.${p.ext}`, p.blob);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(zipBlob);
    triggerDownload(zipUrl, `${currentFileName}_pages.zip`);
    setTimeout(() => URL.revokeObjectURL(zipUrl), 5000);
  } finally {
    downloadZipBtn.disabled = false;
  }
}

// Event Listeners
pickFileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  fileInput.click();
});

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fileInput.click();
  }
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  if (e.dataTransfer?.files?.[0]) {
    handleFile(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files?.[0]) handleFile(fileInput.files[0]);
});

resetBtn.addEventListener('click', resetAll);

formatSwitch.addEventListener('click', (e) => {
  const btn = e.target.closest('.fmt-btn');
  if (!btn) return;
  outputFormat = btn.dataset.fmt;
  formatSwitch.querySelectorAll('.fmt-btn').forEach(b => b.classList.toggle('active', b === btn));
  qualityGroup.style.display = outputFormat === 'jpeg' ? 'flex' : 'none';
});

dpiSwitch.addEventListener('click', (e) => {
  const btn = e.target.closest('.dpi-btn');
  if (!btn) return;
  selectedDpi = parseInt(btn.dataset.dpi, 10);
  dpiHint.textContent = `${selectedDpi} DPI`;
  dpiSwitch.querySelectorAll('.dpi-btn').forEach(b => b.classList.toggle('active', b === btn));
});

qualitySlider.addEventListener('input', () => {
  const val = parseInt(qualitySlider.value, 10);
  jpgQuality = val / 100;
  qualityValue.textContent = `${val}%`;
});

convertBtn.addEventListener('click', convertAllPages);
downloadZipBtn.addEventListener('click', downloadZip);

selectAllBtn.addEventListener('click', () => {
  pagesGrid.querySelectorAll('.page-card').forEach((card, idx) => {
    const cb = card.querySelector('.page-check');
    if (cb) cb.checked = true;
    card.classList.add('selected');
    if (renderedPages[idx]) renderedPages[idx].selected = true;
  });
  updateZipBtnState();
});

deselectAllBtn.addEventListener('click', () => {
  pagesGrid.querySelectorAll('.page-card').forEach((card, idx) => {
    const cb = card.querySelector('.page-check');
    if (cb) cb.checked = false;
    card.classList.remove('selected');
    if (renderedPages[idx]) renderedPages[idx].selected = false;
  });
  updateZipBtnState();
});

(function initMobileMenu() {
  const bind = () => {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('headerNav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
