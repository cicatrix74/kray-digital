import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, Code, Search, Globe, Wrench, Briefcase, FolderGit2 } from 'lucide-react';
import { CASE_STUDIES } from '../data/cases';
import { useLanguage } from '../context/LanguageContext';

interface CasesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
  initialCaseId?: string | null;
}

export default function CasesDrawer({ isOpen, onClose, onContactClick, initialCaseId }: CasesDrawerProps) {
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
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  // Sync state if language, open status, or initialCaseId change
  useEffect(() => {
    if (isOpen) {
      if (initialCaseId) {
        setActiveCaseId(initialCaseId);
        const targeted = casesList.find(c => c.id === initialCaseId);
        if (targeted) {
          setSelectedCategory(targeted.category);
        } else {
          setSelectedCategory(t.casesDrawer.cat_all);
        }
      } else {
        setSelectedCategory(t.casesDrawer.cat_all);
        if (casesList.length > 0) {
          setActiveCaseId(casesList[0].id);
        }
      }
    }
  }, [isOpen, initialCaseId, language, casesList, t]);

  if (!isOpen) return null;

  const filteredCases = selectedCategory === t.casesDrawer.cat_all
    ? casesList
    : casesList.filter(c => c.category === selectedCategory);

  const activeCase = casesList.find(c => c.id === activeCaseId) || casesList[0];

  const getCategoryIcon = (category: string) => {
    // Match against any language version
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
    return <FolderGit2 className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" id="cases-drawer-container">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0e19]/80 backdrop-blur-md"
        id="cases-drawer-backdrop"
      />

      {/* Main Drawer Body */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl h-full bg-brand-surface-container-low border-l border-brand-outline-variant/20 shadow-2xl flex flex-col z-10"
        id="cases-drawer-content"
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-outline-variant/15 flex items-center justify-between bg-brand-surface-container-lowest/80 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-primary-container" />
              <h2 className="text-xl font-bold font-display text-brand-on-surface">{t.casesDrawer.drawer_title}</h2>
            </div>
            <p className="text-xs text-brand-on-surface-variant mt-1">{t.casesDrawer.drawer_subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-brand-surface-container-highest transition-colors text-brand-on-surface-variant hover:text-brand-on-surface cursor-pointer"
            id="close-cases-drawer-btn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-4 bg-brand-surface-container-lowest/40 border-b border-brand-outline-variant/10 flex flex-wrap gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const casesOfCat = cat === t.casesDrawer.cat_all ? casesList : casesList.filter(c => c.category === cat);
                if (casesOfCat.length > 0) {
                  setActiveCaseId(casesOfCat[0].id);
                }
              }}
              className={`px-4 py-2 rounded text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-primary-container text-[#00363a] font-bold shadow-glow scale-105'
                  : 'bg-brand-surface-container-high text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Workspace: Split Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Side: Case list */}
          <div className="w-full md:w-2/5 border-r border-brand-outline-variant/10 overflow-y-auto p-4 space-y-3 bg-brand-surface-container-lowest/20">
            {filteredCases.length === 0 ? (
              <div className="text-center py-12 text-brand-on-surface-variant text-sm">
                No cases in this category.
              </div>
            ) : (
              filteredCases.map((cs) => (
                <div
                  key={cs.id}
                  onClick={() => setActiveCaseId(cs.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeCaseId === cs.id
                      ? 'bg-brand-surface-container-high border-brand-primary-container shadow-sm'
                      : 'bg-brand-surface-container-low border-brand-outline-variant/10 hover:border-brand-outline-variant/40 hover:bg-brand-surface-container-high/40'
                  }`}
                >
                  {cs.image && (
                    <div className="w-full h-20 mb-2.5 rounded-lg overflow-hidden border border-brand-outline-variant/10 relative bg-brand-surface-container-lowest">
                      <img
                        src={cs.image}
                        alt=""
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-surface-container-high/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-2">
                    {getCategoryIcon(cs.category)}
                    <span className="text-[10px] uppercase tracking-wider text-brand-primary-container font-semibold">
                      {cs.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm leading-snug text-brand-on-surface line-clamp-2">
                    {cs.title}
                  </h4>
                  <p className="text-xs text-brand-on-surface-variant mt-1.5 line-clamp-2 leading-relaxed">
                    {cs.description}
                  </p>
                  
                  {/* Small Metrics strip */}
                  <div className="flex gap-4 mt-3 pt-2.5 border-t border-brand-outline-variant/10">
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <span className="block text-[10px] text-brand-on-surface-variant uppercase">{m.label}</span>
                        <span className="text-xs font-bold text-brand-primary-container">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side: Active Case details */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeCase ? (
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Case Heading */}
                <div>
                  <span className="px-2.5 py-1 rounded bg-brand-primary-container/10 border border-brand-primary-container/20 text-brand-primary-container text-xs font-bold uppercase tracking-wider">
                    {activeCase.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-display text-brand-on-surface mt-3 leading-tight">
                    {activeCase.title}
                  </h3>
                </div>

                {/* Case Browser Mockup Image */}
                {activeCase.image && (
                  <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-brand-surface-container-lowest border border-brand-outline-variant/15 shadow-md group">
                    <div className="h-7 bg-[#0a0e19]/90 border-b border-brand-outline-variant/15 px-3 flex items-center justify-between z-10 relative">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-brand-surface-container-high/60 border border-brand-outline-variant/15 text-[10px] font-mono text-gray-400">
                        <span className="text-emerald-400">https://</span>
                        <span>kray-digital.com/preview/{activeCase.id}</span>
                      </div>
                      <div className="w-6" />
                    </div>
                    <img
                      src={activeCase.image}
                      alt=""
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="w-full h-[calc(100%-1.75rem)] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-surface-container-low/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Key Metrics Dashboard */}
                <div className="grid grid-cols-3 gap-3 bg-brand-surface-container-lowest p-4 rounded-xl border border-brand-outline-variant/10">
                  {activeCase.metrics.map((m, idx) => (
                    <div key={idx} className="text-center p-2 rounded bg-brand-surface-container/50 border border-brand-outline-variant/5">
                      <span className="block text-[10px] md:text-xs text-brand-on-surface-variant uppercase mb-1">{m.label}</span>
                      <span className="text-lg md:text-2xl font-black text-brand-primary-container font-display tracking-tight block">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Case Story sections */}
                <div className="space-y-4">
                  {/* Challenge */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-sm text-brand-on-surface flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-brand-secondary rounded"></span>
                      {t.casesDrawer.lbl_challenge}
                    </h5>
                    <p className="text-sm text-brand-on-surface-variant leading-relaxed bg-brand-surface-container-high/20 p-3.5 rounded-lg border border-brand-outline-variant/10">
                      {activeCase.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-sm text-brand-on-surface flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-brand-primary-container rounded"></span>
                      {t.casesDrawer.lbl_solution}
                    </h5>
                    <p className="text-sm text-brand-on-surface-variant leading-relaxed bg-brand-surface-container-high/20 p-3.5 rounded-lg border border-brand-outline-variant/10">
                      {activeCase.solution}
                    </p>
                  </div>

                  {/* Results Check list */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-sm text-brand-on-surface flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-brand-tertiary-container rounded"></span>
                      {t.casesDrawer.lbl_results}
                    </h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeCase.results.map((res, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-brand-surface-container/30 p-3 rounded-lg border border-brand-outline-variant/5"
                        >
                          <CheckCircle className="w-5 h-5 text-brand-primary-container shrink-0 mt-0.5" />
                          <span className="text-sm text-brand-on-surface">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-brand-outline-variant/10">
                  <div className="flex flex-wrap gap-2">
                    {activeCase.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded bg-brand-surface-container-highest text-brand-on-surface-variant font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-brand-surface-container-lowest border-t border-brand-outline-variant/15 text-center flex justify-between items-center px-6">
          <span className="text-xs text-brand-on-surface-variant">{t.casesDrawer.bottom_text}</span>
          <button
            onClick={() => {
              onClose();
              if (onContactClick) {
                onContactClick();
              }
            }}
            className="px-5 py-2 rounded bg-brand-primary-container text-[#00363a] text-xs font-bold hover:brightness-110 cursor-pointer shadow-glow transition-all border-none"
          >
            {t.casesDrawer.btn_contact}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
