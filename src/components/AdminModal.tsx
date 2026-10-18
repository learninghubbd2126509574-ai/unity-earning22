import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Save, Calendar, Zap, Users, Minus, Plus, Video, Phone, Play, ExternalLink, Eye, EyeOff } from 'lucide-react';
import {
  PricingSettings,
  loadPricingSettings,
  savePricingSettings,
  getAutoPriceForDate,
  getBengaliDayName,
  isSpecialWeekend,
  DEFAULT_AVAILABLE_SEATS,
  DEFAULT_VIDEO_URL,
  DEFAULT_NAGAD_NUMBER,
  DEFAULT_UPAY_NUMBER,
  extractYouTubeId,
  getYouTubeThumbnailUrl,
} from '../utils/pricing';
import { savePricingSettingsToFirestore } from '../lib/firebase';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  availableSeats?: number;
  videoUrl?: string;
  nagadNumber?: string;
  upayNumber?: string;
  onUpdatePrice: (newPrice: number, settings?: PricingSettings) => void;
  onUpdateSeats?: (seats: number) => void;
  onUpdateSettings?: (settings: PricingSettings) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ 
  isOpen, 
  onClose, 
  currentPrice, 
  availableSeats = DEFAULT_AVAILABLE_SEATS,
  videoUrl = DEFAULT_VIDEO_URL,
  nagadNumber = DEFAULT_NAGAD_NUMBER,
  upayNumber = DEFAULT_UPAY_NUMBER,
  onUpdatePrice,
  onUpdateSeats,
  onUpdateSettings
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isAutoPricing, setIsAutoPricing] = useState<boolean>(true);
  const [manualPrice, setManualPrice] = useState<number>(currentPrice);
  const [seatsCount, setSeatsCount] = useState<number>(availableSeats);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(videoUrl);
  const [currentNagad, setCurrentNagad] = useState<string>(nagadNumber);
  const [currentUpay, setCurrentUpay] = useState<string>(upayNumber);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const settings = loadPricingSettings();
      setIsAutoPricing(settings.isAutoPricing);
      setManualPrice(settings.manualPrice || currentPrice);
      setSeatsCount(settings.availableSeats ?? availableSeats);
      setCurrentVideoUrl(settings.videoUrl || videoUrl || DEFAULT_VIDEO_URL);
      setCurrentNagad(settings.nagadNumber || nagadNumber || DEFAULT_NAGAD_NUMBER);
      setCurrentUpay(settings.upayNumber || upayNumber || DEFAULT_UPAY_NUMBER);
    }
  }, [isOpen, currentPrice, availableSeats, videoUrl, nagadNumber, upayNumber]);

  if (!isOpen) return null;

  const ADMIN_PASS = '212650';

  const todayDate = new Date();
  const todayDayName = getBengaliDayName(todayDate);
  const isWeekend = isSpecialWeekend(todayDate);
  const autoCalculatedTodayPrice = getAutoPriceForDate(todayDate);

  const youtubeId = extractYouTubeId(currentVideoUrl);
  const videoThumb = getYouTubeThumbnailUrl(currentVideoUrl);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADMIN_PASS || password.trim() === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
      const settings = loadPricingSettings();
      setIsAutoPricing(settings.isAutoPricing);
      setManualPrice(settings.manualPrice || currentPrice);
      setSeatsCount(settings.availableSeats ?? availableSeats);
      setCurrentVideoUrl(settings.videoUrl || videoUrl || DEFAULT_VIDEO_URL);
      setCurrentNagad(settings.nagadNumber || nagadNumber || DEFAULT_NAGAD_NUMBER);
      setCurrentUpay(settings.upayNumber || upayNumber || DEFAULT_UPAY_NUMBER);
    } else {
      setErrorMsg('ভুল পাসওয়ার্ড! সঠিক সিক্রেট পাসওয়ার্ড দিন।');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSettings: PricingSettings = {
      isAutoPricing,
      manualPrice,
      availableSeats: seatsCount,
      videoUrl: currentVideoUrl.trim() || DEFAULT_VIDEO_URL,
      nagadNumber: currentNagad.trim() || DEFAULT_NAGAD_NUMBER,
      upayNumber: currentUpay.trim() || DEFAULT_UPAY_NUMBER,
    };
    savePricingSettings(newSettings);

    try {
      await savePricingSettingsToFirestore(newSettings);
    } catch (err) {
      console.warn('Firestore sync warning:', err);
    }

    const effectivePrice = isAutoPricing ? autoCalculatedTodayPrice : manualPrice;
    onUpdatePrice(effectivePrice, newSettings);
    if (onUpdateSeats) {
      onUpdateSeats(seatsCount);
    }
    if (onUpdateSettings) {
      onUpdateSettings(newSettings);
    }
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setPassword('');
    setShowPassword(false);
    setIsAuthenticated(false);
    setErrorMsg('');
    setSaveSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-['Hind_Siliguri']">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-5 sm:p-7 shadow-2xl relative overflow-hidden text-slate-900 max-h-[92vh] overflow-y-auto">
        
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">অ্যাডমিন প্যানেল লগইন</h3>
                <p className="text-xs text-slate-500 font-medium">ভিডিও লিংক, পেমেন্ট নম্বর, প্রাইসিং ও আসন সংখ্যা কন্ট্রোল</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  সিক্রেট অ্যাডমিন পাসওয়ার্ড / Admin ID:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="সিক্রেট পাসওয়ার্ড বা Admin ID লিখুন..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors shadow-2xs placeholder:text-slate-400"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                    title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium">
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>লগইন করুন</span>
              </button>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>শুধুমাত্র অনুমোদিত অ্যাডমিনের জন্য সংরক্ষিত</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-5 pt-2">
            
            {/* Header Title */}
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">অ্যাডমিন কন্ট্রোল সেন্টার</h3>
                  <p className="text-xs text-slate-500">ইউটিউব ভিডিও লিংক, পেমেন্ট নম্বর ও অফার সেটিংস</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ভেরিফাইড অ্যাডমিন
                </span>
              </div>
            </div>

            {/* 1. YouTube Video Setting (NEW) */}
            <div className="bg-gradient-to-br from-pink-50/70 via-rose-50/30 to-slate-50 p-4 sm:p-5 rounded-2xl border border-pink-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">বিকাশ ও এডমিশন ভিডিও (YouTube Link)</h4>
                    <p className="text-[11px] text-slate-500">ওয়েবসাইটের বিকাশ সেকশনে সরাসরি এই ভিডিওটি প্লে হবে</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ইউটিউব ভিডিও লিঙ্ক:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={currentVideoUrl}
                    onChange={(e) => setCurrentVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-pink-500 shadow-2xs font-mono"
                  />
                  {currentVideoUrl && (
                    <button
                      type="button"
                      onClick={() => setCurrentVideoUrl('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
                    >
                      মুছুন
                    </button>
                  )}
                </div>
              </div>

              {/* Live Detected Preview */}
              {youtubeId ? (
                <div className="bg-white p-3 rounded-xl border border-pink-200 flex items-center gap-3">
                  <div className="w-20 h-12 bg-slate-900 rounded-lg overflow-hidden relative shrink-0">
                    {videoThumb ? (
                      <img src={videoThumb} alt="YouTube thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <Play className="w-5 h-5 fill-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>সঠিক ইউটিউব লিংক সনাক্ত হয়েছে!</span>
                    </div>
                    <span className="text-[10px] text-slate-500 truncate block font-mono">
                      Video ID: {youtubeId}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-800 text-[11px] p-2.5 rounded-xl border border-amber-200">
                  ⚠️ যে কোনো ইউটিউব ভিডিওর লিঙ্ক পেস্ট করুন (যেমন: https://youtu.be/xxx বা https://www.youtube.com/watch?v=xxx)
                </div>
              )}
            </div>

            {/* 2. Nagad & Upay Payment Numbers */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">নগদ ও উপায় পেমেন্ট নম্বর</h4>
                  <p className="text-[11px] text-slate-500">ভিডিওর নিচে নগদ ও উপায় নম্বর হিসেবে প্রদর্শিত হবে</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    নগদ পার্সোনাল নম্বর:
                  </label>
                  <input
                    type="text"
                    value={currentNagad}
                    onChange={(e) => setCurrentNagad(e.target.value)}
                    placeholder="01339786909"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:border-orange-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    উপায় পার্সোনাল নম্বর:
                  </label>
                  <input
                    type="text"
                    value={currentUpay}
                    onChange={(e) => setCurrentUpay(e.target.value)}
                    placeholder="01339786909"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:border-orange-500 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* 3. Available Seats Control */}
            <div className="bg-amber-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Available Seats (আসন সংখ্যা)</h4>
                    <p className="text-[11px] text-slate-500">ওয়েবসাইটে ডিসপ্লে হওয়া সিট সংখ্যা</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSeatsCount(prev => Math.max(1, prev - 1))}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xl sm:text-2xl font-black text-rose-600 bg-white px-4 py-1 rounded-xl border border-rose-200 min-w-16 text-center shadow-2xs">
                    {seatsCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSeatsCount(prev => prev + 1)}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {[41, 25, 12, 5].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setSeatsCount(cnt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        seatsCount === cnt
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Pricing Mode */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isAutoPricing ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">অটোমেটিক ক্যালেন্ডার প্রাইসিং</h4>
                    <p className="text-[11px] text-slate-500">শুক্র-শনি ৪৯৯৳, বাকি ৫ দিন ৫৯৯৳</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAutoPricing(prev => !prev)}
                  className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isAutoPricing ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      isAutoPricing ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {!isAutoPricing && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                  <span className="text-xs font-bold text-amber-900 block">ম্যানুয়াল ফিক্সড রেট নির্বাচন করুন:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[499, 599, 650, 750].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setManualPrice(p)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          manualPrice === p
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {p} ৳
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-3.5">
              {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2 animate-fade-in font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    সব সেটিংস (ইউটিউব ভিডিও, পেমেন্ট নম্বর, প্রাইস ও আসন) সফলভাবে সেভ হয়েছে!
                  </span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  বন্ধ করুন
                </button>

                <button
                  type="submit"
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save সেটিংস সেভ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
