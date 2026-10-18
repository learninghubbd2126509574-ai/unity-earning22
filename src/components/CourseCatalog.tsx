import React, { useState } from 'react';
import { COURSES_DATA } from '../data/platformData';
import { Course } from '../types';
import { BookOpen, CheckCircle, Send, Award, ArrowRight, Sparkles } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

interface CourseCatalogProps {
  onOpenActivation: () => void;
  selectedCourseId?: string;
  currentPrice?: number;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ 
  onOpenActivation, 
  selectedCourseId,
  currentPrice = 599 
}) => {
  const [activeCourse, setActiveCourse] = useState<Course | null>(
    COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0]
  );
  const [userPracticeInput, setUserPracticeInput] = useState('');
  const [taskSubmitted, setTaskSubmitted] = useState(false);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPracticeInput.trim()) return;
    setTaskSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 font-['Hind_Siliguri']">
      
      {/* Header */}
      <MotionReveal distance={16} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315CF5] mb-2">
          <BookOpen className="w-4 h-4 text-[#315CF5]" />
          <span>{COURSES_DATA.length}টি প্রফেশনাল ফ্রিল্যান্সিং ও স্কিল কোর্স</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight">
          উপলব্ধ কোর্স ও কাজের তালিকা
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] mt-1.5 font-normal leading-relaxed">
          সহজ বাংলায় সাজানো টিউটোরিয়াল, লাইভ ট্রেইনার সাপোর্ট এবং দৈনিক কাজ পাওয়ার কমপ্লিট ড্যাশবোর্ড
        </p>
      </MotionReveal>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Course List Navigation */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-2 px-1">
            কোর্স সিলেক্ট করুন:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {COURSES_DATA.map((course) => {
              const isSelected = activeCourse?.id === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => {
                    setActiveCourse(course);
                    setTaskSubmitted(false);
                    setUserPracticeInput('');
                  }}
                  className={`p-3 rounded-xl text-left transition-all flex items-center justify-between gap-3 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#315CF5] text-white border-[#315CF5] shadow-xs'
                      : 'bg-white hover:bg-[#F6F8FC] text-[#101828] border-[#E4E7EC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0">{course.icon}</span>
                    <div className="truncate">
                      <div className="font-bold text-xs sm:text-sm truncate">{course.titleBn}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#667085]'}`}>
                        {course.dailyEarningEst}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F6F8FC] text-[#667085]'
                  }`}>
                    {course.effortLevel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed View & Practice Task Simulator */}
        {activeCourse && (
          <MotionReveal distance={20} className="lg:col-span-8 card-premium bg-white rounded-2xl p-6 sm:p-7 border border-[#E4E7EC] space-y-5">
            
            {/* Course Header Banner */}
            <div className="bg-[#F6F8FC] p-4 rounded-xl border border-[#E4E7EC] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl p-2 bg-white rounded-xl border border-[#E4E7EC] shrink-0">{activeCourse.icon}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#101828] flex items-center gap-2">
                    {activeCourse.titleBn}
                    <span className="text-xs text-[#315CF5] font-semibold">({activeCourse.titleEn})</span>
                  </h3>
                  <div className="text-xs text-[#079669] font-semibold mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#079669]" />
                    <span>দৈনিক আনুমানিক ইনকাম: <strong>{activeCourse.dailyEarningEst}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
                <span className="bg-white px-2.5 py-1 rounded-lg text-[#315CF5] border border-[#E4E7EC]">
                  {activeCourse.effortLevel}
                </span>
                <span className="bg-white px-2.5 py-1 rounded-lg text-[#101828] border border-[#E4E7EC]">
                  {activeCourse.payoutSpeed}
                </span>
              </div>
            </div>

            {/* Course Description */}
            <div>
              <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-1">কোর্স ওভারভিউ:</h4>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-normal">
                {activeCourse.description}
              </p>
            </div>

            {/* Modules List */}
            <div>
              <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-2">কোর্স মডিউল ও বিষয়বস্তু:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCourse.modules.map((mod, idx) => (
                  <div key={idx} className="bg-[#F6F8FC] p-2.5 rounded-xl border border-[#E4E7EC] flex items-start gap-2 text-xs text-[#101828]">
                    <CheckCircle className="w-4 h-4 text-[#079669] shrink-0 mt-0.5" />
                    <span className="font-medium">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo Task Simulator */}
            <div className="bg-[#F6F8FC] p-4 sm:p-5 rounded-xl border border-[#E4E7EC]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#315CF5] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#315CF5]" />
                  <span>ডেমো প্র্যাকটিস টাস্ক সিমুলেটর:</span>
                </span>
                <span className="text-[10px] text-[#079669] font-bold bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-md">
                  লাইভ টেস্ট
                </span>
              </div>
              <p className="text-xs text-[#667085] mb-3 font-normal leading-relaxed">
                {activeCourse.sampleTaskPrompt}
              </p>

              {taskSubmitted ? (
                <div className="bg-[#ECFDF5] p-3.5 rounded-xl border border-[#A7F3D0] text-[#065F46] text-xs flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#079669] shrink-0" />
                    <span><strong>চমৎকার কাজ!</strong> আপনার ডেমো কাজটি সফলভাবে যাচাই করা হয়েছে। মেম্বারশিপে এরকম প্রতিদিন রিয়েল কাজ পাবেন।</span>
                  </div>
                  <button
                    onClick={() => { setTaskSubmitted(false); setUserPracticeInput(''); }}
                    className="btn-secondary h-8 px-2.5 text-[10px] font-bold shrink-0 cursor-pointer"
                  >
                    পুনরায় চেষ্টা
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTaskSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    value={userPracticeInput}
                    onChange={(e) => setUserPracticeInput(e.target.value)}
                    placeholder="এখানে আপনার উত্তর বা কাজের নমুনা লিখুন..."
                    className="w-full bg-white rounded-xl px-3.5 py-2 text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#315CF5] transition-all font-medium border border-[#E4E7EC]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary h-9 px-4 text-xs font-bold cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>টাস্ক সাবমিট করুন</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Callout CTA */}
            <div className="bg-[#EEF3FF] rounded-xl p-4 border border-[#D0DCFD] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                  এই কোর্সের সমস্ত ভিডিও ও লাইফটাইম সাপোর্ট আনলক করুন
                </h4>
                <p className="text-[11px] text-[#667085] font-normal mt-0.5">
                  মাত্র <strong className="text-[#315CF5]">{currentPrice} ৳</strong> মেম্বারশিপে পাচ্ছেন এই কোর্স সহ মোট ১২টি পূর্ণাঙ্গ কোর্স
                </p>
              </div>
              <button
                onClick={onOpenActivation}
                className="btn-primary h-10 px-4 text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>আইডি অ্যাক্টিভ করুন</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </MotionReveal>
        )}

      </div>
    </div>
  );
};
