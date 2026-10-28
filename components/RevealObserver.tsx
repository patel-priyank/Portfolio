'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { useTheme } from '@/context/ThemeProvider';

const RevealObserver = () => {
  const { isLoaderDismissed } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaderDismissed) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries
          .filter(entry => entry.isIntersecting)
          .forEach((entry, index) => {
            const el = entry.target as HTMLElement;

            el.style.setProperty('--reveal-delay', `${index * 75}ms`);
            el.classList.add('revealed');
            observer.unobserve(el);
          });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    document.querySelectorAll('[data-reveal]:not(.revealed, .reveal-skip)').forEach(el => {
      if (el.getBoundingClientRect().bottom <= 0) {
        el.classList.add('reveal-skip');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [isLoaderDismissed, pathname]);

  return null;
};

export default RevealObserver;
