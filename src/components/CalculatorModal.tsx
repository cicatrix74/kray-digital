import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ArrowLeft, Calculator, Calendar, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (lead: { name: string; phone: string; service: string; budget: string; timeline: string }) => void;
  initialService?: string;
}

const LOCALIZED_DATA = {
  uk: {
    services: [
      { id: 'web', name: 'Розробка сайту', icon: '💻' },
      { id: 'seo', name: 'SEO-оптимізація', icon: '📈' },
      { id: 'ads', name: 'Google Реклама', icon: '🎯' },
      { id: 'smm', name: 'Додаткові послуги', icon: '🛠️' }
    ],
    scales: {
      web: [
        { id: 'landing', name: 'Лендинг (Landing Page)', price: 5000, days: 4, daysRange: '3–5 днів' },
        { id: 'business_card', name: 'Сайт-візитка', price: 10000, days: 12, daysRange: '10–14 днів' },
        { id: 'corporate', name: 'Корпоративний сайт', price: 15000, days: 18, daysRange: '14–25 днів' },
        { id: 'shop', name: 'Інтернет-магазин', price: 20000, days: 22, daysRange: '14–30 днів' },
        { id: 'portal', name: 'Складний портал / Сервіс', price: 30000, days: 30, daysRange: '20–40 днів' }
      ],
      seo: [
        { id: 'onpage_seo', name: 'Внутрішня SEO-оптимізація сайту', price: 5000, days: 7, daysRange: '5–10 днів', customPriceLabel: 'від 5 000 ₴ (разово)' },
        { id: 'seo_texts', name: 'SEO-тексти (Копірайтинг)', price: 100, days: 2, daysRange: '1–3 дні', customPriceLabel: '100 ₴ / 1000 симв.' },
        { id: 'image_optimization', name: 'Оптимізація картинок', price: 20, days: 1, daysRange: '1–2 дні', customPriceLabel: '20 ₴ / 1 картинка' },
        { id: 'speed_optimization', name: 'Оптимізація швидкості завантаження сайту', price: 2000, days: 3, daysRange: '2–4 дні', customPriceLabel: 'від 2 000 ₴' }
      ],
      ads: [
        { id: 'test', name: 'Тестовий запуск + Налаштування', price: 3300, days: 7 },
        { id: 'medium', name: 'Комплексний контекст (Пошук+Медійна мережа)', price: 7300, days: 14 },
        { id: 'max', name: 'Performance Max (Ліди на максимум)', price: 12600, days: 21 }
      ],
      smm: [
        { id: 'modernization', name: 'Модернізація сайту', price: 2000, days: 3, daysRange: '2–4 дні', customPriceLabel: 'від 2 000 ₴' },
        { id: 'hosting_migration', name: 'Перенесення сайту на Хостинг', price: 1000, days: 1, daysRange: '1 день', customPriceLabel: '1 000 ₴' },
        { id: 'wp_migration', name: 'Перенесення сайту на Wordpress', price: 3000, days: 3, daysRange: '2–4 дні', customPriceLabel: '3 000 ₴' },
        { id: 'forms_tools', name: 'Додавання форм та корисних інструментів', price: 200, days: 1, daysRange: '1 день', customPriceLabel: 'від 200 ₴' },
        { id: 'server_optimization', name: 'Оптимізація навантаження на сервер', price: 2000, days: 2, daysRange: '1–2 дні', customPriceLabel: 'від 2 000 ₴' },
        { id: 'site_recovery', name: 'Відновлення роботи сайту', price: 1000, days: 1, daysRange: 'терміново від 2 год', customPriceLabel: 'від 1 000 ₴' }
      ]
    },
    timelines: [
      { id: 'fast', name: 'Терміново (доплата 25%)', multiplier: 1.25, timeMultiplier: 0.7 },
      { id: 'normal', name: 'Стандартний термін', multiplier: 1.0, timeMultiplier: 1.0 },
      { id: 'flexible', name: 'Гнучкі терміни (-10% знижка)', multiplier: 0.9, timeMultiplier: 1.3 }
    ],
    labels: {
      title: 'Інтерактивний розрахунок проєкту',
      step1Title: 'Що саме вас цікавить?',
      step1Desc: 'Оберіть ключовий напрямок для розрахунку вартості',
      step2Title: 'Оберіть масштаб та тип проєкту',
      step2Desc: 'Вкажіть складність та необхідні можливості для точної відповідності',
      step3Title: 'Коли необхідно завершити роботу?',
      step3Desc: 'Терміновість впливає на розподіл ресурсів команди',
      step4Title: 'Кому надіслати фінальний кошторис?',
      step4Desc: 'Введіть контакти, щоб закріпити за собою розраховану знижку',
      selectedService: 'Обрана послуга:',
      scaleFormat: 'Масштаб / Формат:',
      executionTime: 'Термін виконання:',
      days: 'днів',
      estBudget: 'Орієнтовний бюджет:',
      nameLabel: "Ваше ім'я",
      phoneLabel: 'Телефон',
      btnSubmit: 'Закріпити кошторис та надіслати заявку',
      disclaimer: 'Натискаючи кнопку, ви погоджуєтеся з обробкою персональних даних',
      successTitle: 'Заявку успішно прийнято!',
      successDesc: 'ми отримали ваші дані та закріпили за вами попередню вартість у розмірі',
      ticketTitle: 'Ваш персональний тікет',
      ticketService: 'Тип рішення:',
      ticketTimeline: 'Закріплений термін:',
      ticketStatus: 'Статус:',
      ticketStatusVal: 'Очікує на дзвінок',
      successNote: 'Наш експерт зв\'яжеться з вами протягом 15 хвилин для підтвердження брифу.',
      btnClose: 'Закрити розрахунок',
      btnBack: 'Назад',
      btnContinue: 'Продовжити',
      validationName: 'Будь ласка, введіть ваше ім\'я',
      validationPhone: 'Будь ласка, введіть номер телефону',
      validationPhoneShort: 'Введіть коректний номер телефону',
      baseCostNoChange: 'Базова вартість без змін',
      acceleratesTeam: 'Прискорює команду (+25% до бюджету)',
      flexibilityDiscount: 'Знижка 10% за гнучкість',
      preliminaryEstimate: 'Попередній розрахунок',
      from: 'від',
      baseTimeline: 'Базовий термін:',
      noPrepaymentBanner: 'Лише 10% передоплати: решта 90% оплачуються за фактом виконання робіт',
      payOnDeliveryNote: '10% передоплати — решта 90% тільки після здачі та перевірки кожного етапу'
    }
  },
  ru: {
    services: [
      { id: 'web', name: 'Разработка сайта', icon: '💻' },
      { id: 'seo', name: 'SEO-оптимизация', icon: '📈' },
      { id: 'ads', name: 'Google Реклама', icon: '🎯' },
      { id: 'smm', name: 'Доп. услуги и техподдержка', icon: '🛠️' }
    ],
    scales: {
      web: [
        { id: 'landing', name: 'Лендинг (Landing Page)', price: 5000, days: 4, daysRange: '3–5 дней' },
        { id: 'business_card', name: 'Сайт-визитка', price: 10000, days: 12, daysRange: '10–14 дней' },
        { id: 'corporate', name: 'Корпоративный сайт', price: 15000, days: 18, daysRange: '14–25 дней' },
        { id: 'shop', name: 'Интернет-магазин', price: 20000, days: 22, daysRange: '14–30 дней' },
        { id: 'portal', name: 'Сложный портал / Сервис', price: 30000, days: 30, daysRange: '20–40 дней' }
      ],
      seo: [
        { id: 'onpage_seo', name: 'Внутренняя SEO-оптимизация сайта', price: 5000, days: 7, daysRange: '5–10 дней', customPriceLabel: 'от 5 000 ₴ (разово)' },
        { id: 'seo_texts', name: 'SEO-тексты (Копирайтинг)', price: 100, days: 2, daysRange: '1–3 дня', customPriceLabel: '100 ₴ / 1000 симв.' },
        { id: 'image_optimization', name: 'Оптимизация картинок', price: 20, days: 1, daysRange: '1–2 дня', customPriceLabel: '20 ₴ / 1 картинка' },
        { id: 'speed_optimization', name: 'Оптимизация скорости загрузки сайта', price: 2000, days: 3, daysRange: '2–4 дня', customPriceLabel: 'от 2 000 ₴' }
      ],
      ads: [
        { id: 'test', name: 'Тестовый запуск + Настройка', price: 3300, days: 7 },
        { id: 'medium', name: 'Комплексный контекст (Поиск+КМС)', price: 7300, days: 14 },
        { id: 'max', name: 'Performance Max (Лиды на максимум)', price: 12600, days: 21 }
      ],
      smm: [
        { id: 'modernization', name: 'Модернизация сайта', price: 2000, days: 3, daysRange: '2–4 дня', customPriceLabel: 'от 2 000 ₴' },
        { id: 'hosting_migration', name: 'Перенос сайта на Хостинг', price: 1000, days: 1, daysRange: '1 день', customPriceLabel: '1 000 ₴' },
        { id: 'wp_migration', name: 'Перенос сайта на Wordpress', price: 3000, days: 3, daysRange: '2–4 дня', customPriceLabel: '3 000 ₴' },
        { id: 'forms_tools', name: 'Добавление форм и полезных инструментов', price: 200, days: 1, daysRange: '1 день', customPriceLabel: 'от 200 ₴' },
        { id: 'server_optimization', name: 'Оптимизация нагрузки на сервер', price: 2000, days: 2, daysRange: '1–2 дня', customPriceLabel: 'от 2 000 ₴' },
        { id: 'site_recovery', name: 'Восстановление работы сайта', price: 1000, days: 1, daysRange: 'срочно от 2 ч', customPriceLabel: 'от 1 000 ₴' }
      ]
    },
    timelines: [
      { id: 'fast', name: 'Срочно (доплата 25%)', multiplier: 1.25, timeMultiplier: 0.7 },
      { id: 'normal', name: 'Стандартный срок', multiplier: 1.0, timeMultiplier: 1.0 },
      { id: 'flexible', name: 'Гибкие сроки (-10% скидка)', multiplier: 0.9, timeMultiplier: 1.3 }
    ],
    labels: {
      title: 'Интерактивный расчет проекта',
      step1Title: 'Что именно вас интересует?',
      step1Desc: 'Выберите ключевое направление для расчета стоимости',
      step2Title: 'Выберите масштаб и тип проекта',
      step2Desc: 'Укажите сложность и требуемые возможности для точного соответствия',
      step3Title: 'Когда необходимо завершить работу?',
      step3Desc: 'Срочность влияет на распределение ресурсов команды',
      step4Title: 'Кому отправить финальную смету?',
      step4Desc: 'Введите контакты, чтобы закрепить за собой расчетную скидку',
      selectedService: 'Выбранная услуга:',
      scaleFormat: 'Масштаб / Формат:',
      executionTime: 'Срок выполнения:',
      days: 'дней',
      estBudget: 'Ориентировочный бюджет:',
      nameLabel: 'Ваше имя',
      phoneLabel: 'Телефон',
      btnSubmit: 'Закрепить смету и отправить заявку',
      disclaimer: 'Нажимая кнопку, вы соглашаетесь с обработкой персональных данных',
      successTitle: 'Заявка успешно принята!',
      successDesc: 'мы получили ваши данные и закрепили за вами предварительную стоимость в размере',
      ticketTitle: 'Ваш персональный тикет',
      ticketService: 'Тип решения:',
      ticketTimeline: 'Закрепленный срок:',
      ticketStatus: 'Статус:',
      ticketStatusVal: 'Ожидает звонка',
      successNote: 'Наш эксперт свяжется с вами в течение 15 минут для подтверждения брифа.',
      btnClose: 'Закрыть расчет',
      btnBack: 'Назад',
      btnContinue: 'Продолжить',
      validationName: 'Пожалуйста, введите ваше имя',
      validationPhone: 'Пожалуйста, введите номер телефона',
      validationPhoneShort: 'Введите корректный номер телефона',
      baseCostNoChange: 'Базовая стоимость без изменений',
      acceleratesTeam: 'Ускоряет команду (+25% к бюджету)',
      flexibilityDiscount: 'Скидка 10% за гибкость',
      preliminaryEstimate: 'Предварительный расчет',
      from: 'от',
      baseTimeline: 'Базовый срок:',
      noPrepaymentBanner: 'Всего 10% предоплаты: остальные 90% оплачиваются по факту выполнения работ',
      payOnDeliveryNote: '10% предоплаты — остальные 90% только после сдачи и проверки каждого этапа'
    }
  },
  en: {
    services: [
      { id: 'web', name: 'Web Development', icon: '💻' },
      { id: 'seo', name: 'SEO Optimization', icon: '📈' },
      { id: 'ads', name: 'Google Ads', icon: '🎯' },
      { id: 'smm', name: 'Maintenance & Extra Services', icon: '🛠️' }
    ],
    scales: {
      web: [
        { id: 'landing', name: 'High-Converting Landing Page', price: 120, days: 4, daysRange: '3–5 days' },
        { id: 'business_card', name: 'Business Card Website', price: 240, days: 12, daysRange: '10–14 days' },
        { id: 'corporate', name: 'Corporate Website', price: 360, days: 18, daysRange: '14–25 days' },
        { id: 'shop', name: 'E-commerce Store', price: 480, days: 22, daysRange: '14–30 days' },
        { id: 'portal', name: 'Complex Portal / Web Service', price: 730, days: 30, daysRange: '20–40 days' }
      ],
      seo: [
        { id: 'onpage_seo', name: 'On-Page SEO Optimization', price: 120, days: 7, daysRange: '5–10 days', customPriceLabel: 'from $120 (one-time)' },
        { id: 'seo_texts', name: 'SEO Copywriting & Content', price: 3, days: 2, daysRange: '1–3 days', customPriceLabel: '$3 / 1,000 chars' },
        { id: 'image_optimization', name: 'Image Optimization & Compression', price: 0.5, days: 1, daysRange: '1–2 days', customPriceLabel: '$0.50 / image' },
        { id: 'speed_optimization', name: 'Page Speed Loading Optimization', price: 50, days: 3, daysRange: '2–4 days', customPriceLabel: 'from $50' }
      ],
      ads: [
        { id: 'test', name: 'Test Campaign + Setup', price: 80, days: 7 },
        { id: 'medium', name: 'Full Contextual (Search+GDN)', price: 170, days: 14 },
        { id: 'max', name: 'Performance Max (Max Leads)', price: 300, days: 21 }
      ],
      smm: [
        { id: 'modernization', name: 'Website Modernization', price: 50, days: 3, daysRange: '2–4 days', customPriceLabel: 'from $50' },
        { id: 'hosting_migration', name: 'Website Hosting Migration', price: 25, days: 1, daysRange: '1 day', customPriceLabel: '$25' },
        { id: 'wp_migration', name: 'WordPress Migration', price: 75, days: 3, daysRange: '2–4 days', customPriceLabel: '$75' },
        { id: 'forms_tools', name: 'Custom Forms & Utility Tools', price: 5, days: 1, daysRange: '1 day', customPriceLabel: 'from $5' },
        { id: 'server_optimization', name: 'Server Load Optimization', price: 50, days: 2, daysRange: '1–2 days', customPriceLabel: 'from $50' },
        { id: 'site_recovery', name: 'Emergency Website Recovery', price: 25, days: 1, daysRange: 'urgent from 2h', customPriceLabel: 'from $25' }
      ]
    },
    timelines: [
      { id: 'fast', name: 'Urgent (25% surcharge)', multiplier: 1.25, timeMultiplier: 0.7 },
      { id: 'normal', name: 'Standard Timeline', multiplier: 1.0, timeMultiplier: 1.0 },
      { id: 'flexible', name: 'Flexible Terms (10% discount)', multiplier: 0.9, timeMultiplier: 1.3 }
    ],
    labels: {
      title: 'Interactive Project Calculator',
      step1Title: 'What are you interested in?',
      step1Desc: 'Select the main direction for cost estimation',
      step2Title: 'Select the scale and type of project',
      step2Desc: 'Specify project complexity and required capabilities',
      step3Title: 'When do we need to finish?',
      step3Desc: 'Urgency affects the allocation of our team resources',
      step4Title: 'Who should we send the final estimate to?',
      step4Desc: 'Enter your details to secure the calculated discount',
      selectedService: 'Selected service:',
      scaleFormat: 'Scale / Format:',
      executionTime: 'Delivery timeline:',
      days: 'days',
      estBudget: 'Estimated budget:',
      nameLabel: 'Your name',
      phoneLabel: 'Phone number',
      btnSubmit: 'Lock budget & submit request',
      disclaimer: 'By clicking, you agree to our personal data processing policy',
      successTitle: 'Request successfully accepted!',
      successDesc: 'we have received your info and secured your budget estimate of',
      ticketTitle: 'Your Personal Ticket',
      ticketService: 'Solution Type:',
      ticketTimeline: 'Secured timeline:',
      ticketStatus: 'Status:',
      ticketStatusVal: 'Awaiting call',
      successNote: 'Our expert will contact you within 15 minutes to confirm the brief.',
      btnClose: 'Close calculator',
      btnBack: 'Back',
      btnContinue: 'Continue',
      validationName: 'Please enter your name',
      validationPhone: 'Please enter your phone number',
      validationPhoneShort: 'Please enter a valid phone number',
      baseCostNoChange: 'Base cost without changes',
      acceleratesTeam: 'Accelerates team (+25% budget)',
      flexibilityDiscount: '10% discount for flexibility',
      preliminaryEstimate: 'Preliminary calculation',
      from: 'from',
      baseTimeline: 'Base timeline:',
      noPrepaymentBanner: 'Only 10% deposit: remaining 90% paid upon completion of milestones',
      payOnDeliveryNote: '10% deposit — remaining 90% upon inspection and approval of completed milestones'
    }
  }
};

export default function CalculatorModal({ isOpen, onClose, onSubmitLead, initialService }: CalculatorModalProps) {
  const { language } = useLanguage();
  const currentLangData = LOCALIZED_DATA[language as keyof typeof LOCALIZED_DATA] || LOCALIZED_DATA.uk;
  const servicesList = currentLangData.services;
  const scalesDict = currentLangData.scales;
  const timelinesList = currentLangData.timelines;
  const labels = currentLangData.labels;

  const [step, setStep] = useState(1);
  const [service, setService] = useState('web');
  const [scale, setScale] = useState('');
  const [timeline, setTimeline] = useState('normal');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize initial service from outside click
  useEffect(() => {
    if (initialService) {
      const match = servicesList.find(s => s.name.toLowerCase().includes(initialService.toLowerCase()));
      if (match) {
        setService(match.id);
      }
    }
  }, [initialService, isOpen, servicesList]);

  // Reset calculator when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setScale('');
      setTimeline('normal');
      setName('');
      setPhone('');
      setErrors({});
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Set default scale when service changes
  useEffect(() => {
    const scales = scalesDict[service as keyof typeof scalesDict] || [];
    if (scales.length > 0) {
      setScale(scales[0].id);
    }
  }, [service, scalesDict]);

  if (!isOpen) return null;

  // Perform Calculations
  const getCalculation = () => {
    const serviceScales = scalesDict[service as keyof typeof scalesDict] || [];
    const activeScale = serviceScales.find(s => s.id === scale) || serviceScales[0];
    const activeTimeline = timelinesList.find(t => t.id === timeline) || timelinesList[1];

    if (!activeScale) return { price: 0, days: 0, serviceName: '', scaleName: '', activeScale: null };

    const rawPrice = activeScale.price;
    const finalPrice = Math.round(rawPrice * activeTimeline.multiplier);
    const finalDays = Math.round(activeScale.days * activeTimeline.timeMultiplier);

    return {
      price: finalPrice,
      days: finalDays,
      serviceName: servicesList.find(s => s.id === service)?.name || '',
      scaleName: activeScale.name,
      activeScale
    };
  };

  const { price, days, serviceName, scaleName, activeScale } = getCalculation();

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1 && !service) {
      newErrors.service = 'Error';
    }
    if (step === 2 && !scale) {
      newErrors.scale = 'Error';
    }
    if (step === 3 && !timeline) {
      newErrors.timeline = 'Error';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = labels.validationName;
    if (!phone.trim()) {
      newErrors.phone = labels.validationPhone;
    } else if (phone.replace(/\D/g, '').length < 9) {
      newErrors.phone = labels.validationPhoneShort;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate network latency
    setTimeout(() => {
      onSubmitLead({
        name,
        phone,
        service: `${serviceName} (${scaleName})`,
        budget: `${price.toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} ${language === 'en' ? '$' : '₴'}`,
        timeline: `${days} ${labels.days}`
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const currentScales = scalesDict[service as keyof typeof scalesDict] || [];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0e19]/85 backdrop-blur-md"
        id="calc-backdrop"
      />

      {/* Calculator Window */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-2xl bg-brand-surface-container rounded-2xl border border-brand-outline-variant/30 shadow-2xl overflow-hidden flex flex-col z-10"
        id="calc-modal-content"
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-primary-container/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="p-5 border-b border-brand-outline-variant/15 flex items-center justify-between bg-brand-surface-container-low relative z-10">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-primary-container" />
            <h3 className="text-lg font-bold font-display text-brand-on-surface">{labels.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-brand-surface-container-highest text-brand-on-surface-variant hover:text-brand-on-surface transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-brand-surface-container-low flex">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-full flex-1 transition-all duration-300 ${
                s <= step ? (isSuccess ? 'bg-brand-tertiary-container' : 'bg-brand-primary-container') : 'bg-brand-outline-variant/20'
              }`}
            />
          ))}
        </div>

        {/* Zero Prepayment Advantage Banner */}
        <div className="mx-6 mt-4 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2.5 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{labels.noPrepaymentBanner}</span>
        </div>

        {/* Main Body */}
        <div className="p-6 relative z-10 flex-1 overflow-y-auto max-h-[70vh]">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* STEP 1: SERVICE TYPE */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-center md:text-left">
                      <h4 className="text-base font-bold text-brand-on-surface">{labels.step1Title}</h4>
                      <p className="text-xs text-brand-on-surface-variant">{labels.step1Desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {servicesList.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setService(s.id)}
                          className={`p-4 rounded-xl border text-left flex flex-col gap-3 transition-all duration-200 cursor-pointer ${
                            service === s.id
                              ? 'bg-brand-surface-container-low border-brand-primary-container shadow-glow scale-[1.02]'
                              : 'bg-brand-surface-container-lowest border-brand-outline-variant/10 hover:border-brand-outline-variant/30 hover:bg-brand-surface-container-lowest/80'
                          }`}
                        >
                          <span className="text-2xl">{s.icon}</span>
                          <span className="text-xs md:text-sm font-semibold text-brand-on-surface">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: COMPLEXITY & SCALE */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="text-center md:text-left">
                      <h4 className="text-base font-bold text-brand-on-surface">{labels.step2Title}</h4>
                      <p className="text-xs text-brand-on-surface-variant">{labels.step2Desc}</p>
                    </div>
                    <div className="space-y-2.5">
                      {currentScales.map((sc) => {
                        const isNegotiable = (sc as any).isNegotiable;
                        const customLabel = (sc as any).customPriceLabel;
                        const oldPrice = sc.price * 3;
                        return (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => setScale(sc.id)}
                            className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all duration-200 cursor-pointer ${
                              scale === sc.id
                                ? 'bg-brand-surface-container-low border-brand-primary-container shadow-glow'
                                : 'bg-brand-surface-container-lowest border-brand-outline-variant/10 hover:border-brand-outline-variant/30 hover:bg-brand-surface-container-lowest/80'
                            }`}
                          >
                            <div className="flex-1 pr-4">
                              <span className="text-xs md:text-sm font-bold text-brand-on-surface block">{sc.name}</span>
                              <span className="text-[11px] text-brand-on-surface-variant mt-1 block">
                                {labels.baseTimeline} {(sc as any).daysRange ? (sc as any).daysRange : `${sc.days} ${labels.days}`}
                              </span>
                            </div>
                            <div className="text-right shrink-0 flex flex-col items-end justify-center">
                              {isNegotiable ? (
                                <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-cyan-500/10 text-brand-primary-container border border-cyan-500/25 uppercase tracking-wider mb-1.5">
                                  {language === 'en' ? 'FLEXIBLE' : language === 'uk' ? 'ГНУЧКО' : 'ДОГОВОРНАЯ'}
                                </span>
                              ) : (
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <span className="px-1.5 py-0.5 text-[9px] font-black rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider animate-pulse">
                                    {language === 'en' ? 'SALE -66%' : language === 'uk' ? 'ЗНИЖКА -66%' : 'СКИДКА -66%'}
                                  </span>
                                  <span className="text-[10px] text-brand-on-surface-variant/40 line-through">
                                    {oldPrice.toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} {language === 'en' ? '$' : '₴'}
                                  </span>
                                </div>
                              )}
                              <span className="text-xs md:text-sm font-black text-brand-primary-container block font-display">
                                {customLabel ? customLabel : `${labels.from} ${sc.price.toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} ${language === 'en' ? '$' : '₴'}`}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: TIMELINES */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="text-center md:text-left">
                      <h4 className="text-base font-bold text-brand-on-surface">{labels.step3Title}</h4>
                      <p className="text-xs text-brand-on-surface-variant">{labels.step3Desc}</p>
                    </div>
                    <div className="space-y-2.5">
                      {timelinesList.map((tl) => (
                        <button
                          key={tl.id}
                          type="button"
                          onClick={() => setTimeline(tl.id)}
                          className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all duration-200 cursor-pointer ${
                            timeline === tl.id
                              ? 'bg-brand-surface-container-low border-brand-primary-container shadow-glow'
                              : 'bg-brand-surface-container-lowest border-brand-outline-variant/10 hover:border-brand-outline-variant/30'
                          }`}
                        >
                          <div>
                            <span className="text-xs md:text-sm font-bold text-brand-on-surface block">{tl.name}</span>
                            <span className="text-[11px] text-brand-on-surface-variant mt-1 block">
                              {tl.multiplier === 1.0
                                ? labels.baseCostNoChange
                                : tl.multiplier > 1.0
                                ? labels.acceleratesTeam
                                : labels.flexibilityDiscount}
                            </span>
                          </div>
                          <div className="shrink-0">
                            {timeline === tl.id && (
                              <div className="w-5 h-5 rounded-full bg-brand-primary-container flex items-center justify-center text-[#00363a]">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Live Estimate Preview box */}
                    <div className="bg-brand-surface-container-lowest p-4 rounded-xl border border-brand-outline-variant/10 mt-6 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] uppercase text-brand-on-surface-variant block">{labels.preliminaryEstimate}</span>
                        <span className="text-xs text-brand-on-surface-variant block max-w-[280px] truncate">{scaleName}</span>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="px-1 py-0.5 text-[8px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                            -66%
                          </span>
                          <span className="text-[10px] text-brand-on-surface-variant/40 line-through">
                            {(price * 3).toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} {language === 'en' ? '$' : '₴'}
                          </span>
                        </div>
                        <span className="text-lg font-black text-brand-primary-container block font-display">
                          ~ {price.toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} {language === 'en' ? '$' : '₴'}
                        </span>
                        <span className="text-[10px] text-brand-on-surface-variant">{labels.executionTime} {days} {labels.days}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONTACT INFO */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="text-center md:text-left">
                      <h4 className="text-base font-bold text-brand-on-surface">{labels.step4Title}</h4>
                      <p className="text-xs text-brand-on-surface-variant">{labels.step4Desc}</p>
                    </div>

                    {/* Final Proposal Summary card */}
                    <div className="bg-brand-surface-container-lowest p-4 rounded-xl border border-brand-outline-variant/15 space-y-3">
                      <div className="flex justify-between text-xs border-b border-brand-outline-variant/10 pb-2">
                        <span className="text-brand-on-surface-variant">{labels.selectedService}</span>
                        <span className="font-bold text-brand-on-surface">{serviceName}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-brand-outline-variant/10 pb-2">
                        <span className="text-brand-on-surface-variant">{labels.scaleFormat}</span>
                        <span className="font-bold text-brand-on-surface text-right max-w-[240px] truncate">{scaleName}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-brand-outline-variant/10 pb-2">
                        <span className="text-brand-on-surface-variant">{labels.executionTime}</span>
                        <span className="font-bold text-brand-on-surface flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-primary-container" /> {days} {labels.days}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-xs font-bold text-brand-on-surface">{labels.estBudget}</span>
                        <div className="text-right flex flex-col items-end">
                          {(activeScale as any)?.isNegotiable ? (
                            <span className="text-base font-black text-brand-primary-container font-display">
                              {language === 'en' ? 'By agreement' : language === 'uk' ? 'За домовленістю' : 'По согласованию'}
                            </span>
                          ) : (
                            <>
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="px-1 py-0.5 text-[8px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                                  -66%
                                </span>
                                <span className="text-[10px] text-brand-on-surface-variant/40 line-through">
                                  {(price * 3).toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} {language === 'en' ? '$' : '₴'}
                                </span>
                              </div>
                              <span className="text-xl font-black text-brand-primary-container font-display">
                                {(activeScale as any)?.customPriceLabel ? (activeScale as any).customPriceLabel : `~ ${price.toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} ${language === 'en' ? '$' : '₴'}`}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Pay-on-delivery note */}
                      <div className="flex items-center gap-2 pt-2.5 border-t border-brand-outline-variant/15 text-[11px] text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>{labels.payOnDeliveryNote}</span>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-brand-on-surface-variant mb-1">{labels.nameLabel}</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alexander"
                          className="w-full bg-brand-surface-container-lowest border border-brand-outline-variant/50 rounded px-4 py-3 text-xs md:text-sm text-brand-on-surface focus:border-brand-primary-container focus:ring-1 focus:ring-brand-primary-container outline-none transition-all"
                        />
                        {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-brand-on-surface-variant mb-1">{labels.phoneLabel}</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+380 (99) 000-00-00"
                          className="w-full bg-brand-surface-container-lowest border border-brand-outline-variant/50 rounded px-4 py-3 text-xs md:text-sm text-brand-on-surface focus:border-brand-primary-container focus:ring-1 focus:ring-brand-primary-container outline-none transition-all"
                        />
                        {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-primary-container text-[#00363a] py-3.5 rounded text-xs font-bold hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4 shadow-glow border-none cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-[#00363a] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Phone className="w-4 h-4" /> {labels.btnSubmit}
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-brand-on-surface-variant text-center opacity-70 leading-relaxed">
                        {labels.disclaimer}
                      </p>
                    </form>
                  </div>
                )}
              </motion.div>
            ) : (
              /* SUCCESS SCREEN */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-16 h-16 bg-brand-tertiary-container/10 border-2 border-brand-tertiary-container rounded-full flex items-center justify-center mx-auto text-brand-tertiary-container">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-bold font-display text-brand-on-surface">{labels.successTitle}</h4>
                  <p className="text-xs md:text-sm text-brand-on-surface-variant max-w-md mx-auto leading-relaxed">
                    {name || 'client'}, {labels.successDesc} <strong className="text-brand-primary-container">{(activeScale as any)?.isNegotiable ? (language === 'en' ? 'By agreement' : language === 'uk' ? 'За домовленістю' : 'По согласованию') : ((activeScale as any)?.customPriceLabel || `${price.toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} ${language === 'en' ? '$' : '₴'}`)}</strong> ({(activeScale as any)?.isNegotiable ? (language === 'en' ? 'special terms' : language === 'uk' ? 'індивідуальні умови!' : 'индивидуальные условия!') : (language === 'en' ? '-66% discount applied!' : language === 'uk' ? 'з урахуванням знижки -66%!' : 'с учетом скидки -66%!')}).
                  </p>
                </div>

                <div className="bg-brand-surface-container-lowest p-4 rounded-xl border border-brand-outline-variant/10 max-w-sm mx-auto text-left text-xs space-y-2.5 shadow-inner">
                  <div className="font-bold text-brand-on-surface text-center border-b border-brand-outline-variant/10 pb-2 mb-1">
                    {labels.ticketTitle}
                  </div>
                  <div>
                    <span className="text-brand-on-surface-variant">{labels.ticketService}</span> <span className="font-bold text-brand-on-surface block mt-0.5">{scaleName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-on-surface-variant">{labels.ticketTimeline}</span> <span className="font-bold text-brand-on-surface">{days} {labels.days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-on-surface-variant">{labels.ticketStatus}</span> <span className="text-brand-tertiary-container font-bold">{labels.ticketStatusVal}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-on-surface-variant max-w-xs mx-auto leading-relaxed">
                  {labels.successNote}
                </p>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-brand-surface-container-high hover:bg-brand-surface-container-highest border border-brand-outline-variant/30 text-brand-on-surface text-xs font-bold rounded cursor-pointer transition-colors"
                >
                  {labels.btnClose}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer controls (when not success) */}
        {!isSuccess && (
          <div className="p-4 bg-brand-surface-container-low border-t border-brand-outline-variant/15 flex justify-between items-center px-6 relative z-10">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-xs font-bold text-brand-on-surface hover:text-brand-primary-container flex items-center gap-1 transition-colors cursor-pointer border-none bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" /> {labels.btnBack}
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-brand-primary-container text-[#00363a] text-xs font-bold rounded flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-glow border-none"
              >
                {labels.btnContinue} <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        )}
      </motion.div>
    </div>
  );
}
