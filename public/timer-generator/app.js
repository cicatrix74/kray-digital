const I18N = {
  uk: {
    pageTitle: 'Генератор таймерів зворотного відліку для сайту онлайн — HTML/CSS/JS | KRAY DIGITAL',
    i18nBadge: 'WEB TOOLS • ГЕНЕРАТОР ТАЙМЕРІВ',
    i18nTitle: 'Генератор таймерів для сайту онлайн',
    i18nSubtitle: 'Створіть адаптивний таймер зворотного відліку для акцій, розпродажів, запуску сайту або вебінару. Готовий автономний HTML + CSS + JS код без сторонніх бібліотек.',
    i18nSec1: '1. Час відліку',
    lblTimerMode: 'Тип таймера',
    optModeDate: '📅 До конкретної дати та часу',
    optModeEvergreen: '🔁 Заданий інтервал (Evergreen)',
    lblTargetDate: 'Дата та час завершення',
    lblEvHours: 'Годин',
    lblEvMinutes: 'Хвилин',
    lblEvPersist: "Запам'ятовувати старт для кожного відвідувача (localStorage)",
    lblEvLoop: 'Зациклити таймер (автоперезапуск після завершення)',
    lblHeading: 'Заголовок над таймером',
    lblExpired: 'Текст після завершення',
    lblCtaText: "Текст кнопки (необов'язково)",
    lblCtaUrl: 'Посилання кнопки',
    ctaPlaceholder: 'Встигнути зі знижкою',
    i18nSec2: '2. Стиль таймера',
    i18nSecDetails: '3. Тексти та кольори',
    lblThemePresets: 'Швидкі палітри кольорів',
    lblAccent: 'Акцент',
    lblBg: 'Фон блоку',
    lblTextColor: 'Текст',
    lblUnitLang: 'Мова підписів таймера',
    lblShowDays: 'Показувати дні',
    lblShowSeconds: 'Показувати секунди',
    i18nSec3: '3. Попередній перегляд',
    btnSimulateEnd: '⚡ Тест завершення',
    btnSimulateReset: '↩ Повернути відлік',
    i18nCodeTitle: 'Готовий HTML / CSS / JS код для вставки',
    embedScriptBtn: '🌐 Сайт / OBS (1 рядок)',
    embedGifBtn: '📧 Email / GIF (<img>)',
    i18nCopyBtn: 'Копіювати код',
    i18nCopied: 'Скопійовано!',
    i18nDownloadBtn: 'timer.html',
    i18nDownloadGifBtn: 'timer.gif',
    i18nFeat1Title: 'Жодних залежностей',
    i18nFeat1Desc: 'Чистий HTML, CSS та ванільний JavaScript без jQuery, React або зовнішніх скриптів — працює на будь-якому сайті, WordPress, Tilda чи Webflow.',
    i18nFeat2Title: 'Режим до дати та Evergreen',
    i18nFeat2Desc: 'Підходить як для фіксованих акцій і запусків, так і для індивідуального таймера кожному новому відвідувачу через localStorage.',
    i18nFeat3Title: '10 стилів, теми та адаптивність',
    i18nFeat3Desc: 'Перекидний Flip, кругові індикатори, мінімалізм, барабан або неонові картки — усе адаптивно на мобільних і десктопі.',
    i18nSeoTitle: 'Де використовувати таймер і як його встановити (Сайт, Email, OBS Studio)',
    i18nSeoIntro: 'Таймер зворотного відліку підвищує конверсію лендінгів, інтернет-магазинів та email-розсилок на 15–35%, створюючи зрозумілий дедлайн акції, безкоштовної доставки або старту вебінару.',
    i18nSeoCol1Title: '🌐 Вставка на сайт (WordPress, Tilda, Webflow)',
    i18nSeoCol1Desc: 'Оберіть формат «Сайт / OBS (1 рядок)», натисніть «Копіювати код» і вставте тег <script> у потрібний HTML-блок (у WordPress — «Довільний HTML», у Tilda — блок T123, у Webflow — Embed).',
    i18nSeoCol2Title: '📧 GIF-таймер для Email-розсилок',
    i18nSeoCol2Desc: 'Поштові сервіси (Gmail, Outlook, Apple Mail) блокують JavaScript. Перемкніть код на «Email / GIF (<img>)» та вставте тег <img> у лист — сервер автоматично генерує живий анімований GIF із точним залишком часу в момент відкриття листа.',
    i18nSeoCol3Title: '🎥 Додавання в OBS Studio та Streamlabs (для стрімів)',
    i18nSeoCol3Desc: 'Натисніть «timer.html», щоб зберегти файл на комп\'ютер. В OBS Studio або Streamlabs відкрийте «Джерела (+) → Браузер (Browser Source)», поставте галочку «Локальний файл» (Local file), виберіть збережений timer.html, задайте ширину 620 і висоту 240 px та увімкніть «Оновлювати браузер, коли сцена стає активною».',
    i18nSeoCol4Title: '🔁 Зациклений та Evergreen-таймер',
    i18nSeoCol4Desc: 'У режимі «Інтервал» таймер веде індивідуальний відлік для кожного відвідувача через localStorage, а опція «Зациклити таймер» автоматично перезапускає новий цикл після 00:00 — зручно для щоденних акцій і автовебінарів.',
    defaultHeading: 'До кінця акції залишилось:',
    defaultExpired: 'Акція завершилась!',
    radiusPrefix: 'Заокруглення: ',
  },
  ru: {
    pageTitle: 'Генератор таймеров обратного отсчёта для сайта онлайн — HTML/CSS/JS | KRAY DIGITAL',
    i18nBadge: 'WEB TOOLS • ГЕНЕРАТОР ТАЙМЕРОВ ДЛЯ САЙТА',
    i18nTitle: 'Генератор таймеров для сайта онлайн',
    i18nSubtitle: 'Создайте адаптивный таймер обратного отсчёта для акций, распродаж, запуска сайта или вебинара. Готовый автономный HTML + CSS + JS код без сторонних библиотек.',
    i18nSec1: '1. Время отсчёта',
    lblTimerMode: 'Тип таймера',
    optModeDate: '📅 До конкретной даты и времени',
    optModeEvergreen: '🔁 Заданный интервал (Evergreen)',
    lblTargetDate: 'Дата и время окончания',
    lblEvHours: 'Часов',
    lblEvMinutes: 'Минут',
    lblEvPersist: 'Запоминать старт для каждого посетителя (localStorage)',
    lblEvLoop: 'Зациклить таймер (автоперезапуск после окончания)',
    lblHeading: 'Заголовок над таймером',
    lblExpired: 'Текст после завершения',
    lblCtaText: 'Текст кнопки (необязательно)',
    lblCtaUrl: 'Ссылка кнопки',
    ctaPlaceholder: 'Успеть со скидкой',
    i18nSec2: '2. Стиль таймера',
    i18nSecDetails: '3. Тексты и цвета',
    lblThemePresets: 'Быстрые палитры цветов',
    lblAccent: 'Акцент',
    lblBg: 'Фон блока',
    lblTextColor: 'Текст',
    lblUnitLang: 'Язык подписей таймера',
    lblShowDays: 'Показывать дни',
    lblShowSeconds: 'Показывать секунды',
    i18nSec3: '3. Предпросмотр',
    btnSimulateEnd: '⚡ Тест окончания',
    btnSimulateReset: '↩ Вернуть отсчёт',
    i18nCodeTitle: 'Готовый HTML / CSS / JS код для вставки',
    embedScriptBtn: '🌐 Сайт / OBS (1 строка)',
    embedGifBtn: '📧 Email / GIF (<img>)',
    i18nCopyBtn: 'Копировать код',
    i18nCopied: 'Скопировано!',
    i18nDownloadBtn: 'timer.html',
    i18nDownloadGifBtn: 'timer.gif',
    i18nFeat1Title: 'Никаких зависимостей',
    i18nFeat1Desc: 'Чистый HTML, CSS и ванильный JavaScript без jQuery, React или внешних скриптов — работает на любом сайте, WordPress, Tilda или Webflow.',
    i18nFeat2Title: 'Режим до даты и Evergreen',
    i18nFeat2Desc: 'Подходит как для фиксированных акций и запусков, так и для индивидуального таймера каждому новому посетителю через localStorage.',
    i18nFeat3Title: '10 стилей, темы и адаптивность',
    i18nFeat3Desc: 'Перекидной Flip, круговые индикаторы, минимализм, барабан или неоновые карточки — отлично смотрится на мобильных и десктопе.',
    i18nSeoTitle: 'Где использовать таймер и как его установить (Сайт, Email, OBS Studio)',
    i18nSeoIntro: 'Таймер обратного отсчёта повышает конверсию лендингов, интернет-магазинов и email-рассылок на 15–35%, создавая понятный дедлайн акции, бесплатной доставки или старта вебинара.',
    i18nSeoCol1Title: '🌐 Вставка на сайт (WordPress, Tilda, Webflow)',
    i18nSeoCol1Desc: 'Выберите формат «Сайт / OBS (1 строка)», нажмите «Копировать код» и вставьте тег <script> в нужный HTML-блок (в WordPress — «Произвольный HTML», в Tilda — блок T123, в Webflow — Embed).',
    i18nSeoCol2Title: '📧 GIF-таймер для Email-рассылок',
    i18nSeoCol2Desc: 'Почтовые клиенты (Gmail, Outlook, Apple Mail) блокируют JavaScript. Переключите код на «Email / GIF (<img>)» и вставьте тег <img> в письмо — сервер автоматически сгенерирует живой анимированный GIF с точным остатком времени в момент открытия письма.',
    i18nSeoCol3Title: '🎥 Добавление в OBS Studio и Streamlabs (для стримов)',
    i18nSeoCol3Desc: 'Нажмите «timer.html», чтобы сохранить файл на компьютер. В OBS Studio или Streamlabs откройте «Источники (+) → Браузер (Browser Source)», поставьте галочку «Локальный файл» (Local file), выберите сохранённый timer.html, задайте ширину 620 и высоту 240 px и включите «Обновлять браузер при активации сцены».',
    i18nSeoCol4Title: '🔁 Зацикленный и Evergreen-таймер',
    i18nSeoCol4Desc: 'В режиме «Интервал» таймер ведёт индивидуальный отсчёт для каждого посетителя через localStorage, а опция «Зациклить таймер» автоматически перезапускает новый цикл после 00:00 — удобно для ежедневных акций и автовебинаров.',
    defaultHeading: 'До конца акции осталось:',
    defaultExpired: 'Акция завершилась!',
    radiusPrefix: 'Скругление: ',
  },
  en: {
    pageTitle: 'Website Countdown Timer Generator Online — HTML/CSS/JS | KRAY DIGITAL',
    i18nBadge: 'WEB TOOLS • COUNTDOWN TIMER GENERATOR',
    i18nTitle: 'Website Countdown Timer Generator',
    i18nSubtitle: 'Build a responsive countdown timer for sales, product launches, or webinars. Get clean, zero-dependency HTML + CSS + JS embed code in seconds.',
    i18nSec1: '1. Countdown Time',
    lblTimerMode: 'Timer type',
    optModeDate: '📅 Until specific date & time',
    optModeEvergreen: '🔁 Fixed interval (Evergreen)',
    lblTargetDate: 'End Date & Time',
    lblEvHours: 'Hours',
    lblEvMinutes: 'Minutes',
    lblEvPersist: 'Remember start time per visitor (localStorage)',
    lblEvLoop: 'Loop timer (auto-restart when finished)',
    lblHeading: 'Heading above timer',
    lblExpired: 'Expired message',
    lblCtaText: 'CTA button text (optional)',
    lblCtaUrl: 'CTA button URL',
    ctaPlaceholder: 'Grab the deal',
    i18nSec2: '2. Timer Style',
    i18nSecDetails: '3. Text & Colors',
    lblThemePresets: 'Quick color palettes',
    lblAccent: 'Accent',
    lblBg: 'Background',
    lblTextColor: 'Text',
    lblUnitLang: 'Timer unit labels',
    lblShowDays: 'Show days',
    lblShowSeconds: 'Show seconds',
    i18nSec3: '3. Live Preview',
    btnSimulateEnd: '⚡ Test Expired',
    btnSimulateReset: '↩ Resume Timer',
    i18nCodeTitle: 'Ready-to-Embed HTML / CSS / JS Code',
    embedScriptBtn: '🌐 Site / OBS (1 line)',
    embedGifBtn: '📧 Email / GIF (<img>)',
    i18nCopyBtn: 'Copy Code',
    i18nCopied: 'Copied!',
    i18nDownloadBtn: 'timer.html',
    i18nDownloadGifBtn: 'timer.gif',
    i18nFeat1Title: 'Zero Dependencies',
    i18nFeat1Desc: 'Pure HTML, CSS, and vanilla JavaScript with no jQuery or external libraries — works on WordPress, Webflow, Shopify, Tilda, or any custom site.',
    i18nFeat2Title: 'Fixed Date & Evergreen Modes',
    i18nFeat2Desc: 'Use a fixed deadline for launches and promos, or an evergreen countdown stored per visitor in localStorage.',
    i18nFeat3Title: '10 Styles & Responsive Layout',
    i18nFeat3Desc: 'Flip clock, circular progress rings, clean minimalist, drum slide, or neon cards — crisp on mobile and desktop.',
    i18nSeoTitle: 'Where to Use Your Timer (Website, Email GIF, OBS Studio / Streamlabs)',
    i18nSeoIntro: 'A clear countdown timer creates urgency for limited-time offers, email campaigns, and live streams, boosting conversion rates without hurting PageSpeed.',
    i18nSeoCol1Title: '🌐 Website Embed (WordPress, Webflow, Shopify)',
    i18nSeoCol1Desc: 'Keep "Site / OBS (1 line)" selected, click "Copy Code", and paste the <script> tag into a Custom HTML block in WordPress, Webflow Embed, Shopify Liquid, or your template.',
    i18nSeoCol2Title: '📧 Animated GIF Timer for Email Campaigns',
    i18nSeoCol2Desc: 'Email clients (Gmail, Outlook, Apple Mail) block JavaScript. Switch to "Email / GIF (<img>)" and paste the <img> tag into your newsletter — our server renders a live animated GIF with the exact remaining time when opened.',
    i18nSeoCol3Title: '🎥 OBS Studio & Streamlabs (Live Streams)',
    i18nSeoCol3Desc: 'Click "timer.html" to save the file locally. In OBS Studio or Streamlabs, add "Sources (+) → Browser", check "Local file", select timer.html, set width 620 and height 240, and enable "Refresh browser when scene becomes active".',
    i18nSeoCol4Title: '🔁 Looped & Evergreen Countdown',
    i18nSeoCol4Desc: 'Evergreen mode tracks a personal timer per visitor in localStorage, and enabling "Loop timer" automatically restarts the countdown after reaching 00:00.',
    defaultHeading: 'Offer ends in:',
    defaultExpired: 'Offer has ended!',
    radiusPrefix: 'Border radius: ',
  },
};

const UNIT_LABELS = {
  uk: { days: 'днів', hours: 'годин', minutes: 'хвилин', seconds: 'секунд' },
  ru: { days: 'дней', hours: 'часов', minutes: 'минут', seconds: 'секунд' },
  en: { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' },
};

const THEME_PRESETS = {
  neon: { accent: '#00f0ff', bg: '#0f131e', text: '#ffffff' },
  minimal: { accent: '#38bdf8', bg: '#171b27', text: '#f1f5f9' },
  sale: { accent: '#fb7185', bg: '#270b14', text: '#fff1f2' },
  light: { accent: '#0284c7', bg: '#ffffff', text: '#0f172a' },
};

const TIMER_STYLES = [
  {
    id: 'minimal-clean',
    labels: { uk: 'Чистий мінімалізм', ru: 'Чистый минимализм', en: 'Clean Minimal' },
    defaults: { accent: '#111827', bg: '#ffffff', text: '#111827', radius: 12 },
    thumb: `<div style="width:100%;height:100%;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;gap:6px;font-family:Inter,sans-serif;">
      <div style="text-align:center;"><div style="font-size:18px;font-weight:400;line-height:1;">363</div><div style="font-size:7px;color:#6b7280;">дней</div></div>
      <span style="font-size:16px;color:#374151;margin-top:-8px;">:</span>
      <div style="text-align:center;"><div style="font-size:18px;font-weight:400;line-height:1;">1</div><div style="font-size:7px;color:#6b7280;">часов</div></div>
      <span style="font-size:16px;color:#374151;margin-top:-8px;">:</span>
      <div style="text-align:center;"><div style="font-size:18px;font-weight:400;line-height:1;">37</div><div style="font-size:7px;color:#6b7280;">минут</div></div>
    </div>`,
  },
  {
    id: 'flip-light',
    labels: { uk: 'Світлий Flip-таймер', ru: 'Светлый Flip-таймер', en: 'Flip Clock Light' },
    defaults: { accent: '#111827', bg: '#ffffff', text: '#111827', radius: 12 },
    thumb: `<div style="width:100%;height:100%;background:#f8fafc;display:flex;align-items:center;justify-content:center;gap:5px;font-family:Inter,sans-serif;">
      ${['01', '37', '58'].map((n) => `<div style="display:flex;gap:1px;">${n.split('').map((d) => `<span style="background:linear-gradient(180deg,#f1f5f9 49%,#e2e8f0 50%,#f8fafc 100%);color:#0f172a;font-size:14px;font-weight:700;padding:4px 5px;border-radius:3px;border:1px solid #cbd5e1;">${d}</span>`).join('')}</div>`).join('')}
    </div>`,
  },
  {
    id: 'flip-dark',
    labels: { uk: 'Темний Flip-таймер', ru: 'Тёмный Flip-таймер', en: 'Flip Clock Dark' },
    defaults: { accent: '#f8fafc', bg: '#ffffff', text: '#111827', radius: 12 },
    thumb: `<div style="width:100%;height:100%;background:#f8fafc;display:flex;align-items:center;justify-content:center;gap:5px;font-family:Inter,sans-serif;">
      ${['01', '37', '58'].map((n) => `<div style="display:flex;gap:1px;">${n.split('').map((d) => `<span style="background:linear-gradient(180deg,#374151 49%,#111827 50%,#1f2937 100%);color:#f9fafb;font-size:14px;font-weight:700;padding:4px 5px;border-radius:3px;box-shadow:0 2px 4px rgba(0,0,0,0.3);">${d}</span>`).join('')}</div>`).join('')}
    </div>`,
  },
  {
    id: 'drum-light',
    labels: { uk: 'Барабан / Слайд', ru: 'Барабан / Слайд', en: 'Slide Drum' },
    defaults: { accent: '#6b7280', bg: '#ffffff', text: '#4b5563', radius: 12 },
    thumb: `<div style="width:100%;height:100%;background:#ffffff;color:#6b7280;display:flex;align-items:center;justify-content:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:15px;">
      <span>01</span><span>:</span><span>37</span><span>:</span><span>5</span><span style="display:flex;flex-direction:column;font-size:9px;line-height:1;opacity:.65;"><span>7</span><span style="font-size:13px;opacity:1;color:#111827;font-weight:700;">8</span><span>9</span></span>
    </div>`,
  },
  {
    id: 'ring-light-orange',
    labels: { uk: 'Кільця градієнт (світл.)', ru: 'Кольца градиент (светл.)', en: 'Gradient Rings (Light)' },
    defaults: { accent: '#f97316', bg: '#ffffff', text: '#111827', radius: 14 },
    thumb: `<div style="width:100%;height:100%;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;">
      ${[
        { v: '1', o: '25' },
        { v: '37', o: '52' },
        { v: '57', o: '80' },
      ].map((r, i) => `<svg width="34" height="34" viewBox="0 0 40 40"><defs><linearGradient id="tg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#ef4444"/></linearGradient></defs><circle cx="20" cy="20" r="16" fill="none" stroke="url(#tg${i})" stroke-width="2.5" stroke-dasharray="100" stroke-dashoffset="${r.o}" stroke-linecap="round" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#111827">${r.v}</text></svg>`).join('')}
    </div>`,
  },
  {
    id: 'ring-light-thick',
    labels: { uk: 'Товсті кільця (світл.)', ru: 'Толстые кольца (светл.)', en: 'Thick Rings (Light)' },
    defaults: { accent: '#06b6d4', bg: '#ffffff', text: '#111827', radius: 14 },
    thumb: `<div style="width:100%;height:100%;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;">
      ${['1', '24', '11'].map((v, i) => `<svg width="36" height="36" viewBox="0 0 40 40"><defs><linearGradient id="ttg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="50%" stop-color="#ef4444"/><stop offset="100%" stop-color="#9ca3af"/></linearGradient></defs><circle cx="20" cy="20" r="15" fill="none" stroke="#e5e7eb" stroke-width="4.5"/><circle cx="20" cy="20" r="15" fill="none" stroke="url(#ttg${i})" stroke-width="4.5" stroke-dasharray="94" stroke-dashoffset="${22 + i * 16}" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle" font-size="10" font-weight="600" font-family="Inter,sans-serif" fill="#111827">${v}</text></svg>`).join('')}
    </div>`,
  },
  {
    id: 'ring-dark-white',
    labels: { uk: 'Білі кільця (темн.)', ru: 'Белые кольца (тёмн.)', en: 'White Rings (Dark)' },
    defaults: { accent: '#ffffff', bg: '#2b303a', text: '#ffffff', radius: 12 },
    thumb: `<div style="width:100%;height:100%;background:#2b303a;display:flex;align-items:center;justify-content:center;gap:7px;">
      ${['22', '10', '48'].map((v, i) => `<svg width="34" height="34" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/><circle cx="20" cy="20" r="16" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="${20 + i * 20}" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle" font-size="10" font-family="Inter,sans-serif" fill="#ffffff">${v}</text></svg>`).join('')}
    </div>`,
  },
  {
    id: 'ring-dark-gold',
    labels: { uk: 'Золоті кільця (темн.)', ru: 'Золотые кольца (тёмн.)', en: 'Amber Rings (Dark)' },
    defaults: { accent: '#f59e0b', bg: '#2b303a', text: '#ffffff', radius: 12 },
    thumb: `<div style="width:100%;height:100%;background:#2b303a;display:flex;align-items:center;justify-content:center;gap:7px;">
      ${['22', '10', '44'].map((v, i) => `<svg width="34" height="34" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="3"/><circle cx="20" cy="20" r="16" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="${22 + i * 18}" stroke-linecap="round" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle" font-size="10" font-weight="600" font-family="Inter,sans-serif" fill="#ffffff">${v}</text></svg>`).join('')}
    </div>`,
  },
  {
    id: 'ring-dark-pink',
    labels: { uk: 'Рожеві кільця (темн.)', ru: 'Розовые кольца (тёмн.)', en: 'Pink Rings (Dark)' },
    defaults: { accent: '#f43f5e', bg: '#2b303a', text: '#ffffff', radius: 12 },
    thumb: `<div style="width:100%;height:100%;background:#2b303a;display:flex;align-items:center;justify-content:center;gap:7px;">
      ${['22', '10', '41'].map((v, i) => `<svg width="34" height="34" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="rgba(244,63,94,0.22)" stroke-width="3.5"/><circle cx="20" cy="20" r="16" fill="none" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="100" stroke-dashoffset="${18 + i * 22}" stroke-linecap="round" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle" font-size="10" font-weight="600" font-family="Inter,sans-serif" fill="#ffffff">${v}</text></svg>`).join('')}
    </div>`,
  },
  {
    id: 'cards',
    labels: { uk: 'Неонові картки', ru: 'Неоновые карточки', en: 'Neon Cards' },
    defaults: { accent: '#00f0ff', bg: '#0f131e', text: '#ffffff', radius: 16 },
    thumb: `<div style="width:100%;height:100%;background:#0f131e;display:flex;align-items:center;justify-content:center;gap:5px;font-family:'JetBrains Mono',monospace;">
      ${['02', '23', '59'].map((v) => `<div style="background:rgba(255,255,255,0.07);border:1px solid rgba(0,240,255,0.35);border-radius:6px;padding:4px 7px;color:#00f0ff;font-size:13px;font-weight:700;">${v}</div>`).join('')}
    </div>`,
  },
];

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

const elTargetDate = document.getElementById('targetDatetime');
const elEvHours = document.getElementById('evHours');
const elEvMinutes = document.getElementById('evMinutes');
const elEvPersist = document.getElementById('evPersist');
const elHeading = document.getElementById('timerHeading');
const elExpired = document.getElementById('expiredText');
const elCtaText = document.getElementById('ctaText');
const elCtaUrl = document.getElementById('ctaUrl');
const elAccent = document.getElementById('accentColor');
const elBg = document.getElementById('bgColor');
const elTextColor = document.getElementById('textColor');
const elAccentHex = document.getElementById('accentHex');
const elBgHex = document.getElementById('bgHex');
const elTextHex = document.getElementById('textHex');
const elRadius = document.getElementById('timerRadius');
const elLblRadius = document.getElementById('lblRadius');
const elTimerLang = document.getElementById('timerLang');
const elShowDays = document.getElementById('showDays');
const elShowSeconds = document.getElementById('showSeconds');
const elEvLoop = document.getElementById('evLoop');
const elStyleGrid = document.getElementById('styleGrid');
const elStage = document.getElementById('timerStage');
const elEmbedCode = document.getElementById('embedCode');
const elCodeSize = document.getElementById('codeSizeLabel');
const elBtnSimulate = document.getElementById('btnSimulateEnd');
const elBtnCopy = document.getElementById('btnCopyCode');
const elBtnDownload = document.getElementById('btnDownloadHtml');
const elBtnDownloadGif = document.getElementById('btnDownloadGif');

elHeading.value = T.defaultHeading;
elExpired.value = T.defaultExpired;
elCtaText.placeholder = T.ctaPlaceholder;
elTimerLang.value = lang;

const defDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
const pad = (n) => String(n).padStart(2, '0');
elTargetDate.value = `${defDate.getFullYear()}-${pad(defDate.getMonth() + 1)}-${pad(defDate.getDate())}T${pad(defDate.getHours())}:${pad(defDate.getMinutes())}`;

let mode = 'date';
let embedFormat = 'script';
let timerStyle = 'flip-dark';
let simulateExpired = false;
let evergreenStartMs = Date.now();
let prevRenderState = '';

// Apply initial style defaults
const initStyleObj = TIMER_STYLES.find((s) => s.id === timerStyle) || TIMER_STYLES[0];
elAccent.value = initStyleObj.defaults.accent;
elBg.value = initStyleObj.defaults.bg;
elTextColor.value = initStyleObj.defaults.text;
elRadius.value = String(initStyleObj.defaults.radius);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isLightBg(hex) {
  const clean = (hex || '#000000').replace('#', '');
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 145;
}

function renderStyleGrid() {
  elStyleGrid.innerHTML = TIMER_STYLES.map((s) => {
    const label = s.labels[lang] || s.labels.uk;
    return `<button type="button" class="style-card ${s.id === timerStyle ? 'active' : ''}" data-style="${s.id}" role="radio" aria-checked="${s.id === timerStyle}">
      <div class="style-thumb">${s.thumb}</div>
      <span class="style-name">${label}</span>
    </button>`;
  }).join('');

  elStyleGrid.querySelectorAll('[data-style]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-style');
      const found = TIMER_STYLES.find((s) => s.id === id);
      if (!found) return;
      timerStyle = found.id;
      elAccent.value = found.defaults.accent;
      elBg.value = found.defaults.bg;
      elTextColor.value = found.defaults.text;
      elRadius.value = String(found.defaults.radius);
      renderStyleGrid();
      updateAll();
    });
  });
}

function getConfig() {
  return {
    mode,
    style: timerStyle,
    targetIso: elTargetDate.value ? new Date(elTargetDate.value).toISOString() : new Date(Date.now() + 86400000).toISOString(),
    evHours: Math.max(0, parseInt(elEvHours.value || '0', 10) || 0),
    evMinutes: Math.max(0, parseInt(elEvMinutes.value || '0', 10) || 0),
    evPersist: elEvPersist.checked,
    evLoop: elEvLoop.checked,
    heading: elHeading.value.trim(),
    expiredText: elExpired.value.trim() || T.defaultExpired,
    ctaText: elCtaText.value.trim(),
    ctaUrl: elCtaUrl.value.trim() || '#',
    accent: elAccent.value,
    bg: elBg.value,
    textColor: elTextColor.value,
    radius: parseInt(elRadius.value, 10) || 0,
    unitLang: elTimerLang.value,
    showDays: elShowDays.checked,
    showSeconds: elShowSeconds.checked,
  };
}

function getRemainingMs(cfg) {
  if (simulateExpired) return 0;
  if (cfg.mode === 'date') {
    return Math.max(0, new Date(cfg.targetIso).getTime() - Date.now());
  }
  const durMs = (cfg.evHours * 60 + cfg.evMinutes) * 60 * 1000;
  if (durMs <= 0) return 0;
  let rem = evergreenStartMs + durMs - Date.now();
  if (rem <= 0 && cfg.evLoop) {
    evergreenStartMs = Date.now();
    rem = durMs;
  }
  return Math.max(0, rem);
}

function getStyleCss(uid, cfg) {
  const light = isLightBg(cfg.bg);
  const borderCol = light ? 'rgba(15,23,42,0.12)' : `${cfg.accent}44`;
  const boxBg = light ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.06)';
  const ctaFg = isLightBg(cfg.accent) ? '#0f172a' : '#ffffff';

  return `#${uid}{max-width:560px;margin:0 auto;background:${cfg.bg};color:${cfg.textColor};border:1px solid ${borderCol};border-radius:${cfg.radius}px;padding:24px 18px;text-align:center;font-family:Inter,system-ui,-apple-system,sans-serif;box-sizing:border-box;box-shadow:0 12px 30px rgba(0,0,0,${light ? '0.08' : '0.32'});}
#${uid} *{box-sizing:border-box;}
#${uid} .kt-head{font-size:14px;font-weight:600;margin-bottom:16px;opacity:0.85;}
#${uid} .kt-exp{display:none;font-size:20px;font-weight:800;color:${cfg.accent};padding:12px 0;}
#${uid} .kt-cta{display:inline-block;margin-top:18px;padding:10px 22px;border-radius:${Math.max(6, cfg.radius - 4)}px;background:${cfg.accent};color:${ctaFg};font-size:13px;font-weight:700;text-decoration:none;}
#${uid} .kt-row{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}
#${uid} .kt-card{background:${boxBg};border:1px solid ${cfg.accent}33;border-radius:${Math.max(6, cfg.radius - 4)}px;padding:12px 10px;min-width:74px;flex:1 1 0;}
#${uid} .kt-card-val{font-family:'JetBrains Mono',monospace;font-size:30px;font-weight:800;line-height:1.1;color:${cfg.accent};font-variant-numeric:tabular-nums;}
#${uid} .kt-lbl{font-size:11px;margin-top:5px;opacity:0.75;text-transform:lowercase;letter-spacing:0.03em;}
#${uid} .kt-min-item{display:flex;flex-direction:column;align-items:center;}
#${uid} .kt-min-val{font-size:clamp(30px,5vw,44px);font-weight:300;line-height:1;color:${cfg.textColor};font-variant-numeric:tabular-nums;}
#${uid} .kt-sep{font-size:clamp(24px,4vw,36px);font-weight:300;line-height:1;opacity:0.6;margin-top:-14px;}
#${uid} .kt-flip-unit{display:flex;flex-direction:column;align-items:center;gap:6px;}
#${uid} .kt-flip-pair{display:flex;gap:4px;}
#${uid} .kt-flip{position:relative;width:34px;height:48px;border-radius:6px;perspective:220px;font-family:Inter,system-ui,sans-serif;font-size:28px;font-weight:700;text-align:center;user-select:none;}
#${uid} .kt-flip .kt-top,#${uid} .kt-flip .kt-bot,#${uid} .kt-flip .kt-flap-t,#${uid} .kt-flip .kt-flap-b{position:absolute;left:0;width:100%;height:50%;overflow:hidden;backface-visibility:hidden;}
#${uid} .kt-flip .kt-top,#${uid} .kt-flip .kt-flap-t{top:0;border-radius:6px 6px 0 0;}
#${uid} .kt-flip .kt-bot,#${uid} .kt-flip .kt-flap-b{bottom:0;border-radius:0 0 6px 6px;}
#${uid} .kt-flip .kt-top>span,#${uid} .kt-flip .kt-flap-t>span{display:block;height:48px;line-height:48px;}
#${uid} .kt-flip .kt-bot>span,#${uid} .kt-flip .kt-flap-b>span{display:block;height:48px;line-height:48px;transform:translateY(-24px);}
#${uid} .kt-flip-light{box-shadow:0 3px 8px rgba(15,23,42,0.14);}
#${uid} .kt-flip-light .kt-top,#${uid} .kt-flip-light .kt-flap-t{background:linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%);color:#0f172a;border:1px solid #cbd5e1;border-bottom:1px solid rgba(15,23,42,0.18);}
#${uid} .kt-flip-light .kt-bot,#${uid} .kt-flip-light .kt-flap-b{background:linear-gradient(180deg,#f1f5f9 0%,#ffffff 100%);color:#0f172a;border:1px solid #cbd5e1;border-top:none;}
#${uid} .kt-flip-dark{box-shadow:0 4px 10px rgba(0,0,0,0.38);}
#${uid} .kt-flip-dark .kt-top,#${uid} .kt-flip-dark .kt-flap-t{background:linear-gradient(180deg,#374151 0%,#1f2937 100%);color:#f9fafb;border:1px solid #111827;border-bottom:1px solid rgba(0,0,0,0.55);}
#${uid} .kt-flip-dark .kt-bot,#${uid} .kt-flip-dark .kt-flap-b{background:linear-gradient(180deg,#1f2937 0%,#111827 100%);color:#f9fafb;border:1px solid #111827;border-top:none;}
#${uid} .kt-flip .kt-flap-t{z-index:3;transform-origin:50% 100%;animation:ktFlipT_${uid} 0.24s ease-in forwards;}
#${uid} .kt-flip .kt-flap-b{z-index:4;transform-origin:50% 0%;transform:rotateX(90deg);animation:ktFlipB_${uid} 0.24s 0.22s ease-out forwards;}
@keyframes ktFlipT_${uid}{0%{transform:rotateX(0deg);filter:brightness(1);}100%{transform:rotateX(-90deg);filter:brightness(0.75);}}
@keyframes ktFlipB_${uid}{0%{transform:rotateX(90deg);filter:brightness(0.8);}100%{transform:rotateX(0deg);filter:brightness(1);}}
#${uid} .kt-drum-val{font-family:'JetBrains Mono',monospace;font-size:clamp(28px,4.5vw,38px);font-weight:400;line-height:1.1;color:${cfg.textColor};display:inline-block;font-variant-numeric:tabular-nums;}
#${uid} .kt-drum-val.kt-pop{animation:ktSlide_${uid} 0.3s ease;}
@keyframes ktSlide_${uid}{0%{transform:translateY(-12px);opacity:0.25;}100%{transform:translateY(0);opacity:1;}}
#${uid} .kt-ring-wrap{position:relative;width:82px;height:82px;display:flex;align-items:center;justify-content:center;}
#${uid} .kt-ring-svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg);}
#${uid} .kt-ring-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;line-height:1.1;}
#${uid} .kt-ring-num{font-size:20px;font-weight:700;color:${cfg.textColor};font-variant-numeric:tabular-nums;}
#${uid} .kt-ring-sub{font-size:9px;opacity:0.7;margin-top:2px;text-transform:lowercase;}`;
}

function buildTimerMarkup(uid, cfg, units) {
  const light = isLightBg(cfg.bg);
  const items = [];
  if (cfg.showDays) items.push({ key: 'd', label: units.days, max: 30 });
  items.push({ key: 'h', label: units.hours, max: cfg.showDays ? 24 : 99 });
  items.push({ key: 'm', label: units.minutes, max: 60 });
  if (cfg.showSeconds) items.push({ key: 's', label: units.seconds, max: 60 });

  let bodyHtml = '';
  if (cfg.style === 'cards') {
    bodyHtml = items.map((it) => `<div class="kt-card"><div class="kt-card-val" data-u="${it.key}">00</div><div class="kt-lbl">${it.label}</div></div>`).join('');
  } else if (cfg.style === 'minimal-clean') {
    bodyHtml = items.map((it, idx) => `${idx > 0 ? '<div class="kt-sep">:</div>' : ''}<div class="kt-min-item"><div class="kt-min-val" data-u="${it.key}">0</div><div class="kt-lbl">${it.label}</div></div>`).join('');
  } else if (cfg.style === 'drum-light') {
    bodyHtml = items.map((it, idx) => `${idx > 0 ? '<div class="kt-sep">:</div>' : ''}<div class="kt-min-item"><div class="kt-drum-val" data-u="${it.key}">00</div><div class="kt-lbl">${it.label}</div></div>`).join('');
  } else if (cfg.style === 'flip-light' || cfg.style === 'flip-dark') {
    const cls = cfg.style === 'flip-light' ? 'kt-flip kt-flip-light' : 'kt-flip kt-flip-dark';
    const cardHtml = `<div class="${cls}" data-val="0"><div class="kt-top"><span>0</span></div><div class="kt-bot"><span>0</span></div></div>`;
    bodyHtml = items.map((it) => `<div class="kt-flip-unit"><div class="kt-flip-pair" data-u="${it.key}">${cardHtml}${cardHtml}</div><div class="kt-lbl">${it.label}</div></div>`).join('');
  } else if (cfg.style.startsWith('ring-')) {
    const isThick = cfg.style === 'ring-light-thick';
    const isGradOrange = cfg.style === 'ring-light-orange';
    const sw = isThick ? 8 : isGradOrange ? 4.5 : 4;
    const trackColor = light ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.14)';
    const gradDef = isGradOrange
      ? `<defs><linearGradient id="${uid}_g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#ef4444"/></linearGradient></defs>`
      : isThick
        ? `<defs><linearGradient id="${uid}_g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="55%" stop-color="#ef4444"/><stop offset="100%" stop-color="#9ca3af"/></linearGradient></defs>`
        : '';
    const strokeVal = isGradOrange || isThick ? `url(#${uid}_g)` : cfg.accent;

    bodyHtml = items.map((it) => `<div class="kt-ring-wrap">
      <svg class="kt-ring-svg" viewBox="0 0 100 100">
        ${gradDef}
        ${isGradOrange ? '' : `<circle cx="50" cy="50" r="42" fill="none" stroke="${trackColor}" stroke-width="${sw}"/>`}
        <circle data-ring="${it.key}" data-max="${it.max}" cx="50" cy="50" r="42" fill="none" stroke="${strokeVal}" stroke-width="${sw}" stroke-dasharray="263.89" stroke-dashoffset="0" stroke-linecap="${isThick ? 'butt' : 'round'}"/>
      </svg>
      <div class="kt-ring-inner">
        <span class="kt-ring-num" data-u="${it.key}">00</span>
        <span class="kt-ring-sub">${it.label}</span>
      </div>
    </div>`).join('');
  }

  return `<div id="${uid}">
  ${cfg.heading ? `<div class="kt-head">${escapeHtml(cfg.heading)}</div>` : ''}
  <div class="kt-row">${bodyHtml}</div>
  <div class="kt-exp">${escapeHtml(cfg.expiredText)}</div>
  ${cfg.ctaText ? `<a href="${escapeHtml(cfg.ctaUrl)}" class="kt-cta">${escapeHtml(cfg.ctaText)}</a>` : ''}
</div>`;
}

function applyValuesToDom(root, cfg, ms, animateChanges) {
  const row = root.querySelector('.kt-row');
  const head = root.querySelector('.kt-head');
  const exp = root.querySelector('.kt-exp');
  if (ms <= 0) {
    if (row) row.style.display = 'none';
    if (head) head.style.display = 'none';
    if (exp) exp.style.display = 'block';
    return;
  }
  if (row) row.style.display = 'flex';
  if (head) head.style.display = 'block';
  if (exp) exp.style.display = 'none';

  const totalSec = Math.floor(ms / 1000);
  const vals = {
    d: Math.floor(totalSec / 86400),
    h: cfg.showDays ? Math.floor((totalSec % 86400) / 3600) : Math.floor(totalSec / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };

  const usePad = cfg.style !== 'minimal-clean' && !cfg.style.startsWith('ring-');
  const fmt = (k, v) => (k === 'd' && !usePad ? String(v) : usePad ? pad(v) : String(v));

  for (const key of ['d', 'h', 'm', 's']) {
    const el = root.querySelector(`[data-u="${key}"]`);
    if (!el) continue;
    const textVal = fmt(key, vals[key]);

    if (cfg.style === 'flip-light' || cfg.style === 'flip-dark') {
      const digits = textVal.split('');
      const cls = cfg.style === 'flip-light' ? 'kt-flip kt-flip-light' : 'kt-flip kt-flip-dark';
      if (el.children.length !== digits.length) {
        el.innerHTML = digits.map((d) => `<div class="${cls}" data-val="${d}"><div class="kt-top"><span>${d}</span></div><div class="kt-bot"><span>${d}</span></div></div>`).join('');
      } else {
        digits.forEach((d, idx) => {
          const card = el.children[idx];
          if (!card) return;
          const oldVal = card.dataset.val ?? '0';
          if (oldVal === d) return;
          card.dataset.val = d;
          const topSpan = card.querySelector('.kt-top > span');
          const botSpan = card.querySelector('.kt-bot > span');
          if (!animateChanges) {
            if (topSpan) topSpan.textContent = d;
            if (botSpan) botSpan.textContent = d;
            return;
          }
          card.querySelectorAll('.kt-flap-t, .kt-flap-b').forEach((n) => n.remove());
          if (topSpan) topSpan.textContent = d;
          if (botSpan) botSpan.textContent = oldVal;
          const flapT = document.createElement('div');
          flapT.className = 'kt-flap-t';
          flapT.innerHTML = `<span>${oldVal}</span>`;
          const flapB = document.createElement('div');
          flapB.className = 'kt-flap-b';
          flapB.innerHTML = `<span>${d}</span>`;
          card.appendChild(flapT);
          card.appendChild(flapB);
          setTimeout(() => {
            if (botSpan) botSpan.textContent = d;
            flapT.remove();
            flapB.remove();
          }, 480);
        });
      }
    } else {
      if (el.textContent !== textVal) {
        el.textContent = textVal;
        if (animateChanges && cfg.style === 'drum-light') {
          el.classList.remove('kt-pop');
          void el.offsetWidth;
          el.classList.add('kt-pop');
        }
      }
    }

    const ring = root.querySelector(`[data-ring="${key}"]`);
    if (ring) {
      const maxVal = Math.max(1, Number(ring.getAttribute('data-max')) || 60);
      const frac = Math.min(1, Math.max(0, vals[key] / maxVal));
      ring.style.strokeDashoffset = (263.89 * (1 - frac)).toFixed(2);
    }
  }
}

function renderPreview() {
  const cfg = getConfig();
  const units = UNIT_LABELS[cfg.unitLang] || UNIT_LABELS.uk;
  const uid = 'kt-preview-root';
  const structureKey = JSON.stringify([
    cfg.style,
    cfg.heading,
    cfg.expiredText,
    cfg.ctaText,
    cfg.ctaUrl,
    cfg.accent,
    cfg.bg,
    cfg.textColor,
    cfg.radius,
    cfg.unitLang,
    cfg.showDays,
    cfg.showSeconds,
  ]);

  if (structureKey !== prevRenderState) {
    prevRenderState = structureKey;
    elStage.innerHTML = `<style>${getStyleCss(uid, cfg)}</style>${buildTimerMarkup(uid, cfg, units)}`;
    applyValuesToDom(elStage.querySelector(`#${uid}`), cfg, getRemainingMs(cfg), false);
  } else {
    const root = elStage.querySelector(`#${uid}`);
    if (root) applyValuesToDom(root, cfg, getRemainingMs(cfg), true);
  }
}

function encodeB64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function getConfigToken() {
  const cfg = getConfig();
  const payload = {
    s: cfg.style,
    m: cfg.mode,
    t: cfg.targetIso,
    eh: cfg.evHours,
    em: cfg.evMinutes,
    ep: cfg.evPersist ? 1 : 0,
    el: cfg.evLoop ? 1 : 0,
    h: cfg.heading,
    e: cfg.expiredText,
    ct: cfg.ctaText,
    cu: cfg.ctaUrl === '#' ? '' : cfg.ctaUrl,
    a: cfg.accent,
    b: cfg.bg,
    tc: cfg.textColor,
    r: cfg.radius,
    ul: cfg.unitLang,
    sd: cfg.showDays ? 1 : 0,
    ss: cfg.showSeconds ? 1 : 0,
  };
  return encodeB64Url(JSON.stringify(payload));
}

function buildEmbedCode() {
  const token = getConfigToken();
  const origin = window.location.origin;
  const snippet =
    embedFormat === 'gif'
      ? `<img src="${origin}/api/timer.gif?c=${token}" alt="Countdown timer" style="max-width:100%;height:auto;display:block;margin:0 auto;" />`
      : `<script src="${origin}/timer.js?c=${token}"></script>`;

  elEmbedCode.value = snippet;
  elCodeSize.textContent = `${snippet.length} B • ${embedFormat === 'gif' ? 'GIF <img>' : '1 line'}`;
}

function updateAll() {
  elAccentHex.textContent = elAccent.value;
  elBgHex.textContent = elBg.value;
  elTextHex.textContent = elTextColor.value;
  if (elLblRadius) {
    elLblRadius.innerHTML = `${T.radiusPrefix}<span class="mono-val" id="radiusVal">${elRadius.value}px</span>`;
  }
  renderPreview();
  buildEmbedCode();
}

const elTimerMode = document.getElementById('timerMode');
if (elTimerMode) {
  elTimerMode.addEventListener('change', () => {
    mode = elTimerMode.value || 'date';
    document.getElementById('paneDate').hidden = mode !== 'date';
    document.getElementById('paneEvergreen').hidden = mode !== 'evergreen';
    evergreenStartMs = Date.now();
    updateAll();
  });
}

document.querySelectorAll('[data-theme]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-theme');
    const preset = THEME_PRESETS[key];
    if (!preset) return;
    document.querySelectorAll('[data-theme]').forEach((b) => b.classList.toggle('active', b === btn));
    elAccent.value = preset.accent;
    elBg.value = preset.bg;
    elTextColor.value = preset.text;
    updateAll();
  });
});

[elTargetDate, elEvHours, elEvMinutes, elEvPersist, elEvLoop, elHeading, elExpired, elCtaText, elCtaUrl, elAccent, elBg, elTextColor, elRadius, elTimerLang, elShowDays, elShowSeconds].forEach((el) => {
  el.addEventListener('input', () => {
    if (el === elEvHours || el === elEvMinutes) evergreenStartMs = Date.now();
    updateAll();
  });
  el.addEventListener('change', updateAll);
});

elBtnSimulate.addEventListener('click', () => {
  simulateExpired = !simulateExpired;
  elBtnSimulate.textContent = simulateExpired ? T.btnSimulateReset : T.btnSimulateEnd;
  renderPreview();
});

elBtnCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(elEmbedCode.value);
    const span = document.getElementById('i18nCopyBtn');
    if (span) {
      span.textContent = T.i18nCopied;
      setTimeout(() => { span.textContent = T.i18nCopyBtn; }, 1800);
    }
  } catch {
    elEmbedCode.select();
    document.execCommand('copy');
  }
});

document.querySelectorAll('[data-embed]').forEach((btn) => {
  btn.addEventListener('click', () => {
    embedFormat = btn.getAttribute('data-embed') || 'script';
    document.querySelectorAll('[data-embed]').forEach((b) => b.classList.toggle('active', b === btn));
    buildEmbedCode();
  });
});

elBtnDownload.addEventListener('click', () => {
  const scriptTag = `<script src="${window.location.origin}/timer.js?c=${getConfigToken()}"></script>`;
  const fullDoc = `<!DOCTYPE html>\n<html lang="${elTimerLang.value}">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Countdown Timer</title>\n</head>\n<body style="margin:0;padding:16px;background:transparent;display:flex;justify-content:center;align-items:center;min-height:100vh;">\n${scriptTag}\n</body>\n</html>`;
  const blob = new Blob([fullDoc], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'timer.html';
  a.click();
  URL.revokeObjectURL(a.href);
});

elBtnDownloadGif.addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = `${window.location.origin}/api/timer.gif?c=${getConfigToken()}&download=1`;
  a.download = 'timer.gif';
  a.click();
});

renderStyleGrid();
updateAll();
setInterval(renderPreview, 1000);
