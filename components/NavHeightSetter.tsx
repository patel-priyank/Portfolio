'use client';

import { useEffect, useRef } from 'react';

const NavHeightSetter = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = ref.current?.closest('nav');

    if (!nav) {
      return;
    }

    const update = () => {
      document.documentElement.style.setProperty('--nav-height', nav.getBoundingClientRect().height + 'px');
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(nav);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="sr-only" />;
};

export default NavHeightSetter;
