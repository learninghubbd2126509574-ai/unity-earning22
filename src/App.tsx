import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OfferCard } from './components/OfferCard';
import { ActivationModal } from './components/ActivationModal';
import { IncomeCalculator } from './components/IncomeCalculator';
import { CourseCatalog } from './components/CourseCatalog';
import { LivePayoutTicker } from './components/LivePayoutTicker';
import { FAQSection } from './components/FAQSection';
import { AdminModal } from './components/AdminModal';
import { Sparkles, MessageCircle, ShieldCheck, Heart, Award, CheckCircle, Lock } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('card');
  const [isActivationOpen, setIsActivationOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<number>(499);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  const WHATSAPP_LINK = "https://wa.me/8801600602084?text=%E0%A6%86%E0%A6%AE%E0%A6%BF%20Unity%20Earning%20%E0%A6%8F%20%E0%A6%AF%E0%A7%81%E0%A6%95%E0%A7%8D%E0%A6%A4%20%E0%A6%B9%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A6%A4%E0%A7%87%E0%A6%9B%E0%A6%B8%E0%A6%BF%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%8D%E0%A4%A";

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveSection('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0813] text-white flex flex-col font-['Hind_Siliguri']">
      
      {/* Top Header Navigation */}
      <Navbar
        onOpenActivation={() => setIsActivationOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Section Navigation Pills Bar for Mobile */}
        <div className="md:hidden bg-[#130f26]/80 backdrop-blur-md px-3 py-2 border-b border-white/5 flex items-center justify-between overflow-x-auto text-xs font-semibold space-x-1 no-scrollbar">
          <button
            onClick={() => setActiveSection('card')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition-colors ${
              activeSection === 'card' ? 'bg-indigo-600 text-white' : 'text-gray-300'
            }`}
          >
            অফার কার্ড
          </button>
          <button
            onClick={() => setActiveSection('courses')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition-colors ${
              activeSection === 'courses' ? 'bg-indigo-600 text-white' : 'text-gray-300'
            }`}
          >
            কোর্সসমূহ
          </button>
          <button
            onClick={() => setActiveSection('calculator')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition-colors ${
              activeSection === 'calculator' ? 'bg-indigo-600 text-white' : 'text-gray-300'
            }`}
          >
            আয় ক্যালকুলেটর
          </button>
          <button
            onClick={() => setActiveSection('proofs')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition-colors ${
              activeSection === 'proofs' ? 'bg-indigo-600 text-white' : 'text-gray-300'
            }`}
          >
            পেমেন্ট প্রুফ
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition-colors ${
              activeSection === 'faq' ? 'bg-indigo-600 text-white' : 'text-gray-300'
            }`}
          >
            প্রশ্ন উত্তর
          </button>
        </div>

        {/* View Switcher */}
        {activeSection === 'card' && (
          <div className="space-y-12 pb-12">
            <OfferCard
              onOpenActivation={() => setIsActivationOpen(true)}
              onSelectCourse={handleSelectCourse}
              onOpenCalculator={() => setActiveSection('calculator')}
              currentPrice={currentPrice}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />

            {/* Quick Teasers on Main Offer Page */}
            <LivePayoutTicker onOpenActivation={() => setIsActivationOpen(true)} />
            <CourseCatalog onOpenActivation={() => setIsActivationOpen(true)} selectedCourseId={selectedCourseId} />
            <FAQSection onOpenActivation={() => setIsActivationOpen(true)} />
          </div>
        )}

        {activeSection === 'courses' && (
          <div className="py-6">
            <CourseCatalog
              onOpenActivation={() => setIsActivationOpen(true)}
              selectedCourseId={selectedCourseId}
            />
          </div>
        )}

        {activeSection === 'calculator' && (
          <div className="py-6">
            <IncomeCalculator onOpenActivation={() => setIsActivationOpen(true)} />
          </div>
        )}

        {activeSection === 'proofs' && (
          <div className="py-6">
            <LivePayoutTicker onOpenActivation={() => setIsActivationOpen(true)} />
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="py-6">
            <FAQSection onOpenActivation={() => setIsActivationOpen(true)} />
          </div>
        )}

      </main>

      {/* Footer Section */}
      <footer className="bg-[#07050e] border-t border-white/10 text-gray-400 text-xs py-8 px-4 mt-12 mb-16 sm:mb-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div>
            <div className="text-white font-extrabold text-sm flex items-center justify-center md:justify-start gap-1">
              ✨ Unity <span className="text-indigo-400">Earning</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 max-w-sm">
              Unity Earning E-learning Platform - আইটি স্কিল শিখুন, ভবিষ্যৎ গড়ুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 text-[11px]">
            <span>হোয়াটসঅ্যাপ: <a href="https://wa.me/8801600602084" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">01600602084</a></span>
            <span>•</span>
            <span>মেম্বারশিপ: {currentPrice}৳ (৫৫% ছাড়)</span>
            <span>•</span>
            <span>ক্যাশব্যাক: ৩০০৳</span>
          </div>

          <div className="text-[10px] text-gray-500 w-full text-center flex flex-col md:flex-row items-center justify-center gap-2 mt-4 md:mt-0">
            <span>© {new Date().getFullYear()} Unity Earning. All rights reserved.</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-1"
              title="Admin Login (212650)"
            >
              <Lock className="w-3 h-3" />
              <span>Login</span>
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
        onUpdatePrice={setCurrentPrice}
      />

    </div>
  );
}
