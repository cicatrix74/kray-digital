import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PhoneLink, EmailLink } from './ContactLinks';

interface FooterProps {
  onOpenCases: () => void;
  onScrollToSection: (elementId: string) => void;
  onOpenLeadPanel: () => void;
}

export default function Footer({ onOpenCases, onScrollToSection, onOpenLeadPanel }: FooterProps) {
  const { t, language } = useLanguage();

  const usefulResources = [
    {
      href: '/grafiki-vidkluchen-svitla-v-dnipri-ta-dnipropotrovskoi-oblasti/',
      label: language === 'ru'
        ? '⚡ Графики отключений света (Днепр)'
        : language === 'en'
          ? '⚡ Power Outage Schedules (Dnipro)'
          : '⚡ Графіки відключень світла (Дніпро)'
    },
    {
      href: '/karta-trevog/',
      label: language === 'ru'
        ? '🚨 Карта воздушных тревог'
        : language === 'en'
          ? '🚨 Air Raid Alerts Map'
          : '🚨 Карта повітряних тривог'
    },
    {
      href: '/konvertor-webp/',
      label: language === 'ru'
        ? '🖼️ Конвертер JPG/PNG/GIF в WebP и AVIF'
        : language === 'en'
          ? '🖼️ Image Converter (WebP & AVIF)'
          : '🖼️ Конвертер JPG/PNG/GIF у WebP та AVIF'
    },
    {
      href: '/photoeditor/',
      label: language === 'ru'
        ? '🎨 Онлайн фоторедактор (Photopea)'
        : language === 'en'
          ? '🎨 Online Photo Editor (Photopea)'
          : '🎨 Онлайн фоторедактор (Photopea)'
    },
    {
      href: '/password-generator/',
      label: language === 'ru'
        ? '🔐 Генератор надёжных паролей'
        : language === 'en'
          ? '🔐 Strong Password Generator'
          : '🔐 Генератор надійних паролів'
    },
    {
      href: '/generator-gif/',
      label: language === 'ru'
        ? '🎬 Генератор видео в GIF (до 30 сек)'
        : language === 'en'
          ? '🎬 Video to GIF Generator (Max 30s)'
          : '🎬 Генератор відео в GIF (до 30 сек)'
    }
  ];

  return (
    <footer className="bg-brand-surface-container-lowest/95 md:bg-brand-surface-container-lowest/30 md:backdrop-blur-md border-t border-[#3b494b]/20 pt-12 pb-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0b162a] border border-blue-500/30 flex items-center justify-center relative overflow-hidden shadow-md shadow-blue-950/40 shrink-0">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2563eb]" />
            <span className="pl-1 font-display text-xs font-black tracking-tight text-white">KD</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base md:text-lg font-black tracking-tight text-white">
              KRAY <span className="text-brand-primary-container">DIGITAL</span>
            </span>
            <span className="text-[10px] font-medium text-brand-on-surface-variant mt-0.5">
              {language === 'ru'
                ? 'Разработка сайтов и digital-маркетинг'
                : language === 'en'
                  ? 'Web development & digital marketing'
                  : 'Розробка сайтів та digital-маркетинг'}
            </span>
          </div>
        </div>

        {/* Links Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-3 gap-y-2">
          <button
            onClick={() => onScrollToSection('expertise-section')}
            className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-2 px-2"
          >
            {t.footer.link_services}
          </button>
          <button
            onClick={() => onScrollToSection('roadmap-section')}
            className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-2 px-2 font-medium"
          >
            {language === 'ru' ? 'Процесс & Сроки' : language === 'en' ? 'Process & Timeline' : 'Процес & Терміни'}
          </button>
          <button
            onClick={onOpenCases}
            className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-2 px-2"
          >
            {t.footer.link_cases}
          </button>
          <button
            onClick={() => onScrollToSection('stats-section')}
            className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-2 px-2"
          >
            {t.footer.link_why}
          </button>
          <button
            onClick={() => onScrollToSection('faq-section')}
            className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-2 px-2 font-medium"
          >
            FAQ
          </button>
          <button
            onClick={() => onScrollToSection('contact-cta-section')}
            className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-2 px-2"
          >
            {t.footer.link_contacts}
          </button>
        </nav>

        {/* Direct Contacts, Copyright & Security */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-xs sm:text-sm">
            <PhoneLink className="py-1" popoverPosition="top" />
            <EmailLink className="py-1" />
          </div>
          <span className="text-xs text-brand-on-surface-variant text-center md:text-right">
            {t.footer.copyright}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-brand-on-surface-variant/60">
            <ShieldCheck className="w-3 h-3 text-brand-tertiary-container" /> Secured by SSL 256-bit Encryption
          </div>
        </div>

        </div>

        {/* Useful Resources List Menu */}
        <div className="border-t border-[#3b494b]/20 pt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-primary-container mb-3 text-center md:text-left">
            {t.footer.resources_title}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 list-none">
            {usefulResources.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors py-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

