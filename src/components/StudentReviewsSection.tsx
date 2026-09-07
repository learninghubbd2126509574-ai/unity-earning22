import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Send, CheckCircle2, Sparkles, Star, User, ShieldCheck } from 'lucide-react';
import { StudentReview, INITIAL_STUDENT_REVIEWS } from '../data/reviewsData';
import { triggerSuccessFeedback } from '../utils/confettiFeedback';

const LOCAL_STORAGE_REVIEWS_KEY = 'unity_student_reviews_v2';

export function StudentReviewsSection() {
  const [reviews, setReviews] = useState<StudentReview[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_STUDENT_REVIEWS;
  });

  const [authorName, setAuthorName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Save to local storage whenever reviews change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
    } catch {
      // fallback
    }
  }, [reviews]);

  // Gentle auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleScroll = (direction: 'left' | 'right') => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const getInitials = (nameStr: string) => {
    const trimmed = nameStr.trim();
    if (!trimmed) return 'আ';
    const parts = trimmed.split(' ');
    if (parts.length > 1) {
      return parts[0].substring(0, 2);
    }
    return trimmed.substring(0, 2);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const name = authorName.trim() || 'শিক্ষার্থী মেম্বার';
    const initials = getInitials(name);

    const isCashbackMention = newComment.includes('ক্যাশব্যাক') || newComment.includes('টাকা') || newComment.includes('বিকাশ');
    const isQuestion = newComment.includes('?') || newComment.includes('কি') || newComment.includes('কীভাবে') || newComment.includes('কী');

    const brandNewReview: StudentReview = {
      id: `rev-custom-${Date.now()}`,
      name: name,
      initials: initials,
      rating: 5,
      timeAgo: 'এইমাত্র',
      comment: newComment.trim(),
      tag: isQuestion ? 'প্রশ্ন ও মতামত' : isCashbackMention ? 'মেম্বার মতামত' : 'সফল অভিজ্ঞতা',
      verifiedCashback: isCashbackMention,
      isQuestion: isQuestion
    };

    // Add to reviews feed seamlessly (appended smoothly into feed)
    setReviews(prev => [brandNewReview, ...prev]);
    setNewComment('');
    setAuthorName('');
    setSubmittedToast(true);

    triggerSuccessFeedback({ x: 0.5, y: 0.6 });

    // Scroll to start of carousel to reveal new comment
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 200);

    setTimeout(() => {
      setSubmittedToast(false);
    }, 3500);
  };

  return (
    <section id="reviews-section" className="py-10 sm:py-14 font-['Hind_Siliguri']">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Neumorphic) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-inset-sm text-xs font-bold text-blue-700 mb-3 border border-blue-200/50">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>লাইভ ফিডব্যাক ও অভিজ্ঞতা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2C3E50] tracking-tight">
            সফল শিক্ষার্থীদের মতামত
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            আমাদের প্ল্যাটফর্মের ৬৩,৫০০+ শিক্ষার্থীদের বাস্তব অভিজ্ঞতা, প্রশ্নোত্তর ও আয়ের প্রমাণসমূহ
          </p>
        </div>

        {/* Carousel Container with Neumorphic Controls */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full neu-btn flex items-center justify-center text-slate-700 hover:text-blue-600 transition-all cursor-pointer border border-white/60"
            aria-label="Previous Reviews"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full neu-btn flex items-center justify-center text-slate-700 hover:text-blue-600 transition-all cursor-pointer border border-white/60"
            aria-label="Next Reviews"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontal Scrollable Feed (Left-to-Right Carousel) */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={() => setIsAutoScrolling(false)}
            className="flex gap-4 sm:gap-5 overflow-x-auto py-4 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-none w-[275px] sm:w-[315px] neu-flat rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-white/60 snap-start transition-transform hover:-translate-y-1 duration-200"
              >
                <div>
                  {/* Card Header: Avatar Placeholder (Initials only) + User Info */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Neumorphic Circular Avatar Placeholder (NO Photos, Initials only) */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full neu-inset flex items-center justify-center text-blue-700 font-black text-sm sm:text-base border border-white/80 shrink-0 select-none shadow-xs">
                      {rev.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {rev.name}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[10px] text-slate-500 font-medium">
                          {rev.timeAgo}
                        </span>
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal min-h-[58px]">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Card Footer: Tags & Badges */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  {rev.tag && (
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      rev.verifiedCashback
                        ? 'bg-emerald-100 text-emerald-800 neu-inset-sm'
                        : rev.isQuestion
                        ? 'bg-blue-100 text-blue-800 neu-inset-sm'
                        : 'bg-slate-100 text-slate-700 neu-inset-sm'
                    }`}>
                      {rev.tag}
                    </span>
                  )}
                  {rev.verifiedCashback && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>ক্যাশব্যাক ভেরিফাইড</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicator & Total Stats */}
        <div className="flex items-center justify-between mt-4 px-2 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>মোট {reviews.length} টি ভেরিফাইড রিভিউ সক্রিয়</span>
          </div>
          <span className="text-[11px] text-slate-500">
            👈 স্ক্রল করে আরও দেখুন 👉
          </span>
        </div>

        {/* Neumorphic Comment Input Section (Below carousel) */}
        <div className="mt-8 sm:mt-12 neu-flat rounded-3xl p-5 sm:p-7 border border-white/80 relative">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full neu-inset flex items-center justify-center text-blue-600">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                আপনার মতামত বা প্রশ্ন লিখুন
              </h3>
              <p className="text-[11px] text-slate-500">
                আপনার অভিজ্ঞতা সরাসরি শেয়ার করুন, এটি সাথে সাথে মতামত ফিডে যুক্ত হবে
              </p>
            </div>
          </div>

          {submittedToast && (
            <div className="mb-4 p-3 neu-flat-sm rounded-xl border border-emerald-300/80 bg-emerald-50/70 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ধন্যবাদ! আপনার মতামতটি সফলভাবে রিভিউ ফিডে যুক্ত হয়েছে।</span>
            </div>
          )}

          <form onSubmit={handleAddComment} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Author Name Input */}
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  আপনার নাম (ঐচ্ছিক):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="উদাঃ তাসনিম আহমেদ"
                    className="w-full neu-inset rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium border-0"
                  />
                  <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              {/* Comment Text Field */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  আপনার মতামত বা প্রশ্ন লিখুন...
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    placeholder="আপনার মতামত বা অভিজ্ঞতা লিখুন..."
                    className="w-full neu-inset rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium border-0 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Form Action & Neumorphic Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-slate-500 font-medium text-center sm:text-left">
                🔒 সমস্ত মন্তব্য সম্মানিত কমিউনিটি গাইডলাইন অনুযায়ী ফিল্টারকৃত।
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto neu-btn-primary px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-blue-400/30 shadow-md"
              >
                <Send className="w-3.5 h-3.5 fill-white" />
                <span>মতামত প্রকাশ করুন</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
