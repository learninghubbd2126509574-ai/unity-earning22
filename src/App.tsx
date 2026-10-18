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
import { Lock, Send, ShieldCheck, CheckCircle2, Sparkles, BookOpen, MessageSquare, Calculator, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { loadPricingSettings, savePricingSettings, calculateEffectivePrice, PricingSettings, DEFAULT_VIDEO_URL, DEFAULT_NAGAD_NUMBER, DEFAULT_UPAY_NUMBER } from './utils/pricing';
import { subscribeToPricingSettings } from './lib/firebase';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('card');
  const [isActivationOpen, setIsActivationOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  // Initialize price, available seats, video URL & payment numbers from settings
  const [currentPrice, setCurrentPrice] = useState<number>(() => {
    const settings = loadPricingSettings();
    return calculateEffectivePrice(settings);
  });
  const [availableSeats, setAvailableSeats] = useState<number>(() => {
    const settings = loadPricingSettings();
    return settings.availableSeats ?? 41;
  });
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    const settings = loadPricingSettings();
    return settings.videoUrl || DEFAULT_VIDEO_URL;
  });
  const [nagadNumber, setNagadNumber] = useState<string>(() => {
    const settings = loadPricingSettings();
    return settings.nagadNumber || DEFAULT_NAGAD_NUMBER;
  });
  const [upayNumber, setUpayNumber] = useState<string>(() => {
    const settings = loadPricingSettings();
    return settings.upayNumber || DEFAULT_UPAY_NUMBER;
  });

  const syncPrice = useCallback(() => {
    const settings = loadPricingSettings();
    const effective = calculateEffectivePrice(settings);
    setCurrentPrice(effective);
    if (typeof settings.availableSeats === 'number') {
      setAvailableSeats(settings.availableSeats);
    }
    if (settings.videoUrl) setVideoUrl(settings.videoUrl);
    if (settings.nagadNumber) setNagadNumber(settings.nagadNumber);
    if (settings.upayNumber) setUpayNumber(settings.upayNumber);
  }, []);

  useEffect(() => {
    syncPrice();
    
    // Subscribe to Firebase Firestore real-time pricing, seats, video URL & numbers changes
    const unsubscribeFirebase = subscribeToPricingSettings((newSettings) => {
      savePricingSettings(newSettings);
      const effective = calculateEffectivePrice(newSettings);
      setCurrentPrice(effective);
      if (typeof newSettings.availableSeats === 'number') {
        setAvailableSeats(newSettings.availableSeats);
      }
      if (newSettings.videoUrl) setVideoUrl(newSettings.videoUrl);
      if (newSettings.nagadNumber) setNagadNumber(newSettings.nagadNumber);
      if (newSettings.upayNumber) setUpayNumber(newSettings.upayNumber);
    });

    // Re-check periodically in case midnight crossed
    const timer = setInterval(syncPrice, 60000);
    window.addEventListener('focus', syncPrice);
    return () => {
      unsubscribeFirebase();
      clearInterval(timer);
      window.removeEventListener('focus', syncPrice);
    };
  }, [syncPrice]);

  const handleUpdatePrice = (newPrice: number, settings?: PricingSettings) => {
    setCurrentPrice(newPrice);
    if (settings) {
      if (typeof settings.availableSeats === 'number') {
        setAvailableSeats(settings.availableSeats);
      }
      if (settings.videoUrl) setVideoUrl(settings.videoUrl);
      if (settings.nagadNumber) setNagadNumber(settings.nagadNumber);
      if (settings.upayNumber) setUpayNumber(settings.upayNumber);
    }
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
    <div className="min-h-screen bg-[#F6F8FC] text-[#101828] flex flex-col font-['Hind_Siliguri']">
      
      {/* Top Header Navigation */}
      <Navbar
        onOpenActivation={() => setIsActivationOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currentPrice={currentPrice}
        availableSeats={availableSeats}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* View Switcher */}
        {activeSection === 'card' && (
          <div className="space-y-6 pb-12">
            {/* 1. Hero Offer Card */}
            <OfferCard
              onOpenActivation={() => setIsActivationOpen(true)}
              onSelectCourse={handleSelectCourse}
              onOpenCalculator={() => { setActiveSection('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              currentPrice={currentPrice}
              availableSeats={availableSeats}
              onOpenAdmin={() => setIsAdminOpen(true)}
              videoUrl={videoUrl}
              nagadNumber={nagadNumber}
              upayNumber={upayNumber}
            />

            {/* 2. Key Features Section */}
            <KeyFeaturesSection 
              onOpenActivation={() => setIsActivationOpen(true)}
            />

            {/* 3. Students Reviews & Comments Section */}
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
          <div className="py-4 sm:py-6">
            <StudentReviewsSection />
          </div>
        )}

        {activeSection === 'courses' && (
          <div className="py-4 sm:py-6">
            <CourseCatalog
              onOpenActivation={() => setIsActivationOpen(true)}
              selectedCourseId={selectedCourseId}
              currentPrice={currentPrice}
            />
          </div>
        )}

        {activeSection === 'calculator' && (
          <div className="py-4 sm:py-6">
            <IncomeCalculator 
              onOpenActivation={() => setIsActivationOpen(true)} 
              currentPrice={currentPrice}
            />
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="py-4 sm:py-6">
            <FAQSection 
              onOpenActivation={() => setIsActivationOpen(true)} 
              currentPrice={currentPrice}
            />
          </div>
        )}

      </main>

      {/* Modern Clean Footer (Stripe / Coursera style) */}
      <footer className="bg-white border-t border-[#E4E7EC] text-[#667085] text-xs py-8 px-4 mt-12 pb-24 sm:pb-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg flex items-center justify-center md:justify-start gap-1.5 uppercase tracking-tight text-[#101828]">
              <span>UNITY</span>
              <span className="text-[#315CF5]">EARNING</span>
            </div>
            <div className="text-[10px] text-[#315CF5] font-bold uppercase tracking-wider mt-0.5">
              E-Learning Platform
            </div>
            <p className="text-xs text-[#667085] mt-1 max-w-sm font-normal">
              Unity Earning E-Learning Platform - নির্ভরযোগ্য আইটি স্কিল ও অনলাইন ক্যারিয়ার হাব।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold">
            <a 
              href="https://t.me/unityearning12" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-telegram h-9 px-3 text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@unityearning12</span>
            </a>

            <a 
              href="https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-emerald h-9 px-3 text-xs"
            >
              <WhatsAppIcon size={14} className="w-3.5 h-3.5 text-white" />
              <span>হোয়াটসঅ্যাপ চ্যানেল</span>
            </a>

            <span className="bg-[#ECFDF5] text-[#079669] px-3 py-1.5 rounded-lg font-bold border border-[#A7F3D0]">
              ক্যাশব্যাক: ৩০০৳
            </span>
          </div>

          <div className="text-xs text-[#667085] flex flex-col md:flex-row items-center justify-center gap-3">
            <span>© {new Date().getFullYear()} Unity Earning. All rights reserved.</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="btn-secondary h-8 px-2.5 text-[11px] text-[#667085] hover:text-[#101828]"
              title="Admin Login"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </button>
          </div>

        </div>
      </footer>

      {/* Mobile Native App Bottom Navigation Dock (Fixed bottom bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E7EC] py-1.5 px-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(16,24,40,0.05)] safe-area-bottom">
        <button
          onClick={() => { setActiveSection('card'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            activeSection === 'card' ? 'text-[#315CF5] font-bold' : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">অফার</span>
        </button>

        <button
          onClick={() => { setActiveSection('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            activeSection === 'courses' ? 'text-[#315CF5] font-bold' : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">কোর্সসমূহ</span>
        </button>

        <button
          onClick={() => { setActiveSection('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            activeSection === 'reviews' ? 'text-[#315CF5] font-bold' : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">রিভিউ</span>
        </button>

        <button
          onClick={() => { setActiveSection('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            activeSection === 'calculator' ? 'text-[#315CF5] font-bold' : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          <Calculator className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">ক্যালকুলেটর</span>
        </button>

        <button
          onClick={() => { setActiveSection('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            activeSection === 'faq' ? 'text-[#315CF5] font-bold' : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          <HelpCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">প্রশ্নোত্তর</span>
        </button>
      </nav>

      {/* Interactive Account Activation Drawer Modal */}
      <ActivationModal
        isOpen={isActivationOpen}
        onClose={() => setIsActivationOpen(false)}
        currentPrice={currentPrice}
        nagadNumber={nagadNumber}
        upayNumber={upayNumber}
      />
      
      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentPrice={currentPrice}
        availableSeats={availableSeats}
        videoUrl={videoUrl}
        nagadNumber={nagadNumber}
        upayNumber={upayNumber}
        onUpdatePrice={handleUpdatePrice}
        onUpdateSeats={(seats) => setAvailableSeats(seats)}
        onUpdateSettings={(settings) => {
          if (settings.videoUrl) setVideoUrl(settings.videoUrl);
          if (settings.nagadNumber) setNagadNumber(settings.nagadNumber);
          if (settings.upayNumber) setUpayNumber(settings.upayNumber);
        }}
      />

      {/* Floating Unity AI Assistant Chatbot */}
      <UnityAIChatbot
        currentPrice={currentPrice}
        onOpenActivation={() => setIsActivationOpen(true)}
      />
    </div>
  );
}
