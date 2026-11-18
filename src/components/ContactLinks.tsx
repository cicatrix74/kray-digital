import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PHONE_PARTS = ['+38', '063', '767', '83', '20'];
export const CONTACT_EMAIL = 'info@kray-digital.pp.ua';
export const CONTACT_EMAIL_HREF = 'mailto:info@kray-digital.pp.ua';

interface ContactLinkProps {
  className?: string;
}

function getPhoneHref() {
  return `tel:${PHONE_PARTS.join('')}`;
}

function getPhoneDisplay() {
  return `${PHONE_PARTS[0]} (${PHONE_PARTS[1]}) ${PHONE_PARTS[2]}-${PHONE_PARTS[3]}-${PHONE_PARTS[4]}`;
}

/**
 * Animated handset icon using pure CSS keyframes for zero JS overhead.
 */
export function AnimatedPhoneIcon({
  className = 'w-4 h-4',
}: {
  className?: string;
}) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0">
      <Phone className={`${className} text-brand-primary-container animate-phone-ring relative z-10`} />
    </span>
  );
}

export function PhoneLink({ className = '' }: ContactLinkProps) {
  const [revealed, setRevealed] = useState(false);
  const { language } = useLanguage();

  const callLabel =
    language === 'ru'
      ? 'Позвонить'
      : language === 'en'
        ? 'Call us'
        : 'Зателефонувати';

  const handleCallClick = () => {
    setRevealed(true);
    window.location.href = getPhoneHref();
  };

  if (revealed) {
    const phoneDisplay = getPhoneDisplay();
    return (
      <a
        href={getPhoneHref()}
        aria-label={`${callLabel} ${phoneDisplay}`}
        className={`inline-flex items-center gap-2 text-brand-on-surface hover:text-brand-primary-container transition-colors group ${className}`}
      >
        <AnimatedPhoneIcon />
        <span className="font-semibold tracking-tight whitespace-nowrap tabular-nums">
          {phoneDisplay}
        </span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCallClick}
      aria-label={callLabel}
      className={`inline-flex items-center gap-2 text-brand-on-surface hover:text-brand-primary-container transition-colors group cursor-pointer ${className}`}
    >
      <AnimatedPhoneIcon />
      <span className="font-semibold tracking-tight whitespace-nowrap">
        {callLabel}
      </span>
    </button>
  );
}

export function EmailLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={CONTACT_EMAIL_HREF}
      aria-label={`Написать на ${CONTACT_EMAIL}`}
      className={`inline-flex items-center gap-2 text-brand-on-surface-variant hover:text-brand-primary-container transition-colors group ${className}`}
    >
      <Mail className="w-4 h-4 text-brand-primary-container shrink-0 group-hover:scale-110 transition-transform" />
      <span className="font-medium whitespace-nowrap">{CONTACT_EMAIL}</span>
    </a>
  );
}
