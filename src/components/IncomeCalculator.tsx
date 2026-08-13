import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, DollarSign, Clock, ArrowRight } from 'lucide-react';

interface IncomeCalculatorProps {
  onOpenActivation: () => void;
}

export const IncomeCalculator: React.FC<IncomeCalculatorProps> = ({ onOpenActivation }) => {
  const [selectedSkill, setSelectedSkill] = useState<'form' | 'data' | 'typing' | 'selling' | 'digital' | 'video' | 'sim'>('data');
  const [dailyHours, setDailyHours] = useState<number>(2);

  const rates = {
    form: { name: 'ফর্ম ফিলআপ', hourlyRate: 150, complexity: 'সহজ' },
    data: { name: 'ডাটা এন্ট্রি', hourlyRate: 200, complexity: 'সহজ' },
    typing: { name: 'টাইপিং জব', hourlyRate: 175, complexity: 'সহজ' },
    selling: { name: 'প্রোডাক্ট সেলিং', hourlyRate: 300, complexity: 'মাঝারি' },
    digital: { name: 'ডিজিটাল মার্কেটিং', hourlyRate: 350, complexity: 'মাঝারি' },
    video: { name: 'ভিডিও এডিটিং', hourlyRate: 400, complexity: 'এডভান্সড' },
    sim: { name: 'সিম অফার সেলিং', hourlyRate: 220, complexity: 'সহজ' },
  };

  const currentRate = rates[selectedSkill];
  const dailyIncome = currentRate.hourlyRate * dailyHours;
  const monthlyIncome = dailyIncome * 26; // 26 working days
  const cashbackBonus = 300;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-[#130f26] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">ইনকাম ক্যালকুলেটর</h2>
            <p className="text-xs sm:text-sm text-gray-300">
              দৈনিক কত সময় কাজ করবেন তা সিলেক্ট করে আনুমানিক মাসিক আয় জেনে নিন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Controls Column */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Skill Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
                ১. কাজ / স্কিল নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(rates) as Array<keyof typeof rates>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSkill(key)}
                    className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                      selectedSkill === key
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-[#1a1533] border-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div>{rates[key].name}</div>
                    <div className="text-[10px] text-gray-400 font-normal mt-0.5">
                      {rates[key].complexity}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Hours Slider */}
            <div className="bg-[#1a1533] p-4 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>২. দৈনিক কাজের সময়:</span>
                </label>
                <span className="text-sm font-extrabold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-lg">
                  {dailyHours} ঘণ্টা / দিন
                </span>
              </div>
              
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-gray-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-mono">
                <span>১ ঘণ্টা</span>
                <span>২ ঘণ্টা</span>
                <span>৪ ঘণ্টা</span>
                <span>৬ ঘণ্টা</span>
                <span>৮ ঘণ্টা</span>
              </div>
            </div>

          </div>

          {/* Results Display Column */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#1a1533] to-[#15102c] p-5 rounded-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                আনুমানিক আয় হিসাব:
              </div>

              <div className="space-y-3">
                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                  <span className="text-[11px] text-gray-400 block">দৈনিক সম্ভাব্য আয়:</span>
                  <div className="text-xl font-extrabold text-white mt-0.5">
                    ৳ {dailyIncome.toLocaleString('bn-BD')} <span className="text-xs font-normal text-gray-400">টাকা</span>
                  </div>
                </div>

                <div className="bg-indigo-600/20 p-3 rounded-lg border border-indigo-500/30">
                  <span className="text-[11px] text-indigo-200 block">মাসিক আনুমানিক উপার্জন:</span>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">
                    ৳ {monthlyIncome.toLocaleString('bn-BD')} <span className="text-xs font-normal text-emerald-200">টাকা / মাস</span>
                  </div>
                </div>

                <div className="bg-amber-500/15 p-2.5 rounded-lg border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span>আইডি একটিভ করলে ইনস্ট্যান্ট <strong>৳ ৩০০ ক্যাশব্যাক</strong> ব্যাক পাবেন!</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenActivation}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]"
            >
              <span>৪৯৯ টাকায় মেম্বারশিপ নিন →</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
