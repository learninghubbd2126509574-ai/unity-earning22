import React, { useState, useEffect } from 'react';
import { Check, MessageCircle, Sparkles, Copy, ArrowRight, ShieldCheck, Clock, Zap, Calculator, Lock } from 'lucide-react';

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
  const WHATSAPP_LINK = "https://wa.me/8801600602084?text=%E0%A6%86%E0%A6%AE%E0%A6%BF%20Unity%20Earning%20%E0%A6%8F%20%E0%A6%AF%E0%A7%81%E0%A6%95%E0%A7%8D%E0%A6%A4%20%E0%A6%B9%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A6%A4%E0%A7%87%E0%A6%9B%E0%A6%B8%E0%A6%BF%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%8D%E0%A4%A";

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(text);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const coursesList = [
    { name: '📝 ফর্ম ফিলআপ', id: 'form-filling' },
    { name: '⌨️ ডাটা এন্ট্রি', id: 'data-entry' },
    { name: '📄 টাইপিং জব', id: 'typing-job' },
    { name: '🛍️ প্রোডাক্ট সেলিং', id: 'product-selling' },
    { name: '📧 ইমেইল মার্কেটিং', id: 'email-marketing' },
    { name: '📱 ডিজিটাল মার্কেটিং', id: 'digital-marketing' },
    { name: '🖼️ ফটো এডিটিং', id: 'photo-editing' },
    { name: '🎬 ভিডিও এডিটিং', id: 'video-editing' },
    { name: '📶 সিম অফার সেলিং', id: 'sim-offer-selling' }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-3 min-h-[calc(100vh-60px)]">
      {/* Compact Card Container */}
      <div className="w-full max-w-[420px] bg-[#0c0a18] rounded-3xl border border-white/5 shadow-2xl overflow-hidden p-6 sm:p-8 transition-all relative">

        {/* Top Offer Badge & Countdown */}
        <div className="flex items-center justify-between gap-2 mb-3.5 relative">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>অফার শেষ হতে: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>

          <span className="bg-amber-400 text-black font-extrabold text-[11px] px-2.5 py-1 rounded-xl shadow-sm shrink-0">
            স্পেশাল অফার • ৫৫% ছাড়
          </span>
        </div>

        {/* Brand Header */}
        <div className="mb-4 relative">
          <div className="text-2xl font-black text-white flex items-center gap-1.5 tracking-tight">
            <span>✨</span> Unity <span className="text-indigo-400">Earning</span>
          </div>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
            E-learning Platform - আইটি স্কিল শিখুন, ভবিষ্যৎ গড়ুন।
          </p>
        </div>

        {/* Highlighted Pricing Area */}
        <div className="my-7 -mx-4 sm:-mx-6 border-y border-amber-500/50 bg-gradient-to-br from-amber-500/15 via-[#1a1333] to-indigo-900/30 relative overflow-hidden shadow-2xl shadow-amber-500/10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
          
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[12px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-amber-500/20 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                শুধুমাত্র আজকের জন্য
              </span>
              <div className="text-right flex flex-col items-end">
                <span className="text-[11px] text-gray-400 font-bold mb-0.5 uppercase tracking-wide">রেগুলার প্রাইস:</span>
                <span className="text-base text-red-400 line-through decoration-red-500/70 decoration-2 font-black">১১০০ টাকা</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 drop-shadow-sm">{currentPrice}</span>
                <div className="flex flex-col">
                  <span className="text-lg text-amber-100 font-bold leading-none mb-1">টাকা</span>
                  <span className="text-[11px] bg-white/10 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-white/20">লাইফ টাইম</span>
                </div>
              </div>
            </div>
            
            {/* Cashback Banner Box */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2.5 shadow-inner">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>🎁 ৩০০ টাকা ইনস্ট্যান্ট ক্যাশব্যাক নিশ্চিত!</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
        >
          <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
          <span>আইডি এক্টিভ করুন →</span>
        </a>

        {/* Modal activation alternative */}
        <div className="flex items-center justify-between gap-2 mt-2.5 mb-2 text-[11px] text-gray-400">
          <span>একউন্ট এক্টিভ করতে হোয়াটসঅ্যাপে মেসেজ দিন</span>
          <button
            onClick={onOpenActivation}
            className="text-indigo-400 hover:text-indigo-300 underline font-semibold flex items-center gap-0.5 cursor-pointer"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>আইডি ভেরিফাই</span>
          </button>
        </div>

        {/* Quick Payment Number Copy Box */}
        <div className="bg-[#1a1533] p-2.5 rounded-lg border border-white/5 flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px]">
              <span className="text-gray-400">বিকাশ পার্সোনাল: </span>
              <strong className="text-amber-300 font-mono text-xs">01723046648</strong>
            </div>
            <button
              onClick={() => handleCopy('01723046648')}
              className="bg-white/10 hover:bg-white/20 text-white text-[10px] px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3 h-3 text-indigo-300" />
              <span>{copiedNumber === '01723046648' ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[11px]">
              <span className="text-gray-400">নগদ/উপায় পার্সোনাল: </span>
              <strong className="text-amber-300 font-mono text-xs">01339786909</strong>
            </div>
            <button
              onClick={() => handleCopy('01339786909')}
              className="bg-white/10 hover:bg-white/20 text-white text-[10px] px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3 h-3 text-indigo-300" />
              <span>{copiedNumber === '01339786909' ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
            </button>
          </div>
        </div>

        <div className="h-px bg-white/10 my-4" />

        {/* Features List Section */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            বিশেষ সুবিধাসমূহ:
          </div>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2 text-gray-200">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
              <span>১টি এক্টিভ একাউন্ট আইডি</span>
            </li>
            <li className="flex items-center gap-2 text-gray-200">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
              <span>প্রতিদিনের পেমেন্ট প্রতিদিন পাওয়ার সুযোগ (বিকাশ/নগদ)</span>
            </li>
            <li className="flex items-center gap-2 text-gray-200">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
              <span>টিম লিডার, ট্রেইনার ও কাউন্সিলর গাইডলাইন</span>
            </li>
            <li className="flex items-center gap-2 text-gray-200">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
              <span>২৪/৭ লাইভ কাস্টমার ও মেন্টর সাপোর্ট</span>
            </li>
          </ul>
        </div>

        <div className="h-px bg-white/10 my-4" />

        {/* Available Courses & Work Tag Pills */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              উপলব্ধ কোর্স ও কাজসমূহ:
            </div>
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <Calculator className="w-3 h-3" />
                <span>আয় হিসাব</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {coursesList.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCourse && onSelectCourse(c.id)}
                className="bg-white/5 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-200 border border-white/5 hover:border-indigo-500/40 px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Why Choose Section Box */}
        <div className="bg-[#1a1533] p-3.5 rounded-xl border border-white/10 mt-4">
          <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>কেন এই মেম্বারশিপ?</span>
          </div>
          <p className="text-[11.5px] text-gray-300 leading-relaxed">
            আমাদের প্ল্যাটফর্মে আপনি আইটি স্কিল শিখবেন এবং সাথে সাথে কাজ করে দৈনিক আয় করার সুযোগ পাবেন। বিস্তারিত জানতে সরাসরি{' '}
            <a
              href="https://wa.me/8801600602084"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-semibold"
            >
              WhatsApp এ যোগাযোগ করুন
            </a>।
          </p>
        </div>

        {/* Bottom Quick Action Bar */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-gray-400">সহজ এক্টিভেশন প্রক্রিয়া</span>
          <button
            onClick={onOpenActivation}
            className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 group"
          >
            <span>পেমেন্ট সাবমিট করুন</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
