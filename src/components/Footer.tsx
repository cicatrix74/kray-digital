import React from 'react';
import { Database, ShieldCheck, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenCases: () => void;
  onScrollToSection: (elementId: string) => void;
  onOpenLeadPanel: () => void;
}

export default function Footer({ onOpenCases, onScrollToSection, onOpenLeadPanel }: FooterProps) {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-brand-surface-container-lowest/30 backdrop-blur-md border-t border-[#3b494b]/20 py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 font-display text-lg md:text-xl font-black tracking-tight text-white">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-brand-primary-container/10 to-indigo-500/20 border border-brand-primary-container/30 flex items-center justify-center text-brand-primary-container relative overflow-hidden shadow-md shadow-cyan-950/30">
            <Code2 className="w-4 h-4 stroke-[2] text-brand-primary-container" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          </div>
          <span>KRAY <span className="text-brand-primary-container">DIGITAL</span></span>
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
            {language === 'ru' ? 'Этапы & Сроки' : language === 'en' ? 'Process & Timeline' : 'Етапи & Терміни'}
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

        {/* Copyright & Security */}
        <div className="flex flex-col items-center md:items-end gap-1.5">
          <span className="text-xs text-brand-on-surface-variant text-center md:text-right">
            {t.footer.copyright}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-brand-on-surface-variant/60">
            <ShieldCheck className="w-3 h-3 text-brand-tertiary-container" /> Secured by SSL 256-bit Encryption
          </div>
        </div>

      </div>
    </footer>
  );
}

