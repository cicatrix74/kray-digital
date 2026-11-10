import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Headphones, 
  UserCheck, 
  User, 
  RotateCcw, 
  ChevronDown, 
  Calculator, 
  PhoneCall, 
  ArrowRight,
  Minimize2,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  showCta?: 'calculator' | 'contact' | null;
}

interface QuickHelpChatProps {
  onOpenCalculator?: () => void;
  onScrollToContact?: () => void;
}

const UI_STRINGS = {
  uk: {
    title: 'Консультант Kray Digital',
    subtitle: 'Онлайн • Відповідаємо протягом хвилини',
    placeholder: 'Запитайте про послуги, ціни, терміни...',
    send: 'Надіслати',
    clear: 'Очистити чат',
    welcome: 'Вітаю! Чим можу допомогти вам з приводу розробки сайтів, SEO або реклами?',
    suggestionsTitle: 'Популярні запитання:',
    suggestions: [
      { text: '💰 Скільки коштує розробка сайту?', prompt: 'Скільки коштує розробка сайту та які терміни?' },
      { text: '📈 Як працює ваша SEO-оптимізація?', prompt: 'Розкажи детальніше про ваші послуги з SEO-оптимізації.' },
      { text: '⚡ Які результати дає Google Реклама?', prompt: 'Які результати та ROI очікувати від Google Реклами?' },
      { text: '🎁 Як отримати безкоштовний аудит?', prompt: 'Як отримати безкоштовний аудит мого поточного сайту?' },
    ],
    typing: 'Консультант друкує відповідь...',
    openCalcBtn: 'Розрахувати вартість в калькуляторі',
    contactBtn: 'Замовити безкоштовну консультацію',
    tooltip: 'Потрібна допомога? Напишіть нам',
    badge: 'ОНЛАЙН',
  },
  ru: {
    title: 'Консультант Kray Digital',
    subtitle: 'Онлайн • Отвечаем в течение минуты',
    placeholder: 'Спросите об услугах, ценах, сроках...',
    send: 'Отправить',
    clear: 'Очистить чат',
    welcome: 'Приветствуем! Чем можем помочь вам по поводу разработки сайтов, SEO или рекламы?',
    suggestionsTitle: 'Популярные вопросы:',
    suggestions: [
      { text: '💰 Сколько стоит разработка сайта?', prompt: 'Сколько стоит разработка сайта и какие сроки?' },
      { text: '📈 Как работает ваша SEO-оптимизация?', prompt: 'Расскажи подробнее про ваши услуги по SEO-оптимизации.' },
      { text: '⚡ Какие результаты дает Google Реклама?', prompt: 'Какие результаты и ROI ожидать от Google Рекламы?' },
      { text: '🎁 Как получить бесплатный аудит?', prompt: 'Как получить бесплатный аудит моего текущего сайта?' },
    ],
    typing: 'Консультант печатает ответ...',
    openCalcBtn: 'Рассчитать стоимость в калькуляторе',
    contactBtn: 'Заказать бесплатную консультацию',
    tooltip: 'Нужна помощь? Напишите нам',
    badge: 'ОНЛАЙН',
  },
  en: {
    title: 'Kray Digital Consultant',
    subtitle: 'Online • Fast Response',
    placeholder: 'Ask about services, pricing, timeline...',
    send: 'Send',
    clear: 'Clear chat',
    welcome: "Hello! How can we help you with web development, SEO, or PPC advertising today?",
    suggestionsTitle: 'Frequently Asked Questions:',
    suggestions: [
      { text: '💰 How much does a website cost?', prompt: 'How much does website development cost and what are the timelines?' },
      { text: '📈 How does your SEO optimization work?', prompt: 'Tell me more about your SEO optimization services and process.' },
      { text: '⚡ What ROI can I expect from Google Ads?', prompt: 'What kind of lead volume and ROI can I expect from Google Ads?' },
      { text: '🎁 How to get a free digital audit?', prompt: 'How can I get a free audit for my current business website?' },
    ],
    typing: 'Consultant is typing a response...',
    openCalcBtn: 'Calculate cost in calculator',
    contactBtn: 'Request free consultation',
    tooltip: 'Need quick help? Message us',
    badge: 'ONLINE',
  }
};

// Intelligent Autonomous Response Engine (No external API keys required)
function getLocalAssistantReply(
  userText: string,
  lang: 'uk' | 'ru' | 'en'
): { text: string; cta: 'calculator' | 'contact' | null } {
  const query = userText.toLowerCase();

  // 1. Pricing / Cost / Budget / Calculator
  if (
    query.includes('цін') || query.includes('вартіст') || query.includes('скільк') || query.includes('бюджет') || query.includes('прайс') ||
    query.includes('цен') || query.includes('стоимост') || query.includes('скольк') || query.includes('калькулятор') ||
    query.includes('cost') || query.includes('price') || query.includes('how much') || query.includes('budget') || query.includes('rate')
  ) {
    if (lang === 'uk') {
      return {
        text: "**Вартість та терміни розробки сайтів (Kray Digital):**\n\n• **1. Лендинг (Landing Page):** від 5 000 ₴ (3–5 днів)\n• **2. Сайт-візитка:** від 10 000 ₴ (10–14 днів)\n• **3. Корпоративний сайт:** від 15 000 ₴ (14–25 днів)\n• **4. Інтернет-магазин:** від 20 000 ₴ (14–30 днів)\n• **5. Складний портал / Сервіс:** від 30 000 ₴ (20–40 днів)\n\n🛡️ **Головна перевага: лише 10% передоплати!**\nСимволічні 10% для старту робіт, а решта 90% оплачуються виключно за фактом здачі та прийому кожного етапу. Ви перевіряєте результат і лише потім платите.\n\nВи можете відкрити наш інтерактивний калькулятор і розрахувати точну вартість під ваш проект!",
        cta: 'calculator'
      };
    }
    if (lang === 'ru') {
      return {
        text: "**Стоимость и сроки разработки сайтов (Kray Digital):**\n\n• **1. Лендинг (Landing Page):** от 5 000 ₴ (3–5 дней)\n• **2. Сайт-визитка:** от 10 000 ₴ (10–14 дней)\n• **3. Корпоративный сайт:** от 15 000 ₴ (14–25 дней)\n• **4. Интернет-магазин:** от 20 000 ₴ (14–30 дней)\n• **5. Сложный портал / Сервис:** от 30 000 ₴ (20–40 дней)\n\n🛡️ **Главное преимущество: всего 10% предоплаты!**\nСимволические 10% для фиксации старта проекта, а остальные 90% оплачиваются исключительно по факту выполнения и приёмки работ. Вы сначала проверяете результат, и только потом оплачиваете.\n\nВы можете открыть наш онлайн-калькулятор и быстро рассчитать точную стоимость под ваши задачи!",
        cta: 'calculator'
      };
    }
    return {
      text: "**Web Development Pricing & Timelines (Kray Digital):**\n\n• **1. Landing Page:** from $120 (3–5 days)\n• **2. Business Card Website:** from $240 (10–14 days)\n• **3. Corporate Website:** from $360 (14–25 days)\n• **4. E-commerce Store:** from $480 (14–30 days)\n• **5. Complex Web Portal / Service:** from $730 (20–40 days)\n\n🛡️ **Key Advantage: Only 10% Initial Deposit!**\nJust 10% down payment to kick off, with the remaining 90% paid milestone by milestone strictly upon your review and approval.\n\nUse our interactive cost calculator below to get a custom breakdown for your project!",
      cta: 'calculator'
    };
  }

  // 2. SEO Optimization
  if (
    query.includes('seo') || query.includes('сео') || query.includes('просуван') || query.includes('пошук') || query.includes('трафік') ||
    query.includes('продвижен') || query.includes('поиск') || query.includes('трафик') || query.includes('топ') || query.includes('ranking') || query.includes('google search')
  ) {
    if (lang === 'uk') {
      return {
        text: "**Послуги та вартість SEO-оптимізації (Kray Digital):**\n\n• **1. Внутрішня SEO-оптимізація сайту:** від 5 000 ₴ (разово)\n• **2. SEO-тексти (Копірайтинг):** 100 ₴ за 1000 символів\n• **3. Оптимізація картинок:** 20 ₴ за 1 картинку\n• **4. Оптимізація швидкості завантаження:** від 2 000 ₴\n\n🛡️ Також діє наше правило: **лише 10% передоплати**, решта 90% — за фактом виконання та прийому робіт!\n\nВи можете відкрити калькулятор та розрахувати бюджет прямо зараз.",
        cta: 'calculator'
      };
    }
    if (lang === 'ru') {
      return {
        text: "**Услуги и стоимость SEO-оптимизации (Kray Digital):**\n\n• **1. Внутренняя SEO-оптимизация сайта:** от 5 000 ₴ (единоразово)\n• **2. SEO-тексты (Копирайтинг):** 100 ₴ за 1000 символов\n• **3. Оптимизация картинок:** 20 ₴ за 1 картинку\n• **4. Оптимизация скорости загрузки сайта:** от 2 000 ₴\n\n🛡️ Действует гарантия: **всего 10% предоплаты**, а остальные 90% — строго по факту выполнения работ!\n\nВы можете перейти в онлайн-калькулятор и выбрать нужные услуги.",
        cta: 'calculator'
      };
    }
    return {
      text: "**SEO Optimization Services & Rates (Kray Digital):**\n\n• **1. On-Page SEO Optimization:** from $120 (one-time)\n• **2. SEO Copywriting & Articles:** $3 per 1,000 chars\n• **3. Image Compression & Optimization:** $0.50 per image\n• **4. Page Speed Optimization:** from $50\n\n🛡️ Only 10% initial deposit required, with 90% paid upon milestone delivery!\n\nYou can use our calculator to configure your custom plan.",
      cta: 'calculator'
    };
  }

  // 3. Advertising / Google Ads / PPC / Meta
  if (
    query.includes('реклам') || query.includes('ppc') || query.includes('ads') || query.includes('таргет') || query.includes('гугл') || query.includes('контекст') || query.includes('лид') || query.includes('лід') || query.includes('lead')
  ) {
    if (lang === 'uk') {
      return {
        text: "**Налаштування та ведення Google & Meta Реклами:**\n\n• **Google Search & Performance Max:** залучення клієнтів, які просто зараз шукають ваші послуги або товари.\n• **Meta Ads (Facebook & Instagram):** таргетинг на цільову аудиторію та генерація якісних лідів.\n• **Наскрізна аналітика:** налаштування GA4, подій конверсій та контроль ROI/ROAS.\n\nЗапуск рекламної кампанії відбувається за 3–5 робочих днів.",
        cta: 'contact'
      };
    }
    if (lang === 'ru') {
      return {
        text: "**Настройка и ведение рекламы в Google & Meta:**\n\n• **Google Поиск & Performance Max:** привлечение горячей аудитории с готовым спросом.\n• **Meta Ads (Facebook & Instagram):** точный таргетинг по интересам и лидогенерация.\n• **Сквозная аналитика:** интеграция с Google Analytics 4 и отслеживание окупаемости инвестиций (ROAS/ROI).\n\nЗапуск готовой рекламной кампании — всего 3–5 рабочих дней.",
        cta: 'contact'
      };
    }
    return {
      text: "**Google & Meta Advertising Management:**\n\n• **Google Search & Performance Max:** Target high-intent customers actively searching for your services.\n• **Meta Ads (Instagram & Facebook):** Precision audience targeting and qualified lead generation.\n• **End-to-End Analytics:** GA4 conversion tracking, ROI and CAC optimization.\n\nCampaign launch typically takes 3 to 5 business days.",
      cta: 'contact'
    };
  }

  // 4. Maintenance & Additional Services
  if (
    query.includes('модерниз') || query.includes('модерніз') || query.includes('перенос') || query.includes('хостинг') ||
    query.includes('wordpress') || query.includes('вордпресс') || query.includes('форм') || query.includes('сервер') ||
    query.includes('восстанов') || query.includes('віднов') || query.includes('поддержк') || query.includes('підтримк') ||
    query.includes('доп') || query.includes('додатков') || query.includes('maintenance') || query.includes('support')
  ) {
    if (lang === 'uk') {
      return {
        text: "**Додаткові послуги та технічна підтримка (Kray Digital):**\n\n• **1. Модернізація сайту:** від 2 000 ₴\n• **2. Перенесення сайту на Хостинг:** 1 000 ₴\n• **3. Перенесення сайту на WordPress:** 3 000 ₴\n• **4. Додавання форм та корисних інструментів:** від 200 ₴\n• **5. Оптимізація навантаження на сервер:** від 2 000 ₴\n• **6. Відновлення роботи сайту:** від 1 000 ₴ (терміново від 2 годин)\n\n🛡️ **Лише 10% передоплати!** Решта 90% оплачується після повної перевірки результату.\n\nВи можете відкрити калькулятор та розрахувати точну вартість під ваші потреби!",
        cta: 'calculator'
      };
    }
    if (lang === 'ru') {
      return {
        text: "**Дополнительные услуги и техподдержка (Kray Digital):**\n\n• **1. Модернизация сайта:** от 2 000 ₴\n• **2. Перенос сайта на Хостинг:** 1 000 ₴\n• **3. Перенос сайта на WordPress:** 3 000 ₴\n• **4. Добавление форм и полезных инструментов:** от 200 ₴\n• **5. Оптимизация нагрузки на сервер:** от 2 000 ₴\n• **6. Восстановление работы сайта:** от 1 000 ₴ (срочно от 2 часов)\n\n🛡️ **Всего 10% предоплаты!** Остальные 90% оплачиваются строго по факту сдачи и проверки работ.\n\nОткройте онлайн-калькулятор, чтобы сразу выбрать нужную услугу!",
        cta: 'calculator'
      };
    }
    return {
      text: "**Additional Services & Website Maintenance (Kray Digital):**\n\n• **1. Website modernization:** from $50\n• **2. Hosting migration:** $25\n• **3. WordPress migration:** $75\n• **4. Custom forms & widgets:** from $5\n• **5. Server load optimization:** from $50\n• **6. Emergency website recovery:** from $25 (urgent from 2 hours)\n\n🛡️ **10% initial deposit only!** Remaining 90% paid upon milestone verification.\n\nOpen our calculator to estimate your maintenance package!",
      cta: 'calculator'
    };
  }

  // 5. Free Audit
  if (
    query.includes('аудит') || query.includes('безкоштовн') || query.includes('бесплатн') || query.includes('audit') || query.includes('free')
  ) {
    if (lang === 'uk') {
      return {
        text: "**Безкоштовний діджитал-аудит вашого сайту:**\n\nПротягом 24 годин ми підготуємо детальний звіт:\n• Аналіз зручності (UX/UI) та точок відтоку відвідувачів;\n• Оцінка швидкості завантаження та мобільної адаптації;\n• Пошук критичних помилок SEO та видимості в пошуку;\n• 3 конкретні рекомендації щодо збільшення конверсії.\n\nЗаповніть коротку форму, щоб отримати аудит безкоштовно!",
        cta: 'contact'
      };
    }
    if (lang === 'ru') {
      return {
        text: "**Бесплатный диджитал-аудит вашего сайта:**\n\nВ течение 24 часов наша команда подготовит детальный разбор:\n• Оценка юзабилити (UX/UI) и точек потери конверсий;\n• Скорость загрузки и корректность мобильной версии;\n• Проверка индексации и грубых ошибок в SEO;\n• 3 конкретных шага для немедленного роста продаж.\n\nОставьте заявку в форме ниже для получения аудита!",
        cta: 'contact'
      };
    }
    return {
      text: "**Free Digital Audit for Your Business:**\n\nWithin 24 hours our specialists will deliver a detailed breakdown:\n• UX/UI conversion bottlenecks analysis;\n• Mobile performance and Core Web Vitals audit;\n• Critical SEO ranking errors review;\n• 3 high-impact recommendations to increase sales.\n\nSubmit your contact info to request your complimentary audit!",
      cta: 'contact'
    };
  }

  // 5. Tech stack / Technology
  if (
    query.includes('стек') || query.includes('технолог') || query.includes('react') || query.includes('код') || query.includes('stack') || query.includes('tech')
  ) {
    if (lang === 'uk') {
      return {
        text: "**Технологічний стек Kray Digital:**\n\n• **Frontend:** React 19, TypeScript, Tailwind CSS, Vite, Motion\n• **Full-stack & SSR:** Next.js, Node.js, Express\n• **Бази даних:** PostgreSQL, Supabase, Redis\n• **Стандарти:** 100% адаптивність, швидкість завантаження < 1.2 сек, сучасний чистий код без застарілих бібліотек.",
        cta: 'calculator'
      };
    }
    if (lang === 'ru') {
      return {
        text: "**Технологический стек Kray Digital:**\n\n• **Frontend:** React 19, TypeScript, Tailwind CSS, Vite, Motion\n• **Full-stack & SSR:** Next.js, Node.js, Express\n• **Базы данных:** PostgreSQL, Supabase, Redis\n• **Стандарты:** Полная адаптивность, скорость загрузки < 1.2 сек, чистый масштабируемый код без легаси.",
        cta: 'calculator'
      };
    }
    return {
      text: "**Kray Digital Technology Stack:**\n\n• **Frontend:** React 19, TypeScript, Tailwind CSS, Vite, Motion\n• **Full-stack & Backend:** Next.js, Node.js, Express, REST/GraphQL\n• **Databases:** PostgreSQL, Supabase, Redis\n• **Standards:** Ultra-fast load times (<1.2s), clean scalable architecture, 100% responsive design.",
      cta: 'calculator'
    };
  }

  // 6. Greetings / Hello
  if (
    query.includes('прив') || query.includes('здравств') || query.includes('добр') || query.includes('вітаю') || query.includes('хай') || query.includes('салют') || query.includes('hello') || query.includes('hi') || query.includes('hey')
  ) {
    if (lang === 'uk') {
      return {
        text: "Вітаю! Радий вас бачити. Чим я можу вам допомогти?\n\nВи можете запитати мене про **вартість розробки сайту**, терміни робіт, **SEO-просування** чи налаштування **Google Реклами**, або скористатись інтерактивним калькулятором вартості нижче!",
        cta: 'calculator'
      };
    }
    if (lang === 'ru') {
      return {
        text: "Приветствуем! Рад помочь. Чем могу быть полезен?\n\nВы можете спросить меня о **стоимости разработки сайтов**, сроках, **SEO-продвижении** или запуске **Google Рекламы**, либо сразу рассчитать бюджет в калькуляторе!",
        cta: 'calculator'
      };
    }
    return {
      text: "Hello! Great to connect with you. How can I assist you today?\n\nFeel free to ask about our **web development pricing**, delivery timelines, **SEO ranking**, or **Google Ads campaigns**, or click below to estimate project costs!",
      cta: 'calculator'
    };
  }

  // 7. Contacts / Connection / Phone
  if (
    query.includes('контакт') || query.includes('связ') || query.includes('зв\'яз') || query.includes('телефон') || query.includes('почт') || query.includes('пошт') || query.includes('contact') || query.includes('phone') || query.includes('call')
  ) {
    if (lang === 'uk') {
      return {
        text: "**Контакти Kray Digital:**\n\n• Телефон: **+380 (44) 333-88-99**\n• Email: **hello@kray.digital**\n• Telegram: **@kray_digital**\n• Графік: Пн-Пт 09:00 – 19:00\n\nТакож ви можете замовити дзвінок або безкоштовну консультацію прямо через форму на сайті!",
        cta: 'contact'
      };
    }
    if (lang === 'ru') {
      return {
        text: "**Контакты Kray Digital:**\n\n• Телефон: **+380 (44) 333-88-99**\n• Email: **hello@kray.digital**\n• Telegram: **@kray_digital**\n• График: Пн-Пт 09:00 – 19:00\n\nВы также можете оставить заявку на бесплатную консультацию через форму на сайте!",
        cta: 'contact'
      };
    }
    return {
      text: "**Kray Digital Contacts:**\n\n• Phone: **+380 (44) 333-88-99**\n• Email: **hello@kray.digital**\n• Telegram: **@kray_digital**\n• Hours: Mon-Fri 09:00 – 19:00\n\nYou can also request a free call or consultation using the contact form below!",
      cta: 'contact'
    };
  }

  // 8. Default fallback
  if (lang === 'uk') {
    return {
      text: "Дякую за запитання! Агенція **Kray Digital** займається створенням high-load веб-сайтів, комплексним SEO-просуванням та лідогенерацією.\n\n• Хочете дізнатися орієнтовний бюджет? Скористайтеся нашим онлайн-калькулятором!\n• Потрібна індивідуальна пропозиція? Натисніть кнопку нижче для консультації.",
      cta: 'calculator'
    };
  }
  if (lang === 'ru') {
    return {
      text: "Спасибо за вопрос! Агентство **Kray Digital** создает современные веб-сайты под ключ, выводит проекты в ТОП Google и настраивает окупаемую рекламу.\n\n• Хотите быстро узнать бюджет? Воспользуйтесь нашим онлайн-калькулятором!\n• Нужна детальная консультация эксперта? Нажмите кнопку ниже для связи.",
      cta: 'calculator'
    };
  }
  return {
    text: "Thank you for asking! **Kray Digital** specializes in modern high-performance web development, technical SEO, and profitable paid advertising.\n\n• Need an instant estimate? Try our interactive project cost calculator!\n• Want to talk with our team? Request a free consultation below.",
    cta: 'calculator'
  };
}

export default function QuickHelpChat({ onOpenCalculator, onScrollToContact }: QuickHelpChatProps) {
  const { language } = useLanguage();
  const strings = UI_STRINGS[language] || UI_STRINGS.uk;

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnreadPrompt, setHasUnreadPrompt] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: strings.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized, messages, isLoading]);

  // Update initial welcome message if language changes and only welcome message exists
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome-msg') {
        return [{
          id: 'welcome-msg',
          role: 'assistant',
          content: strings.welcome,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
      }
      return prev;
    });
  }, [language, strings.welcome]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnreadPrompt(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: userTime,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    // Natural typing delay (600ms) for an authentic, responsive feel
    setTimeout(() => {
      const { text: replyText, cta: ctaType } = getLocalAssistantReply(text, language);

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showCta: ctaType,
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([{
      id: 'welcome-msg',
      role: 'assistant',
      content: strings.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  // Helper function to format bold text & lists in message content
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      // Parse bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const parsedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-brand-primary-container">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={lIdx}>
          {parsedParts}
          {lIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-end pointer-events-none">
      
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              height: isMinimized ? '64px' : '520px' 
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto w-[330px] sm:w-[390px] bg-brand-surface-container/95 backdrop-blur-xl border border-brand-primary-container/30 rounded-2xl shadow-2xl shadow-cyan-950/40 flex flex-col overflow-hidden mb-4 transition-all duration-300"
            id="quick-help-chat-modal"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00272b] via-[#00383f] to-[#0d2e38] px-4 py-3 border-b border-brand-outline-variant/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-primary-container to-cyan-300 flex items-center justify-center text-[#00363a] font-bold shadow-md shadow-cyan-500/20">
                    <Headphones className="w-5 h-5 text-[#00363a]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#00272b] rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-tight flex items-center gap-1.5">
                    {strings.title}
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-mono border border-emerald-500/30 uppercase tracking-wider">
                      24/7
                    </span>
                  </h3>
                  <p className="text-[11px] text-cyan-200/80">{strings.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClearChat}
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title={strings.clear}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body (Hidden if minimized) */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-brand-outline-variant/30 scrollbar-track-transparent">
                  
                  {/* Messages */}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-center gap-1.5 px-1">
                        {msg.role === 'assistant' ? (
                          <span className="text-[10px] text-cyan-300/80 font-medium flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-brand-primary-container" /> Kray Support
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                            <User className="w-3 h-3 text-emerald-400" /> You
                          </span>
                        )}
                        <span className="text-[9px] text-gray-500">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-900/20'
                            : 'bg-brand-surface-container-high/90 border border-brand-outline-variant/30 text-brand-on-background rounded-bl-none shadow-inner'
                        }`}
                      >
                        {renderFormattedText(msg.content)}
                      </div>

                      {/* Interactive CTA button inside message if suggested */}
                      {msg.role === 'assistant' && msg.showCta === 'calculator' && onOpenCalculator && (
                        <motion.button
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => {
                            setIsOpen(false);
                            onOpenCalculator();
                          }}
                          className="mt-1 ml-1 text-xs bg-gradient-to-r from-brand-primary-container to-cyan-400 text-[#00363a] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer border border-cyan-300/40"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          {strings.openCalcBtn}
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>
                      )}

                      {msg.role === 'assistant' && msg.showCta === 'contact' && onScrollToContact && (
                        <motion.button
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => {
                            setIsOpen(false);
                            onScrollToContact();
                          }}
                          className="mt-1 ml-1 text-xs bg-gradient-to-r from-emerald-500 to-teal-400 text-[#00363a] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer border border-emerald-300/40"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          {strings.contactBtn}
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>
                      )}
                    </div>
                  ))}

                  {/* Suggestion Chips (when only 1 message exists) */}
                  {messages.length === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-2 space-y-1.5"
                    >
                      <p className="text-[11px] font-medium text-brand-primary-container px-1">
                        {strings.suggestionsTitle}
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {strings.suggestions.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(item.prompt)}
                            className="text-left text-xs bg-brand-surface-container-high/60 hover:bg-brand-primary-container/15 hover:border-brand-primary-container/40 text-brand-on-background/90 border border-brand-outline-variant/30 rounded-xl px-3 py-2 transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <span>{item.text}</span>
                            <ArrowRight className="w-3 h-3 text-brand-primary-container opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-brand-primary-container bg-brand-surface-container-high/60 px-3 py-2 rounded-2xl rounded-bl-none border border-brand-primary-container/20 w-fit">
                      <MessageSquare className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
                      <span className="italic">{strings.typing}</span>
                      <div className="flex items-center gap-1 ml-1">
                        <span className="w-1.5 h-1.5 bg-brand-primary-container rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-brand-primary-container rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-brand-primary-container rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-brand-surface-container-high/80 border-t border-brand-outline-variant/30 shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={strings.placeholder}
                      disabled={isLoading}
                      className="flex-1 bg-brand-surface/90 border border-brand-outline-variant/40 focus:border-brand-primary-container text-xs text-white placeholder-gray-400 rounded-xl px-3 py-2.5 outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary-container to-cyan-300 text-[#00363a] flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-cyan-500/20 shrink-0"
                      aria-label={strings.send}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Bubble Button (Bottom Right) */}
      <div className="relative pointer-events-auto flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              handleOpenChat();
            }
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00383f] via-teal-700 to-cyan-400 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/30 border-2 border-brand-primary-container/50 relative transition-all cursor-pointer group"
          aria-label="Open Quick Help Chat"
          id="quick-help-chat-trigger"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Online indicator ping */}
          {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-brand-surface"></span>
            </span>
          )}
        </motion.button>
      </div>

    </div>
  );
}
