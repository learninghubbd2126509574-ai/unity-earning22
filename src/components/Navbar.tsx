import React from 'react';
import { Send, ShieldCheck, Sparkles, CheckCircle2, Award, Calendar } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { triggerSuccessFeedback } from '../utils/confettiFeedback';
import { getTodayBengaliDate } from '../utils/dateUtils';

interface NavbarProps {
  onOpenActivation: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenActivation,
  activeSection,
  setActiveSection,
  onOpenAdmin
}) => {
  const TELEGRAM_LINK = "https://t.me/unityearning12";
  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";
  const todayDate = getTodayBengaliDate();

  const handleActivationClick = () => {
    triggerSuccessFeedback({ x: 0.8, y: 0.1 });
    onOpenActivation();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs font-['Hind_Siliguri'] overflow-x-clip">
      
      {/* Top Cashback Announcement Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left Aligned: 300 TK Cashback Announcement */}
          <div className="flex items-center gap-2 text-left text-xs sm:text-[13px] min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
            <span className="font-normal text-slate-100 truncate">
              মেম্বারশিপ ক্যাশব্যাক অফার: <strong className="text-amber-300 font-bold">৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক</strong> নিশ্চিত!
            </span>
          </div>

          {/* Right Badges */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>লাইভ অফার সচল</span>
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3 h-3 text-indigo-400" />
              <span>ভেরিফাইড প্ল্যাটফর্ম</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Brand Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Brand Header Click for Admin Password Modal */}
        <div 
          className="flex items-center cursor-pointer group select-none py-0.5 min-w-0"
          onClick={onOpenAdmin}
          title="অ্যাডমিন প্যানেলের জন্য ক্লিক করুন"
        >
          <div className="min-w-0">
            <div className="font-['Outfit'] font-extrabold text-lg sm:text-2xl leading-none tracking-tight text-slate-900 flex items-center gap-1 sm:gap-1.5 uppercase truncate">
              UNITY <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">EARNING</span>
            </div>
            <div className="text-[10px] sm:text-xs text-indigo-700 font-bold tracking-wider uppercase mt-0.5">
              E-Learning Platform
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveSection('card')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSection === 'card'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            অফার ড্যাশবোর্ড
          </button>
          <button
            onClick={() => setActiveSection('courses')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSection === 'courses'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            কোর্স পোর্টফোলিও
          </button>
          <button
            onClick={() => setActiveSection('reviews')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSection === 'reviews'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            শিক্ষার্থীদের মতামত
          </button>
          <button
            onClick={() => setActiveSection('calculator')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSection === 'calculator'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            আয় ক্যালকুলেটর
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSection === 'faq'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            প্রশ্নোত্তর
          </button>
        </nav>

        {/* Action Buttons - Safe sizing to ensure Telegram never overflows */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handleActivationClick}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold bg-slate-50 hover:bg-white text-slate-800 px-3 py-1.5 sm:py-2 rounded-xl transition-all border border-slate-200 hover:text-indigo-600 hover:border-indigo-200 cursor-pointer shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>আইডি এক্টিভেশন</span>
          </button>

          <a
            href={WHATSAPP_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.open(WHATSAPP_CHANNEL_LINK, '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center gap-1.5 neu-btn-emerald text-white text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
            title="হোয়াটসঅ্যাপ পেমেন্ট গ্রুপ ও চ্যানেল"
          >
            <WhatsAppIcon size={14} className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="hidden sm:inline">হোয়াটসঅ্যাপ</span>
          </a>

          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 neu-btn-blue text-white text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all shadow-2xs shrink-0"
            title="টেলিগ্রাম চ্যানেল ও সাপোর্ট"
          >
            <Send className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>টেলিগ্রাম</span>
          </a>
        </div>
      </div>
    </header>
  );
};
