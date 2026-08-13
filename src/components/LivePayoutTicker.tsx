import React, { useState, useEffect } from 'react';
import { LIVE_PAYMENTS, TESTIMONIALS } from '../data/platformData';
import { PaymentProof } from '../types';
import { ShieldCheck, ArrowUpRight, Star, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface LivePayoutTickerProps {
  onOpenActivation: () => void;
}

export const LivePayoutTicker: React.FC<LivePayoutTickerProps> = ({ onOpenActivation }) => {
  const [payouts, setPayouts] = useState<PaymentProof[]>(LIVE_PAYMENTS);

  // Simulate real-time automated payout additions
  useEffect(() => {
    const names = ['রফিকুল ইসলাম', 'মারুফ আহমেদ', 'নাসরিন সুলতানা', 'কামরুল হাসান', 'তানিয়া আক্তার'];
    const methods: Array<'bKash' | 'Nagad' | 'Rocket'> = ['bKash', 'Nagad', 'Rocket'];
    const types: Array<'ক্যাশব্যাক' | 'দৈনিক ইনকাম' | 'রেফারাল বোনাস'> = ['দৈনিক ইনকাম', 'ক্যাশব্যাক', 'রেফারাল বোনাস'];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomMethod = methods[Math.floor(Math.random() * methods.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomAmount = randomType === 'ক্যাশব্যাক' ? 300 : Math.floor(Math.random() * 450) + 250;

      const newPayout: PaymentProof = {
        id: 'p-' + Date.now(),
        memberName: randomName,
        amount: randomAmount,
        method: randomMethod,
        timeAgo: 'এখনই',
        txType: randomType
      };

      setPayouts(prev => [newPayout, ...prev.slice(0, 5)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* Live Payout Ticker Section */}
      <div className="bg-[#130f26] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">লাইভ পেমেন্ট ও ক্যাশব্যাক আপডেট</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            স্বয়ংক্রিয় পেমেন্ট নোটিফিকেশন
          </span>
        </div>

        {/* Ticker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {payouts.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a1533] p-3 rounded-xl border border-white/5 flex items-center justify-between gap-2 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  item.method === 'bKash'
                    ? 'bg-pink-600/20 text-pink-400 border border-pink-500/30'
                    : item.method === 'Nagad'
                    ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30'
                    : 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {item.method === 'bKash' ? 'বিকাশ' : item.method === 'Nagad' ? 'নগদ' : 'রকেট'}
                </div>

                <div>
                  <div className="text-xs font-bold text-white">{item.memberName}</div>
                  <div className="text-[10px] text-gray-400">{item.txType} • {item.timeAgo}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-emerald-400 flex items-center gap-0.5 justify-end">
                  <span>৳ {item.amount}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] bg-emerald-500/15 text-emerald-300 px-1.5 py-0.2 rounded font-medium">
                  সফল
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Member Testimonials */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>সফল মেম্বারদের অভিজ্ঞতা</span>
          </div>
          <h3 className="text-2xl font-black text-white">আমাদের ছাত্র ও মেম্বারদের মতামত</h3>
          <p className="text-xs text-gray-400 mt-1">
            হাজারো তরুণ-তরুণী ও গৃহিণী প্রতিদিন ঘরে বসে স্কিল শিখে স্বাবলম্বী হচ্ছেন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#130f26] p-5 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        {t.name}
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <div className="text-[10px] text-gray-400">{t.location} • {t.date}</div>
                    </div>
                  </div>

                  <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {t.earnings}
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                <span>পেমেন্ট রিসিভড via <strong className="text-white">{t.method}</strong></span>
                <span className="text-amber-400">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
