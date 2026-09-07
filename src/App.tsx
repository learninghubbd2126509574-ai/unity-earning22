import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { OfferCard } from './components/OfferCard';
import { KeyFeaturesSection } from './components/KeyFeaturesSection';
import { StudentReviewsSection } from './components/StudentReviewsSection';
import { ActivationModal } from './components/ActivationModal';
import { IncomeCalculator } from './components/IncomeCalculator';
import { CourseCatalog } from './components/CourseCatalog';
import { FAQSection } from './components/FAQSection';
import { AdminModal } from './components/AdminModal';
import { UnityAIChatbot } from './components/UnityAIChatbot';
import { Lock, Send, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { loadPricingSettings, calculateEffectivePrice, PricingSettings } from './utils/pricing';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('card');
  const [isActivationOpen, setIsActivationOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  // Initialize price from calendar / pricing settings
  const [currentPrice, setCurrentPrice] = useState<number>(() => {
    const settings = loadPricingSettings();
    return calculateEffectivePrice(settings);
  });

  const syncPrice = useCallback(() => {
    const settings = loadPricingSettings();
    const effective = calculateEffectivePrice(settings);
    setCurrentPrice(effective);
  }, []);

  useEffect(() => {
    syncPrice();
    // Re-check periodically in case midnight crossed
    const timer = setInterval(syncPrice, 60000);
    window.addEventListener('focus', syncPrice);
    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', syncPrice);
    };
  }, [syncPrice]);

  const handleUpdatePrice = (newPrice: number, _settings?: PricingSettings) => {
    setCurrentPrice(newPrice);
  };

  useEffect(() => {
    // Trigger celebration confetti safely on first load
    try {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);

      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: false
      });

      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          setTimeout(() => {
            if (document.body.contains(canvas)) {
              document.body.removeChild(canvas);
            }
          }, 3000);
          return;
        }

        const particleCount = 35 * (timeLeft / duration);
        try {
          myConfetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          myConfetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        } catch {
          // safe fallback
        }
      }, 250);

      return () => {
        clearInterval(interval);
        if (document.body.contains(canvas)) {
          document.body.removeChild(canvas);
        }
      };
    } catch {
      // Safe fallback if canvas creation fails in sandboxed iframe
    }
  }, []);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveSection('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#2C3E50] flex flex-col font-['Hind_Siliguri']">
      
      {/* Top Header Navigation (Neumorphic) */}
      <Navbar
        onOpenActivation={() => setIsActivationOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Section Navigation Pills Bar for Mobile (Neumorphic Inset) */}
        <div className="md:hidden bg-[#EEF2F6]/95 px-3 py-2 border-b border-white/80 flex items-center justify-between overflow-x-auto text-xs font-bold space-x-2 no-scrollbar shadow-xs">
          <button
            onClick={() => setActiveSection('card')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'card' ? 'neu-btn-primary shadow-xs' : 'neu-flat text-slate-700'
            }`}
          >
            অফার ড্যাশবোর্ড
          </button>
          <button
            onClick={() => setActiveSection('reviews')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'reviews' ? 'neu-btn-primary shadow-xs' : 'neu-flat text-slate-700'
            }`}
          >
            শিক্ষার্থীদের মতামত
          </button>
          <button
            onClick={() => setActiveSection('courses')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'courses' ? 'neu-btn-primary shadow-xs' : 'neu-flat text-slate-700'
            }`}
          >
            কোর্সসমূহ
          </button>
          <button
            onClick={() => setActiveSection('calculator')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'calculator' ? 'neu-btn-primary shadow-xs' : 'neu-flat text-slate-700'
            }`}
          >
            আয় ক্যালকুলেটর
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'faq' ? 'neu-btn-primary shadow-xs' : 'neu-flat text-slate-700'
            }`}
          >
            প্রশ্নোত্তর
          </button>
        </div>

        {/* View Switcher */}
        {activeSection === 'card' && (
          <div className="space-y-6 pb-12">
            {/* 1. Hero Offer Card (Neumorphic) */}
            <OfferCard
              onOpenActivation={() => setIsActivationOpen(true)}
              onSelectCourse={handleSelectCourse}
              onOpenCalculator={() => setActiveSection('calculator')}
              currentPrice={currentPrice}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />

            {/* 2. Key Features Section (Neumorphic) */}
            <KeyFeaturesSection 
              onOpenActivation={() => setIsActivationOpen(true)}
            />

            {/* 3. Students Reviews & Comments Section (Core Carousel Addition) */}
            <StudentReviewsSection />

            {/* 4. Courses Catalog */}
            <CourseCatalog 
              onOpenActivation={() => setIsActivationOpen(true)} 
              selectedCourseId={selectedCourseId} 
              currentPrice={currentPrice}
            />

            {/* 5. FAQ Section */}
            <FAQSection 
              onOpenActivation={() => setIsActivationOpen(true)} 
              currentPrice={currentPrice}
            />
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="py-6">
            <StudentReviewsSection />
          </div>
        )}

        {activeSection === 'courses' && (
          <div className="py-6">
            <CourseCatalog
              onOpenActivation={() => setIsActivationOpen(true)}
              selectedCourseId={selectedCourseId}
              currentPrice={currentPrice}
            />
          </div>
        )}

        {activeSection === 'calculator' && (
          <div className="py-6">
            <IncomeCalculator 
              onOpenActivation={() => setIsActivationOpen(true)} 
              currentPrice={currentPrice}
            />
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="py-6">
            <FAQSection 
              onOpenActivation={() => setIsActivationOpen(true)} 
              currentPrice={currentPrice}
            />
          </div>
        )}

      </main>

      {/* Neumorphic Soft UI Footer */}
      <footer className="bg-[#EEF2F6] border-t border-white/80 text-slate-600 text-xs py-10 px-4 mt-8 mb-16 sm:mb-0 shadow-[0_-4px_16px_rgba(209,217,230,0.4)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div>
            <div className="text-slate-900 font-['Outfit'] font-black text-lg flex items-center justify-center md:justify-start gap-1.5 uppercase">
              <span>UNITY <span className="text-indigo-600">EARNING</span></span>
            </div>
            <div className="text-[11px] text-indigo-700 font-bold uppercase tracking-wider mt-0.5">
              E-Learning Platform
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm font-medium">
              Unity Earning E-Learning Platform - নির্ভরযোগ্য ফ্রিল্যান্সিং স্কিল ও অনলাইন ক্যারিয়ার হাব।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600 text-xs font-semibold">
            <a 
              href="https://t.me/unityearning12" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="neu-btn text-blue-700 px-3.5 py-1.5 rounded-xl border border-white flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@unityearning12</span>
            </a>

            <a 
              href="https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="neu-btn-emerald text-white px-3.5 py-1.5 rounded-xl border border-emerald-300/40 flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <WhatsAppIcon size={14} className="w-3.5 h-3.5 text-white" />
              <span>হোয়াটসঅ্যাপ চ্যানেল</span>
            </a>

            <span className="neu-flat-xs px-2.5 py-1 rounded-lg text-emerald-700 font-bold border border-white">
              ক্যাশব্যাক: ৩০০৳
            </span>
          </div>

          <div className="text-xs text-slate-500 flex flex-col md:flex-row items-center justify-center gap-3">
            <span>© {new Date().getFullYear()} Unity Earning. All rights reserved.</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="neu-flat-xs px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer border border-white"
              title="Admin Login (212650)"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </button>
          </div>

        </div>
      </footer>

      {/* Interactive Account Activation Drawer Modal */}
      <ActivationModal
        isOpen={isActivationOpen}
        onClose={() => setIsActivationOpen(false)}
        currentPrice={currentPrice}
      />
      
      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentPrice={currentPrice}
        onUpdatePrice={handleUpdatePrice}
      />

      {/* Floating Unity AI Assistant Chatbot */}
      <UnityAIChatbot
        currentPrice={currentPrice}
        onOpenActivation={() => setIsActivationOpen(true)}
      />
    </div>
  );
}
