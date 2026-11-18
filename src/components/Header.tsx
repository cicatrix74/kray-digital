import React, { useState } from 'react';
import { Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PhoneLink, EmailLink } from './ContactLinks';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenCallback?: () => void;
  onScrollToSection: (elementId: string) => void;
  onOpenCases: () => void;
}

const NAV_ITEMS = {
  uk: [
    { id: 'expertise-section', label: 'Послуги' },
    { id: 'roadmap-section', label: 'Процес & Терміни' },
    { id: 'portfolio-section', label: 'Кейси' },
    { id: 'stats-section', label: 'Чому ми' },
    { id: 'faq-section', label: 'FAQ' },
    { id: 'contact-cta-section', label: 'Контакти' }
  ],
  ru: [
    { id: 'expertise-section', label: 'Услуги' },
    { id: 'roadmap-section', label: 'Процесс & Сроки' },
    { id: 'portfolio-section', label: 'Кейсы' },
    { id: 'stats-section', label: 'Почему мы' },
    { id: 'faq-section', label: 'FAQ' },
    { id: 'contact-cta-section', label: 'Контакты' }
  ],
  en: [
    { id: 'expertise-section', label: 'Services' },
    { id: 'roadmap-section', label: 'Process & Timeline' },
    { id: 'portfolio-section', label: 'Case Studies' },
    { id: 'stats-section', label: 'Why Us' },
    { id: 'faq-section', label: 'FAQ' },
    { id: 'contact-cta-section', label: 'Contacts' }
  ]
};

export default function Header({ onOpenCalculator, onOpenCallback, onScrollToSection, onOpenCases }: HeaderProps) {
  const { language, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const callbackLabel = {
    uk: 'Замовити дзвінок',
    ru: 'Заказать звонок',
    en: 'Request Call'
  }[language] || 'Замовити дзвінок';

  const navItems = NAV_ITEMS[language] || NAV_ITEMS.uk;

  const handleNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      onScrollToSection(elementId);
    }, 10);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f131e]/90 backdrop-blur-xl border-b border-[#3b494b]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setIsMobileMenuOpen(false);
            onScrollToSection('hero-section');
          }}
          className="flex items-center gap-3 cursor-pointer hover:opacity-95 transition-all duration-200 group shrink-0"
          id="header-logo-brand"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0b162a] border border-blue-500/30 flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-950/50 shrink-0">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2563eb]" />
            <span className="pl-1 font-display text-sm font-black tracking-tight text-white">KD</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base md:text-lg font-black tracking-tight text-white group-hover:text-brand-primary-container transition-colors">
              KRAY <span className="text-brand-primary-container">DIGITAL</span>
            </span>
            <span className="text-[10px] md:text-[11px] font-medium text-brand-on-surface-variant mt-0.5 hidden sm:block">
              {language === 'ru'
                ? 'Разработка сайтов и digital-маркетинг'
                : language === 'en'
                  ? 'Web development & digital marketing'
                  : 'Розробка сайтів та digital-маркетинг'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Menu (hidden on mobile, visible on lg screens) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" id="header-desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-xs lg:text-sm font-medium text-brand-on-surface-variant hover:text-brand-primary-container transition-colors cursor-pointer bg-transparent border-none p-0 relative py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-primary-container hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions Container: Phone + CTA + Hamburger Button */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <PhoneLink
            className="hidden md:inline-flex lg:hidden xl:inline-flex text-xs xl:text-sm px-3 py-2 rounded-xl border border-brand-outline-variant/25 bg-[#171b27]/70 hover:border-brand-primary-container/40"
          />

          {/* Action CTA Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenCalculator();
            }}
            className="hidden sm:inline-flex bg-brand-primary-container text-[#00363a] font-bold text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-glow cursor-pointer"
            id="header-cta-calc"
          >
            {t.header.getEstimate}
          </button>

          {/* Mobile Hamburger Toggle Button (visible only on mobile/tablet) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-brand-outline-variant/30 bg-[#171b27] text-brand-primary-container hover:border-brand-primary-container/50 hover:bg-[#1e2333] transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle mobile menu"
            id="mobile-menu-hamburger-btn"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform rotate-90 duration-200" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-200" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Animated Dropdown Menu (Clean, GPU-accelerated CSS transition) */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden border-b border-brand-outline-variant/30 bg-[#0f131e]/98 backdrop-blur-2xl px-6 py-6 shadow-2xl overflow-hidden animate-fade-in"
          id="mobile-nav-drawer"
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left text-sm font-semibold text-brand-on-surface hover:text-brand-primary-container py-3 px-3 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer group"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-brand-primary-container opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            ))}

            {/* Mobile Direct Contacts & CTA inside Drawer */}
            <div className="pt-4 mt-2 border-t border-brand-outline-variant/15 flex flex-col gap-3">
              <div className="flex flex-col gap-2 px-1">
                <PhoneLink className="text-sm py-1.5" />
                <EmailLink className="text-sm py-1.5" />
              </div>
              {onOpenCallback && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCallback();
                  }}
                  className="w-full border border-brand-primary-container/40 bg-brand-primary-container/10 text-brand-primary-container font-bold text-sm py-3 rounded-xl text-center transition-all hover:bg-brand-primary-container/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{callbackLabel}</span>
                </button>
              )}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full bg-brand-primary-container text-[#00363a] font-bold text-sm py-3.5 rounded-xl text-center shadow-glow transition-all active:scale-[0.98] cursor-pointer"
              >
                {t.header.getEstimate}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
