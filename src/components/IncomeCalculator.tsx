import React, { useState } from 'react';
import { Calculator, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface IncomeCalculatorProps {
  onOpenActivation: () => void;
  currentPrice?: number;
}

export const IncomeCalculator: React.FC<IncomeCalculatorProps> = ({ 
  onOpenActivation,
  currentPrice = 599
}) => {
  const [selectedSkill, setSelectedSkill] = useState<
    'form' | 'data' | 'typing' | 'selling' | 'email' | 'photo' | 'sim' | 'digital' | 'graphic' | 'video' | 'writing' | 'social'
  >('data');
  const [dailyHours, setDailyHours] = useState<number>(3);

  const rates = {
    form: { name: 'ফর্ম ফিলআপ', hourlyRate: 150, complexity: 'সহজ' },
    data: { name: 'ডাটা এন্ট্রি', hourlyRate: 200, complexity: 'সহজ' },
    typing: { name: 'টাইপিং জব', hourlyRate: 175, complexity: 'সহজ' },
    selling: { name: 'প্রোডাক্ট সেলিং', hourlyRate: 300, complexity: 'মাঝারি' },
    email: { name: 'ইমেইল মার্কেটিং', hourlyRate: 250, complexity: 'মাঝারি' },
    photo: { name: 'ফটো এডিটিং', hourlyRate: 220, complexity: 'মাঝারি' },
    sim: { name: 'সিম অফার সেলিং', hourlyRate: 240, complexity: 'সহজ' },
    digital: { name: 'ডিজিটাল মার্কেটিং', hourlyRate: 350, complexity: 'মাঝারি' },
    graphic: { name: 'গ্রাফিক ডিজাইন', hourlyRate: 300, complexity: 'মাঝারি' },
    video: { name: 'ভিডিও এডিটিং', hourlyRate: 400, complexity: 'এডভান্সড' },
    writing: { name: 'কন্টেন্ট রাইটিং', hourlyRate: 250, complexity: 'সহজ' },
    social: { name: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট', hourlyRate: 280, complexity: 'মাঝারি' },
  };

  const currentRate = rates[selectedSkill];
  const dailyIncome = currentRate.hourlyRate * dailyHours;
  const monthlyIncome = dailyIncome * 26; // 26 working days

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 font-['Hind_Siliguri']">
      <div className="neu-flat rounded-3xl sm:rounded-[32px] p-6 sm:p-8 border border-white/80 relative">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-blue-600 border border-white/80">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2C3E50] tracking-tight">ইনকাম ক্যালকুলেটর</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              দৈনিক কাজের সময় নির্ধারণ করে আনুমানিক মাসিক উপার্জন হিসাব করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Controls Column */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Skill Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                ১. কাজ / স্কিল নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(rates) as Array<keyof typeof rates>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSkill(key)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border border-white/70 ${
                      selectedSkill === key
                        ? 'neu-btn-primary shadow-md'
                        : 'neu-btn text-slate-700'
                    }`}
                  >
                    <div>{rates[key].name}</div>
                    <div className={`text-[10px] font-medium mt-0.5 ${
                      selectedSkill === key ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {rates[key].complexity}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Hours Slider */}
            <div className="neu-inset p-4 rounded-2xl border border-white/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>২. দৈনিক কাজের সময়:</span>
                </label>
                <span className="text-xs font-bold text-blue-700 neu-flat-xs px-2.5 py-1 rounded-lg border border-white">
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
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-300 rounded-lg my-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>১ ঘণ্টা</span>
                <span>২ ঘণ্টা</span>
                <span>৪ ঘণ্টা</span>
                <span>৬ ঘণ্টা</span>
                <span>৮ ঘণ্টা</span>
              </div>
            </div>

          </div>

          {/* Results Display Column */}
          <div className="md:col-span-5 neu-inset p-5 rounded-2xl border border-white/60 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                আনুমানিক আয় হিসাব:
              </div>

              <div className="space-y-3">
                <div className="neu-flat-sm p-3.5 rounded-xl border border-white/80">
                  <span className="text-[11px] text-slate-500 font-medium block">দৈনিক সম্ভাব্য আয়:</span>
                  <div className="text-xl font-extrabold text-[#2C3E50] mt-0.5">
                    ৳ {dailyIncome.toLocaleString('bn-BD')} <span className="text-xs font-medium text-slate-500">টাকা</span>
                  </div>
                </div>

                <div className="neu-flat-sm p-3.5 rounded-xl border border-emerald-200/60">
                  <span className="text-[11px] text-emerald-700 font-bold block">মাসিক আনুমানিক উপার্জন:</span>
                  <div className="text-2xl font-black text-emerald-600 mt-0.5">
                    ৳ {monthlyIncome.toLocaleString('bn-BD')} <span className="text-xs font-medium text-emerald-700">টাকা / মাস</span>
                  </div>
                </div>

                <div className="neu-flat-xs p-2.5 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="font-medium">
                    <span>আইডি এক্টিভ করলেই নিশ্চিত <strong>৳ ৩০০ ক্যাশব্যাক</strong> পাবেন!</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenActivation}
              className="w-full mt-5 neu-btn-primary py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>{currentPrice} টাকায় মেম্বারশিপ নিন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
