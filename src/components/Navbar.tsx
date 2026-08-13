import React from 'react';
import { MessageCircle, ShieldCheck, Sparkles, PhoneCall, Lock } from 'lucide-react';

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
  const WHATSAPP_LINK = "https://wa.me/8801600602084?text=%E0%A6%86%E0%A6%AE%E0%A6%BF%20Unity%20Earning%20%E0%A6%8F%20%E0%A6%AF%E0%A7%81%E0%A6%95%E0%A7%8D%E0%A6%A4%20%E0%A6%B9%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A6%A4%E0%A7%87%E0%A6%9B%E0%A6%B8%E0%A6%BF%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%8D%E0%A4%A";

  return (
    <header className="sticky top-0 z-40 bg-[#0a0813]/95 backdrop-blur-md border-b border-white/5">
      {/* Top Banner Notice */}
      <div className="bg-emerald-500/10 text-xs py-2 px-4 text-center text-emerald-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>মেম্বারশিপের সাথে পাচ্ছেন <strong>৩০০ টাকা ইনস্ট্যান্ট ক্যাশব্যাক</strong> অফার!</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Header & Logo Click for Admin Password Modal */}
        <div 
          className="flex items-center gap-2 cursor-pointer group select-none"
          onClick={onOpenAdmin}
          title="অ্যাডমিন প্যানেলের জন্য লোগোতে ক্লিক করুন (পাসওয়ার্ড: 212650)"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="text-lg">✨</span>
          </div>
          <div>
            <div className="font-bold text-lg leading-none tracking-tight flex items-center gap-1">
              Unity <span className="text-indigo-400">Earning</span>
            </div>
            <div className="text-[11px] text-gray-400 font-medium">E-learning & Skill Portal</div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-gray-300 bg-[#130f26] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveSection('card')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'card'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            অফার কার্ড
          </button>
          <button
            onClick={() => setActiveSection('courses')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'courses'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            কোর্স ও কাজসমূহ
          </button>
          <button
            onClick={() => setActiveSection('calculator')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'calculator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            আয় ক্যালকুলেটর
          </button>
          <button
            onClick={() => setActiveSection('proofs')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'proofs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            পেমেন্ট প্রুফ
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'faq'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            প্রশ্ন উত্তর
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenActivation}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 px-3 py-2 rounded-xl transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>আইডি অ্যাক্টিভ করুন</span>
          </button>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden xs:inline">WhatsApp</span>
            <span className="xs:hidden">মেসেজ</span>
          </a>
        </div>
      </div>
    </header>
  );
};
