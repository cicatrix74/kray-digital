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
    const langs = [...(navigator.languages || []), navigator.language || ''].map(s => String(s).toLowerCase());
    for (const l of langs) {
      if (l.startsWith('uk') || l.startsWith('ua')) return 'uk';
      if (l.startsWith('ru') || l.startsWith('be') || l.startsWith('kk')) return 'ru';
      if (l.startsWith('en')) return 'en';
    }
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
      @media (max-width: 768px) {
        .kray-uf-container {
          flex-direction: column;
          justify-content: center;
          text-align: center;
          gap: 10px;
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
