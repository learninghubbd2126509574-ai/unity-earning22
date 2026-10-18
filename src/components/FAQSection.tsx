import React, { useState } from 'react';
import { FAQS } from '../data/platformData';
import { HelpCircle, ChevronDown, ChevronUp, Send, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MotionReveal } from './MotionReveal';

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
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 font-['Hind_Siliguri']">
      <MotionReveal distance={16} className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315CF5] mb-2">
          <HelpCircle className="w-4 h-4 text-[#315CF5]" />
          <span>সাধারণ জিজ্ঞাসা ও উত্তর</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight">সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ</h2>
        <p className="text-xs sm:text-sm text-[#667085] mt-1.5 font-normal leading-relaxed">
          আপনার কোনো প্রশ্ন থাকলে নিচের উত্তরগুলো দেখতে পারেন অথবা সরাসরি টেলিগ্রাম ও হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন
        </p>
      </MotionReveal>

      <div className="space-y-3 mb-8">
        {FAQS.map((faq, idx) => {
          const isOpen = openId === faq.id;
          return (
            <MotionReveal
              key={faq.id}
              delay={idx * 0.05}
              distance={12}
              className={`rounded-xl border transition-all duration-200 ${
                isOpen 
                  ? 'bg-white border-[#315CF5] shadow-xs' 
                  : 'bg-white border-[#E4E7EC] hover:border-[#D0D5DD]'
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#101828] flex items-center justify-between gap-3 cursor-pointer"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <div className="w-6 h-6 rounded-md bg-[#EEF3FF] flex items-center justify-center text-[#315CF5] shrink-0">
                    <ChevronUp className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-md bg-[#F6F8FC] flex items-center justify-center text-[#667085] shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-[13px] text-[#667085] border-t border-[#E4E7EC] pt-3 font-normal leading-relaxed">
                  {faq.answer.replace('৫৯৯', `${currentPrice}`).replace('499', `${currentPrice}`).replace('599', `${currentPrice}`)}
                </div>
              )}
            </MotionReveal>
          );
        })}
      </div>

      {/* Support Box */}
      <MotionReveal distance={20} className="card-premium p-6 sm:p-7 bg-white border border-[#E4E7EC] rounded-2xl text-center">
        <h3 className="text-base font-bold text-[#101828] mb-1">
          আরও কিছু জানতে চান?
        </h3>
        <p className="text-xs text-[#667085] mb-4">
          আমাদের অফিসিয়াল সাপোর্ট টিম সার্বক্ষণিক সহায়তা দিতে প্রস্তুত
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={WHATSAPP_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald h-11 px-4 text-xs font-bold"
          >
            <WhatsAppIcon size={16} className="w-4 h-4 text-white" />
            <span>WhatsApp সাপোর্ট</span>
          </a>

          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-telegram h-11 px-4 text-xs font-bold"
          >
            <Send className="w-4 h-4" />
            <span>Telegram চ্যানেল</span>
          </a>

          <button
            onClick={onOpenActivation}
            className="btn-primary h-11 px-4 text-xs font-bold cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>আইডি এক্টিভেশন ফর্ম</span>
          </button>
        </div>
      </MotionReveal>
    </div>
  );
};
