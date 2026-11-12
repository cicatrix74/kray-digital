import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import TechGridBackground from './components/TechGridBackground';
import ScrollToTop from './components/ScrollToTop';
import { LeadSubmission } from './types';

// Code-split heavy below-the-fold and modal components for ultra-fast initial load
const Expertise = lazy(() => import('./components/Expertise'));
const Stats = lazy(() => import('./components/Stats'));
const ContactCTA = lazy(() => import('./components/ContactCTA'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const ProjectRoadmap = lazy(() => import('./components/ProjectRoadmap'));
const CasesDrawer = lazy(() => import('./components/CasesDrawer'));
const CalculatorModal = lazy(() => import('./components/CalculatorModal'));
const LeadPanel = lazy(() => import('./components/LeadPanel'));
const QuickHelpChat = lazy(() => import('./components/QuickHelpChat'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));

const LOCAL_STORAGE_KEY = 'digital_agency_crm_leads';

const DEMO_LEADS: LeadSubmission[] = [
  {
    id: 'demo-1',
    name: 'Дмитро Ковальов',
    phone: '+380 (50) 234-56-78',
    service: 'Розробка сайту (Інтернет-магазин з інтеграціями)',
    budget: '95 000 ₴',
    timeline: '40 днів',
    timestamp: '19.07.2026, 11:30',
    status: 'new'
  },
  {
    id: 'demo-2',
    name: 'ТОВ "Альфа-Мед"',
    phone: '+380 (67) 555-43-21',
    service: 'SEO-оптимізація (Просування по всій країні)',
    budget: '32 000 ₴',
    timeline: '60 днів',
    timestamp: '18.07.2026, 16:45',
    status: 'contacted'
  },
  {
    id: 'demo-3',
    name: 'Світлана Морозова',
    phone: '+380 (93) 777-88-99',
    service: 'SMM та ведення (Просунутий)',
    budget: '26 000 ₴',
    timeline: '30 днів',
    timestamp: '17.07.2026, 12:15',
    status: 'completed'
  }
];

export default function App() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCasesOpen, setIsCasesOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isLeadPanelOpen, setIsLeadPanelOpen] = useState(false);
  const [calculatorService, setCalculatorService] = useState('');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [showBelowFold, setShowBelowFold] = useState(false);

  // Defer below-the-fold lazy chunks until first interaction or idle fallback
  // so initial mobile paint isn't competing with vendor-motion & 8 section bundles.
  useEffect(() => {
    if (showBelowFold) return;
    const reveal = () => setShowBelowFold(true);
    const events = ['scroll', 'touchstart', 'pointerdown', 'keydown'] as const;
    events.forEach((ev) => window.addEventListener(ev, reveal, { once: true, passive: true }));
    const timer = window.setTimeout(reveal, 4500);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, reveal));
      window.clearTimeout(timer);
    };
  }, [showBelowFold]);

  // Load leads from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setLeads(JSON.parse(saved));
      } catch (e) {
        setLeads(DEMO_LEADS);
      }
    } else {
      setLeads(DEMO_LEADS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEMO_LEADS));
    }
  }, []);

  // Track cursor globally for interactive light sphere (throttled on desktop, passive)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    let ticking = false;
    const handleMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Sync leads back to localStorage
  const saveLeads = (updatedLeads: LeadSubmission[]) => {
    setLeads(updatedLeads);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLeads));
  };

  // Submission handler for Contact Form or Calculator
  const handleAddLead = (rawLead: { name: string; phone: string; service: string; budget?: string; timeline?: string }) => {
    const now = new Date();
    const formattedDate = now.toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newLead: LeadSubmission = {
      id: `lead-${Date.now()}`,
      name: rawLead.name,
      phone: rawLead.phone,
      service: rawLead.service,
      budget: rawLead.budget || 'Під розрахунок',
      timeline: rawLead.timeline || 'Не вказано',
      timestamp: formattedDate,
      status: 'new'
    };

    saveLeads([newLead, ...leads]);

    // Track conversion in Google Analytics 4 (GA4)
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Lead',
          event_label: rawLead.service,
          service_name: rawLead.service,
          value: parseFloat((rawLead.budget || '0').replace(/\D/g, '')) || 0,
          currency: 'UAH'
        });
      }
    } catch (e) {
      // ignore
    }

    // Send email notification to cicatrix74@gmail.com via FormSubmit.co
    fetch('https://formsubmit.co/ajax/cicatrix74@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "Ім'я Клієнта": rawLead.name,
        "Телефон": rawLead.phone,
        "Послуга": rawLead.service,
        "Орієнтовний бюджет": rawLead.budget || 'Під розрахунок',
        "Бажаний термін": rawLead.timeline || 'Не вказано',
        "_subject": `🔥 Kray Digital: Нова заявка від ${rawLead.name}`,
        "_captcha": "false",
        "_template": "box"
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Лист успішно надіслано на пошту:', data);
    })
    .catch(error => {
      console.error('Помилка надсилання листа:', error);
    });
  };

  // Lead panel actions
  const handleUpdateStatus = (id: string, status: 'new' | 'contacted' | 'completed') => {
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    saveLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeads(updated);
  };

  const handleResetLeads = () => {
    saveLeads(DEMO_LEADS);
  };

  // Utility to scroll to section smoothly with cubic easing & fixed header offset
  const handleScrollToSection = (elementId: string) => {
    if (!showBelowFold) {
      setShowBelowFold(true);
    }

    const scrollToEl = (el: HTMLElement) => {
      // Fixed header height (80px) + breathing room (12px)
      const headerOffset = 92;
      const targetY = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - headerOffset);
      const startY = window.pageYOffset;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) return;

      // Smooth duration adapted to distance (550ms - 850ms)
      const duration = Math.min(850, Math.max(550, Math.abs(distance) * 0.35));
      let startTime: number | null = null;

      // Easing curve: easeInOutCubic (soft start, pleasant momentum, silky stop)
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const step = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
        }
      };

      requestAnimationFrame(step);
    };

    const immediateEl = document.getElementById(elementId);
    if (immediateEl) {
      scrollToEl(immediateEl);
      return;
    }

    let attempts = 0;
    const waitForEl = () => {
      const el = document.getElementById(elementId);
      if (el) {
        scrollToEl(el);
      } else if (attempts < 25) {
        attempts += 1;
        window.setTimeout(waitForEl, 60);
      }
    };
    window.setTimeout(waitForEl, 60);
  };

  const handleOpenCalculatorWithService = (serviceName: string) => {
    setCalculatorService(serviceName);
    setIsCalculatorOpen(true);
  };

  const handleOpenCasesWithCase = (caseId: string | null) => {
    setSelectedCaseId(caseId);
    setIsCasesOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-on-background selection:bg-brand-primary-container selection:text-[#00363a] relative overflow-x-hidden w-full max-w-full" id="app-root">
      
      {/* Modern High-Tech Blueprint Grid Background */}
      <TechGridBackground />

      {/* Fixed top nav */}
      <Header 
        onOpenCalculator={() => handleOpenCalculatorWithService('')}
        onScrollToSection={handleScrollToSection}
        onOpenCases={() => handleOpenCasesWithCase(null)}
      />

       {/* Main layout */}
      <main className="pt-20 relative z-20 overflow-x-hidden w-full max-w-full">
        
        {/* Hero Banner section */}
        <Hero 
          onOpenCalculator={() => handleOpenCalculatorWithService('')} 
          onOpenCases={() => handleScrollToSection('portfolio-section')} 
        />

        {/* Below-the-fold sections deferred until interaction or idle */}
        {showBelowFold && (
          <>
            {/* Expertise / Bento services section */}
            <Suspense fallback={null}>
              <Expertise onSelectService={handleOpenCalculatorWithService} />
            </Suspense>

            {/* Visual Project Roadmap & Durations section */}
            <Suspense fallback={null}>
              <ProjectRoadmap 
                onOpenCalculator={handleOpenCalculatorWithService}
                onScrollToContact={() => handleScrollToSection('contact-cta-section')}
              />
            </Suspense>

            {/* Stats and trust section */}
            <Suspense fallback={null}>
              <Stats />
            </Suspense>

            {/* Portfolio / Our Works section */}
            <Suspense fallback={null}>
              <Portfolio onOpenCase={handleOpenCasesWithCase} />
            </Suspense>

            {/* Testimonials / Client Success Stories carousel section */}
            <Suspense fallback={null}>
              <Testimonials 
                onOpenCase={handleOpenCasesWithCase}
                onScrollToContact={() => handleScrollToSection('contact-cta-section')}
              />
            </Suspense>

            {/* FAQ Section answering client questions on timelines, guarantees, workflows */}
            <Suspense fallback={null}>
              <FAQ 
                onScrollToContact={() => handleScrollToSection('contact-cta-section')}
                onOpenCalculator={handleOpenCalculatorWithService}
              />
            </Suspense>

            {/* Contact/Lead Capture Form Section */}
            <Suspense fallback={null}>
              <ContactCTA onSubmitLead={handleAddLead} />
            </Suspense>
          </>
        )}

      </main>

      {/* Footer navigation */}
      <Footer 
        onOpenCases={() => handleScrollToSection('portfolio-section')} 
        onScrollToSection={handleScrollToSection}
        onOpenLeadPanel={() => setIsLeadPanelOpen(true)}
      />

      {/* OVERLAY COMPONENT POPUPS */}
      <Suspense fallback={null}>
        {isCasesOpen && (
          <CasesDrawer 
            isOpen={isCasesOpen} 
            initialCaseId={selectedCaseId}
            onClose={() => {
              setIsCasesOpen(false);
              setSelectedCaseId(null);
            }}
            onContactClick={() => {
              setTimeout(() => {
                handleScrollToSection('contact-cta-section');
              }, 300);
            }}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {isCalculatorOpen && (
          <CalculatorModal 
            isOpen={isCalculatorOpen} 
            onClose={() => setIsCalculatorOpen(false)} 
            onSubmitLead={handleAddLead}
            initialService={calculatorService}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {isLeadPanelOpen && (
          <LeadPanel 
            isOpen={isLeadPanelOpen} 
            onClose={() => setIsLeadPanelOpen(false)} 
            leads={leads}
            onUpdateStatus={handleUpdateStatus}
            onDeleteLead={handleDeleteLead}
            onResetLeads={handleResetLeads}
            onAddLead={handleAddLead}
          />
        )}
      </Suspense>

      {/* Floating Scroll to Top Action */}
      <ScrollToTop />

      {/* Floating Quick Help Chat Bubble */}
      {showBelowFold && (
        <Suspense fallback={null}>
          <QuickHelpChat 
            onOpenCalculator={() => handleOpenCalculatorWithService('')}
            onScrollToContact={() => handleScrollToSection('contact-cta-section')}
          />
        </Suspense>
      )}

    </div>
  );
}
