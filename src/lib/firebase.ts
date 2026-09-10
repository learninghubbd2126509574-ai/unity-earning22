import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { PricingSettings } from '../utils/pricing';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const PRICING_DOC_PATH = ['settings', 'pricing'] as const;

/**
 * Real-time listener for pricing settings across all devices.
 */
export function subscribeToPricingSettings(
  onUpdate: (settings: PricingSettings) => void,
  onError?: (err: Error) => void
) {
  const docRef = doc(db, PRICING_DOC_PATH[0], PRICING_DOC_PATH[1]);
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          isAutoPricing: data.isAutoPricing ?? true,
          manualPrice: Number(data.manualPrice) || 499,
        });
      }
    },
    (error) => {
      console.warn('Firestore subscription error:', error);
      if (onError) onError(error);
    }
  );
}

/**
 * Saves pricing settings to Firestore in real-time so all users get instantly updated.
 */
export async function savePricingSettingsToFirestore(settings: PricingSettings): Promise<void> {
  try {
    const docRef = doc(db, PRICING_DOC_PATH[0], PRICING_DOC_PATH[1]);
    await setDoc(
      docRef,
      {
        isAutoPricing: settings.isAutoPricing,
        manualPrice: settings.manualPrice,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Error saving pricing settings to Firestore:', err);
    throw err;
  }
}

/**
 * Fetch initial pricing settings from Firestore once.
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
      };
    }
    return null;
  } catch (err) {
    console.warn('Error fetching pricing settings from Firestore:', err);
    return null;
  }
}
