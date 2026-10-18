import React from 'react';
import { Award, Users, Smartphone, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

interface KeyFeaturesSectionProps {
  onOpenActivation: () => void;
}

export function KeyFeaturesSection({ onOpenActivation }: KeyFeaturesSectionProps) {
  const features = [
    {
      icon: Award,
      title: 'লাইফটাইম মেম্বারশিপ',
      subtitle: 'Unlimited Access',
      desc: 'একবার মেম্বারশিপ ফি দিয়ে আজীবন সমস্ত বর্তমান ও ভবিষ্যৎ নতুন কোর্সের পূর্ণ অ্যাক্সেস পাওয়ার সুবিধা।',
      tag: 'আজীবন আপডেট',
    },
    {
      icon: TrendingUp,
      title: 'শেখার সাথে আয়ের সুযোগ',
      subtitle: 'Learn + Earn',
      desc: 'ডাটা এন্ট্রি, ফর্ম ফিলিং, কন্টেন্ট ও টাইপিং কাজ করে প্রথম দিন থেকেই মোবাইল দিয়ে আয় করার কার্যকর সিস্টেম।',
      tag: 'দৈনিক আয়ের সুযোগ',
    },
    {
      icon: Users,
      title: 'আকর্ষণীয় রেফারেল বোনাস',
      subtitle: 'Rewards & Bonus',
      desc: 'প্রতিটি সফল রেফারেলের জন্য ইনস্ট্যান্ট কমিশন এবং নিয়মিত টপ পারফর্মারদের জন্য এক্সক্লুসিভ ক্যাশ প্রাইজ ও গিফট।',
      tag: 'ইনস্ট্যান্ট কমিশন',
    },
    {
      icon: Smartphone,
      title: 'সহজ লোকাল ক্যাশআউট',
      subtitle: 'Local Withdrawals',
      desc: 'কোনো জটিলতা ছাড়াই অর্জিত টাকা সরাসরি আপনার ব্যক্তিগত বিকাশ বা নগদ অ্যাকাউন্টে দ্রুত ক্যাশআউট করুন।',
      tag: 'দ্রুত ক্যাশআউট',
    },
  ];

  return (
    <section className="py-10 sm:py-14 font-['Hind_Siliguri']">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <MotionReveal distance={16} className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#079669] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#079669]" />
            <span>কেন ইউনিটি আর্নিং প্ল্যাটফর্ম বেছে নেবেন?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight">
            প্রফেশনাল সুবিধা ও ফিচারসমূহ
          </h2>

          <p className="text-xs sm:text-sm text-[#667085] mt-2 font-normal leading-relaxed">
            নির্ভরযোগ্য আইটি স্কিল হাব ও বাস্তবমুখী ট্রেইনিং — আপনার ক্যারিয়ার ও আয়ের পথকে করবে মসৃণ
          </p>
        </MotionReveal>

        {/* 4-Column Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <MotionReveal
                key={idx}
                delay={idx * 0.08}
                distance={20}
                className="card-premium p-6 flex flex-col justify-between bg-white border border-[#E4E7EC] rounded-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center text-[#315CF5]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#079669] bg-[#ECFDF5] px-2 py-0.5 rounded-md border border-[#A7F3D0]">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#101828] mb-0.5">
                    {feat.title}
                  </h3>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-medium text-[#667085] mb-2">
                    {feat.subtitle}
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E4E7EC] flex items-center gap-1.5 text-xs font-semibold text-[#315CF5]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#079669]" />
                  <span>ভেরিফাইড মেম্বারশিপ বেনিফিট</span>
                </div>
              </MotionReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
