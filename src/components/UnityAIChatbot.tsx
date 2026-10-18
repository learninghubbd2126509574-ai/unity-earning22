import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Copy, Check, CornerDownLeft, RefreshCw } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface UnityAIChatbotProps {
  currentPrice: number;
  onOpenActivation: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    type: 'activate' | 'telegram' | 'whatsapp' | 'custom';
    label: string;
    payload?: string;
  }[];
}

export const UnityAIChatbot: React.FC<UnityAIChatbotProps> = ({
  currentPrice,
  onOpenActivation,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const TELEGRAM_LINK = "https://t.me/unityearning12";
  const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p";

  const getInitialMessages = (): Message[] => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `আসসালামু আলাইকুম! আমি **Unity Chat Bot** — বাংলাদেশের **১ নম্বর** বিশ্বস্ত ফ্রিল্যান্সিং ও ই-লার্নিং প্ল্যাটফর্ম **Unity Earning**-এর অফিসিয়াল অ্যাসিস্ট্যান্ট। 🌟\n\nএখানে এ পর্যন্ত **৬৩,০০০+ (৬৩ হাজার এর বেশি)** শিক্ষার্থী ও লার্নার যুক্ত হয়ে স্কিল শিখে সফলভাবে আর্নিং করছেন!\n\n🔥 **চলমান মেম্বারশিপ অফার:** মাত্র **${currentPrice} ৳** (৫৫% ডিসকাউন্ট) এবং এক্টিভ করলেই পাচ্ছেন **৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক!** 🎁`,
      timestamp: 'এখন',
      actions: [
        { type: 'activate', label: '🚀 আইডি এক্টিভেশন ডিটেইলস' },
        { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপ চ্যানেল' },
        { type: 'telegram', label: '📱 টেলিগ্রাম চ্যানেল (@unityearning12)' }
      ]
    }
  ];

  const [messages, setMessages] = useState<Message[]>(getInitialMessages);

  // Update initial message when currentPrice changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome-1') {
        return getInitialMessages();
      }
      return prev;
    });
  }, [currentPrice]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isTyping]);

  const generateAIResponse = (userQuery: string): { text: string; actions?: Message['actions'] } => {
    const q = userQuery.toLowerCase();

    // 1. Activation details & Payment method request
    if (q.includes('এক্টিভ') || q.includes('অ্যাক্টিভ') || q.includes('খুলব') || q.includes('খুলবো') || q.includes('রেজিস্ট্রেশন') || q.includes('শুরু') || q.includes('আইডি') || q.includes('কিভাবে') || q.includes('পেমেন্ট') || q.includes('বিকাশ') || q.includes('নগদ') || q.includes('রকেট') || q.includes('মেথড')) {
      return {
        text: `✅ **আইডি অ্যাক্টিভেশন ও পেমেন্ট করার নিয়ম:**\n\n১. নিরাপত্তা নিশ্চিত করতে পেমেন্ট করার অফিসিয়াল বিকাশ/নগদ/রকেট পার্সোনাল নম্বরটি আপনার **কাউন্সিলরের (Counselor)** কাছ থেকে সংগ্রহ করুন অথবা সরাসরি আমাদের **টেলিগ্রাম চ্যানেলে (@unityearning12)** কিংবা **হোয়াটসঅ্যাপ চ্যানেলে** মেসেজ দিয়ে অফিসিয়াল পেমেন্ট নম্বরটি চেয়ে নিন।\n২. কাউন্সিলরের প্রদানকৃত নম্বরে নির্ধারিত ফি (**${currentPrice} ৳**) Send Money করুন এবং Transaction ID (TrxID) সংরক্ষণ করুন।\n৩. ট্রানজেকশন আইডি পাওয়ার পর কাউন্সিলরকে পাঠান বা আমাদের ফর্মে সাবমিট করুন। মাত্র ৫-১০ মিনিটের মধ্যে আপনার আইডি সক্রিয় হয়ে যাবে এবং সাথে সাথে **৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক** পেয়ে যাবেন!`,
        actions: [
          { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপে যোগাযোগ করুন' },
          { type: 'telegram', label: '📱 টেলিগ্রামে কাউন্সিলরকে মেসেজ দিন' },
          { type: 'activate', label: '🚀 আইডি এক্টিভেশন ফর্ম' }
        ]
      };
    }

    // 2. WhatsApp query
    if (q.includes('হোয়াটসঅ্যাপ') || q.includes('হোয়াটসঅ্যাপ') || q.includes('whatsapp') || q.includes('হোয়াটস্যাপ') || q.includes('হোয়াটস্যাপ')) {
      return {
        text: `🟢 **Unity Earning অফিশিয়াল হোয়াটসঅ্যাপ চ্যানেল:**\n\nআমাদের অফিসিয়াল হোয়াটসঅ্যাপ চ্যানেলে সরাসরি যুক্ত হয়ে নিয়মিত আর্নিং আপডেট, নতুন কাজের নোটিশ ও কাউন্সিলর সাপোর্ট পেতে পারেন:\n👉 লিংক: [${WHATSAPP_CHANNEL_LINK}](${WHATSAPP_CHANNEL_LINK})\n\nনিচের বাটনে ক্লিক করে এখনই আমাদের হোয়াটসঅ্যাপ চ্যানেলে জয়েন করুন!`,
        actions: [
          { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপ চ্যানেল খুলুন' },
          { type: 'telegram', label: '📱 টেলিগ্রাম চ্যানেল' }
        ]
      };
    }

    // 3. Cashback
    if (q.includes('ক্যাশব্যাক') || q.includes('৩০০') || q.includes('300') || q.includes('cashback') || q.includes('বোনাস')) {
      return {
        text: `🎁 **৩০০ টাকা ইনস্ট্যান্ট ক্যাশব্যাক অফার:**\n\nUnity Earning-এ ${currentPrice} ৳ দিয়ে যেকোনো মেম্বারশিপ অ্যাকাউন্ট অ্যাক্টিভ করলেই সাথে সাথে **৩০০ ৳ ইনস্ট্যান্ট ক্যাশব্যাক** পেয়ে যাবেন! এই ক্যাশব্যাক আপনার একাউন্টে যুক্ত হবে এবং আপনি আপনার বিকাশ বা নগদে সরাসরি ক্যাশআউট করতে পারবেন।\n\nপেমেন্ট মেথড ও নম্বর জানতে এখনই আপনার কাউন্সিলরের সাথে কথা বলুন অথবা হোয়াটসঅ্যাপ/টেলিগ্রাম চ্যানেলে মেসেজ দিন।`,
        actions: [
          { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপ চ্যানেল' },
          { type: 'telegram', label: '📱 টেলিগ্রামে যোগাযোগ করুন' },
          { type: 'activate', label: '🚀 ক্যাশব্যাক সহ এক্টিভ করুন' }
        ]
      };
    }

    // 4. Price / Fee
    if (q.includes('ফি') || q.includes('টাকা') || q.includes('কত') || q.includes('প্রাইস') || q.includes('price') || q.includes('cost') || q.includes('চার্জ')) {
      return {
        text: `💰 **মেম্বারশিপ ফি বিস্তারিত:**\n\n• রেগুলার ফি: ৯৯৯ ৳\n• **বর্তমান অফার প্রাইস: মাত্র ${currentPrice} ৳** (৫৫% ডিসকাউন্ট চলছে!)\n• ইনস্ট্যান্ট ক্যাশব্যাক: **৩০০ ৳**\n\nঅর্থাৎ কার্যত আপনার খরচ হচ্ছে মাত্র (${currentPrice} - ৩০০) = **${currentPrice - 300} ৳**! এর মাধ্যমে ১২টি প্রফেশনাল ফ্রিল্যান্সিং ও আর্নিং কোর্সে লাইফটাইম এক্সেস ও দৈনিক কাজের সুযোগ পাচ্ছেন।\n\nপেমেন্ট করার জন্য আপনার কাউন্সিলরের কাছ থেকে অথবা হোয়াটসঅ্যাপ/টেলিগ্রাম থেকে নম্বরটি সংগ্রহ করুন।`,
        actions: [
          { type: 'whatsapp', label: `🟢 হোয়াটসঅ্যাপে পেমেন্ট মেথড নিন` },
          { type: 'telegram', label: `🔥 টেলিগ্রামে পেমেন্ট মেথড নিন` },
          { type: 'activate', label: '✨ জয়েন করুন' }
        ]
      };
    }

    // 5. Platform reputation / trusted / students
    if (q.includes('বিশ্বস্ত') || q.includes('সত্যি') || q.includes('প্লাটফর্ম') || q.includes('স্টুডেন্ট') || q.includes('রিয়েল') || q.includes('unity') || q.includes('আর্নিং') || q.includes('সম্পর্কে')) {
      return {
        text: `🏆 **Unity Earning — বাংলাদেশের ১ নম্বর বিশ্বস্ত প্ল্যাটফর্ম:**\n\n• এখন পর্যন্ত **৬৩,০০০+ (৬৩ হাজার এর বেশি)** শিক্ষার্থী ও তরুণ-তরুণী আমাদের সাথে যুক্ত হয়ে সফলভাবে বিভিন্ন স্কিল শিখে নিয়মিত আয় করছেন।\n• সম্পূর্ণ হালাল ও রিয়েল স্কিলভিত্তিক ফ্রিল্যান্সিং কাজ।\n• ২৪/৭ লাইভ সাপোর্ট টিম ও ডেডিকেটেড কাউন্সিলর/টিম লিডার গাইডেন্স।\n• প্রতিদিনের অর্জিত টাকা প্রতিদিন বিকাশ, নগদ ও রকেটে উত্তোলনযোগ্য।`,
        actions: [
          { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপ কমিউনিটি' },
          { type: 'telegram', label: '📢 টেলিগ্রাম কমিউনিটি (@unityearning12)' },
          { type: 'activate', label: '✨ জয়েন করুন আজই' }
        ]
      };
    }

    // 6. Courses / Works
    if (q.includes('কোর্স') || q.includes('কাজ') || q.includes('কাজের') || q.includes('course') || q.includes('skill') || q.includes('কি কি')) {
      return {
        text: `📚 **Unity Earning-এ মোট ১২টি প্রফেশনাল কোর্সে কাজ করতে পারবেন:**\n\n১. ডিজিটাল মার্কেটিং\n২. গ্রাফিক ডিজাইন\n৩. ভিডিও এডিটিং (CapCut/Premiere)\n৪. কন্টেন্ট রাইটিং\n৫. সোশ্যাল মিডিয়া ম্যানেজমেন্ট\n৬. ডাটা এন্ট্রি\n৭. ফর্ম ফিলআপ\n৮. টাইপিং জব\n৯. প্রোডাক্ট সেলিং (রিসেলিং)\n১০. ইমেইল মার্কেটিং\n১১. ফটো এডিটিং\n১২. সিম অফার সেলিং\n\nসবগুলো কোর্স ও কাজ আনলক করতে আপনার কাউন্সিলরের কাছ থেকে পেমেন্ট নম্বর নিয়ে আইডি এক্টিভ করুন।`,
        actions: [
          { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপে বিস্তারিত' },
          { type: 'telegram', label: '📱 বিস্তারিত টেলিগ্রামে' },
          { type: 'activate', label: '🚀 ১২টি কোর্স আনলক করুন' }
        ]
      };
    }

    // 7. Telegram / Helpline / Contact / Number query
    if (q.includes('টেলিগ্রাম') || q.includes('যোগাযোগ') || q.includes('কন্টাক্ট') || q.includes('নাম্বার') || q.includes('নম্বর') || q.includes('হেল্প') || q.includes('হেল্পলাইন') || q.includes('telegram') || q.includes('সাপোর্ট') || q.includes('কাউন্সিলর')) {
      return {
        text: `📞 **আমাদের অফিসিয়াল সাপোর্ট ও কাউন্সিলর হেল্পলাইন:**\n\nপেমেন্ট মেথড ও নম্বর পেতে বা যেকোনো তথ্যের জন্য আমাদের অফিসিয়াল চ্যানেলে যোগাযোগ করুন:\n👉 **হোয়াটসঅ্যাপ চ্যানেল:** [${WHATSAPP_CHANNEL_LINK}](${WHATSAPP_CHANNEL_LINK})\n👉 **টেলিগ্রাম চ্যানেল:** [${TELEGRAM_LINK}](${TELEGRAM_LINK})\n\nআমাদের কাউন্সিলর ও সাপোর্ট টিম দ্রুত আপনাকে সঠিক পেমেন্ট মেথড পাঠিয়ে দিয়ে আইডি সচল করে দেবেন!`,
        actions: [
          { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপ চ্যানেল' },
          { type: 'telegram', label: '📱 টেলিগ্রামে মেসেজ দিন' },
          { type: 'activate', label: '🚀 আইডি এক্টিভেশন ফর্ম' }
        ]
      };
    }

    // Default Fallback
    return {
      text: `ধন্যবাদ আপনার বার্তার জন্য! 😊\n\n**Unity Earning** বাংলাদেশের ১ নম্বর বিশ্বস্ত অনলাইন লার্নিং প্ল্যাটফর্ম যেখানে **৬৩,০০০+ এর বেশি শিক্ষার্থী** যুক্ত আছেন।\n\n🔥 মাত্র **${currentPrice} ৳** তে মেম্বারশিপ নিয়ে পাচ্ছেন **৩০০ ৳ ক্যাশব্যাক** এবং ১২টি কোর্সে লাইফটাইম কাজের সুযোগ!\n\nপেমেন্ট মেথড নিতে বা আইডি একটিভ করতে আপনার **কাউন্সিলরের (Counselor)** সাথে কথা বলুন অথবা আমাদের হোয়াটসঅ্যাপ/টেলিগ্রাম চ্যানেল **@unityearning12** এ এখনই মেসেজ দিন।`,
      actions: [
        { type: 'whatsapp', label: '🟢 হোয়াটসঅ্যাপ চ্যানেল' },
        { type: 'telegram', label: '📱 টেলিগ্রাম সাপোর্ট (@unityearning12)' },
        { type: 'activate', label: '🚀 আইডি এক্টিভেশন ফর্ম' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'এখন'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: 'এখন',
        actions: response.actions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: NonNullable<Message['actions']>[number]) => {
    if (action.type === 'activate') {
      onOpenActivation();
    } else if (action.type === 'telegram') {
      window.open(TELEGRAM_LINK, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'whatsapp') {
      window.open(WHATSAPP_CHANNEL_LINK, '_blank', 'noopener,noreferrer');
    }
  };

  const quickPrompts = [
    { label: '🚀 আইডি এক্টিভেশন ও পেমেন্ট মেথড', query: 'আইডি কিভাবে একটিভ করব এবং পেমেন্ট মেথড কিভাবে পাব?' },
    { label: '🟢 হোয়াটসঅ্যাপ চ্যানেল', query: 'অফিসিয়াল হোয়াটসঅ্যাপ চ্যানেল লিংক দিন' },
    { label: '🎁 ৩০০৳ ক্যাশব্যাক কীভাবে?', query: '৩০০ টাকা ক্যাশব্যাক অফার কিভাবে পাবো?' },
    { label: '💰 বর্তমান অফার ফি কত?', query: 'বর্তমান মেম্বারশিপ ফি কত টাকা?' },
    { label: '🏆 ৬৩ হাজার+ স্টুডেন্ট ও বিশ্বস্ততা', query: 'ইউনিটি আর্নিং প্ল্যাটফর্ম সম্পর্কে বলুন' },
    { label: '📚 কি কি কাজ করতে পারব?', query: 'কোন কোন কোর্স ও কাজ করতে পারব?' }
  ];

  return (
    <>
      {/* Floating Action Suite on the Bottom-Right (ডান পাশে নিচে) */}
      <div className="fixed bottom-18 md:bottom-6 right-3.5 md:right-6 z-40 flex flex-col items-end gap-2.5 font-['Hind_Siliguri'] select-none">
        
        {/* 1. Floating WhatsApp Button */}
        <div className="group relative flex items-center">
          <div className="hidden group-hover:flex absolute right-full mr-2.5 items-center whitespace-nowrap bg-[#101828] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg border border-[#079669]/40 gap-1.5 transition-all">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>WhatsApp সাপোর্ট</span>
          </div>

          <a
            href={WHATSAPP_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg shadow-[#25D366]/30 hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white"
            aria-label="WhatsApp সাপোর্ট"
            title="WhatsApp সাপোর্ট ও চ্যানেল"
          >
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
            </span>
            <WhatsAppIcon size={22} className="w-5.5 h-5.5 text-white drop-shadow-xs" />
          </a>
        </div>

        {/* 2. Floating Telegram Button */}
        <div className="group relative flex items-center">
          <div className="hidden group-hover:flex absolute right-full mr-2.5 items-center whitespace-nowrap bg-[#101828] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg border border-[#315CF5]/40 gap-1.5 transition-all">
            <span className="w-2 h-2 rounded-full bg-[#315CF5] animate-pulse" />
            <span>Telegram চ্যানেল</span>
          </div>

          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-[#0088CC] to-[#29B6F6] hover:from-[#0077B5] hover:to-[#0288D1] text-white shadow-lg shadow-[#0088CC]/30 hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white"
            aria-label="Telegram চ্যানেল"
            title="Telegram চ্যানেল (@unityearning12)"
          >
            <Send className="w-5 h-5 fill-white -translate-x-0.5 translate-y-0.5" />
          </a>
        </div>

        {/* 3. Unity Chat Bot Launcher Button */}
        <div className="group relative flex items-center">
          <div className="hidden group-hover:flex absolute right-full mr-2.5 items-center whitespace-nowrap bg-[#101828] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg border border-[#315CF5]/40 gap-1.5 transition-all">
            <span>Unity Chat Bot</span>
          </div>

          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#315CF5] hover:bg-[#254EDB] text-white shadow-lg shadow-[#315CF5]/30 hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white"
            aria-label="Unity Chat Bot"
            title="Unity Chat Bot — সাহায্য নিন"
          >
            {isOpen ? (
              <X className="w-5 h-5 transition-transform" />
            ) : (
              <Bot className="w-5 h-5 drop-shadow-xs" />
            )}
          </button>
        </div>

      </div>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 md:bottom-22 right-3 md:right-6 z-50 w-[calc(100vw-24px)] sm:w-[400px] max-h-[560px] h-[78vh] bg-white rounded-2xl shadow-xl border border-[#E4E7EC] flex flex-col overflow-hidden animate-fade-in font-['Hind_Siliguri']">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-blue-700 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-base tracking-tight text-white leading-none">Unity Chat Bot</h3>
                  <span className="text-[10px] bg-emerald-500/90 text-white font-bold px-1.5 py-0.5 rounded-md">Live AI</span>
                </div>
                <p className="text-[11px] text-blue-100 font-medium mt-0.5">অফিসিয়াল স্মার্ট অ্যাসিস্ট্যান্ট</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(getInitialMessages())}
                title="চ্যাট রিসেট করুন"
                className="p-1.5 rounded-xl hover:bg-white/15 text-blue-100 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="মিনিমাইজ করুন"
                className="p-1.5 rounded-xl hover:bg-white/15 text-blue-100 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Value Highlights Ticker */}
          <div className="bg-blue-50 border-b border-blue-100 px-3 py-1.5 flex items-center justify-between text-[11px] font-bold text-blue-800">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              ফি: <strong className="text-blue-900">{currentPrice}৳</strong>
            </span>
            <span className="text-emerald-700">🎁 ৩০০৳ ক্যাশব্যাক</span>
            <span className="text-slate-600 font-medium">👥 ৬৩,০০০+ শিক্ষার্থী</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[84%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-normal'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text.split('\n').map((line, i) => {
                        // Bold formatting parser
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={j} className="font-extrabold text-slate-900">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* Attached Action CTA buttons inside message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act)}
                          className={`text-[11px] font-bold py-1.5 px-3 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                            act.type === 'activate'
                              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-xs'
                              : act.type === 'whatsapp'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : act.type === 'telegram'
                              ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-500 font-medium ml-1">টাইপ করছে...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p.query)}
                className="whitespace-nowrap text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 px-2.5 py-1 rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Message Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="আইডি এক্টিভেশন বা যেকোনো কিছু লিখুন..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none placeholder:text-slate-400 font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
