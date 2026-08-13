export interface Course {
  id: string;
  titleBn: string;
  titleEn: string;
  icon: string;
  category: string;
  description: string;
  dailyEarningEst: string;
  effortLevel: 'সহজ' | 'মাঝারি' | 'এডভান্সড';
  lessonCount: number;
  duration: string;
  modules: string[];
  sampleTask: {
    title: string;
    description: string;
    placeholder: string;
    reward: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  photo: string;
  earnings: string;
  review: string;
  date: string;
  method: 'bKash' | 'Nagad' | 'Rocket';
}

export interface PaymentProof {
  id: string;
  memberName: string;
  amount: number;
  method: 'bKash' | 'Nagad' | 'Rocket';
  timeAgo: string;
  txType: 'ক্যাশব্যাক' | 'দৈনিক ইনকাম' | 'রেফারাল বোনাস';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
