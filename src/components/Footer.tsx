import React, { useState } from 'react';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PhoneLink, EmailLink } from './ContactLinks';

interface FooterProps {
  onOpenCases: () => void;
  onScrollToSection: (elementId: string) => void;
  onOpenLeadPanel: () => void;
}

export default function Footer({ onOpenCases, onScrollToSection, onOpenLeadPanel }: FooterProps) {
  const { t, language } = useLanguage();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

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
    },
    {
      href: '/pdf-to-jpg/',
      label: language === 'ru'
        ? '📄 Конвертер PDF в JPG и PNG'
        : language === 'en'
          ? '📄 PDF to JPG & PNG Converter'
          : '📄 Конвертер PDF у JPG та PNG'
    },
    {
      href: '/qr-generator/',
      label: language === 'ru'
        ? '📱 Генератор QR-кодов (PNG & SVG)'
        : language === 'en'
          ? '📱 QR Code Generator (PNG & SVG)'
          : '📱 Генератор QR-кодів (PNG & SVG)'
    },
    {
      href: '/favicon-generator/',
      label: language === 'ru'
        ? '✨ Генератор Favicon (ICO & PNG)'
        : language === 'en'
          ? '✨ Favicon Generator (ICO & PNG)'
          : '✨ Генератор Favicon (ICO & PNG)'
    }
  ];

  return (
    <footer className="bg-brand-surface-container-lowest/95 md:bg-brand-surface-container-lowest/30 md:backdrop-blur-md border-t border-[#3b494b]/20 pt-12 pb-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col gap-7">
        {/* Top Row: Brand | Navigation | Direct Contacts */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
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
          <nav className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2">
            <button
              onClick={() => onScrollToSection('expertise-section')}
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-1.5"
            >
              {t.footer.link_services}
            </button>
            <button
              onClick={() => onScrollToSection('roadmap-section')}
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-1.5 font-medium"
            >
              {language === 'ru' ? 'Процесс & Сроки' : language === 'en' ? 'Process & Timeline' : 'Процес & Терміни'}
            </button>
            <button
              onClick={onOpenCases}
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-1.5"
            >
              {t.footer.link_cases}
            </button>
            <button
              onClick={() => onScrollToSection('stats-section')}
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-1.5"
            >
              {t.footer.link_why}
            </button>
            <button
              onClick={() => onScrollToSection('faq-section')}
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-1.5 font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => onScrollToSection('contact-cta-section')}
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer py-1.5"
            >
              {t.footer.link_contacts}
            </button>
          </nav>

          {/* Direct Contacts */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-5 gap-y-2 text-xs sm:text-sm shrink-0">
            <PhoneLink className="py-1" popoverPosition="top" />
            <EmailLink className="py-1" />
          </div>
        </div>

        {/* Bottom Bar: Useful Resources Toggle | Copyright & SSL */}
        <div className="border-t border-[#3b494b]/20 pt-5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2>
              <button
                type="button"
                onClick={() => setIsResourcesOpen((prev) => !prev)}
                aria-expanded={isResourcesOpen}
                aria-controls="useful-resources-list"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary-container hover:text-white transition-colors cursor-pointer py-1"
              >
                <span>{t.footer.resources_title}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h2>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5">
              <span className="text-xs text-brand-on-surface-variant text-center">
                {t.footer.copyright}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-brand-on-surface-variant/70">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-tertiary-container shrink-0" />
                <span>Secured by SSL 256-bit Encryption</span>
              </div>
            </div>
          </div>

          <ul
            id="useful-resources-list"
            hidden={!isResourcesOpen}
            className={
              isResourcesOpen
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 list-none pt-2 border-t border-[#3b494b]/15'
                : 'hidden'
            }
          >
            {usefulResources.map((item) => (
              <li key={item.href} className={item.href === '/photoeditor/' ? 'hidden md:block' : ''}>
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

