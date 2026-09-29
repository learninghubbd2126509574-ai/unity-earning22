import React, { useState } from 'react';
import { COURSES_DATA } from '../data/platformData';
import { Course } from '../types';
import { BookOpen, Clock, CheckCircle, Send, Award, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 font-['Hind_Siliguri']">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-xs font-semibold text-indigo-800 mb-2.5 border border-indigo-200/80 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>{COURSES_DATA.length}টি প্রফেশনাল ফ্রিল্যান্সিং ও স্কিল কোর্স</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">উপলব্ধ কোর্স ও কাজের তালিকা</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal leading-relaxed">
          সহজ বাংলায় সাজানো টিউটোরিয়াল, লাইভ ট্রেইনার সাপোর্ট এবং দৈনিক কাজ পাওয়ার কমপ্লিট ড্যাশবোর্ড
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Left Side: Course List Navigation */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
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
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0">{course.icon}</span>
                    <div className="truncate">
                      <div className="font-bold text-xs sm:text-sm truncate">{course.titleBn}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>{course.dailyEarningEst}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                    isSelected ? 'bg-indigo-700/60 text-white' : 'bg-slate-100 text-slate-600'
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
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-2xs space-y-5">
            
            {/* Course Header Banner */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl p-2 bg-white rounded-xl border border-slate-200/80 shrink-0 shadow-2xs">{activeCourse.icon}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    {activeCourse.titleBn}
                    <span className="text-xs text-indigo-600 font-semibold">({activeCourse.titleEn})</span>
                  </h3>
                  <div className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>দৈনিক আনুমানিক ইনকাম: <strong>{activeCourse.dailyEarningEst}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="bg-white px-2.5 py-1 rounded-lg text-indigo-700 border border-slate-200 shadow-2xs">
                  {activeCourse.effortLevel}
                </span>
                <span className="bg-white px-2.5 py-1 rounded-lg text-slate-700 border border-slate-200 shadow-2xs">
                  {activeCourse.payoutSpeed}
                </span>
              </div>
            </div>

            {/* Course Description */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">কোর্স ওভারভিউ:</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {activeCourse.description}
              </p>
            </div>

            {/* Modules List */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">কোর্স মডিউল ও বিষয়বস্তু:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCourse.modules.map((mod, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2 text-xs text-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo Task Simulator */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>ডেমো প্র্যাকটিস টাস্ক সিমুলেটর:</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  লাইভ টেস্ট
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3 font-normal leading-relaxed">
                {activeCourse.sampleTaskPrompt}
              </p>

              {taskSubmitted ? (
                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong>চমৎকার কাজ!</strong> আপনার ডেমো কাজটি সফলভাবে যাচাই করা হয়েছে। মেম্বারশিপে এরকম প্রতিদিন রিয়েল কাজ পাবেন।</span>
                  </div>
                  <button
                    onClick={() => { setTaskSubmitted(false); setUserPracticeInput(''); }}
                    className="bg-white border border-emerald-300 px-2.5 py-1 rounded-lg text-[10px] text-slate-700 font-bold shrink-0 cursor-pointer hover:bg-emerald-100"
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
                    className="w-full bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-medium border border-slate-200"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5 fill-white" />
                      <span>টাস্ক সাবমিট করুন</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Callout CTA */}
            <div className="bg-gradient-to-r from-slate-50 via-indigo-50/20 to-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  এই কোর্সের সমস্ত ভিডিও ও লাইফটাইম সাপোর্ট আনলক করুন
                </h4>
                <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                  মাত্র <strong>{currentPrice} ৳</strong> মেম্বারশিপে পাচ্ছেন এই কোর্স সহ মোট ১২টি পূর্ণাঙ্গ কোর্স
                </p>
              </div>
              <button
                onClick={onOpenActivation}
                className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs shrink-0"
              >
                <span>আইডি এক্টিভ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
