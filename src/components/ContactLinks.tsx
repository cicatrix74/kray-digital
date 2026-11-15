import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';

export const CONTACT_PHONE_HREF = 'tel:+380637678320';
export const CONTACT_PHONE_DISPLAY = '+38 (063) 767-83-20';
export const DECOY_PHONE_HREF = 'tel:+385552555555';
export const DECOY_PHONE_DISPLAY = '+38 (555) 255-55-55';
export const CONTACT_EMAIL = 'info@kray-digital.pp.ua';
export const CONTACT_EMAIL_HREF = 'mailto:info@kray-digital.pp.ua';

let hasSwappedToMainPhone = false;

interface ContactLinkProps {
  className?: string;
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
  const [isMainActive, setIsMainActive] = useState(hasSwappedToMainPhone);

  useEffect(() => {
    if (isMainActive) return;
    const timer = window.setTimeout(() => {
      hasSwappedToMainPhone = true;
      setIsMainActive(true);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [isMainActive]);

  const phoneHref = isMainActive ? CONTACT_PHONE_HREF : DECOY_PHONE_HREF;
  const phoneDisplay = isMainActive ? CONTACT_PHONE_DISPLAY : DECOY_PHONE_DISPLAY;

  return (
    <a
      href={phoneHref}
      aria-label={`Позвонить ${CONTACT_PHONE_DISPLAY}`}
      className={`inline-flex items-center gap-2 text-brand-on-surface hover:text-brand-primary-container transition-colors group ${className}`}
    >
      <AnimatedPhoneIcon />
      <span className="font-semibold tracking-tight whitespace-nowrap tabular-nums">
        {phoneDisplay}
      </span>
    </a>
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
