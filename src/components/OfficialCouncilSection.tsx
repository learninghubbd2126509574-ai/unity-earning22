import React from 'react';
import { ShieldCheck, CheckCircle2, MessageSquare, Award, Star, ExternalLink, Send } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  badge: string;
  badgeColor: string;
  avatarUrl: string;
  experience: string;
  bio: string;
  telegramUsername: string;
  verified: boolean;
}

export const OfficialCouncilSection: React.FC = () => {
  const TELEGRAM_BASE = "https://t.me/unityearning12";

  const councilMembers: TeamMember[] = [
    {
      id: 'community-lead',
      name: 'Tanvir Hossain',
      role: 'Community Lead & Operations Head',
      department: 'Community Management',
      badge: 'Community Lead',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
      experience: '4+ Years in Freelancing Ops',
      bio: 'Leading official student groups, daily task distributions, and 24/7 community moderation.',
      telegramUsername: '@unityearning12',
      verified: true,
    },
    {
      id: 'sub-admin',
      name: 'Sabbir Ahmed',
      role: 'Official Sub-Admin Account',
      department: 'Platform Administration',
      badge: 'Sub-Admin Account',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
      experience: 'Executive Support Lead',
      bio: 'Handles instant ID activations, verification security, and payment audit coordination.',
      telegramUsername: '@unityearning12',
      verified: true,
    },
    {
      id: 'council-advisor',
      name: 'Dr. Farhana Yasmin',
      role: 'Senior Career Counselor & Advisory Council',
      department: 'Student Advisory Board',
      badge: 'Advisory Council',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
      experience: 'Senior Education Specialist',
      bio: 'Provides specialized career guidance, skills evaluation, and student development council.',
      telegramUsername: '@unityearning12',
      verified: true,
    },
    {
      id: 'master-trainer',
      name: 'Rashedul Karim',
      role: 'Head of Course Curriculum & Mentorship',
      department: 'E-Learning & Training',
      badge: 'Master Trainer (16+ Courses)',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
      experience: 'Top Rated Freelancer',
      bio: 'Direct instructor for Data Entry, Form Fill-up, Micro-tasks, and Digital Marketing workflows.',
      telegramUsername: '@unityearning12',
      verified: true,
    },
    {
      id: 'finance-lead',
      name: 'Mahmudul Hasan',
      role: 'Cashback & Payment Audit Lead',
      department: 'Finance & Verification',
      badge: 'Financial Desk',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80',
      experience: 'Instant Settlement Specialist',
      bio: 'Verifies bKash, Nagad, Rocket, and Upay transaction IDs for guaranteed ৳300 instant cashback.',
      telegramUsername: '@unityearning12',
      verified: true,
    },
    {
      id: 'student-success',
      name: 'Nusrat Jahan',
      role: 'Student Onboarding & Success Manager',
      department: 'Student Relations',
      badge: 'Success Manager',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80',
      experience: 'New Member Coordinator',
      bio: 'Guides beginner freelancers from their first day of enrollment to daily earnings milestones.',
      telegramUsername: '@unityearning12',
      verified: true,
    }
  ];

  return (
    <section className="py-10 sm:py-14 font-['Hind_Siliguri']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 text-xs font-semibold text-blue-300 mb-2.5 border border-blue-800/80 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>ভেরিফায়েড প্ল্যাটফর্ম লিডারশিপ • VERIFIED LEADERSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Hind_Siliguri']">
            অফিশিয়াল কাউন্সিল ও লিডারশিপ টিম
          </h2>
          <p className="text-xs sm:text-sm text-blue-300 font-medium font-['Outfit'] mt-0.5">
            Official Council & Executive Platform Administration Team
          </p>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal font-['Hind_Siliguri']">
            আমাদের অফিশিয়াল স্টুডেন্ট কমিউনিটি, কোর্স কাউন্সিল, সাব-এডমিন এবং সার্বক্ষণিক ভেরিফাইড সাপোর্ট পরিচালনাকারী টিম।
          </p>
        </div>

        {/* 6-Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {councilMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Avatar + Status + Badge */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    {member.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-2xs border border-white" title="Verified Official">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${member.badgeColor}`}>
                        {member.badge}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate mt-1 flex items-center gap-1">
                      <span>{member.name}</span>
                    </h3>
                    <p className="text-xs text-indigo-700 font-medium truncate">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio & Details */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3">
                  {member.bio}
                </p>

                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between text-[11px] text-slate-600 mb-3">
                  <span className="font-medium text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-800">{member.department}</span>
                </div>
              </div>

              {/* Telegram Contact Link */}
              <a
                href={TELEGRAM_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-indigo-600" />
                <span>Contact via Telegram ({member.telegramUsername})</span>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-8 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50/60 rounded-2xl p-4 border border-indigo-100/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                100% Verified Community & Anti-Scam Protection
              </p>
              <p className="text-[11px] text-slate-600 font-normal">
                Never send payments to unauthorized third-party numbers. Only trust official numbers listed on this page.
              </p>
            </div>
          </div>
          <a
            href={TELEGRAM_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn-primary text-xs font-bold py-2 px-4 rounded-xl shrink-0 inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Join Official Telegram Channel</span>
          </a>
        </div>

      </div>
    </section>
  );
};
