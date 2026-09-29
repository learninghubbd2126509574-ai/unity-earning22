import React, { useState, useEffect } from 'react';
import { Check, Send, Sparkles, Copy, ArrowRight, ShieldCheck, Clock, Zap, Calculator, CheckCircle2, Award, PartyPopper, Flame, Users, Calendar, Smartphone, Headphones } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { triggerSuccessFeedback, triggerBigOfferCelebration } from '../utils/confettiFeedback';
import { getTodayBengaliDate } from '../utils/dateUtils';

interface OfferCardProps {
  onOpenActivation: () => void;
  onSelectCourse?: (courseId: string) => void;
  onOpenCalculator?: () => void;
  currentPrice: number;
  availableSeats: number;
  onOpenAdmin: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  onOpenActivation,
  onSelectCourse,
  onOpenCalculator,
  currentPrice,
  availableSeats,
  onOpenAdmin,
}) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [clickedActive, setClickedActive] = useState(false);
  const [celebratingOffer, setCelebratingOffer] = useState(false);
  const todayDate = getTodayBengaliDate();

  // Live real-time Countdown Timer (6 hours countdown as requested)
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 58,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TELEGRAM_LINK = "https://t.me/unityearning12";
  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";

  const handleCopy = (num: string, e: React.MouseEvent) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerSuccessFeedback({ x, y });
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleTelegramClick = (e: React.MouseEvent) => {
    setClickedActive(true);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBigOfferCelebration({ x, y });
    setTimeout(() => setClickedActive(false), 2500);
  };

  const handlePriceClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
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
    { name: '📱 সোশ্যাল মিডিয়া', id: 'social-media-management' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 font-['Hind_Siliguri']">
      
      {/* Full-Frame Modern App-Style Hero Dashboard Card */}
      <div className="w-full bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm relative transition-all duration-300">

        {/* Top Header Strip across the card: অফার শেষ হতে কতক্ষণ বাকি সবার উপরে এবং লাইভ অ্যাডমিশন নিচে */}
        <div className="pb-4 sm:pb-5 border-b border-slate-200/80">
          
          {/* ১. অফার শেষ হতে (সবার উপরে স্পষ্ট ও চিকন ফন্টে সম্পূর্ণ দৃশ্যমান) */}
          <div className="w-full flex items-center justify-between sm:justify-center gap-2 bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border border-rose-200/90 py-2 px-3 sm:px-5 rounded-2xl shadow-2xs mb-3 text-rose-900">
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock className="w-4 h-4 text-rose-600 shrink-0 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-rose-900 whitespace-nowrap">
                অফার শেষ হতে:
              </span>
            </div>
            
            {/* স্লিম ও চিকুন ডিজিটাল ক্লক টাইমার */}
            <div className="font-mono font-medium text-xs sm:text-sm text-rose-700 bg-white px-2.5 py-1 rounded-xl border border-rose-200/80 shadow-2xs shrink-0 flex items-center gap-1 tracking-wider">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-rose-400 font-light">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-rose-400 font-light">:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* ২. নিচে লাইভ অ্যাডমিশন চালু এবং ৫৫% স্পেশাল ছাড় পাশাপাশি - সম্পূর্ণ লেখা দৃশ্যমান */}
          <div className="flex items-center justify-between gap-2 w-full">
            {/* লাইভ অ্যাডমিশন চালু */}
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>লাইভ অ্যাডমিশন চালু</span>
            </div>

            {/* ৫৫% স্পেশাল ছাড় বাটন (সম্পূর্ণ লেখা দৃশ্যমান, কোনো কাটছাঁট নেই) */}
            <button
              onClick={handlePriceClick}
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 rounded-full border border-emerald-300/80 shadow-2xs cursor-pointer active:scale-95 transition-all whitespace-nowrap shrink-0"
              title="ক্লিক করে স্পেশাল সেলিব্রেশন দেখুন!"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>৫৫% স্পেশাল ছাড়</span>
            </button>
          </div>

        </div>

        {/* Full-Frame Responsive 2-Column Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-5 sm:mt-6">
          
          {/* LEFT COLUMN (lg:col-span-7): Pricing, Offer, Buttons & Payments */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            {/* Brand Header (স্লিম ও সুষম ফ্রেম, সিঙ্গেল লাইন ব্র্যান্ড নাম ও ছোট সাবটাইটেল) */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Outfit'] tracking-tight text-slate-900 uppercase">
                  UNITY <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">EARNING</span>
                </h1>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-indigo-200">
                  OFFICIAL
                </span>
              </div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-['Outfit']">
                E-Learning & Freelancing Platform
              </div>
            </div>

            {/* Interactive Pricing Tier Box */}
            <div 
              onClick={handlePriceClick}
              className={`rounded-2xl bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 p-5 sm:p-6 relative overflow-hidden border transition-all duration-300 cursor-pointer select-none group shadow-2xs ${
                celebratingOffer 
                  ? 'border-indigo-400 ring-4 ring-indigo-200/60 shadow-md scale-[1.01]' 
                  : 'border-slate-200 hover:border-indigo-200 hover:shadow-xs'
              }`}
              title="ক্লিক করুন এবং বিগ অফার বাজি সেলিব্রেশন উপভোগ করুন!"
            >
              {/* Subtle Celebration Badge */}
              {celebratingOffer && (
                <div className="absolute top-3 right-3 z-20 animate-bounce bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <PartyPopper className="w-3.5 h-3.5" />
                  <span>ধামাকা বিগ অফার! 🎉</span>
                </div>
              )}

              <div className="flex flex-col items-center text-center relative z-10">
                
                {/* Stylish Royal Blue Tag: আজকের জন্য বিগ অফার */}
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white text-xs sm:text-[13px] font-semibold px-3.5 py-1 rounded-full mb-2 shadow-xs border border-blue-400/30 whitespace-nowrap tracking-wide group-hover:scale-105 transition-all">
                  <Sparkles className="w-3.5 h-3.5 text-blue-200 shrink-0 animate-pulse" />
                  <span>আজকের জন্য বিগ অফার</span>
                </div>

                {/* Strikethrough Regular Price in Red with English 1,100 */}
                <div className="text-rose-600 text-xs sm:text-sm font-bold mb-1 flex items-center justify-center gap-2">
                  <span className="text-rose-600 font-bold">রেগুলার ফি:</span>
                  <span className="text-rose-600 line-through decoration-rose-600 decoration-[2px] font-extrabold text-sm sm:text-base bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200/80">
                    1,100 ৳
                  </span>
                </div>

                {/* Eye-Catching Animated Sale Price with elegant, premium Royal Indigo-Blue color */}
                <div className="my-2 select-none flex items-center justify-center">
                  <div className="animate-price-pulse inline-flex items-baseline justify-center px-6 py-2 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-sky-50/90 border-2 border-indigo-300/80 shadow-xs hover:shadow-sm transition-all">
                    <span className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-800 bg-clip-text text-transparent drop-shadow-xs">
                      {currentPrice}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 ml-1.5 font-sans">৳</span>
                  </div>
                </div>

                {/* Lifetime Access Pill */}
                <div className="text-xs text-slate-600 font-semibold my-1 px-3 py-1 bg-white rounded-full border border-slate-200/80 shadow-2xs">
                  লাইফটাইম এক্সেস ও প্রিমিয়াম মেম্বারশিপ
                </div>

                <div className="w-full h-px bg-slate-200/80 my-3" />

                {/* Amount এর নিচে ক্যাশব্যাক, ক্যাশব্যাকের নিচে এভেইলেবল সিট ও লাইভ তারিখ */}
                <div className="w-full flex flex-col gap-2">
                  
                  {/* ১. ৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক */}
                  <div className="w-full bg-emerald-500/10 rounded-xl p-3 flex items-center justify-center gap-2.5 border border-emerald-500/30 text-emerald-900">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-emerald-800">
                      ৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক নিশ্চিত!
                    </span>
                  </div>

                  {/* ২. ক্যাশব্যাকের নিচে এভেইলেবল সিট */}
                  <div className="w-full bg-amber-500/10 border border-amber-300/80 rounded-xl py-2 px-3.5 flex items-center justify-center gap-2 shadow-2xs">
                    <Users className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      Available Seats:
                    </span>
                    <span className="font-extrabold text-indigo-700 font-['Outfit'] text-sm sm:text-base">
                      {availableSeats}
                    </span>
                  </div>

                  {/* ৩. নিচে আজকের লাইভ তারিখ */}
                  <div className="w-full bg-slate-100/90 border border-slate-200 rounded-xl py-2 px-3.5 flex items-center justify-center gap-2 text-slate-700 shadow-2xs">
                    <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-600">আজকের তারিখ:</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{todayDate}</span>
                  </div>

                  <div className="text-[11px] text-slate-600 font-medium flex items-center justify-center gap-1.5 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>৳100+ Instant Cashback & 100% Verified Support!</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Primary Action Button (টেলিগ্রাম জয়েন) */}
            <div className="space-y-2.5">
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramClick}
                className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
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

              {/* Secondary Buttons: WhatsApp & Payment Form */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={WHATSAPP_CHANNEL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-btn-emerald py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer text-center text-white"
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
                  className="bg-slate-50 hover:bg-slate-100 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 flex items-center justify-center gap-2 border border-slate-200 cursor-pointer text-center transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>পেমেন্ট ফর্ম</span>
                </button>
              </div>

              {/* Telegram Direct Handle */}
              <div className="text-center text-xs text-slate-600 pt-1 flex items-center justify-center gap-1.5">
                <span>সরাসরি মেসেজ দিন:</span>
                <a 
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200/60 hover:text-blue-900 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3 h-3 text-blue-600" />
                  <span>@unityearning12</span>
                </a>
              </div>
            </div>

            {/* Quick Payment Number Copy Boxes */}
            <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-2.5">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>পেমেন্ট নম্বর (Send Money):</span>
                <span className="text-[11px] text-slate-500 font-normal">১-ক্লিকে কপি করুন</span>
              </div>

              {/* bKash Payment Row */}
              <div className="bg-white rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-2xs border border-pink-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="bg-pink-600 text-white font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-md shrink-0">
                    বিকাশ
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-500 font-normal leading-none mb-0.5">পার্সোনাল নম্বর</span>
                    <span className="text-slate-900 font-mono font-bold text-xs sm:text-sm tracking-wide truncate">
                      01723046648
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleCopy('01723046648', e)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    copiedNumber === '01723046648'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 active:scale-95'
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
              <div className="bg-white rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-2xs border border-orange-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-[11px] sm:text-xs px-2 py-1 rounded-md shrink-0">
                    নগদ / উপায়
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-500 font-normal leading-none mb-0.5">পার্সোনাল নম্বর</span>
                    <span className="text-slate-900 font-mono font-bold text-xs sm:text-sm tracking-wide truncate">
                      01339786909
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleCopy('01339786909', e)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    copiedNumber === '01339786909'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 active:scale-95'
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

              <p className="text-[11px] text-slate-500 text-center font-normal pt-0.5">
                💡 "Send Money" করে ট্রানজেকশন আইডি সাথে রাখুন ও ফর্মে জমা দিন
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN (lg:col-span-5): 12 Courses Grid, Features & Calculator */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 12 Courses Grid Header & Container */}
            <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>মেম্বারশিপে অন্তর্ভুক্ত ১২+ কোর্স:</span>
                </span>
                <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200/80">
                  সব কোর্স এক ফি-তে
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {coursesList.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => onSelectCourse && onSelectCourse(course.id)}
                    className="bg-white hover:bg-indigo-50/60 text-left p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-700 transition-all flex items-center justify-between border border-slate-200/80 hover:border-indigo-300 hover:shadow-2xs group cursor-pointer"
                  >
                    <span className="truncate">{course.name}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Highlights Box */}
            <div className="bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/60 rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-2xs space-y-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-indigo-950 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>প্ল্যাটফর্ম মেম্বারশিপ সুবিধা সমূহ:</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>লাইফটাইম মেম্বারশিপ:</strong> কোনো মাসিক বা বাৎসরিক ফি নেই।</span>
                </div>
                <div className="flex items-start gap-2">
                  <Headphones className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>ডেডিকেটেড মেন্টর সাপোর্ট:</strong> কাজ করতে যে কোনো সমস্যায় সরাসরি সমাধান।</span>
                </div>
                <div className="flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>মোবাইল ও পিসি ফ্রেন্ডলি:</strong> শুধু স্মার্টফোন দিয়েই সব কাজ সম্পন্ন করা যায়।</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>দৈনিক উত্তোলন:</strong> কাজের ইনকাম প্রতিদিন বিকাশ অথবা নগদে ক্যাশআউট।</span>
                </div>
              </div>
            </div>

            {/* Income Calculator Quick Launch */}
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="w-full bg-slate-50 hover:bg-white hover:border-indigo-300 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 flex items-center justify-center gap-2 transition-all border border-slate-200 cursor-pointer shadow-2xs group"
              >
                <Calculator className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>দৈনিক সম্ভাব্য আয় ক্যালকুলেট করুন →</span>
              </button>
            )}

            {/* Admin entry button */}
            <div className="flex justify-end pt-1">
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

      </div>

    </div>
  );
};
