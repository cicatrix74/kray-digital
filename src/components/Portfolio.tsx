import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Search, Globe, Wrench, ArrowRight, Briefcase } from 'lucide-react';
import { CASE_STUDIES } from '../data/cases';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioProps {
  onOpenCase: (caseId: string | null) => void;
}

export default function Portfolio({ onOpenCase }: PortfolioProps) {
  const { language, t } = useLanguage();
  const casesList = CASE_STUDIES[language] || CASE_STUDIES.uk;

  const CATEGORIES = [
    t.casesDrawer.cat_all,
    t.casesDrawer.cat_dev,
    t.casesDrawer.cat_seo,
    t.casesDrawer.cat_ads,
    t.casesDrawer.cat_smm
  ];

  const [selectedCategory, setSelectedCategory] = useState(t.casesDrawer.cat_all);

  const filteredCases = selectedCategory === t.casesDrawer.cat_all
    ? casesList
    : casesList.filter(c => c.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    if (category === t.casesDrawer.cat_dev) {
      return <Code className="w-4 h-4 text-brand-primary-container" />;
    }
    if (category === t.casesDrawer.cat_seo) {
      return <Search className="w-4 h-4 text-brand-secondary" />;
    }
    if (category === t.casesDrawer.cat_ads) {
      return <Globe className="w-4 h-4 text-brand-tertiary-container" />;
    }
    if (category === t.casesDrawer.cat_smm) {
      return <Wrench className="w-4 h-4 text-brand-primary-container" />;
    }
    return <Briefcase className="w-4 h-4 text-brand-primary-container" />;
  };

  return (
    <section className="relative py-24 bg-transparent border-b border-brand-outline-variant/10 overflow-hidden w-full max-w-full" id="portfolio-section">
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/20 text-brand-primary-container text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Briefcase className="w-3.5 h-3.5" />
            {language === 'en' ? 'Portfolio' : language === 'ru' ? 'Портфолио' : 'Портфоліо'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-on-surface mb-4"
          >
            {t.portfolio.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-brand-on-surface-variant max-w-2xl mx-auto"
          >
            {t.portfolio.subtitle}
          </motion.p>
        </div>

        {/* Categories Tab List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-primary-container text-[#00363a] font-bold shadow-glow scale-105 border-none'
                  : 'bg-brand-surface-container-low text-brand-on-surface-variant border border-brand-outline-variant/10 hover:border-brand-outline-variant/30 hover:bg-brand-surface-container-high/60'
              }`}
            >
              <span className="flex items-center gap-2">
                {selectedCategory === cat && getCategoryIcon(cat)}
                {cat}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Portfolio Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col h-full rounded-2xl bg-brand-surface-container-low border border-brand-outline-variant/10 hover:border-brand-primary-container/30 transition-all duration-300 p-6 shadow-xs overflow-hidden cursor-pointer"
              onClick={() => onOpenCase(cs.id)}
            >
              {/* Highlight background shine effect */}
              <div className="absolute inset-0 bg-radial from-brand-primary-container/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Project Screenshot / Mockup Preview */}
              {cs.image && (
                <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden bg-brand-surface-container-lowest border border-brand-outline-variant/15 group/img shadow-inner z-10">
                  {/* Browser header bar */}
                  <div className="h-6 bg-[#0a0e19]/90 border-b border-brand-outline-variant/15 px-3 flex items-center justify-between z-10 relative">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 truncate max-w-[160px]">
                      kray-digital.com/cases/{cs.id}
                    </span>
                    <div className="w-6" />
                  </div>
                  {/* Image preview with smooth zoom on hover */}
                  <img
                    src={cs.image}
                    alt={cs.title}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-[calc(100%-1.5rem)] object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface-container-low/70 via-transparent to-transparent opacity-50 pointer-events-none" />
                </div>
              )}

              {/* Card Header: category badge */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-surface-container-high border border-brand-outline-variant/5 text-xs text-brand-primary-container font-semibold uppercase tracking-wider">
                  {getCategoryIcon(cs.category)}
                  <span>{cs.category}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex-1 space-y-3 relative z-10">
                <h3 className="text-base sm:text-lg font-bold font-display text-brand-on-surface group-hover:text-brand-primary-container transition-colors duration-200 line-clamp-2 leading-snug">
                  {cs.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant line-clamp-3 leading-relaxed">
                  {cs.description}
                </p>
              </div>

              {/* Key Metrics Dashboard inside the card */}
              <div className="grid grid-cols-3 gap-2 bg-brand-surface-container-lowest/50 p-3 rounded-xl border border-brand-outline-variant/5 my-5 relative z-10">
                {cs.metrics.slice(0, 3).map((m, mIdx) => (
                  <div key={mIdx} className="text-center">
                    <span className="block text-[8px] sm:text-[9px] text-brand-on-surface-variant uppercase truncate mb-0.5" title={m.label}>
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-brand-primary-container font-display">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tags and CTA Link */}
              <div className="pt-4 border-t border-brand-outline-variant/10 flex items-center justify-between mt-auto relative z-10">
                {/* tags */}
                <div className="flex flex-wrap gap-1 max-w-[70%]">
                  {cs.tags.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-brand-on-surface-variant bg-brand-surface-container-high px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Arrow CTA */}
                <div className="flex items-center gap-1 text-xs font-bold text-brand-primary-container group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>{t.portfolio.btnMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => onOpenCase(null)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary-container/10 border border-brand-primary-container/20 text-brand-primary-container font-bold hover:bg-brand-primary-container/20 transition-all duration-300 cursor-pointer text-sm"
          >
            <span>{t.portfolio.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
