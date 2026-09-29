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
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-xs font-semibold text-indigo-800 mb-2.5 border border-indigo-200/80 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>লাইভ ফিডব্যাক ও অভিজ্ঞতা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            সফল শিক্ষার্থীদের মতামত
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal leading-relaxed">
            আমাদের প্ল্যাটফর্মের শিক্ষার্থীদের বাস্তব অভিজ্ঞতা, প্রশ্নোত্তর ও আয়ের প্রমাণসমূহ
          </p>
        </div>

        {/* Carousel Container with Controls */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all cursor-pointer border border-slate-200"
            aria-label="Previous Reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all cursor-pointer border border-slate-200"
            aria-label="Next Reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Scrollable Feed */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={() => setIsAutoScrolling(false)}
            className="flex gap-4 sm:gap-5 overflow-x-auto py-3 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-none w-[275px] sm:w-[315px] bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-slate-200 shadow-2xs snap-start transition-all hover:border-slate-300"
              >
                <div>
                  {/* Card Header: Avatar Placeholder (Initials only) + User Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0 select-none">
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
                        <span className="text-[10px] text-slate-500 font-normal">
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
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal min-h-[54px]">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Card Footer: Tags & Badges */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  {rev.tag && (
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      rev.verifiedCashback
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : rev.isQuestion
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {rev.tag}
                    </span>
                  )}
                  {rev.verifiedCashback && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
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

        {/* Comment Input Section (Below carousel) */}
        <div className="mt-8 sm:mt-10 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs relative">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                আপনার মতামত বা প্রশ্ন লিখুন
              </h3>
              <p className="text-[11px] text-slate-500 font-normal">
                আপনার অভিজ্ঞতা সরাসরি শেয়ার করুন, এটি সাথে সাথে মতামত ফিডে যুক্ত হবে
              </p>
            </div>
          </div>

          {submittedToast && (
            <div className="mb-4 p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ধন্যবাদ! আপনার মতামতটি সফলভাবে রিভিউ ফিডে যুক্ত হয়েছে।</span>
            </div>
          )}

          <form onSubmit={handleAddComment} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Author Name Input */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  আপনার নাম (ঐচ্ছিক):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="উদাঃ তাসনিম আহমেদ"
                    className="w-full bg-slate-50 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all font-medium border border-slate-200"
                  />
                  <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              {/* Comment Text Field */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  আপনার মতামত বা প্রশ্ন লিখুন...
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    placeholder="আপনার মতামত বা অভিজ্ঞতা লিখুন..."
                    className="w-full bg-slate-50 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all font-medium border border-slate-200 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Form Action & Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-slate-500 font-normal text-center sm:text-left">
                🔒 সমস্ত মন্তব্য সম্মানিত কমিউনিটি গাইডলাইন অনুযায়ী ফিল্টারকৃত।
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto neu-btn-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
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
