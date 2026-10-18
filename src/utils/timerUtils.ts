import { useState, useEffect } from 'react';

const TIMER_STORAGE_KEY = 'unity_offer_50m_loop_timestamp_v1';
const TIMER_DURATION_MS = 50 * 60 * 1000; // 50 minutes in milliseconds (3,000,000 ms)

export interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  progressPercent: number;
}

/**
 * Retrieves the persistent 50-minute target timestamp, or creates a new 50-minute cycle.
 * If expired, it automatically rolls over into the next 50-minute cycle.
 */
export function getOrCreate8HourTargetTimestamp(): number {
  if (typeof window === 'undefined') return Date.now() + TIMER_DURATION_MS;

  try {
    const stored = localStorage.getItem(TIMER_STORAGE_KEY);
    if (stored) {
      let parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) {
        // If expired, roll over to the next 50-minute cycle
        if (parsed <= Date.now()) {
          const elapsedCycles = Math.floor((Date.now() - parsed) / TIMER_DURATION_MS) + 1;
          parsed = parsed + elapsedCycles * TIMER_DURATION_MS;
          localStorage.setItem(TIMER_STORAGE_KEY, parsed.toString());
        }
        return parsed;
      }
    }

    const newTarget = Date.now() + TIMER_DURATION_MS;
    localStorage.setItem(TIMER_STORAGE_KEY, newTarget.toString());
    return newTarget;
  } catch {
    return Date.now() + TIMER_DURATION_MS;
  }
}

export function calculate8HourRemaining(targetTimestamp: number): CountdownState {
  let diffMs = targetTimestamp - Date.now();

  // If expired, rollover to a fresh 50 minutes
  if (diffMs <= 0) {
    targetTimestamp = Date.now() + TIMER_DURATION_MS;
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, targetTimestamp.toString());
    } catch {
      // ignore
    }
    diffMs = TIMER_DURATION_MS;
  }

  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const progressPercent = Math.min(100, Math.max(0, ((TIMER_DURATION_MS - diffMs) / TIMER_DURATION_MS) * 100));

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    progressPercent,
  };
}

/**
 * Custom React hook that runs an accurate 8-hour countdown timer
/**
 * Custom React hook that runs an accurate 50-minute countdown timer
 * which continuously rolls over to a fresh 50 minutes upon completion,
 * and maintains exact state across page refreshes.
 */
export function useOfferCountdown(): CountdownState {
  const [targetTimestamp, setTargetTimestamp] = useState<number>(() => getOrCreate8HourTargetTimestamp());
  const [countdown, setCountdown] = useState<CountdownState>(() => calculate8HourRemaining(targetTimestamp));

  useEffect(() => {
    const update = () => {
      let currentTarget = targetTimestamp;
      if (Date.now() >= currentTarget) {
        currentTarget = Date.now() + TIMER_DURATION_MS;
        try {
          localStorage.setItem(TIMER_STORAGE_KEY, currentTarget.toString());
        } catch {
          // ignore
        }
        setTargetTimestamp(currentTarget);
      }
      setCountdown(calculate8HourRemaining(currentTarget));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return countdown;
}
