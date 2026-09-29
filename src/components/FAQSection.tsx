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
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-xs font-semibold text-indigo-800 mb-2.5 border border-indigo-200/80 shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span>সাধারণ জিজ্ঞাসা ও উত্তর</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal leading-relaxed">
          আপনার কোনো প্রশ্ন থাকলে নিচের উত্তরগুলো দেখতে পারেন অথবা সরাসরি টেলিগ্রাম ও হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন
        </p>
      </div>

      <div className="space-y-2.5 mb-8">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen 
                  ? 'bg-slate-50 border-indigo-200 shadow-2xs' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-4 sm:p-4.5 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between gap-3 cursor-pointer"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <ChevronUp className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-4.5 pb-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed pt-0.5 border-t border-slate-200/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Help Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 text-center space-y-3 border border-slate-200 shadow-2xs">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          আরও কিছু জানতে সরাসরি কথা বলুন আমাদের কাউন্সিলরের সাথে
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto font-normal leading-relaxed">
          আমাদের সাপোর্ট টিম ২৪/৭ লাইভ মেসেজের জন্য প্রস্তুত। বিকাশ বা নগদে পেমেন্ট ও একাউন্ট এক্টিভেশনে তাৎক্ষণিক সহায়তা নিন।
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn-blue text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>টেলিগ্রামে মেসেজ (@unityearning12)</span>
          </a>

          <a
            href={WHATSAPP_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn-emerald text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <WhatsAppIcon size={16} className="w-4 h-4 text-white" />
            <span>হোয়াটসঅ্যাপ চ্যানেল</span>
          </a>

          <button
            onClick={onOpenActivation}
            className="neu-btn-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>পেমেন্ট সাবমিট ({currentPrice}৳)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
