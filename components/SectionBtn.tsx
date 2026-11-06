'use client';

import { useEffect, useRef } from 'react';

const SectionBtn = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const header = document.querySelector('header');

    if (!btn || !header) return;

    const titles = [...document.querySelectorAll<HTMLHeadingElement>('main > section h2')];

    let activeSection: HTMLElement | null = null;

    const update = () => {
      const headerBottom = header.getBoundingClientRect().bottom;

      let activeTitle: HTMLHeadingElement | null = null;

      for (const title of titles) {
        const titleRect = title.getBoundingClientRect();
        const section = title.closest('section');

        if (!section) continue;

        if (titleRect.bottom < headerBottom && section.getBoundingClientRect().bottom > headerBottom) {
          activeTitle = title;
          break;
        }
      }

      activeSection = activeTitle?.closest('section') ?? null;

      if (activeTitle) btn.textContent = activeTitle.textContent?.trim() ?? '';

      btn.disabled = !activeTitle;
      btn.classList.toggle('opacity-0', !activeTitle);
      btn.classList.toggle('pointer-events-none', !activeTitle);
      btn.toggleAttribute('aria-hidden', !activeTitle);
    };

    const handleClick = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      activeSection?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    btn.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      btn.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      aria-hidden="true"
      className="button fixed top-[calc(var(--header-height)+8px)] inset-x-0 mx-auto w-fit z-950 text-sm opacity-0 pointer-events-none"
      disabled
    />
  );
};

export default SectionBtn;
