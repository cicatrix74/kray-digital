import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Stats from './components/Stats';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import CasesDrawer from './components/CasesDrawer';
import CalculatorModal from './components/CalculatorModal';
import LeadPanel from './components/LeadPanel';
import TechGridBackground from './components/TechGridBackground';
import ScrollToTop from './components/ScrollToTop';
import Portfolio from './components/Portfolio';
import QuickHelpChat from './components/QuickHelpChat';
import ProjectRoadmap from './components/ProjectRoadmap';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import { LeadSubmission } from './types';

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

  // Track cursor globally for interactive light sphere
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove);
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
    const el = document.getElementById(elementId);
    if (!el) return;

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

  const handleOpenCalculatorWithService = (serviceName: string) => {
    setCalculatorService(serviceName);
    setIsCalculatorOpen(true);
  };

  const handleOpenCasesWithCase = (caseId: string | null) => {
    setSelectedCaseId(caseId);
    setIsCasesOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-on-background selection:bg-brand-primary-container selection:text-[#00363a] relative" id="app-root">
      
      {/* Modern High-Tech Blueprint Grid Background */}
      <TechGridBackground />

      {/* Fixed top nav */}
      <Header 
        onOpenCalculator={() => handleOpenCalculatorWithService('')}
        onScrollToSection={handleScrollToSection}
        onOpenCases={() => handleOpenCasesWithCase(null)}
      />

       {/* Main layout */}
      <main className="pt-20 relative z-20">
        
        {/* Hero Banner section */}
        <Hero 
          onOpenCalculator={() => handleOpenCalculatorWithService('')} 
          onOpenCases={() => handleScrollToSection('portfolio-section')} 
        />

        {/* Expertise / Bento services section */}
        <Expertise onSelectService={handleOpenCalculatorWithService} />

        {/* Visual Project Roadmap & Durations section */}
        <ProjectRoadmap 
          onOpenCalculator={handleOpenCalculatorWithService}
          onScrollToContact={() => handleScrollToSection('contact-cta-section')}
        />

        {/* Stats and trust section */}
        <Stats />

        {/* Portfolio / Our Works section */}
        <Portfolio onOpenCase={handleOpenCasesWithCase} />

        {/* Testimonials / Client Success Stories carousel section */}
        <Testimonials 
          onOpenCase={handleOpenCasesWithCase}
          onScrollToContact={() => handleScrollToSection('contact-cta-section')}
        />

        {/* FAQ Section answering client questions on timelines, guarantees, workflows */}
        <FAQ 
          onScrollToContact={() => handleScrollToSection('contact-cta-section')}
          onOpenCalculator={handleOpenCalculatorWithService}
        />

        {/* Contact/Lead Capture Form Section */}
        <ContactCTA onSubmitLead={handleAddLead} />

      </main>

      {/* Footer navigation */}
      <Footer 
        onOpenCases={() => handleScrollToSection('portfolio-section')} 
        onScrollToSection={handleScrollToSection}
        onOpenLeadPanel={() => setIsLeadPanelOpen(true)}
      />

      {/* OVERLAY COMPONENT POPUPS WITH FRAMER MOTION ANIMATION */}
      <AnimatePresence>
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
      </AnimatePresence>

      <AnimatePresence>
        {isCalculatorOpen && (
          <CalculatorModal 
            isOpen={isCalculatorOpen} 
            onClose={() => setIsCalculatorOpen(false)} 
            onSubmitLead={handleAddLead}
            initialService={calculatorService}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
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
      </AnimatePresence>

      {/* Floating Scroll to Top Action */}
      <ScrollToTop />

      {/* Floating Quick Help Chat Bubble using Gemini API */}
      <QuickHelpChat 
        onOpenCalculator={() => handleOpenCalculatorWithService('')}
        onScrollToContact={() => handleScrollToSection('contact-cta-section')}
      />

    </div>
  );
}
