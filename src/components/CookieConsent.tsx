import React, { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

const STORAGE_KEY = 'kray_cookie_consent';

const COPY: Record<
  Language,
  {
    text: string;
    accept: string;
    essential: string;
    closeLabel: string;
  }
> = {
  uk: {
    text: 'Ми використовуємо файли cookie для коректної роботи сайту та аналітики.',
    accept: 'Прийняти',
    essential: 'Лише необхідні',
    closeLabel: 'Закрити повідомлення про cookie',
  },
  ru: {
    text: 'Мы используем файлы cookie для корректной работы сайта и аналитики.',
    accept: 'Принять',
    essential: 'Только необходимые',
    closeLabel: 'Закрыть уведомление о cookie',
  },
  en: {
    text: 'We use cookies to ensure the website works properly and for analytics.',
    accept: 'Accept',
    essential: 'Essential only',
    closeLabel: 'Close cookie notice',
  },
};

export default function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      document.cookie = `kray_consent=${choice}; max-age=31536000; path=/; SameSite=Lax`;
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  const t = COPY[language] ?? COPY.uk;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-20 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-brand-outline-variant/35 bg-[#0f131e]/95 backdrop-blur-xl px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.6)] animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
          <Cookie className="w-5 h-5 text-brand-primary-container shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p className="text-xs sm:text-[13px] text-brand-on-surface leading-snug pr-5 sm:pr-0">
            {t.text}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-on-surface-variant border border-brand-outline-variant/35 hover:text-white hover:border-brand-primary-container/40 transition-colors cursor-pointer"
          >
            {t.essential}
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-primary-container text-[#00363a] hover:brightness-110 transition-all cursor-pointer"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            aria-label={t.closeLabel}
            className="hidden sm:inline-flex p-1 rounded-lg text-brand-on-surface-variant hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
