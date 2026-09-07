import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Save, ShieldAlert, Sliders, Calendar, Zap, Check } from 'lucide-react';
import {
  PricingSettings,
  loadPricingSettings,
  savePricingSettings,
  getAutoPriceForDate,
  getBengaliDayName,
  isSpecialWeekend
} from '../utils/pricing';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  onUpdatePrice: (newPrice: number, settings?: PricingSettings) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, currentPrice, onUpdatePrice }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isAutoPricing, setIsAutoPricing] = useState<boolean>(true);
  const [manualPrice, setManualPrice] = useState<number>(currentPrice);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const settings = loadPricingSettings();
      setIsAutoPricing(settings.isAutoPricing);
      setManualPrice(settings.manualPrice || currentPrice);
    }
  }, [isOpen, currentPrice]);

  if (!isOpen) return null;

  const ADMIN_PASS = '212650';

  const todayDate = new Date();
  const todayDayName = getBengaliDayName(todayDate);
  const isWeekend = isSpecialWeekend(todayDate);
  const autoCalculatedTodayPrice = getAutoPriceForDate(todayDate);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADMIN_PASS) {
      setIsAuthenticated(true);
      setErrorMsg('');
      const settings = loadPricingSettings();
      setIsAutoPricing(settings.isAutoPricing);
      setManualPrice(settings.manualPrice || currentPrice);
    } else {
      setErrorMsg('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড (212650) দিন।');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const newSettings: PricingSettings = {
      isAutoPricing,
      manualPrice
    };
    savePricingSettings(newSettings);

    const effectivePrice = isAutoPricing ? autoCalculatedTodayPrice : manualPrice;
    onUpdatePrice(effectivePrice, newSettings);
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setPassword('');
    setIsAuthenticated(false);
    setErrorMsg('');
    setSaveSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-['Hind_Siliguri']">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative overflow-hidden text-slate-900 max-h-[90vh] overflow-y-auto">
        
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
                <p className="text-xs text-slate-500 font-medium">অটোমেটিক ক্যালেন্ডার ও প্রাইসিং কন্ট্রোল</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  সিক্রেট পাসওয়ার্ড:
                </label>
                <input
                  type="password"
                  placeholder="পাসওয়ার্ড টাইপ করুন..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors shadow-2xs placeholder:text-slate-400"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-xl flex items-center gap-2 font-medium">
                  <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                লগইন করুন (Login) →
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-2xs">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">অটোমেটিক প্রাইসিং সেটিংস</h3>
                <p className="text-xs text-emerald-700 font-bold">ক্যালেন্ডার অনুযায়ী স্বয়ংক্রিয় অফার রেট</p>
              </div>
            </div>

            {/* Auto Mode ON/OFF Switch */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isAutoPricing ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">অটোমেটিক ক্যালেন্ডার প্রাইসিং</h4>
                    <p className="text-[11px] text-slate-500">দিন অনুযায়ী স্বয়ংক্রিয়ভাবে দাম নির্ধারণ</p>
                  </div>
                </div>

                {/* Toggle Button */}
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

              {/* Status Badge and Details */}
              {isAutoPricing ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      অটো প্রাইসিং একটিভ (ON)
                    </span>
                    <span className="text-[11px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-md">
                      আজ: {todayDayName} ({autoCalculatedTodayPrice}৳)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className={`p-2.5 rounded-lg border ${isWeekend ? 'bg-white border-emerald-400 shadow-2xs ring-1 ring-emerald-400' : 'bg-white/60 border-slate-200'}`}>
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>শুক্র ও শনিবার</span>
                        {isWeekend && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded font-black">আজ সক্রিয়</span>}
                      </div>
                      <div className="text-base font-black text-blue-600 mt-1">৪৯৯ ৳</div>
                      <div className="text-[10px] text-slate-500">উইকএন্ড স্পেশাল অফার</div>
                    </div>

                    <div className={`p-2.5 rounded-lg border ${!isWeekend ? 'bg-white border-emerald-400 shadow-2xs ring-1 ring-emerald-400' : 'bg-white/60 border-slate-200'}`}>
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>বাকি ৫ দিন (রবি-বৃহস্পতি)</span>
                        {!isWeekend && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded font-black">আজ সক্রিয়</span>}
                      </div>
                      <div className="text-base font-black text-slate-800 mt-1">৫৯৯ ৳</div>
                      <div className="text-[10px] text-slate-500">রেগুলার অফার প্রাইস</div>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-600 leading-tight">
                    💡 <strong>স্বয়ংক্রিয় সিস্টেম:</strong> অ্যাডমিন থেকে হাত দিয়ে পরিবর্তন করতে হবে না। প্রতি শুক্রবার ও শনিবার স্বয়ংক্রিয়ভাবে ৪৯৯৳ এবং বাকি ৫ দিন ৫৯৯৳ সব জায়গায় শো করবে।
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>ম্যানুয়াল মোড (অটো প্রাইসিং বন্ধ)</span>
                  </div>
                  
                  <p className="text-[11px] text-slate-600">
                    ম্যানুয়ালি যেকোনো নির্দিষ্ট অফার রেট ফিক্সড রাখতে নিচের বাটন থেকে নির্বাচন করুন:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {[499, 599, 650, 750].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setManualPrice(p)}
                        className={`p-2.5 rounded-xl text-xs font-extrabold border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          manualPrice === p
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-sm font-black">{p} ৳</span>
                        <span className={`text-[10px] font-normal ${manualPrice === p ? 'text-blue-100' : 'text-slate-500'}`}>
                          {p === 499 ? 'শুক্র-শনি রেট' : p === 599 ? 'অন্য ৫ দিন রেট' : `${p} Tk Package`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-3.5">
              {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-2.5 rounded-xl flex items-center gap-2 animate-fade-in font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    সফলভাবে সেভ হয়েছে! বর্তমানে {isAutoPricing ? `অটো মোডে (${autoCalculatedTodayPrice}৳)` : `ম্যানুয়াল মোডে (${manualPrice}৳)`} সক্রিয় রয়েছে।
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
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save সেভ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
