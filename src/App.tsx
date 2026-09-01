import React, { useState } from 'react';
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
          <Navbar onOpenAdmin={handleOpenAdmin} />
          
          <main>
            <HeroSection />
            <ServicesSection />
            <ProcessSection />
            <CaseStudiesSection />
            <PortfolioSection />
            <PricingSection />
            <AboutSection />
            <TestimonialsSection />
            <BlogSection />
            <FAQSection />
            <ContactSection />
          </main>

          <Footer onOpenAdmin={handleOpenAdmin} />

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
