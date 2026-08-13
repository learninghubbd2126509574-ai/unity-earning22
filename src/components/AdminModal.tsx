import React, { useState } from 'react';
import { X, Lock, CheckCircle2, Save, ShieldAlert, Sliders } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  onUpdatePrice: (newPrice: number) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, currentPrice, onUpdatePrice }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedPrice, setSelectedPrice] = useState<number>(currentPrice);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const ADMIN_PASS = '212650';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADMIN_PASS) {
      setIsAuthenticated(true);
      setErrorMsg('');
      setSelectedPrice(currentPrice);
    } else {
      setErrorMsg('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড (212650) দিন।');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePrice(selectedPrice);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#130f26] border border-indigo-500/40 rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden text-white">
        
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="space-y-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">অ্যাডমিন প্যানেল লগইন</h3>
                <p className="text-xs text-gray-400">মেম্বারশিপ ফি পরিবর্তন করার প্যানেল</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
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
                  className="w-full bg-[#1a1533] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs p-2.5 rounded-xl flex items-center gap-2 font-medium">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 animate-bounce" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                লগইন করুন (Login) →
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">মেম্বারশিপ প্রাইসিং এডমিন প্যানেল</h3>
                <p className="text-xs text-emerald-400 font-semibold">দাম পরিবর্তনের অপশন</p>
              </div>
            </div>

            <div className="bg-[#1a1533] p-4 rounded-xl border border-white/10 space-y-3">
              <label className="block text-xs font-extrabold text-amber-300 uppercase tracking-wide">
                অফার অ্যামাউন্ট নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPrice(499)}
                  className={`p-3 rounded-xl text-xs font-extrabold border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selectedPrice === 499
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/40 scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-base">৪৯৯৳</span>
                  <span className="text-[10px] text-indigo-200 font-normal">(499 Tk Package)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPrice(599)}
                  className={`p-3 rounded-xl text-xs font-extrabold border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selectedPrice === 599
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/40 scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-base">৫৯৯৳</span>
                  <span className="text-[10px] text-indigo-200 font-normal">(599 Tk Package)</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-3.5">
              {saveSuccess && (
                <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs p-2.5 rounded-xl flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>সফলভাবে সেভ হয়েছে! বাহিরে এখন {selectedPrice}৳ দেখাচ্ছে।</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  বন্ধ করুন
                </button>

                <button
                  type="submit"
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
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
