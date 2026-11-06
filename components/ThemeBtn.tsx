'use client';

import { useTheme } from '@/context/ThemeProvider';

const ThemeBtn = () => {
  const { openDrawer } = useTheme();

  return (
    <button onClick={openDrawer} className="button">
      Theme
    </button>
  );
};

export default ThemeBtn;
