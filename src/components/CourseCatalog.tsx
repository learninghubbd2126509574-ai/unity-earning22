import React, { useState } from 'react';
import { COURSES_DATA } from '../data/platformData';
import { Course } from '../types';
import { BookOpen, Clock, CheckCircle, PlayCircle, Sparkles, Send, Award, ArrowRight } from 'lucide-react';

interface CourseCatalogProps {
  onOpenActivation: () => void;
  selectedCourseId?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onOpenActivation, selectedCourseId }) => {
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>৯টি প্রফেশনাল আইটি অ্যান্ড আর্নিং কোর্স</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">উপলব্ধ কোর্স ও কাজের তালিকা</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          সহজ বাংলায় সাজানো টিউটোরিয়াল, লাইভ ট্রেইনার সাপোর্ট এবং দৈনিক কাজ পাওয়ার কমপ্লিট ড্যাশবোর্ড
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Course List Navigation Pills */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            কোর্সসমূহ সিলেক্ট করুন:
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
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-[#130f26] border-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{course.icon}</span>
                    <div>
                      <div className="font-bold text-xs sm:text-sm">{course.titleBn}</div>
                      <div className="text-[10px] text-gray-400">{course.dailyEarningEst}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
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
          <div className="lg:col-span-8 bg-[#130f26] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl relative space-y-6">
            
            {/* Course Header Banner */}
            <div className="bg-[#1a1533] p-4 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-white/5 rounded-xl border border-white/10">{activeCourse.icon}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    {activeCourse.titleBn}
                    <span className="text-xs text-indigo-400 font-normal">({activeCourse.titleEn})</span>
                  </h3>
                  <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                    সম্ভাব্য আয়: {activeCourse.dailyEarningEst}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {activeCourse.duration}
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                  {activeCourse.lessonCount} টি মডিউল
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">কোর্স সারসংক্ষেপ:</h4>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {activeCourse.description}
              </p>
            </div>

            {/* Modules List */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">এই কোর্সে যা যা শিখবেন:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCourse.modules.map((mod, idx) => (
                  <div key={idx} className="bg-[#1a1533] p-2.5 rounded-lg text-xs text-gray-200 flex items-center gap-2 border border-white/5">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Task Practice Simulator */}
            <div className="bg-[#1a1533] p-4 sm:p-5 rounded-xl border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>ডেমো ড্যাশবোর্ড: ডেমো টাস্ক প্র্যাকটিস করুন</span>
                </div>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  {activeCourse.sampleTask.reward}
                </span>
              </div>

              <p className="text-xs text-gray-300">
                <strong>{activeCourse.sampleTask.title}:</strong> {activeCourse.sampleTask.description}
              </p>

              {!taskSubmitted ? (
                <form onSubmit={handleTaskSubmit} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder={activeCourse.sampleTask.placeholder}
                    value={userPracticeInput}
                    onChange={(e) => setUserPracticeInput(e.target.value)}
                    className="w-full bg-[#130f26] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!userPracticeInput.trim()}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>প্র্যাকটিস টাস্ক সাবমিট করুন</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>সাবমিশন সফল হয়েছে!</span>
                  </div>
                  <p className="text-gray-300 text-[11px]">
                    অভিনন্দন! আপনার ডেমো টাস্ক সঠিক হয়েছে। লাইভ ড্যাশবোর্ডে নিয়মিত কাজের এক্সেস পেতে আপনার আইডি একটিভ করুন।
                  </p>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-400">
                কোর্সের পূর্ণাঙ্গ ভিডিও টিউটোরিয়াল ও লাইভ সাপোর্ট এক্সেস
              </span>
              <button
                onClick={onOpenActivation}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <span>মেম্বারশিপ একটিভ করুন (৪৯৯৳) →</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
