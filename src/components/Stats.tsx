import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Stats() {
  const { t } = useLanguage();

  const statsList = [
    {
      id: 'years',
      val: t.stats.years_val,
      icon: <Award className="w-12 h-12 text-brand-primary-container" />,
      title: t.stats.years_title,
      desc: t.stats.years_desc
    },
    {
      id: 'kpi',
      val: t.stats.kpi_val,
      icon: <ShieldCheck className="w-12 h-12 text-brand-primary-container" />,
      title: t.stats.kpi_title,
      desc: t.stats.kpi_desc
    },
    {
      id: 'reports',
      val: t.stats.reports_val,
      icon: <BarChart3 className="w-12 h-12 text-brand-primary-container" />,
      title: t.stats.reports_title,
      desc: t.stats.reports_desc
    }
  ];

  return (
    <section className="relative py-24 bg-transparent border-y border-brand-outline-variant/10 overflow-hidden" id="stats-section">
      {/* Soft background glows instead of photographic images */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary-container/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-on-surface mb-4">
            {t.stats.title}
          </h2>
          <p className="text-sm sm:text-base text-brand-on-surface-variant max-w-2xl mx-auto">
            {t.stats.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {statsList.map((st, idx) => (
            <motion.div 
              key={st.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="text-center flex flex-col items-center space-y-4 bg-brand-surface-container-low/40 border border-brand-outline-variant/10 p-8 rounded-2xl backdrop-blur-md hover:border-brand-primary-container/20 transition-all duration-300"
              id={`stat-card-${st.id}`}
            >
              <div className="w-20 h-20 rounded-full bg-brand-primary-container/5 border border-brand-primary-container/10 flex items-center justify-center mb-2">
                {st.icon}
              </div>
              <div className="font-display text-4xl font-extrabold text-brand-primary-container tracking-tight">
                {st.val}
              </div>
              <div className="font-display text-lg font-bold text-brand-on-surface">
                {st.title}
              </div>
              <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed max-w-xs">
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

