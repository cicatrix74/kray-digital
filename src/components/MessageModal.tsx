import React, { useState, useEffect } from 'react';
import { X, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (lead: {
    name: string;
    phone: string;
    service: string;
  }) => void;
}

const TEXTS = {
  uk: {
    badge: 'Замовлення сайту',
    title: 'Замовити сайт',
    subtitle: 'Залиште контакти та короткий опис проєкту — ми підготуємо пропозицію та зв’яжемося з вами.',
    nameLabel: "Ваше ім'я",
    namePlaceholder: 'Олександр',
    contactLabel: 'Телефон або Telegram / Email',
    contactPlaceholder: '+38 (0__) ___-__-__ або @username',
    msgLabel: 'Який сайт потрібен?',
    msgPlaceholder: 'Наприклад: лендінг, інтернет-магазин або корпоративний сайт...',
    submit: 'Замовити сайт',
    errName: "Вкажіть ім'я",
    errContact: 'Вкажіть контакт для зв’язку',
    errMsg: 'Коротко опишіть задачу',
    successTitle: 'Заявку прийнято!',
    successDesc: 'Дякуємо! Ми отримали ваше замовлення та зв’яжемося з вами у робочий час.',
    closeBtn: 'Закрити',
  },
  ru: {
    badge: 'Заказ сайта',
    title: 'Заказать сайт',
    subtitle: 'Оставьте контакты и краткое описание проекта — мы подготовим предложение и свяжемся с вами.',
    nameLabel: 'Ваше имя',
    namePlaceholder: 'Александр',
    contactLabel: 'Телефон или Telegram / Email',
    contactPlaceholder: '+38 (0__) ___-__-__ или @username',
    msgLabel: 'Какой сайт нужен?',
    msgPlaceholder: 'Например: лендинг, интернет-магазин или корпоративный сайт...',
    submit: 'Заказать сайт',
    errName: 'Укажите имя',
    errContact: 'Укажите контакт для связи',
    errMsg: 'Кратко опишите задачу',
    successTitle: 'Заявка принята!',
    successDesc: 'Спасибо! Мы получили ваш заказ и свяжемся с вами в рабочее время.',
    closeBtn: 'Закрыть',
  },
  en: {
    badge: 'Order Website',
    title: 'Order a Website',
    subtitle: 'Leave your contact details and project brief — we will prepare a proposal and reach out.',
    nameLabel: 'Your Name',
    namePlaceholder: 'Alex',
    contactLabel: 'Phone or Telegram / Email',
    contactPlaceholder: '+38 (0__) ___-__-__ or @username',
    msgLabel: 'What kind of website do you need?',
    msgPlaceholder: 'E.g. landing page, e-commerce store, or corporate website...',
    submit: 'Order Website',
    errName: 'Please enter your name',
    errContact: 'Please enter a contact',
    errMsg: 'Please describe your project',
    successTitle: 'Request Received!',
    successDesc: 'Thank you! We received your order and will respond during business hours.',
    closeBtn: 'Close',
  }
};

export default function MessageModal({ isOpen, onClose, onSubmitLead }: MessageModalProps) {
  const { language } = useLanguage();
  const txt = TEXTS[language] || TEXTS.uk;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setContact('');
      setMessage('');
      setError('');
      setIsSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError(txt.errName);
    if (!contact.trim()) return setError(txt.errContact);
    if (!message.trim()) return setError(txt.errMsg);

    setError('');
    onSubmitLead({
      name: name.trim(),
      phone: contact.trim(),
      service: `Сообщение (нерабочее время): ${message.trim().slice(0, 140)}`,
    });
    setIsSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070a12]/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#111726] border border-[#3b494b]/40 rounded-2xl p-6 shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">{txt.successTitle}</h3>
            <p className="text-sm text-gray-300">{txt.successDesc}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl bg-brand-primary-container text-[#041322] font-bold text-sm hover:brightness-110 transition-all cursor-pointer"
            >
              {txt.closeBtn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{txt.badge}</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">{txt.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{txt.subtitle}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">{txt.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={txt.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b101b] border border-white/10 focus:border-brand-primary-container outline-none text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">{txt.contactLabel}</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={txt.contactPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b101b] border border-white/10 focus:border-brand-primary-container outline-none text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">{txt.msgLabel}</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={txt.msgPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b101b] border border-white/10 focus:border-brand-primary-container outline-none text-sm text-white resize-none"
              />
            </div>

            {error && <div className="text-xs font-semibold text-red-400">{error}</div>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#041322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{txt.submit}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
