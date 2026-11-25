import React from 'react';
import { 
  CalendarRange, 
  Briefcase, 
  TrendingUp, 
  Gauge, 
  Zap, 
  ShieldCheck, 
  Code2, 
  CheckCircle2, 
  Calculator, 
  ArrowUpRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenCases: () => void;
}

const HERO_CARD_STRINGS = {
  uk: {
    status: 'На зв’язку • Готовий до роботи',
    speedLabel: 'Google PageSpeed',
    speedSub: 'Швидке завантаження до 1.2с',
    growthVal: '+200%',
    growthLabel: 'Середнє зростання заявок',
    noPrepay: 'Оплата за фактом виконання робіт',
    auditBadge: 'Безкоштовний розбір за 24 години',
    guarantee: 'Фіксація термінів та умов у договорі',
    delivered: '50+ зданих проєктів',
    stackTitle: 'Стек розробки',
    ctaMini: 'Розрахувати в калькуляторі',
    chart1Title: 'Конверсія сайту',
    chart2Title: 'Органічний трафік'
  },
  ru: {
    status: 'На связи • Готов к работе',
    speedLabel: 'Google PageSpeed',
    speedSub: 'Быстрая загрузка до 1.2с',
    growthVal: '+200%',
    growthLabel: 'Средний рост конверсии и заявок',
    noPrepay: 'Оплата по факту выполнения работ',
    auditBadge: 'Бесплатный разбор за 24 часа',
    guarantee: 'Фиксация сроков и условий в договоре',
    delivered: '50+ сданных проектов',
    stackTitle: 'Стек разработки',
    ctaMini: 'Рассчитать в калькуляторе',
    chart1Title: 'Конверсия сайта',
    chart2Title: 'Органический трафик'
  },
  en: {
    status: 'Online • Available for Projects',
    speedLabel: 'Google PageSpeed',
    speedSub: 'Fast load time < 1.2s',
    growthVal: '+200%',
    growthLabel: 'Average conversion & lead growth',
    noPrepay: 'Payment upon completion of work',
    auditBadge: 'Free 24h Website Review',
    guarantee: 'Fixed timeline & clear terms',
    delivered: '50+ delivered projects',
    stackTitle: 'Core Tech Stack',
    ctaMini: 'Calculate in 1 click',
    chart1Title: 'Site Conversion',
    chart2Title: 'Organic Traffic'
  }
};

export default function Hero({ onOpenCalculator, onOpenCases }: HeroProps) {
  const { t, language } = useLanguage();
  const cardStrings = HERO_CARD_STRINGS[language] || HERO_CARD_STRINGS.uk;

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-12 lg:py-20" id="hero-section">
      {/* Decorative Gradient Blobs (Desktop only to prevent mobile GPU compositing delays) */}
      <div className="hidden sm:block absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="hidden sm:block absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Title, Description & Action Buttons (7 cols) */}
          <div className="lg:col-span-7">
            {/* Animated Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/20 mb-8 text-brand-primary-container text-xs font-semibold uppercase tracking-wider"
              id="hero-badge"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary-container animate-pulse shadow-glow"></span>
              {t.hero.badge}
            </div>

            {/* Heading - Instant 100% opacity for sub-second LCP */}
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-on-surface mb-6 leading-tight tracking-tight"
              id="hero-title"
            >
              {t.hero.title_prefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-container via-cyan-300 to-brand-secondary-container">
                {t.hero.title_highlight}
              </span>
              {t.hero.title_suffix}
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg md:text-xl text-brand-on-surface-variant mb-10 max-w-2xl leading-relaxed font-sans"
              id="hero-description"
            >
              {t.hero.description}
            </p>

            {/* Actions */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              id="hero-actions-container"
            >
              <button
                onClick={onOpenCalculator}
                className="bg-brand-primary-container text-[#00363a] font-bold text-sm md:text-base px-8 py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-glow flex items-center justify-center gap-2.5 cursor-pointer"
                id="hero-cta-discuss"
              >
                <Calculator className="w-5 h-5" /> {t.hero.discuss}
              </button>
              <button
                onClick={onOpenCases}
                className="border border-brand-outline hover:border-brand-primary-container text-brand-on-surface hover:text-brand-primary-container font-semibold text-sm md:text-base px-8 py-4 rounded-xl hover:bg-brand-surface-container-high/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                id="hero-cta-cases"
              >
                <Briefcase className="w-5 h-5" /> {t.hero.cases}
              </button>
            </div>

            {/* Key Trust Bullets under buttons */}
            <div
              className="pt-6 border-t border-brand-outline-variant/30 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-brand-on-surface-variant"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-emerald-300">{cardStrings.noPrepay}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{cardStrings.guarantee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{cardStrings.auditBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Live Agency Terminal & KPI Card (5 cols) */}
          <div
            className="lg:col-span-5 relative animate-fade-in"
          >
            {/* Ambient Backlight for the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-teal-500/10 to-indigo-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />

            <div className="bg-[#0e131f]/85 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-950/50 flex flex-col gap-5">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2 font-mono text-[11px] text-gray-400">developer-metrics.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {cardStrings.status}
                </div>
              </div>

              {/* KPI Metrics Highlight Box */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Metric 1: PageSpeed Score */}
                <div className="bg-[#141b2b]/90 border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-emerald-400" />
                      {cardStrings.speedLabel}
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded">
                      Mobile & Desktop
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-emerald-400">90+</span>
                    <span className="text-xs text-gray-400">/ 100</span>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1">{cardStrings.speedSub}</span>
                </div>

                {/* Metric 2: Growth KPI */}
                <div className="bg-[#141b2b]/90 border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      {cardStrings.growthLabel}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-cyan-400">{cardStrings.growthVal}</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1">{cardStrings.delivered}</span>
                </div>
              </div>

              {/* Two Upward Growth Charts */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Chart 1: Conversion Growth */}
                <div className="bg-[#0b101b]/90 border border-emerald-500/20 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-gray-300 truncate">{cardStrings.chart1Title}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded font-mono">▲</span>
                  </div>
                  <svg viewBox="0 0 180 68" className="w-full h-16 overflow-visible" aria-hidden="true">
                    <defs>
                      <linearGradient id="heroChartGradEmerald" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="180" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1="44" x2="180" y2="44" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <path
                      d="M 4 58 C 32 56, 52 46, 78 40 C 106 34, 130 22, 174 8 L 174 64 L 4 64 Z"
                      fill="url(#heroChartGradEmerald)"
                    />
                    <path
                      d="M 4 58 C 32 56, 52 46, 78 40 C 106 34, 130 22, 174 8"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="174" cy="8" r="4" fill="#34d399" />
                    <circle cx="174" cy="8" r="7" fill="#34d399" fillOpacity="0.25" />
                  </svg>
                </div>

                {/* Chart 2: Organic Traffic & Leads Growth */}
                <div className="bg-[#0b101b]/90 border border-cyan-500/20 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-gray-300 truncate">{cardStrings.chart2Title}</span>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 px-1.5 py-0.5 rounded font-mono">▲</span>
                  </div>
                  <svg viewBox="0 0 180 68" className="w-full h-16 overflow-visible" aria-hidden="true">
                    <defs>
                      <linearGradient id="heroChartGradCyan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="180" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1="44" x2="180" y2="44" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <path
                      d="M 4 60 C 36 58, 62 50, 92 38 C 122 26, 146 16, 174 6 L 174 64 L 4 64 Z"
                      fill="url(#heroChartGradCyan)"
                    />
                    <path
                      d="M 4 60 C 36 58, 62 50, 92 38 C 122 26, 146 16, 174 6"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="174" cy="6" r="4" fill="#22d3ee" />
                    <circle cx="174" cy="6" r="7" fill="#22d3ee" fillOpacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Card Footer Action: Instant Calculator Trigger */}
              <button
                onClick={onOpenCalculator}
                className="w-full bg-gradient-to-r from-cyan-500/15 via-teal-500/15 to-indigo-500/15 hover:from-cyan-500/25 hover:to-indigo-500/25 border border-cyan-400/40 text-cyan-300 hover:text-white rounded-xl py-3 px-4 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
                  {cardStrings.ctaMini}
                </span>
                <span className="font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  &gt;&gt;
                </span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


