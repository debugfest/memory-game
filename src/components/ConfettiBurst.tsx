"use client";

import { useEffect } from "react";
// @ts-expect-error: no types for canvas-confetti
import confetti from "canvas-confetti";

interface ConfettiBurstProps {
  active: boolean;
}

const COLORS = [
  "#a786ff",
  "#fd8bbc",
  "#eca184",
  "#f8deb1",
  "#7de2d1",
  "#ffd97d",
  "#8ecae6",
  "#ffb703",
];

export function ConfettiBurst({ active }: ConfettiBurstProps) {

  useEffect(() => {
    if (!active) return;

    const end = Date.now() + 3 * 1000; // 3 seconds

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 50,
        origin: { x: 0, y: 1 },
        colors: COLORS,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 50,
        origin: { x: 1, y: 1 },
        colors: COLORS,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, [active]);

  return null; // no UI, just triggers confetti animation
}
