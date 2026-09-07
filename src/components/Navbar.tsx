import React from 'react';
import { Send, ShieldCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { triggerSuccessFeedback } from '../utils/confettiFeedback';

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

  const handleActivationClick = () => {
    triggerSuccessFeedback({ x: 0.8, y: 0.1 });
    onOpenActivation();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#EBF0F6]/95 backdrop-blur-md border-b border-slate-300/70 shadow-[0_4px_12px_rgba(180,195,215,0.4)] font-['Hind_Siliguri']">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
        <span>মেম্বারশিপের সাথে পাচ্ছেন <strong className="font-bold underline decoration-white/50">৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক</strong> অফার!</span>
        <span className="hidden sm:inline-flex items-center gap-1 bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-2">
          <CheckCircle2 className="w-3 h-3" /> ভেরিফাইড প্ল্যাটফর্ম
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Header Click for Admin Password Modal */}
        <div 
          className="flex items-center cursor-pointer group select-none py-1"
          onClick={onOpenAdmin}
          title="অ্যাডমিন প্যানেলের জন্য ক্লিক করুন"
        >
          <div>
            <div className="font-['Outfit'] font-black text-xl sm:text-2xl leading-none tracking-tight text-slate-900 flex items-center gap-1.5 uppercase">
              UNITY <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">EARNING</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">E-Learning Platform</div>
          </div>
        </div>

        {/* Desktop Nav Links (Neumorphic) */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white/60 p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
          <button
            onClick={() => setActiveSection('card')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'card'
                ? 'neu-btn-primary font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            অফার ড্যাশবোর্ড
          </button>
          <button
            onClick={() => setActiveSection('courses')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'courses'
                ? 'neu-btn-primary font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            কোর্স পোর্টফোলিও
          </button>
          <button
            onClick={() => setActiveSection('reviews')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'reviews'
                ? 'neu-btn-primary font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            শিক্ষার্থীদের মতামত
          </button>
          <button
            onClick={() => setActiveSection('calculator')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'calculator'
                ? 'neu-btn-primary font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            আয় ক্যালকুলেটর
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'faq'
                ? 'neu-btn-primary font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            প্রশ্নোত্তর
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleActivationClick}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-white/80 hover:bg-white text-slate-800 px-3.5 py-2 rounded-xl transition-all border border-slate-200/80 hover:text-indigo-600 cursor-pointer shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>আইডি এক্টিভেশন</span>
          </button>

          <a
            href={WHATSAPP_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.open(WHATSAPP_CHANNEL_LINK, '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center gap-1.5 neu-btn-emerald text-white text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
            title="হোয়াটসঅ্যাপ পেমেন্ট গ্রুপ ও চ্যানেল"
          >
            <WhatsAppIcon size={15} className="w-4 h-4 text-white shrink-0" />
            <span className="hidden sm:inline">হোয়াটসঅ্যাপ</span>
          </a>

          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 neu-btn-blue text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>টেলিগ্রাম</span>
          </a>
        </div>
      </div>
    </header>
  );
};
