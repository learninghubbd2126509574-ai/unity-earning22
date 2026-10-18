export interface PricingSettings {
  isAutoPricing: boolean;
  manualPrice: number;
  availableSeats: number;
  videoUrl?: string;
  nagadNumber?: string;
  rocketNumber?: string;
  upayNumber?: string;
}

const STORAGE_KEY_AUTO = 'unity_auto_pricing_enabled';
const STORAGE_KEY_MANUAL_PRICE = 'unity_manual_price';
const STORAGE_KEY_AVAILABLE_SEATS = 'unity_available_seats';
const STORAGE_KEY_VIDEO_URL = 'unity_bkash_video_url';
const STORAGE_KEY_NAGAD_NUMBER = 'unity_nagad_number';
const STORAGE_KEY_ROCKET_NUMBER = 'unity_rocket_number';
const STORAGE_KEY_UPAY_NUMBER = 'unity_upay_number';

export const DEFAULT_AVAILABLE_SEATS = 41;
export const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=ScMzIvxBSi4';
export const DEFAULT_NAGAD_NUMBER = '01339786909';
export const DEFAULT_ROCKET_NUMBER = '01339786909';
export const DEFAULT_UPAY_NUMBER = '01339786909';

/**
 * Returns today's automatic price based on the calendar:
 * - Friday (শুক্রবার) & Saturday (শনিবার): 499 ৳
 * - Sunday to Thursday (রবি থেকে বৃহস্পতি - বাকি ৫ দিন): 599 ৳
 */
export function getAutoPriceForDate(date: Date = new Date()): number {
  const day = date.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  const isWeekendOffer = day === 5 || day === 6; // Friday (5) or Saturday (6)
  return isWeekendOffer ? 499 : 599;
}

export function getBengaliDayName(date: Date = new Date()): string {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  return days[date.getDay()];
}

export function isSpecialWeekend(date: Date = new Date()): boolean {
  const day = date.getDay();
  return day === 5 || day === 6;
}

/**
 * Parses and extracts a standard 11-character YouTube video ID.
 */
export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

/**
 * Generates an embedded YouTube URL with safe parameters.
 */
export function getYouTubeEmbedUrl(url?: string, autoplay: boolean = true): string {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`;
  }
  return url?.trim() || '';
}

/**
 * Returns high-quality YouTube thumbnail URL.
 */
export function getYouTubeThumbnailUrl(url?: string): string {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return '';
}

export function loadPricingSettings(): PricingSettings {
  try {
    const autoStored = localStorage.getItem(STORAGE_KEY_AUTO);
    const manualStored = localStorage.getItem(STORAGE_KEY_MANUAL_PRICE);
    const seatsStored = localStorage.getItem(STORAGE_KEY_AVAILABLE_SEATS);
    const videoStored = localStorage.getItem(STORAGE_KEY_VIDEO_URL);
    const nagadStored = localStorage.getItem(STORAGE_KEY_NAGAD_NUMBER);
    const rocketStored = localStorage.getItem(STORAGE_KEY_ROCKET_NUMBER);
    const upayStored = localStorage.getItem(STORAGE_KEY_UPAY_NUMBER);

    const isAutoPricing = autoStored === null ? true : autoStored === 'true';
    const manualPrice = manualStored ? parseInt(manualStored, 10) || 499 : 499;
    const availableSeats = seatsStored ? parseInt(seatsStored, 10) || DEFAULT_AVAILABLE_SEATS : DEFAULT_AVAILABLE_SEATS;
    const videoUrl = videoStored && videoStored.trim() ? videoStored : DEFAULT_VIDEO_URL;
    const nagadNumber = nagadStored && nagadStored.trim() ? nagadStored : DEFAULT_NAGAD_NUMBER;
    const rocketNumber = rocketStored && rocketStored.trim() ? rocketStored : DEFAULT_ROCKET_NUMBER;
    const upayNumber = upayStored && upayStored.trim() ? upayStored : DEFAULT_UPAY_NUMBER;

    return {
      isAutoPricing,
      manualPrice: isNaN(manualPrice) ? 499 : manualPrice,
      availableSeats: isNaN(availableSeats) ? DEFAULT_AVAILABLE_SEATS : availableSeats,
      videoUrl,
      nagadNumber,
      rocketNumber,
      upayNumber,
    };
  } catch {
    return {
      isAutoPricing: true,
      manualPrice: 499,
      availableSeats: DEFAULT_AVAILABLE_SEATS,
      videoUrl: DEFAULT_VIDEO_URL,
      nagadNumber: DEFAULT_NAGAD_NUMBER,
      rocketNumber: DEFAULT_ROCKET_NUMBER,
      upayNumber: DEFAULT_UPAY_NUMBER,
    };
  }
}

export function savePricingSettings(settings: PricingSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_AUTO, String(settings.isAutoPricing));
    localStorage.setItem(STORAGE_KEY_MANUAL_PRICE, String(settings.manualPrice));
    localStorage.setItem(STORAGE_KEY_AVAILABLE_SEATS, String(settings.availableSeats ?? DEFAULT_AVAILABLE_SEATS));
    if (settings.videoUrl) {
      localStorage.setItem(STORAGE_KEY_VIDEO_URL, settings.videoUrl);
    }
    if (settings.nagadNumber) {
      localStorage.setItem(STORAGE_KEY_NAGAD_NUMBER, settings.nagadNumber);
    }
    if (settings.rocketNumber) {
      localStorage.setItem(STORAGE_KEY_ROCKET_NUMBER, settings.rocketNumber);
    }
    if (settings.upayNumber) {
      localStorage.setItem(STORAGE_KEY_UPAY_NUMBER, settings.upayNumber);
    }
  } catch {
    // safely ignore local storage errors in sandboxed iframes
  }
}

export function calculateEffectivePrice(settings: PricingSettings, date: Date = new Date()): number {
  if (settings.isAutoPricing) {
    return getAutoPriceForDate(date);
  }
  return settings.manualPrice;
}
