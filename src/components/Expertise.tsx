import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Search, 
  Target, 
  Users, 
  Wrench,
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Gauge, 
  ShieldCheck,
  Layers,
  Flame,
  Clock,
  Sparkles as SparklesIcon,
  Server,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExpertiseProps {
  onSelectService: (serviceName: string) => void;
}

export default function Expertise({ onSelectService }: ExpertiseProps) {
  const { t, language } = useLanguage();
  
  // Dynamic SMM Chart data state for micro-interactivity
  const [chartVals, setChartVals] = useState([35, 60, 82, 100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartVals(prev => prev.map(val => {
        const change = Math.floor(Math.random() * 19) - 9; // -9 to +9
        return Math.max(25, Math.min(100, val + change));
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const LABELS = {
    ru: {
      web: {
        priceBadge: 'от 5 000 ₴ • от 3–5 дней',
        prepayBadge: '10% предоплата — 90% по факту',
        terminalFile: 'production.config.ts',
        metricSpeed: 'Скорость PageSpeed',
        metricMobile: 'Mobile First 100%',
        metricClean: 'Чистый React / Next.js',
        tags: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'REST API']
      },
      seo: {
        serpTitle: 'google.com/search • ТОП-1',
        growth: '+340% Органика',
        speed: 'Speed 98/100',
        item1: 'Внутренняя SEO от 5 000 ₴',
        item2: 'Оптимизация скорости от 2 000 ₴',
        item3: 'SEO-тексты 100 ₴ / 1 000 симв.'
      },
      ads: {
        roi: 'ROAS / ROI',
        roiVal: '+380%',
        cpl: 'Стоимость лида',
        cplVal: '-42%',
        item1: 'Запуск кампаний за 3–5 дней',
        item2: 'Сквозная аналитика GA4',
        item3: 'Google Search & Performance Max'
      },
      smm: {
        badge: 'Техподдержка & Услуги',
        uptime: 'Uptime 99.9%',
        response: 'Реакция: от 15 мин',
        sla: 'SLA Гарантия',
        items: [
          'Модернизация сайта от 2 000 ₴',
          'Перенос на Хостинг — 1 000 ₴',
          'Перенос на WordPress — 3 000 ₴',
          'Формы и полезные инструменты от 200 ₴',
          'Оптимизация нагрузки на сервер от 2 000 ₴',
          'Восстановление работы сайта от 1 000 ₴'
        ],
        tags: ['WordPress', 'Хостинг', 'Серверы', 'Бекапы', 'Багфикс', 'Формы']
      }
    },
    uk: {
      web: {
        priceBadge: 'від 5 000 ₴ • від 3–5 днів',
        prepayBadge: '10% передоплата — 90% за фактом',
        terminalFile: 'production.config.ts',
        metricSpeed: 'Швидкість PageSpeed',
        metricMobile: 'Mobile First 100%',
        metricClean: 'Чистий React / Next.js',
        tags: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'REST API']
      },
      seo: {
        serpTitle: 'google.com/search • ТОП-1',
        growth: '+340% Органіка',
        speed: 'Speed 98/100',
        item1: 'Внутрішня SEO від 5 000 ₴',
        item2: 'Оптимізація швидкості від 2 000 ₴',
        item3: 'SEO-тексти 100 ₴ / 1 000 симв.'
      },
      ads: {
        roi: 'ROAS / ROI',
        roiVal: '+380%',
        cpl: 'Вартість ліда',
        cplVal: '-42%',
        item1: 'Швидкий запуск за 3–5 днів',
        item2: 'Наскрізна аналітика GA4',
        item3: 'Google Search & Performance Max'
      },
      smm: {
        badge: 'Техпідтримка & Послуги',
        uptime: 'Uptime 99.9%',
        response: 'Реакція: від 15 хв',
        sla: 'SLA Гарантія',
        items: [
          'Модернізація сайту від 2 000 ₴',
          'Перенесення на Хостинг — 1 000 ₴',
          'Перенесення на WordPress — 3 000 ₴',
          'Форми та корисні інструменти від 200 ₴',
          'Оптимізація навантаження на сервер від 2 000 ₴',
          'Відновлення роботи сайту від 1 000 ₴'
        ],
        tags: ['WordPress', 'Хостинг', 'Сервери', 'Бекапи', 'Багфікс', 'Форми']
      }
    },
    en: {
      web: {
        priceBadge: 'from $120 • from 3–5 days',
        prepayBadge: '10% deposit — 90% on delivery',
        terminalFile: 'production.config.ts',
        metricSpeed: 'PageSpeed Score',
        metricMobile: 'Mobile First 100%',
        metricClean: 'Clean React / Next.js',
        tags: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'REST API']
      },
      seo: {
        serpTitle: 'google.com/search • TOP #1',
        growth: '+340% Organic Traffic',
        speed: 'Speed 98/100',
        item1: 'On-Page SEO from $120',
        item2: 'PageSpeed Optimization from $50',
        item3: 'SEO Articles $3 / 1k chars'
      },
      ads: {
        roi: 'ROAS / ROI',
        roiVal: '+380%',
        cpl: 'Cost per Lead',
        cplVal: '-42%',
        item1: 'Campaign launch in 3–5 days',
        item2: 'GA4 Full-Funnel Tracking',
        item3: 'Google Search & Performance Max'
      },
      smm: {
        badge: 'Maintenance & Support',
        uptime: 'Uptime 99.9%',
        response: 'Response: 15 mins',
        sla: 'SLA Guarantee',
        items: [
          'Website modernization from $50',
          'Hosting migration — $25',
          'WordPress migration — $75',
          'Forms & utility tools from $5',
          'Server load optimization from $50',
          'Emergency site recovery from $25'
        ],
        tags: ['WordPress', 'Hosting', 'Servers', 'Backups', 'Bugfix', 'Forms']
      }
    }
  };

  const currentLabels = LABELS[language as keyof typeof LABELS] || LABELS.ru;

  return (
    <section className="py-24 bg-transparent border-t border-brand-outline-variant/10" id="expertise-section">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Title and Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-on-surface mb-4">
              {t.expertise.title}
            </h2>
            <p className="text-sm sm:text-base text-brand-on-surface-variant leading-relaxed">
              {t.expertise.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-grid">
          
          {/* 1. WEB DEVELOPMENT (2 Columns) */}
          <motion.div
            onClick={() => onSelectService(t.expertise.services.dev.title)}
            className="md:col-span-2 card-border-gradient rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:shadow-glow/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            id="service-web"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Glowing background decorators */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.10] mix-blend-overlay pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-primary-container/10 rounded-full blur-3xl group-hover:bg-brand-primary-container/15 transition-all duration-500 pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-container/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Main content flex layout */}
            <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch justify-between">
              
              {/* Left Column: Info & Specs */}
              <div className="flex-1 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary-container/10 border border-brand-primary-container/30 flex items-center justify-center text-brand-primary-container shadow-md shadow-cyan-500/10">
                      <Code className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-brand-primary-container/15 text-brand-primary-container border border-brand-primary-container/30 uppercase tracking-wider">
                      {currentLabels.web.priceBadge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-brand-on-surface flex items-center gap-2 group-hover:text-white transition-colors">
                    {t.expertise.services.dev.title}
                    <ArrowUpRight className="w-5 h-5 text-brand-primary-container opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>

                  <p className="text-sm text-brand-on-surface-variant mt-2 leading-relaxed max-w-md">
                    {t.expertise.services.dev.desc}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{currentLabels.web.prepayBadge}</span>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="pt-4 flex gap-2 flex-wrap">
                  {currentLabels.web.tags.map((tg) => (
                    <span
                      key={tg}
                      className="px-2.5 py-1 rounded-lg bg-brand-surface-container-high/80 text-brand-on-surface font-mono font-medium text-xs border border-brand-outline-variant/30 group-hover:border-brand-primary-container/30 transition-colors"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Mini Interactive Architecture Terminal Widget */}
              <div className="w-full lg:w-[280px] bg-brand-surface-container-lowest/90 border border-brand-outline-variant/30 rounded-xl p-4 shadow-xl flex flex-col justify-between shrink-0 relative overflow-hidden group-hover:border-brand-primary-container/40 transition-colors">
                <div className="flex items-center justify-between pb-3 border-b border-brand-outline-variant/20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300/80">{currentLabels.web.terminalFile}</span>
                </div>

                <div className="py-3 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-[11px] flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                      {currentLabels.web.metricSpeed}:
                    </span>
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">
                      99 / 100
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-[11px] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      {currentLabels.web.metricClean}:
                    </span>
                    <span className="font-bold text-cyan-300 text-[10px]">v15.2</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary-container" />
                      {currentLabels.web.metricMobile}:
                    </span>
                    <span className="text-emerald-400 text-[10px] font-bold">100% OK</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-brand-outline-variant/20 flex items-center justify-between text-[10px] text-brand-on-surface-variant font-sans">
                  <span>SSL & SEO-Ready</span>
                  <span className="text-brand-primary-container font-semibold flex items-center gap-1">
                    Подробнее <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* 2. SEO OPTIMIZATION (1 Column - Filled with rich SERP & price widgets) */}
          <motion.div
            onClick={() => onSelectService(t.expertise.services.seo.title)}
            className="bg-gradient-to-br from-brand-surface-container-low to-brand-surface-container-lowest border border-brand-outline-variant/25 rounded-2xl p-6 md:p-8 hover:border-brand-secondary/50 transition-all duration-300 group cursor-pointer hover:shadow-[0_0_25px_rgba(182,196,255,0.12)] relative overflow-hidden flex flex-col justify-between"
            id="service-seo"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl bg-brand-secondary/8 group-hover:bg-brand-secondary/15 transition-all duration-500 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 border border-brand-secondary/30 flex items-center justify-center text-brand-secondary">
                <Search className="w-6 h-6 stroke-[2]" />
              </div>
              
              <div>
                <h3 className="font-display text-xl font-bold text-brand-on-surface flex items-center gap-2 group-hover:text-white transition-colors">
                  {t.expertise.services.seo.title}
                  <ArrowUpRight className="w-4.5 h-4.5 text-brand-secondary opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>
                <p className="text-xs md:text-sm text-brand-on-surface-variant mt-2 leading-relaxed">
                  {t.expertise.services.seo.desc}
                </p>
              </div>
            </div>

            {/* Rich bottom widget filling the empty space */}
            <div className="mt-6 pt-5 border-t border-brand-outline-variant/20 space-y-3 relative z-10">
              {/* Mini Google SERP badge */}
              <div className="bg-brand-surface-container-lowest/90 border border-brand-outline-variant/30 rounded-xl p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="text-[11px] font-mono text-white/90 truncate">{currentLabels.seo.serpTitle}</span>
                </div>
                <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded shrink-0">
                  TOP 1
                </span>
              </div>

              {/* Metric pills */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-brand-surface-container-high/60 border border-brand-outline-variant/20 rounded-lg p-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-semibold text-emerald-300">{currentLabels.seo.growth}</span>
                </div>
                <div className="bg-brand-surface-container-high/60 border border-brand-outline-variant/20 rounded-lg p-2 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-[11px] font-semibold text-cyan-300">{currentLabels.seo.speed}</span>
                </div>
              </div>

              {/* Price checklist */}
              <div className="space-y-1.5 text-[11px] text-brand-on-surface-variant/90 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                  <span>{currentLabels.seo.item1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                  <span>{currentLabels.seo.item2}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                  <span>{currentLabels.seo.item3}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. GOOGLE ADS (1 Column - Filled with ROI & Performance Widgets) */}
          <motion.div
            onClick={() => onSelectService(t.expertise.services.ads.title)}
            className="bg-gradient-to-br from-brand-surface-container-low to-brand-surface-container-lowest border border-brand-outline-variant/25 rounded-2xl p-6 md:p-8 hover:border-brand-tertiary-container/50 transition-all duration-300 group cursor-pointer hover:shadow-[0_0_25px_rgba(101,242,181,0.12)] relative overflow-hidden flex flex-col justify-between"
            id="service-ads"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl bg-brand-tertiary-container/8 group-hover:bg-brand-tertiary-container/15 transition-all duration-500 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-brand-tertiary-container/10 border border-brand-tertiary-container/30 flex items-center justify-center text-brand-tertiary-container">
                <Target className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-brand-on-surface flex items-center gap-2 group-hover:text-white transition-colors">
                  {t.expertise.services.ads.title}
                  <ArrowUpRight className="w-4.5 h-4.5 text-brand-tertiary-container opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>
                <p className="text-xs md:text-sm text-brand-on-surface-variant mt-2 leading-relaxed">
                  {t.expertise.services.ads.desc}
                </p>
              </div>
            </div>

            {/* Rich bottom widget filling the empty space */}
            <div className="mt-6 pt-5 border-t border-brand-outline-variant/20 space-y-3 relative z-10">
              {/* ROI and CPL stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-brand-surface-container-lowest/90 border border-emerald-500/25 rounded-xl p-2.5">
                  <span className="text-[10px] text-brand-on-surface-variant block">{currentLabels.ads.roi}</span>
                  <span className="text-base font-bold text-emerald-400 block font-display mt-0.5">{currentLabels.ads.roiVal}</span>
                </div>
                <div className="bg-brand-surface-container-lowest/90 border border-cyan-500/25 rounded-xl p-2.5">
                  <span className="text-[10px] text-brand-on-surface-variant block">{currentLabels.ads.cpl}</span>
                  <span className="text-base font-bold text-brand-primary-container block font-display mt-0.5">{currentLabels.ads.cplVal}</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-1.5 text-[11px] text-brand-on-surface-variant/90 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-tertiary-container shrink-0" />
                  <span>{currentLabels.ads.item1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-tertiary-container shrink-0" />
                  <span>{currentLabels.ads.item2}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-tertiary-container shrink-0" />
                  <span>{currentLabels.ads.item3}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. ADDITIONAL SERVICES & MAINTENANCE (2 Columns - With Service Checklist and Tags) */}
          <motion.div
            onClick={() => onSelectService(t.expertise.services.smm.title)}
            className="md:col-span-2 bg-gradient-to-br from-brand-surface-container-low to-brand-surface-container-lowest border border-brand-outline-variant/25 rounded-2xl p-6 md:p-8 hover:border-brand-primary-container/40 transition-all duration-300 flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch justify-between group cursor-pointer hover:shadow-glow/15 relative overflow-hidden"
            id="service-smm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Glowing background decorators */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-brand-primary-container/8 rounded-full blur-3xl group-hover:bg-brand-primary-container/12 transition-all duration-500 pointer-events-none" />
            
            <div className="flex-1 space-y-4 relative z-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary-container/10 border border-brand-primary-container/30 flex items-center justify-center text-brand-primary-container">
                    <Wrench className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {currentLabels.smm.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-brand-on-surface flex items-center gap-2 group-hover:text-white transition-colors">
                  {t.expertise.services.smm.title}
                  <ArrowUpRight className="w-5 h-5 text-brand-primary-container opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>
                <p className="text-sm text-brand-on-surface-variant mt-2 leading-relaxed max-w-md">
                  {t.expertise.services.smm.desc}
                </p>
              </div>

              {/* Maintenance Metrics & Tags */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" />
                    {currentLabels.smm.uptime}
                  </span>
                  <span className="text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {currentLabels.smm.response}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {currentLabels.smm.tags.map((tg) => (
                    <span
                      key={tg}
                      className="px-2.5 py-1 rounded-lg bg-brand-surface-container-high text-brand-on-surface-variant font-medium text-xs border border-brand-outline-variant/20"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Mini Interactive Service Price Matrix */}
            <div className="w-full md:w-[320px] bg-brand-surface-container-lowest/90 rounded-2xl border border-brand-outline-variant/30 p-4 shrink-0 shadow-inner z-10 group-hover:border-brand-primary-container/30 transition-colors flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-brand-outline-variant/20">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary-container" />
                  {currentLabels.smm.sla}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">10% Предоплата</span>
              </div>

              <div className="space-y-2 text-xs">
                {currentLabels.smm.items.map((it, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-2 text-brand-on-surface-variant/90 hover:text-white transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary-container shrink-0" />
                    <span className="truncate text-[11px] font-medium">{it}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-brand-outline-variant/20 flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Гарантия на все работы</span>
                <span className="text-brand-primary-container font-semibold flex items-center gap-1">
                  Заказать <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
