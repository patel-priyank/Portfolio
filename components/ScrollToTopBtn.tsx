'use client';

import { useEffect, useRef } from 'react';

import { ArrowLineUpIcon } from '@phosphor-icons/react';

const ScrollToTopBtn = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;

    if (!btn) {
      return;
    }

    const update = () => {
      const hidden = window.scrollY < 250;

      btn.disabled = hidden;
      btn.classList.toggle('opacity-0', hidden);
      btn.classList.toggle('pointer-events-none', hidden);
      btn.classList.toggle('pointer-events-auto', !hidden);
      btn.toggleAttribute('aria-hidden', hidden);
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', update);
      btn.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="flex justify-center sticky bottom-6 mb-20 z-900 pointer-events-none">
      <button
        ref={btnRef}
        aria-hidden="true"
        className="text-sm cursor-pointer flex gap-2 items-center px-3 py-1.5 border border-b-2 border-(--accent) rounded-lg select-none opacity-0 pointer-events-none bg-(--accent-light) text-(--accent) hover:bg-(--accent-dark) hover:text-(--bg) active:translate-y-0.5 transition-[background-color,color,opacity] duration-250"
        disabled
      >
        <ArrowLineUpIcon className="shrink-0" weight="bold" />
        Scroll to top
      </button>
    </div>
  );
};

export default ScrollToTopBtn;
