import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
}

export const ActivationModal: React.FC<ActivationModalProps> = ({ isOpen, onClose, currentPrice }) => {
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const PAYMENT_NUMBER = "01600602084";

  const handleCopy = () => {
    navigator.clipboard.writeText(PAYMENT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const message = `Hello Unity Earning Team,\nI have completed my membership payment!\n\n📌 *Member Details:*\n- Name: ${name || 'N/A'}\n- Phone: ${phone || 'N/A'}\n- Payment Method: ${method}\n- Transaction ID: ${trxId || 'N/A'}\n- Package: Unity Earning Special Offer (${currentPrice} Tk)\n- Cashback Request: ${currentPrice === 599 ? 400 : 300} Tk Instant Cashback\n\nPlease activate my account ID as soon as possible. Thank you!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/8801600602084?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#130f26] border border-white/15 rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl relative overflow-hidden text-white">
        
        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-amber-400 to-emerald-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">আইডি এক্টিভেশন ফর্ম</h3>
            <p className="text-xs text-gray-300">Unity Earning - {currentPrice} টাকা পেমেন্ট ভেরিফিকেশন</p>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            {/* Step 1: Payment Method */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                ১. পেমেন্ট মেথড নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['bKash', 'Nagad', 'Rocket'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      method === m
                        ? m === 'bKash'
                          ? 'bg-pink-600/20 border-pink-500 text-pink-300'
                          : m === 'Nagad'
                          ? 'bg-orange-600/20 border-orange-500 text-orange-300'
                          : 'bg-purple-600/20 border-purple-500 text-purple-300'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {m === 'bKash' ? 'বিকাশ' : m === 'Nagad' ? 'নগদ' : 'রকেট'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Payment Number Box */}
            <div className="bg-[#1a1533] p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px]">আমাদের পার্সোনাল নম্বর:</span>
                  <strong className="text-amber-300 text-sm font-mono">{PAYMENT_NUMBER}</strong>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'কপি হয়েছে' : 'নম্বর কপি'}</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                💡 বিকাশ/নগদ/রকেটের <strong className="text-emerald-300">"Send Money"</strong> অপশন থেকে {currentPrice} টাকা সেন্ড করুন।
              </p>
            </div>

            {/* Step 3: Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  আপনার নাম:
                </label>
                <input
                  type="text"
                  placeholder="যেমন: মো: রহিম আহমেদ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1533] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  আপনার ফোন নম্বর:
                </label>
                <input
                  type="tel"
                  placeholder="যেমন: 01700000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1a1533] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  পেমেন্ট ট্রানজেকশন আইডি (TrxID):
                </label>
                <input
                  type="text"
                  placeholder="যেমন: 9J87XX321"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-[#1a1533] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Cashback reminder */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>আইডি একটিভ হলেই ইনস্ট্যান্ট <strong>৩০০ টাকা ক্যাশব্যাক</strong> প্রদান করা হবে!</span>
            </div>

            {/* Submit Action Button */}
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>হোয়াটসঅ্যাপে তথ্য পাঠান ও আইডি এক্টিভ করুন →</span>
            </button>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-white">মেসেজ পাঠানো হয়েছে!</h4>
              <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
                আমাদের সাপোর্ট টিম আপনার ট্রানজেকশন আইডি দেখে ১০ মিনিটের মধ্যে আইডি এক্টিভ করে ৩০০ টাকা ক্যাশব্যাক প্রদান করবে।
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl"
            >
              ঠিক আছে
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
