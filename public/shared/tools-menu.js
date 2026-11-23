(function initSharedToolsMenu() {
  const TOOLS = [
    {
      href: '/konvertor-webp/',
      icon: '🖼️',
      uk: 'Конвертер WebP та AVIF',
      ru: 'Конвертер WebP и AVIF',
      en: 'WebP & AVIF Converter'
    },
    {
      href: '/pdf-to-jpg/',
      icon: '📄',
      uk: 'Конвертер PDF у JPG та PNG',
      ru: 'Конвертер PDF в JPG и PNG',
      en: 'PDF to JPG & PNG Converter'
    },
    {
      href: '/qr-generator/',
      icon: '📱',
      uk: 'Генератор QR-кодів (PNG / SVG)',
      ru: 'Генератор QR-кодов (PNG / SVG)',
      en: 'QR Code Generator (PNG / SVG)'
    },
    {
      href: '/favicon-generator/',
      icon: '✨',
      uk: 'Генератор Favicon (ICO / PNG)',
      ru: 'Генератор Favicon (ICO / PNG)',
      en: 'Favicon Generator (ICO / PNG)'
    },
    {
      href: '/password-generator/',
      icon: '🔐',
      uk: 'Генератор надійних паролів',
      ru: 'Генератор надёжных паролей',
      en: 'Strong Password Generator'
    },
    {
      href: '/generator-gif/',
      icon: '🎬',
      uk: 'Генератор відео в GIF',
      ru: 'Генератор видео в GIF',
      en: 'Video to GIF Generator'
    },
    {
      href: '/code-online/',
      icon: '💻',
      uk: 'Онлайн редактор коду (HTML/CSS/JS)',
      ru: 'Онлайн редактор кода (HTML/CSS/JS)',
      en: 'Online Code Editor (HTML/CSS/JS)'
    },
    {
      href: '/photoeditor/',
      icon: '🎨',
      uk: 'Онлайн фоторедактор',
      ru: 'Онлайн фоторедактор',
      en: 'Online Photo Editor',
      desktopOnly: true
    },
    {
      href: '/timer-generator/',
      icon: '⏱️',
      uk: 'Генератор таймерів для сайту',
      ru: 'Генератор таймеров для сайта',
      en: 'Website Countdown Timer Generator'
    },
    {
      href: '/url-shortener/',
      icon: '🔗',
      uk: 'Скорочувач і кодувальник посилань',
      ru: 'Сокращатель и кодировщик ссылок',
      en: 'URL Shortener & Link Encoder'
    }
  ];

  const LABELS = {
    uk: { menuTitle: 'Веб-інструменти', order: 'Замовити сайт →', home: 'На головну' },
    ru: { menuTitle: 'Веб-инструменты', order: 'Заказать сайт →', home: 'На главную' },
    en: { menuTitle: 'Web Tools', order: 'Order Website →', home: 'Home' }
  };

  function detectLang() {
    const p = (window.location.pathname || '').toLowerCase();
    if (p === '/ru' || p.startsWith('/ru/')) return 'ru';
    if (p === '/en' || p.startsWith('/en/')) return 'en';
    return 'uk';
  }

  function injectStyles() {
    if (document.getElementById('kray-tools-menu-styles')) return;
    const style = document.createElement('style');
    style.id = 'kray-tools-menu-styles';
    style.textContent = `
      .site-header {
        padding: 18px 0 !important;
      }
      .site-header .header-container {
        min-height: 44px;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
      .kray-menu-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 14px;
        flex-shrink: 0;
        margin-left: 12px;
      }
      .kray-lang-switch {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px;
        border-radius: 10px;
        border: 1px solid rgba(59, 73, 75, 0.55);
        background: rgba(15, 22, 38, 0.85);
      }
      .kray-lang-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 7px;
        font-family: inherit;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.03em;
        color: #94a3b8;
        text-decoration: none;
        transition: color 0.15s ease, background 0.15s ease;
      }
      .kray-lang-link:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.06);
      }
      .kray-lang-link.is-active {
        color: #06101a;
        background: #22d3ee;
      }
      .kray-hamburger-btn {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: 40px;
        padding: 0 12px;
        border-radius: 10px;
        border: 1px solid rgba(59, 73, 75, 0.6);
        background: rgba(25, 35, 59, 0.85);
        color: #e2e8f0;
        cursor: pointer;
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        transition: border-color 0.2s ease, background 0.2s ease;
      }
      .kray-hamburger-btn:hover {
        border-color: #22d3ee;
        color: #ffffff;
      }
      .kray-hamburger-lines {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        width: 18px;
        height: 18px;
      }
      .kray-hamburger-line {
        display: block;
        width: 100%;
        height: 2px;
        background: currentColor;
        border-radius: 2px;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
      .kray-hamburger-btn.is-open .kray-hamburger-line:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      .kray-hamburger-btn.is-open .kray-hamburger-line:nth-child(2) {
        opacity: 0;
      }
      .kray-hamburger-btn.is-open .kray-hamburger-line:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
      .kray-tools-dropdown {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        width: 290px;
        max-width: calc(100vw - 24px);
        background: rgba(15, 22, 38, 0.98);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(34, 211, 238, 0.28);
        border-radius: 14px;
        padding: 10px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        z-index: 9999;
        display: none;
        flex-direction: column;
        gap: 4px;
      }
      .kray-tools-dropdown.is-open {
        display: flex;
      }
      .kray-dropdown-title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #22d3ee;
        padding: 4px 10px 6px;
      }
      .kray-tool-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 10px;
        border-radius: 9px;
        color: #cbd5e1;
        text-decoration: none;
        font-size: 13.5px;
        font-weight: 500;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .kray-tool-item:hover {
        background: rgba(34, 211, 238, 0.12);
        color: #ffffff;
      }
      .kray-tool-item.is-active {
        background: rgba(34, 211, 238, 0.18);
        color: #22d3ee;
        font-weight: 700;
      }
      .kray-dropdown-sep {
        height: 1px;
        background: rgba(59, 73, 75, 0.45);
        margin: 4px 0;
      }
      .kray-dropdown-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px 12px;
        border-radius: 9px;
        background: linear-gradient(135deg, #22d3ee, #06b6d4);
        color: #06101a;
        text-decoration: none;
        font-size: 13.5px;
        font-weight: 700;
      }
      @media (max-width: 768px) {
        .site-header {
          padding: 14px 0 !important;
        }
        .kray-desktop-only {
          display: none !important;
        }
        .kray-menu-wrap {
          gap: 10px;
          margin-left: 8px;
        }
        .kray-lang-switch {
          gap: 2px;
          padding: 3px;
        }
        .kray-lang-link {
          padding: 5px 7px;
          font-size: 11px;
        }
        .header-container {
          flex-wrap: nowrap !important;
        }
        .logo-area {
          flex: 1;
          min-width: 0;
        }
        .brand-text {
          min-width: 0;
        }
        .page-badge {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
          font-size: 9.5px;
        }
      }
      .kray-scroll-top-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9998;
        width: 48px;
        height: 48px;
        border-radius: 9999px;
        background: rgba(25, 35, 59, 0.88);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(59, 73, 75, 0.55);
        color: #22d3ee;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .kray-scroll-top-btn.is-visible {
        display: flex;
      }
      .kray-scroll-top-btn:hover {
        transform: scale(1.08);
        border-color: #22d3ee;
      }
      .kray-scroll-top-btn:active {
        transform: scale(0.95);
      }
      /* Bottom mascot holding "Order Website" sign */
      .kray-mascot-widget {
        position: fixed;
        bottom: 0;
        left: 24px;
        z-index: 9997;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(115%);
        opacity: 0;
        transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease;
        pointer-events: none;
      }
      .kray-mascot-widget.is-visible {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      .kray-mascot-sign-wrap {
        position: relative;
        margin-bottom: 2px;
        z-index: 2;
        animation: krayMascotFloat 2.8s ease-in-out infinite alternate;
      }
      .kray-mascot-sign {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, #22d3ee, #06b6d4);
        color: #06101a;
        text-decoration: none;
        font-size: 13px;
        font-weight: 800;
        padding: 9px 16px;
        border-radius: 12px;
        border: 2px solid rgba(255, 255, 255, 0.55);
        box-shadow: 0 10px 28px rgba(34, 211, 238, 0.38);
        white-space: nowrap;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
      }
      .kray-mascot-sign:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 14px 32px rgba(34, 211, 238, 0.55);
      }
      .kray-mascot-close {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #0f172a;
        color: #94a3b8;
        border: 1px solid rgba(148, 163, 184, 0.4);
        font-size: 12px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .kray-mascot-close:hover {
        color: #fff;
        border-color: #22d3ee;
      }
      .kray-mascot-svg {
        width: 136px;
        height: 92px;
        display: block;
        margin-top: -10px;
        filter: drop-shadow(0 -6px 18px rgba(0, 0, 0, 0.5));
      }
      .kray-mascot-eye {
        transform-origin: center;
        animation: krayMascotBlink 4.5s infinite;
      }
      @keyframes krayMascotFloat {
        0% { transform: translateY(0) rotate(-1.5deg); }
        100% { transform: translateY(-3px) rotate(1.5deg); }
      }
      @keyframes krayMascotBlink {
        0%, 94%, 100% { transform: scaleY(1); }
        97% { transform: scaleY(0.1); }
      }
      @media (max-width: 768px) {
        .kray-mascot-widget {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function mount() {
    const headerContainer = document.querySelector('.site-header .header-container');
    if (!headerContainer) return;

    injectStyles();

    // Remove legacy nav/hamburger elements so we have one clean static hamburger menu
    const oldBtn = document.getElementById('mobileMenuBtn');
    if (oldBtn) oldBtn.remove();
    const oldNav = document.getElementById('headerNav') || headerContainer.querySelector('.header-right-area');
    if (oldNav) oldNav.remove();

    const lang = detectLang();
    const L = LABELS[lang] || LABELS.uk;
    const currentPath = window.location.pathname.replace(/index\.html$/, '');
    const basePath = currentPath.replace(/^\/(ru|en)(?=\/|$)/i, '') || '/';
    const langPrefix = lang === 'uk' ? '' : `/${lang}`;
    const suffix = (window.location.search || '') + (window.location.hash || '');

    const wrap = document.createElement('div');
    wrap.className = 'kray-menu-wrap';

    const langSwitch = document.createElement('div');
    langSwitch.className = 'kray-lang-switch';
    langSwitch.setAttribute('aria-label', 'Language switcher');
    [
      { code: 'uk', label: 'UA', href: `${basePath}${suffix}` },
      { code: 'ru', label: 'RU', href: `/ru${basePath}${suffix}` },
      { code: 'en', label: 'EN', href: `/en${basePath}${suffix}` }
    ].forEach((item) => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.className = 'kray-lang-link' + (lang === item.code ? ' is-active' : '');
      if (lang === item.code) a.setAttribute('aria-current', 'page');
      langSwitch.appendChild(a);
    });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'krayMenuBtn';
    btn.className = 'kray-hamburger-btn';
    btn.setAttribute('aria-label', L.menuTitle);
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'krayToolsDropdown');
    btn.innerHTML = `
      <span class="kray-hamburger-lines" aria-hidden="true">
        <span class="kray-hamburger-line"></span>
        <span class="kray-hamburger-line"></span>
        <span class="kray-hamburger-line"></span>
      </span>
    `;

    const dropdown = document.createElement('nav');
    dropdown.id = 'krayToolsDropdown';
    dropdown.className = 'kray-tools-dropdown';
    dropdown.setAttribute('aria-label', L.menuTitle);

    const title = document.createElement('div');
    title.className = 'kray-dropdown-title';
    title.textContent = L.menuTitle;
    dropdown.appendChild(title);

    for (const tool of TOOLS) {
      const a = document.createElement('a');
      a.href = `${langPrefix}${tool.href}`;
      a.className = 'kray-tool-item'
        + (basePath === tool.href ? ' is-active' : '')
        + (tool.desktopOnly ? ' kray-desktop-only' : '');
      a.innerHTML = `<span>${tool.icon}</span><span>${tool[lang] || tool.uk}</span>`;
      dropdown.appendChild(a);
    }

    const sep = document.createElement('div');
    sep.className = 'kray-dropdown-sep';
    dropdown.appendChild(sep);

    const homeLink = document.createElement('a');
    homeLink.href = `${langPrefix}/`;
    homeLink.className = 'kray-tool-item';
    homeLink.innerHTML = `<span>🏠</span><span>${L.home}</span>`;
    dropdown.appendChild(homeLink);

    const cta = document.createElement('a');
    cta.href = `${langPrefix}/`;
    cta.className = 'kray-dropdown-cta';
    cta.textContent = `✨ ${L.order}`;
    dropdown.appendChild(cta);

    wrap.append(langSwitch, btn, dropdown);
    headerContainer.appendChild(wrap);

    // Floating Scroll-to-Top button (matching homepage)
    if (!document.getElementById('krayScrollTopBtn') && !document.getElementById('scrollToTopBtn')) {
      const topBtn = document.createElement('button');
      topBtn.type = 'button';
      topBtn.id = 'krayScrollTopBtn';
      topBtn.className = 'kray-scroll-top-btn';
      topBtn.setAttribute('aria-label', lang === 'en' ? 'Back to top' : (lang === 'ru' ? 'Наверх' : 'Вгору'));
      topBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
      document.body.appendChild(topBtn);

      let ticking = false;
      const updateTopBtn = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            topBtn.classList.toggle('is-visible', window.scrollY > 300);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', updateTopBtn, { passive: true });
      updateTopBtn();

      topBtn.addEventListener('click', () => {
        const duration = 650;
        const start = window.scrollY;
        const startTime = performance.now();
        const ease = (t, b, c, d) => {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        };
        const step = (ts) => {
          const elapsed = ts - startTime;
          window.scrollTo(0, ease(elapsed, start, -start, duration));
          if (elapsed < duration) requestAnimationFrame(step);
          else window.scrollTo(0, 0);
        };
        requestAnimationFrame(step);
      });
    }

    // Bottom mascot holding "Order Website" sign (desktop only, excluded on home/outages/alerts)
    const isExcludedPage = currentPath === '/' || currentPath.includes('grafiki-vidkluchen') || currentPath.includes('karta-trevog');
    if (!isExcludedPage && window.innerWidth > 768) {
      const mascot = document.createElement('div');
      mascot.className = 'kray-mascot-widget';
      mascot.id = 'krayMascotWidget';

      const signLabel = lang === 'en' ? 'Order Website' : (lang === 'ru' ? 'Заказать сайт' : 'Замовити сайт');
      mascot.innerHTML = `
        <div class="kray-mascot-sign-wrap">
          <a href="${langPrefix}/" class="kray-mascot-sign">✨ <span>${signLabel}</span> →</a>
          <button type="button" class="kray-mascot-close" aria-label="Close">×</button>
        </div>
        <svg class="kray-mascot-svg" viewBox="0 0 140 94" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="krayHoodie" x1="35" y1="58" x2="105" y2="94" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#1e293b"/>
              <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
            <linearGradient id="krayCap" x1="48" y1="14" x2="94" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#0ea5e9"/>
              <stop offset="100%" stop-color="#1d4ed8"/>
            </linearGradient>
            <linearGradient id="krayHair" x1="50" y1="28" x2="90" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#fb923c"/>
              <stop offset="100%" stop-color="#ea580c"/>
            </linearGradient>
          </defs>
          <!-- Torso / Hoodie -->
          <path d="M36 94 C36 67 48 60 70 60 C92 60 104 67 104 94 Z" fill="url(#krayHoodie)" stroke="#22d3ee" stroke-width="1.8"/>
          <path d="M55 62 Q70 72 85 62" stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round"/>
          <!-- Neck -->
          <rect x="64" y="52" width="12" height="11" rx="4" fill="#fcd39d"/>
          <!-- Ears -->
          <circle cx="53" cy="41" r="3.4" fill="#fcd39d"/>
          <circle cx="87" cy="41" r="3.4" fill="#fcd39d"/>
          <!-- Head -->
          <ellipse cx="70" cy="40" rx="16.5" ry="15.5" fill="#fde6ba" stroke="#1e293b" stroke-width="1.5"/>
          <!-- Ginger sideburns / hair under cap -->
          <path d="M53 36 C52 30 56 26 62 27 L57 38 Z" fill="url(#krayHair)"/>
          <path d="M87 36 C88 30 84 26 78 27 L83 38 Z" fill="url(#krayHair)"/>
          <path d="M58 31 Q66 26 76 31" fill="url(#krayHair)"/>
          <!-- Baseball Cap -->
          <path d="M51 31 C51 16 89 16 89 31 Z" fill="url(#krayCap)" stroke="#0f172a" stroke-width="1.4"/>
          <!-- Cap Visor (slightly tilted to the right) -->
          <path d="M51 30 Q72 26 98 31 Q88 35 66 32 Q55 32 51 30 Z" fill="#0284c7" stroke="#0f172a" stroke-width="1.3"/>
          <!-- Cap KD Badge -->
          <rect x="64" y="20" width="12" height="7" rx="2" fill="#0f172a" opacity="0.85"/>
          <text x="70" y="25.5" text-anchor="middle" fill="#22d3ee" font-size="5.5" font-weight="800" font-family="sans-serif">KD</text>
          <!-- Eyebrows -->
          <path d="M60 35.5 Q63 34 66 35.5" stroke="#9a3412" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M74 35.5 Q77 34 80 35.5" stroke="#9a3412" stroke-width="1.5" stroke-linecap="round"/>
          <!-- Eyes -->
          <circle class="kray-mascot-eye" cx="63.5" cy="40" r="2.2" fill="#0f172a"/>
          <circle class="kray-mascot-eye" cx="76.5" cy="40" r="2.2" fill="#0f172a"/>
          <!-- Smile -->
          <path d="M64.5 46 Q70 49.5 75.5 46" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
          <!-- Natural Bent Arms (Shoulder -> Elbow -> Forearm -> Hand holding sign) -->
          <!-- Left arm -->
          <path d="M41 72 L24 56 L29 14" stroke="#1e293b" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M41 72 L24 56 L29 14" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
          <!-- Right arm -->
          <path d="M99 72 L116 56 L111 14" stroke="#1e293b" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M99 72 L116 56 L111 14" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
          <!-- Hands & Fingers gripping bottom of sign -->
          <g fill="#fde6ba" stroke="#1e293b" stroke-width="1.3">
            <rect x="22" y="6" width="14" height="10" rx="5"/>
            <line x1="26" y1="6" x2="26" y2="11" stroke="#c28e5c" stroke-width="1.1"/>
            <line x1="30" y1="6" x2="30" y2="11" stroke="#c28e5c" stroke-width="1.1"/>
            <rect x="104" y="6" width="14" height="10" rx="5"/>
            <line x1="110" y1="6" x2="110" y2="11" stroke="#c28e5c" stroke-width="1.1"/>
            <line x1="114" y1="6" x2="114" y2="11" stroke="#c28e5c" stroke-width="1.1"/>
          </g>
        </svg>
      `;
      document.body.appendChild(mascot);

      let dismissed = false;
      let firstShow = true;
      let showTimer = null;
      let hideTimer = null;

      const scheduleNext = () => {
        if (dismissed) return;
        const delayMs = firstShow ? 8000 : 60000;
        showTimer = setTimeout(() => {
          firstShow = false;
          if (dismissed || window.innerWidth <= 768) return;
          if (document.hidden) {
            scheduleNext();
            return;
          }
          mascot.classList.add('is-visible');
          hideTimer = setTimeout(() => {
            mascot.classList.remove('is-visible');
            scheduleNext();
          }, 30000);
        }, delayMs);
      };

      mascot.querySelector('.kray-mascot-close').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dismissed = true;
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        mascot.classList.remove('is-visible');
      });

      scheduleNext();
    }

    const closeMenu = () => {
      dropdown.classList.remove('is-open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle('is-open');
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
