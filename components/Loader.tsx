'use client';

import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@/context/ThemeProvider';

const DURATION = 1000;
const DELAY = 250;

const Loader = () => {
  const { currentTheme, dismissLoader } = useTheme();

  const [complete, setComplete] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [removed, setRemoved] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();

    let frame: number;
    let settle: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (DURATION + DELAY), 1);
      const eased = 1 - Math.pow(1 - progress, 0.75);

      if (barRef.current) {
        barRef.current.style.width = `${eased * 100}%`;
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        settle = setTimeout(() => setComplete(true), DELAY);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, []);

  useEffect(() => {
    if (complete && currentTheme) {
      setDismissed(true);
    }
  }, [complete, currentTheme]);

  if (removed) {
    return null;
  }

  return (
    <div
      className={`loader fixed inset-0 p-4 grid place-items-center bg-[#1a1a1a] z-1200 transition-opacity ${
        dismissed ? 'complete' : ''
      }`}
      onTransitionEnd={() => {
        setRemoved(true);
        dismissLoader();
      }}
    >
      <div className="w-full max-w-3xs">
        <div className="w-full h-1 bg-[#262626] rounded-sm">
          <div ref={barRef} className="h-full bg-[#fafafa] rounded-sm" style={{ width: 0 }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
