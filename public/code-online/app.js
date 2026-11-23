(function () {
  const I18N = {
    ua: {
      pageTitle: 'Онлайн редактор коду HTML, CSS, JS з Emmet та підсвіткою тегів | KRAY DIGITAL',
      badge: 'WEB TOOLS • ONLINE CODE PLAYGROUND',
      orderText: 'Замовити сайт',
      title: 'Онлайн редактор коду HTML, CSS та JavaScript',
      subtitle: 'Пишіть код із підсвіткою тегів, Emmet (Tab) і переносом рядків та миттєво бачте результат у живому перегляді.',
      btnRun: 'Запустити',
      autoOn: 'Авто-запуск: увімк.',
      autoOff: 'Авто-запуск: вимк.',
      btnFormat: 'Форматувати',
      btnCopyLink: 'Посилання',
      btnDownload: 'Завантажити .html',
      btnReset: 'Скинути',
      consoleTitle: 'Консоль',
      consoleEmpty: 'Тут з’являться логи та помилки…',
      toastCopied: 'Посилання скопійовано в буфер обміну',
      toastReset: 'Код скинуто до прикладу',
      toastDownloaded: 'Файл завантажено',
      toastFormatted: 'Код відформатовано',
      saved: 'Збережено локально',
      resetConfirm: 'Скинути весь код до початкового прикладу?',
      seoH2: 'Онлайн редактор коду HTML, CSS та JavaScript з Emmet і підсвіткою тегів',
      seoP1: 'Зручна браузерна пісочниця з трьома вкладками (HTML, CSS, JS), живим прев’ю та консоллю. Редактор підтримує підсвітку синтаксису й парних тегів, автозакриття тегів, скорочення Emmet за клавішею Tab та автоматичний перенос довгих рядків.',
      seoC1Title: '🎨 Підсвітка тегів та Emmet (Tab)',
      seoC1Text: 'HTML-теги, атрибути, CSS-властивості та JS-синтаксис виділяються кольорами, парні теги підсвічуються при наведенні курсора, а скорочення на кшталт <code>ul&gt;li*3</code> чи <code>df</code> розгортаються за <code>Tab</code>.',
      seoC2Title: '⚡ Живий перегляд, перенос рядків і консоль',
      seoC2Text: 'Довгі рядки коду автоматично переносяться без горизонтального скролу, прев’ю оновлюється миттєво, а <code>console.log</code> і помилки одразу видно в нижній консолі.',
      seoC3Title: '🔒 Локальна робота та експорт у HTML',
      seoC3Text: 'Весь код виконується у вашому браузері та автоматично зберігається в <code>localStorage</code>. Проєкт можна передати посиланням або завантажити одним <code>.html</code> файлом.',
      seoFaqTitle: 'Часті запитання про онлайн редактор коду',
      faq1Q: 'Чи потрібно реєструватися?',
      faq1A: 'Ні. Інструмент працює відразу у браузері без акаунтів та встановлення.',
      faq2Q: 'Чи зберігається мій код на сервері?',
      faq2A: 'Ні. Виконання та збереження чернетки відбуваються локально.',
      faq3Q: 'Чи можна використовувати бібліотеки на кшталт Bootstrap чи jQuery?',
      faq3A: 'Так. Додайте потрібний CDN-скрипт чи стиль у розділ HTML.',
      faq4Q: 'Як поділитися своїм проєктом?',
      faq4A: 'Натисніть «Посилання» — посилання з вашим кодом скопіюється в буфер обміну.',
      footerPass: 'Генератор паролів',
      footerQr: 'QR-коди',
      footerEditor: 'Фоторедактор'
    },
    ru: {
      pageTitle: 'Онлайн редактор кода HTML, CSS, JS с Emmet и подсветкой тегов | KRAY DIGITAL',
      badge: 'WEB TOOLS • ONLINE CODE PLAYGROUND',
      orderText: 'Заказать сайт',
      title: 'Онлайн редактор кода HTML, CSS и JavaScript',
      subtitle: 'Пишите код с подсветкой тегов, Emmet (Tab) и переносом строк и сразу видите результат в живом превью.',
      btnRun: 'Запустить',
      autoOn: 'Авто-запуск: вкл.',
      autoOff: 'Авто-запуск: выкл.',
      btnFormat: 'Форматировать',
      btnCopyLink: 'Ссылка',
      btnDownload: 'Скачать .html',
      btnReset: 'Сбросить',
      consoleTitle: 'Консоль',
      consoleEmpty: 'Здесь появятся логи и ошибки…',
      toastCopied: 'Ссылка скопирована в буфер обмена',
      toastReset: 'Код сброшен к примеру',
      toastDownloaded: 'Файл скачан',
      toastFormatted: 'Код отформатирован',
      saved: 'Сохранено локально',
      resetConfirm: 'Сбросить весь код к исходному примеру?',
      seoH2: 'Онлайн редактор кода HTML, CSS и JavaScript с Emmet и подсветкой тегов',
      seoP1: 'Удобная браузерная песочница с тремя вкладками (HTML, CSS, JS), живым превью и консолью. Редактор поддерживает подсветку синтаксиса и парных тегов, автозакрытие тегов, сокращения Emmet по клавише Tab и автоматический перенос длинных строк.',
      seoC1Title: '🎨 Подсветка тегов и Emmet (Tab)',
      seoC1Text: 'HTML-теги, атрибуты, CSS-свойства и JS-синтаксис выделяются цветами, парные теги подсвечиваются под курсором, а сокращения вроде <code>ul&gt;li*3</code> или <code>df</code> разворачиваются по <code>Tab</code>.',
      seoC2Title: '⚡ Живое превью, перенос строк и консоль',
      seoC2Text: 'Длинные строки автоматически переносятся без горизонтального скролла, превью обновляется мгновенно, а <code>console.log</code> и ошибки сразу видны в нижней консоли.',
      seoC3Title: '🔒 Локальная работа и экспорт в HTML',
      seoC3Text: 'Весь код выполняется в вашем браузере и автоматически сохраняется в <code>localStorage</code>. Проект можно передать ссылкой или скачать одним <code>.html</code> файлом.',
      seoFaqTitle: 'Частые вопросы об онлайн редакторе кода',
      faq1Q: 'Нужна ли регистрация?',
      faq1A: 'Нет. Инструмент работает сразу в браузере без аккаунтов и установки.',
      faq2Q: 'Сохраняется ли мой код на сервере?',
      faq2A: 'Нет. Выполнение и сохранение черновика происходят локально.',
      faq3Q: 'Можно ли подключать библиотеки вроде Bootstrap или jQuery?',
      faq3A: 'Да. Добавьте нужный CDN-скрипт или стиль в раздел HTML.',
      faq4Q: 'Как поделиться своим проектом?',
      faq4A: 'Нажмите «Ссылка» — ссылка с вашим кодом скопируется в буфер обмена.',
      footerPass: 'Генератор паролей',
      footerQr: 'QR-коды',
      footerEditor: 'Фоторедактор'
    },
    en: {
      pageTitle: 'Online HTML, CSS, JS Code Editor with Emmet & Tag Highlighting | KRAY DIGITAL',
      badge: 'WEB TOOLS • ONLINE CODE PLAYGROUND',
      orderText: 'Order Website',
      title: 'Online HTML, CSS & JavaScript Code Editor',
      subtitle: 'Write code with syntax & tag highlighting, Emmet (Tab), and automatic word wrap — with instant live preview.',
      btnRun: 'Run',
      autoOn: 'Auto-run: on',
      autoOff: 'Auto-run: off',
      btnFormat: 'Format',
      btnCopyLink: 'Share link',
      btnDownload: 'Download .html',
      btnReset: 'Reset',
      consoleTitle: 'Console',
      consoleEmpty: 'Logs and errors will appear here…',
      toastCopied: 'Share link copied to clipboard',
      toastReset: 'Code reset to the example',
      toastDownloaded: 'File downloaded',
      toastFormatted: 'Code formatted',
      saved: 'Saved locally',
      resetConfirm: 'Reset all code to the original example?',
      seoH2: 'Online HTML, CSS & JavaScript Code Editor with Emmet and Tag Highlighting',
      seoP1: 'A fast browser sandbox with HTML, CSS, and JS tabs, live preview, and built-in console. Features syntax & matching tag highlighting, auto-closing tags, Emmet expansion on Tab, and automatic word wrap for long lines.',
      seoC1Title: '🎨 Tag Highlighting & Emmet (Tab)',
      seoC1Text: 'HTML tags, attributes, CSS properties, and JS syntax are color-coded, matching HTML tags highlight under the cursor, and Emmet shortcuts like <code>ul&gt;li*3</code> or <code>df</code> expand on <code>Tab</code>.',
      seoC2Title: '⚡ Live Preview, Word Wrap & Console',
      seoC2Text: 'Long lines wrap automatically with no horizontal scroll, preview updates live, and <code>console.log</code> or runtime errors appear right below.',
      seoC3Title: '🔒 100% Client-Side & HTML Export',
      seoC3Text: 'Your code runs locally in your browser and auto-saves to <code>localStorage</code>. Share via link or download as a single <code>.html</code> file.',
      seoFaqTitle: 'Frequently asked questions about the code editor',
      faq1Q: 'Do I need to register?',
      faq1A: 'No. The tool works right in your browser with no account or installation.',
      faq2Q: 'Is my code stored on a server?',
      faq2A: 'No. Execution and draft saving happen locally.',
      faq3Q: 'Can I use libraries like Bootstrap or jQuery?',
      faq3A: 'Yes. Add the CDN script or stylesheet inside the HTML panel.',
      faq4Q: 'How do I share my project?',
      faq4A: 'Click “Share link” and a URL containing your code is copied to the clipboard.',
      footerPass: 'Password Generator',
      footerQr: 'QR Codes',
      footerEditor: 'Photo Editor'
    }
  };

  function detectLang() {
    const p = (window.location.pathname || '').toLowerCase();
    if (p === '/ru' || p.startsWith('/ru/')) return 'ru';
    if (p === '/en' || p.startsWith('/en/')) return 'en';
    return 'ua';
  }

  const lang = detectLang();
  const dict = I18N[lang] || I18N.ua;

  // ---------- Стартовий проєкт ----------
  const DEFAULT_HTML = `<div class="card">
  <h1>Привіт, KRAY DIGITAL! 👋</h1>
  <p>Пишіть HTML, CSS та JS у панелях ліворуч і одразу бачте результат.</p>
  <button id="magic">Натисни мене</button>
  <p class="counter">Кліків: <span id="clicks">0</span></p>
</div>`;

  const DEFAULT_CSS = `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0c111d, #16324a);
  color: #e2e8f0;
}
.card {
  background: rgba(20, 28, 44, 0.9);
  border: 1px solid #263348;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  max-width: 420px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}
button {
  margin-top: 12px;
  padding: 10px 22px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #22d3ee, #06b6d4);
  color: #06101a;
  font-weight: 700;
  cursor: pointer;
}
.counter { color: #67e8f9; font-weight: 700; }`;

  const DEFAULT_JS = `let clicks = 0;
const out = document.getElementById('clicks');
document.getElementById('magic').addEventListener('click', () => {
  clicks++;
  out.textContent = clicks;
  console.log('Кліків:', clicks);
});
console.log('Скрипт запущено ✔');`;

  const STORAGE_KEY = 'kray_code_online_v1';

  // ---------- DOM ----------
  const $ = (id) => document.getElementById(id);
  const editors = {
    html: $('editorHtml'),
    css: $('editorCss'),
    js: $('editorJs')
  };
  const gutters = {
    html: $('gutterHtml'),
    css: $('gutterCss'),
    js: $('gutterJs')
  };
  const highlights = {
    html: $('highlightHtml'),
    css: $('highlightCss'),
    js: $('highlightJs')
  };
  const frame = $('previewFrame');
  const consoleOutput = $('consoleOutput');
  const statusInfo = $('statusInfo');
  const statusSaved = $('statusSaved');

  let autoRun = true;
  let runTimer = null;

  // ---------- i18n ----------
  function applyI18n() {
    document.title = dict.pageTitle;
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
    const st = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    const sh = (id, v) => { const el = $(id); if (el) el.innerHTML = v; };

    st('i18nBadge', dict.badge);
    st('i18nOrderText', dict.orderText);
    st('i18nTitle', dict.title);
    st('i18nSubtitle', dict.subtitle);
    st('i18nBtnRun', dict.btnRun);
    st('i18nBtnFormat', dict.btnFormat);
    st('i18nBtnCopyLink', dict.btnCopyLink);
    st('i18nBtnDownload', dict.btnDownload);
    st('i18nBtnReset', dict.btnReset);
    st('i18nConsoleTitle', dict.consoleTitle);
    st('i18nFooterPass', dict.footerPass);
    st('i18nFooterQr', dict.footerQr);
    st('i18nFooterEditor', dict.footerEditor);

    sh('i18nSeoH2', dict.seoH2);
    sh('i18nSeoP1', dict.seoP1);
    st('i18nSeoC1Title', dict.seoC1Title);
    sh('i18nSeoC1Text', dict.seoC1Text);
    st('i18nSeoC2Title', dict.seoC2Title);
    sh('i18nSeoC2Text', dict.seoC2Text);
    st('i18nSeoC3Title', dict.seoC3Title);
    sh('i18nSeoC3Text', dict.seoC3Text);
    st('i18nSeoFaqTitle', dict.seoFaqTitle);
    st('i18nFaq1Q', dict.faq1Q); st('i18nFaq1A', dict.faq1A);
    st('i18nFaq2Q', dict.faq2Q); st('i18nFaq2A', dict.faq2A);
    st('i18nFaq3Q', dict.faq3Q); st('i18nFaq3A', dict.faq3A);
    st('i18nFaq4Q', dict.faq4Q); st('i18nFaq4A', dict.faq4A);

    updateAutoLabel();
  }

  function updateAutoLabel() {
    const el = $('i18nBtnAuto');
    const btn = $('btnAutoRun');
    if (!el || !btn) return;
    el.textContent = autoRun ? dict.autoOn : dict.autoOff;
    btn.classList.toggle('is-on', autoRun);
    btn.setAttribute('aria-pressed', String(autoRun));
  }

  // ---------- Підсвітка синтаксису + Emmet ----------
  const VOID_TAGS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  const JS_KW = new Set(['const','let','var','function','return','if','else','for','while','do','switch','case','default','break','continue','try','catch','finally','throw','async','await','import','export','from','class','extends','new','this','super','true','false','null','undefined','typeof','instanceof','of','in','delete','void']);
  const JS_BUILTIN = new Set(['document','window','console','Math','JSON','Array','Object','String','Number','Boolean','Date','Promise','Set','Map','RegExp','Error','fetch','localStorage','sessionStorage','setTimeout','setInterval','clearTimeout','clearInterval','alert','confirm','prompt']);

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function findMatchedHtmlTagIndices(code, cursor) {
    const tagRe = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^>]*)?)\s*(\/?)>/gi;
    const tokens = [];
    let m;
    while ((m = tagRe.exec(code)) !== null) {
      if (m[0].startsWith('<!--') || m[0].slice(0, 2).toLowerCase() === '<!') continue;
      const isClose = m[1] === '/';
      const name = m[2].toLowerCase();
      const selfClose = m[4] === '/' || VOID_TAGS.has(name);
      tokens.push({
        start: m.index,
        end: m.index + m[0].length,
        isClose,
        selfClose,
        name
      });
    }
    const stack = [];
    const pairs = new Map();
    tokens.forEach((tok, idx) => {
      if (tok.selfClose) return;
      if (!tok.isClose) {
        stack.push({ idx, name: tok.name });
      } else {
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].name === tok.name) {
            const openIdx = stack[i].idx;
            stack.splice(i);
            pairs.set(openIdx, idx);
            pairs.set(idx, openIdx);
            break;
          }
        }
      }
    });
    const matched = new Set();
    if (typeof cursor === 'number') {
      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (cursor >= t.start && cursor <= t.end) {
          if (pairs.has(i)) {
            matched.add(t.start);
            matched.add(tokens[pairs.get(i)].start);
          }
          break;
        }
      }
    }
    return matched;
  }

  function highlightAttrs(attrStr) {
    return attrStr.replace(/([a-zA-Z_:][\w:.-]*)(\s*=\s*)("[^"]*"|'[^']*'|[^\s"'>]+)?|([^\s]+)/g, (all, name, eq, val, other) => {
      if (other) return escHtml(other);
      let out = `<span class="hl-attr">${escHtml(name)}</span>${escHtml(eq)}`;
      if (val !== undefined) out += `<span class="hl-str">${escHtml(val)}</span>`;
      return out;
    });
  }

  function highlightHtmlCode(code, cursor) {
    const matchedStarts = findMatchedHtmlTagIndices(code, cursor);
    const re = /(<!--[\s\S]*?-->)|(<!DOCTYPE[^>]*>)|(<\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?>)/gi;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) out += escHtml(code.slice(last, m.index));
      if (m[1]) {
        out += `<span class="hl-com">${escHtml(m[1])}</span>`;
      } else if (m[2]) {
        out += `<span class="hl-doc">${escHtml(m[2])}</span>`;
      } else {
        const isMatch = matchedStarts.has(m.index);
        const tagCls = isMatch ? 'hl-tag hl-match-tag' : 'hl-tag';
        out += `<span class="hl-punc">${escHtml(m[3])}</span><span class="${tagCls}">${escHtml(m[4])}</span>${highlightAttrs(m[5])}<span class="hl-punc">${escHtml(m[6])}</span>`;
      }
      last = re.lastIndex;
    }
    if (last < code.length) out += escHtml(code.slice(last));
    return out + '\n';
  }

  function highlightCssCode(code) {
    const re = /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(#[0-9a-fA-F]{3,8}\b)|([a-zA-Z-]+(?=\s*:))|(\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|ms|deg)?\b)|(@[a-zA-Z-]+|[.#][a-zA-Z_-][\w-]*)|([{};:])/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) out += escHtml(code.slice(last, m.index));
      if (m[1]) out += `<span class="hl-com">${escHtml(m[1])}</span>`;
      else if (m[2] || m[3]) out += `<span class="hl-str">${escHtml(m[0])}</span>`;
      else if (m[4]) out += `<span class="hl-prop">${escHtml(m[4])}</span>`;
      else if (m[5]) out += `<span class="hl-num">${escHtml(m[5])}</span>`;
      else if (m[6]) out += `<span class="hl-tag">${escHtml(m[6])}</span>`;
      else if (m[7]) out += `<span class="hl-punc">${escHtml(m[7])}</span>`;
      last = re.lastIndex;
    }
    if (last < code.length) out += escHtml(code.slice(last));
    return out + '\n';
  }

  function highlightJsCode(code) {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_$][\w$]*\b)|([{}()[\].,:;+-/*=<>!&|?]+)/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) out += escHtml(code.slice(last, m.index));
      if (m[1]) out += `<span class="hl-com">${escHtml(m[1])}</span>`;
      else if (m[2]) out += `<span class="hl-str">${escHtml(m[2])}</span>`;
      else if (m[3]) out += `<span class="hl-num">${escHtml(m[3])}</span>`;
      else if (m[4]) {
        if (JS_KW.has(m[4])) out += `<span class="hl-kw">${escHtml(m[4])}</span>`;
        else if (JS_BUILTIN.has(m[4])) out += `<span class="hl-attr">${escHtml(m[4])}</span>`;
        else out += escHtml(m[4]);
      } else if (m[5]) out += `<span class="hl-punc">${escHtml(m[5])}</span>`;
      last = re.lastIndex;
    }
    if (last < code.length) out += escHtml(code.slice(last));
    return out + '\n';
  }

  function updateHighlight(key) {
    const hl = highlights[key];
    const ta = editors[key];
    if (!hl || !ta) return;
    const code = ta.value;
    if (key === 'html') hl.innerHTML = highlightHtmlCode(code, ta.selectionStart);
    else if (key === 'css') hl.innerHTML = highlightCssCode(code);
    else hl.innerHTML = highlightJsCode(code);
    hl.scrollTop = ta.scrollTop;
  }

  function expandHtmlNode(raw, indent, idxNum) {
    let part = raw.replace(/\$/g, String(idxNum));
    let text = '';
    const textMatch = part.match(/\{([^}]*)\}/);
    if (textMatch) {
      text = textMatch[1];
      part = part.replace(textMatch[0], '');
    }
    const attrs = [];
    part = part.replace(/\[([^\]]+)\]/g, (_, a) => {
      a.trim().split(/\s+/).forEach((pair) => {
        if (pair.includes('=')) {
          const [k, ...rest] = pair.split('=');
          const v = rest.join('=').replace(/^["']|["']$/g, '');
          attrs.push(`${k}="${v}"`);
        } else if (pair) {
          attrs.push(`${pair}=""`);
        }
      });
      return '';
    });
    const tagMatch = part.match(/^([a-zA-Z0-9:-]*)/);
    let tag = (tagMatch && tagMatch[1]) || 'div';
    const rest = part.slice(tag.length);
    const ids = [];
    const classes = [];
    const tokenRe = /([.#])([a-zA-Z0-9_-]+)/g;
    let tm;
    while ((tm = tokenRe.exec(rest)) !== null) {
      if (tm[1] === '#') ids.push(tm[2]);
      else classes.push(tm[2]);
    }
    if (tag === 'a' && !attrs.some((a) => a.startsWith('href='))) attrs.unshift('href=""');
    if (tag === 'img') {
      if (!attrs.some((a) => a.startsWith('src='))) attrs.push('src=""');
      if (!attrs.some((a) => a.startsWith('alt='))) attrs.push('alt=""');
    }
    if (tag.startsWith('input:')) {
      const t = tag.split(':')[1] || 'text';
      tag = 'input';
      attrs.unshift(`type="${t}"`);
    } else if (tag === 'input' && !attrs.some((a) => a.startsWith('type='))) {
      attrs.unshift('type="text"');
    }
    if (tag === 'link:css') {
      return `${indent}<link rel="stylesheet" href="style.css">`;
    }
    if (tag === 'script:src') {
      return `${indent}<script src=""></script>`;
    }
    const attrList = [];
    if (ids.length) attrList.push(`id="${ids[0]}"`);
    if (classes.length) attrList.push(`class="${classes.join(' ')}"`);
    attrList.push(...attrs);
    const attrStr = attrList.length ? ' ' + attrList.join(' ') : '';
    if (VOID_TAGS.has(tag.toLowerCase())) {
      return `${indent}<${tag}${attrStr}>`;
    }
    return `${indent}<${tag}${attrStr}>${text}</${tag}>`;
  }

  function expandHtmlEmmet(abbr, baseIndent) {
    if (abbr === '!' || abbr === 'html:5') {
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  |\n</body>\n</html>`;
    }
    if (!/^[a-zA-Z.#!][a-zA-Z0-9.#:\-_[\]="'{}*>$+]*$/.test(abbr)) return null;
    if (abbr.includes('>') || abbr.includes('+') || abbr.includes('*') || abbr.includes('.') || abbr.includes('#') || abbr.includes('[') || abbr.includes('{') || /^[a-zA-Z][a-zA-Z0-9:-]*$/.test(abbr)) {
      const siblings = abbr.split('+');
      const renderChain = (chainStr, indent) => {
        const parts = chainStr.split('>');
        const buildLevel = (idx, curIndent) => {
          const seg = parts[idx];
          if (!seg) return '';
          const mulMatch = seg.match(/\*(\d+)$/);
          const count = mulMatch ? Math.min(50, Math.max(1, parseInt(mulMatch[1], 10))) : 1;
          const cleanSeg = mulMatch ? seg.slice(0, -mulMatch[0].length) : seg;
          const rows = [];
          for (let i = 1; i <= count; i++) {
            const nodeHtml = expandHtmlNode(cleanSeg, curIndent, i);
            if (idx < parts.length - 1) {
              const closeIdx = nodeHtml.lastIndexOf('</');
              if (closeIdx !== -1) {
                const childHtml = buildLevel(idx + 1, curIndent + '  ');
                rows.push(nodeHtml.slice(0, closeIdx) + '\n' + childHtml + '\n' + curIndent + nodeHtml.slice(closeIdx));
              } else {
                rows.push(nodeHtml);
              }
            } else {
              rows.push(nodeHtml);
            }
          }
          return rows.join('\n');
        };
        return buildLevel(0, indent);
      };
      return siblings.map((s) => renderChain(s, baseIndent)).join('\n').replace(baseIndent, '');
    }
    return null;
  }

  function expandCssEmmet(abbr) {
    const map = {
      df: 'display: flex;', dg: 'display: grid;', db: 'display: block;', dn: 'display: none;', dib: 'display: inline-block;',
      jcc: 'justify-content: center;', jcsb: 'justify-content: space-between;', aic: 'align-items: center;', fdc: 'flex-direction: column;', fww: 'flex-wrap: wrap;',
      por: 'position: relative;', poa: 'position: absolute;', pof: 'position: fixed;',
      tac: 'text-align: center;', tar: 'text-align: right;', tal: 'text-align: left;',
      bgc: 'background-color: #ffffff;', c: 'color: #ffffff;'
    };
    if (map[abbr]) return map[abbr];
    let m;
    if ((m = abbr.match(/^(m|mt|mb|ml|mr|p|pt|pb|pl|pr)(\d+)$/))) {
      const props = { m: 'margin', mt: 'margin-top', mb: 'margin-bottom', ml: 'margin-left', mr: 'margin-right', p: 'padding', pt: 'padding-top', pb: 'padding-bottom', pl: 'padding-left', pr: 'padding-right' };
      return `${props[m[1]]}: ${m[2]}px;`;
    }
    if ((m = abbr.match(/^(w|h)(\d+)(p?)$/))) {
      return `${m[1] === 'w' ? 'width' : 'height'}: ${m[2]}${m[3] ? '%' : 'px'};`;
    }
    if ((m = abbr.match(/^fz(\d+)$/))) return `font-size: ${m[1]}px;`;
    if ((m = abbr.match(/^fw(\d+)$/))) return `font-weight: ${m[1]};`;
    if ((m = abbr.match(/^br(\d+)$/))) return `border-radius: ${m[1]}px;`;
    if ((m = abbr.match(/^gap(\d+)$/))) return `gap: ${m[1]}px;`;
    if ((m = abbr.match(/^op(\d+)$/))) return `opacity: 0.${m[1]};`;
    return null;
  }

  function tryExpandEmmet(key, ta) {
    if (key === 'js' || ta.selectionStart !== ta.selectionEnd) return false;
    const pos = ta.selectionStart;
    const val = ta.value;
    const lineStart = val.lastIndexOf('\n', pos - 1) + 1;
    const before = val.slice(lineStart, pos);
    const indentMatch = before.match(/^(\s*)/);
    const baseIndent = indentMatch ? indentMatch[1] : '';
    const tokenMatch = before.match(/([^\s]+)$/);
    if (!tokenMatch) return false;
    const abbr = tokenMatch[1];

    let expanded = null;
    if (key === 'html') expanded = expandHtmlEmmet(abbr, baseIndent);
    else if (key === 'css') expanded = expandCssEmmet(abbr);
    if (!expanded) return false;

    const abbrStart = pos - abbr.length;
    let caretOffset = expanded.length;
    const pipeIdx = expanded.indexOf('|');
    if (pipeIdx !== -1) {
      expanded = expanded.replace('|', '');
      caretOffset = pipeIdx;
    } else {
      const emptyTag = expanded.indexOf('></');
      const emptyAttr = expanded.indexOf('""');
      if (emptyTag !== -1) caretOffset = emptyTag + 1;
      else if (emptyAttr !== -1) caretOffset = emptyAttr + 1;
    }

    ta.value = val.slice(0, abbrStart) + expanded + val.slice(pos);
    ta.selectionStart = ta.selectionEnd = abbrStart + caretOffset;
    return true;
  }

  // ---------- Редактор ----------
  function updateGutter(key) {
    const lines = editors[key].value.split('\n').length;
    let out = '';
    for (let i = 1; i <= lines; i++) out += i + '\n';
    gutters[key].textContent = out;
    gutters[key].scrollTop = editors[key].scrollTop;
    updateHighlight(key);
  }

  function syncAllGutters() {
    Object.keys(editors).forEach(updateGutter);
  }

  function setActiveEditor(key) {
    document.querySelectorAll('.tab').forEach((t) => {
      const on = t.dataset.editor === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    document.querySelectorAll('.editor-wrap').forEach((w) => {
      w.classList.toggle('is-active', w.dataset.editor === key);
    });
    statusInfo.textContent = key.toUpperCase();
    updateGutter(key);
  }

  // ---------- Прев'ю ----------
  const CONSOLE_BRIDGE = '<scr' + 'ipt>(function(){'
    + 'var s=function(l,a){try{parent.postMessage({__kray:true,level:l,args:a},"*")}catch(e){}};'
    + '["log","info","warn","error"].forEach(function(l){var o=console[l].bind(console);'
    + 'console[l]=function(){s(l,Array.prototype.slice.call(arguments));o.apply(console,arguments)}});'
    + 'window.addEventListener("error",function(e){s("error",[e.message+" (line "+e.lineno+")"])});'
    + 'window.addEventListener("unhandledrejection",function(e){s("error",["Unhandled promise rejection: "+e.reason])})'
    + '}());</scr' + 'ipt>';

  function buildSrcDoc() {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><style>'
      + editors.css.value
      + '</style></head><body>'
      + editors.html.value
      + CONSOLE_BRIDGE
      + '<scr' + 'ipt>' + editors.js.value + '\n</scr' + 'ipt></body></html>';
  }

  let consoleEmptyShown = false;

  function ensureEmptyHint() {
    if (consoleOutput.children.length === 0) {
      const d = document.createElement('div');
      d.className = 'console-empty';
      d.textContent = dict.consoleEmpty;
      consoleOutput.appendChild(d);
      consoleEmptyShown = true;
    }
  }

  function clearConsole() {
    consoleOutput.innerHTML = '';
    consoleEmptyShown = false;
    ensureEmptyHint();
  }

  function appendConsole(level, args) {
    if (consoleEmptyShown) { consoleOutput.innerHTML = ''; consoleEmptyShown = false; }
    const line = document.createElement('div');
    line.className = 'console-line'
      + (level === 'error' ? ' is-error' : level === 'warn' ? ' is-warn' : level === 'info' ? ' is-info' : '');
    line.textContent = '› ' + args.map((a) => {
      if (a && typeof a === 'object') { try { return JSON.stringify(a); } catch (e) { return String(a); } }
      return String(a);
    }).join(' ');
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  function runCode() {
    clearConsole();
    frame.srcdoc = buildSrcDoc();
  }

  function scheduleRun() {
    if (!autoRun) return;
    clearTimeout(runTimer);
    runTimer = setTimeout(runCode, 500);
  }

  // ---------- Збереження ----------
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        html: editors.html.value,
        css: editors.css.value,
        js: editors.js.value
      }));
      statusSaved.textContent = dict.saved;
      clearTimeout(save._t);
      save._t = setTimeout(() => { statusSaved.textContent = ''; }, 1500);
    } catch (e) { /* storage disabled */ }
  }

  function loadInitial() {
    const hash = window.location.hash;
    if (hash.indexOf('#code=') === 0) {
      try {
        const data = JSON.parse(decodeURIComponent(escape(atob(hash.slice(6)))));
        editors.html.value = data.h || '';
        editors.css.value = data.c || '';
        editors.js.value = data.j || '';
        return;
      } catch (e) { /* invalid payload */ }
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        editors.html.value = d.html || DEFAULT_HTML;
        editors.css.value = d.css || DEFAULT_CSS;
        editors.js.value = d.js || DEFAULT_JS;
        return;
      }
    } catch (e) { /* ignore */ }
    editors.html.value = DEFAULT_HTML;
    editors.css.value = DEFAULT_CSS;
    editors.js.value = DEFAULT_JS;
  }

  // ---------- Дії ----------
  function showToast(msg) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('is-visible'), 2200);
  }

  function shareLink() {
    const payload = { h: editors.html.value, c: editors.css.value, j: editors.js.value };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const url = window.location.origin + window.location.pathname + '#code=' + b64;
    try { window.history.replaceState(null, '', '#code=' + b64); } catch (e) { /* ignore */ }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showCopied, showCopied);
    } else {
      showCopied();
    }
  }

  function showCopied() { showToast(dict.toastCopied); }

  function downloadHtml() {
    const blob = new Blob([buildSrcDoc()], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kray-project.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(dict.toastDownloaded);
  }

  function resetCode() {
    if (!window.confirm(dict.resetConfirm)) return;
    editors.html.value = DEFAULT_HTML;
    editors.css.value = DEFAULT_CSS;
    editors.js.value = DEFAULT_JS;
    try { window.history.replaceState(null, '', window.location.pathname); } catch (e) { /* ignore */ }
    syncAllGutters();
    save();
    runCode();
    showToast(dict.toastReset);
  }

  // Легкий нормалізатор відступів без зовнішніх залежностей.
  function formatCode(text) {
    const lines = text.replace(/\t/g, '  ').split('\n').map((l) => l.replace(/\s+$/g, ''));
    let indent = 0;
    const out = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) { out.push(''); return; }
      if (/^\s*[})]/.test(line)) indent = Math.max(0, indent - 1);
      out.push('  '.repeat(indent) + trimmed);
      if (/[{(]\s*$/.test(trimmed)) indent++;
    });
    return out.join('\n');
  }

  function formatAll() {
    editors.html.value = formatCode(editors.html.value);
    editors.css.value = formatCode(editors.css.value);
    editors.js.value = formatCode(editors.js.value);
    syncAllGutters();
    save();
    if (autoRun) runCode();
    showToast(dict.toastFormatted);
  }

  // ---------- Обробники ----------
  Object.keys(editors).forEach((key) => {
    const ta = editors[key];
    ta.addEventListener('input', () => {
      updateGutter(key);
      scheduleRun();
      save();
    });
    ta.addEventListener('scroll', () => {
      gutters[key].scrollTop = ta.scrollTop;
      if (highlights[key]) highlights[key].scrollTop = ta.scrollTop;
    });
    if (key === 'html') {
      ta.addEventListener('click', () => updateHighlight('html'));
      ta.addEventListener('keyup', (e) => {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
          updateHighlight('html');
        }
      });
    }
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (tryExpandEmmet(key, ta)) {
          updateGutter(key);
          scheduleRun();
          save();
          return;
        }
        const s = ta.selectionStart;
        const en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2;
        updateGutter(key);
        scheduleRun();
      } else if (key === 'html' && e.key === '>' && ta.selectionStart === ta.selectionEnd) {
        const pos = ta.selectionStart;
        const before = ta.value.slice(0, pos);
        const openMatch = before.match(/<([a-zA-Z][\w:-]*)(?:\s[^<>]*?)?$/);
        if (openMatch && !before.endsWith('/')) {
          const tagName = openMatch[1];
          if (!VOID_TAGS.has(tagName.toLowerCase())) {
            e.preventDefault();
            ta.value = before + `></${tagName}>` + ta.value.slice(pos);
            ta.selectionStart = ta.selectionEnd = pos + 1;
            updateGutter(key);
            scheduleRun();
            save();
          }
        }
      }
    });
  });

  document.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => setActiveEditor(t.dataset.editor));
  });

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (d && d.__kray) appendConsole(d.level, d.args || []);
  });

  $('btnRun').addEventListener('click', runCode);
  $('btnClearConsole').addEventListener('click', clearConsole);
  $('btnRefresh').addEventListener('click', runCode);
  $('btnFormat').addEventListener('click', formatAll);
  $('btnCopyLink').addEventListener('click', shareLink);
  $('btnDownload').addEventListener('click', downloadHtml);
  $('btnReset').addEventListener('click', resetCode);
  $('btnAutoRun').addEventListener('click', () => {
    autoRun = !autoRun;
    updateAutoLabel();
    if (autoRun) runCode();
  });
  $('btnFullscreen').addEventListener('click', () => {
    document.querySelector('.preview-pane').classList.toggle('is-fullscreen');
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      runCode();
    }
    if (e.key === 'Escape') {
      document.querySelector('.preview-pane').classList.remove('is-fullscreen');
    }
  });

  window.addEventListener('beforeunload', save);

  // ---------- Ініціалізація ----------
  applyI18n();
  loadInitial();
  syncAllGutters();
  setActiveEditor('html');
  runCode();
})();
