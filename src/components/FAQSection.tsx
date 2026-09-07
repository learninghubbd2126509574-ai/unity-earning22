import React, { useState } from 'react';
import { FAQS } from '../data/platformData';
import { HelpCircle, ChevronDown, ChevronUp, Send, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FAQSectionProps {
  onOpenActivation: () => void;
  currentPrice?: number;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  onOpenActivation,
  currentPrice = 599
}) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const TELEGRAM_LINK = "https://t.me/unityearning12";
  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 font-['Hind_Siliguri']">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 neu-inset-sm text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold mb-2.5 border border-blue-200/50">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>সাধারণ জিজ্ঞাসা ও উত্তর</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#2C3E50] tracking-tight">সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          আপনার কোনো প্রশ্ন থাকলে নিচের উত্তরগুলো দেখতে পারেন অথবা সরাসরি টেলিগ্রাম ও হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border border-white/80 transition-all duration-200 ${
                isOpen ? 'neu-inset' : 'neu-flat hover:neu-flat-sm'
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#2C3E50] flex items-center justify-between gap-3 cursor-pointer"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <div className="w-7 h-7 rounded-full neu-flat-xs flex items-center justify-center text-blue-600 shrink-0">
                    <ChevronUp className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full neu-inset-sm flex items-center justify-center text-slate-400 shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-[13px] text-slate-600 leading-relaxed pt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Help Banner (Neumorphic) */}
      <div className="neu-flat rounded-3xl p-6 sm:p-8 text-center space-y-3 border border-white/80">
        <h3 className="text-base sm:text-lg font-black text-[#2C3E50]">
          আরও কিছু জানতে সরাসরি কথা বলুন আমাদের কাউন্সিলরের সাথে
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
          আমাদের সাপোর্ট টিম ২৪/৭ লাইভ মেসেজের জন্য প্রস্তুত। বিকাশ বা নগদে পেমেন্ট ও একাউন্ট এক্টিভেশনে তাৎক্ষণিক সহায়তা নিন।
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn-blue text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>টেলিগ্রামে মেসেজ (@unityearning12)</span>
          </a>

          <a
            href={WHATSAPP_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn-emerald text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <WhatsAppIcon size={16} className="w-4 h-4 text-white" />
            <span>হোয়াটসঅ্যাপ চ্যানেল</span>
          </a>

          <button
            onClick={onOpenActivation}
            className="neu-btn-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>পেমেন্ট সাবমিট ({currentPrice}৳)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
