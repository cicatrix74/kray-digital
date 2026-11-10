import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  FileText, 
  UserCheck, 
  Zap, 
  SlidersHorizontal,
  ChevronDown,
  Info,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectRoadmapProps {
  onOpenCalculator: (servicePreset?: string) => void;
  onScrollToContact: () => void;
}

type ProjectType = 'web' | 'seo' | 'ads' | 'rebrand';

interface Phase {
  id: string;
  stepNumber: string;
  title: Record<string, string>;
  duration: Record<string, string>;
  daysCount: number; // for visual percentage bar
  percentageShare: number;
  description: Record<string, string>;
  icon: React.ElementType;
  color: string;
  badgeColor: string;
  deliverables: Record<string, string[]>;
  clientRole: Record<string, string>;
  transparencyGuarantee: Record<string, string>;
}

export default function ProjectRoadmap({ onOpenCalculator, onScrollToContact }: ProjectRoadmapProps) {
  const { language } = useLanguage();
  const [activePreset, setActivePreset] = useState<ProjectType>('web');
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | null>('p1');
  const [viewMode, setViewMode] = useState<'cards' | 'gantt'>('cards');
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});

  const presetLabels: Record<ProjectType, Record<string, string>> = {
    web: {
      uk: 'Web-сайт & Інтернет-магазин',
      ru: 'Web-сайт и Интернет-магазин',
      en: 'Web App & E-Commerce'
    },
    seo: {
      uk: 'SEO-оптимізація та Ранжування',
      ru: 'SEO-оптимизация и Ранжирование',
      en: 'SEO Optimization & Growth'
    },
    ads: {
      uk: 'Контекстна реклама Google Ads',
      ru: 'Контекстная реклама Google Ads',
      en: 'Google Ads & PPC Campaign'
    },
    rebrand: {
      uk: 'Ребрендинг & UX/UI Дизайн',
      ru: 'Ребрендинг и UX/UI Дизайн',
      en: 'Brand & UX/UI Redesign'
    }
  };

  const presetDurations: Record<ProjectType, Record<string, string>> = {
    web: {
      uk: '3–5 тижнів',
      ru: '3–5 недель',
      en: '3–5 weeks'
    },
    seo: {
      uk: 'від 2 місяців',
      ru: 'от 2 месяцев',
      en: 'from 2 months'
    },
    ads: {
      uk: '7–12 днів',
      ru: '7–12 дней',
      en: '7–12 days'
    },
    rebrand: {
      uk: '2–3 тижні',
      ru: '2–3 недели',
      en: '2–3 weeks'
    }
  };

  const phasesData: Record<ProjectType, Phase[]> = {
    web: [
      {
        id: 'p1',
        stepNumber: '01',
        title: {
          uk: 'Discovery & Аналітика',
          ru: 'Discovery и Аналитика',
          en: 'Discovery & Strategy'
        },
        duration: {
          uk: '3–5 днів',
          ru: '3–5 дней',
          en: '3–5 days'
        },
        daysCount: 4,
        percentageShare: 15,
        description: {
          uk: 'Глибоке занурення у бізнес, аналіз конкурентів, складання ТЗ та карти опису архітектури.',
          ru: 'Глубокое погружение в бизнес, анализ конкурентов, составление ТЗ и карты архитектуры.',
          en: 'In-depth business audit, competitor evaluation, detailed specs, and sitemap wireframing.'
        },
        icon: Search,
        color: 'from-cyan-500 to-blue-500',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        deliverables: {
          uk: [
            'Деталізоване Технічне Завдання (ТЗ)',
            'Інтерактивна карта сайту (Sitemap)',
            'Аналіз топових конкурентів у ніші',
            'Фіксація бюджету та чітких дедлайнів'
          ],
          ru: [
            'Детализированное Техническое Задание (ТЗ)',
            'Интерактивная карта сайта (Sitemap)',
            'Анализ топовых конкурентов в нише',
            'Фиксация бюджета и четких дедлайнов'
          ],
          en: [
            'Detailed Technical Specification (SRS)',
            'Interactive Sitemap & Wireframes',
            'Competitor & Audience Analysis',
            'Fixed Price & Milestone Timeline Guarantee'
          ]
        },
        clientRole: {
          uk: 'Заповнення брифу (20 хв) + вступний зідзвін з техлідом.',
          ru: 'Заполнение брифа (20 мин) + вводный созвон с техлидом.',
          en: 'Briefing questionnaire (20 mins) + kickoff call with project lead.'
        },
        transparencyGuarantee: {
          uk: 'Фіксована ціна. Жодних прихованих доплат після підписання договору.',
          ru: 'Фиксированная цена. Никаких скрытых доплат после подписания договора.',
          en: '100% Fixed Price contract. No scope creep or surprise invoices.'
        }
      },
      {
        id: 'p2',
        stepNumber: '02',
        title: {
          uk: 'UI/UX Дизайн & Figma',
          ru: 'UI/UX Дизайн и Figma',
          en: 'UI/UX Design & Figma'
        },
        duration: {
          uk: '7–10 днів',
          ru: '7–10 дней',
          en: '7–10 days'
        },
        daysCount: 8,
        percentageShare: 25,
        description: {
          uk: 'Створення унікального візуального стилю, клікабельного Figma-прототипу та адаптивів.',
          ru: 'Создание уникального визуального стиля, кликабельного Figma-прототипа и адаптивов.',
          en: 'Creating a modern visual brand identity, interactive Figma prototype, and mobile layouts.'
        },
        icon: Palette,
        color: 'from-teal-400 to-emerald-500',
        badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
        deliverables: {
          uk: [
            'Клікабельний інтерактивний прототип у Figma',
            'Адаптивні дизайни для Mobile, Tablet та Desktop',
            'Ui Kit (кольорова гама, шрифти, компоненти)',
            'Анімаційні мікроінтерактиви та стани кнопок'
          ],
          ru: [
            'Кликабельный интерактивный прототип в Figma',
            'Адаптивные дизайны для Mobile, Tablet и Desktop',
            'UI Kit (цветовая гамма, шрифты, компоненты)',
            'Анимационные микроинтерактивы и состояния кнопок'
          ],
          en: [
            'Clickable Figma Prototype with live interactions',
            'Fully responsive Mobile, Tablet & Desktop UI',
            'Comprehensive UI Kit & Typography scale',
            'Custom micro-animations & state feedback'
          ]
        },
        clientRole: {
          uk: 'Перегляд та узгодження концепту у зручному форматі.',
          ru: 'Просмотр и согласование концепта в удобном формате.',
          en: 'Design review and approval in Figma / screen-share session.'
        },
        transparencyGuarantee: {
          uk: 'Безлімітні правки в межах ТЗ до повного задоволення результатом.',
          ru: 'Безлимитные правки в рамках ТЗ до полного удовлетворения результатом.',
          en: 'Revisions within scope until you love every screen.'
        }
      },
      {
        id: 'p3',
        stepNumber: '03',
        title: {
          uk: 'Frontend & Backend Код',
          ru: 'Frontend и Backend Код',
          en: 'Development & Integrations'
        },
        duration: {
          uk: '10–18 днів',
          ru: '10–18 дней',
          en: '10–18 days'
        },
        daysCount: 14,
        percentageShare: 40,
        description: {
          uk: 'Розробка на React/TypeScript, швидка верстка, підключення CRM, платіжок та месенджерів.',
          ru: 'Разработка на React/TypeScript, быстрая верстка, подключение CRM, платежек и мессенджеров.',
          en: 'Production-grade React/TypeScript code, backend routes, CRM, payments, and Telegram alerts.'
        },
        icon: Code2,
        color: 'from-cyan-400 to-teal-400',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        deliverables: {
          uk: [
            'Чистий React / TypeScript / Tailwind CSS код',
            'Інтеграція CRM (HubSpot, KeyCRM, Notion або кастом)',
            'Підключення платежів (LiqPay, Stripe, WayForPay)',
            'Сповіщення про заявки в Telegram / Email'
          ],
          ru: [
            'Чистый React / TypeScript / Tailwind CSS код',
            'Интеграция CRM (HubSpot, KeyCRM, Notion или кастом)',
            'Подключение платежей (LiqPay, Stripe, WayForPay)',
            'Уведомления о заявках в Telegram / Email'
          ],
          en: [
            'Clean React / TypeScript / Tailwind CSS codebase',
            'CRM Integration (KeyCRM, HubSpot, custom dashboard)',
            'Payment Gateways (Stripe, LiqPay, Apple/Google Pay)',
            'Real-time Telegram & Email instant lead alerts'
          ]
        },
        clientRole: {
          uk: 'Надання доступів до платіжних систем або контенту (за наявності).',
          ru: 'Предоставление доступов к платежным системам или контенту (при наличии).',
          en: 'Providing API keys / account credentials when ready.'
        },
        transparencyGuarantee: {
          uk: 'Доступ до тестового сервера (Staging URL) для відстеження розробки в реальному часі.',
          ru: 'Доступ к тестовому серверу (Staging URL) для отслеживания разработки в реальном времени.',
          en: 'Live Staging Server access so you can watch live progress daily.'
        }
      },
      {
        id: 'p4',
        stepNumber: '04',
        title: {
          uk: 'QA, Speed & Безпека',
          ru: 'QA, Speed и Безопасность',
          en: 'QA & Speed Optimization'
        },
        duration: {
          uk: '3–5 днів',
          ru: '3–5 дней',
          en: '3–5 days'
        },
        daysCount: 4,
        percentageShare: 10,
        description: {
          uk: 'Тестування на 15+ пристроях, досягнення PageSpeed 90+ балів, базове SEO та безпека.',
          ru: 'Тестирование на 15+ устройствах, достижение PageSpeed 90+ баллов, базовое SEO и безопасность.',
          en: 'Testing across 15+ real devices, Lighthouse 90+ speed score, SEO tags, and security scan.'
        },
        icon: ShieldCheck,
        color: 'from-emerald-400 to-green-500',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        deliverables: {
          uk: [
            'Тестування кросбраузерності та мобільних гаджетів',
            'Оптимізація швидкості Google PageSpeed (90+ Green Zone)',
            'Базова SEO-підготовка (Schema.org, OpenGraph, Meta)',
            'Перевірка безпеки та SSL-сертифікатів'
          ],
          ru: [
            'Тестирование кроссбраузерности и мобильных гаджетов',
            'Оптимизация скорости Google PageSpeed (90+ Green Zone)',
            'Базовая SEO-подготовка (Schema.org, OpenGraph, Meta)',
            'Проверка безопасности и SSL-сертификатов'
          ],
          en: [
            'Cross-browser and mobile device responsiveness QA',
            'Google PageSpeed performance boost (90+ Green score)',
            'On-page SEO setup (JSON-LD Schema, OpenGraph, Meta)',
            'OWASP security scan & SSL HTTPS configuration'
          ]
        },
        clientRole: {
          uk: 'Фінальний прийом проекту за чек-листом.',
          ru: 'Финальный прием проекта по чек-листу.',
          en: 'Final sign-off against the project acceptance checklist.'
        },
        transparencyGuarantee: {
          uk: 'Гарантія 0 критичних помилок перед релізом.',
          ru: 'Гарантия 0 критических ошибок перед релизом.',
          en: 'Zero critical bugs guarantee prior to launch.'
        }
      },
      {
        id: 'p5',
        stepNumber: '05',
        title: {
          uk: 'Реліз & Підтримка',
          ru: 'Релиз и Поддержка',
          en: 'Launch & 30-Day Support'
        },
        duration: {
          uk: '1–2 дні (+ 30 днів)',
          ru: '1–2 дня (+ 30 дней)',
          en: '1–2 days (+ 30 days)'
        },
        daysCount: 2,
        percentageShare: 10,
        description: {
          uk: 'Перенос на хостинг/домен, налаштування аналітики (GA4, Meta Pixel) та 30 днів гарантії.',
          ru: 'Перенос на хостинг/домен, настройка аналитики (GA4, Meta Pixel) и 30 дней гарантии.',
          en: 'Production deployment, Google Analytics 4, Meta Pixel setup, and 30-day warranty.'
        },
        icon: Rocket,
        color: 'from-blue-400 to-indigo-500',
        badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        deliverables: {
          uk: [
            'Деплой на прод-сервер та привʼязка домену',
            'Підключення Google Analytics 4 & Tag Manager',
            'Навчання вашої команди управлінню сайтом',
            '30 днів безкоштовного гарантійного обслуговування'
          ],
          ru: [
            'Деплой на прод-сервер и привязка домена',
            'Подключение Google Analytics 4 & Tag Manager',
            'Обучение вашей команды управлению сайтом',
            '30 дней бесплатного гарантийного обслуживания'
          ],
          en: [
            'Deployment to high-speed CDN & custom DNS linkage',
            'Google Analytics 4 & Google Tag Manager configuration',
            'CMS & Admin panel training session for your team',
            '30 days of free post-launch support and warranty'
          ]
        },
        clientRole: {
          uk: 'Надання доступу до реєстратора домену.',
          ru: 'Предоставление доступа к регистратору домена.',
          en: 'Granting domain DNS record access.'
        },
        transparencyGuarantee: {
          uk: 'Персональний менеджер на звʼязку навіть після завершення проекту.',
          ru: 'Персональный менеджер на связи даже после завершения проекта.',
          en: 'Dedicated tech manager assistance post-launch.'
        }
      }
    ],
    seo: [
      {
        id: 'seo1',
        stepNumber: '01',
        title: {
          uk: 'Технічний SEO-аудит',
          ru: 'Технический SEO-аудит',
          en: 'Technical Audit & Key-research'
        },
        duration: {
          uk: '5–7 днів',
          ru: '5–7 дней',
          en: '5–7 days'
        },
        daysCount: 6,
        percentageShare: 20,
        description: {
          uk: 'Аналіз помилок індексації, дублів, збір семантичного ядра та кластеризація запитів.',
          ru: 'Анализ ошибок индексации, дублей, сбор семантического ядра и кластеризация запросов.',
          en: 'In-depth audit of crawl issues, duplicate content, full keyword cluster research.'
        },
        icon: Search,
        color: 'from-cyan-500 to-blue-500',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        deliverables: {
          uk: ['SEO-аудит на 40+ пунктів', 'Смантичне ядро (100–1000+ запитів)', 'Технічне завдання для програмістів'],
          ru: ['SEO-аудит на 40+ пунктов', 'Семантическое ядро (100–1000+ запросов)', 'Техническое задание для программистов'],
          en: ['40+ Point Technical SEO Audit', 'Keyword Semantic Core (100–1000+ keywords)', 'Developer Technical Specification']
        },
        clientRole: {
          uk: 'Надання доступів до Google Search Console та Analytics.',
          ru: 'Предоставление доступов к Google Search Console и Analytics.',
          en: 'Granting Google Search Console & Analytics access.'
        },
        transparencyGuarantee: {
          uk: 'Прозорий план робіт на 3 місяці наперед.',
          ru: 'Прозрачный план работ на 3 месяца вперед.',
          en: 'Transparent 3-month roadmap with clear deliverables.'
        }
      },
      {
        id: 'seo2',
        stepNumber: '02',
        title: {
          uk: 'On-Page Оптимізація',
          ru: 'On-Page Оптимизация',
          en: 'On-Page & Structure Optimization'
        },
        duration: {
          uk: '15–20 днів',
          ru: '15–20 дней',
          en: '15–20 days'
        },
        daysCount: 18,
        percentageShare: 35,
        description: {
          uk: 'Виправлення технічних помилок, оптимізація тегів Title/H1/Meta, внутрішня перелінковка.',
          ru: 'Исправление технических ошибок, оптимизация тегов Title/H1/Meta, внутренняя перелинковка.',
          en: 'Fixing technical errors, Title/H1/Meta tag updates, internal linking architecture.'
        },
        icon: FileText,
        color: 'from-teal-400 to-emerald-500',
        badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
        deliverables: {
          uk: ['Оптимізація метатегів усіх важливих сторінок', 'Впровадження мікророзмітки Schema.org', 'ТЗ на написання SEO-статей'],
          ru: ['Оптимизация метатегов всех важных страниц', 'Внедрение микроразметки Schema.org', 'ТЗ на написание SEO-статей'],
          en: ['Meta Tags optimization across core pages', 'Schema.org JSON-LD structured data', 'SEO Copywriting brief creation']
        },
        clientRole: {
          uk: 'Затвердження контент-плану.',
          ru: 'Утверждение контент-плана.',
          en: 'Content plan review and sign-off.'
        },
        transparencyGuarantee: {
          uk: 'Звіт про кожну виправлену помилку.',
          ru: 'Отчет о каждой исправленной ошибке.',
          en: 'Itemized log of every technical issue fixed.'
        }
      },
      {
        id: 'seo3',
        stepNumber: '03',
        title: {
          uk: 'Off-Page & Лінкбілдинг',
          ru: 'Off-Page и Линкбилдинг',
          en: 'Linkbuilding & Authority Boost'
        },
        duration: {
          uk: 'Щомісячно',
          ru: 'Ежемесячно',
          en: 'Monthly ongoing'
        },
        daysCount: 30,
        percentageShare: 45,
        description: {
          uk: 'Нарощування якісної маси посилань з авторитетних ресурсів (Outreach, гест-пости, крауд).',
          ru: 'Наращивание качественной ссылочной массы с авторитетных ресурсов (Outreach, гест-посты, крауд).',
          en: 'Building domain authority via white-hat outreach, guest posts, and press releases.'
        },
        icon: Rocket,
        color: 'from-cyan-400 to-teal-400',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        deliverables: {
          uk: ['Розміщення вічних посилань на трастових сайтах', 'Щомісячні звіти за позиціями в ТОП-10', 'Зростання органічного трафіку'],
          ru: ['Размещение вечных ссылок на трастовых сайтах', 'Ежемесячные отчеты по позициям в ТОП-10', 'Рост органического трафика'],
          en: ['High-DR contextual backlinks placement', 'Monthly Google rank tracking reports', 'Organic traffic & conversion stats']
        },
        clientRole: {
          uk: 'Ознайомлення з щомісячними дашбордами.',
          ru: 'Ознакомление с ежемесячными дашбордами.',
          en: 'Reviewing monthly performance dashboards.'
        },
        transparencyGuarantee: {
          uk: 'Тільки безпечні White-Hat методи просування.',
          ru: 'Только безопасные White-Hat методы продвижения.',
          en: 'Strict 100% White-Hat SEO techniques only.'
        }
      }
    ],
    ads: [
      {
        id: 'ads1',
        stepNumber: '01',
        title: {
          uk: 'Стратегія & Аналіз',
          ru: 'Стратегия и Анализ',
          en: 'PPC Strategy & Keywords'
        },
        duration: {
          uk: '2–3 дні',
          ru: '2–3 дня',
          en: '2–3 days'
        },
        daysCount: 3,
        percentageShare: 30,
        description: {
          uk: 'Збір цільових пошукових запитів, мінус-слів, аналіз ставок конкурентів.',
          ru: 'Сбор целевых поисковых запросов, минус-слов, анализ ставок конкурентов.',
          en: 'High-intent search query research, negative keyword list, competitor bid analysis.'
        },
        icon: Search,
        color: 'from-cyan-500 to-blue-500',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        deliverables: {
          uk: ['Семантичне ядро для пошукової реклами', 'Список мінус-слів', 'Прогноз бюджету та окупності (ROAS)'],
          ru: ['Семантическое ядро для поисковой рекламы', 'Список минус-слов', 'Прогноз бюджета и окупаемости (ROAS)'],
          en: ['Target keyword clusters', 'Comprehensive negative keywords', 'ROAS & budget estimate forecast']
        },
        clientRole: {
          uk: 'Узгодження денного рекламного бюджету.',
          ru: 'Согласование дневного рекламного бюджета.',
          en: 'Approving daily advertising spend.'
        },
        transparencyGuarantee: {
          uk: 'Рекламний кабінет створюється на вашому акаунті.',
          ru: 'Рекламный кабинет создается на вашем аккаунте.',
          en: 'Ad accounts are created directly under your ownership.'
        }
      },
      {
        id: 'ads2',
        stepNumber: '02',
        title: {
          uk: 'Налаштування & Креативи',
          ru: 'Настройка и Креативы',
          en: 'Campaign Setup & Creatives'
        },
        duration: {
          uk: '3–4 дні',
          ru: '3–4 дня',
          en: '3–4 days'
        },
        daysCount: 4,
        percentageShare: 40,
        description: {
          uk: 'Написання рекламних оголошень, налаштування конверсій та баннерів для Performance Max.',
          ru: 'Написание рекламных объявлений, настройка конверсий и баннеров для Performance Max.',
          en: 'Ad copywriting, conversion tracking, assets creation for Google Performance Max & Search.'
        },
        icon: Palette,
        color: 'from-teal-400 to-emerald-500',
        badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
        deliverables: {
          uk: ['Налаштування Google Search, Performance Max, Remarketing', 'Створення продаючих оголошень', 'Налаштування відстеження лідів у GA4'],
          ru: ['Настройка Google Search, Performance Max, Remarketing', 'Создание продающих объявлений', 'Настройка отслеживания лидов в GA4'],
          en: ['Google Search & Performance Max campaigns', 'Persuasive ad copies & visual assets', 'GA4 conversion tracking setup']
        },
        clientRole: {
          uk: 'Поповнення рекламного балансу Google.',
          ru: 'Пополнение рекламного баланса Google.',
          en: 'Funding Google Ads account billing.'
        },
        transparencyGuarantee: {
          uk: 'Повний контроль над бюджетом без комісій з кліків.',
          ru: 'Полный контроль над бюджетом без комиссий с кликов.',
          en: 'Direct billing — 0% commission markup on ad clicks.'
        }
      },
      {
        id: 'ads3',
        stepNumber: '03',
        title: {
          uk: 'Запуск & A/B Оптимізація',
          ru: 'Запуск и A/B Оптимизация',
          en: 'Launch & Optimization'
        },
        duration: {
          uk: 'Безперервно',
          ru: 'Непрерывно',
          en: 'Continuous'
        },
        daysCount: 14,
        percentageShare: 30,
        description: {
          uk: 'Моніторинг лідів, виключення нерелевантних запитів, зниження вартості конверсії (CPA).',
          ru: 'Мониторинг лидов, исключение нерелевантных запросов, снижение стоимости конверсии (CPA).',
          en: 'Daily lead tracking, negative term additions, lowering cost-per-acquisition (CPA).'
        },
        icon: Zap,
        color: 'from-emerald-400 to-green-500',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        deliverables: {
          uk: ['Щотижневе чищення нецільового трафіку', 'A/B тестування оголошень', 'Звітність з вартості кліка (CPC) та ліда (CPL)'],
          ru: ['Еженедельная чистка нецелевого трафика', 'A/B тестирование объявлений', 'Отчетность по стоимости клика (CPC) и лида (CPL)'],
          en: ['Weekly search term filtering', 'Ad copy A/B split testing', 'Clear CPC, CPL & ROAS reporting']
        },
        clientRole: {
          uk: 'Зворотний звʼязок про якість лідів.',
          ru: 'Обратная связь о качестве лидов.',
          en: 'Feedback on lead conversion quality.'
        },
        transparencyGuarantee: {
          uk: 'Щотижневі зрозумілі звіти у Looker Studio.',
          ru: 'Еженедельные понятные отчеты в Looker Studio.',
          en: 'Real-time interactive Looker Studio reporting dashboard.'
        }
      }
    ],
    rebrand: [
      {
        id: 'reb1',
        stepNumber: '01',
        title: {
          uk: 'Аудит Бренд-ідеології',
          ru: 'Аудит Бренд-идеологии',
          en: 'Brand Audit & Positioning'
        },
        duration: {
          uk: '3–4 дні',
          ru: '3–4 дня',
          en: '3–4 days'
        },
        daysCount: 4,
        percentageShare: 25,
        description: {
          uk: 'Аналіз поточного сприйняття бренду, позиціонування та визначення ключових метафор.',
          ru: 'Анализ текущего восприятия бренда, позиционирования и определение ключевых метафор.',
          en: 'Evaluating current brand perception, market positioning, and core visual identity guidelines.'
        },
        icon: Search,
        color: 'from-cyan-500 to-blue-500',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        deliverables: {
          uk: ['Мудборди візуальних напрямків', 'Концептуальна платформа бренду', 'Аналіз брендів конкурентів'],
          ru: ['Мудборды визуальных направлений', 'Концептуальная платформа бренда', 'Анализ брендов конкурентов'],
          en: ['Visual moodboards & creative directions', 'Brand platform & messaging hierarchy', 'Competitor visual audit']
        },
        clientRole: {
          uk: 'Вибір улюбленого мудборду.',
          ru: 'Выбор любимого мудборда.',
          en: 'Selecting preferred visual direction.'
        },
        transparencyGuarantee: {
          uk: '3 різнопланові концепції на вибір.',
          ru: '3 разноплановые концепции на выбор.',
          en: '3 distinct creative concepts presented.'
        }
      },
      {
        id: 'reb2',
        stepNumber: '02',
        title: {
          uk: 'Дизайн Логотипу & Айдентики',
          ru: 'Дизайн Логотипа и Айдентики',
          en: 'Logo & Visual Identity'
        },
        duration: {
          uk: '7–10 днів',
          ru: '7–10 дней',
          en: '7–10 days'
        },
        daysCount: 8,
        percentageShare: 50,
        description: {
          uk: 'Отрисовка логотипу, підбір фірмової палітри, шрифтних пар та графічних елементів.',
          ru: 'Отрисовка логотипа, подбор фирменной палитры, шрифтовых пар и графических элементов.',
          en: 'Designing primary logo, custom color palette, typography pairs, and key visual assets.'
        },
        icon: Palette,
        color: 'from-teal-400 to-emerald-500',
        badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
        deliverables: {
          uk: ['Логотип у векторах (SVG, EPS, PNG)', 'Фірмова колірна гама (HEX, CMYK, Pantone)', 'Комплект брендованої графіки'],
          ru: ['Логотип в векторах (SVG, EPS, PNG)', 'Фирменная цветовая гамма (HEX, CMYK, Pantone)', 'Комплект брендированной графики'],
          en: ['Vector Logo formats (SVG, EPS, AI, PNG)', 'Brand color palette (HEX, RGB, CMYK)', 'Branded visual assets & icons']
        },
        clientRole: {
          uk: 'Узгодження фінального логотипу.',
          ru: 'Согласование финального логотипа.',
          en: 'Final logo sign-off.'
        },
        transparencyGuarantee: {
          uk: 'Повна передача авторських прав.',
          ru: 'Полная передача авторских прав.',
          en: 'Full intellectual property copyright transfer.'
        }
      },
      {
        id: 'reb3',
        stepNumber: '03',
        title: {
          uk: 'Брендбук & Носії',
          ru: 'Брендбук и Носители',
          en: 'Brandbook & Asset Deployment'
        },
        duration: {
          uk: '3–5 днів',
          ru: '3–5 дней',
          en: '3–5 days'
        },
        daysCount: 4,
        percentageShare: 25,
        description: {
          uk: 'Оформлення гайдбуку (Brandbook) та адаптація на носії: візитки, соцмережі, мерч.',
          ru: 'Оформление гайдбука (Brandbook) и адаптация на носители: визитки, соцсети, мерч.',
          en: 'Compiling Brand Guidelines PDF and adapting assets for social media, print, and merch.'
        },
        icon: Rocket,
        color: 'from-emerald-400 to-green-500',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        deliverables: {
          uk: ['Детальний Brandbook у PDF', 'Шаблони для Instagram/Facebook', 'Макмети поліграфії та презентацій'],
          ru: ['Детальный Brandbook в PDF', 'Шаблоны для Instagram/Facebook', 'Макеты полиграфии и презентаций'],
          en: ['Comprehensive Brandbook PDF', 'Social Media banners & templates', 'Print & presentation slide templates']
        },
        clientRole: {
          uk: 'Прийом готових архівних файлів.',
          ru: 'Прием готовых архивных файлов.',
          en: 'Receiving final master vector files.'
        },
        transparencyGuarantee: {
          uk: 'Усі вихідні векторні файли у вашу власність.',
          ru: 'Все исходные векторные файлы в вашу собственность.',
          en: 'All vector source files provided in high resolution.'
        }
      }
    ]
  };

  const currentPhases = phasesData[activePreset];

  // Helper for text based on active lang with fallbacks
  const getLangText = (obj: Record<string, string>) => {
    return obj[language] || obj['uk'] || obj['en'] || '';
  };

  const getLangArray = (obj: Record<string, string[]>) => {
    return obj[language] || obj['uk'] || obj['en'] || [];
  };

  const toggleChecklist = (key: string) => {
    setCompletedChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section id="roadmap-section" className="py-24 px-4 md:px-10 max-w-7xl mx-auto relative z-20">
      
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/30 text-brand-primary-container text-xs font-bold uppercase tracking-wider mb-4">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>
            {language === 'uk' ? 'Прозорість Виробничого Циклу' : language === 'ru' ? 'Прозрачность Производственного Цикла' : 'Production Cycle Transparency'}
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-brand-on-background tracking-tight mb-4">
          {language === 'uk' ? (
            <>Дорожня Карта <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-container via-teal-300 to-cyan-400">Проекту & Терміни</span></>
          ) : language === 'ru' ? (
            <>Дорожная Карта <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-container via-teal-300 to-cyan-400">Проекта и Сроки</span></>
          ) : (
            <>Visual Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-container via-teal-300 to-cyan-400">Roadmap & Durations</span></>
          )}
        </h2>

        <p className="text-brand-on-surface-variant text-sm md:text-base leading-relaxed">
          {language === 'uk' ? (
            'Жодних "завтраків" чи непередбачених затримок. Ми гарантуємо точний графік виконання кожного етапу з контролем якості та прозорою звітністю.'
          ) : language === 'ru' ? (
            'Никаких "завтраков" или непредвиденных задержек. Мы гарантируем точный график выполнения каждого этапа с контролем качества и прозрачной отчетностью.'
          ) : (
            'No missed deadlines or vague promises. Clear phase breakdowns, fixed timelines, and full transparency from kickoff to production launch.'
          )}
        </p>

        {/* Preset Selector Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3 p-1.5 rounded-2xl bg-brand-surface-container/80 border border-brand-outline-variant/30 backdrop-blur-md">
          {(Object.keys(presetLabels) as ProjectType[]).map((type) => {
            const isActive = activePreset === type;
            return (
              <button
                key={type}
                onClick={() => {
                  setActivePreset(type);
                  setExpandedPhaseId(phasesData[type][0]?.id || null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary-container text-[#00363a] shadow-glow font-bold scale-[1.02]'
                    : 'text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-container-high/50'
                }`}
              >
                <span>{presetLabels[type][language] || presetLabels[type]['uk']}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-medium ${
                  isActive ? 'bg-[#00363a]/15 text-[#00363a]' : 'bg-brand-surface-container-high text-brand-on-surface-variant'
                }`}>
                  {presetDurations[type][language] || presetDurations[type]['uk']}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Controls & View Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-brand-surface-container/50 p-4 rounded-xl border border-brand-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-primary-container/10 text-brand-primary-container flex items-center justify-center font-bold font-mono text-sm">
            {currentPhases.length}
          </div>
          <div>
            <div className="text-xs font-semibold text-brand-on-surface">
              {language === 'uk' ? 'Обрано напрямок:' : language === 'ru' ? 'Выбрано направление:' : 'Active Direction:'} {' '}
              <span className="text-brand-primary-container font-bold">{presetLabels[activePreset][language] || presetLabels[activePreset]['uk']}</span>
            </div>
            <div className="text-[11px] text-brand-on-surface-variant">
              {language === 'uk' ? 'Загальна орієнтовна тривалість:' : language === 'ru' ? 'Общая ориентировочная длительность:' : 'Total estimated project duration:'} {' '}
              <span className="font-semibold text-brand-on-surface">{presetDurations[activePreset][language] || presetDurations[activePreset]['uk']}</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-brand-surface-container-high/80 p-1 rounded-lg border border-brand-outline-variant/30 text-xs font-medium">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'cards' 
                ? 'bg-brand-primary-container text-[#00363a] font-bold shadow-sm' 
                : 'text-brand-on-surface-variant hover:text-brand-on-surface'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'uk' ? 'Картки Етапів' : language === 'ru' ? 'Карточки Этапов' : 'Phase Cards'}</span>
          </button>
          <button
            onClick={() => setViewMode('gantt')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'gantt' 
                ? 'bg-brand-primary-container text-[#00363a] font-bold shadow-sm' 
                : 'text-brand-on-surface-variant hover:text-brand-on-surface'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{language === 'uk' ? 'Шкала Gantt' : language === 'ru' ? 'Шкала Gantt' : 'Gantt Timeline'}</span>
          </button>
        </div>
      </div>

      {/* VISUAL TIMELINE PROGRESS BAR (Always visible as visual anchor) */}
      <div className="mb-12 bg-brand-surface-container/80 backdrop-blur-md p-5 rounded-2xl border border-brand-outline-variant/30 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs font-semibold text-brand-on-surface-variant mb-3">
          <span className="flex items-center gap-1.5 text-brand-primary-container">
            <Calendar className="w-3.5 h-3.5" />
            {language === 'uk' ? 'Розподіл часу між етапами (100% виробництва)' : language === 'ru' ? 'Распределение времени между этапами (100% производства)' : 'Timeline distribution across phases (100% lifecycle)'}
          </span>
          <span className="font-mono text-brand-on-surface">
            {language === 'uk' ? 'Загальний термін:' : language === 'ru' ? 'Общий срок:' : 'Total duration:'} {presetDurations[activePreset][language] || presetDurations[activePreset]['uk']}
          </span>
        </div>

        {/* Multi-segmented Gantt/Progress Bar */}
        <div className="h-4 w-full bg-brand-surface-container-high rounded-full overflow-hidden p-0.5 flex gap-1 border border-brand-outline-variant/20 shadow-inner">
          {currentPhases.map((phase) => (
            <div
              key={`bar-${phase.id}`}
              onClick={() => {
                setExpandedPhaseId(phase.id);
                setViewMode('cards');
              }}
              style={{ width: `${phase.percentageShare}%` }}
              className={`h-full rounded-full transition-all duration-300 cursor-pointer relative group bg-gradient-to-r ${phase.color} hover:brightness-125 opacity-90 hover:opacity-100 ${
                expandedPhaseId === phase.id ? 'ring-2 ring-white shadow-glow brightness-125 z-10' : ''
              }`}
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                <div className="bg-[#171b27] border border-brand-outline-variant/50 text-brand-on-surface text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap shadow-xl">
                  {phase.stepNumber}. {getLangText(phase.title)} ({phase.percentageShare}%)
                </div>
                <div className="w-2 h-2 bg-[#171b27] rotate-45 -mt-1 border-r border-b border-brand-outline-variant/50" />
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Labels below progress bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4 pt-2 border-t border-brand-outline-variant/15 text-[11px]">
          {currentPhases.map((phase) => (
            <button
              key={`label-${phase.id}`}
              onClick={() => {
                setExpandedPhaseId(phase.id);
                setViewMode('cards');
              }}
              className={`text-left p-2 rounded-lg transition-colors cursor-pointer border ${
                expandedPhaseId === phase.id
                  ? 'bg-brand-primary-container/10 border-brand-primary-container/40 text-brand-primary-container'
                  : 'border-transparent text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-container-high/30'
              }`}
            >
              <div className="font-mono text-[10px] font-bold opacity-75">{phase.stepNumber}</div>
              <div className="font-semibold truncate">{getLangText(phase.title)}</div>
              <div className="text-[10px] opacity-75 font-mono">{getLangText(phase.duration)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT DISPLAY: CARDS OR GANTT VIEW */}
      {viewMode === 'cards' ? (
        <div className="space-y-4">
          {currentPhases.map((phase, idx) => {
            const isExpanded = expandedPhaseId === phase.id;
            const Icon = phase.icon;

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-brand-surface-container/95 border-brand-primary-container/50 shadow-2xl shadow-brand-primary-container/5'
                    : 'bg-brand-surface-container/60 border-brand-outline-variant/20 hover:border-brand-outline-variant/40 hover:bg-brand-surface-container/80'
                }`}
              >
                {/* Phase Header / Clickable Accordion Bar */}
                <div
                  onClick={() => setExpandedPhaseId(isExpanded ? null : phase.id)}
                  className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start md:items-center gap-4">
                    {/* Step badge & icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border bg-gradient-to-br ${phase.color} text-slate-950 font-bold shadow-lg`}>
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-brand-primary-container">
                          {language === 'uk' ? `ЕТАП ${phase.stepNumber}` : language === 'ru' ? `ЭТАП ${phase.stepNumber}` : `PHASE ${phase.stepNumber}`}
                        </span>
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-semibold border ${phase.badgeColor}`}>
                          {getLangText(phase.duration)}
                        </span>
                        <span className="text-[11px] text-brand-on-surface-variant font-mono">
                          ({phase.percentageShare}% {language === 'uk' ? 'проекту' : language === 'ru' ? 'проекта' : 'share'})
                        </span>
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-brand-on-background">
                        {getLangText(phase.title)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <p className="text-xs text-brand-on-surface-variant hidden lg:block max-w-xs text-right line-clamp-1">
                      {getLangText(phase.description)}
                    </p>
                    <div className={`w-8 h-8 rounded-full border border-brand-outline-variant/40 flex items-center justify-center transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 bg-brand-primary-container/10 text-brand-primary-container border-brand-primary-container/40' : 'text-brand-on-surface-variant'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Phase Details Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-brand-outline-variant/20 bg-[#121622]/90 p-5 md:p-8"
                    >
                      <p className="text-sm text-brand-on-surface leading-relaxed mb-6 font-medium">
                        {getLangText(phase.description)}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Deliverables Checklist Column */}
                        <div className="md:col-span-2 bg-brand-surface-container/70 p-5 rounded-xl border border-brand-outline-variant/20">
                          <h4 className="text-xs font-bold text-brand-primary-container uppercase tracking-wider mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {language === 'uk' ? 'Ключові результати та артефакти:' : language === 'ru' ? 'Ключевые результаты и артефакты:' : 'Deliverables & Output Checklist:'}
                          </h4>
                          <div className="space-y-2.5">
                            {getLangArray(phase.deliverables).map((item, dIdx) => {
                              const checkKey = `${phase.id}-${dIdx}`;
                              const isChecked = !!completedChecklist[checkKey];

                              return (
                                <div
                                  key={dIdx}
                                  onClick={() => toggleChecklist(checkKey)}
                                  className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                                    isChecked 
                                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                                      : 'bg-brand-surface-container-high/40 border-brand-outline-variant/20 text-brand-on-surface hover:border-brand-primary-container/30'
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                                    isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-brand-outline-variant/50 bg-brand-surface'
                                  }`}>
                                    {isChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                                  </div>
                                  <span className={`text-xs md:text-sm font-medium ${isChecked ? 'text-emerald-300 font-semibold' : ''}`}>
                                    {item}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Client Role & Transparency Guarantee Column */}
                        <div className="space-y-4">
                          
                          {/* What client needs to do */}
                          <div className="bg-brand-surface-container/70 p-4 rounded-xl border border-brand-outline-variant/20">
                            <h5 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <UserCheck className="w-3.5 h-3.5" />
                              {language === 'uk' ? 'Що потрібно від клієнта:' : language === 'ru' ? 'Что требуется от клиента:' : 'Client Action Items:'}
                            </h5>
                            <p className="text-xs text-brand-on-surface-variant leading-relaxed">
                              {getLangText(phase.clientRole)}
                            </p>
                          </div>

                          {/* Guarantee Badge */}
                          <div className="bg-brand-primary-container/5 p-4 rounded-xl border border-brand-primary-container/20">
                            <h5 className="text-[11px] font-bold text-brand-primary-container uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {language === 'uk' ? 'Гарантія прозорості:' : language === 'ru' ? 'Гарантия прозрачности:' : 'Transparency Guarantee:'}
                            </h5>
                            <p className="text-xs text-brand-on-surface leading-relaxed font-medium">
                              {getLangText(phase.transparencyGuarantee)}
                            </p>
                          </div>

                          {/* Action Button inside expander */}
                          <button
                            onClick={() => onOpenCalculator(presetLabels[activePreset][language] || presetLabels[activePreset]['uk'])}
                            className="w-full py-2.5 px-4 rounded-xl bg-brand-primary-container/10 border border-brand-primary-container/30 text-brand-primary-container hover:bg-brand-primary-container hover:text-[#00363a] font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                          >
                            <span>
                              {language === 'uk' ? 'Розрахувати цей етап' : language === 'ru' ? 'Рассчитать этот этап' : 'Calculate phase budget'}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>

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
        /* GANTT DETAILED TIMELINE VIEW */
        <div className="bg-brand-surface-container/90 border border-brand-outline-variant/30 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-brand-outline-variant/20 pb-4">
            <h3 className="font-display font-bold text-lg text-brand-on-background flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-brand-primary-container" />
              {language === 'uk' ? 'Календарний Графік Виробництва (Gantt View)' : language === 'ru' ? 'Календарный График Производства (Gantt View)' : 'Production Schedule Gantt Chart'}
            </h3>
            <span className="text-xs font-mono text-brand-on-surface-variant">
              100% {language === 'uk' ? 'контроль дедлайнів' : language === 'ru' ? 'контроль дедлайнов' : 'timeline control'}
            </span>
          </div>

          <div className="space-y-6">
            {currentPhases.map((phase) => (
              <div key={`gantt-row-${phase.id}`} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-brand-on-surface flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-brand-primary-container/10 text-brand-primary-container font-mono text-xs flex items-center justify-center font-bold">
                      {phase.stepNumber}
                    </span>
                    {getLangText(phase.title)}
                  </span>
                  <span className="font-mono text-brand-primary-container font-bold">
                    {getLangText(phase.duration)} ({phase.percentageShare}%)
                  </span>
                </div>

                <div className="h-6 w-full bg-brand-surface-container-high rounded-xl overflow-hidden p-1 border border-brand-outline-variant/20 flex relative">
                  <div
                    style={{ width: `${phase.percentageShare}%` }}
                    className={`h-full rounded-lg bg-gradient-to-r ${phase.color} shadow-md flex items-center justify-end px-2 text-[10px] font-bold text-slate-950 font-mono`}
                  >
                    {phase.percentageShare}%
                  </div>
                </div>

                <p className="text-[11px] text-brand-on-surface-variant pl-8 italic">
                  {getLangText(phase.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER CALLOUT / GUARANTEE STATEMENT */}
      <div className="mt-16 bg-gradient-to-r from-brand-primary-container/10 via-brand-surface-container/90 to-cyan-500/10 rounded-2xl p-6 md:p-10 border border-brand-primary-container/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary-container/20 border border-brand-primary-container/40 flex items-center justify-center text-brand-primary-container shrink-0 mt-1">
            <Zap className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h4 className="font-display text-xl font-extrabold text-brand-on-background mb-1">
              {language === 'uk' ? 'Потрібен індивідуальний розрахунок термінів?' : language === 'ru' ? 'Нужен индивидуальный расчет сроков?' : 'Need a custom milestone schedule?'}
            </h4>
            <p className="text-xs md:text-sm text-brand-on-surface-variant max-w-xl">
              {language === 'uk' 
                ? 'Пройдіть розрахунок у калькуляторі або звʼяжіться з нами для узгодження Express-розробки (запуск за 7 днів).'
                : language === 'ru'
                ? 'Пройдите расчет в калькуляторе или свяжитесь с нами для согласования Express-разработки (запуск за 7 дней).'
                : 'Calculate your exact timeline in our calculator or request Express Development (launch in as little as 7 days).'}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => onOpenCalculator(presetLabels[activePreset][language] || presetLabels[activePreset]['uk'])}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-primary-container text-[#00363a] font-bold text-xs md:text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all cursor-pointer text-center"
          >
            {language === 'uk' ? 'Розрахувати Терміни у Калькуляторі' : language === 'ru' ? 'Рассчитать Сроки в Калькуляторе' : 'Open Timeline Calculator'}
          </button>
          
          <button
            onClick={onScrollToContact}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-brand-surface-container-high border border-brand-outline-variant/40 text-brand-on-surface hover:text-brand-primary-container hover:border-brand-primary-container/40 font-semibold text-xs md:text-sm transition-all cursor-pointer text-center"
          >
            {language === 'uk' ? 'Замовити Консультацію' : language === 'ru' ? 'Заказать Консультацию' : 'Request Consultation'}
          </button>
        </div>

      </div>

    </section>
  );
}
