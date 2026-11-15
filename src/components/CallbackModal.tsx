import React, { useState, useEffect } from 'react';
import { X, PhoneCall, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

export default function CallbackModal({ isOpen, onClose, onSubmitLead }: CallbackModalProps) {
  const { language } = useLanguage();
  const texts = CALLBACK_TEXTS[language] || CALLBACK_TEXTS.uk;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTime, setSelectedTime] = useState(texts.times[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setSelectedTime(texts.times[0]);
  }, [language]);

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
                  {texts.times.map((timeOption) => {
                    const active = selectedTime === timeOption;
                    return (
                      <button
                        key={timeOption}
                        type="button"
                        onClick={() => setSelectedTime(timeOption)}
                        className={`text-xs px-3 py-2 rounded-xl border transition-all text-left cursor-pointer ${
                          active
                            ? 'bg-brand-primary-container/15 border-brand-primary-container text-brand-primary-container font-semibold'
                            : 'bg-brand-surface-container/60 border-brand-outline-variant/30 text-brand-on-surface-variant hover:border-brand-outline-variant/60'
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
