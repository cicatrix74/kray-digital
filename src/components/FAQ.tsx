import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  Clock, 
  Workflow, 
  CreditCard, 
  Code, 
  MessageSquare, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Maximize2,
  Minimize2,
  Check
} from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

interface FAQProps {
  onScrollToContact?: () => void;
  onOpenCalculator?: (service?: string) => void;
}

interface FAQItem {
  id: string;
  category: 'timelines' | 'guarantees' | 'workflow' | 'pricing' | 'tech';
  question: Record<Language, string>;
  answer: Record<Language, string>;
  bullets?: Record<Language, string[]>;
  badge?: Record<Language, string>;
}

export default function FAQ({ onScrollToContact, onOpenCalculator }: FAQProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'timeline-1': true, // Open first question by default
    'guarantee-1': true
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Content localized strings
  const labels = {
    badge: {
      uk: 'Популярні запитання',
      ru: 'Частые вопросы',
      en: 'Frequently Asked Questions'
    },
    title: {
      uk: 'Все, що вам потрібно знати перед стартом',
      ru: 'Всё, что вам нужно знать перед стартом',
      en: 'Everything you need to know before we begin'
    },
    subtitle: {
      uk: 'Максимальна прозорість у термінах, гарантіях, робочих процесах та розподілі бюджету.',
      ru: 'Максимальная прозрачность в сроках, гарантиях, рабочих процессах и распределении бюджета.',
      en: 'Complete transparency in timelines, guarantees, workflows, and cost structures.'
    },
    searchPlaceholder: {
      uk: 'Шукати запитання (наприклад: терміни, гарантія, оплата)...',
      ru: 'Искать вопрос (например: сроки, гарантия, оплата)...',
      en: 'Search questions (e.g. timelines, guarantee, payment)...'
    },
    cats: {
      all: { uk: 'Всі запитання', ru: 'Все вопросы', en: 'All Questions' },
      timelines: { uk: 'Терміни розробки', ru: 'Сроки разработки', en: 'Timelines & Deadlines' },
      guarantees: { uk: 'Гарантії та KPI', ru: 'Гарантии и KPI', en: 'Guarantees & KPIs' },
      workflow: { uk: 'Процес та комунікація', ru: 'Процесс и коммуникация', en: 'Workflow & Process' },
      pricing: { uk: 'Оплата та ціноутворення', ru: 'Оплата и ценообразование', en: 'Pricing & Billing' },
      tech: { uk: 'Права та технології', ru: 'Права и технологии', en: 'Rights & Technology' }
    },
    expandAll: {
      uk: 'Розгорнути всі',
      ru: 'Развернуть все',
      en: 'Expand All'
    },
    collapseAll: {
      uk: 'Згорнути всі',
      ru: 'Свернуть все',
      en: 'Collapse All'
    },
    notFound: {
      title: { uk: 'Запитання не знайдено', ru: 'Вопрос не найден', en: 'No matching questions found' },
      desc: { uk: 'Спробуйте змінити запит або поставте запитання нашому фахівцю напряму.', ru: 'Попробуйте изменить запрос или задайте вопрос нашему специалисту напрямую.', en: 'Try adjusting your search query or ask our team directly.' }
    },
    copyLink: { uk: 'Скопійовано!', ru: 'Скопировано!', en: 'Copied!' },
    stillHaveQuestions: {
      title: { uk: 'Залишилися індивідуальні запитання?', ru: 'Остались индивидуальные вопросы?', en: 'Have specific custom questions?' },
      desc: { uk: 'Наші технічні ліди дадуть відповідь на будь-яке запитання та розберуть ваш проект безкоштовно.', ru: 'Наши технические лиды ответят на любой вопрос и разберут ваш проект бесплатно.', en: 'Our tech leads will answer any questions and analyze your project free of charge.' },
      btnConsult: { uk: 'Безкоштовна консультація', ru: 'Бесплатная консультация', en: 'Free Consultation' },
      btnCalc: { uk: 'Розрахувати кошторис', ru: 'Рассчитать смету', en: 'Calculate Cost' }
    }
  };

  const faqData: FAQItem[] = [
    {
      id: 'timeline-1',
      category: 'timelines',
      badge: { uk: 'Сроки розробки', ru: 'Сроки разработки', en: 'Timelines' },
      question: {
        uk: 'Скільки часу займає розробка сайту та запуск цифрових кампаній?',
        ru: 'Сколько времени занимает разработка сайта и запуск цифровых кампаний?',
        en: 'How long does website development and marketing campaign setup take?'
      },
      answer: {
        uk: 'Терміни залежать від типу та масштабу проекту. Ми фіксуємо чіткий календарний план у договорі з поетапними дедлайнами.',
        ru: 'Сроки зависят от типа и масштаба проекта. Мы фиксируем четкий календарный план в договоре с поэтапными дедлайнами.',
        en: 'Timelines depend on the project scope and complexity. We lock in a strict timeline schedule in our legal agreement with phase milestones.'
      },
      bullets: {
        uk: [
          'Простий Landing Page / Promo: 10–14 робочих днів.',
          'Корпоративний сайт / Сервіс: 3–5 тижнів.',
          'E-Commerce інтернет-магазин: 4–8 тижнів.',
          'Налаштування Google Ads / PPC: 5–7 робочих днів до першого запуску.',
          'Перші видимі результати в SEO: від 1.5 до 3 місяців за рахунок якісного технічного фундаменту.'
        ],
        ru: [
          'Простой Landing Page / Promo: 10–14 рабочих дней.',
          'Корпоративный сайт / Сервис: 3–5 недель.',
          'E-Commerce интернет-магазин: 4–8 недель.',
          'Настройка Google Ads / PPC: 5–7 рабочих дней до первого запуска.',
          'Первые видимые результаты в SEO: от 1.5 до 3 месяцев благодаря качественному техническому фундаменту.'
        ],
        en: [
          'High-converting Landing Page: 10–14 business days.',
          'Corporate Website / Web Service: 3–5 weeks.',
          'E-Commerce Store with integrations: 4–8 weeks.',
          'Google Ads & PPC Setup: 5–7 business days to launch.',
          'First organic SEO growth results: 1.5 to 3 months due to core technical superiority.'
        ]
      }
    },
    {
      id: 'guarantee-1',
      category: 'guarantees',
      badge: { uk: 'Фіксований бюджет', ru: 'Фиксированный бюджет', en: 'Fixed Cost' },
      question: {
        uk: 'Чи можуть зрости вартість або терміни в процесі розробки?',
        ru: 'Могут ли вырасти стоимость или сроки в процессе разработки?',
        en: 'Can the budget or timeline increase during the development process?'
      },
      answer: {
        uk: 'Ні. Ми працюємо за моделью Fixed Price (Фіксована ціна). Уся функціональність та ТЗ затверджуються перед стартом. Додаткова оплата можлива лише за вашим бажанням розширити початковий функціонал.',
        ru: 'Нет. Мы работаем по модели Fixed Price (Фиксированная цена). Вся функциональность и ТЗ утверждаются до старта. Дополнительная оплата возможна только при вашем желании расширить начальный функционал.',
        en: 'No. We operate strictly under a Fixed Price model. Detailed specifications and scope are fully locked in before kickoff. Costs will only change if you decide to expand the feature scope later.'
      },
      bullets: {
        uk: [
          'Фіксація ціни у підписаному Договорі та ТЗ.',
          'Відсутність прихованих платежів за виправлення або тестування.',
          'Штрафні санкції за затримку дедлайнів з нашої сторони.'
        ],
        ru: [
          'Фиксация цены в подписанном Договоре и ТЗ.',
          'Отсутствие скрытых платежей за правки или тестирование.',
          'Штрафные санкции за задержку дедлайнов с нашей стороны.'
        ],
        en: [
          'Price locked in legally binding contract and specification.',
          'Zero hidden fees for bug fixes or QA testing.',
          'Penalty clause guarantee if we miss agreed launch milestones.'
        ]
      }
    },
    {
      id: 'workflow-1',
      category: 'workflow',
      badge: { uk: 'Комунікація', ru: 'Коммуникация', en: 'Workflow' },
      question: {
        uk: 'Як влаштований процес роботи і як я зможу контролювати хід проекту?',
        ru: 'Как устроен процесс работы и как я смогу контролировать ход проекта?',
        en: 'How is the working process organized and how will I track progress?'
      },
      answer: {
        uk: 'За вашим проектом закріплюється персональний Project Manager. Ви отримуєте доступ до закритого чату, робочої дошки (Notion/Trello) та щотижневих статус-демо.',
        ru: 'За вашим проектом закрепляется персональный Project Manager. Вы получаете доступ к закрытому чату, рабочей доске (Notion/Trello) и еженедельным статус-демо.',
        en: 'A dedicated Project Manager is assigned to your project. You gain access to a client workspace (Notion/Jira/Telegram), live staging links, and weekly sprint demos.'
      },
      bullets: {
        uk: [
          'Персональний PM у Telegram / Slack / Viber.',
          'Живе тестове середовище (Staging URL) для перегляду прогресу в реальному часі.',
          'Еженедельні демо-презентації пророблених етапів.',
          'Гнучкий збір зворотного зв’язку через інтерактивні макети Figma.'
        ],
        ru: [
          'Персональный PM в Telegram / Slack / Viber.',
          'Живая тестовая среда (Staging URL) для просмотра прогресса в реальном времени.',
          'Еженедельные демо-презентации проделанных этапов.',
          'Гибкий сбор обратной связи через интерактивные макеты Figma.'
        ],
        en: [
          'Dedicated PM in Telegram / Slack / Teams.',
          'Live interactive staging link to view progress at any minute.',
          'Weekly video or text progress demos.',
          'Seamless feedback collection directly on interactive Figma wireframes.'
        ]
      }
    },
    {
      id: 'pricing-1',
      category: 'pricing',
      badge: { uk: 'Етапи оплати', ru: 'Этапы оплаты', en: 'Billing' },
      question: {
        uk: 'Який порядок та графік оплати ви пропонуєте?',
        ru: 'Какой порядок и график оплаты вы предлагаете?',
        en: 'What payment schedule and milestones do you offer?'
      },
      answer: {
        uk: 'Зазвичай ми ділимо бюджет на 2–3 етапи (наприклад, 50% аванс та 50% перед запуском на ваш основний домен) або прив’язуємо до здачі конкретних фаз.',
        ru: 'Обычно мы делим бюджет на 2–3 этапа (например, 50% аванс и 50% перед запуском на ваш основной домен) или привязываем к сдаче конкретных фаз.',
        en: 'Typically we divide the project budget into 2–3 milestone payments (e.g. 50% deposit and 50% upon sign-off before production domain deployment).'
      },
      bullets: {
        uk: [
          'Можливість оплати за безготівковим розрахунком з ПДВ або без ПДВ.',
          'Оплата поетапно (Дизайн -> Верстка -> Інтеграція -> Запуск).',
          'Повне закриття актами виконаних робіт.'
        ],
        ru: [
          'Возможность оплаты по безналичному расчету с НДС или без НДС.',
          'Оплата поэтапно (Дизайн -> Верстка -> Интеграция -> Запуск).',
          'Полное закрытие актами выполненных работ.'
        ],
        en: [
          'Official bank transfer with full accounting documents.',
          'Phase-by-phase payments tied to deliverable sign-offs.',
          'Flexible currency options and transparent accounting.'
        ]
      }
    },
    {
      id: 'tech-1',
      category: 'tech',
      badge: { uk: '100% Права', ru: '100% Права', en: 'IP Ownership' },
      question: {
        uk: 'Кому належать права на код, дизайн та домен після завершення розробки?',
        ru: 'Кому принадлежат права на код, дизайн и домен после завершения разработки?',
        en: 'Who owns the intellectual property, source code, and domain after launch?'
      },
      answer: {
        uk: 'Усі інтелектуальні права, вихідний код, графічні файли Figma, домени та акаунти аналітики на 100% передаються вам. Ми не прив’язуємо вас до власної CMS або прихованих підписок.',
        ru: 'Все интеллектуальные права, исходный код, графические файлы Figma, домены и аккаунты аналитики на 100% передаются вам. Мы не привязываем вас к собственной CMS или скрытым подпискам.',
        en: '100% of all intellectual property, full source code repositories, Figma design files, domain credentials, and analytics accounts belong entirely to you without vendor lock-in.'
      },
      bullets: {
        uk: [
          'Передача репозиторію GitHub / GitLab.',
          'Передача оригіналів вихідних макетів Figma.',
          'Прямий доступ до хостингу, серверів та доменних записів.'
        ],
        ru: [
          'Передача репозитория GitHub / GitLab.',
          'Передача оригиналов исходных макетов Figma.',
          'Прямой доступ к хостингу, серверам и доменным записям.'
        ],
        en: [
          'Full source code GitHub/GitLab repository transfer.',
          'Editable original Figma master files.',
          'Full root admin access to hosting, servers, and DNS zones.'
        ]
      }
    },
    {
      id: 'guarantee-2',
      category: 'guarantees',
      badge: { uk: 'Гарантія 30 днів', ru: 'Гарантия 30 дней', en: '30-Day Warranty' },
      question: {
        uk: 'Що відбувається після запуску сайту? Чи є гарантійна підтримка?',
        ru: 'Что происходит после запуска сайта? Есть ли гарантийная поддержка?',
        en: 'What happens after the website launch? Is post-launch warranty included?'
      },
      answer: {
        uk: 'Кожен проект включає безкоштовний період гарантійного обслуговування (від 30 днів), під час якого ми безкоштовно усуваємо будь-які можливі приховані баги та консультуємо вашій команді.',
        ru: 'Каждый проект включает бесплатный период гарантийного обслуживания (от 30 дней), в течение которого мы бесплатно устраняем любые возможные скрытые баги и консультируем вашу команду.',
        en: 'Every project comes with a complimentary 30-day post-launch warranty. We immediately resolve any hidden bugs, offer CMS team training, and monitor uptime.'
      },
      bullets: {
        uk: [
          '30 днів безкоштовного моніторингу та виправлення багів.',
          'Відео-інструкції та навчання вашого персоналу роботі з адмін-панеллю.',
          'Можливість оформлення договору технічної підтримки (SLA 24/7).'
        ],
        ru: [
          '30 дней бесплатного мониторинга и исправления багов.',
          'Видео-инструкции и обучение вашего персонала работе с админ-панелью.',
          'Возможность оформления договора технической поддержки (SLA 24/7).'
        ],
        en: [
          '30 days of proactive monitoring and instant zero-cost bug fixes.',
          'Tailored video tutorials and CMS admin training for your employees.',
          'Optional ongoing technical SLA support and server maintenance.'
        ]
      }
    },
    {
      id: 'tech-2',
      category: 'tech',
      badge: { uk: 'Збереження SEO', ru: 'Сохранение SEO', en: 'SEO Protection' },
      question: {
        uk: 'Якщо ми робимо редизайн існуючого сайту, чи не втратимо ми позиції в Google?',
        ru: 'Если мы делаем редизайн существующего сайта, не потеряем ли мы позиции в Google?',
        en: 'If we redesign our current website, will we lose our existing Google search rankings?'
      },
      answer: {
        uk: 'Ні! Ми проводимо обов’язкову SEO-міграцію: зберігаємо структури URL, налаштовуємо 301-редиректи, переносите всі метадані та семантику, щоб повністю зберегти та навіть підвищити органічний трафік.',
        ru: 'Нет! Мы проводим обязательную SEO-миграцию: сохраняем структуры URL, настраиваем 301-редиректы, переносим все метаданные и семантику, чтобы полностью сохранить и даже повысить органический трафик.',
        en: 'No! We conduct a comprehensive SEO migration audit: mapping URL structures, configuring 301 redirects, preserving meta tags, and schema structured data to safeguard and expand organic search traffic.'
      },
      bullets: {
        uk: [
          'Повний аудит та картографування 100% старих URL адреси.',
          'Налаштування точних 301 редиректів та канонічних тегів.',
          'Збереження швидкості та мікророзмітки (Schema.org / OpenGraph).'
        ],
        ru: [
          'Полный аудит и картирование 100% старых URL адресов.',
          'Настройка точных 301 редиректов и канонических тегов.',
          'Сохранение скорости и микроразметки (Schema.org / OpenGraph).'
        ],
        en: [
          'Full URL mapping audit across 100% of indexed pages.',
          'Automated 301 redirect validation and canonical tag preservation.',
          'Enhanced PageSpeed performance for higher search ranking signals.'
        ]
      }
    },
    {
      id: 'workflow-2',
      category: 'workflow',
      badge: { uk: 'Залученість', ru: 'Вовлеченность', en: 'Client Input' },
      question: {
        uk: 'Що потрібно від нашої компанії для успішного старту?',
        ru: 'Что требуется от нашей компании для успешного старта?',
        en: 'What is required from our side for a smooth project kickoff?'
      },
      answer: {
        uk: 'Мінімум вашого часу! На першій зустрічі ми проведемо коротке інтерв’ю (30–40 хвилин), зберемо вхідні матеріали (логотип, фото, прайси) та самостійно підготуємо бриф і структуру.',
        ru: 'Минимум вашего времени! На первой встрече мы проведем короткое интервью (30–40 минут), соберем входные материалы (логотип, фото, прайсы) и самостоятельно подготовим бриф и структуру.',
        en: 'Minimal time required! In a initial 30-minute discovery call, we gather your primary brand assets and core goals. We handle the heavy lifting, copywriting outlines, and technical mapping ourselves.'
      },
      bullets: {
        uk: [
          'Коротке інтерв’ю із заповненням структурованого брифінгу.',
          'Надання фірмових матеріалів (за наявності).',
          'Затвердження ключових етапів розробки (Концепт -> Макет -> Фінальне прийняття).'
        ],
        ru: [
          'Короткое интервью с заполнением структурированного брифинга.',
          'Предоставление фирменных материалов (при наличии).',
          'Утверждение ключевых этапов разработки (Концепт -> Макет -> Финальная приемка).'
        ],
        en: [
          'Brief 30-minute interactive discovery intake call.',
          'Sharing brand assets/logo files if available (or we create them).',
          'Fast approval on key milestones via 1-click preview links.'
        ]
      }
    }
  ];

  // Filtered FAQ items based on search query and selected category
  const filteredFaqs = useMemo(() => {
    return faqData.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const q = item.question[language].toLowerCase();
        const a = item.answer[language].toLowerCase();
        const b = item.bullets?.[language]?.join(' ').toLowerCase() || '';
        const bg = item.badge?.[language]?.toLowerCase() || '';
        return q.includes(query) || a.includes(query) || b.includes(query) || bg.includes(query);
      }
      return true;
    });
  }, [activeCategory, searchQuery, language]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach(f => {
      allOpen[f.id] = true;
    });
    setOpenItems(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenItems({});
  };

  const areAllExpanded = filteredFaqs.length > 0 && filteredFaqs.every(f => openItems[f.id]);

  const categoryIcons = {
    all: Layers,
    timelines: Clock,
    guarantees: ShieldCheck,
    workflow: Workflow,
    pricing: CreditCard,
    tech: Code
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" id="faq-section">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-primary-container/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-secondary-container/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/20 text-brand-primary-container text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5" />
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

        {/* Search & Category Filter Control Panel */}
        <div className="mb-10 space-y-6">
          
          {/* Live Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-brand-on-surface-variant/60 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={labels.searchPlaceholder[language]}
                className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-brand-surface-container-high/80 border border-brand-outline-variant/20 text-brand-on-surface placeholder:text-brand-on-surface-variant/50 focus:outline-none focus:border-brand-primary-container/60 focus:ring-2 focus:ring-brand-primary-container/15 transition-all text-sm md:text-base shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-brand-on-surface-variant hover:text-brand-on-surface bg-brand-outline-variant/20 hover:bg-brand-outline-variant/40 px-2 py-1 rounded transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs & Expand/Collapse Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-outline-variant/15 pb-4">
            
            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(labels.cats) as Array<keyof typeof labels.cats>).map((catKey) => {
                const IconComponent = categoryIcons[catKey as keyof typeof categoryIcons] || Layers;
                const isActive = activeCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setActiveCategory(catKey)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-primary-container text-[#00363a] font-semibold shadow-md shadow-brand-primary-container/20'
                        : 'bg-brand-surface-container-high/60 text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-container-high border border-brand-outline-variant/15'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{labels.cats[catKey][language]}</span>
                  </button>
                );
              })}
            </div>

            {/* Expand / Collapse All Toggle */}
            <button
              onClick={areAllExpanded ? handleCollapseAll : handleExpandAll}
              className="flex items-center gap-1.5 text-xs text-brand-primary-container hover:text-brand-primary-container/80 transition-colors font-semibold py-1.5 px-3 rounded bg-brand-primary-container/5 border border-brand-primary-container/20 cursor-pointer ml-auto"
            >
              {areAllExpanded ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>{labels.collapseAll[language]}</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{labels.expandAll[language]}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Accordion Questions List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {filteredFaqs.map((faq, index) => {
              const isOpen = !!openItems[faq.id];
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-brand-surface-container-high/90 border-brand-primary-container/40 shadow-xl shadow-brand-primary-container/5' 
                      : 'bg-brand-surface-container-high/50 hover:bg-brand-surface-container-high/70 border-brand-outline-variant/15 hover:border-brand-outline-variant/30'
                  }`}
                >
                  {/* Accordion Header / Question */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5 md:gap-4 pr-2">
                      <div className={`mt-0.5 p-2 rounded-xl flex-shrink-0 transition-colors ${
                        isOpen 
                          ? 'bg-brand-primary-container/20 text-brand-primary-container' 
                          : 'bg-brand-outline-variant/15 text-brand-on-surface-variant group-hover:text-brand-primary-container group-hover:bg-brand-primary-container/10'
                      }`}>
                        <HelpCircle className="w-5 h-5" />
                      </div>

                      <div>
                        {faq.badge && (
                          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-brand-primary-container/10 text-brand-primary-container border border-brand-primary-container/20 mb-2">
                            {faq.badge[language]}
                          </span>
                        )}
                        <h3 className={`text-base md:text-lg font-bold transition-colors ${
                          isOpen ? 'text-brand-primary-container' : 'text-brand-on-surface group-hover:text-brand-primary-container'
                        }`}>
                          {faq.question[language]}
                        </h3>
                      </div>
                    </div>

                    <div className={`p-2 rounded-lg flex-shrink-0 transition-transform duration-300 ${
                      isOpen 
                        ? 'rotate-180 bg-brand-primary-container/20 text-brand-primary-container' 
                        : 'bg-brand-outline-variant/10 text-brand-on-surface-variant group-hover:text-brand-on-surface'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Expandable Answer Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-7 pt-1 border-t border-brand-outline-variant/10">
                          
                          {/* Main Paragraph Answer */}
                          <p className="text-sm md:text-base text-brand-on-surface-variant leading-relaxed mb-4 font-normal">
                            {faq.answer[language]}
                          </p>

                          {/* Bullet points if available */}
                          {faq.bullets && faq.bullets[language] && (
                            <div className="bg-[#0f131e]/60 rounded-xl p-4 border border-brand-outline-variant/10 mb-4 space-y-2.5">
                              {faq.bullets[language].map((bullet, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-brand-on-surface-variant">
                                  <CheckCircle2 className="w-4 h-4 text-brand-primary-container flex-shrink-0 mt-0.5" />
                                  <span>{bullet}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Action Bar inside question */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                            <span className="text-brand-on-surface-variant/60 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-brand-primary-container" />
                              Kray Digital Guarantee
                            </span>

                            {onOpenCalculator && (
                              <button
                                onClick={() => onOpenCalculator(faq.category)}
                                className="text-brand-primary-container hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <span>{labels.stillHaveQuestions.btnCalc[language]}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State if search/filter returns nothing */
          <div className="text-center py-12 px-4 bg-brand-surface-container-high/40 rounded-2xl border border-brand-outline-variant/15 max-w-xl mx-auto">
            <HelpCircle className="w-12 h-12 text-brand-on-surface-variant/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brand-on-surface mb-1">{labels.notFound.title[language]}</h3>
            <p className="text-sm text-brand-on-surface-variant mb-5">{labels.notFound.desc[language]}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-brand-primary-container text-[#00363a] font-semibold text-xs rounded hover:brightness-110 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Still Have Questions CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-brand-surface-container-high/90 via-[#161c28]/80 to-brand-surface-container-high/90 border border-brand-primary-container/30 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-xl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-brand-primary-container text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Direct Expert Line</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-brand-on-surface mb-2">
              {labels.stillHaveQuestions.title[language]}
            </h3>
            <p className="text-sm text-brand-on-surface-variant leading-relaxed">
              {labels.stillHaveQuestions.desc[language]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            {onOpenCalculator && (
              <button
                onClick={() => onOpenCalculator('')}
                className="px-5 py-3 rounded-lg bg-brand-surface-container-high border border-brand-outline-variant/30 text-brand-on-surface text-xs md:text-sm font-semibold hover:border-brand-primary-container/40 transition-all cursor-pointer"
              >
                {labels.stillHaveQuestions.btnCalc[language]}
              </button>
            )}

            {onScrollToContact && (
              <button
                onClick={onScrollToContact}
                className="px-6 py-3 rounded-lg bg-brand-primary-container text-[#00363a] text-xs md:text-sm font-extrabold hover:brightness-110 transition-all shadow-glow flex items-center gap-2 cursor-pointer"
              >
                <span>{labels.stillHaveQuestions.btnConsult[language]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
