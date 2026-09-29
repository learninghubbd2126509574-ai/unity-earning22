export interface PricingSettings {
  isAutoPricing: boolean;
  manualPrice: number;
  availableSeats: number;
}

const STORAGE_KEY_AUTO = 'unity_auto_pricing_enabled';
const STORAGE_KEY_MANUAL_PRICE = 'unity_manual_price';
const STORAGE_KEY_AVAILABLE_SEATS = 'unity_available_seats';

export const DEFAULT_AVAILABLE_SEATS = 41;

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

export function loadPricingSettings(): PricingSettings {
  try {
    const autoStored = localStorage.getItem(STORAGE_KEY_AUTO);
    const manualStored = localStorage.getItem(STORAGE_KEY_MANUAL_PRICE);
    const seatsStored = localStorage.getItem(STORAGE_KEY_AVAILABLE_SEATS);

    const isAutoPricing = autoStored === null ? true : autoStored === 'true';
    const manualPrice = manualStored ? parseInt(manualStored, 10) || 499 : 499;
    const availableSeats = seatsStored ? parseInt(seatsStored, 10) || DEFAULT_AVAILABLE_SEATS : DEFAULT_AVAILABLE_SEATS;

    return {
      isAutoPricing,
      manualPrice: isNaN(manualPrice) ? 499 : manualPrice,
      availableSeats: isNaN(availableSeats) ? DEFAULT_AVAILABLE_SEATS : availableSeats
    };
  } catch {
    return {
      isAutoPricing: true,
      manualPrice: 499,
      availableSeats: DEFAULT_AVAILABLE_SEATS
    };
  }
}

export function savePricingSettings(settings: PricingSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_AUTO, String(settings.isAutoPricing));
    localStorage.setItem(STORAGE_KEY_MANUAL_PRICE, String(settings.manualPrice));
    localStorage.setItem(STORAGE_KEY_AVAILABLE_SEATS, String(settings.availableSeats ?? DEFAULT_AVAILABLE_SEATS));
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
