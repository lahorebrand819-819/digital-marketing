import React, { useState, useEffect } from 'react';
import { AgencyProvider, useAgency } from './context/AgencyContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { Toast } from './components/common/Toast';
import { HeroSection } from './components/public/HeroSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ProcessSection } from './components/public/ProcessSection';
import { CaseStudiesSection } from './components/public/CaseStudiesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { PricingSection } from './components/public/PricingSection';
import { AboutSection } from './components/public/AboutSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { BlogSection } from './components/public/BlogSection';
import { FAQSection } from './components/public/FAQSection';
import { ContactSection } from './components/public/ContactSection';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { Loader2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { isLoading, isAuthenticated } = useAgency();
  const [isAdminView, setIsAdminView] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setIsAdminView(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsAdminView(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setSelectedService('');
    handleNavigate('contact');
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setSelectedPackage('');
    handleNavigate('contact');
  };

  // Scroll listener to update active section in navbar
  useEffect(() => {
    if (isAdminView) return;

    const sections = ['home', 'services', 'pricing', 'portfolio', 'case-studies', 'about', 'blog', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminView]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <div className="text-sm font-semibold tracking-wide">
          Loading Digital Growth Agency...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Toast Notifications Container */}
      <Toast />

      {/* Admin Mode View */}
      {isAdminView && isAuthenticated ? (
        <AdminLayout onExitAdmin={() => setIsAdminView(false)} />
      ) : (
        /* Public Live Website View */
        <>
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenAdmin={handleOpenAdmin}
          />
          
          <main>
            <HeroSection
              onGetStarted={() => handleNavigate('contact')}
              onViewWork={() => handleNavigate('portfolio')}
            />
            <ServicesSection onSelectServiceForInquiry={handleSelectService} />
            <ProcessSection />
            <CaseStudiesSection />
            <PortfolioSection />
            <PricingSection onSelectPackage={handleSelectPackage} />
            <AboutSection />
            <TestimonialsSection />
            <BlogSection />
            <FAQSection />
            <ContactSection
              initialService={selectedService}
              initialPackage={selectedPackage}
            />
          </main>

          <Footer onNavigate={handleNavigate} onOpenAdmin={handleOpenAdmin} />

          {/* Floating WhatsApp Quick Connect */}
          <WhatsAppButton />

          {/* Admin Login Modal (Triggered by Discreet Lock in Footer or direct shortcut) */}
          {showLoginModal && (
            <AdminLogin
              onClose={() => setShowLoginModal(false)}
              onSuccess={handleLoginSuccess}
            />
          )}
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AgencyProvider>
      <MainContent />
    </AgencyProvider>
  );
}
