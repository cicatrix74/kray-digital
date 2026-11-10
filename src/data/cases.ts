import { CaseStudy } from '../types';
import { Language } from '../context/LanguageContext';

export const CASE_STUDIES: Record<Language, CaseStudy[]> = {
  uk: [
    {
      id: '1',
      title: 'Ребрендинг та розробка E-commerce для провідного постачальника металопрокату',
      category: 'Розробка сайтів',
      image: '/images/cases/case-1.svg',
      description: 'Перенесення оптово-роздрібного металоцентру на сучасний стек React & Next.js з розробкою інтерактивного калькулятора металу та автоматичним формуванням специфікацій.',
      challenge: 'Старий сайт не витримував пікових навантажень при синхронізації залишків з 1С, не мав зручного інструменту для розрахунку ваги і вартості замовлень, а мобільна версія була вкрай незручною для виконробів безпосередньо на об\'єктах.',
      solution: 'Створили надшвидке headless-рішення з миттєвим пошуком за ГОСТами та марками сталі. Інтегрували інтерактивний калькулятор ваги/довжини та модуль автоматичного вивантаження рахунків-фактур.',
      results: [
        'Збільшення мобільної конверсії на 42%',
        'Зниження показника відмов з 54% до 18%',
        'Прискорення завантаження сторінок у 3.5 рази'
      ],
      metrics: [
        { label: 'Зростання конверсії', value: '+42%' },
        { label: 'Швидкість завантаження', value: '0.8s' },
        { label: 'Зростання чека', value: '+28%' }
      ],
      tags: ['React', 'Next.js', 'Tailwind', 'Framer Motion', 'Headless Commerce']
    },
    {
      id: '2',
      title: 'SEO-оптимізація великої мережі стоматологічних клінік',
      category: 'SEO-оптимізація',
      image: '/images/cases/case-2.svg',
      description: 'Комплексна пошукова оптимізація медичного порталу з проробкою локального SEO для 24 філій та оптимізацією медичних E-E-A-T факторів.',
      challenge: 'Сайт клініки знаходився за межами топ-50 за ключовими високочастотними запитами. Трафік розподілявся нерівномірно, а конверсія в запис на прийом була вкрай низькою.',
      solution: 'Провели глибокий технічний аудит, переробили структуру розділів під кластеры послуг. Написали експертні медичні статті, верифіковані практикуючими лікарями (E-E-A-T), налаштували Google My Business для кожної філії.',
      results: [
        'Виведення 85% пріоритетних запитів у Топ-10 Google',
        'Збільшення цільового органічного трафіку в 4.2 рази',
        'Зниження вартості залучення ліда (CPL) на 60%'
      ],
      metrics: [
        { label: 'Органічний трафик', value: '+320%' },
        { label: 'Запити в Топ-10', value: '85%' },
        { label: 'Зниження CPL', value: '-60%' }
      ],
      tags: ['SEO-аудит', 'E-E-A-T оптимізація', 'Локальне SEO', 'Семантичне ядро']
    },
    {
      id: '3',
      title: 'Рекламна кампанія в Google Ads для b2b-сервісу автоматизації логістики',
      category: 'Google Реклама',
      image: '/images/cases/case-3.svg',
      description: 'Тонке налаштування контекстної реклами на вузьку аудиторію ОПР (директорів з логістики) з використанням інтелектуальних стратегій призначення ставок.',
      challenge: 'Висока вартість кліка у тематиці b2b-софту та велика кількість нецільового "сміттєвого" трафіку, що спалює бюджет без реальних заявок.',
      solution: 'Налаштували наскрізну аналітику від кліка до закритої угоди в CRM. Опрацювали базу мінус-слів, впровадили автоматичні стратегії призначення ставок Google з оптимізацією під "Ценность конверсии". Створили висококонверсійні посадкові сторінки.',
      results: [
        'Збільшення кількості кваліфікованих лідів (SQL) на 150%',
        'Збільшення ROI рекламної кампанії до 320%',
        'Скорочення нецільових кліків на 75%'
      ],
      metrics: [
        { label: 'Зростання лідів (SQL)', value: '+150%' },
        { label: 'Окупність ROI', value: '320%' },
        { label: 'Ціна ліда (CPL)', value: '-45%' }
      ],
      tags: ['Google Search', 'Performance Max', 'Наскрізна аналітика', 'B2B маркетинг']
    },
    {
      id: '5',
      title: 'Редагування та оптимізація продуктивності великого інтернет-магазину автозапчастин',
      category: 'Розробка сайтів',
      image: '/images/cases/case-5.svg',
      description: 'Глибокий технічний рефакторинг та оптимізація швидкості завантаження застарілого коду без зупинки поточних продажів.',
      challenge: 'Повільне завантаження (більше 6 секунд на мобільних пристроях), низькі оцінки в Google PageSpeed Insights (24/100) та постійні збої кошика при високому трафіку.',
      solution: 'Провели детальний аудит бази даних, оптимізували сторонні JS-скрипти, налаштували відкладене завантаження (lazy loading), перевели критичні модулі на чистий JS та налаштували агресивне серверне кешування.',
      results: [
        'Прискорення завантаження сторінок на мобільних до 1.2 секунди',
        'Оцінка в PageSpeed Insights зросла з 24 до 92 балів',
        'Зменшення показника відмов на сторінці оформлення замовлення на 40%'
      ],
      metrics: [
        { label: 'Оцінка PageSpeed', value: '92/100' },
        { label: 'Швидкість рендерингу', value: '1.2s' },
        { label: 'Зниження відмов', value: '-40%' }
      ],
      tags: ['Оптимізація швидкості', 'Рефакторинг коду', 'PageSpeed Insights', 'Кешування', 'JS Оптимізація']
    },
    {
      id: '6',
      title: 'Міграція великого інформаційного порталу на WordPress із повним збереженням SEO-структури',
      category: 'Розробка сайтів',
      image: '/images/cases/case-6.svg',
      description: 'Безшовне перенесення понад 10,000 статей та архівних матеріалів зі складної самописної CMS на оптимізоване рішення WordPress.',
      challenge: 'Попередній движок сайту перестав підтримуватися розробниками, був вразливим до спам-атак, а кожна нова публікація вимагала залучення програміста.',
      solution: 'Спроектували надійні скрипти імпорту для збереження всіх URL, мета-тегів та зв\'язків між публікаціями. Створили кастомну швидку тему на базі Gutenberg та розширили адмін-панель для зручної роботи авторів.',
      results: [
        'Перенесено 100% контенту із повним збереженням позицій в пошуковій видачі',
        'Адміністративне навантаження на контент-менеджерів знизилося вдвічі',
        'Захист від спаму та атак покращено на 99%'
      ],
      metrics: [
        { label: 'Збережено SEO-позицій', value: '100%' },
        { label: 'Час публікації', value: '-50%' },
        { label: 'Статей перенесено', value: '10k+' }
      ],
      tags: ['WordPress', 'Міграція баз даних', 'SEO-збереження', 'Кастомна тема', 'Безпека CMS']
    },
    {
      id: '7',
      title: 'Комплексне технічне ведення та супровід онлайн-платформи дистриб\'ютора техніки',
      category: 'Додаткові послуги та підтримка',
      image: '/images/cases/case-7.svg',
      description: 'Регулярна підтримка працездатності, оновлення контенту, моніторинг безпеки та впровадження нових фіч у режимі 24/7.',
      challenge: 'Клієнт втрачав замовлення через періодичні простої сайту, застарілу інформацію про ціни та наявність товарів, а також відсутність регулярного резервного копіювання.',
      solution: 'Налаштували автоматичний моніторинг доступності (uptime 99.9%), щоденний бекап у хмару, оперативне оновлення прайс-листів та акційних банерів. Впровадили щомісячне тестування безпеки та ліквідацію вразливостей.',
      results: [
        'Стабільна робота сайту без збоїв протягом 12 місяців',
        'Час реакції на технічні інциденти знижено до 15 хвилин',
        'Швидкість оновлення інформації про товари зросла в 5 разів'
      ],
      metrics: [
        { label: 'Uptime сайту', value: '99.99%' },
        { label: 'Час реакції', value: '<15 хв' },
        { label: 'Безпека (бекапи)', value: 'Daily' }
      ],
      tags: ['Техпідтримка', 'Ведення сайту', 'Моніторинг 24/7', 'Хмарні бекапи', 'Адміністрування контенту']
    }
  ],
  ru: [
    {
      id: '1',
      title: 'Ребрендинг и разработка E-commerce для ведущего поставщика металлопроката',
      category: 'Разработка сайтов',
      image: '/images/cases/case-1.svg',
      description: 'Перенос оптово-розничного металлоцентра на современный стек React & Next.js с разработкой интерактивного калькулятора металла и автоматическим формированием спецификаций.',
      challenge: 'Старый сайт не выдерживал пиковых нагрузок при синхронизации остатков с 1С, не имел удобного инструмента для расчета веса и стоимости заказов, а мобильная версия была крайне неудобной для прорабов прямо на объектах.',
      solution: 'Создали сверхбыстрое headless-решение с мгновенным поиском по ГОСТам и маркам стали. Интегрировали интерактивный калькулятор веса/длины и модуль автоматической выгрузки счетов-фактур.',
      results: [
        'Увеличение мобильной конверсии на 42%',
        'Снижение показателя отказов с 54% до 18%',
        'Ускорение загрузки страниц в 3.5 раза'
      ],
      metrics: [
        { label: 'Рост конверсии', value: '+42%' },
        { label: 'Скорость загрузки', value: '0.8s' },
        { label: 'Рост чека', value: '+28%' }
      ],
      tags: ['React', 'Next.js', 'Tailwind', 'Framer Motion', 'Headless Commerce']
    },
    {
      id: '2',
      title: 'SEO-оптимизация крупной сети стоматологических клиник',
      category: 'SEO-оптимизация',
      image: '/images/cases/case-2.svg',
      description: 'Комплексная поисковая оптимизация медицинского портала с проработкой локального SEO для 24 филиалов и оптимизацией медицинских факторов E-E-A-T.',
      challenge: 'Сайт клиники находился за пределами топ-50 по ключевым высокочастотным запросам. Трафик распределялся неравномерно, а конверсия в запись на прием была крайне низкой.',
      solution: 'Провели глубокий технический аудит, переработали структуру разделов под кластеры услуг. Написали экспертные медицинские статьи, верифицированные практикующими врачами (E-E-A-T), настроили Google My Business для каждого филиала.',
      results: [
        'Вывод 85% приоритетных запросов в Топ-10 Google',
        'Увеличение целевого органического трафика в 4.2 раза',
        'Снижение стоимости привлечения лида (CPL) на 60%'
      ],
      metrics: [
        { label: 'Органический трафик', value: '+320%' },
        { label: 'Запросы в Топ-10', value: '85%' },
        { label: 'Снижение CPL', value: '-60%' }
      ],
      tags: ['SEO-аудит', 'E-E-A-T оптимизация', 'Локальное SEO', 'Семантическое ядро']
    },
    {
      id: '3',
      title: 'Рекламная кампания в Google Ads для b2b-сервиса автоматизации логистики',
      category: 'Google Реклама',
      image: '/images/cases/case-3.svg',
      description: 'Тонкая настройка контекстной рекламы на узкую аудиторию ЛПР (директоров по логистике) с использованием интеллектуальных стратегий назначения ставок.',
      challenge: 'Высокая стоимость клика в тематике b2b-софта и большое количество нецелевого «мусорного» трафика, сжигающего бюджет без реальных заявок.',
      solution: 'Настроили сквозную аналитику от клика до закрытой сделки в CRM. Проработали базу минус-слов, внедрили автоматические стратегии назначения ставок Google с оптимизацией под «Ценность конверсии». Создали высококонверсионные посадочные страницы.',
      results: [
        'Увеличение количества квалифицированных лидов (SQL) на 150%',
        'Увеличение ROI рекламной кампании до 320%',
        'Сокращение нецелевых кликов на 75%'
      ],
      metrics: [
        { label: 'Рост лидов (SQL)', value: '+150%' },
        { label: 'Окупаемость ROI', value: '320%' },
        { label: 'Цена лида (CPL)', value: '-45%' }
      ],
      tags: ['Google Search', 'Performance Max', 'Сквозная аналитика', 'B2B маркетинг']
    },
    {
      id: '5',
      title: 'Редактирование и оптимизация производительности крупного интернет-магазина автозапчастей',
      category: 'Разработка сайтов',
      image: '/images/cases/case-5.svg',
      description: 'Глубокий технический рефакторинг и оптимизация скорости загрузки устаревшего кода без остановки текущих продаж.',
      challenge: 'Медленная загрузка (более 6 секунд на мобильных устройствах), низкие оценки в Google PageSpeed Insights (24/100) и постоянные сбои корзины при высоком трафике.',
      solution: 'Провели детальный аудит базы данных, оптимизировали сторонние JS-скрипты, настроили отложенную загрузку (lazy loading), перевели критические модули на чистый JS и настроили агрессивное серверное кэширование.',
      results: [
        'Ускорение загрузки страниц на мобильных до 1.2 секунды',
        'Оценка в PageSpeed Insights выросла с 24 до 92 баллов',
        'Снижение показателя отказов на странице оформления заказа на 40%'
      ],
      metrics: [
        { label: 'Оценка PageSpeed', value: '92/100' },
        { label: 'Скорость рендеринга', value: '1.2s' },
        { label: 'Снижение отказов', value: '-40%' }
      ],
      tags: ['Оптимизация скорости', 'Рефакторинг кода', 'PageSpeed Insights', 'Кэширование', 'JS Оптимизация']
    },
    {
      id: '6',
      title: 'Миграция крупного информационного портала на WordPress с полным сохранением SEO-структуры',
      category: 'Разработка сайтов',
      image: '/images/cases/case-6.svg',
      description: 'Бесшовный перенос более 10,000 статей и архивных материалов со сложной самописной CMS на оптимизированное решение WordPress.',
      challenge: 'Предыдущий движок сайта перестал поддерживаться разработчиками, был уязвим к спам-атакам, а каждая новая публикация требовала участия программиста.',
      solution: 'Спроектировали надежные скрипты импорта для сохранения всех URL, мета-тегов и связей между публикациями. Создали кастомную быструю тему на базе Gutenberg и расширили админ-панель для удобной работы авторов.',
      results: [
        'Перенесено 100% контента с полным сохранением позиций в поисковой выдаче',
        'Административная нагрузка на контент-менеджеров снизилась вдвое',
        'Защита от спама и атак улучшена на 99%'
      ],
      metrics: [
        { label: 'Сохранено SEO-позиций', value: '100%' },
        { label: 'Время публикации', value: '-50%' },
        { label: 'Статей перенесено', value: '10k+' }
      ],
      tags: ['WordPress', 'Миграция баз данных', 'SEO-сохранение', 'Кастомная тема', 'CMS Безопасность']
    },
    {
      id: '7',
      title: 'Комплексное техническое ведение и сопровождение онлайн-платформы дистрибьютора техники',
      category: 'Доп. услуги и поддержка',
      image: '/images/cases/case-7.svg',
      description: 'Регулярная поддержка работоспособности, обновление контента, мониторинг безопасности и внедрение новых фич в режиме 24/7.',
      challenge: 'Клиент терял заказы из-за периодических простоев сайта, устаревшей информации о ценах и наличии товаров, а также отсутствия регулярного резервного копирования.',
      solution: 'Настроили автоматический мониторинг доступности (uptime 99.9%), ежедневный бэкап в облако, оперативное обновление прайс-листов и акционных баннеров. Внедрили ежемесячное тестирование безопасности и ликвидацию уязвимостей.',
      results: [
        'Стабильная работа сайта без сбоев в течение 12 месяцев',
        'Время реакции на технические инциденты снижено до 15 минут',
        'Скорость обновления информации о товарах выросла в 5 раз'
      ],
      metrics: [
        { label: 'Uptime сайта', value: '99.99%' },
        { label: 'Время реакции', value: '<15 мин' },
        { label: 'Безопасность (бэкапы)', value: 'Daily' }
      ],
      tags: ['Техподдержка', 'Ведение сайта', 'Мониторинг 24/7', 'Облачные бэкапы', 'Администрирование контента']
    }
  ],
  en: [
    {
      id: '1',
      title: 'E-commerce Rebranding & Development for a Leading Metal Supplier',
      category: 'Web Development',
      image: '/images/cases/case-1.svg',
      description: 'Migrating an wholesale/retail metal distribution center to a modern React & Next.js stack with an interactive metal weight calculator and automated PDF specification exporter.',
      challenge: 'The legacy system crashed under peak loads when syncing database stocks with 1C, lacked weight-to-length calculations, and was highly inconvenient on mobile devices for building site engineers.',
      solution: 'Built a custom high-performance headless architecture with search filters for steel grades and GOST standards. Embedded an interactive metric weight estimator and invoicing module.',
      results: [
        '42% increase in mobile conversion rate',
        'Bounce rate dropped from 54% to 18%',
        'Page load times accelerated by 3.5x'
      ],
      metrics: [
        { label: 'Conversion Growth', value: '+42%' },
        { label: 'Page Load Speed', value: '0.8s' },
        { label: 'Average Ticket', value: '+28%' }
      ],
      tags: ['React', 'Next.js', 'Tailwind', 'Framer Motion', 'Headless Commerce']
    },
    {
      id: '2',
      title: 'SEO Campaign for a Large Chain of Dental Clinics',
      category: 'SEO Optimization',
      image: '/images/cases/case-2.svg',
      description: 'A comprehensive search engine optimization strategy with deep local SEO for 24 regional clinic branches and meticulous E-E-A-T clinical content compliance.',
      challenge: 'The dental clinics ranking stood far beyond Top 50 results for high-frequency search queries. General organic traffic was uneven, and booking form conversions were lacking.',
      solution: 'Conducted a systematic technical audit, restructuring services around search intent. Crafted expert articles peer-reviewed by practicing dentists (E-E-A-T) and configured Google My Business listings for all 24 branches.',
      results: [
        'Moved 85% of strategic keywords into Google Top 10',
        'Increased relevant organic search traffic by 4.2x',
        'Decreased lead acquisition cost (CPL) by 60%'
      ],
      metrics: [
        { label: 'Organic Traffic', value: '+320%' },
        { label: 'Keywords in Top 10', value: '85%' },
        { label: 'CPL Decrease', value: '-60%' }
      ],
      tags: ['SEO Audit', 'E-E-A-T Optimization', 'Local SEO', 'Semantic Keyword Core']
    },
    {
      id: '3',
      title: 'Google Ads PPC Campaign for a B2B Logistics Automation Service',
      category: 'Google Ads',
      image: '/images/cases/case-3.svg',
      description: 'Hyper-targeted search and PPC campaign focused on key corporate decision-makers (Logistics Directors) using automated smart-bidding models.',
      challenge: 'Extremely high cost-per-click in the enterprise SaaS sector, and a huge volume of unqualified junk traffic burning the budget without producing real signups.',
      solution: 'Established end-to-end analytics connecting clicks directly to closed CRM deals. Refined negative keywords list, activated automatic bidding targeted at "Conversion Value", and built high-conversion landing pages.',
      results: [
        'Boosted Sales Qualified Leads (SQL) by 150%',
        'Increased paid search campaign ROI up to 320%',
        'Reduced unqualified non-B2B clicks by 75%'
      ],
      metrics: [
        { label: 'SQL Lead Growth', value: '+150%' },
        { label: 'Campaign ROI', value: '320%' },
        { label: 'Cost Per Lead (CPL)', value: '-45%' }
      ],
      tags: ['Google Search', 'Performance Max', 'End-to-End Analytics', 'B2B Marketing']
    },
    {
      id: '5',
      title: 'Performance Refactoring & Optimization for a Large Auto Parts Store',
      category: 'Web Development',
      image: '/images/cases/case-5.svg',
      description: 'Comprehensive code refactoring and loading speed optimization on a legacy backend without interrupting running checkouts.',
      challenge: 'Slow load speeds exceeding 6 seconds on mobile web, failing Google PageSpeed benchmarks (24/100), and occasional cart crashes under traffic spikes.',
      solution: 'Audited slow database queries, optimized third-party trackers, implemented smart lazy loading, rewrote core interactive modules in vanilla JS, and optimized server-side caching.',
      results: [
        'Accelerated mobile rendering down to 1.2s',
        'PageSpeed score elevated from 24 to 92/100',
        'Bounce rates on checkout processes dropped by 40%'
      ],
      metrics: [
        { label: 'PageSpeed Score', value: '92/100' },
        { label: 'Render Delay', value: '1.2s' },
        { label: 'Bounce Rate', value: '-40%' }
      ],
      tags: ['Speed Optimization', 'Code Refactoring', 'PageSpeed Insights', 'Caching', 'JS Optimization']
    },
    {
      id: '6',
      title: 'Seamless WordPress Migration for a Large Information Portal',
      category: 'Web Development',
      image: '/images/cases/case-6.svg',
      description: 'Zero-downtime migration of over 10,000 archival news articles and media files from an unsupported proprietary CMS to optimized WordPress.',
      challenge: 'The legacy custom CMS was deprecated, prone to code vulnerabilities, and content creators needed engineering support for simple article layouts.',
      solution: 'Engineered safe database import scripts to retain original URLs, metadata, and taxonomy links. Created a lightning-fast Gutenberg-based theme and expanded admin controls.',
      results: [
        'Migrated 100% of historical articles with zero SEO ranking fluctuations',
        'Halved the publishing pipeline overhead for the media team',
        'Enhanced overall anti-spam and security layers by 99%'
      ],
      metrics: [
        { label: 'SEO Ranks Retained', value: '100%' },
        { label: 'Publishing Delay', value: '-50%' },
        { label: 'Articles Migrated', value: '10k+' }
      ],
      tags: ['WordPress', 'Database Migration', 'SEO Retention', 'Bespoke Theme', 'CMS Hardening']
    },
    {
      id: '7',
      title: 'Full-Scale Technical Support & SLA Management for a Hardware Distributor',
      category: 'Maintenance & Support',
      image: '/images/cases/case-7.svg',
      description: 'Continuous uptime monitoring, content curation, security updates, and rolling feature rollouts under a 24/7 SLA.',
      challenge: 'The distributor was losing active web buyers due to occasional downtime, outdated stock pricing, and a lack of daily off-site backups.',
      solution: 'Configured automated health-check alerts achieving 99.9% uptime, daily remote cloud backups, and fast price-list updates. Conducted monthly pen-testing.',
      results: [
        'Sustained continuous website operation for over 12 months',
        'Incident response times reduced below 15 minutes',
        'Product inventory synchronization speed increased 5x'
      ],
      metrics: [
        { label: 'SLA Web Uptime', value: '99.99%' },
        { label: 'Response Time', value: '<15 min' },
        { label: 'Data Security', value: 'Daily' }
      ],
      tags: ['Technical Support', 'Website Management', '24/7 Monitoring', 'Cloud Backups', 'Content Curation']
    }
  ]
};
