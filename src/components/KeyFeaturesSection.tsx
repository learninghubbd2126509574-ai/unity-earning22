import React from 'react';
import { Award, Zap, Users, Smartphone, ShieldCheck, CheckCircle2, TrendingUp, Gift, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface KeyFeaturesSectionProps {
  onOpenActivation: () => void;
}

export function KeyFeaturesSection({ onOpenActivation }: KeyFeaturesSectionProps) {
  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";
  const TELEGRAM_LINK = "https://t.me/unityearning12";

  const features = [
    {
      icon: Award,
      title: 'লাইফটাইম মেম্বারশিপ',
      subtitle: 'Lifetime Unlimited Access',
      desc: 'একবার মেম্বারশিপ ফি দিয়ে সারাজীবন যেকোনো সময় সমস্ত কোর্স ও নতুন আপডেটেড ভিডিও অ্যাক্সেস করার পূর্ণ সুবিধা।',
      badge: 'আজীবন ফ্রি আপডেট',
      accentColor: 'text-blue-600',
      iconBg: 'neu-inset text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'শেখার সাথে নিশ্চিত আয়ের সুযোগ',
      subtitle: 'Learn + Earn Daily',
      desc: 'ডাটা এন্ট্রি, ফর্ম ফিলিং, কন্টেন্ট ও টাইপিং জব করে প্রথম দিন থেকেই মোবাইল দিয়ে টাকা আয় করার প্র্যাক্টিক্যাল সিস্টেম।',
      badge: 'দৈনিক আয়ের সুযোগ',
      accentColor: 'text-emerald-600',
      iconBg: 'neu-inset text-emerald-600'
    },
    {
      icon: Users,
      title: 'আকর্ষণীয় রেফারেল প্রোগ্রাম',
      subtitle: 'Referral Bonus & Rewards',
      desc: 'প্রতিটি সফল রেফারেলের জন্য ইনস্ট্যান্ট কমিশন এবং মাসিক টপ পারফর্মারদের জন্য এক্সক্লুসিভ ক্যাশ প্রাইজ ও গিফট।',
      badge: 'ইনস্ট্যান্ট কমিশন',
      accentColor: 'text-indigo-600',
      iconBg: 'neu-inset text-indigo-600'
    },
    {
      icon: Smartphone,
      title: 'ইনস্ট্যান্ট বিকাশ/নগদ ক্যাশআউট',
      subtitle: 'Fast Local Withdrawals',
      desc: 'কোনো জটিলতা ছাড়াই অর্জিত টাকা সরাসরি আপনার ব্যক্তিগত বিকাশ, নগদ, রকেট বা উপায় একাউন্টে দ্রুত ক্যাশআউট করুন।',
      badge: '১০ মিনিটে পেমেন্ট',
      accentColor: 'text-pink-600',
      iconBg: 'neu-inset text-pink-600'
    }
  ];

  return (
    <section className="py-8 sm:py-12 font-['Hind_Siliguri']">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-800 mb-2.5 border border-emerald-200/80 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>কেন ইউনিটি আর্নিং প্ল্যাটফর্ম বেছে নেবেন?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            প্রফেশনাল সুবিধা ও ফিচারসমূহ
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal leading-relaxed">
            আধুনিক সফট ইউআই ও নির্ভরযোগ্য আইটি স্কিল হাব - আপনার ক্যারিয়ার ও আয়ের পথকে করবে মসৃণ
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 flex flex-col justify-between border border-slate-200 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-0.5">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-indigo-600 mb-2">
                    {feat.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ১০০% ভেরিফাইড
                  </span>
                  <span className="text-indigo-600">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary CTA Bar */}
        <div className="mt-8 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 mb-1">
              <Gift className="w-4 h-4 text-pink-500 animate-bounce" />
              <span>লিমিটেড টাইম বিশেষ সুযোগ</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              আজই শুরু করুন এবং নিশ্চিত ৩০০৳ ক্যাশব্যাক বুঝে নিন!
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl font-normal leading-relaxed">
              বিকাশ বা নগদে সেন্ড মানি করে ট্রানজেকশন আইডি পাঠিয়ে দিলেই ১০ মিনিটের মধ্যে আপনার আইডি একটিভ হবে।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto shrink-0">
            <a
              href={WHATSAPP_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn-emerald px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <WhatsAppIcon size={18} className="w-4 h-4 text-white" />
              <span>হোয়াটসঅ্যাপ গ্রুপ</span>
            </a>

            <button
              type="button"
              onClick={onOpenActivation}
              className="neu-btn-primary px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>আইডি এক্টিভ করুন →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
