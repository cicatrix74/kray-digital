import React, { useState, useEffect } from 'react';
import { X, PhoneCall, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getKyivScheduleProgress } from './ContactLinks';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (lead: {
    name: string;
    phone: string;
    service: string;
    budget?: string;
    timeline?: string;
  }) => void;
}

const CALLBACK_TEXTS = {
  uk: {
    badge: 'Зворотний дзвінок',
    title: 'Передзвонимо за 5 хвилин',
    subtitle: 'Залиште номер — обговоримо ваш проєкт та підкажемо оптимальне рішення без нав’язливих продажів.',
    nameLabel: "Ваше ім'я",
    namePlaceholder: 'Олександр',
    phoneLabel: 'Номер телефону',
    phonePlaceholder: '+38 (0__) ___-__-__',
    timeLabel: 'Коли зручно зателефонувати?',
    times: ['Зараз (5–10 хв)', 'Протягом години', 'Сьогодні 14:00–18:00', 'Завтра вранці'],
    submit: 'Чекаю дзвінка',
    errName: "Вкажіть, будь ласка, ім'я",
    errPhone: 'Введіть номер телефону',
    errPhoneShort: 'Перевірте правильність номера',
    successTitle: 'Заявку прийнято!',
    successDesc: 'Менеджер уже бачить ваш номер і набере вас у вибраний час.',
    closeBtn: 'Чудово, дякую',
    serviceTag: 'Зворотний дзвінок (Callback)',
    budgetTag: 'Безкоштовна консультація',
  },
  ru: {
    badge: 'Обратный звонок',
    title: 'Перезвоним за 5 минут',
    subtitle: 'Оставьте номер — обсудим ваш проект и подскажем оптимальное решение без навязчивых продаж.',
    nameLabel: 'Ваше имя',
    namePlaceholder: 'Александр',
    phoneLabel: 'Номер телефона',
    phonePlaceholder: '+38 (0__) ___-__-__',
    timeLabel: 'Когда удобно позвонить?',
    times: ['Сейчас (5–10 мин)', 'В течение часа', 'Сегодня 14:00–18:00', 'Завтра утром'],
    submit: 'Жду звонка',
    errName: 'Укажите, пожалуйста, имя',
    errPhone: 'Введите номер телефона',
    errPhoneShort: 'Проверьте корректность номера',
    successTitle: 'Заявка принята!',
    successDesc: 'Менеджер уже получил ваш номер и перезвонит в выбранное время.',
    closeBtn: 'Отлично, спасибо',
    serviceTag: 'Обратный звонок (Callback)',
    budgetTag: 'Бесплатная консультация',
  },
  en: {
    badge: 'Callback Request',
    title: 'We’ll call you back in 5 min',
    subtitle: 'Leave your number — we’ll discuss your project and suggest the best approach with zero sales pressure.',
    nameLabel: 'Your Name',
    namePlaceholder: 'Alex',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+38 (0__) ___-__-__',
    timeLabel: 'Best time to call?',
    times: ['Right now (5–10 min)', 'Within 1 hour', 'Today 14:00–18:00', 'Tomorrow morning'],
    submit: 'Request Callback',
    errName: 'Please enter your name',
    errPhone: 'Please enter your phone number',
    errPhoneShort: 'Please enter a valid phone number',
    successTitle: 'Request Received!',
    successDesc: 'Our manager already received your number and will call at your preferred time.',
    closeBtn: 'Great, thanks',
    serviceTag: 'Callback Request',
    budgetTag: 'Free Consultation',
  },
};

function getKyivTimeDetails() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = dayMap[map.weekday || 'Mon'] ?? 1;
  const hour = parseInt(map.hour || '0', 10) % 24;
  const minute = parseInt(map.minute || '0', 10);
  const mins = hour * 60 + minute;
  const remainingWorkMinutes = day >= 1 && day <= 5 && mins < 18 * 60 ? 18 * 60 - mins : 0;
  return { day, hour, minute, mins, remainingWorkMinutes };
}

function getDynamicSlots(language: 'uk' | 'ru' | 'en', isWorking: boolean, remainingWorkMinutes: number) {
  const { day, hour } = getKyivTimeDetails();

  const isWeekendNext = (day === 5 && (hour >= 18 || remainingWorkMinutes < 5)) || day === 6 || day === 0;
  const isEarlyWeekday = day >= 1 && day <= 5 && hour < 9;

  if (isWorking && remainingWorkMinutes >= 5) {
    if (language === 'ru') {
      return [
        'Сейчас (5–10 мин)',
        'В течение часа',
        'Сегодня до 18:00',
        day === 5 ? 'В понедельник утром' : 'Завтра утром',
      ];
    }
    if (language === 'en') {
      return [
        'Right now (5–10 min)',
        'Within 1 hour',
        'Today before 18:00',
        day === 5 ? 'Monday morning' : 'Tomorrow morning',
      ];
    }
    return [
      'Зараз (5–10 хв)',
      'Протягом години',
      'Сьогодні до 18:00',
      day === 5 ? 'У понеділок вранці' : 'Завтра вранці',
    ];
  }

  if (isWeekendNext) {
    if (language === 'ru') {
      return ['В понедельник 09:00–12:00', 'В понедельник 12:00–15:00', 'В понедельник 15:00–18:00', 'Во вторник утром'];
    }
    if (language === 'en') {
      return ['Monday 09:00–12:00', 'Monday 12:00–15:00', 'Monday 15:00–18:00', 'Tuesday morning'];
    }
    return ['У понеділок 09:00–12:00', 'У понеділок 12:00–15:00', 'У понеділок 15:00–18:00', 'У вівторок вранці'];
  }

  if (isEarlyWeekday) {
    if (language === 'ru') {
      return ['Сегодня 09:00–12:00', 'Сегодня 12:00–15:00', 'Сегодня 15:00–18:00', 'Завтра утром'];
    }
    if (language === 'en') {
      return ['Today 09:00–12:00', 'Today 12:00–15:00', 'Today 15:00–18:00', 'Tomorrow morning'];
    }
    return ['Сьогодні 09:00–12:00', 'Сьогодні 12:00–15:00', 'Сьогодні 15:00–18:00', 'Завтра вранці'];
  }

  // Mon-Thu after 18:00
  if (language === 'ru') {
    return ['Завтра 09:00–12:00', 'Завтра 12:00–15:00', 'Завтра 15:00–18:00', 'Через день утром'];
  }
  if (language === 'en') {
    return ['Tomorrow 09:00–12:00', 'Tomorrow 12:00–15:00', 'Tomorrow 15:00–18:00', 'Later this week'];
  }
  return ['Завтра 09:00–12:00', 'Завтра 12:00–15:00', 'Завтра 15:00–18:00', 'Через день вранці'];
}

const OFF_HOURS_COPY = {
  uk: {
    badge: 'Неробочий час',
    title: 'Передзвонимо у робочий час',
    subtitle: 'Зараз неробочий час — залиште номер, і ми зв’яжемося з вами одразу після відкриття (Пн–Пт з 09:00).',
    submit: 'Запланувати дзвінок',
  },
  ru: {
    badge: 'Нерабочее время',
    title: 'Перезвоним в рабочее время',
    subtitle: 'Сейчас нерабочее время — оставьте номер, и мы свяжемся с вами сразу после открытия (Пн–Пт с 09:00).',
    submit: 'Запланировать звонок',
  },
  en: {
    badge: 'After hours',
    title: 'We’ll call back during business hours',
    subtitle: 'We are currently offline — leave your number and we’ll reach out as soon as we open (Mon–Fri from 09:00).',
    submit: 'Schedule Callback',
  },
};

export default function CallbackModal({ isOpen, onClose, onSubmitLead }: CallbackModalProps) {
  const { language } = useLanguage();
  const baseTexts = CALLBACK_TEXTS[language] || CALLBACK_TEXTS.uk;
  const [isWorking, setIsWorking] = useState(() => getKyivScheduleProgress().isWorkingHours);
  const [timeDetails, setTimeDetails] = useState(() => getKyivTimeDetails());

  useEffect(() => {
    if (!isOpen) return;
    setIsWorking(getKyivScheduleProgress().isWorkingHours);
    setTimeDetails(getKyivTimeDetails());
    const id = window.setInterval(() => {
      setIsWorking(getKyivScheduleProgress().isWorkingHours);
      setTimeDetails(getKyivTimeDetails());
    }, 15000);
    return () => window.clearInterval(id);
  }, [isOpen]);

  const isLessThanHour = isWorking && timeDetails.remainingWorkMinutes > 0 && timeDetails.remainingWorkMinutes < 60;
  const isLessThan5Min = isWorking && timeDetails.remainingWorkMinutes > 0 && timeDetails.remainingWorkMinutes < 5;

  const dynamicTimes = getDynamicSlots(language, isWorking, timeDetails.remainingWorkMinutes);
  const offCopy = OFF_HOURS_COPY[language] || OFF_HOURS_COPY.uk;
  const tomorrowTitle =
    language === 'ru'
      ? (timeDetails.day === 5 ? 'Перезвоним в понедельник' : 'Перезвоним завтра')
      : language === 'en'
        ? (timeDetails.day === 5 ? 'We’ll call back on Monday' : 'We’ll call back tomorrow')
        : (timeDetails.day === 5 ? 'Передзвонимо у понеділок' : 'Передзвонимо завтра');

  const texts = !isWorking
    ? { ...baseTexts, ...offCopy, times: dynamicTimes }
    : isLessThan5Min
      ? { ...baseTexts, title: tomorrowTitle, times: dynamicTimes }
      : { ...baseTexts, times: dynamicTimes };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTime, setSelectedTime] = useState(texts.times[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setSelectedTime(texts.times[0]);
  }, [language, isWorking, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = texts.errName;
    }
    const digits = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      newErrors.phone = texts.errPhone;
    } else if (digits.length < 9) {
      newErrors.phone = texts.errPhoneShort;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmitLead({
      name: name.trim(),
      phone: phone.trim(),
      service: texts.serviceTag,
      budget: texts.budgetTag,
      timeline: selectedTime,
    });
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070a12]/80 backdrop-blur-md animate-fade-in"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-modal-title"
    >
      <div
        className="w-full max-w-md bg-[#121624] border border-brand-outline-variant/35 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-primary-container/15 blur-3xl rounded-full pointer-events-none" />

        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-brand-on-surface-variant hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/25 text-brand-primary-container text-xs font-semibold mb-4">
              <PhoneCall className="w-3.5 h-3.5 animate-phone-ring" />
              <span>{texts.badge}</span>
            </div>

            <h3
              id="callback-modal-title"
              className="font-display text-2xl font-extrabold text-white mb-2"
            >
              {texts.title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed mb-5">
              {texts.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="callback-name"
                  className="block text-xs font-semibold text-brand-on-surface-variant mb-1.5"
                >
                  {texts.nameLabel}
                </label>
                <input
                  id="callback-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={texts.namePlaceholder}
                  className="w-full bg-brand-surface-container border border-brand-outline-variant/50 rounded-xl px-4 py-3 text-sm text-brand-on-surface focus:border-brand-primary-container focus:ring-1 focus:ring-brand-primary-container outline-none transition-colors"
                />
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label
                  htmlFor="callback-phone"
                  className="block text-xs font-semibold text-brand-on-surface-variant mb-1.5"
                >
                  {texts.phoneLabel}
                </label>
                <input
                  id="callback-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={texts.phonePlaceholder}
                  className="w-full bg-brand-surface-container border border-brand-outline-variant/50 rounded-xl px-4 py-3 text-sm text-brand-on-surface focus:border-brand-primary-container focus:ring-1 focus:ring-brand-primary-container outline-none transition-colors"
                />
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-on-surface-variant mb-2">
                  <Clock className="w-3.5 h-3.5 text-brand-primary-container" />
                  {texts.timeLabel}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {texts.times.map((timeOption, idx) => {
                    const active = selectedTime === timeOption;
                    const isWithinHourDisabled = isWorking && !isLessThan5Min && isLessThanHour && idx === 1;
                    return (
                      <button
                        key={timeOption}
                        type="button"
                        disabled={isWithinHourDisabled}
                        onClick={() => !isWithinHourDisabled && setSelectedTime(timeOption)}
                        className={`text-xs px-3 py-2 rounded-xl border transition-all text-left ${
                          isWithinHourDisabled
                            ? 'bg-brand-surface-container/30 border-brand-outline-variant/20 text-brand-on-surface-variant/40 cursor-not-allowed opacity-50'
                            : active
                              ? 'bg-brand-primary-container/15 border-brand-primary-container text-brand-primary-container font-semibold cursor-pointer'
                              : 'bg-brand-surface-container/60 border-brand-outline-variant/30 text-brand-on-surface-variant hover:border-brand-outline-variant/60 cursor-pointer'
                        }`}
                      >
                        {timeOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary-container text-[#00363a] font-bold text-sm py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{texts.submit}</span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-white">{texts.successTitle}</h3>
            <p className="text-sm text-brand-on-surface-variant leading-relaxed">
              {texts.successDesc}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-primary-container bg-brand-primary-container/10 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedTime}</span>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full bg-brand-primary-container text-[#00363a] font-bold text-sm py-3 rounded-xl hover:brightness-110 transition-all cursor-pointer mt-2"
            >
              {texts.closeBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
