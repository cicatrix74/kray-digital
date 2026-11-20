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

const langs: { lang: Lang; fileName: string; notFoundFileName: string }[] = [
  { lang: 'uk', fileName: 'index.html', notFoundFileName: '404.html' },
  { lang: 'ru', fileName: 'index.ru.html', notFoundFileName: '404.ru.html' },
  { lang: 'en', fileName: 'index.en.html', notFoundFileName: '404.en.html' },
];

const notFoundTitles: Record<Lang, string> = {
  uk: '404 — Сторінку не знайдено | Kray Digital',
  ru: '404 — Страница не найдена | Kray Digital',
  en: '404 — Page Not Found | Kray Digital',
};

for (const { lang, fileName, notFoundFileName } of langs) {
  const appHtml = renderToString(
    React.createElement(LanguageProvider, { initialLanguage: lang }, React.createElement(App)),
  );

  const html = template
    .replace(/<html\b([^>]*)\blang=["'][^"']*["']/i, `<html$1lang="${lang}" data-ssr-lang="${lang}"`)
    .replace(rootPlaceholder, () => `<div id="root">${appHtml}</div>`);

  const outPath = path.join(distDir, fileName);
  fs.writeFileSync(outPath, html, 'utf-8');
  console.log(`[prerender] Wrote ${fileName} (${lang}, ${html.length} bytes)`);

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
