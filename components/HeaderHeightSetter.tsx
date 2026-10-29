'use client';

import { useEffect, useRef } from 'react';

const HeaderHeightSetter = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = ref.current?.closest('header');

    if (!header) {
      return;
    }

    const update = () => {
      document.documentElement.style.setProperty('--header-height', header.getBoundingClientRect().height + 'px');
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} />;
};

export default HeaderHeightSetter;
