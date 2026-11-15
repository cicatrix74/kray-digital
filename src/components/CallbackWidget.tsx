import React from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CallbackWidgetProps {
  onClick: () => void;
}

const TOOLTIP_LABELS = {
  uk: 'Замовити зворотний дзвінок',
  ru: 'Заказать обратный звонок',
  en: 'Request a callback',
};

export default function CallbackWidget({ onClick }: CallbackWidgetProps) {
  const { language } = useLanguage();
  const label = TOOLTIP_LABELS[language] || TOOLTIP_LABELS.uk;

  return (
    <div className="fixed bottom-6 left-6 z-[110] flex items-center group">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        title={label}
        id="floating-callback-widget"
        className="relative w-14 h-14 rounded-full bg-brand-primary-container text-[#00363a] flex items-center justify-center shadow-[0_0_24px_rgba(0,240,255,0.45)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-brand-primary-container/45 animate-callback-pulse pointer-events-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-brand-primary-container/30 animate-callback-pulse-delay pointer-events-none"
        />
        <Phone className="w-6 h-6 stroke-[2.2] animate-phone-ring relative z-10" />
      </button>

      <span className="hidden md:inline-block ml-3 px-3 py-1.5 rounded-xl bg-[#121624]/95 border border-brand-outline-variant/35 text-xs font-semibold text-white shadow-xl opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
