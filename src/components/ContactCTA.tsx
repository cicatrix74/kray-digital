import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Zap, Send, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactCTAProps {
  onSubmitLead: (lead: { name: string; phone: string; service: string }) => void;
}

export default function ContactCTA({ onSubmitLead }: ContactCTAProps) {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize service choice on language load or change
  useEffect(() => {
    setService(t.contact.opt1);
  }, [t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t.contact.err_name;
    }
    if (!phone.trim()) {
      newErrors.phone = t.contact.err_phone;
    } else {
      const numericCount = phone.replace(/\D/g, '').length;
      if (numericCount < 9) {
        newErrors.phone = t.contact.err_phone_short;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      onSubmitLead({
        name,
        phone,
        service
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const bullets = [
    t.contact.bullet1,
    t.contact.bullet2,
    t.contact.bullet3
  ];

  const statusLabel = {
    uk: 'Статус',
    ru: 'Статус',
    en: 'Status'
  }[language] || 'Статус';

  const statusText = {
    uk: 'Передано менеджеру',
    ru: 'Передано менеджеру',
    en: 'Sent to manager'
  }[language] || 'Передано менеджеру';

  const responseTimeLabel = {
    uk: 'Час відповіді',
    ru: 'Время ответа',
    en: 'Response time'
  }[language] || 'Час відповіді';

  const responseTimeText = {
    uk: 'до 15 хвилин',
    ru: 'до 15 минут',
    en: 'within 15 minutes'
  }[language] || 'до 15 хвилин';

  const disclaimerText = {
    uk: 'Натискаючи кнопку, ви погоджуєтеся з політикою конфіденційності та обробкою персональних даних.',
    ru: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.',
    en: 'By clicking the button, you agree to our Privacy Policy and processing of personal data.'
  }[language] || 'Натискаючи кнопку, ви погоджуєтеся з політикою конфіденційності та обробкою персональних даних.';

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" id="contact-cta-section">
      {/* Glow ball */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary-container/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-brand-secondary-container/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="bg-brand-surface-container-high/80 rounded-2xl p-6 md:p-12 border border-brand-outline-variant/15 shadow-2xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary-container/10 border border-brand-primary-container/15 text-brand-primary-container text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" /> {t.contact.badge}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-on-surface leading-tight">
                {t.contact.title}
              </h2>
              <p className="text-sm sm:text-base text-brand-on-surface-variant leading-relaxed max-w-lg">
                {t.contact.desc}
              </p>

              {/* Checkbox bullets */}
              <ul className="space-y-4 pt-2">
                {bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-brand-on-surface">
                    <CheckCircle2 className="w-5.5 h-5.5 text-brand-primary-container shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Form Column with Transition */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-brand-surface p-6 md:p-8 rounded-xl border border-brand-outline-variant/20 relative"
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                    id="cta-form"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-brand-on-surface-variant mb-1.5">
                        {t.contact.label_name}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.contact.placeholder_name}
                        className="w-full bg-brand-surface-container border border-brand-outline-variant/50 rounded px-4 py-3 text-xs md:text-sm text-brand-on-surface focus:border-brand-primary-container focus:ring-1 focus:ring-brand-primary-container outline-none transition-colors"
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-on-surface-variant mb-1.5">
                        {t.contact.label_phone}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.contact.placeholder_phone}
                        className="w-full bg-brand-surface-container border border-brand-outline-variant/50 rounded px-4 py-3 text-xs md:text-sm text-brand-on-surface focus:border-brand-primary-container focus:ring-1 focus:ring-brand-primary-container outline-none transition-colors"
                      />
                      {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-on-surface-variant mb-1.5">
                        {t.contact.label_service}
                      </label>
                      <div className="relative">
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-brand-surface-container border border-brand-outline-variant/50 rounded px-4 py-3 text-xs md:text-sm text-brand-on-surface focus:border-brand-primary-container focus:ring-1 focus:ring-brand-primary-container outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option>{t.contact.opt1}</option>
                          <option>{t.contact.opt2}</option>
                          <option>{t.contact.opt3}</option>
                          <option>{t.contact.opt4}</option>
                          <option>{t.contact.opt5}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-on-surface-variant">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 bg-brand-primary-container text-[#00363a] font-bold text-xs sm:text-sm py-4 rounded hover:brightness-110 active:scale-[0.98] transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-[#00363a] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> {t.contact.btn_submit}
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-brand-on-surface-variant text-center mt-3 opacity-75 leading-relaxed">
                      {disclaimerText}
                    </p>
                  </motion.form>
                ) : (
                  /* SUCCESS FEEDBACK */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                    id="cta-success-block"
                  >
                    <div className="w-16 h-16 bg-brand-tertiary-container/10 border-2 border-brand-tertiary-container text-brand-tertiary-container rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-display text-lg md:text-xl font-bold text-brand-on-surface">{t.contact.success_title}</h4>
                      <p className="text-xs text-brand-on-surface-variant max-w-xs mx-auto">
                        {t.contact.success_desc}
                      </p>
                    </div>
                    <div className="bg-brand-surface-container-lowest/80 p-3 rounded-lg border border-brand-outline-variant/10 text-[11px] text-brand-on-surface-variant max-w-xs mx-auto text-left space-y-1">
                      <div>{statusLabel}: <strong className="text-brand-tertiary-container">{statusText}</strong></div>
                      <div>{responseTimeLabel}: <strong>{responseTimeText}</strong></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setName('');
                        setPhone('');
                      }}
                      className="px-5 py-2 text-xs font-bold text-brand-primary-container bg-brand-primary-container/5 border border-brand-primary-container/20 hover:bg-brand-primary-container/15 rounded transition-all cursor-pointer"
                    >
                      {t.contact.success_btn}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
