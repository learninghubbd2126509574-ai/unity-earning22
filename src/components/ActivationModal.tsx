import React, { useState } from 'react';
import { X, Copy, Check, Send, ShieldCheck, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { triggerSuccessFeedback, triggerPaymentSubmitSuccess } from '../utils/confettiFeedback';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
}

export const ActivationModal: React.FC<ActivationModalProps> = ({ isOpen, onClose, currentPrice }) => {
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'mCash'>('bKash');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedPlatform, setSubmittedPlatform] = useState<'whatsapp' | 'telegram'>('whatsapp');

  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";
  const TELEGRAM_LINK = "https://t.me/unityearning12";

  if (!isOpen) return null;

  const getPaymentNumber = () => {
    switch (method) {
      case 'bKash': return '01723046648';
      case 'Nagad': return '01339786909';
      case 'Rocket': return '013397869094';
      case 'Upay': return '01339786909';
      case 'mCash': return '013397869095';
      default: return '01723046648';
    }
  };

  const currentPaymentNumber = getPaymentNumber();

  const handleSelectMethod = (m: 'bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'mCash') => {
    setMethod(m);
    setCopied(false);
    triggerSuccessFeedback({ x: 0.5, y: 0.35 });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPaymentNumber);
    setCopied(true);
    triggerSuccessFeedback({ x: 0.6, y: 0.45 });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    triggerPaymentSubmitSuccess();
    setSubmittedPlatform('whatsapp');
    setSubmitted(true);
    window.open(WHATSAPP_CHANNEL_LINK, '_blank', 'noopener,noreferrer');
  };

  const handleSendTelegram = () => {
    const message = `Hello Unity Earning Team,\nI have completed my membership payment!\n\n📌 *Member Details:*\n- Name: ${name || 'N/A'}\n- Phone: ${phone || 'N/A'}\n- Payment Method: ${method}\n- Transaction ID: ${trxId || 'N/A'}\n- Package: Unity Earning Special Offer (${currentPrice} Tk)\n- Cashback Request: 300 Tk Instant Cashback\n\nPlease activate my account ID as soon as possible. Thank you!`;
    const encoded = encodeURIComponent(message);
    triggerPaymentSubmitSuccess();
    setSubmittedPlatform('telegram');
    setSubmitted(true);
    window.open(`https://t.me/unityearning12?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-['Hind_Siliguri']">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-5 sm:p-7 shadow-2xl relative overflow-hidden text-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Top bar accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-emerald-500 to-indigo-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">আইডি এক্টিভেশন ফর্ম</h3>
            <p className="text-xs text-slate-500 font-normal">Unity Earning - {currentPrice}৳ পেমেন্ট ভেরিফিকেশন</p>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            {/* Step 1: Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>১. পেমেন্ট মেথড নির্বাচন করুন:</span>
                <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  {method} নির্বাচিত
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['bKash', 'Nagad', 'Rocket', 'Upay', 'mCash'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSelectMethod(m)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      method === m
                        ? m === 'bKash'
                          ? 'bg-pink-600 border-pink-600 text-white shadow-xs'
                          : m === 'Nagad'
                          ? 'bg-orange-600 border-orange-600 text-white shadow-xs'
                          : m === 'Rocket'
                          ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                          : m === 'Upay'
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-red-600 border-red-600 text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {method === m && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{m === 'bKash' ? 'বিকাশ' : m === 'Nagad' ? 'নগদ' : m === 'Rocket' ? 'রকেট' : m === 'Upay' ? 'উপায়' : 'এম ক্যাশ'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Payment Number Box */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 relative">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px] font-normal">আমাদের {method} পার্সোনাল নম্বর:</span>
                  <strong className="text-slate-900 text-sm font-mono tracking-wide bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs inline-block mt-0.5">
                    {currentPaymentNumber}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
                    copied
                      ? 'neu-btn-emerald text-white'
                      : 'neu-btn-primary text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
                      <span>কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>নম্বর কপি</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 font-normal flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                <span>{method} এর <strong className="text-indigo-700 font-bold">"Send Money"</strong> অপশন থেকে {currentPrice} টাকা সেন্ড করুন।</span>
              </p>
            </div>

            {/* Step 3: Fill Transaction Details */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  আপনার পুরো নাম:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="উদাঃ মোঃ আশিকুর রহমান"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর:
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all font-mono font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ট্রানজেকশন আইডি (TrxID):
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="উদাঃ 9H7K6L2M"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all font-mono uppercase font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Cashback reminder */}
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-normal">আইডি এক্টিভ হলেই ইনস্ট্যান্ট <strong>৩০০ টাকা ক্যাশব্যাক</strong> প্রদান করা হবে!</span>
            </div>

            {/* Send Buttons (WhatsApp & Telegram) */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full neu-btn-emerald text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <WhatsAppIcon size={18} className="w-4 h-4 text-white shrink-0" />
                <span>হোয়াটসঅ্যাপ গ্রুপ ও চ্যানেলে সাবমিট করুন</span>
              </button>

              <button
                type="button"
                onClick={handleSendTelegram}
                className="w-full neu-btn-blue text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>টেলিগ্রামে পাঠান (@unityearning12)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto border-2 border-emerald-400 text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1.5 border border-emerald-200">
                <Sparkles className="w-3 h-3" /> সফলভাবে তথ্য পাঠানো হয়েছে
              </span>
              <h4 className="text-xl font-bold text-slate-900">
                {submittedPlatform === 'whatsapp' ? 'হোয়াটসঅ্যাপে সংযুক্ত হওয়া হয়েছে!' : 'টেলিগ্রামে পাঠানো হয়েছে!'}
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 max-w-xs mx-auto font-normal leading-relaxed">
                আমাদের সাপোর্ট টিম আপনার ট্রানজেকশন আইডি দ্রুত ভেরিফাই করে ১০ মিনিটের মধ্যে আইডি অ্যাক্টিভ করবে এবং আপনার একাউন্টে ৩০০ টাকা ক্যাশব্যাক যোগ করে দেবে।
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl text-[11px] text-slate-700 text-left max-w-xs mx-auto space-y-1 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">প্যাকেজ:</span>
                <span className="font-bold text-slate-900">স্পেশাল অফার ({currentPrice} ৳)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">মেথড:</span>
                <span className="font-bold text-slate-900">{method}</span>
              </div>
              {trxId && (
                <div className="flex justify-between">
                  <span className="text-slate-500">TrxID:</span>
                  <span className="font-bold font-mono text-indigo-600">{trxId}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="neu-btn-primary text-white text-xs font-bold px-8 py-2.5 rounded-xl cursor-pointer transition-all shadow-xs"
            >
              সম্পন্ন হয়েছে (ঠিক আছে)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
