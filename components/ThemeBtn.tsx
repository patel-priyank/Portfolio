'use client';

import { useTheme } from '@/context/ThemeProvider';

const ThemeBtn = () => {
  const { open } = useTheme();

  return (
    <button
      onClick={open}
      className="cursor-pointer flex gap-2 items-center px-3 py-1 border border-(--accent) rounded-md select-none bg-(--bg-alt) text-(--accent) pointer-fine:hover:bg-(--accent) pointer-fine:hover:text-(--bg-alt) transition-[background-color,color]"
    >
      Theme
    </button>
  );
};

export default ThemeBtn;
