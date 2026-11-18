import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CONTACT_EMAIL = 'info@kray-digital.pp.ua';
export const CONTACT_EMAIL_HREF = 'mailto:info@kray-digital.pp.ua';

interface ContactLinkProps {
  className?: string;
  popoverPosition?: 'bottom' | 'top';
}

interface WorkScheduleState {
  isWorkingHours: boolean;
  progressPercent: number;
}

const WORK_START_MIN = 9 * 60;  // 09:00
const WORK_END_MIN = 18 * 60;   // 18:00
const WORK_DURATION = WORK_END_MIN - WORK_START_MIN; // 540 min (9h)
const WEEKDAY_OFF_DURATION = 15 * 60; // 18:00 -> 09:00 (900 min)
const WEEKEND_OFF_DURATION = 63 * 60; // Fri 18:00 -> Mon 09:00 (3780 min)

const KYIV_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Europe/Kyiv',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function getKyivScheduleProgress(now = new Date()): WorkScheduleState {
  const parts = KYIV_FORMATTER.formatToParts(now);

  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;

  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = dayMap[map.weekday || 'Mon'] ?? 1;
  const hour = parseInt(map.hour || '0', 10) % 24;
  const minute = parseInt(map.minute || '0', 10);
  const mins = hour * 60 + minute;

  const isWorkDay = day >= 1 && day <= 5;
  if (isWorkDay && mins >= WORK_START_MIN && mins < WORK_END_MIN) {
    const pct = Math.min(100, Math.max(0, ((mins - WORK_START_MIN) / WORK_DURATION) * 100));
    return { isWorkingHours: true, progressPercent: pct };
  }

  // Off-hours progress calculation toward the next 09:00 Mon-Fri
  let elapsed = 0;
  let total = WEEKDAY_OFF_DURATION;

  if (day === 5 && mins >= WORK_END_MIN) {
    // Friday 18:00..23:59 -> Mon 09:00
    total = WEEKEND_OFF_DURATION;
    elapsed = mins - WORK_END_MIN;
  } else if (day === 6) {
    // Saturday
    total = WEEKEND_OFF_DURATION;
    elapsed = 6 * 60 + mins;
  } else if (day === 0) {
    // Sunday
    total = WEEKEND_OFF_DURATION;
    elapsed = 30 * 60 + mins;
  } else if (day === 1 && mins < WORK_START_MIN) {
    // Monday 00:00..08:59
    total = WEEKEND_OFF_DURATION;
    elapsed = 54 * 60 + mins;
  } else if (mins >= WORK_END_MIN) {
    // Mon-Thu 18:00..23:59
    total = WEEKDAY_OFF_DURATION;
    elapsed = mins - WORK_END_MIN;
  } else {
    // Tue-Fri 00:00..08:59
    total = WEEKDAY_OFF_DURATION;
    elapsed = 6 * 60 + mins;
  }

  const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
  return { isWorkingHours: false, progressPercent: pct };
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

export function PhoneLink({ className = '', popoverPosition = 'bottom' }: ContactLinkProps) {
  const { language } = useLanguage();
  const [schedule, setSchedule] = useState<WorkScheduleState>({ isWorkingHours: false, progressPercent: 0 });
  const [revealedPhone, setRevealedPhone] = useState<{ display: string; href: string } | null>(null);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hideBubbleSmoothly = () => {
    setIsBubbleVisible(false);
    window.setTimeout(() => {
      setRevealedPhone(null);
    }, 300);
  };

  useEffect(() => {
    const update = () => {
      const next = getKyivScheduleProgress();
      setSchedule(next);
      if (!next.isWorkingHours) {
        hideBubbleSmoothly();
      }
    };
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!revealedPhone) {
      setIsBubbleVisible(false);
      return;
    }
    const raf = window.requestAnimationFrame(() => setIsBubbleVisible(true));
    const timer = window.setTimeout(() => {
      hideBubbleSmoothly();
    }, 10000);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [revealedPhone]);

  const callLabel =
    language === 'ru'
      ? 'Позвонить'
      : language === 'en'
        ? 'Call us'
        : 'Зателефонувати';

  const handleCallClick = async () => {
    if (!schedule.isWorkingHours) return;
    if (revealedPhone) {
      window.location.href = revealedPhone.href;
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/contact-phone');
      const data = await res.json();
      if (data && data.isWorkingHours && data.href && data.display) {
        setRevealedPhone({ display: data.display, href: data.href });
        window.location.href = data.href;
      } else {
        setSchedule((prev) => ({ ...prev, isWorkingHours: false }));
      }
    } catch {
      // ignore network error
    } finally {
      setIsLoading(false);
    }
  };

  if (!schedule.isWorkingHours) {
    return null;
  }

  const progressBar = (
    <span
      className="block w-full h-[3px] rounded-full bg-white/10 overflow-hidden mt-1"
      aria-hidden="true"
    >
      <span
        className="block h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
        style={{ width: `${Math.max(4, Math.round(schedule.progressPercent))}%` }}
      />
    </span>
  );

  const popoverPosClass =
    popoverPosition === 'top'
      ? 'bottom-full mb-2 right-0'
      : 'top-full mt-2 right-0';

  return (
    <div className="relative inline-flex flex-col items-stretch">
      <button
        type="button"
        onClick={handleCallClick}
        disabled={isLoading}
        aria-label={callLabel}
        className={`inline-flex items-center justify-center gap-2 text-brand-on-surface hover:text-brand-primary-container transition-colors group cursor-pointer disabled:opacity-60 ${className}`}
      >
        <AnimatedPhoneIcon />
        <span className="font-semibold tracking-tight whitespace-nowrap">
          {callLabel}
        </span>
      </button>
      {progressBar}

      {revealedPhone && (
        <div
          className={`absolute ${popoverPosClass} z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#111726]/95 backdrop-blur-md border border-brand-primary-container/50 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_18px_rgba(0,240,255,0.18)] whitespace-nowrap transition-all duration-300 ease-out ${
            isBubbleVisible
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : `opacity-0 scale-95 pointer-events-none ${popoverPosition === 'top' ? 'translate-y-1.5' : '-translate-y-1.5'}`
          }`}
        >
          {/* Speech bubble tail pointing to the Call button */}
          <span
            aria-hidden="true"
            className={
              popoverPosition === 'top'
                ? 'absolute -bottom-[7px] right-6 w-3.5 h-3.5 rotate-45 bg-[#111726] border-r border-b border-brand-primary-container/50'
                : 'absolute -top-[7px] right-6 w-3.5 h-3.5 rotate-45 bg-[#111726] border-l border-t border-brand-primary-container/50'
            }
          />
          <a
            href={revealedPhone.href}
            aria-label={`${callLabel} ${revealedPhone.display}`}
            className="relative z-10 inline-flex items-center text-sm font-bold text-white hover:text-brand-primary-container transition-colors tabular-nums"
          >
            <span>{revealedPhone.display}</span>
          </a>
          <button
            type="button"
            onClick={hideBubbleSmoothly}
            aria-label="Close"
            className="relative z-10 ml-1 text-xs text-gray-400 hover:text-white px-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
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
