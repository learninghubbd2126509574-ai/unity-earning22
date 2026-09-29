/**
 * Date utility for displaying today's live date in Bengali format
 */
export const getTodayBengaliDate = (): string => {
  try {
    const d = new Date();
    const formatter = new Intl.DateTimeFormat('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
    return formatter.format(d);
  } catch {
    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    const d = new Date();
    const toBnNum = (n: number) => n.toString().replace(/\d/g, digit => '০১২৩৪৫৬৭৮৯'[parseInt(digit)]);
    return `${days[d.getDay()]}, ${toBnNum(d.getDate())} ${months[d.getMonth()]} ${toBnNum(d.getFullYear())}`;
  }
};

export const getShortBengaliDate = (): string => {
  try {
    const d = new Date();
    const formatter = new Intl.DateTimeFormat('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    return formatter.format(d);
  } catch {
    const months = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'];
    const d = new Date();
    const toBnNum = (n: number) => n.toString().replace(/\d/g, digit => '০১২৩৪৫৬৭৮৯'[parseInt(digit)]);
    return `${toBnNum(d.getDate())} ${months[d.getMonth()]} ${toBnNum(d.getFullYear())}`;
  }
};
