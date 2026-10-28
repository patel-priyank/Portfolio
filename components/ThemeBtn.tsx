'use client';

import { useTheme } from '@/context/ThemeProvider';

const ThemeBtn = () => {
  const { open } = useTheme();

  return (
    <button
      onClick={open}
      className="cursor-pointer flex gap-2 items-center px-3 py-1.5 border border-b-2 border-(--accent) rounded-lg select-none bg-(--accent-light) text-(--accent) hover:bg-(--accent-dark) hover:text-(--bg) active:translate-y-0.5 transition-[background-color,color]"
    >
      Theme
    </button>
  );
};

export default ThemeBtn;
