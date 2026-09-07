import React, { useState, useEffect } from 'react';
import { Check, Send, Sparkles, Copy, ArrowRight, ShieldCheck, Clock, Zap, Calculator, CheckCircle2, Award, PartyPopper, Flame } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { triggerSuccessFeedback, triggerBigOfferCelebration } from '../utils/confettiFeedback';

interface OfferCardProps {
  onOpenActivation: () => void;
  onSelectCourse?: (courseId: string) => void;
  onOpenCalculator?: () => void;
  currentPrice: number;
  onOpenAdmin: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  onOpenActivation,
  onSelectCourse,
  onOpenCalculator,
  currentPrice,
  onOpenAdmin
}) => {
  const TELEGRAM_LINK = "https://t.me/unityearning12";
  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 0, seconds: 0 });
  const [clickedActive, setClickedActive] = useState(false);
  const [celebratingOffer, setCelebratingOffer] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, e?: React.MouseEvent) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(text);
    triggerSuccessFeedback({ x: 0.5, y: 0.65 });
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleTelegramClick = (e: React.MouseEvent) => {
    setClickedActive(true);
    triggerSuccessFeedback({ x: 0.5, y: 0.5 });
    setTimeout(() => setClickedActive(false), 2000);
  };

  const handlePriceClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBigOfferCelebration({ x, y });
    setCelebratingOffer(true);
    setTimeout(() => setCelebratingOffer(false), 3000);
  };

  const coursesList = [
    { name: '📝 ফর্ম ফিলআপ', id: 'form-filling' },
    { name: '⌨️ ডাটা এন্ট্রি', id: 'data-entry' },
    { name: '📄 টাইপিং জব', id: 'typing-job' },
    { name: '🛍️ প্রোডাক্ট সেলিং', id: 'product-selling' },
    { name: '📧 ইমেইল মার্কেটিং', id: 'email-marketing' },
    { name: '🖼️ ফটো এডিটিং', id: 'photo-editing' },
    { name: '📶 সিম অফার সেলিং', id: 'sim-offer-selling' },
    { name: '📈 ডিজিটাল মার্কেটিং', id: 'digital-marketing' },
    { name: '🎨 গ্রাফিক ডিজাইন', id: 'graphic-design' },
    { name: '🎬 ভিডিও এডিটিং', id: 'video-editing' },
    { name: '✍️ কন্টেন্ট রাইটিং', id: 'content-writing' },
    { name: '📱 সোশ্যাল মিডিয়া ম্যানেজমেন্ট', id: 'social-media-management' }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-10 px-4 font-['Hind_Siliguri']">
      
      {/* Neumorphic Hero / Offer Container */}
      <div className="w-full max-w-[460px] neu-flat rounded-3xl sm:rounded-[32px] p-6 sm:p-8 border border-slate-300/70 relative transition-all duration-300">

        {/* Top Offer Badge & Countdown */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50/90 px-3 py-1 rounded-full border border-rose-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-rose-600 shrink-0 animate-pulse" />
            <span>অফার শেষ হতে: <strong className="font-mono text-rose-800">{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</strong></span>
          </div>

          <button
            onClick={handlePriceClick}
            className="bg-emerald-100/90 hover:bg-emerald-200 text-emerald-800 font-extrabold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300/80 shadow-2xs cursor-pointer active:scale-95 transition-all"
            title="ক্লিক করে বাজি ও পার্টি ইফেক্ট দেখুন!"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> ৫৫% ছাড়
          </button>
        </div>

        {/* Brand Header */}
        <div className="mb-5 text-center">
          <div className="inline-block mb-1">
            <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-slate-900 uppercase">
              UNITY <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">EARNING</span>
            </h1>
          </div>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-700 font-['Outfit'] mb-1">
            E-Learning Platform
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            আইটি স্কিল শিখুন, প্রফেশনাল ক্যারিয়ার গড়ুন ও ঘরে বসে ইনকাম করুন
          </p>
        </div>

        {/* Interactive Pricing Tier Box */}
        <div 
          onClick={handlePriceClick}
          className={`my-5 rounded-3xl bg-gradient-to-b from-white/95 via-[#EEF4FB]/90 to-white/95 p-5 sm:p-6 relative overflow-hidden border transition-all duration-300 cursor-pointer select-none group shadow-sm ${
            celebratingOffer 
              ? 'border-indigo-400 ring-4 ring-indigo-200/60 shadow-lg scale-[1.01]' 
              : 'border-indigo-100/90 hover:border-indigo-300 hover:shadow-md'
          }`}
          title="ক্লিক করুন এবং বিগ অফার বাজি সেলিব্রেশন উপভোগ করুন!"
        >
          {/* Subtle Celebration Badge */}
          {celebratingOffer && (
            <div className="absolute top-2 right-3 z-20 animate-bounce bg-gradient-to-r from-amber-500 to-pink-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <PartyPopper className="w-3 h-3" />
              <span>ধামাকা বিগ অফার! 🎉</span>
            </div>
          )}

          <div className="flex flex-col items-center text-center relative z-10">
            
            {/* Big Offer / Warranty Tag */}
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 text-indigo-900 text-[11px] font-extrabold px-3.5 py-1 rounded-full mb-2.5 border border-indigo-200/90 shadow-2xs group-hover:scale-105 transition-transform">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
              <span>🔥 বিগ ধামাকা অফার (ক্লিক করুন 🎉)</span>
            </div>

            {/* Original Strikethrough Regular Price: 1100 TK */}
            <div className="text-slate-500 text-xs font-semibold mb-1 flex items-center justify-center gap-2">
              <span>রেগুলার ফি:</span>
              <span className="text-rose-600 line-through decoration-rose-600 decoration-[2.5px] font-bold text-sm bg-rose-50/90 px-3 py-0.5 rounded-lg border border-rose-200/80 shadow-2xs">
                ৳ ১,১০০
              </span>
            </div>

            {/* Large Sale Price - Solid, Stable, Poetic & Refined Color */}
            <div className="min-h-[58px] flex items-baseline justify-center gap-1 my-1 select-none">
              <span className="text-5xl sm:text-6xl leading-none font-black text-slate-900 tracking-tight">
                {currentPrice}
              </span>
              <span className="text-3xl font-black text-indigo-600 font-sans">৳</span>
            </div>

            {/* Lifetime Access Pill */}
            <div className="text-[11px] text-slate-700 font-bold my-1.5 px-3.5 py-1 bg-white/95 rounded-full border border-slate-200 shadow-2xs">
              লাইফটাইম এক্সেস ও মেম্বারশিপ
            </div>

            <div className="w-full h-px bg-slate-200/90 my-2.5" />

            {/* Trust Badges: Instant Cashback Verified */}
            <div className="w-full flex flex-col gap-2">
              <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 text-emerald-900 rounded-2xl p-2.5 flex items-center justify-center gap-2 border border-emerald-200 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-black text-emerald-800 tracking-wide">
                  ৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক নিশ্চিত!
                </span>
              </div>

              <div className="text-[11px] text-slate-600 font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>৳100+ Instant Cashback Verified!</span>
              </div>
            </div>

          </div>
        </div>

        {/* Primary CTA: "আইডি এক্টিভ করুন" - Enhanced Vibrant Soft UI */}
        <div className="space-y-2.5 mb-4">
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTelegramClick}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md ${
              clickedActive
                ? 'neu-btn-emerald'
                : 'neu-btn-primary'
            }`}
          >
            {clickedActive ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white animate-bounce shrink-0" />
                <span>টেলিগ্রামে নিয়ে যাওয়া হচ্ছে...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 fill-white shrink-0" />
                <span>আইডি এক্টিভ করুন (টেলিগ্রাম) →</span>
              </>
            )}
          </a>

          {/* Alternative Quick Action Buttons: WhatsApp & Payment Form */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={WHATSAPP_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn-emerald py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-center text-white"
            >
              <WhatsAppIcon size={16} className="w-4 h-4 text-white shrink-0" />
              <span>হোয়াটসঅ্যাপ চ্যানেল</span>
            </a>

            <button
              type="button"
              onClick={() => {
                triggerSuccessFeedback({ x: 0.5, y: 0.5 });
                onOpenActivation();
              }}
              className="neu-btn py-2.5 px-3 rounded-xl text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center justify-center gap-1.5 border border-white/80 cursor-pointer text-center bg-white/70"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>পেমেন্ট ফর্ম</span>
            </button>
          </div>
        </div>

        {/* Telegram Direct Handle */}
        <div className="text-center text-xs text-slate-600 mb-4 flex items-center justify-center gap-1.5">
          <span>সরাসরি মেসেজ দিন:</span>
          <a 
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-bold neu-flat-xs px-2.5 py-0.5 rounded-lg border border-white hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Send className="w-3 h-3 text-blue-600" />
            <span>@unityearning12</span>
          </a>
        </div>

        {/* Quick Payment Number Copy Boxes - Fixed Layout & Brand Accents */}
        <div className="neu-inset p-3 rounded-2xl border border-white/80 flex flex-col gap-2 mb-5">
          
          {/* bKash Payment Row */}
          <div className="bg-white/80 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 shadow-xs border border-pink-100">
            <div className="flex items-center gap-2 min-w-0">
              <span className="bg-pink-600 text-white font-bold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md shrink-0">
                বিকাশ
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-500 font-medium leading-none mb-0.5">পার্সোনাল নম্বর</span>
                <span className="text-slate-900 font-mono font-bold text-xs sm:text-[13px] tracking-wide truncate">
                  01723046648
                </span>
              </div>
            </div>

            <button
              onClick={(e) => handleCopy('01723046648', e)}
              className={`text-[11px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                copiedNumber === '01723046648'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 active:scale-95'
              }`}
            >
              {copiedNumber === '01723046648' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  <span>কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pink-600" />
                  <span>কপি</span>
                </>
              )}
            </button>
          </div>

          {/* Nagad & Upay Payment Row */}
          <div className="bg-white/80 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 shadow-xs border border-orange-100">
            <div className="flex items-center gap-2 min-w-0">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md shrink-0">
                নগদ / উপায়
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-500 font-medium leading-none mb-0.5">পার্সোনাল নম্বর</span>
                <span className="text-slate-900 font-mono font-bold text-xs sm:text-[13px] tracking-wide truncate">
                  01339786909
                </span>
              </div>
            </div>

            <button
              onClick={(e) => handleCopy('01339786909', e)}
              className={`text-[11px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                copiedNumber === '01339786909'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 active:scale-95'
              }`}
            >
              {copiedNumber === '01339786909' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  <span>কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-orange-600" />
                  <span>কপি</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center font-medium pt-0.5">
            💡 "Send Money" করে ট্রানজেকশন আইডি সাথে রাখুন
          </p>
        </div>

        {/* 12 Courses Grid Section */}
        <div className="pt-3 border-t border-slate-300/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>মেম্বারশিপে অন্তর্ভুক্ত ১২+ কোর্স:</span>
            </span>
            <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
              সকল কোর্স অন্তর্ভুক্ত
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {coursesList.map((course) => (
              <button
                key={course.id}
                onClick={() => onSelectCourse && onSelectCourse(course.id)}
                className="bg-white/70 hover:bg-white text-left p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-700 transition-all flex items-center justify-between border border-slate-200/70 hover:border-indigo-300 hover:shadow-xs group cursor-pointer"
              >
                <span className="truncate">{course.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Income Calculator Quick Launch */}
        {onOpenCalculator && (
          <div className="mt-4 pt-3 border-t border-slate-200/80 text-center">
            <button
              onClick={onOpenCalculator}
              className="w-full neu-btn py-2 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center justify-center gap-1.5 transition-all border border-white cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>দৈনিক সম্ভাব্য আয় ক্যালকুলেট করুন</span>
            </button>
          </div>
        )}

        {/* Hidden Admin Entry Icon */}
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors p-1"
            title="অ্যাডমিন প্যানেল"
          >
            ⚙️
          </button>
        </div>

      </div>
    </div>
  );
};
