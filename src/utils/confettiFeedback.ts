import confetti from 'canvas-confetti';

export function triggerSuccessFeedback(origin?: { x: number; y: number }) {
  try {
    confetti({
      particleCount: 35,
      spread: 60,
      startVelocity: 25,
      origin: origin || { y: 0.7, x: 0.5 },
      colors: ['#25D366', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      disableForReducedMotion: true,
      ticks: 150
    });
  } catch {
    // safe fallback
  }
}

export function triggerBigOfferCelebration(origin?: { x: number; y: number }) {
  try {
    // Center blast
    confetti({
      particleCount: 80,
      spread: 90,
      startVelocity: 40,
      origin: origin || { y: 0.5, x: 0.5 },
      colors: ['#ff0055', '#ffaa00', '#25D366', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'],
      ticks: 200,
      scalar: 1.2
    });

    // Left cannon
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#ffaa00', '#ec4899', '#3b82f6']
      });
    }, 150);

    // Right cannon
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#25D366', '#8b5cf6', '#06b6d4']
      });
    }, 250);
  } catch {
    // safe fallback
  }
}

export function triggerPaymentSubmitSuccess() {
  try {
    confetti({
      particleCount: 65,
      spread: 80,
      startVelocity: 35,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#25D366', '#128C7E', '#3b82f6', '#6366f1', '#10b981'],
      ticks: 200
    });
  } catch {
    // safe fallback
  }
}

