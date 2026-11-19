(function () {
  const I18N = {
    ua: {
      pageTitle: 'Генератор надійних паролів онлайн — Створити складний пароль безкоштовно | KRAY DIGITAL',
      badge: 'WEB TOOLS • CRYPTO PASSWORD GENERATOR',
      linkEditor: '🎨 Фоторедактор',
      linkPdf: '📄 PDF у JPG',
      linkConverter: '🖼️ Конвертер WebP',
      linkGif: '🎬 Відео в GIF',
      orderText: 'Замовити сайт',
      title: 'Генератор надійних паролів онлайн',
      subtitle: 'Створюйте криптостійкі паролі будь-якої складності локально у вашому браузері за допомогою Web Crypto API. Жоден пароль не передається на сервер і не зберігається в мережі.',
      copyBtn: 'Копіювати',
      copiedBtn: 'Скопійовано!',
      lengthLabel: 'Довжина пароля:',
      batchBtn: 'Згенерувати 5 паролів',
      batchTitle: 'Згенерований список (5 паролів):',
      charsTitle: 'Використовувані символи:',
      chkUpper: 'Великі літери (A–Z)',
      chkLower: 'Малі літери (a–z)',
      chkNumbers: 'Цифри (0–9)',
      chkSymbols: 'Спецсимволи (!@#$%^&*)',
      chkExclude: 'Виключити схожі символи (0, O, l, 1, I)',
      strWeak: 'Слабкий',
      strMedium: 'Середній',
      strStrong: 'Надійний',
      strCrypto: 'Криптостійкий',
      bitsUnit: 'біт ентропії',
      seoH2: 'Як створити справді надійний пароль і захистити акаунти?',
      seoP1: 'Сучасні відеокарти та хмарні кластери здатні перебирати мільярди простих комбінацій на секунду. Короткий пароль із дати народження чи слова зі словника зламується за лічені секунди. Наш <strong>онлайн генератор паролів</strong> використовує криптографічно стійкий генератор випадкових чисел браузера (<code>window.crypto.getRandomValues</code>), створюючи непередбачувані комбінації з високою ентропією.',
      seoC1Title: '🔐 Локальна генерація (Zero-Knowledge)',
      seoC1Text: 'Усі паролі створюються виключно на вашому пристрої. Інтернет-з’єднання після завантаження сторінки навіть не потрібне — дані нікуди не надсилаються.',
      seoC2Title: '📏 Оптимальна довжина від 16 символів',
      seoC2Text: 'Для пошти, банкінгу та адмін-панелей рекомендуємо довжину 16–24 символи з літерами різного регістру, цифрами та спецсимволами.',
      seoC3Title: '🛡️ Унікальність для кожного сайту',
      seoC3Text: 'Ніколи не використовуйте один пароль на різних сервісах. Витік бази одного форуму не має ставити під загрозу вашу пошту чи криптогаманець.',
      seoFaqTitle: 'Часті запитання про генератор паролів',
      faq1Q: 'Чи безпечно користуватися онлайн-генератором?',
      faq1A: 'Так, якщо генерація відбувається локально через Web Crypto API у вашому браузері. Ви можете перевірити це у вкладці Network — жодних запитів під час створення пароля немає.',
      faq2Q: 'Що означає ентропія пароля в бітах?',
      faq2A: 'Ентропія показує математичну складність підбору. Значення від 80 біт вважається надійним, а понад 100 біт — практично неможливим для прямого перебору (brute-force).',
      faq3Q: 'Навіщо виключати схожі символи (0, O, l, 1, I)?',
      faq3A: 'Якщо пароль потрібно диктувати голосом або вводити вручну з екрана на іншому пристрої, виключення візуально схожих символів допоможе уникнути помилок.',
      faq4Q: 'Де найкраще зберігати створені паролі?',
      faq4A: 'Використовуйте перевірені менеджери паролів (Bitwarden, 1Password, KeePass або вбудований менеджер браузера) і обов’язково вмикайте двофакторну автентифікацію (2FA).',
      footerConverter: 'Конвертер WebP/AVIF',
      footerEditor: 'Фоторедактор',
      footerAlerts: 'Карта тривог'
    },
    ru: {
      pageTitle: 'Генератор надёжных паролей онлайн — Создать сложный пароль бесплатно | KRAY DIGITAL',
      badge: 'WEB TOOLS • CRYPTO PASSWORD GENERATOR',
      linkEditor: '🎨 Фоторедактор',
      linkPdf: '📄 PDF в JPG',
      linkConverter: '🖼️ Конвертер WebP',
      linkGif: '🎬 Видео в GIF',
      orderText: 'Заказать сайт',
      title: 'Генератор надёжных паролей онлайн',
      subtitle: 'Создавайте криптостойкие пароли любой сложности локально в вашем браузере с помощью Web Crypto API. Ни один пароль не передаётся на сервер и не сохраняется в сети.',
      copyBtn: 'Копировать',
      copiedBtn: 'Скопировано!',
      lengthLabel: 'Длина пароля:',
      batchBtn: 'Сгенерировать 5 паролей',
      batchTitle: 'Сгенерированный список (5 паролей):',
      charsTitle: 'Используемые символы:',
      chkUpper: 'Заглавные буквы (A–Z)',
      chkLower: 'Строчные буквы (a–z)',
      chkNumbers: 'Цифры (0–9)',
      chkSymbols: 'Спецсимволы (!@#$%^&*)',
      chkExclude: 'Исключить похожие символы (0, O, l, 1, I)',
      strWeak: 'Слабый',
      strMedium: 'Средний',
      strStrong: 'Надёжный',
      strCrypto: 'Криптостойкий',
      bitsUnit: 'бит энтропии',
      seoH2: 'Как создать действительно надёжный пароль и защитить аккаунты?',
      seoP1: 'Современные видеокарты и облачные кластеры способны перебирать миллиарды простых комбинаций в секунду. Короткий пароль из даты рождения или слова из словаря взламывается за считанные секунды. Наш <strong>онлайн генератор паролей</strong> использует криптографически стойкий генератор случайных чисел браузера (<code>window.crypto.getRandomValues</code>), создавая непредсказуемые комбинации с высокой энтропией.',
      seoC1Title: '🔐 Локальная генерация (Zero-Knowledge)',
      seoC1Text: 'Все пароли создаются исключительно на вашем устройстве. Интернет-соединение после загрузки страницы даже не нужно — данные никуда не отправляются.',
      seoC2Title: '📏 Оптимальная длина от 16 символов',
      seoC2Text: 'Для почты, банкинга и админ-панелей рекомендуем длину 16–24 символа с буквами разного регистра, цифрами и спецсимволами.',
      seoC3Title: '🛡️ Уникальность для каждого сайта',
      seoC3Text: 'Никогда не используйте один пароль на разных сервисах. Утечка базы одного форума не должна ставить под угрозу вашу почту или криптокошелёк.',
      seoFaqTitle: 'Частые вопросы о генераторе паролей',
      faq1Q: 'Безопасно ли пользоваться онлайн-генератором?',
      faq1A: 'Да, если генерация происходит локально через Web Crypto API в вашем браузере. Вы можете проверить это во вкладке Network — никаких запросов при создании пароля нет.',
      faq2Q: 'Что означает энтропия пароля в битах?',
      faq2A: 'Энтропия показывает математическую сложность подбора. Значение от 80 бит считается надёжным, а более 100 бит — практически невозможным для прямого перебора (brute-force).',
      faq3Q: 'Зачем исключать похожие символы (0, O, l, 1, I)?',
      faq3A: 'Если пароль нужно диктовать голосом или вводить вручную с экрана на другом устройстве, исключение визуально похожих символов поможет избежать ошибок.',
      faq4Q: 'Где лучше всего хранить созданные пароли?',
      faq4A: 'Используйте проверенные менеджеры паролей (Bitwarden, 1Password, KeePass или встроенный менеджер браузера) и обязательно включайте двухфакторную аутентификацию (2FA).',
      footerConverter: 'Конвертер WebP/AVIF',
      footerEditor: 'Фоторедактор',
      footerAlerts: 'Карта тревог'
    },
    en: {
      pageTitle: 'Secure Password Generator Online — Create Strong Random Passwords | KRAY DIGITAL',
      badge: 'WEB TOOLS • CRYPTO PASSWORD GENERATOR',
      linkEditor: '🎨 Photo Editor',
      linkPdf: '📄 PDF to JPG',
      linkConverter: '🖼️ WebP Converter',
      linkGif: '🎬 Video to GIF',
      orderText: 'Order Website',
      title: 'Online Strong Password Generator',
      subtitle: 'Create cryptographically secure passwords of any length locally in your browser via Web Crypto API. No password is ever sent to a server or stored online.',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
      lengthLabel: 'Password Length:',
      batchBtn: 'Generate 5 Passwords',
      batchTitle: 'Generated List (5 Passwords):',
      charsTitle: 'Character Sets:',
      chkUpper: 'Uppercase (A–Z)',
      chkLower: 'Lowercase (a–z)',
      chkNumbers: 'Numbers (0–9)',
      chkSymbols: 'Symbols (!@#$%^&*)',
      chkExclude: 'Exclude look-alike characters (0, O, l, 1, I)',
      strWeak: 'Weak',
      strMedium: 'Fair',
      strStrong: 'Strong',
      strCrypto: 'Very Strong',
      bitsUnit: 'bits entropy',
      seoH2: 'How to Create a Truly Secure Password',
      seoP1: 'Modern GPUs and cloud clusters can brute-force billions of simple combinations per second. Our <strong>online password generator</strong> uses the browser’s cryptographically secure random generator (<code>window.crypto.getRandomValues</code>) to create unpredictable high-entropy passwords.',
      seoC1Title: '🔐 Client-Side Zero-Knowledge',
      seoC1Text: 'All passwords are generated strictly on your device. Nothing is transmitted over the network after the page loads.',
      seoC2Title: '📏 Recommended Length: 16+ Characters',
      seoC2Text: 'For email, banking, and admin dashboards, use 16–24 characters mixing uppercase, lowercase, digits, and symbols.',
      seoC3Title: '🛡️ Unique Password Per Service',
      seoC3Text: 'Never reuse passwords across websites so a single data breach cannot compromise your primary accounts.',
      seoFaqTitle: 'Frequently Asked Questions',
      faq1Q: 'Is this online password generator safe?',
      faq1A: 'Yes. Generation runs 100% locally via Web Crypto API in your browser with zero network requests.',
      faq2Q: 'What does password entropy in bits mean?',
      faq2A: 'Entropy measures mathematical resistance to guessing. 80+ bits is strong, while 100+ bits is practically infeasible to brute-force.',
      faq3Q: 'Why exclude similar characters (0, O, l, 1, I)?',
      faq3A: 'Excluding visually ambiguous characters prevents typos when reading or typing a password onto another device.',
      faq4Q: 'How should I store generated passwords?',
      faq4A: 'Save them in a trusted password manager (Bitwarden, 1Password, KeePass) and enable 2FA wherever supported.',
      footerConverter: 'WebP/AVIF Converter',
      footerEditor: 'Photo Editor',
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
    setText('i18nLinkEditor', dict.linkEditor);
    setText('i18nLinkPdf', dict.linkPdf);
    setText('i18nLinkConverter', dict.linkConverter);
    setText('i18nLinkGif', dict.linkGif);
    setText('i18nOrderText', dict.orderText);
    setText('i18nTitle', dict.title);
    setText('i18nSubtitle', dict.subtitle);
    setText('i18nCopyBtn', dict.copyBtn);
    setText('i18nLengthLabel', dict.lengthLabel);
    setText('i18nBatchBtn', dict.batchBtn);
    setText('i18nBatchTitle', dict.batchTitle);
    setText('i18nCharsTitle', dict.charsTitle);
    setText('i18nChkUpper', dict.chkUpper);
    setText('i18nChkLower', dict.chkLower);
    setText('i18nChkNumbers', dict.chkNumbers);
    setText('i18nChkSymbols', dict.chkSymbols);
    setText('i18nChkExclude', dict.chkExclude);

    setText('i18nSeoH2', dict.seoH2);
    setHtml('i18nSeoP1', dict.seoP1);
    setText('i18nSeoC1Title', dict.seoC1Title);
    setText('i18nSeoC1Text', dict.seoC1Text);
    setText('i18nSeoC2Title', dict.seoC2Title);
    setText('i18nSeoC2Text', dict.seoC2Text);
    setText('i18nSeoC3Title', dict.seoC3Title);
    setText('i18nSeoC3Text', dict.seoC3Text);

    setText('i18nSeoFaqTitle', dict.seoFaqTitle);
    setText('i18nFaq1Q', dict.faq1Q);
    setText('i18nFaq1A', dict.faq1A);
    setText('i18nFaq2Q', dict.faq2Q);
    setText('i18nFaq2A', dict.faq2A);
    setText('i18nFaq3Q', dict.faq3Q);
    setText('i18nFaq3A', dict.faq3A);
    setText('i18nFaq4Q', dict.faq4Q);
    setText('i18nFaq4A', dict.faq4A);

    setText('i18nFooterConverter', dict.footerConverter);
    setText('i18nFooterEditor', dict.footerEditor);
    setText('i18nFooterAlerts', dict.footerAlerts);
  }
  applyI18n();

  const SETS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };
  const SIMILAR_REGEX = /[0Ol1I]/g;

  const passwordOutput = document.getElementById('passwordOutput');
  const btnRegen = document.getElementById('btnRegen');
  const btnCopyMain = document.getElementById('btnCopyMain');
  const i18nCopyBtn = document.getElementById('i18nCopyBtn');
  const strengthFill = document.getElementById('strengthFill');
  const strengthBadge = document.getElementById('strengthBadge');
  const entropyText = document.getElementById('entropyText');

  const lengthSlider = document.getElementById('lengthSlider');
  const lengthValueBadge = document.getElementById('lengthValueBadge');
  const chkUpper = document.getElementById('chkUpper');
  const chkLower = document.getElementById('chkLower');
  const chkNumbers = document.getElementById('chkNumbers');
  const chkSymbols = document.getElementById('chkSymbols');
  const chkExcludeSimilar = document.getElementById('chkExcludeSimilar');

  const btnBatchGen = document.getElementById('btnBatchGen');
  const batchResultsCard = document.getElementById('batchResultsCard');
  const btnCloseBatch = document.getElementById('btnCloseBatch');
  const batchList = document.getElementById('batchList');

  function secureRandomInt(max) {
    if (max <= 1) return 0;
    const limit = Math.floor(0x100000000 / max) * max;
    const arr = new Uint32Array(1);
    let val;
    do {
      window.crypto.getRandomValues(arr);
      val = arr[0];
    } while (val >= limit);
    return val % max;
  }

  function getActivePools() {
    const excl = chkExcludeSimilar.checked;
    const clean = (s) => (excl ? s.replace(SIMILAR_REGEX, '') : s);
    const pools = [];
    if (chkUpper.checked) pools.push(clean(SETS.upper));
    if (chkLower.checked) pools.push(clean(SETS.lower));
    if (chkNumbers.checked) pools.push(clean(SETS.numbers));
    if (chkSymbols.checked) pools.push(clean(SETS.symbols));
    return pools.filter(p => p.length > 0);
  }

  function generateOnePassword(len) {
    let pools = getActivePools();
    if (pools.length === 0) {
      chkLower.checked = true;
      pools = getActivePools();
    }
    const allChars = pools.join('');
    const result = [];

    // Ensure at least one char from each selected pool when length allows
    for (let i = 0; i < pools.length && result.length < len; i++) {
      const pool = pools[i];
      result.push(pool[secureRandomInt(pool.length)]);
    }
    while (result.length < len) {
      result.push(allChars[secureRandomInt(allChars.length)]);
    }

    // Fisher-Yates shuffle with Web Crypto
    for (let i = result.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return { password: result.join(''), poolSize: allChars.length };
  }

  function updateStrengthUI(len, poolSize) {
    const entropy = Math.round(len * Math.log2(Math.max(2, poolSize)));
    entropyText.textContent = `~${entropy} ${dict.bitsUnit}`;

    let label = dict.strWeak;
    let color = '#ef4444';
    let bg = 'rgba(239, 68, 68, 0.16)';
    let width = Math.min(100, Math.max(15, Math.round((entropy / 128) * 100)));

    if (entropy >= 100) {
      label = dict.strCrypto;
      color = '#4ade80';
      bg = 'rgba(34, 197, 94, 0.16)';
    } else if (entropy >= 70) {
      label = dict.strStrong;
      color = '#38bdf8';
      bg = 'rgba(56, 189, 248, 0.16)';
    } else if (entropy >= 45) {
      label = dict.strMedium;
      color = '#fbbf24';
      bg = 'rgba(251, 191, 36, 0.16)';
    }

    strengthFill.style.width = `${width}%`;
    strengthFill.style.background = color;
    strengthBadge.textContent = label;
    strengthBadge.style.color = color;
    strengthBadge.style.background = bg;
  }

  function refreshPassword() {
    const len = Math.min(64, Math.max(6, parseInt(lengthSlider.value, 10) || 16));
    lengthValueBadge.textContent = len;
    document.querySelectorAll('.len-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.len, 10) === len);
    });

    const { password, poolSize } = generateOnePassword(len);
    passwordOutput.value = password;
    updateStrengthUI(len, poolSize);
  }

  async function copyText(text, btn, labelEl) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      passwordOutput.select();
      document.execCommand('copy');
    }
    if (btn) btn.classList.add('copied');
    if (labelEl) {
      const prev = labelEl.textContent;
      labelEl.textContent = dict.copiedBtn;
      setTimeout(() => {
        if (btn) btn.classList.remove('copied');
        labelEl.textContent = prev;
      }, 1400);
    }
  }

  lengthSlider.addEventListener('input', refreshPassword);
  document.querySelectorAll('.len-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lengthSlider.value = btn.dataset.len;
      refreshPassword();
    });
  });

  [chkUpper, chkLower, chkNumbers, chkSymbols, chkExcludeSimilar].forEach(chk => {
    chk.addEventListener('change', () => {
      if (!chkUpper.checked && !chkLower.checked && !chkNumbers.checked && !chkSymbols.checked) {
        chk.checked = true;
        return;
      }
      refreshPassword();
    });
  });

  btnRegen.addEventListener('click', refreshPassword);
  btnCopyMain.addEventListener('click', () => copyText(passwordOutput.value, btnCopyMain, i18nCopyBtn));

  btnBatchGen.addEventListener('click', () => {
    const len = Math.min(64, Math.max(6, parseInt(lengthSlider.value, 10) || 16));
    batchList.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const { password } = generateOnePassword(len);
      const row = document.createElement('div');
      row.className = 'batch-item';
      const code = document.createElement('span');
      code.className = 'batch-code';
      code.textContent = password;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-copy-mini';
      btn.textContent = dict.copyBtn;
      btn.addEventListener('click', () => copyText(password, null, btn));
      row.appendChild(code);
      row.appendChild(btn);
      batchList.appendChild(row);
    }
    batchResultsCard.style.display = 'block';
  });

  btnCloseBatch.addEventListener('click', () => {
    batchResultsCard.style.display = 'none';
  });

  refreshPassword();
})();

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
