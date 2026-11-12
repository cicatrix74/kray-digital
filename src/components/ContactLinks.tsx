import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const CONTACT_PHONE_HREF = 'tel:+380637678320';
export const CONTACT_PHONE_DISPLAY = '+38 (063) 767-83-20';
export const CONTACT_EMAIL = 'info@kray-digital.pp.ua';
export const CONTACT_EMAIL_HREF = 'mailto:info@kray-digital.pp.ua';

interface ContactLinkProps {
  className?: string;
  showPing?: boolean;
}

/**
 * Animated handset icon using pure CSS keyframes for zero JS overhead.
 */
export function AnimatedPhoneIcon({
  className = 'w-4 h-4',
  showPing = true,
}: {
  className?: string;
  showPing?: boolean;
}) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0">
      {showPing && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-brand-primary-container/35 animate-ping"
          style={{ animationDuration: '2.4s' }}
        />
      )}
      <Phone className={`${className} text-brand-primary-container animate-phone-ring relative z-10`} />
    </span>
  );
}

export function PhoneLink({ className = '', showPing = true }: ContactLinkProps) {
  return (
    <a
      href={CONTACT_PHONE_HREF}
      aria-label={`Позвонить ${CONTACT_PHONE_DISPLAY}`}
      className={`inline-flex items-center gap-2 text-brand-on-surface hover:text-brand-primary-container transition-colors group ${className}`}
    >
      <AnimatedPhoneIcon showPing={showPing} />
      <span className="font-semibold tracking-tight whitespace-nowrap">{CONTACT_PHONE_DISPLAY}</span>
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
