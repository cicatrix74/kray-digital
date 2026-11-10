import React from 'react';
import { motion } from 'motion/react';
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
    status: 'Система активна • KPI модель',
    speedLabel: 'Google PageSpeed',
    speedSub: 'Миттєве завантаження 0.8с',
    growthVal: '+340%',
    growthLabel: 'Середнє зростання заявок',
    noPrepay: '10% передоплати — 90% за фактом робіт',
    auditBadge: 'Безкоштовний аудит за 24 години',
    guarantee: 'Фіксація термінів та KPI у договорі',
    delivered: '150+ зданих проєктів',
    stackTitle: 'Стек розробки',
    ctaMini: 'Розрахувати в калькуляторі'
  },
  ru: {
    status: 'Система активна • KPI модель',
    speedLabel: 'Google PageSpeed',
    speedSub: 'Мгновенная загрузка 0.8с',
    growthVal: '+340%',
    growthLabel: 'Средний рост конверсии и заявок',
    noPrepay: '10% предоплаты — 90% по факту работ',
    auditBadge: 'Бесплатный аудит за 24 часа',
    guarantee: 'Фиксация сроков и KPI в договоре',
    delivered: '150+ сданных проектов',
    stackTitle: 'Стек разработки',
    ctaMini: 'Рассчитать в калькуляторе'
  },
  en: {
    status: 'System Active • KPI Driven',
    speedLabel: 'Google PageSpeed',
    speedSub: 'Ultra-fast 0.8s load time',
    growthVal: '+340%',
    growthLabel: 'Average conversion & lead growth',
    noPrepay: '10% Deposit — 90% on completion',
    auditBadge: 'Free 24h Digital Audit',
    guarantee: 'Guaranteed delivery & SLA',
    delivered: '150+ delivered projects',
    stackTitle: 'Core Tech Stack',
    ctaMini: 'Calculate in 1 click'
  }
};

export default function Hero({ onOpenCalculator, onOpenCases }: HeroProps) {
  const { t, language } = useLanguage();
  const cardStrings = HERO_CARD_STRINGS[language] || HERO_CARD_STRINGS.uk;

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-12 lg:py-20" id="hero-section">
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Title, Description & Action Buttons (7 cols) */}
          <div className="lg:col-span-7">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/20 mb-8 text-brand-primary-container text-xs font-semibold uppercase tracking-wider"
              id="hero-badge"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary-container animate-pulse shadow-glow"></span>
              {t.hero.badge}
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-on-surface mb-6 leading-tight tracking-tight"
              id="hero-title"
            >
              {t.hero.title_prefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-container via-cyan-300 to-brand-secondary-container">
                {t.hero.title_highlight}
              </span>{' '}
              {t.hero.title_suffix}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-brand-on-surface-variant mb-10 max-w-2xl leading-relaxed font-sans"
              id="hero-description"
            >
              {t.hero.description}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
            </motion.div>

            {/* Key Trust Bullets under buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
            </motion.div>
          </div>

          {/* Right Column: Sleek Live Agency Terminal & KPI Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
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
                  <span className="ml-2 font-mono text-[11px] text-gray-400">agency-metrics.ts</span>
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
                    <span className="font-display text-3xl font-extrabold text-emerald-400">99</span>
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

              {/* Compact Code Preview Terminal */}
              <div className="bg-[#080b12] rounded-xl p-3.5 border border-white/5 font-mono text-[12px] leading-relaxed text-gray-300 space-y-1">
                <div className="text-gray-500">// Kray Digital Model:</div>
                <div>
                  <span className="text-cyan-300">const</span> <span className="text-indigo-300">payment</span> = <span className="text-emerald-300">'10% Deposit / 90% on Delivery'</span>;
                </div>
                <div>
                  <span className="text-cyan-300">const</span> <span className="text-indigo-300">pricing</span> = &#123; landing: <span className="text-amber-300">'від 5 000 ₴'</span>, corp: <span className="text-amber-300">'від 15 000 ₴'</span> &#125;;
                </div>
                <div>
                  <span className="text-cyan-300">const</span> <span className="text-indigo-300">guarantee</span> = <span className="text-emerald-300">'KPI & SLA Contract'</span>;
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}


