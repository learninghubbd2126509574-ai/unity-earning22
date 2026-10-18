import React, { useState } from 'react';
import { Calculator, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

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
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 font-['Hind_Siliguri']">
      <MotionReveal distance={20} className="card-premium bg-white rounded-2xl p-6 sm:p-8 border border-[#E4E7EC]">
        
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E4E7EC]">
          <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center text-[#315CF5]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101828] tracking-tight">ইনকাম ক্যালকুলেটর</h2>
            <p className="text-xs sm:text-sm text-[#667085] font-normal leading-relaxed">
              দৈনিক কাজের সময় নির্ধারণ করে আনুমানিক মাসিক উপার্জন হিসাব করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Controls Column */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Skill Selector */}
            <div>
              <label className="block text-xs font-bold text-[#667085] mb-2 uppercase tracking-wider">
                ১. কাজ / স্কিল নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(rates) as Array<keyof typeof rates>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSkill(key)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                      selectedSkill === key
                        ? 'bg-[#315CF5] text-white border-[#315CF5] shadow-xs'
                        : 'bg-[#F6F8FC] hover:bg-white text-[#101828] border-[#E4E7EC]'
                    }`}
                  >
                    <div>{rates[key].name}</div>
                    <div className={`text-[10px] font-normal mt-0.5 ${
                      selectedSkill === key ? 'text-white/80' : 'text-[#667085]'
                    }`}>
                      {rates[key].complexity}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Hours Slider */}
            <div className="bg-[#F6F8FC] p-4 rounded-xl border border-[#E4E7EC]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#315CF5]" />
                  <span>২. দৈনিক কাজের সময়:</span>
                </label>
                <span className="text-xs font-bold text-[#315CF5] bg-white px-2.5 py-0.5 rounded-lg border border-[#E4E7EC]">
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
                className="w-full accent-[#315CF5] cursor-pointer h-2 bg-[#E4E7EC] rounded-lg my-2"
              />
              <div className="flex justify-between text-[10px] text-[#667085] mt-1 font-mono">
                <span>১ ঘণ্টা</span>
                <span>২ ঘণ্টা</span>
                <span>৪ ঘণ্টা</span>
                <span>৬ ঘণ্টা</span>
                <span>৮ ঘণ্টা</span>
              </div>
            </div>

          </div>

          {/* Results Display Column */}
          <div className="md:col-span-5 bg-[#F6F8FC] p-5 sm:p-6 rounded-2xl border border-[#E4E7EC] flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-3">
                আনুমানিক আয় হিসাব:
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#E4E7EC]">
                  <span className="text-[11px] text-[#667085] font-normal block">দৈনিক সম্ভাব্য আয়:</span>
                  <div className="text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#101828] mt-0.5">
                    ৳ {dailyIncome.toLocaleString('bn-BD')} <span className="text-xs font-normal text-[#667085]">টাকা</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#A7F3D0]">
                  <span className="text-[11px] text-[#079669] font-semibold block">মাসিক আনুমানিক উপার্জন:</span>
                  <div className="text-2xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-[#079669] mt-0.5">
                    ৳ {monthlyIncome.toLocaleString('bn-BD')} <span className="text-xs font-normal text-[#079669]">টাকা / মাস</span>
                  </div>
                </div>

                <div className="bg-[#ECFDF5] p-2.5 rounded-xl border border-[#A7F3D0] text-[#065F46] text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#079669] shrink-0" />
                  <div className="font-normal">
                    <span>আইডি এক্টিভ করলেই নিশ্চিত <strong>৳ ৩০০ ক্যাশব্যাক</strong> পাবেন!</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenActivation}
              className="btn-primary w-full h-11 mt-4 text-xs sm:text-sm font-bold cursor-pointer"
            >
              <span>{currentPrice} টাকায় মেম্বারশিপ নিন</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>

      </MotionReveal>
    </div>
  );
};
