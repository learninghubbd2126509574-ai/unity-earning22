import React, { useState, useMemo } from 'react';
import { COURSES_DATA } from '../data/platformData';
import { Course } from '../types';
import { 
  BookOpen, 
  CheckCircle, 
  Send, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Search, 
  Layers, 
  TrendingUp, 
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import { triggerSuccessFeedback } from '../utils/confettiFeedback';

interface CourseCatalogProps {
  onOpenActivation: () => void;
  selectedCourseId?: string;
  currentPrice?: number;
  availableSeats?: number;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ 
  onOpenActivation, 
  selectedCourseId,
  currentPrice = 599,
  availableSeats = 41
}) => {
  const [activeCourse, setActiveCourse] = useState<Course>(() => {
    return COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userPracticeInput, setUserPracticeInput] = useState<string>('');
  const [taskSubmitted, setTaskSubmitted] = useState<boolean>(false);

  // Sync if selectedCourseId changes from outside
  React.useEffect(() => {
    if (selectedCourseId) {
      const found = COURSES_DATA.find(c => c.id === selectedCourseId);
      if (found) {
        setActiveCourse(found);
        setTaskSubmitted(false);
        setUserPracticeInput('');
      }
    }
  }, [selectedCourseId]);

  const categories = [
    { id: 'all', label: 'সব কোর্স' },
    { id: 'data', label: 'ডাটা ও টাইপিং' },
    { id: 'marketing', label: 'মার্কেটিং ও সেলস' },
    { id: 'creative', label: 'ক্রিয়েটিভ ও ডিজাইন' },
    { id: 'media', label: 'মিডিয়া ও কন্টেন্ট' },
  ];

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // Category filter
      let matchesCat = true;
      if (selectedCategory === 'data') {
        matchesCat = ['form-filling', 'data-entry', 'typing-job'].includes(course.id);
      } else if (selectedCategory === 'marketing') {
        matchesCat = ['product-selling', 'email-marketing', 'sim-offer-selling', 'digital-marketing'].includes(course.id);
      } else if (selectedCategory === 'creative') {
        matchesCat = ['photo-editing', 'graphic-design'].includes(course.id);
      } else if (selectedCategory === 'media') {
        matchesCat = ['video-editing', 'content-writing', 'social-media-management'].includes(course.id);
      }

      // Search filter
      const matchesSearch = 
        course.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPracticeInput.trim()) return;
    setTaskSubmitted(true);
    triggerSuccessFeedback({ x: 0.5, y: 0.5 });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 font-['Hind_Siliguri']">
      
      {/* Section Header */}
      <MotionReveal distance={16} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315CF5] mb-2 bg-[#EEF3FF] px-3 py-1 rounded-full border border-[#D0DCFD]">
          <BookOpen className="w-4 h-4 text-[#315CF5]" />
          <span>{COURSES_DATA.length}টি প্রফেশনাল স্কিল কোর্স ও জব ট্রেইনিং</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#101828] tracking-tight">
          উপলব্ধ কোর্স ও লাইভ ট্রেইনিং ক্যাটালগ
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] mt-2 font-normal leading-relaxed">
          প্রতিটি কোর্স সহজ বাংলায় হাতে-কলমে প্র্যাক্টিক্যাল মডিউল দিয়ে সাজানো। এক মেম্বারশিপেই আনলক করুন ১২টি পূর্ণাঙ্গ কোর্স।
        </p>
      </MotionReveal>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#315CF5] text-white border-[#315CF5] shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-[#667085] hover:text-[#101828] border-[#E4E7EC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কোর্স বা স্কিল খুঁজুন..."
            className="w-full bg-white border border-[#E4E7EC] rounded-xl pl-9 pr-3 py-2 text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#315CF5] transition-all font-medium"
          />
        </div>
      </div>

      {/* Two-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (5 Cols): Responsive Course Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-[#667085] font-semibold">
            <span>কোর্স সিলেক্ট করে বিস্তারিত দেখুন:</span>
            <span>{filteredCourses.length}টি কোর্স দৃশ্যমান</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredCourses.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#E4E7EC] text-xs text-[#667085]">
                কোন কোর্স পাওয়া যায়নি। অন্য ক্যাটাগরি বা কি-ওয়ার্ড নির্বাচন করুন।
              </div>
            ) : (
              filteredCourses.map((course) => {
                const isSelected = activeCourse.id === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setActiveCourse(course);
                      setTaskSubmitted(false);
                      setUserPracticeInput('');
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-white border-[#315CF5] shadow-md ring-2 ring-[#315CF5]/20'
                        : 'bg-white hover:bg-slate-50 border-[#E4E7EC] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-[#F6F8FC] border border-[#E4E7EC] shrink-0">
                          {course.icon}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-[#101828] truncate flex items-center gap-1.5">
                            <span>{course.titleBn}</span>
                            <span className="text-[11px] font-normal text-[#667085]">({course.titleEn})</span>
                          </h4>
                          <span className="text-[10px] font-semibold text-[#315CF5] bg-[#EEF3FF] px-2 py-0.5 rounded-md inline-block mt-1">
                            {course.category}
                          </span>
                          <p className="text-[11px] text-[#667085] mt-1.5 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Footer: Course Duration, Lesson Count & Seats */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#667085] flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-[#101828] font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#315CF5]" />
                          <span>সময়কাল: {course.duration}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#667085]">
                          <Layers className="w-3.5 h-3.5" />
                          <span>{course.lessonCount}টি লেসন</span>
                        </span>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected 
                          ? 'bg-[#315CF5] text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isSelected ? 'নির্বাচিত' : 'বিস্তারিত'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (7 Cols): Detailed View, Curriculum & Practice Simulator */}
        <div className="lg:col-span-7">
          <MotionReveal distance={20} className="card-premium bg-white rounded-2xl p-5 sm:p-7 border border-[#E4E7EC] space-y-5 shadow-sm">
            
            {/* Active Course Banner */}
            <div className="bg-gradient-to-br from-[#F8FAFC] via-[#EEF3FF]/40 to-white p-4 sm:p-5 rounded-2xl border border-[#D0DCFD]">
              <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl sm:text-4xl p-2.5 bg-white rounded-2xl border border-[#E4E7EC] shadow-2xs shrink-0">
                    {activeCourse.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CF5] bg-[#EEF3FF] px-2 py-0.5 rounded-md">
                      {activeCourse.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-[#101828] mt-1 flex items-center gap-2">
                      {activeCourse.titleBn}
                      <span className="text-xs text-[#667085] font-semibold">({activeCourse.titleEn})</span>
                    </h3>
                    <div className="text-xs text-[#079669] font-bold mt-1 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#079669]" />
                      <span>দৈনিক সম্ভাব্য ইনকাম: <strong>{activeCourse.dailyEarningEst}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-1.5 shrink-0 text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#101828] bg-white px-2.5 py-1 rounded-xl border border-[#E4E7EC]">
                    <Clock className="w-3.5 h-3.5 text-[#315CF5]" />
                    <span>কোর্স সময়কাল: {activeCourse.duration}</span>
                  </span>
                  <span className="text-[11px] text-[#667085] font-semibold">
                    মোট {activeCourse.lessonCount}টি প্র্যাক্টিক্যাল ক্লাস
                  </span>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div>
              <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-1.5">কোর্স ওভারভিউ:</h4>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed font-normal">
                {activeCourse.description}
              </p>
            </div>

            {/* Curriculum Modules */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                  কোর্স মডিউল ও প্র্যাক্টিক্যাল সিলেবাস:
                </h4>
                <span className="text-[11px] text-[#315CF5] font-bold">
                  {activeCourse.modules.length}টি প্রধান অধ্যায়
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCourse.modules.map((mod, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E4E7EC] flex items-start gap-2.5 text-xs text-[#101828] hover:border-[#315CF5]/40 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-[#079669] shrink-0 mt-0.5" />
                    <span className="font-semibold leading-snug">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo Task Practice Simulator */}
            <div className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-[#E4E7EC]">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-xs font-bold text-[#315CF5] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#315CF5]" />
                  <span>ডেমো প্র্যাকটিস টাস্ক সিমুলেটর: {activeCourse.sampleTask.title}</span>
                </span>
                <span className="text-[10px] text-[#079669] font-bold bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-md">
                  লাইভ টেস্ট
                </span>
              </div>

              <p className="text-xs text-[#667085] mb-3 font-medium leading-relaxed">
                {activeCourse.sampleTask.description}
              </p>

              {taskSubmitted ? (
                <div className="bg-[#ECFDF5] p-3.5 sm:p-4 rounded-xl border border-[#A7F3D0] text-[#065F46] text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#079669] shrink-0" />
                    <span>
                      <strong>চমৎকার পারফরম্যান্স!</strong> আপনার ডেমো টাস্কটি সফলভাবে যাচাই করা হয়েছে। ({activeCourse.sampleTask.reward})
                    </span>
                  </div>
                  <button
                    onClick={() => { setTaskSubmitted(false); setUserPracticeInput(''); }}
                    className="btn-secondary h-8 px-3 text-[11px] font-bold shrink-0 cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>পুনরায় চেষ্টা</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTaskSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    value={userPracticeInput}
                    onChange={(e) => setUserPracticeInput(e.target.value)}
                    placeholder={activeCourse.sampleTask.placeholder}
                    className="w-full bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#315CF5] transition-all font-medium border border-[#E4E7EC]"
                  />
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] text-[#667085]">
                      টাস্ক রিওয়ার্ড: <strong className="text-[#079669]">{activeCourse.sampleTask.reward}</strong>
                    </span>
                    <button
                      type="submit"
                      disabled={!userPracticeInput.trim()}
                      className="btn-primary h-9 px-4 text-xs font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>টাস্ক সাবমিট করুন</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Callout CTA with Total Seats & Price Note */}
            <div className="bg-gradient-to-r from-[#EEF3FF] via-white to-[#EEF3FF] rounded-2xl p-4 sm:p-5 border border-[#D0DCFD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-[#101828]">
                    এই কোর্স সহ ১২টি পূর্ণাঙ্গ কোর্স আনলক করুন
                  </h4>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 font-mono">
                    Total Seats: {availableSeats}
                  </span>
                </div>
                <p className="text-[11px] text-[#667085] font-normal mt-1">
                  এককালীন মাত্র <strong className="text-[#315CF5] font-bold">৳{currentPrice}</strong> টাকা এডমিশন ফি দিয়ে আজীবন সব ক্লাসের অ্যাক্সেস নিন।
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenActivation}
                className="btn-primary w-full sm:w-auto h-11 px-5 text-xs sm:text-sm font-black cursor-pointer whitespace-nowrap shrink-0 shadow-md hover:shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>আইডি অ্যাক্টিভ করুন</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </MotionReveal>
        </div>

      </div>
    </section>
  );
};
