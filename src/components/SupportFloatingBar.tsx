import React from 'react';
import { MessageCircle, ShieldCheck, Sparkles, Lock } from 'lucide-react';

interface SupportFloatingBarProps {
  onOpenActivation: () => void;
  currentPrice: number;
  onOpenAdmin: () => void;
}

export const SupportFloatingBar: React.FC<SupportFloatingBarProps> = ({ onOpenActivation, currentPrice, onOpenAdmin }) => {
  const WHATSAPP_LINK = "https://wa.me/8801600602084?text=%E0%A6%86%E0%A6%AE%E0%A6%BF%20Unity%20Earning%20%E0%A6%8F%20%E0%A6%AF%E0%A7%81%E0%A6%95%E0%A7%8D%E0%A6%A4%20%E0%A6%B9%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A6%A4%E0%A7%87%E0%A6%9B%E0%A6%B8%E0%A6%BF%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%8D%E0%A4%A";

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 z-40 max-w-sm ml-auto">
      <div className="bg-[#130f26]/95 backdrop-blur-md border border-indigo-500/40 p-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-2 text-white">
        
        <div className="flex items-center gap-2 pl-1">
          <div className="relative">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full block animate-ping absolute top-0 right-0" />
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xs">
              ✨
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white flex items-center gap-1">
              <span>মেম্বারশিপ: <strong>{currentPrice}৳</strong></span>
              <span className="bg-amber-400 text-black font-extrabold text-[9px] px-1 rounded">{currentPrice === 599 ? '৪০০' : '৩০০'}৳ ব্যাক</span>
            </div>
            <div className="text-[10px] text-gray-400">২৪/৭ অনলাইন হেল্পলাইন</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenActivation}
            className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-white/10 transition-colors"
          >
            ভেরিফাই
          </button>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-md shadow-emerald-600/30 flex items-center gap-1 transition-all hover:scale-105"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>হোয়াটসঅ্যাপ</span>
          </a>
        </div>

      </div>
    </div>
  );
};
