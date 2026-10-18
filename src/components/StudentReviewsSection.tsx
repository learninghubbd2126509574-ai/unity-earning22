import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Send, CheckCircle2, Star, User } from 'lucide-react';
import { StudentReview, INITIAL_STUDENT_REVIEWS } from '../data/reviewsData';
import { triggerSuccessFeedback } from '../utils/confettiFeedback';
import { MotionReveal } from './MotionReveal';

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

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
    } catch {
      // fallback
    }
  }, [reviews]);

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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const name = authorName.trim() || 'শিক্ষার্থী মেম্বার';
    const newEntry: StudentReview = {
      id: `rev-${Date.now()}`,
      name,
      initials: name.substring(0, 1) || 'শ',
      rating: 5,
      timeAgo: 'এইমাত্র',
      comment: newComment.trim(),
      tag: 'ক্যাশব্যাক ভেরিফাইড',
      verifiedCashback: true,
    };

    setReviews([newEntry, ...reviews]);
    setNewComment('');
    setAuthorName('');
    setSubmittedToast(true);
    triggerSuccessFeedback({ x: 0.5, y: 0.5 });
    setTimeout(() => setSubmittedToast(false), 3500);
  };

  return (
    <section className="py-10 sm:py-14 font-['Hind_Siliguri']">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <MotionReveal distance={16} className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315CF5] mb-2">
              <MessageSquare className="w-4 h-4 text-[#315CF5]" />
              <span>বাস্তব অভিজ্ঞতা ও ফিডব্যাক</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight">
              শিক্ষার্থীদের মতামত ও রিভিউ
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1.5">
              হাজারো শিক্ষার্থী ইউনিটি আর্নিং-এ যুক্ত হয়ে ঘরে বসেই ফ্রিল্যান্সিং স্কিল শিখছেন
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="btn-secondary w-9 h-9 rounded-lg p-0 cursor-pointer"
              title="পূর্ববর্তী রিভিউ"
            >
              <ChevronLeft className="w-4 h-4 text-[#101828]" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="btn-secondary w-9 h-9 rounded-lg p-0 cursor-pointer"
              title="পরবর্তী রিভিউ"
            >
              <ChevronRight className="w-4 h-4 text-[#101828]" />
            </button>
          </div>
        </MotionReveal>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[280px] sm:min-w-[340px] max-w-[340px] card-premium p-5 sm:p-6 bg-white border border-[#E4E7EC] rounded-2xl flex flex-col justify-between shrink-0"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                  </div>
                  {rev.verifiedCashback && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#079669] bg-[#ECFDF5] px-2 py-0.5 rounded-md border border-[#A7F3D0]">
                      <CheckCircle2 className="w-3 h-3 text-[#079669]" />
                      <span>ভেরিফাইড</span>
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#101828] leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-[#667085]">
                    {rev.timeAgo}
                  </p>
                </div>
                {rev.tag && (
                  <span className="text-[11px] font-semibold text-[#315CF5] bg-[#EEF3FF] px-2 py-0.5 rounded-md">
                    {rev.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review box */}
        <MotionReveal distance={20} className="mt-8 card-premium p-6 sm:p-7 bg-white border border-[#E4E7EC] rounded-2xl max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-[#101828] mb-1">
            আপনার অভিজ্ঞতা বা মতামত শেয়ার করুন
          </h3>
          <p className="text-xs text-[#667085] mb-4">
            ইউনিটি আর্নিং প্ল্যাটফর্ম নিয়ে আপনার মূল্যবান মন্তব্য নিচে লিখে সাবমিট করুন
          </p>

          <form onSubmit={handleAddComment} className="space-y-3">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="আপনার নাম (ঐচ্ছিক)"
              className="w-full bg-[#F6F8FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2.5 text-xs text-[#101828] focus:outline-none focus:border-[#315CF5]"
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="আপনার মতামত বা অনুভূতি লিখুন..."
              rows={3}
              required
              className="w-full bg-[#F6F8FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2.5 text-xs text-[#101828] focus:outline-none focus:border-[#315CF5]"
            />
            <div className="flex items-center justify-between">
              {submittedToast ? (
                <span className="text-xs font-semibold text-[#079669]">
                  ধন্যবাদ! আপনার মন্তব্য যুক্ত হয়েছে।
                </span>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="btn-primary h-10 px-4 text-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>মতামত পোস্ট করুন</span>
              </button>
            </div>
          </form>
        </MotionReveal>

      </div>
    </section>
  );
}
