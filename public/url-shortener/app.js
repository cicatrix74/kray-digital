const I18N = {
  uk: {
    pageTitle: 'Скорочувач посилань та кодувальник URL онлайн (UTM, Base64) | KRAY DIGITAL',
    i18nBadge: 'WEB TOOLS • URL SHORTENER & ENCODER',
    i18nTitle: 'Скорочувач посилань та кодувальник URL онлайн',
    i18nSubtitle: 'Створюйте короткі посилання з власним аліасом і статистикою переходів, кодуйте URL (Percent / Base64), збирайте UTM-мітки та аналізуйте параметри.',
    i18nTabShorten: 'Скоротити посилання',
    i18nTabEncode: 'Кодувальник URL',
    i18nTabUtm: 'UTM-генератор і парсер',
    i18nShortTitle: 'Створити коротке посилання',
    lblLongUrl: 'Довге посилання (URL)',
    lblAlias: "Власний хвіст (необов'язково, 3–32 символи)",
    i18nBtnShorten: 'Скоротити посилання',
    lblShortReady: 'Коротке посилання готове:',
    i18nCopyShort: 'Копіювати',
    i18nRefreshClicks: 'Оновити статистику',
    i18nHistoryTitle: 'Останні посилання',
    i18nClearHistory: 'Очистити',
    historyEmpty: 'Поки немає скорочених посилань.',
    i18nEncTitle: 'Кодування та декодування URL / Base64',
    lblEncInput: 'Вхідний текст або URL',
    lblEncOutput: 'Результат',
    i18nBtnEncode: 'Закодувати',
    i18nBtnDecode: 'Розкодувати',
    i18nBtnSwap: 'Поміняти місцями',
    i18nBtnCopyEnc: 'Копіювати результат',
    i18nUtmTitle: 'Генератор UTM-міток',
    lblUtmBase: 'Базовий URL',
    lblUtmResult: 'Готове посилання з UTM',
    i18nCopyUtm: 'Копіювати UTM-посилання',
    i18nShortenUtm: 'Скоротити це посилання',
    i18nParserTitle: 'Парсер URL-параметрів',
    lblParseInput: 'Вставте будь-який URL для розбору',
    i18nSeoTitle: 'Навіщо потрібен скорочувач посилань і кодувальник URL',
    i18nSeoIntro: 'Короткі посилання підвищують довіру та CTR у Telegram, Instagram, SMS і рекламі, приховуючи довгі UTM-мітки. А вбудований кодувальник URL та Base64 допомагає розробникам і маркетологам без помилок передавати кирилицю, пробіли й параметри в адресному рядку.',
    i18nSeoIntro2: 'На одній сторінці об’єднано три інструменти: серверний скорочувач URL зі статистикою кліків, двосторонній кодувальник/декодер (Percent-encoding і Base64) та візуальний конструктор UTM-міток з парсером параметрів.',
    i18nSeoC1Title: '🔗 Короткі посилання з аліасом',
    i18nSeoC1Desc: 'Отримайте компактну адресу формату /s/promo або випадковий 6-символьний код, відстежуйте кількість переходів у реальному часі та копіюйте посилання з історії.',
    i18nSeoC2Title: '🔐 Кодування URL і Base64',
    i18nSeoC2Desc: 'Миттєве перетворення між звичайним текстом, Percent-encoding (encodeURIComponent / encodeURI) та Base64 / Base64URL з коректною підтримкою UTF-8 і кирилиці.',
    i18nSeoC3Title: '📊 UTM-генератор і парсер параметрів',
    i18nSeoC3Desc: 'Збирайте мітки utm_source, utm_medium, utm_campaign, utm_content та utm_term для аналітики реклами й одразу скорочуйте готову адресу в один клік.',
    i18nSeoC4Title: '🚀 Де використовують скорочені URL',
    i18nSeoC4Desc: 'У постах Telegram і Viber, профілях Instagram/TikTok, SMS-розсилках (де важливий кожен символ), QR-кодах на візитках та при тестуванні API і вебхуків.',
    i18nSeoFaqTitle: 'Часті запитання',
    i18nFaq1Q: 'Чи зберігаються короткі посилання /s/...?',
    i18nFaq1A: 'Так, створені короткі посилання та лічильник кліків зберігаються на сервері та продовжують працювати після оновлення сторінки. Перехід відбувається через швидкий HTTP 302 редирект.',
    i18nFaq2Q: 'У чому різниця між encodeURIComponent та encodeURI?',
    i18nFaq2A: 'encodeURI кодує лише пробіли та кирилицю, зберігаючи структуру адреси (:, /, ?, &, =). encodeURIComponent кодує абсолютно всі службові символи — це потрібно для передачі іншого URL всередині query-параметра.',
    i18nFaq3Q: 'Навіщо використовувати Base64URL замість звичайного Base64?',
    i18nFaq3A: 'Звичайний Base64 містить символи +, / та =, які можуть ламати посилання в адресному рядку. Base64URL замінює їх на безпечні - та _ без знаків = наприкінці.',
    i18nFaq4Q: 'Чи можна одразу скоротити посилання з UTM-мітками?',
    i18nFaq4A: 'Так! На вкладці «UTM-генератор і парсер» заповніть потрібні мітки й натисніть «Скоротити це посилання» — ви миттєво отримаєте компактну адресу з трекінгом.',
    copied: 'Скопійовано!',
    clicksWord: 'Переходів:',
    errInvalidUrl: 'Введіть коректне посилання, що починається з http:// або https://',
    errAliasTaken: 'Цей аліас уже зайнятий, оберіть інший.',
    errStorage: 'Сервіс тимчасово недоступний: не налаштовано сховище посилань на сервері.',
    errInvalidAlias: 'Аліас має містити 3–32 латинські літери, цифри, "-" або "_".',
    errDecode: 'Не вдалося розкодувати рядок.',
  },
  ru: {
    pageTitle: 'Сокращатель ссылок и кодировщик URL онлайн (UTM, Base64) | KRAY DIGITAL',
    i18nBadge: 'WEB TOOLS • СОКРАЩАТЕЛЬ И КОДИРОВЩИК URL',
    i18nTitle: 'Сокращатель ссылок и кодировщик URL онлайн',
    i18nSubtitle: 'Создавайте короткие ссылки со своим алиасом и статистикой переходов, кодируйте URL (Percent / Base64), собирайте UTM-метки и разбирайте параметры.',
    i18nTabShorten: 'Сократить ссылку',
    i18nTabEncode: 'Кодировщик URL',
    i18nTabUtm: 'UTM-генератор и парсер',
    i18nShortTitle: 'Создать короткую ссылку',
    lblLongUrl: 'Длинная ссылка (URL)',
    lblAlias: 'Свой алиас (необязательно, 3–32 символа)',
    i18nBtnShorten: 'Сократить ссылку',
    lblShortReady: 'Короткая ссылка готова:',
    i18nCopyShort: 'Копировать',
    i18nRefreshClicks: 'Обновить статистику',
    i18nHistoryTitle: 'Недавние ссылки',
    i18nClearHistory: 'Очистить',
    historyEmpty: 'Пока нет сокращённых ссылок.',
    i18nEncTitle: 'Кодирование и декодирование URL / Base64',
    lblEncInput: 'Исходный текст или URL',
    lblEncOutput: 'Результат',
    i18nBtnEncode: 'Закодировать',
    i18nBtnDecode: 'Раскодировать',
    i18nBtnSwap: 'Поменять местами',
    i18nBtnCopyEnc: 'Копировать результат',
    i18nUtmTitle: 'Генератор UTM-меток',
    lblUtmBase: 'Базовый URL',
    lblUtmResult: 'Готовая ссылка с UTM',
    i18nCopyUtm: 'Копировать UTM-ссылку',
    i18nShortenUtm: 'Сократить эту ссылку',
    i18nParserTitle: 'Парсер URL-параметров',
    lblParseInput: 'Вставьте любой URL для разбора',
    i18nSeoTitle: 'Зачем нужен сокращатель ссылок и кодировщик URL',
    i18nSeoIntro: 'Короткие ссылки повышают доверие и CTR в Telegram, Instagram, SMS и рекламе, скрывая длинные UTM-метки. Встроенный кодировщик URL и Base64 помогает без ошибок передавать кириллицу, пробелы и параметры в адресной строке.',
    i18nSeoIntro2: 'На одной странице объединены три инструмента: серверный сокращатель URL со статистикой переходов, двусторонний кодировщик/декодер (Percent-encoding и Base64) и визуальный конструктор UTM-меток с разбором параметров.',
    i18nSeoC1Title: '🔗 Короткие ссылки с алиасом',
    i18nSeoC1Desc: 'Получите компактный адрес вида /s/promo или случайный 6-символьный код, отслеживайте количество переходов в реальном времени и копируйте ссылки из истории.',
    i18nSeoC2Title: '🔐 Кодирование URL и Base64',
    i18nSeoC2Desc: 'Мгновенное преобразование между обычным текстом, Percent-encoding (encodeURIComponent / encodeURI) и Base64 / Base64URL с корректной поддержкой UTF-8 и кириллицы.',
    i18nSeoC3Title: '📊 UTM-генератор и парсер параметров',
    i18nSeoC3Desc: 'Собирайте метки utm_source, utm_medium, utm_campaign, utm_content и utm_term для аналитики рекламы и сразу сокращайте готовую ссылку в один клик.',
    i18nSeoC4Title: '🚀 Где используют сокращённые URL',
    i18nSeoC4Desc: 'В постах Telegram и Viber, описании профиля Instagram/TikTok, SMS-рассылках (где важен каждый символ), QR-кодах на визитках и при тестировании API и вебхуков.',
    i18nSeoFaqTitle: 'Частые вопросы',
    i18nFaq1Q: 'Сохраняются ли короткие ссылки /s/...?',
    i18nFaq1A: 'Да, созданные короткие ссылки и счётчик переходов сохраняются на сервере и продолжают работать после обновления страницы. Переход выполняется через быстрый HTTP 302 редирект.',
    i18nFaq2Q: 'В чём разница между encodeURIComponent и encodeURI?',
    i18nFaq2A: 'encodeURI кодирует только пробелы и кириллицу, сохраняя структуру адреса (:, /, ?, &, =). encodeURIComponent кодирует все служебные символы — это нужно для передачи одного URL внутри query-параметра другого.',
    i18nFaq3Q: 'Зачем использовать Base64URL вместо обычного Base64?',
    i18nFaq3A: 'Обычный Base64 содержит символы +, / и =, которые могут ломать ссылки в адресной строке. Base64URL заменяет их на безопасные - и _ без знаков = в конце.',
    i18nFaq4Q: 'Можно ли сразу сократить ссылку с UTM-метками?',
    i18nFaq4A: 'Да! На вкладке «UTM-генератор и парсер» заполните нужные метки и нажмите «Сократить эту ссылку» — вы сразу получите компактный адрес с трекингом.',
    copied: 'Скопировано!',
    clicksWord: 'Переходов:',
    errInvalidUrl: 'Введите корректную ссылку, начинающуюся с http:// или https://',
    errAliasTaken: 'Этот алиас уже занят, выберите другой.',
    errStorage: 'Сервис временно недоступен: не настроено хранилище ссылок на сервере.',
    errInvalidAlias: 'Алиас должен содержать 3–32 латинские буквы, цифры, "-" или "_".',
    errDecode: 'Не удалось раскодировать строку.',
  },
  en: {
    pageTitle: 'Online URL Shortener & Link Encoder (UTM, Base64) | KRAY DIGITAL',
    i18nBadge: 'WEB TOOLS • URL SHORTENER & ENCODER',
    i18nTitle: 'Online URL Shortener & Link Encoder',
    i18nSubtitle: 'Create short links with custom aliases and click tracking, encode/decode URLs (Percent / Base64), build UTM tags, and inspect URL parameters.',
    i18nTabShorten: 'Shorten URL',
    i18nTabEncode: 'URL Encoder',
    i18nTabUtm: 'UTM Builder & Parser',
    i18nShortTitle: 'Create Short Link',
    lblLongUrl: 'Long URL',
    lblAlias: 'Custom alias (optional, 3–32 chars)',
    i18nBtnShorten: 'Shorten Link',
    lblShortReady: 'Your short link is ready:',
    i18nCopyShort: 'Copy',
    i18nRefreshClicks: 'Refresh stats',
    i18nHistoryTitle: 'Recent Links',
    i18nClearHistory: 'Clear',
    historyEmpty: 'No shortened links yet.',
    i18nEncTitle: 'URL & Base64 Encoder / Decoder',
    lblEncInput: 'Input text or URL',
    lblEncOutput: 'Output',
    i18nBtnEncode: 'Encode',
    i18nBtnDecode: 'Decode',
    i18nBtnSwap: 'Swap',
    i18nBtnCopyEnc: 'Copy Output',
    i18nUtmTitle: 'UTM Tag Builder',
    lblUtmBase: 'Base URL',
    lblUtmResult: 'Tagged URL',
    i18nCopyUtm: 'Copy UTM Link',
    i18nShortenUtm: 'Shorten This Link',
    i18nParserTitle: 'URL Parameter Parser',
    lblParseInput: 'Paste any URL to inspect',
    i18nSeoTitle: 'Why Use a URL Shortener & Link Encoder',
    i18nSeoIntro: 'Short links boost trust and CTR across Telegram, Instagram, SMS, and ads by hiding long UTM strings. The built-in URL & Base64 encoder helps developers and marketers handle special characters cleanly.',
    i18nSeoIntro2: 'This page combines three everyday tools in one workspace: a server-backed URL shortener with click tracking, a two-way URL/Base64 encoder-decoder, and a visual UTM tag builder with query parameter parser.',
    i18nSeoC1Title: '🔗 Custom Short Links',
    i18nSeoC1Desc: 'Generate clean /s/promo links or random 6-character codes, monitor live click counts, and reuse links from your local history.',
    i18nSeoC2Title: '🔐 URL & Base64 Encoding',
    i18nSeoC2Desc: 'Convert between plain text, encodeURIComponent / encodeURI, and UTF-8 safe Base64 / Base64URL in one click.',
    i18nSeoC3Title: '📊 UTM Builder & URL Parser',
    i18nSeoC3Desc: 'Build utm_source, utm_medium, utm_campaign, utm_content, and utm_term tags for ad tracking and shorten the final URL in one click.',
    i18nSeoC4Title: '🚀 Where Short URLs Work Best',
    i18nSeoC4Desc: 'Telegram & Viber posts, Instagram/TikTok bios, SMS campaigns, printed QR codes, and testing webhooks or API query strings.',
    i18nSeoFaqTitle: 'Frequently Asked Questions',
    i18nFaq1Q: 'Do /s/... short links persist?',
    i18nFaq1A: 'Yes, shortened links and click counters are stored on the server and redirect via fast HTTP 302.',
    i18nFaq2Q: 'What is the difference between encodeURIComponent and encodeURI?',
    i18nFaq2A: 'encodeURI preserves URL structure characters (:, /, ?, &, =), while encodeURIComponent encodes everything — ideal when passing a full URL inside a query parameter.',
    i18nFaq3Q: 'Why use Base64URL instead of standard Base64?',
    i18nFaq3A: 'Standard Base64 uses +, /, and = which require escaping in URLs. Base64URL replaces them with URL-safe - and _ without padding.',
    i18nFaq4Q: 'Can I shorten a UTM-tagged link directly?',
    i18nFaq4A: 'Yes! Build your tags in the UTM Builder tab and click "Shorten This Link" to generate a clean short URL immediately.',
    copied: 'Copied!',
    clicksWord: 'Clicks:',
    errInvalidUrl: 'Please enter a valid URL starting with http:// or https://',
    errAliasTaken: 'This alias is already taken. Try another one.',
    errStorage: 'Service temporarily unavailable: short link storage is not configured.',
    errInvalidAlias: 'Alias must be 3–32 letters, numbers, "-" or "_".',
    errDecode: 'Failed to decode the input string.',
  },
};

function detectLang() {
  const p = (window.location.pathname || '').toLowerCase();
  if (p === '/ru' || p.startsWith('/ru/')) return 'ru';
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  return 'uk';
}

const lang = detectLang();
const T = I18N[lang] || I18N.uk;
document.documentElement.lang = lang;
document.title = T.pageTitle;

for (const [id, val] of Object.entries(T)) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

const HISTORY_KEY = 'kray_short_links_v1';
const origin = window.location.origin;

const elLongUrl = document.getElementById('longUrlInput');
const elAlias = document.getElementById('aliasInput');
const elAliasPrefix = document.getElementById('aliasPrefix');
const elShortError = document.getElementById('shortError');
const elBtnShorten = document.getElementById('btnShorten');
const elResultBox = document.getElementById('shortResultBox');
const elShortUrl = document.getElementById('shortResultUrl');
const elBtnCopyShort = document.getElementById('btnCopyShort');
const elBtnOpenShort = document.getElementById('btnOpenShort');
const elClicksCount = document.getElementById('shortClicksCount');
const elShortClicksLabel = document.getElementById('shortClicksLabel');
const elBtnRefreshClicks = document.getElementById('btnRefreshClicks');
const elHistoryList = document.getElementById('historyList');
const elBtnClearHistory = document.getElementById('btnClearHistory');

elAliasPrefix.textContent = `${window.location.host}/s/`;

let currentShortCode = '';

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveHistory(list) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 20)));
  } catch {}
}

function renderHistory() {
  const list = getHistory();
  if (!list.length) {
    elHistoryList.innerHTML = `<div class="history-empty">${T.historyEmpty}</div>`;
    return;
  }
  elHistoryList.innerHTML = '';
  list.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'history-item';

    const meta = document.createElement('div');
    meta.className = 'history-meta';
    const a = document.createElement('a');
    a.className = 'history-short';
    a.href = `${origin}/s/${item.code}`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = `${origin}/s/${item.code}`;
    const orig = document.createElement('div');
    orig.className = 'history-orig';
    orig.textContent = item.url;
    meta.append(a, orig);

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn-secondary';
    copyBtn.textContent = '📋';
    copyBtn.addEventListener('click', () => copyText(`${origin}/s/${item.code}`, copyBtn, '📋'));

    row.append(meta, copyBtn);
    elHistoryList.appendChild(row);
  });
}

async function copyText(text, btn, restoreText) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      btn.textContent = T.copied;
      setTimeout(() => { btn.textContent = restoreText; }, 1400);
    }
  } catch {}
}

async function doShorten() {
  elShortError.hidden = true;
  const url = elLongUrl.value.trim();
  const alias = elAlias.value.trim();
  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, alias }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      const msg = data.error === 'ALIAS_TAKEN'
        ? T.errAliasTaken
        : data.error === 'INVALID_ALIAS'
          ? T.errInvalidAlias
          : data.error === 'STORAGE_NOT_CONFIGURED'
            ? T.errStorage
            : T.errInvalidUrl;
      elShortError.textContent = msg;
      elShortError.hidden = false;
      return;
    }
    currentShortCode = data.code;
    const shortFull = `${origin}/s/${data.code}`;
    elShortUrl.value = shortFull;
    elBtnOpenShort.href = shortFull;
    elShortClicksLabel.innerHTML = `${T.clicksWord} <strong id="shortClicksCount">${data.clicks || 0}</strong>`;
    elResultBox.hidden = false;

    const hist = getHistory().filter((h) => h.code !== data.code);
    hist.unshift({ code: data.code, url: data.url });
    saveHistory(hist);
    renderHistory();
  } catch {
    elShortError.textContent = T.errInvalidUrl;
    elShortError.hidden = false;
  }
}

elBtnShorten.addEventListener('click', doShorten);
elBtnCopyShort.addEventListener('click', () => copyText(elShortUrl.value, document.getElementById('i18nCopyShort'), T.i18nCopyShort));
elBtnRefreshClicks.addEventListener('click', async () => {
  if (!currentShortCode) return;
  try {
    const res = await fetch(`/api/shorten/${encodeURIComponent(currentShortCode)}`);
    if (!res.ok) return;
    const data = await res.json();
    const countEl = document.getElementById('shortClicksCount');
    if (countEl) countEl.textContent = String(data.clicks || 0);
  } catch {}
});
elBtnClearHistory.addEventListener('click', () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

// Top tabs
document.querySelectorAll('.tool-tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    document.querySelectorAll('.tool-tab').forEach((b) => b.classList.toggle('active', b === btn));
    document.getElementById('paneShorten').classList.toggle('active', target === 'shorten');
    document.getElementById('paneShorten').hidden = target !== 'shorten';
    document.getElementById('paneEncode').classList.toggle('active', target === 'encode');
    document.getElementById('paneEncode').hidden = target !== 'encode';
    document.getElementById('paneUtm').classList.toggle('active', target === 'utm');
    document.getElementById('paneUtm').hidden = target !== 'utm';
  });
});

// Tab 2: Encoder / Decoder
let encMode = 'component';
const elEncInput = document.getElementById('encInput');
const elEncOutput = document.getElementById('encOutput');

function b64EncodeUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
}

function b64DecodeUtf8(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function runEncode() {
  const val = elEncInput.value;
  try {
    if (encMode === 'component') elEncOutput.value = encodeURIComponent(val);
    else if (encMode === 'uri') elEncOutput.value = encodeURI(val);
    else if (encMode === 'base64') elEncOutput.value = b64EncodeUtf8(val);
    else elEncOutput.value = b64EncodeUtf8(val).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    elEncOutput.value = T.errDecode;
  }
}

function runDecode() {
  const val = elEncInput.value.trim();
  try {
    if (encMode === 'component') elEncOutput.value = decodeURIComponent(val);
    else if (encMode === 'uri') elEncOutput.value = decodeURI(val);
    else if (encMode === 'base64') elEncOutput.value = b64DecodeUtf8(val);
    else {
      let b64 = val.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      elEncOutput.value = b64DecodeUtf8(b64);
    }
  } catch {
    elEncOutput.value = T.errDecode;
  }
}

document.querySelectorAll('[data-enc]').forEach((btn) => {
  btn.addEventListener('click', () => {
    encMode = btn.getAttribute('data-enc') || 'component';
    document.querySelectorAll('[data-enc]').forEach((b) => b.classList.toggle('active', b === btn));
    runEncode();
  });
});

document.getElementById('btnDoEncode').addEventListener('click', runEncode);
document.getElementById('btnDoDecode').addEventListener('click', runDecode);
document.getElementById('btnSwapEnc').addEventListener('click', () => {
  const tmp = elEncInput.value;
  elEncInput.value = elEncOutput.value;
  elEncOutput.value = tmp;
});
document.getElementById('btnCopyEnc').addEventListener('click', () => copyText(elEncOutput.value, document.getElementById('i18nBtnCopyEnc'), T.i18nBtnCopyEnc));

// Tab 3: UTM Builder & Parser
const elUtmBase = document.getElementById('utmBase');
const elUtmSource = document.getElementById('utmSource');
const elUtmMedium = document.getElementById('utmMedium');
const elUtmCampaign = document.getElementById('utmCampaign');
const elUtmContent = document.getElementById('utmContent');
const elUtmTerm = document.getElementById('utmTerm');
const elUtmResult = document.getElementById('utmResult');
const elParseInput = document.getElementById('parseInput');
const elParsedOutput = document.getElementById('parsedOutput');

function buildUtm() {
  const base = (elUtmBase.value || '').trim() || 'https://kray-digital.pp.ua/';
  try {
    const u = new URL(base);
    const pairs = [
      ['utm_source', elUtmSource.value.trim()],
      ['utm_medium', elUtmMedium.value.trim()],
      ['utm_campaign', elUtmCampaign.value.trim()],
      ['utm_content', elUtmContent.value.trim()],
      ['utm_term', elUtmTerm.value.trim()],
    ];
    pairs.forEach(([k, v]) => {
      if (v) u.searchParams.set(k, v);
    });
    elUtmResult.value = u.toString();
    elParseInput.value = u.toString();
    renderParsedUrl();
  } catch {
    elUtmResult.value = '';
  }
}

function renderParsedUrl() {
  const raw = (elParseInput.value || '').trim();
  elParsedOutput.innerHTML = '';
  if (!raw) return;
  try {
    const u = new URL(raw);
    const rows = [
      ['protocol', u.protocol],
      ['host', u.host],
      ['pathname', u.pathname],
    ];
    u.searchParams.forEach((v, k) => rows.push([`?${k}`, v]));
    if (u.hash) rows.push(['hash', u.hash]);

    rows.forEach(([k, v]) => {
      const div = document.createElement('div');
      div.className = 'parsed-row';
      const sk = document.createElement('span');
      sk.className = 'parsed-k';
      sk.textContent = k;
      const sv = document.createElement('span');
      sv.className = 'parsed-v';
      sv.textContent = v;
      div.append(sk, sv);
      elParsedOutput.appendChild(div);
    });
  } catch {
    const div = document.createElement('div');
    div.className = 'error-msg';
    div.textContent = T.errInvalidUrl;
    elParsedOutput.appendChild(div);
  }
}

[elUtmBase, elUtmSource, elUtmMedium, elUtmCampaign, elUtmContent, elUtmTerm].forEach((el) => {
  el.addEventListener('input', buildUtm);
});
elParseInput.addEventListener('input', renderParsedUrl);

document.getElementById('btnCopyUtm').addEventListener('click', () => copyText(elUtmResult.value, document.getElementById('i18nCopyUtm'), T.i18nCopyUtm));
document.getElementById('btnShortenUtm').addEventListener('click', () => {
  if (!elUtmResult.value) return;
  elLongUrl.value = elUtmResult.value;
  document.getElementById('tabShorten').click();
  doShorten();
});

renderHistory();
buildUtm();
