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
              availableSeats={availableSeats}
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
              availableSeats={availableSeats}
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

      {/* Professional Multi-Column Educational Footer */}
      <footer className="bg-white border-t border-[#E4E7EC] text-[#667085] text-xs pt-12 pb-24 sm:pb-12 px-4 sm:px-6 mt-14">
        <div className="max-w-6xl mx-auto">
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E4E7EC]">
            
            {/* Col 1 (lg:col-span-4): Brand & Platform Mission */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#315CF5] flex items-center justify-center text-white font-bold text-sm">
                  UE
                </div>
                <div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg tracking-tight leading-none text-[#101828] uppercase">
                    <span>UNITY</span>
                    <span className="text-[#315CF5]">EARNING</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#315CF5] tracking-wider uppercase block mt-0.5">
                    E-Learning Platform
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#667085] leading-relaxed max-w-sm font-normal">
                Unity Earning E-Learning Platform - বাস্তবমুখী আইটি দক্ষতা উন্নয়ন, আধুনিক ফ্রিল্যান্সিং গাইডলাইন ও শিক্ষার্থীদের জন্য নির্ভরযোগ্য অনলাইন ক্যারিয়ার হাব।
              </p>

              {/* Official Social Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a 
                  href="https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-emerald h-8 px-3 text-xs font-bold"
                  title="হোয়াটসঅ্যাপ চ্যানেল"
                >
                  <WhatsAppIcon size={14} className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp</span>
                </a>

                <a 
                  href="https://t.me/unityearning12" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-telegram h-8 px-3 text-xs font-bold"
                  title="টেলিগ্রাম চ্যানেল"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>

                <span className="bg-[#ECFDF5] text-[#079669] px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-[#A7F3D0]">
                  ৳৩০০ ক্যাশব্যাক
                </span>
              </div>
            </div>

            {/* Col 2 (lg:col-span-3): Popular Courses */}
            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                জনপ্রিয় কোর্সসমূহ
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => handleSelectCourse('data-entry')}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer text-left"
                  >
                    • ডাটা এন্ট্রি স্পেশালাইজেশন
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectCourse('digital-marketing')}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer text-left"
                  >
                    • ডিজিটাল মার্কেটিং ও এসইও
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectCourse('graphic-design')}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer text-left"
                  >
                    • গ্রাফিক ডিজাইন ও ক্যানভা
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectCourse('video-editing')}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer text-left"
                  >
                    • ভিডিও এডিটিং ও রিলস মেকিং
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectCourse('content-writing')}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer text-left"
                  >
                    • কন্টেন্ট অ্যান্ড আর্টিকেল রাইটিং
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 (lg:col-span-2): Quick Navigation */}
            <div className="lg:col-span-2 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                কুইক লিংকস
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => { setActiveSection('card'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer"
                  >
                    অফার ড্যাশবোর্ড
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveSection('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer"
                  >
                    কোর্স ক্যাটালগ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveSection('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer"
                  >
                    শিক্ষার্থীদের রিভিউ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveSection('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer"
                  >
                    ইনকাম ক্যালকুলেটর
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveSection('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#315CF5] transition-colors cursor-pointer"
                  >
                    সচরাচর প্রশ্ন-উত্তর
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4 (lg:col-span-3): Trust & Support Policy */}
            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                নিরাপত্তা ও সহায়তা
              </h4>
              <div className="space-y-2 text-xs text-[#667085]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#079669] shrink-0 mt-0.5" />
                  <span>২৪/৭ ডেডিকেটেড মেন্টর ও কাউন্সিলর সহায়তা</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#079669] shrink-0 mt-0.5" />
                  <span>লোকাল বিকাশ ও নগদ পার্সোনাল ক্যাশআউট</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#315CF5] shrink-0 mt-0.5" />
                  <span>ভেরিফাইড লাইফটাইম মেম্বারশিপ এক্সেস</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsActivationOpen(true)}
                  className="btn-primary w-full h-9 text-xs font-bold cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>আইডি অ্যাক্টিভেশন ফর্ম</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright, Terms & Admin Link */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#667085] text-center md:text-left">
            <div>
              <span>© {new Date().getFullYear()} Unity Earning E-Learning Platform. সর্বস্বত্ব সংরক্ষিত।</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center text-[11px]">
              <span className="text-slate-400">গোপনীয়তা নীতি</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">ব্যবহারের শর্তাবলী</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">পেমেন্ট পলিসি</span>
              <span className="text-slate-300">·</span>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="btn-secondary h-7 px-2.5 text-[11px] text-[#667085] hover:text-[#101828] cursor-pointer inline-flex items-center gap-1"
                title="Admin Control Panel"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
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
