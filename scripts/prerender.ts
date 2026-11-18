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

const langs: { lang: Lang; fileName: string }[] = [
  { lang: 'uk', fileName: 'index.html' },
  { lang: 'ru', fileName: 'index.ru.html' },
  { lang: 'en', fileName: 'index.en.html' },
];

for (const { lang, fileName } of langs) {
  const appHtml = renderToString(
    React.createElement(LanguageProvider, { initialLanguage: lang }, React.createElement(App)),
  );

  let html = template
    .replace(/<html\b([^>]*)\blang=["'][^"']*["']/i, `<html$1lang="${lang}" data-ssr-lang="${lang}"`)
    .replace(rootPlaceholder, () => `<div id="root">${appHtml}</div>`);

  const outPath = path.join(distDir, fileName);
  fs.writeFileSync(outPath, html, 'utf-8');
  console.log(`[prerender] Wrote ${fileName} (${lang}, ${html.length} bytes)`);
}
