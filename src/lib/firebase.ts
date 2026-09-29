import { initializeApp, getApps } from 'firebase/app';
import { initializeFirestore, getFirestore, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { PricingSettings, DEFAULT_AVAILABLE_SEATS } from '../utils/pricing';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const dbId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

// Initialize Firestore with experimentalAutoDetectLongPolling to prevent backend connection drop in iframe/browser preview
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  }, dbId);
} catch {
  firestoreDb = dbId ? getFirestore(app, dbId) : getFirestore(app);
}

export const db = firestoreDb;

const PRICING_DOC_PATH = ['settings', 'pricing'] as const;

/**
 * Real-time listener for pricing settings & available seats across all devices.
 */
export function subscribeToPricingSettings(
  onUpdate: (settings: PricingSettings) => void,
  onError?: (err: Error) => void
) {
  try {
    const docRef = doc(db, PRICING_DOC_PATH[0], PRICING_DOC_PATH[1]);
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          onUpdate({
            isAutoPricing: data.isAutoPricing ?? true,
            manualPrice: Number(data.manualPrice) || 499,
            availableSeats: typeof data.availableSeats === 'number' ? data.availableSeats : DEFAULT_AVAILABLE_SEATS,
          });
        }
      },
      (error) => {
        // Handles temporary network/unavailable status gracefully
        console.warn('Firestore offline or reconnecting:', error?.message || error);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.warn('Unable to subscribe to Firestore pricing:', err);
    return () => {};
  }
}

/**
 * Saves pricing settings & available seats to Firestore in real-time so all users get instantly updated.
 */
export async function savePricingSettingsToFirestore(settings: PricingSettings): Promise<void> {
  try {
    const docRef = doc(db, PRICING_DOC_PATH[0], PRICING_DOC_PATH[1]);
    await setDoc(
      docRef,
      {
        isAutoPricing: settings.isAutoPricing,
        manualPrice: settings.manualPrice,
        availableSeats: settings.availableSeats ?? DEFAULT_AVAILABLE_SEATS,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Error saving pricing and seat settings to Firestore:', err);
    throw err;
  }
}

/**
 * Fetch initial pricing settings & available seats from Firestore once.
 */
export async function fetchPricingSettingsFromFirestore(): Promise<PricingSettings | null> {
  try {
    const docRef = doc(db, PRICING_DOC_PATH[0], PRICING_DOC_PATH[1]);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        isAutoPricing: data.isAutoPricing ?? true,
        manualPrice: Number(data.manualPrice) || 499,
        availableSeats: typeof data.availableSeats === 'number' ? data.availableSeats : DEFAULT_AVAILABLE_SEATS,
      };
    }
    return null;
  } catch (err) {
    console.warn('Error fetching pricing settings from Firestore:', err);
    return null;
  }
}
