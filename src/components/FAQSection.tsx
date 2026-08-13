import React, { useState } from 'react';
import { FAQS } from '../data/platformData';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, PhoneCall } from 'lucide-react';

interface FAQSectionProps {
  onOpenActivation: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenActivation }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const WHATSAPP_LINK = "https://wa.me/8801600602084?text=%E0%A6%86%E0%A6%AE%E0%A6%BF%20Unity%20Earning%20%E0%A6%8F%20%E0%A6%AF%E0%A7%81%E0%A6%95%E0%A7%8D%E0%A6%A4%20%E0%A6%B9%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A6%A4%E0%A7%87%E0%A6%9B%E0%A6%B8%E0%A6%BF%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%8D%E0%A4%A";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>সাধারণ জিজ্ঞাসা ও উত্তর</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          আপনার কোনো প্রশ্ন থাকলে নিচের উত্তরগুলো দেখতে পারেন অথবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-[#130f26] border border-white/10 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3 bg-[#1a1533]/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Help Banner */}
      <div className="bg-gradient-to-r from-[#130f26] via-[#1a1533] to-[#130f26] border border-indigo-500/30 rounded-2xl p-6 text-center space-y-3 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white">
          আরও কিছু জানতে সরাসরি কথা বলুন আমাদের কাউন্সিলরের সাথে
        </h3>
        <p className="text-xs text-gray-300 max-w-md mx-auto">
          আমাদের সাপোর্ট টিম ২৪/৭ লাইভ মেসেজের জন্য প্রস্তুত। বিকাশ বা নগদে পেমেন্ট ও একাউন্ট একটিভেশনে তাৎক্ষণিক সহায়তা নিন।
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>হোয়াটসঅ্যাপ মেসেজ দিন (01600602084)</span>
          </a>

          <button
            onClick={onOpenActivation}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <span>পেমেন্ট সাবমিট করুন (৪৯৯৳)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
