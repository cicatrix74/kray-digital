import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  ArrowUpRight,
  ExternalLink,
  Play,
  Pause,
  MessageSquare,
  Users
} from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

interface TestimonialProps {
  onOpenCase?: (caseId: string) => void;
  onScrollToContact?: () => void;
}

interface Testimonial {
  id: string;
  name: string;
  role: Record<Language, string>;
  company: string;
  category: 'ecommerce' | 'saas' | 'b2b' | 'retail';
  avatar: string;
  rating: number;
  metric: Record<Language, string>;
  metricSubtitle: Record<Language, string>;
  quote: Record<Language, string>;
  verified: boolean;
  projectType: Record<Language, string>;
  duration: Record<Language, string>;
  linkedCaseId?: string;
}

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.6,
  isInView,
}) => {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let animFrame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease-out for a smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setValue(easeOut * target);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isInView, target, duration]);

  return (
    <span>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default function Testimonials({ onOpenCase, onScrollToContact }: TestimonialProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const labels = {
    badge: {
      uk: 'Відгуки та результати',
      ru: 'Отзывы и результаты',
      en: 'Social Proof & Success Stories'
    },
    title: {
      uk: 'Історії успіху наших клієнтів',
      ru: 'Истории успеха наших клиентов',
      en: 'Real outcomes from real partners'
    },
    subtitle: {
      uk: 'Дізнайтеся, як ми допомогли українським та міжнародним компаніям масштабувати онлайн-продажі, запустити веб-платформи та підвищити конверсію.',
      ru: 'Узнайте, как мы помогли украинским и международным компаниям масштабировать онлайн-продажи, запустить веб-платформы и повысить конверсию.',
      en: 'See how we helped businesses scale digital sales, launch high-performance platforms, and achieve measurable ROI.'
    },
    aggregate: {
      rating: '4.98 / 5.0',
      ratingText: { uk: 'Середня оцінка (50+ проектів)', ru: 'Средняя оценка (50+ проектов)', en: 'Average rating (50+ projects)' },
      retention: '96%',
      retentionText: { uk: 'Клієнтів звертаються повторно за новими проектами', ru: 'Клиентов обращаются повторно за новыми проектами', en: 'Client retention & repeat projects' },
      roi: '3.4x',
      roiText: { uk: 'Середній ROI маркетингових кампаній', ru: 'Средний ROI маркетинговых кампаний', en: 'Average marketing ROI' }
    },
    cats: {
      all: { uk: 'Усі відгуки', ru: 'Все отзывы', en: 'All Stories' },
      ecommerce: { uk: 'E-Commerce', ru: 'E-Commerce', en: 'E-Commerce' },
      saas: { uk: 'SaaS & Tech', ru: 'SaaS & Tech', en: 'SaaS & Tech' },
      b2b: { uk: 'B2B та Послуги', ru: 'B2B и Услуги', en: 'B2B & Services' },
      retail: { uk: 'FinTech & Retail', ru: 'FinTech & Retail', en: 'FinTech & Retail' }
    },
    verifiedClient: { uk: 'Підтверджений клієнт', ru: 'Подтвержденный клиент', en: 'Verified Client' },
    viewCase: { uk: 'Читати кейс проекту', ru: 'Читать кейс проекта', en: 'View Case Study' },
    btnConsult: { uk: 'Отримати подібний результат', ru: 'Получить похожий результат', en: 'Get Similar Growth' }
  };

  const testimonialsData: Testimonial[] = [
    {
      id: 'testi-1',
      name: 'Володимир Мельник',
      role: {
        uk: 'Власник інтернет-магазину',
        ru: 'Владелец интернет-магазина',
        en: 'E-commerce Store Owner'
      },
      company: 'NovaStore Gear',
      category: 'ecommerce',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=face&w=300&h=300&q=80',
      rating: 5,
      metric: {
        uk: '+310% Продажів',
        ru: '+310% Продаж',
        en: '+310% Online Sales'
      },
      metricSubtitle: {
        uk: 'за перші 3 місяці після редизайну',
        ru: 'за первые 3 месяца после редизайна',
        en: 'in first 3 months post-launch'
      },
      quote: {
        uk: 'KRAY DIGITAL повністю переробили наш інтернет-магазин на швидкий PWA з миттєвим завантаженням. Конверсія мобільних користувачів зросла з 1.2% до 3.8%. Швидкість завантаження сторінок за даними Google PageSpeed досягла 98/100.',
        ru: 'KRAY DIGITAL полностью переработали наш интернет-магазин в быстрый PWA с мгновенной загрузкой. Конверсия мобильных пользователей выросла с 1.2% до 3.8%. Скорость загрузки страниц по Google PageSpeed достигла 98/100.',
        en: 'KRAY DIGITAL completely rebuilt our e-commerce platform into a lighting-fast PWA. Mobile conversion rate leaped from 1.2% to 3.8%. Google PageSpeed score reached an incredible 98/100.'
      },
      verified: true,
      projectType: {
        uk: 'E-Commerce Platform + SEO',
        ru: 'E-Commerce Platform + SEO',
        en: 'E-Commerce Platform + SEO'
      },
      duration: {
        uk: 'Термін розробки: 6 тижнів',
        ru: 'Срок разработки: 6 недель',
        en: 'Timeline: 6 weeks'
      },
      linkedCaseId: 'ecom-1'
    },
    {
      id: 'testi-2',
      name: 'Анна Кравченко',
      role: {
        uk: 'Керівник відділу маркетингу',
        ru: 'Руководитель отдела маркетинга',
        en: 'Marketing Director'
      },
      company: 'SaaS Pulse Analytics',
      category: 'saas',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=face&w=300&h=300&q=80',
      rating: 5,
      metric: {
        uk: '2.4x Дешевші Ліди',
        ru: '2.4x Дешевле Лиды',
        en: '2.4x Lower CPL'
      },
      metricSubtitle: {
        uk: 'збережено $18,000 рекламного бюджету',
        ru: 'сохранено $18,000 рекламного бюджета',
        en: 'saved $18k in ad burn rate'
      },
      quote: {
        uk: 'Команда KRAY DIGITAL створила для нас інтерактивний веб-сервіс із розумним калькулятором та запустила таргетовану рекламу у Google Ads. Кількість кваліфікованих B2B-демо зросла втричі без збільшення щомісячного бюджету!',
        ru: 'Команда KRAY DIGITAL создала для нас интерактивный веб-сервис с умным калькулятором и запустила таргетированную рекламу в Google Ads. Количество квалифицированных B2B-демо выросло втрое без увеличения ежемесячного бюджета!',
        en: 'KRAY DIGITAL designed a lead-generating web application with an interactive pricing calculator and rearchitected our Google Ads structure. Qualified B2B demo requests tripled with zero extra ad spend.'
      },
      verified: true,
      projectType: {
        uk: 'Web App + Google Performance Max',
        ru: 'Web App + Google Performance Max',
        en: 'Web App + Google Performance Max'
      },
      duration: {
        uk: 'Термін розробки: 4 тижні',
        ru: 'Срок разработки: 4 недели',
        en: 'Timeline: 4 weeks'
      },
      linkedCaseId: 'saas-1'
    },
    {
      id: 'testi-3',
      name: 'Олександр Бондаренко',
      role: {
        uk: 'Комерційний директор',
        ru: 'Коммерческий директор',
        en: 'Commercial Director'
      },
      company: 'AgroLogistic Group',
      category: 'b2b',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=face&w=300&h=300&q=80',
      rating: 5,
      metric: {
        uk: '100% Автоматизація',
        ru: '100% Автоматизация',
        en: '100% Automation'
      },
      metricSubtitle: {
        uk: 'обробки заявок через CRM інтеграцію',
        ru: 'обработки заявок через CRM интеграцию',
        en: 'lead dispatch & CRM syncing'
      },
      quote: {
        uk: 'Шукали надійну українську IT-агенцію для розробки корпоративного порталу та інтеграції з нашою CRM. Хлопці здали проект раніше дедлайну на 4 дні. Всі вимоги до безпеки та оптимізації були виконанні на 10/10.',
        ru: 'Искали надежное украинское IT-агентство для разработки корпоративного портала и интеграции с нашей CRM. Ребята сдали проект раньше дедлайна на 4 дня. Все требования к безопасности и оптимизации были выполнены на 10/10.',
        en: 'We were looking for a top-tier digital partner to build a B2B corporate portal with custom CRM syncing. They delivered 4 days ahead of deadline with impeccable code quality and security standards.'
      },
      verified: true,
      projectType: {
        uk: 'Corporate Portal + ERP Integration',
        ru: 'Corporate Portal + ERP Integration',
        en: 'Corporate Portal + ERP Integration'
      },
      duration: {
        uk: 'Термін розробки: 5 тижнів',
        ru: 'Срок разработки: 5 недель',
        en: 'Timeline: 5 weeks'
      },
      linkedCaseId: 'b2b-1'
    },
    {
      id: 'testi-4',
      name: 'Катерина Савченко',
      role: {
        uk: 'Директор з розвитку',
        ru: 'Директор по развитию',
        en: 'Director of Business Development'
      },
      company: 'FinPay Digital',
      category: 'retail',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=face&w=300&h=300&q=80',
      rating: 5,
      metric: {
        uk: '4.2x ROI Реклами',
        ru: '4.2x ROI Рекламы',
        en: '4.2x Return on Ad Spend'
      },
      metricSubtitle: {
        uk: 'з першого місяця запуску',
        ru: 'с первого месяца запуска',
        en: 'achieved in month 1'
      },
      quote: {
        uk: 'Неймовірний підхід до аналітики та UI/UX дизайну! Розробили нам лендінг із високою конверсією та налаштували наскрізну аналітику у Google Analytics 4. Чіткий щотижневий звіт та постійна підтримка.',
        ru: 'Невероятный подход к аналитике и UI/UX дизайну! Разработали нам лендинг с высокой конверсией и настроили сквозную аналитику в Google Analytics 4. Четкий еженедельный отчет и постоянная поддержка.',
        en: 'Incredible analytical precision and modern UI/UX design. They built our conversion landing page and configured end-to-end GA4 attribution tracking. Clear weekly reporting and relentless optimization.'
      },
      verified: true,
      projectType: {
        uk: 'FinTech Promo + GA4 Tracking',
        ru: 'FinTech Promo + GA4 Tracking',
        en: 'FinTech Promo + GA4 Tracking'
      },
      duration: {
        uk: 'Термін розробки: 2 тижні',
        ru: 'Срок разработки: 2 недели',
        en: 'Timeline: 2 weeks'
      },
      linkedCaseId: 'fin-1'
    }
  ];

  // Filtered testimonials by category
  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'all') return testimonialsData;
    return testimonialsData.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  // Keep index in bounds when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Autoplay slider logic
  useEffect(() => {
    if (!isAutoplay || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoplay, filteredTestimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentTestimonial = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" id="testimonials-section">
      {/* Background radial glows */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-brand-primary-container/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-brand-secondary-container/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/20 text-brand-primary-container text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{labels.badge[language]}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-extrabold text-brand-on-surface tracking-tight mb-4"
          >
            {labels.title[language]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-brand-on-surface-variant font-normal leading-relaxed"
          >
            {labels.subtitle[language]}
          </motion.p>
        </div>

        {/* Social Proof Stats Banner */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 bg-brand-surface-container-high/40 border border-brand-outline-variant/15 rounded-2xl p-6 backdrop-blur-md"
        >
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-brand-primary-container/10 border border-brand-primary-container/20 flex items-center justify-center text-brand-primary-container flex-shrink-0">
              <Star className="w-6 h-6 fill-brand-primary-container text-brand-primary-container" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-brand-on-surface tabular-nums">
                  <AnimatedCounter target={4.98} decimals={2} suffix=" / 5.0" isInView={isStatsInView} />
                </span>
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.3, rotate: -25 }}
                      animate={isStatsInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.3, rotate: -25 }}
                      transition={{ 
                        delay: 0.2 + i * 0.12, 
                        duration: 0.35, 
                        type: 'spring', 
                        stiffness: 260, 
                        damping: 15 
                      }}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-brand-on-surface-variant mt-0.5">{labels.aggregate.ratingText[language]}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-brand-outline-variant/15 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-xl bg-brand-primary-container/10 border border-brand-primary-container/20 flex items-center justify-center text-brand-primary-container flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-brand-on-surface tabular-nums">
                <AnimatedCounter target={96} decimals={0} suffix="%" isInView={isStatsInView} />
              </span>
              <p className="text-xs text-brand-on-surface-variant mt-0.5">{labels.aggregate.retentionText[language]}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-brand-outline-variant/15 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-xl bg-brand-primary-container/10 border border-brand-primary-container/20 flex items-center justify-center text-brand-primary-container flex-shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-brand-on-surface tabular-nums">
                <AnimatedCounter target={3.4} decimals={1} suffix="x" isInView={isStatsInView} />
              </span>
              <p className="text-xs text-brand-on-surface-variant mt-0.5">{labels.aggregate.roiText[language]}</p>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          
          {/* Industry Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(labels.cats) as Array<keyof typeof labels.cats>).map((catKey) => {
              const isActive = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary-container text-[#00363a] shadow-md shadow-brand-primary-container/20'
                      : 'bg-brand-surface-container-high/60 text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-container-high border border-brand-outline-variant/15'
                  }`}
                >
                  {labels.cats[catKey][language]}
                </button>
              );
            })}
          </div>

          {/* Autoplay & Arrows controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="p-2.5 rounded-xl bg-brand-surface-container-high/60 border border-brand-outline-variant/15 text-brand-on-surface-variant hover:text-brand-on-surface transition-colors cursor-pointer"
              title={isAutoplay ? 'Pause Carousel' : 'Play Carousel'}
            >
              {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-brand-primary-container" />}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-brand-surface-container-high border border-brand-outline-variant/20 hover:border-brand-primary-container/50 text-brand-on-surface transition-all cursor-pointer hover:bg-brand-primary-container/10 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-brand-surface-container-high border border-brand-outline-variant/20 hover:border-brand-primary-container/50 text-brand-on-surface transition-all cursor-pointer hover:bg-brand-primary-container/10 active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Featured Testimonial Main Carousel Card */}
        {currentTestimonial && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="bg-gradient-to-br from-brand-surface-container-high/90 via-[#161b27]/80 to-brand-surface-container-high/90 border border-brand-primary-container/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl"
              >
                {/* Decorative background quotation mark */}
                <Quote className="absolute top-6 right-8 w-32 h-32 text-brand-primary-container/5 pointer-events-none rotate-12" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Outcome Metric Highlight Card */}
                  <div className="lg:col-span-5 bg-[#0f131e]/80 border border-brand-outline-variant/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/20 text-brand-primary-container text-xs font-bold uppercase tracking-wider">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Key Metric Growth
                      </span>
                      {currentTestimonial.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {labels.verifiedClient[language]}
                        </span>
                      )}
                    </div>

                    <div className="my-4">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-brand-primary-container tracking-tight mb-2">
                        {currentTestimonial.metric[language]}
                      </h3>
                      <p className="text-sm text-brand-on-surface-variant font-medium">
                        {currentTestimonial.metricSubtitle[language]}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-outline-variant/15 flex flex-col gap-2 text-xs text-brand-on-surface-variant/80">
                      <div className="flex items-center justify-between">
                        <span>Project:</span>
                        <span className="font-semibold text-brand-on-surface">{currentTestimonial.projectType[language]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Timeline:</span>
                        <span className="font-semibold text-brand-on-surface">{currentTestimonial.duration[language]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quote Text, Author Details & Rating */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-brand-on-surface-variant ml-2">5.0 / 5.0</span>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-base md:text-xl font-medium text-brand-on-surface leading-relaxed italic">
                      "{currentTestimonial.quote[language]}"
                    </blockquote>

                    {/* Author & Company Profile */}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-brand-outline-variant/15 flex-wrap">
                      
                      <div className="flex items-center gap-4">
                        <img
                          src={currentTestimonial.avatar}
                          alt={currentTestimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-brand-primary-container/40 shadow-lg"
                        />
                        <div>
                          <h4 className="text-base font-bold text-brand-on-surface flex items-center gap-2">
                            <span>{currentTestimonial.name}</span>
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-brand-on-surface-variant mt-0.5">
                            <span>{currentTestimonial.role[language]}</span>
                            <span>•</span>
                            <span className="text-brand-primary-container font-semibold flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" />
                              {currentTestimonial.company}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3">
                        {onScrollToContact && (
                          <button
                            onClick={onScrollToContact}
                            className="px-4 py-2.5 rounded-xl bg-brand-primary-container text-[#00363a] font-extrabold text-xs hover:brightness-110 transition-all shadow-glow flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{labels.btnConsult[language]}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                    </div>

                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {filteredTestimonials.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 h-2.5 bg-brand-primary-container shadow-[0_0_10px_rgba(77,208,225,0.6)]'
                      : 'w-2.5 h-2.5 bg-brand-outline-variant/30 hover:bg-brand-outline-variant/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
