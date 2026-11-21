import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { LanguageProvider } from '../src/context/LanguageContext.tsx';

type Lang = 'uk' | 'ru' | 'en';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  throw new Error(`Missing ${indexHtmlPath}. Run vite build first.`);
}

let template = fs.readFileSync(indexHtmlPath, 'utf-8');

const rootPlaceholder = '<div id="root"></div>';
if (!template.includes(rootPlaceholder)) {
  throw new Error('Could not find <div id="root"></div> in dist/index.html');
}

const cssLinkRegex = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']\/assets\/(index-[^"']+\.css)["'][^>]*>/i;
const cssMatch = template.match(cssLinkRegex);

if (cssMatch) {
  const cssFileName = cssMatch[1];
  const cssPath = path.join(distDir, 'assets', cssFileName);
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    template = template.replace(cssLinkRegex, () => `<style>${cssContent}</style>`);
    console.log(`[prerender] Inlined CSS: ${cssFileName} (${cssContent.length} bytes)`);
  } else {
    console.warn(`[prerender] CSS file not found for inlining: ${cssPath}`);
  }
} else {
  console.warn('[prerender] No matching index-*.css <link> found in dist/index.html');
}

const langs: {
  lang: Lang;
  fileName: string;
  extraPaths?: string[];
  notFoundFileName: string;
  canonicalUrl: string;
}[] = [
  {
    lang: 'uk',
    fileName: 'index.html',
    notFoundFileName: '404.html',
    canonicalUrl: 'https://kray-digital.pp.ua/',
  },
  {
    lang: 'ru',
    fileName: 'index.ru.html',
    extraPaths: ['ru/index.html'],
    notFoundFileName: '404.ru.html',
    canonicalUrl: 'https://kray-digital.pp.ua/ru/',
  },
  {
    lang: 'en',
    fileName: 'index.en.html',
    extraPaths: ['en/index.html'],
    notFoundFileName: '404.en.html',
    canonicalUrl: 'https://kray-digital.pp.ua/en/',
  },
];

const hreflangLinks = [
  '<link rel="alternate" hreflang="uk" href="https://kray-digital.pp.ua/" />',
  '<link rel="alternate" hreflang="ru" href="https://kray-digital.pp.ua/ru/" />',
  '<link rel="alternate" hreflang="en" href="https://kray-digital.pp.ua/en/" />',
  '<link rel="alternate" hreflang="x-default" href="https://kray-digital.pp.ua/" />',
].join('\n    ');

const homeSeo: Record<Lang, { title: string; description: string }> = {
  uk: {
    title: 'Kray Digital — Розробка сайтів та digital-маркетинг',
    description:
      'Digital-агентство Kray Digital. Розробка швидких веб-сайтів від 5 000 ₴, SEO-оптимізація та Google реклама. Без передоплати — оплата виключно за фактом робіт.',
  },
  ru: {
    title: 'Kray Digital — Разработка сайтов и digital-маркетинг',
    description:
      'Digital-агентство Kray Digital. Разработка быстрых веб-сайтов от 5 000 ₴, SEO-оптимизация и Google реклама. Без предоплаты — оплата исключительно по факту работ.',
  },
  en: {
    title: 'Kray Digital — Web Development & Digital Marketing',
    description:
      'Kray Digital agency. Fast website development, SEO optimization and Google Ads. Pay-on-delivery model with guaranteed KPIs.',
  },
};

const notFoundTitles: Record<Lang, string> = {
  uk: '404 — Сторінку не знайдено | Kray Digital',
  ru: '404 — Страница не найдена | Kray Digital',
  en: '404 — Page Not Found | Kray Digital',
};

for (const { lang, fileName, extraPaths, notFoundFileName, canonicalUrl } of langs) {
  const appHtml = renderToString(
    React.createElement(LanguageProvider, { initialLanguage: lang }, React.createElement(App)),
  );

  const seo = homeSeo[lang];
  const html = template
    .replace(/<html\b([^>]*)\blang=["'][^"']*["']/i, `<html$1lang="${lang}" data-ssr-lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`)
    .replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${seo.description}" />`,
    )
    .replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />\n    ${hreflangLinks}`,
    )
    .replace(
      /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:title" content="${seo.title}" />`,
    )
    .replace(
      /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:description" content="${seo.description}" />`,
    )
    .replace(rootPlaceholder, () => `<div id="root">${appHtml}</div>`);

  const outPath = path.join(distDir, fileName);
  fs.writeFileSync(outPath, html, 'utf-8');
  console.log(`[prerender] Wrote ${fileName} (${lang}, ${html.length} bytes)`);

  if (extraPaths) {
    for (const relPath of extraPaths) {
      const targetPath = path.join(distDir, relPath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, html, 'utf-8');
      console.log(`[prerender] Wrote ${relPath} (${lang}, ${html.length} bytes)`);
    }
  }

  const notFoundHtmlContent = renderToString(
    React.createElement(
      LanguageProvider,
      { initialLanguage: lang },
      React.createElement(App, { initialIsNotFound: true }),
    ),
  );

  const notFoundHtml = template
    .replace(/<html\b([^>]*)\blang=["'][^"']*["']/i, `<html$1lang="${lang}" data-ssr-lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${notFoundTitles[lang]}</title>\n    <meta name="robots" content="noindex, nofollow" />`)
    .replace(rootPlaceholder, () => `<div id="root">${notFoundHtmlContent}</div>`);

  const notFoundOutPath = path.join(distDir, notFoundFileName);
  fs.writeFileSync(notFoundOutPath, notFoundHtml, 'utf-8');
  console.log(`[prerender] Wrote ${notFoundFileName} (${lang}, ${notFoundHtml.length} bytes)`);
}

interface ToolSeoEntry {
  slug: string;
  meta: Record<Lang, { title: string; description: string }>;
}

const TOOL_PAGES: ToolSeoEntry[] = [
  {
    slug: 'grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti',
    meta: {
      uk: {
        title: 'Графік відключень світла — Дніпро та Дніпропетровська область ДТЕК | KRAY DIGITAL',
        description: 'Актуальні графіки відключень електроенергії у Дніпрі та Дніпропетровській області (ДТЕК, ЦЕК, YASNO). Пошук підгрупи за адресою та інтерактивна карта.',
      },
      ru: {
        title: 'График отключений света — Днепр и Днепропетровская область ДТЭК | KRAY DIGITAL',
        description: 'Актуальные графики отключений электроэнергии в Днепре и Днепропетровской области (ДТЭК, ЦЭК, YASNO). Поиск подгруппы по адресу и интерактивная карта.',
      },
      en: {
        title: 'Power Outage Schedule — Dnipro & Region (DTEK) | KRAY DIGITAL',
        description: 'Live power outage schedules in Dnipro and Dnipropetrovsk region (DTEK, CEK, YASNO). Address subgroup lookup and interactive district map.',
      },
    },
  },
  {
    slug: 'karta-trevog',
    meta: {
      uk: {
        title: 'Карта повітряних тривог України онлайн зараз (Live) — Червона, жовта, зелена зони | KRAY DIGITAL',
        description: 'Інтерактивна карта повітряних тривог України в реальному часі. Актуальні статуси по областях та районах з автооновленням кожні 20 секунд.',
      },
      ru: {
        title: 'Карта воздушных тревог Украины онлайн сейчас (Live) — Красная, жёлтая, зелёная зоны | KRAY DIGITAL',
        description: 'Интерактивная карта воздушных тревог Украины в реальном времени. Актуальные статусы по областям и районам с автообновлением каждые 20 секунд.',
      },
      en: {
        title: 'Ukraine Air Raid Alerts Map Live — Real-Time Monitoring | KRAY DIGITAL',
        description: 'Live interactive air raid alerts map of Ukraine. Real-time regional and district alert status updated every 20 seconds.',
      },
    },
  },
  {
    slug: 'konvertor-webp',
    meta: {
      uk: {
        title: 'Конвертер зображень JPG, PNG, GIF у WebP та AVIF онлайн | KRAY DIGITAL',
        description: 'Швидка онлайн-конвертація JPG, PNG та GIF у сучасні формати WebP та AVIF прямо в браузері без завантаження на сервер.',
      },
      ru: {
        title: 'Конвертер картинок JPG, PNG, GIF в WebP и AVIF онлайн | KRAY DIGITAL',
        description: 'Быстрая онлайн-конвертация JPG, PNG и GIF в современные форматы WebP и AVIF прямо в браузере без загрузки на сервер.',
      },
      en: {
        title: 'Online JPG, PNG, GIF to WebP & AVIF Converter | KRAY DIGITAL',
        description: 'Fast client-side image converter from JPG, PNG and GIF to WebP and AVIF with adjustable compression directly in your browser.',
      },
    },
  },
  {
    slug: 'photoeditor',
    meta: {
      uk: {
        title: 'Онлайн фоторедактор безкоштовно — Редактор фото та PSD у браузері | KRAY DIGITAL',
        description: 'Повноцінний онлайн-фоторедактор з шарами, фільтрами, масками та підтримкою PSD без встановлення програм.',
      },
      ru: {
        title: 'Онлайн фоторедактор бесплатно — Редактор фото и PSD в браузере | KRAY DIGITAL',
        description: 'Полноценный онлайн-фоторедактор со слоями, фильтрами, масками и поддержкой PSD прямо в браузере без установки программ.',
      },
      en: {
        title: 'Free Online Photo Editor — Edit Photos & PSD in Browser | KRAY DIGITAL',
        description: 'Full-featured online photo editor with layers, filters, masks, and PSD support right in your browser.',
      },
    },
  },
  {
    slug: 'password-generator',
    meta: {
      uk: {
        title: 'Генератор надійних паролів онлайн — Створити складний пароль безкоштовно | KRAY DIGITAL',
        description: 'Криптостійкий генератор паролів та фраз у браузері. Гнучкі налаштування довжини, символів та перевірка надійності.',
      },
      ru: {
        title: 'Генератор надёжных паролей онлайн — Создать сложный пароль бесплатно | KRAY DIGITAL',
        description: 'Криптостойкий генератор паролей и парольных фраз в браузере. Гибкая настройка длины, символов и оценка сложности.',
      },
      en: {
        title: 'Secure Password Generator Online — Create Strong Random Passwords | KRAY DIGITAL',
        description: 'Cryptographically secure password and passphrase generator in your browser with customizable length and strength meter.',
      },
    },
  },
  {
    slug: 'generator-gif',
    meta: {
      uk: {
        title: 'Генератор відео в GIF онлайн (до 30 сек) — MP4, WebM, MOV у GIF | KRAY DIGITAL',
        description: 'Безкоштовний конвертер відео MP4, WebM та MOV в анімований GIF прямо у браузері з налаштуванням FPS, обрізки та розміру.',
      },
      ru: {
        title: 'Генератор видео в GIF онлайн (до 30 сек) — MP4, WebM, MOV в GIF | KRAY DIGITAL',
        description: 'Бесплатный конвертер видео MP4, WebM и MOV в анимированный GIF прямо в браузере с настройкой FPS, обрезки и размера.',
      },
      en: {
        title: 'Video to GIF Generator Online (Max 30s) — Convert MP4, WebM, MOV to GIF | KRAY DIGITAL',
        description: 'Free browser-based MP4, WebM and MOV to animated GIF converter with FPS, trim, and resolution controls.',
      },
    },
  },
  {
    slug: 'pdf-to-jpg',
    meta: {
      uk: {
        title: 'Конвертер PDF у JPG та PNG онлайн безкоштовно — 100% у браузері | KRAY DIGITAL',
        description: 'Миттєве перетворення сторінок PDF у якісні зображення JPG та PNG з вибором DPI та завантаженням ZIP-архівом.',
      },
      ru: {
        title: 'Конвертер PDF в JPG и PNG онлайн бесплатно — Без загрузки на сервер | KRAY DIGITAL',
        description: 'Мгновенное преобразование страниц PDF в качественные изображения JPG и PNG с выбором DPI и выгрузкой ZIP-архивом.',
      },
      en: {
        title: 'Free PDF to JPG & PNG Converter Online — 100% Client-Side | KRAY DIGITAL',
        description: 'Convert PDF pages to high-quality JPG and PNG images locally in your browser with DPI control and ZIP export.',
      },
    },
  },
  {
    slug: 'qr-generator',
    meta: {
      uk: {
        title: 'Генератор QR-кодів онлайн безкоштовно — PNG та SVG без реєстрації | KRAY DIGITAL',
        description: 'Створюйте статичні QR-коди для сайтів, Wi-Fi, Telegram та тексту у форматах PNG і векторному SVG.',
      },
      ru: {
        title: 'Генератор QR-кодов онлайн бесплатно — PNG и SVG без регистрации | KRAY DIGITAL',
        description: 'Создавайте статические QR-коды для сайтов, Wi-Fi, Telegram и текста в форматах PNG и векторном SVG.',
      },
      en: {
        title: 'Free Online QR Code Generator — PNG & Vector SVG | KRAY DIGITAL',
        description: 'Generate static QR codes for URLs, Wi-Fi, Telegram, and text in crisp PNG and vector SVG formats.',
      },
    },
  },
  {
    slug: 'favicon-generator',
    meta: {
      uk: {
        title: 'Генератор Favicon онлайн безкоштовно — ICO, PNG, Apple Touch Icon | KRAY DIGITAL',
        description: 'Повний комплект іконок для сайту (favicon.ico, 16x16, 32x32, Apple Touch Icon 180px, Android Chrome, site.webmanifest) у ZIP.',
      },
      ru: {
        title: 'Генератор Favicon онлайн бесплатно — ICO, PNG, Apple Touch Icon | KRAY DIGITAL',
        description: 'Полный комплект иконок для сайта (favicon.ico, 16x16, 32x32, Apple Touch Icon 180px, Android Chrome, site.webmanifest) в ZIP.',
      },
      en: {
        title: 'Free Favicon Generator Online — ICO, PNG, Apple Touch Icon | KRAY DIGITAL',
        description: 'Generate a complete website favicon package (favicon.ico, PNGs, Apple Touch Icon, Android Chrome, site.webmanifest) as a ZIP.',
      },
    },
  },
];

for (const tool of TOOL_PAGES) {
  const srcPath = path.join(rootDir, 'public', tool.slug, 'index.html');
  if (!fs.existsSync(srcPath)) continue;
  const rawHtml = fs.readFileSync(srcPath, 'utf-8');

  const toolHreflangs = [
    `<link rel="alternate" hreflang="uk" href="https://kray-digital.pp.ua/${tool.slug}/" />`,
    `<link rel="alternate" hreflang="ru" href="https://kray-digital.pp.ua/ru/${tool.slug}/" />`,
    `<link rel="alternate" hreflang="en" href="https://kray-digital.pp.ua/en/${tool.slug}/" />`,
    `<link rel="alternate" hreflang="x-default" href="https://kray-digital.pp.ua/${tool.slug}/" />`,
  ].join('\n  ');

  const variants: { lang: Lang; outRel: string; canonicalUrl: string; rewriteAssets: boolean }[] = [
    {
      lang: 'uk',
      outRel: path.join(tool.slug, 'index.html'),
      canonicalUrl: `https://kray-digital.pp.ua/${tool.slug}/`,
      rewriteAssets: false,
    },
    {
      lang: 'ru',
      outRel: path.join('ru', tool.slug, 'index.html'),
      canonicalUrl: `https://kray-digital.pp.ua/ru/${tool.slug}/`,
      rewriteAssets: true,
    },
    {
      lang: 'en',
      outRel: path.join('en', tool.slug, 'index.html'),
      canonicalUrl: `https://kray-digital.pp.ua/en/${tool.slug}/`,
      rewriteAssets: true,
    },
  ];

  for (const v of variants) {
    const seo = tool.meta[v.lang];
    let outHtml = rawHtml
      .replace(/<html\b([^>]*)\blang=["'][^"']*["']/i, `<html$1lang="${v.lang}"`)
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`)
      .replace(
        /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="description" content="${seo.description}" />`,
      )
      .replace(
        /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:title" content="${seo.title}" />`,
      )
      .replace(
        /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:description" content="${seo.description}" />`,
      )
      .replace(
        /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:url" content="${v.canonicalUrl}" />`,
      );

    if (/<link\s+rel=["']canonical["']/i.test(outHtml)) {
      outHtml = outHtml.replace(
        /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
        `<link rel="canonical" href="${v.canonicalUrl}" />\n  ${toolHreflangs}`,
      );
    } else {
      outHtml = outHtml.replace(
        /<\/head>/i,
        `  <link rel="canonical" href="${v.canonicalUrl}" />\n  ${toolHreflangs}\n</head>`,
      );
    }

    if (v.rewriteAssets) {
      outHtml = outHtml
        .replace(/(href|src)=["']\.\//gi, `$1="/${tool.slug}/`);
    }

    const outPath = path.join(distDir, v.outRel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, outHtml, 'utf-8');
    console.log(`[prerender] Wrote ${v.outRel} (${v.lang})`);
  }
}
