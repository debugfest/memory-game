"use client";

import { useEffect } from "react";
// @ts-expect-error no types for canvas-confetti
import confetti from "canvas-confetti";

interface FireworksProps {
  active: boolean;
}

export function Fireworks({ active }: FireworksProps) {
  useEffect(() => {
    if (!active) return;

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() * 0.5 }, // top half
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() * 0.5 }, // top half
      });
    }, 250);

    return () => clearInterval(interval);
  }, [active]);

  return null;
}
