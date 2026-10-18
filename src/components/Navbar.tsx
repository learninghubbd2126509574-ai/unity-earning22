import React, { useState, useRef, useEffect } from 'react';
import { Bell, BellRing, X, GraduationCap, Sparkles, CheckCircle2, Flame, Gift, ArrowRight } from 'lucide-react';
import { triggerSuccessFeedback } from '../utils/confettiFeedback';

interface NavbarProps {
  onOpenActivation: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenAdmin: () => void;
  currentPrice: number;
  availableSeats: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenActivation,
  activeSection,
  setActiveSection,
  onOpenAdmin,
  currentPrice,
  availableSeats,
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notification popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  const handleToggleNotifications = () => {
    setIsNotificationOpen((prev) => !prev);
    if (!isNotificationOpen) {
      setHasUnread(false);
    }
  };

  const handleClaimOffer = () => {
    setIsNotificationOpen(false);
    triggerSuccessFeedback({ x: 0.8, y: 0.1 });
    onOpenActivation();
  };

  const savingsAmount = Math.max(0, 1100 - currentPrice);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E7EC] shadow-[0_1px_3px_0_rgba(16,24,40,0.04)] font-['Hind_Siliguri']">
      {/* 1. Promotional Announcement Bar - Slim micro-ticker */}
      <div className="bg-[#101828] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 truncate">
              মেম্বারশিপ ক্যাশব্যাক অফার: <strong className="text-amber-300 font-bold">৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক</strong> নিশ্চিত!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[10.5px] text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>লাইভ অফার সচল</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-blue-400" />
              <span>ভেরিফাইড এডুকেশন প্ল্যাটফর্ম</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Navbar - Slim, Sleek & Professional (h-13 sm:h-14) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-3">
        {/* Beautifully Proportioned Company Name & Brand Mark */}
        <div
          onClick={onOpenAdmin}
          className="cursor-pointer select-none flex items-center gap-2.5 group min-w-0"
          title="অ্যাডমিন প্যানেল"
        >
          {/* Brand Emblem Icon - Refined Compact Size */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#315CF5] via-[#254EDB] to-[#4F73F7] flex items-center justify-center text-white shadow-sm shadow-[#315CF5]/20 border border-white/20 group-hover:scale-105 transition-transform shrink-0">
            <GraduationCap className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>

          {/* Full Prominent Brand Name - Perfectly Sized & Balanced */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-base sm:text-lg tracking-tight leading-none text-[#101828] flex items-center gap-1.5 uppercase">
              <span>UNITY</span>
              <span className="text-[#315CF5]">EARNING</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="text-[9.5px] sm:text-[10px] font-extrabold tracking-wider text-[#315CF5] uppercase leading-none">
                E-LEARNING PLATFORM
              </span>
              <span className="inline-flex items-center gap-1 text-[8.5px] font-bold text-[#079669] bg-[#ECFDF5] px-1.5 py-0.2 rounded-full border border-[#A7F3D0]">
                <span className="w-1 h-1 rounded-full bg-[#079669] animate-pulse"></span>
                OFFICIAL
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links - Compact & Clean */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-[#667085]">
          <button
            onClick={() => setActiveSection('card')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'card'
                ? 'text-[#315CF5] font-bold border-b-2 border-[#315CF5]'
                : 'hover:text-[#101828]'
            }`}
          >
            অফার ড্যাশবোর্ড
          </button>
          <button
            onClick={() => setActiveSection('courses')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'courses'
                ? 'text-[#315CF5] font-bold border-b-2 border-[#315CF5]'
                : 'hover:text-[#101828]'
            }`}
          >
            কোর্সসমূহ
          </button>
          <button
            onClick={() => setActiveSection('reviews')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'reviews'
                ? 'text-[#315CF5] font-bold border-b-2 border-[#315CF5]'
                : 'hover:text-[#101828]'
            }`}
          >
            শিক্ষার্থীদের মতামত
          </button>
          <button
            onClick={() => setActiveSection('calculator')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'calculator'
                ? 'text-[#315CF5] font-bold border-b-2 border-[#315CF5]'
                : 'hover:text-[#101828]'
            }`}
          >
            আয় ক্যালকুলেটর
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'faq'
                ? 'text-[#315CF5] font-bold border-b-2 border-[#315CF5]'
                : 'hover:text-[#101828]'
            }`}
          >
            প্রশ্নোত্তর
          </button>
        </nav>

        {/* Notification Bell Section - Slim Button */}
        <div className="relative shrink-0" ref={notificationRef}>
          <button
            onClick={handleToggleNotifications}
            aria-label="অফার নোটিফিকেশন"
            title="লাইভ অফার নোটিফিকেশন"
            className={`relative p-2 sm:p-2.2 rounded-xl transition-all cursor-pointer border ${
              isNotificationOpen
                ? 'bg-[#EEF3FF] text-[#315CF5] border-[#315CF5]/40 shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-[#315CF5] border-[#E4E7EC] shadow-2xs'
            }`}
          >
            {hasUnread ? (
              <BellRing className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-bounce text-[#315CF5]" />
            ) : (
              <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            )}

            {/* Glowing Unread Indicator Badge */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600 text-white text-[8px] font-black items-center justify-center">
                  ১
                </span>
              </span>
            )}
          </button>

          {/* Notification Popover Dropdown Card */}
          {isNotificationOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="bg-[#101828] text-white p-3.5 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#315CF5] text-white">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold leading-none">নোটিফিকেশন সেন্টার</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      লাইভ আপডেট সচল
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Notification Content List */}
              <div className="p-3 sm:p-4 space-y-3 max-h-[75vh] overflow-y-auto">
                {/* 1. Primary Dynamic Price Offer Notification */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-blue-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#315CF5] bg-[#EEF3FF] px-2 py-0.5 rounded-full">
                      <Flame className="w-3.5 h-3.5 fill-[#315CF5]" />
                      <span>আজকের বিশেষ অফার</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">লাইভ আপডেট</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#101828] font-bold leading-snug">
                    রেগুলার ফি <span className="line-through text-red-500 font-extrabold">৳১,১০০</span> টাকার পরিবর্তে এখন মাত্র{' '}
                    <span className="text-[#315CF5] font-black text-base sm:text-lg">৳{currentPrice}</span> টাকায় লাইফটাইম অ্যাডমিশন চলছে!
                  </p>

                  <p className="text-[11px] text-[#667085] mt-1">
                    অ্যাডমিন কর্তৃক নির্ধারিত ছাড়: আপনি পাচ্ছেন সরাসরি{' '}
                    <strong className="text-[#079669]">৳{savingsAmount} টাকা</strong> ছাড়।
                  </p>

                  <button
                    onClick={handleClaimOffer}
                    className="mt-3 w-full py-2 px-3 rounded-xl bg-[#315CF5] hover:bg-[#254EDB] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <span>অফারটি গ্রহণ করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. ৳300 Instant Cashback Alert */}
                <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-[#079669] text-white shrink-0 mt-0.5">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-black text-[#065F46]">৩০০ ৳ নিশ্চিত ইনস্ট্যান্ট ক্যাশব্যাক</h5>
                    <p className="text-[11px] text-[#047857] mt-0.5 leading-relaxed">
                      আজকের দিনে যেকোনো কোর্সে সফল অ্যাডমিশন নিলেই পাচ্ছেন নগদ বা বিকাশ একাউন্টে ৩০০ টাকা ইনস্ট্যান্ট ক্যাশব্যাক বোনাস।
                    </p>
                  </div>
                </div>

                {/* 3. Limited Seats Live Alert */}
                <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-black text-[#92400E]">আসন সংখ্যা সীমিত</h5>
                      <span className="text-[11px] font-mono font-black text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-300">
                        {availableSeats} টি বাকি
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                      আজকের স্পেশাল ডিসকাউন্ট কোটায় কেবল {availableSeats} টি সিট অবশিষ্ট রয়েছে। কোটা পূর্ণ হলে রেগুলার ফি কার্যকর হবে।
                    </p>
                  </div>
                </div>
              </div>

              {/* Popover Footer */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#079669]" />
                  <span>সকল অফার রিয়েল-টাইম অ্যাডমিন সিস্টেম দ্বারা ভেরিফাইড</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

