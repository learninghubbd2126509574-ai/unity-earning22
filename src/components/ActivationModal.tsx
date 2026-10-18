import React, { useState } from 'react';
import { X, Copy, Check, Send, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { triggerSuccessFeedback, triggerPaymentSubmitSuccess } from '../utils/confettiFeedback';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  nagadNumber?: string;
  upayNumber?: string;
}

export const ActivationModal: React.FC<ActivationModalProps> = ({ 
  isOpen, 
  onClose, 
  currentPrice,
  nagadNumber = '01339786909',
  upayNumber = '01339786909'
}) => {
  const [method, setMethod] = useState<'Nagad' | 'Upay' | 'bKash'>('Nagad');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedPlatform, setSubmittedPlatform] = useState<'whatsapp' | 'telegram'>('whatsapp');

  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";

  if (!isOpen) return null;

  const getPaymentNumber = () => {
    switch (method) {
      case 'Nagad': return nagadNumber;
      case 'Upay': return upayNumber;
      case 'bKash': return '(ভিডিও নির্দেশিকা দেখুন)';
      default: return nagadNumber;
    }
  };

  const currentPaymentNumber = getPaymentNumber();

  const handleSelectMethod = (m: 'Nagad' | 'Upay' | 'bKash') => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101828]/60 backdrop-blur-xs font-['Hind_Siliguri']">
      <div className="bg-white border border-[#E4E7EC] rounded-2xl w-full max-w-md p-6 sm:p-7 shadow-xl relative overflow-hidden text-[#101828] max-h-[90vh] overflow-y-auto">
        
        {/* Top bar accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#315CF5]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-secondary absolute top-4 right-4 w-8 h-8 rounded-lg p-0 cursor-pointer"
        >
          <X className="w-4 h-4 text-[#667085]" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] flex items-center justify-center text-[#315CF5] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#101828] tracking-tight">আইডি এক্টিভেশন ফর্ম</h3>
            <p className="text-xs text-[#667085] font-normal">Unity Earning - {currentPrice}৳ পেমেন্ট ভেরিফিকেশন</p>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            {/* Step 1: Payment Method */}
            <div>
              <label className="block text-xs font-bold text-[#101828] mb-1.5 flex items-center justify-between">
                <span>১. পেমেন্ট মেথড নির্বাচন করুন:</span>
                <span className="text-[10px] text-[#315CF5] font-bold bg-[#EEF3FF] px-2 py-0.5 rounded-md border border-[#D0DCFD]">
                  {method} নির্বাচিত
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Nagad', 'Upay', 'bKash'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSelectMethod(m)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      method === m
                        ? 'bg-[#315CF5] border-[#315CF5] text-white shadow-xs'
                        : 'bg-[#F6F8FC] hover:bg-white text-[#101828] border-[#E4E7EC]'
                    }`}
                  >
                    {method === m && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{m === 'Nagad' ? 'নগদ' : m === 'Upay' ? 'উপায়' : 'বিকাশ'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Payment Number Box */}
            <div className="bg-[#F6F8FC] p-3.5 rounded-xl border border-[#E4E7EC] relative">
              {method === 'bKash' ? (
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-[#E11D48] font-bold">
                    <span>বিকাশে কোনো পার্সোনাল নম্বর নেই</span>
                  </div>
                  <p className="text-[11px] text-[#667085] leading-relaxed font-normal">
                    ওয়েবসাইটে দেওয়া বিকাশ ভিডিও গাইডটি দেখুন অথবা সহজে সরাসরি নগদ বা উপায় নম্বরে Send Money করুন।
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#667085] block text-[11px] font-normal">আমাদের {method === 'Nagad' ? 'নগদ' : 'উপায়'} পার্সোনাল নম্বর:</span>
                    <strong className="text-[#101828] text-sm font-mono tracking-wide bg-white px-2 py-0.5 rounded-lg border border-[#E4E7EC] inline-block mt-0.5">
                      {currentPaymentNumber}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn-secondary h-8 px-3 text-xs font-bold cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#079669]" />
                        <span className="text-[#079669]">কপি</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#667085]" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>
              )}
              {method !== 'bKash' && (
                <p className="text-[11px] text-[#667085] mt-2 font-normal flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315CF5] shrink-0" />
                  <span>{method === 'Nagad' ? 'নগদ' : 'উপায়'} এর <strong>"Send Money"</strong> অপশন থেকে {currentPrice} টাকা সেন্ড করুন।</span>
                </p>
              )}
            </div>

            {/* Step 3: Fill Transaction Details */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1">
                  আপনার পুরো নাম:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="উদাঃ মোঃ আশিকুর রহমান"
                  className="w-full bg-[#F6F8FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2 text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#315CF5] focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1">
                    মোবাইল নম্বর:
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-[#F6F8FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2 text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#315CF5] focus:bg-white transition-all font-mono font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1">
                    ট্রানজেকশন আইডি (TrxID):
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="উদাঃ 9H7K6L2M"
                    className="w-full bg-[#F6F8FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2 text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#315CF5] focus:bg-white transition-all font-mono uppercase font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Cashback reminder */}
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-2.5 rounded-xl text-xs text-[#065F46] flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-[#079669]" />
              <span className="font-normal">আইডি এক্টিভ হলেই নিশ্চিত <strong>৩০০ টাকা ক্যাশব্যাক</strong> প্রদান করা হবে!</span>
            </div>

            {/* Send Buttons (WhatsApp & Telegram) */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="btn-emerald w-full h-11 text-xs sm:text-sm font-bold cursor-pointer"
              >
                <WhatsAppIcon size={18} className="w-4 h-4 text-white shrink-0" />
                <span>WhatsApp সাপোর্ট ও গ্রুপে সাবমিট করুন</span>
              </button>

              <button
                type="button"
                onClick={handleSendTelegram}
                className="btn-telegram w-full h-10 text-xs font-bold cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>টেলিগ্রামে পাঠান (@unityearning12)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-[#ECFDF5] rounded-xl flex items-center justify-center mx-auto border border-[#A7F3D0] text-[#079669]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#079669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-md mb-1.5 border border-[#A7F3D0]">
                সফলভাবে তথ্য পাঠানো হয়েছে
              </span>
              <h4 className="text-lg font-bold text-[#101828]">
                {submittedPlatform === 'whatsapp' ? 'হোয়াটসঅ্যাপে সংযুক্ত হওয়া হয়েছে!' : 'টেলিগ্রামে পাঠানো হয়েছে!'}
              </h4>
              <p className="text-xs text-[#667085] mt-1.5 max-w-xs mx-auto font-normal leading-relaxed">
                আমাদের সাপোর্ট টিম আপনার ট্রানজেকশন আইডি দ্রুত ভেরিফাই করে আইডি সক্রিয় করবে এবং আপনার অ্যাকাউন্টে ৩০০ টাকা ক্যাশব্যাক যোগ করে দেবে।
              </p>
            </div>

            <div className="p-3.5 bg-[#F6F8FC] rounded-xl text-[11px] text-[#101828] text-left max-w-xs mx-auto space-y-1 border border-[#E4E7EC]">
              <div className="flex justify-between">
                <span className="text-[#667085]">প্যাকেজ:</span>
                <span className="font-bold text-[#101828]">স্পেশাল অফার ({currentPrice} ৳)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">মেথড:</span>
                <span className="font-bold text-[#101828]">{method}</span>
              </div>
              {trxId && (
                <div className="flex justify-between">
                  <span className="text-[#667085]">TrxID:</span>
                  <span className="font-bold font-mono text-[#315CF5]">{trxId}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="btn-primary h-10 px-6 text-xs font-bold cursor-pointer"
            >
              সম্পন্ন হয়েছে (ঠিক আছে)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
