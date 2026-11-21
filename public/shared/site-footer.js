(function initUnifiedSiteFooter() {
  const I18N = {
    uk: {
      copyright: '© 2026 KRAY DIGITAL. Усі права захищено.',
      order: 'Замовити сайт →'
    },
    ru: {
      copyright: '© 2026 KRAY DIGITAL. Все права защищены.',
      order: 'Заказать сайт →'
    },
    en: {
      copyright: '© 2026 KRAY DIGITAL. All rights reserved.',
      order: 'Order Website →'
    }
  };

  function detectLang() {
    const p = (window.location.pathname || '').toLowerCase();
    if (p === '/ru' || p.startsWith('/ru/')) return 'ru';
    if (p === '/en' || p.startsWith('/en/')) return 'en';
    return 'uk';
  }

  function injectStyles() {
    if (document.getElementById('kray-unified-footer-styles')) return;
    const style = document.createElement('style');
    style.id = 'kray-unified-footer-styles';
    style.textContent = `
      footer.site-footer.kray-unified-footer {
        background: rgba(10, 14, 24, 0.94) !important;
        border-top: 1px solid rgba(59, 73, 75, 0.35) !important;
        padding: 18px 0 !important;
        margin-top: auto;
        color: #94a3b8;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }
      .kray-uf-container {
        width: 100%;
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }
      .kray-uf-copy {
        font-size: 12.5px;
        color: #94a3b8;
      }
      .kray-uf-ssl {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #94a3b8;
      }
      .kray-uf-ssl svg {
        color: #34d399;
        flex-shrink: 0;
      }
      .kray-uf-cta {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: rgba(34, 211, 238, 0.12);
        border: 1px solid rgba(34, 211, 238, 0.38);
        color: #22d3ee;
        text-decoration: none;
        font-size: 12.5px;
        font-weight: 700;
        padding: 7px 14px;
        border-radius: 9px;
        white-space: nowrap;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .kray-uf-cta:hover {
        background: #22d3ee;
        color: #06101a;
      }
      .kray-uf-langs {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 2px;
        border-radius: 9px;
        border: 1px solid rgba(59, 73, 75, 0.45);
        background: rgba(23, 27, 39, 0.75);
      }
      .kray-uf-lang {
        padding: 4px 8px;
        border-radius: 7px;
        font-size: 11px;
        font-weight: 700;
        color: #94a3b8;
        text-decoration: none;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .kray-uf-lang:hover {
        color: #ffffff;
      }
      .kray-uf-lang.active {
        background: #00f0ff;
        color: #00363a;
      }
      @media (max-width: 768px) {
        .kray-uf-container {
          flex-direction: column;
          justify-content: center;
          text-align: center;
          gap: 10px;
        }
      }
      .kray-cookie-bar {
        position: fixed;
        bottom: 18px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 98;
        width: calc(100% - 2rem);
        max-width: 560px;
        border-radius: 16px;
        border: 1px solid rgba(59, 73, 75, 0.45);
        background: rgba(15, 19, 30, 0.96);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        padding: 12px 16px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        box-sizing: border-box;
      }
      body.emergency-banner-visible .kray-cookie-bar {
        bottom: 148px;
      }
      .kray-cookie-text {
        font-size: 12.5px;
        line-height: 1.35;
        color: #dfe2f2;
        margin: 0;
      }
      .kray-cookie-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .kray-cookie-btn {
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 10px;
        cursor: pointer;
        border: 1px solid rgba(59, 73, 75, 0.45);
        background: transparent;
        color: #b9cacb;
        transition: all 0.15s ease;
      }
      .kray-cookie-btn:hover {
        color: #ffffff;
        border-color: rgba(0, 240, 255, 0.45);
      }
      .kray-cookie-btn.primary {
        background: #00f0ff;
        border-color: #00f0ff;
        color: #00363a;
        font-weight: 700;
      }
      .kray-cookie-btn.primary:hover {
        filter: brightness(1.08);
      }
      @media (max-width: 600px) {
        .kray-cookie-bar {
          flex-direction: column;
          align-items: stretch;
          bottom: 72px;
        }
        .kray-cookie-actions {
          justify-content: flex-end;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function mount() {
    const currentPath = window.location.pathname.replace(/index\.html$/, '');
    if (currentPath === '/') return;

    const footer = document.querySelector('footer.site-footer') || document.querySelector('footer');
    if (!footer) return;

    injectStyles();

    const lang = detectLang();
    const T = I18N[lang] || I18N.uk;

    footer.className = 'site-footer kray-unified-footer';
    footer.removeAttribute('style');

    footer.innerHTML = `
      <div class="kray-uf-container">
        <span class="kray-uf-copy">${T.copyright}</span>
        <span class="kray-uf-ssl">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          Secured by SSL 256-bit Encryption
        </span>
      </div>
    `;

    mountCookieConsent(lang);
  }

  function mountCookieConsent(lang) {
    const STORAGE_KEY = 'kray_cookie_consent';
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // continue
    }
    if (document.getElementById('kray-cookie-consent')) return;

    const COOKIE_COPY = {
      uk: {
        text: 'Ми використовуємо файли cookie для коректної роботи сайту та аналітики.',
        essential: 'Лише необхідні',
        accept: 'Прийняти',
      },
      ru: {
        text: 'Мы используем файлы cookie для корректной работы сайта и аналитики.',
        essential: 'Только необходимые',
        accept: 'Принять',
      },
      en: {
        text: 'We use cookies to ensure the website works properly and for analytics.',
        essential: 'Essential only',
        accept: 'Accept',
      },
    };
    const c = COOKIE_COPY[lang] || COOKIE_COPY.uk;

    const bar = document.createElement('div');
    bar.id = 'kray-cookie-consent';
    bar.className = 'kray-cookie-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML = `
      <p class="kray-cookie-text">${c.text}</p>
      <div class="kray-cookie-actions">
        <button type="button" class="kray-cookie-btn" data-cookie-choice="essential">${c.essential}</button>
        <button type="button" class="kray-cookie-btn primary" data-cookie-choice="accepted">${c.accept}</button>
      </div>
    `;

    bar.querySelectorAll('[data-cookie-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const choice = btn.getAttribute('data-cookie-choice') || 'accepted';
        try {
          localStorage.setItem(STORAGE_KEY, choice);
          document.cookie = 'kray_consent=' + choice + '; max-age=31536000; path=/; SameSite=Lax';
        } catch {
          // ignore
        }
        bar.remove();
      });
    });

    document.body.appendChild(bar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
