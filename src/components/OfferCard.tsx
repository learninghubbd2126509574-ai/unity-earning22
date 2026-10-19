import React, { useState } from 'react';
import {
  Check,
  Send,
  Sparkles,
  Copy,
  ArrowRight,
  ShieldCheck,
  Clock,
  Zap,
  Calculator,
  CheckCircle2,
  Users,
  Calendar,
  Smartphone,
  Headphones,
  Play,
  RefreshCw,
  Award,
  Flame,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { triggerSuccessFeedback, triggerBigOfferCelebration } from '../utils/confettiFeedback';
import { getTodayBengaliDate } from '../utils/dateUtils';
import { useOfferCountdown } from '../utils/timerUtils';
import { MotionReveal } from './MotionReveal';
import {
  DEFAULT_VIDEO_URL,
  DEFAULT_NAGAD_NUMBER,
  DEFAULT_UPAY_NUMBER,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
} from '../utils/pricing';

interface OfferCardProps {
  onOpenActivation: () => void;
  onSelectCourse?: (courseId: string) => void;
  onOpenCalculator?: () => void;
  currentPrice: number;
  availableSeats: number;
  onOpenAdmin: () => void;
  videoUrl?: string;
  nagadNumber?: string;
  upayNumber?: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  onOpenActivation,
  onSelectCourse,
  onOpenCalculator,
  currentPrice,
  availableSeats,
  onOpenAdmin,
  videoUrl = DEFAULT_VIDEO_URL,
  nagadNumber = DEFAULT_NAGAD_NUMBER,
  upayNumber = DEFAULT_UPAY_NUMBER,
}) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [clickedActive, setClickedActive] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const todayDate = getTodayBengaliDate();
  const countdown = useOfferCountdown();

  const embedUrl = getYouTubeEmbedUrl(videoUrl, true);
  const videoThumbnail = getYouTubeThumbnailUrl(videoUrl);

  const TELEGRAM_LINK = 'https://t.me/unityearning12';
  const WHATSAPP_CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p';

  const handleCopy = (num: string, e: React.MouseEvent) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerSuccessFeedback({ x, y });
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleAccountActiveClick = () => {
    triggerSuccessFeedback({ x: 0.5, y: 0.4 });
    const paymentEl = document.getElementById('payment-section');
    const numbersCard = document.getElementById('payment-numbers-card');
    if (paymentEl) {
      paymentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const target = numbersCard || paymentEl;
      target.classList.add('ring-4', 'ring-[#315CF5]', 'shadow-2xl');
      setTimeout(() => {
        target.classList.remove('ring-4', 'ring-[#315CF5]', 'shadow-2xl');
      }, 3000);
    } else {
      onOpenActivation();
    }
  };

  const coursesList = [
    { name: 'ফর্ম ফিলআপ', id: 'form-filling', icon: '📝' },
    { name: 'ডাটা এন্ট্রি', id: 'data-entry', icon: '⌨️' },
    { name: 'টাইপিং জব', id: 'typing-job', icon: '📄' },
    { name: 'প্রোডাক্ট সেলিং', id: 'product-selling', icon: '🛍️' },
    { name: 'ইমেইল মার্কেটিং', id: 'email-marketing', icon: '📧' },
    { name: 'ফটো এডিটিং', id: 'photo-editing', icon: '🖼️' },
    { name: 'সিম অফার সেলিং', id: 'sim-offer-selling', icon: '📶' },
    { name: 'ডিজিটাল মার্কেটিং', id: 'digital-marketing', icon: '📈' },
    { name: 'গ্রাফিক ডিজাইন', id: 'graphic-design', icon: '🎨' },
    { name: 'ভিডিও এডিটিং', id: 'video-editing', icon: '🎬' },
    { name: 'কন্টেন্ট রাইটিং', id: 'content-writing', icon: '✍️' },
    { name: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট', id: 'social-media-management', icon: '📱' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 font-['Hind_Siliguri']">
      
      {/* Hero Header Area */}
      <MotionReveal distance={16} className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-black uppercase tracking-wider text-[#315CF5] bg-[#EEF3FF] px-2.5 py-0.5 rounded-md border border-[#D0DCFD]">
            UNITY EARNING OFFICIAL
          </span>
          <span className="text-[#E4E7EC]">·</span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold text-[#667085]">
            E-Learning & Freelancing Platform
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#101828] tracking-tight leading-snug">
          আইটি স্কিল শিখুন, নিশ্চিত ক্যারিয়ার ও নিয়মিত আয়ের সুযোগ তৈরি করুন
        </h1>

        <p className="text-xs sm:text-base text-[#667085] mt-2 max-w-2xl mx-auto font-normal leading-relaxed">
          একটি মাত্র মেম্বারশিপে ১২+ প্র্যাক্টিক্যাল কোর্স, আজীবন আনলিমিটেড অ্যাক্সেস, পার্সোনাল মেন্টর সাপোর্ট এবং প্রথম দিন থেকেই মোবাইল দিয়ে আয় করার পরিপূর্ণ গাইডলাইন।
        </p>
      </MotionReveal>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN (lg:col-span-7): Pricing, Offer Status, CTAs & Payment */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Offer Pricing Card */}
          <MotionReveal distance={20} className="card-premium p-5 sm:p-8 bg-white border border-[#E4E7EC] rounded-2xl relative shadow-md">
            
            {/* 1. Highlighted 55% Discount Offer Badge at the Top (উপরে হাইলাইট হওয়া ৫৫% ডিসকাউন্ট ব্যাজ) */}
            <div className="mb-5 bg-gradient-to-r from-emerald-600 via-[#315CF5] to-emerald-600 p-0.5 rounded-2xl shadow-md">
              <div className="bg-white rounded-[14px] py-2 px-3.5 sm:px-5 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#101828]">
                    আজকের স্পেশাল ধামাকা অফার
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-xs sm:text-sm font-black px-3 py-1 rounded-xl shadow-xs animate-pulse">
                  <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
                  <span>৫৫% স্পেশাল ছাড় সচল!</span>
                </div>
              </div>
            </div>

            {/* 2. Simple & Clean Countdown Timer */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-[#101828] via-[#1E293B] to-[#101828] border border-slate-800 rounded-2xl text-white shadow-lg my-4">
              <div className="flex items-center gap-2 mb-3 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-xs sm:text-sm">
                  টাইম শেষ হতে বাকি
                </span>
              </div>

              {/* 3 Digital Clock Cards */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 rounded-xl shadow-inner">
                  <div className="font-mono tabular-nums font-black text-2xl sm:text-3xl text-white tracking-wider">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-bold mt-1">ঘণ্টা</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 rounded-xl shadow-inner">
                  <div className="font-mono tabular-nums font-black text-2xl sm:text-3xl text-white tracking-wider">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-bold mt-1">মিনিট</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 rounded-xl shadow-inner">
                  <div className="font-mono tabular-nums font-black text-2xl sm:text-3xl text-amber-300 tracking-wider">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-amber-300 font-bold mt-1">সেকেন্ড</div>
                </div>
              </div>
            </div>

            {/* 3. Clean & Premium Admission Fee Showcase (No clutter, No messy stacked badges) */}
            <div className="my-6 relative">
              {/* Subtle ambient radiant glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-emerald-500/5 rounded-3xl blur-xl pointer-events-none" />

              <div className="relative text-center py-5 sm:py-6 px-4 rounded-3xl bg-gradient-to-b from-white via-[#F8FAFC] to-white border border-[#E4E7EC]/90 shadow-[0_4px_20px_-4px_rgba(16,24,40,0.06)]">
                {/* Micro Subheading */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3FF] border border-[#315CF5]/20 text-[#315CF5] text-xs font-black mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#315CF5]" />
                  <span>এডমিশন ফি</span>
                </div>

                {/* Strikethrough Regular Price in Red & Savings Badge */}
                <div className="flex items-center justify-center gap-2.5 mb-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-semibold text-[#667085]">
                    রেগুলার ফি:
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-red-600 line-through decoration-red-500 decoration-2 font-mono tabular-nums">
                    ৳১,১০০
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-white bg-gradient-to-r from-rose-600 to-rose-500 px-2.5 py-0.5 rounded-full shadow-xs">
                    <span>৫৫% ছাড়</span>
                  </span>
                </div>

                {/* Hero Numeric Price Presentation */}
                <div className="flex items-baseline justify-center gap-1 sm:gap-2 my-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#315CF5] leading-none select-none">
                    ৳
                  </span>
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-[#101828] leading-none select-none tabular-nums">
                    {currentPrice}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#667085] ml-1">
                    টাকা
                  </span>
                </div>

                {/* Instant 300 Taka Cashback Badge */}
                <div className="mt-2.5 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-black shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>ইনস্ট্যান্ট ৩০০ টাকা ক্যাশব্যাক</span>
                  </span>
                </div>

                {/* Clean Single Line for Seat Count - Zero Jumble */}
                <div className="mt-2.5 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-bold">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span>সিট সংখ্যা বাকি: <strong className="font-mono text-amber-950 font-black">{availableSeats}</strong> টি</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Single Prominent Action Button: একাউন্ট একটিভ করুন */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleAccountActiveClick}
                className="btn-primary w-full h-12 sm:h-13 text-sm sm:text-base font-black cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>একাউন্ট একটিভ করুন</span>
              </button>
            </div>

          </MotionReveal>

          {/* Payment Instructions & Numbers Section */}
          <div id="payment-section" className="scroll-mt-20">
            <MotionReveal distance={20} className="card-premium p-6 sm:p-7 bg-white border border-[#E4E7EC] rounded-2xl transition-all duration-300">
              
              {/* Payment Numbers Card - Prominently Displayed at Top */}
              <div id="payment-numbers-card" className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#EEF3FF] via-white to-[#F0FDF4] border-2 border-[#315CF5]/30 mb-6 shadow-sm transition-all duration-500">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#315CF5]/15 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#315CF5] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#315CF5]"></span>
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#101828]">
                      পেমেন্ট নম্বর (Send Money)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#079669] bg-[#079669]/10 px-2.5 py-1 rounded-full border border-[#079669]/20 font-mono">
                    অ্যাডমিশন ফি: ৳{currentPrice}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#667085] mb-3 font-medium">
                  নিচের যেকোনো নম্বরে <strong className="text-[#101828]">Send Money</strong> করুন এবং নম্বরটি কপি করে নিন:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Nagad Card */}
                  <div className="p-3.5 rounded-xl border-2 border-orange-200 bg-white shadow-xs flex items-center justify-between hover:border-orange-400 transition-colors">
                    <div>
                      <span className="text-[11px] font-black text-[#EA580C] uppercase tracking-wider block">
                        নগদ (পার্সোনাল)
                      </span>
                      <span className="font-mono tabular-nums font-black text-base sm:text-lg text-[#101828]">
                        {nagadNumber}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(nagadNumber, e)}
                      className="btn-secondary h-9 px-3 text-xs font-bold cursor-pointer hover:bg-orange-50 hover:border-orange-300"
                    >
                      {copiedNumber === nagadNumber ? (
                        <>
                          <Check className="w-4 h-4 text-[#079669]" />
                          <span className="text-[#079669] font-black">কপি হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#667085]" />
                          <span>কপি</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Upay Card */}
                  <div className="p-3.5 rounded-xl border-2 border-blue-200 bg-white shadow-xs flex items-center justify-between hover:border-blue-400 transition-colors">
                    <div>
                      <span className="text-[11px] font-black text-[#315CF5] uppercase tracking-wider block">
                        উপায় (পার্সোনাল)
                      </span>
                      <span className="font-mono tabular-nums font-black text-base sm:text-lg text-[#101828]">
                        {upayNumber}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(upayNumber, e)}
                      className="btn-secondary h-9 px-3 text-xs font-bold cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                    >
                      {copiedNumber === upayNumber ? (
                        <>
                          <Check className="w-4 h-4 text-[#079669]" />
                          <span className="text-[#079669] font-black">কপি হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#667085]" />
                          <span>কপি</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-[#667085]">
                    টাকা পাঠানোর পর নিচের বাটনে ক্লিক করে ট্রানজেকশন তথ্য জমা দিন:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      triggerSuccessFeedback({ x: 0.5, y: 0.5 });
                      onOpenActivation();
                    }}
                    className="btn-primary w-full sm:w-auto h-10 px-5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
                  >
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>পেমেন্ট তথ্য সাবমিট করুন</span>
                  </button>
                </div>
              </div>

              {/* Video Instruction Section (below the numbers) */}
              <div className="pt-2 border-t border-[#E4E7EC]">
                <div className="flex items-center justify-between pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                    <h3 className="text-base sm:text-lg font-bold text-[#101828]">
                      বিকাশ পেমেন্ট নির্দেশিকা
                    </h3>
                  </div>
                  <span className="text-xs text-[#667085]">
                    ভিডিও টিউটোরিয়াল
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#667085] mb-4">
                  বিকাশের মাধ্যমে কীভাবে সহজেই কোর্স ফি পরিশোধ করবেন এবং ভর্তি সম্পন্ন করবেন তা ধাপে ধাপে দেখতে নিচের ভিডিও নির্দেশিকাটি অনুসরণ করুন।
                </p>

                {/* Video Container (16:9 Aspect Ratio) */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#101828] border border-[#E4E7EC] relative group mb-4">
                  {isPlayingVideo ? (
                    <iframe
                      src={embedUrl}
                      title="বিকাশ পেমেন্ট নির্দেশিকা"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div
                      onClick={() => setIsPlayingVideo(true)}
                      className="w-full h-full cursor-pointer relative flex items-center justify-center select-none"
                    >
                      {videoThumbnail ? (
                        <img
                          src={videoThumbnail}
                          alt="বিকাশ পেমেন্ট ভিডিও নির্দেশিকা"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#101828]" />
                      )}
                      <div className="absolute inset-0 bg-[#101828]/40 group-hover:bg-[#101828]/25 transition-colors flex flex-col items-center justify-center p-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#315CF5] group-hover:bg-[#254EDB] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-108 mb-2">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                        <span className="text-white font-bold text-xs sm:text-sm">
                          ভিডিও দেখুন
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {isPlayingVideo && (
                  <div className="flex justify-end mb-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo(false)}
                      className="text-xs font-semibold text-[#667085] hover:text-[#101828] flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>ভিডিও মিনিমাইজ করুন</span>
                    </button>
                  </div>
                )}
              </div>

          </MotionReveal>
        </div>

        </div>

        {/* RIGHT COLUMN (lg:col-span-5): 12 Courses Bento Grid & Platform Highlights */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 12 Courses Bento Box */}
          <MotionReveal distance={20} className="card-premium p-6 sm:p-7 bg-white border border-[#E4E7EC] rounded-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E4E7EC]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#315CF5] shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-[#101828]">
                  মেম্বারশিপে অন্তর্ভুক্ত ১২+ কোর্স:
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#315CF5] bg-[#EEF3FF] px-2.5 py-0.5 rounded-md">
                এক ফি-তেই সব
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {coursesList.map((course) => (
                <button
                  key={course.id}
                  onClick={() => onSelectCourse && onSelectCourse(course.id)}
                  className="p-2.5 rounded-xl border border-[#E4E7EC] hover:border-[#315CF5] hover:bg-[#EEF3FF]/40 transition-all text-left flex items-center justify-between text-xs font-semibold text-[#101828] group cursor-pointer"
                >
                  <span className="truncate">
                    <span className="mr-1.5">{course.icon}</span>
                    {course.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#315CF5] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </MotionReveal>

          {/* Membership Benefits Card */}
          <MotionReveal distance={20} className="card-premium p-6 sm:p-7 bg-white border border-[#E4E7EC] rounded-2xl space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7EC]">
              <Award className="w-4 h-4 text-[#315CF5]" />
              <h3 className="text-sm sm:text-base font-bold text-[#101828]">
                প্ল্যাটফর্ম মেম্বারশিপের সুবিধাসমূহ
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-[13px] text-[#667085]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#079669] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#101828]">লাইফটাইম মেম্বারশিপ:</strong> একবার ফি দিয়ে আজীবন সব কোর্সের অ্যাক্সেস ও ফ্রি আপডেট।
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Headphones className="w-4 h-4 text-[#315CF5] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#101828]">ডেডিকেটেড মেন্টর সাপোর্ট:</strong> কাজ করতে যেকোনো সমস্যায় সরাসরি অভিজ্ঞ মেন্টরের সাহায্য।
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-[#315CF5] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#101828]">মোবাইল ফ্রেন্ডলি কাজ:</strong> কম্পিউটার না থাকলেও শুধু স্মার্টফোন দিয়ে সব কাজ করা সম্ভব।
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#079669] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#101828]">দৈনিক ক্যাশআউট:</strong> উপার্জিত টাকা প্রতিদিন নিজের বিকাশ বা নগদ অ্যাকাউন্টে উত্তোলন করুন।
                </span>
              </div>
            </div>

            {/* Income Calculator Quick Action */}
            {onOpenCalculator && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="btn-secondary w-full h-11 text-xs sm:text-sm cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#315CF5]" />
                  <span>দৈনিক সম্ভাব্য আয় ক্যালকুলেট করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </MotionReveal>

          {/* Quiet Admin Access Link */}
          <div className="flex justify-end pr-1">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[11px] text-[#667085] hover:text-[#101828] transition-colors cursor-pointer"
              title="অ্যাডমিন প্যানেল"
            >
              Admin Settings
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
