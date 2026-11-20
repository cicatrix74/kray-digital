import React, { useEffect, useState } from 'react';
import { Home, ArrowLeft, Calculator, Compass, Zap, Radio } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

interface NotFoundPageProps {
  onOpenCalculator: () => void;
}

const COPY: Record<
  Language,
  {
    badge: string;
    title: string;
    subtitle: string;
    homeBtn: string;
    backBtn: string;
    calcBtn: string;
    quickTitle: string;
    links: { label: string; desc: string; href: string; accent: string }[];
  }
> = {
  ru: {
    badge: 'СИГНАЛ ПОТЕРЯН • МАРШРУТ НЕ НАЙДЕН',
    title: 'Страница улетела в цифровую орбиту',
    subtitle:
      'Похоже, эта ссылка устарела, была перемещена или в адресе закралась опечатка. Но вы в одном клике от нужного раздела.',
    homeBtn: 'На главную',
    backBtn: 'Назад',
    calcBtn: 'Рассчитать проект',
    quickTitle: 'Популярные разделы и инструменты',
    links: [
      {
        label: 'Карта тревог',
        desc: 'Мониторинг в реальном времени',
        href: '/karta-trevog/',
        accent: 'from-cyan-400 to-blue-500',
      },
      {
        label: 'Графики света',
        desc: 'Днепр и область • LIVE',
        href: '/grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti/',
        accent: 'from-emerald-400 to-cyan-400',
      },
      {
        label: 'Конвертер WebP',
        desc: 'Сжатие JPG, PNG, GIF и AVIF',
        href: '/konvertor-webp/',
        accent: 'from-fuchsia-500 to-purple-500',
      },
      {
        label: 'QR-генератор',
        desc: 'PNG и векторный SVG',
        href: '/qr-generator/',
        accent: 'from-amber-400 to-pink-500',
      },
    ],
  },
  uk: {
    badge: 'СИГНАЛ ВТРАЧЕНО • МАРШРУТ НЕ ЗНАЙДЕНО',
    title: 'Сторінка полетіла на цифрову орбіту',
    subtitle:
      'Схоже, це посилання застаріло, було переміщено або в адресі є помилка. Але ви в одному кліку від потрібного розділу.',
    homeBtn: 'На головну',
    backBtn: 'Назад',
    calcBtn: 'Розрахувати проєкт',
    quickTitle: 'Популярні розділи та інструменти',
    links: [
      {
        label: 'Мапа тривог',
        desc: 'Моніторинг у реальному часі',
        href: '/karta-trevog/',
        accent: 'from-cyan-400 to-blue-500',
      },
      {
        label: 'Графіки світла',
        desc: 'Дніпро та область • LIVE',
        href: '/grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti/',
        accent: 'from-emerald-400 to-cyan-400',
      },
      {
        label: 'Конвертер WebP',
        desc: 'Стиснення JPG, PNG, GIF і AVIF',
        href: '/konvertor-webp/',
        accent: 'from-fuchsia-500 to-purple-500',
      },
      {
        label: 'QR-генератор',
        desc: 'PNG та векторний SVG',
        href: '/qr-generator/',
        accent: 'from-amber-400 to-pink-500',
      },
    ],
  },
  en: {
    badge: 'SIGNAL LOST • ROUTE NOT FOUND',
    title: 'This page drifted into digital orbit',
    subtitle:
      'The link may be outdated, moved, or mistyped. You are just one click away from getting back on track.',
    homeBtn: 'Back to Home',
    backBtn: 'Go Back',
    calcBtn: 'Estimate Project',
    quickTitle: 'Popular Sections & Tools',
    links: [
      {
        label: 'Air Alert Map',
        desc: 'Real-time live monitoring',
        href: '/karta-trevog/',
        accent: 'from-cyan-400 to-blue-500',
      },
      {
        label: 'Power Outages',
        desc: 'Dnipro & region • LIVE',
        href: '/grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti/',
        accent: 'from-emerald-400 to-cyan-400',
      },
      {
        label: 'WebP Converter',
        desc: 'Compress JPG, PNG, GIF & AVIF',
        href: '/konvertor-webp/',
        accent: 'from-fuchsia-500 to-purple-500',
      },
      {
        label: 'QR Generator',
        desc: 'Instant PNG & Vector SVG',
        href: '/qr-generator/',
        accent: 'from-amber-400 to-pink-500',
      },
    ],
  },
};

const PARTICLES = [
  { left: '12%', delay: '0s', duration: '4.1s', color: 'bg-cyan-400 shadow-[0_0_12px_#00f0ff]' },
  { left: '24%', delay: '1.2s', duration: '3.7s', color: 'bg-fuchsia-400 shadow-[0_0_12px_#e879f9]' },
  { left: '38%', delay: '0.5s', duration: '4.6s', color: 'bg-emerald-400 shadow-[0_0_12px_#34d399]' },
  { left: '52%', delay: '1.9s', duration: '3.9s', color: 'bg-sky-400 shadow-[0_0_12px_#38bdf8]' },
  { left: '66%', delay: '0.8s', duration: '4.4s', color: 'bg-pink-500 shadow-[0_0_12px_#ec4899]' },
  { left: '78%', delay: '2.3s', duration: '3.8s', color: 'bg-cyan-300 shadow-[0_0_12px_#67e8f9]' },
  { left: '89%', delay: '1.5s', duration: '4.3s', color: 'bg-violet-400 shadow-[0_0_12px_#a78bfa]' },
];

export default function NotFoundPage({ onOpenCalculator }: NotFoundPageProps) {
  const { language } = useLanguage();
  const t = COPY[language] ?? COPY.ru;
  const [attemptedPath, setAttemptedPath] = useState('/404');
  const [pulseBoost, setPulseBoost] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAttemptedPath(window.location.pathname || '/404');
    }
  }, []);

  const triggerBurst = () => {
    setPulseBoost(true);
    window.setTimeout(() => setPulseBoost(false), 650);
  };

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-hidden"
    >
      {/* Vivid Multi-Color Neon Aurora Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div
          className={`w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] rounded-full opacity-35 blur-[70px] sm:blur-[95px] animate-aurora-spin transition-transform duration-500 ${
            pulseBoost ? 'scale-125 opacity-55' : ''
          }`}
          style={{
            background:
              'conic-gradient(from 0deg, #00f0ff, #0356ff, #a855f7, #ff2e93, #65f2b5, #00f0ff)',
          }}
        />
        <div
          className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full opacity-25 blur-[60px] animate-aurora-spin-reverse"
          style={{
            background:
              'conic-gradient(from 180deg, #ff2e93, #00f0ff, #65f2b5, #0356ff, #ff2e93)',
          }}
        />
      </div>

      {/* Floating Glowing Neon Particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className={`absolute bottom-12 w-2 h-2 rounded-full animate-particle-rise ${p.color}`}
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171b27]/90 border border-cyan-400/35 shadow-[0_0_24px_-6px_rgba(0,240,255,0.55)] mb-6 sm:mb-8">
          <Radio className="w-4 h-4 text-cyan-300 animate-pulse" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-cyan-200 uppercase">
            {t.badge}
          </span>
        </div>

        {/* Vivid Animated 404 Centerpiece */}
        <div
          onClick={triggerBurst}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerBurst();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="404 animation trigger"
          className="group relative inline-flex items-center justify-center select-none cursor-pointer mb-6 sm:mb-8 focus:outline-none"
        >
          {/* Expanding Energy Pulse Rings */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-cyan-400/40 animate-energy-ring"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-fuchsia-400/35 animate-energy-ring"
            style={{ animationDelay: '1.2s' }}
          />

          {/* Left Digit: 4 */}
          <div className="relative">
            <span
              className="font-display font-black text-[6.25rem] sm:text-[9.5rem] md:text-[11rem] leading-none tracking-tighter bg-clip-text text-transparent animate-gradient-flow drop-shadow-[0_0_32px_rgba(0,240,255,0.45)]"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #00f0ff, #65f2b5, #a855f7, #ff2e93, #00f0ff)',
              }}
            >
              4
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display font-black text-[6.25rem] sm:text-[9.5rem] md:text-[11rem] leading-none tracking-tighter text-cyan-300/80 animate-glitch-1"
              style={{ clipPath: 'inset(18% 0 46% 0)' }}
            >
              4
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display font-black text-[6.25rem] sm:text-[9.5rem] md:text-[11rem] leading-none tracking-tighter text-fuchsia-400/80 animate-glitch-2"
              style={{ clipPath: 'inset(56% 0 14% 0)' }}
            >
              4
            </span>
          </div>

          {/* Center Digit: Animated Neon Portal "0" */}
          <div className="relative mx-2 sm:mx-4 w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center animate-float-orbit">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-[0_0_28px_rgba(0,240,255,0.55)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="kray404Ring" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="35%" stopColor="#65f2b5" />
                  <stop offset="70%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ff2e93" />
                </linearGradient>
                <radialGradient id="kray404Core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.45" />
                  <stop offset="55%" stopColor="#a855f7" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0f131e" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx="100" cy="100" r="82" fill="url(#kray404Core)" />

              {/* Outer Spinning Dashed Ring */}
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="url(#kray404Ring)"
                strokeWidth="7"
                strokeDasharray="36 18 14 18"
                strokeLinecap="round"
                className="animate-aurora-spin"
                style={{ transformOrigin: '100px 100px' }}
              />

              {/* Inner Counter-Spinning Neon Ring */}
              <circle
                cx="100"
                cy="100"
                r="58"
                fill="none"
                stroke="#00f0ff"
                strokeOpacity="0.7"
                strokeWidth="3.5"
                strokeDasharray="18 14"
                strokeLinecap="round"
                className="animate-aurora-spin-reverse"
                style={{ transformOrigin: '100px 100px' }}
              />

              {/* Radar Sweep Sector */}
              <g className="animate-radar-sweep" style={{ transformOrigin: '100px 100px' }}>
                <path
                  d="M100 100 L100 22 A78 78 0 0 1 168 62 Z"
                  fill="#00f0ff"
                  fillOpacity="0.22"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="22"
                  stroke="#65f2b5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </g>

              {/* Center Core */}
              <circle cx="100" cy="100" r="14" fill="#0f131e" stroke="#00f0ff" strokeWidth="3" />
              <circle cx="100" cy="100" r="5" fill="#ff2e93" />
            </svg>
          </div>

          {/* Right Digit: 4 */}
          <div className="relative">
            <span
              className="font-display font-black text-[6.25rem] sm:text-[9.5rem] md:text-[11rem] leading-none tracking-tighter bg-clip-text text-transparent animate-gradient-flow drop-shadow-[0_0_32px_rgba(255,46,147,0.45)]"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #ff2e93, #a855f7, #00f0ff, #65f2b5, #ff2e93)',
              }}
            >
              4
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display font-black text-[6.25rem] sm:text-[9.5rem] md:text-[11rem] leading-none tracking-tighter text-emerald-300/80 animate-glitch-2"
              style={{ clipPath: 'inset(22% 0 42% 0)' }}
            >
              4
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display font-black text-[6.25rem] sm:text-[9.5rem] md:text-[11rem] leading-none tracking-tighter text-cyan-300/80 animate-glitch-1"
              style={{ clipPath: 'inset(58% 0 12% 0)' }}
            >
              4
            </span>
          </div>
        </div>

        {/* Attempted Path Terminal Pill */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 max-w-full px-4 py-2 rounded-xl bg-[#0a0e19]/90 border border-white/10 font-mono text-xs sm:text-sm text-slate-300 shadow-inner">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
            <span className="text-cyan-400">GET</span>
            <span className="truncate max-w-[200px] sm:max-w-md text-white">{attemptedPath}</span>
            <span className="text-pink-400 font-semibold">404</span>
          </div>
        </div>

        {/* Heading & Description */}
        <h1
          id="not-found-heading"
          className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight mb-4"
        >
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
          {t.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#00292d] bg-gradient-to-r from-[#00f0ff] via-[#65f2b5] to-[#00f0ff] animate-gradient-flow shadow-[0_0_28px_-4px_rgba(0,240,255,0.75)] hover:shadow-[0_0_38px_0px_rgba(0,240,255,0.95)] hover:-translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>{t.homeBtn}</span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-[#171b27]/90 border border-white/15 hover:border-cyan-400/50 hover:bg-[#1b1f2b] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-300" aria-hidden="true" />
            <span>{t.backBtn}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCalculator}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-fuchsia-200 bg-fuchsia-500/15 border border-fuchsia-400/35 hover:bg-fuchsia-500/25 hover:border-fuchsia-400/70 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-fuchsia-300" aria-hidden="true" />
            <span>{t.calcBtn}</span>
          </button>
        </div>

        {/* Popular Quick Links */}
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>{t.quickTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {t.links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-2xl p-4 bg-[#171b27]/80 border border-white/10 hover:border-cyan-400/50 transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${item.accent} opacity-75 group-hover:opacity-100`}
                />
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {item.label}
                  </span>
                  <Zap
                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
