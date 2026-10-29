'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { THEME_KEY, THEMES_EXPLORED_KEY, THEME_MISMATCH_KEY, type Theme } from '@/lib/themes';

type ThemeContextValue = {
  themes: Theme[];
  currentTheme: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setTheme: (name: string, userInitiated?: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

const ThemeProvider = ({ themes, children }: { themes: Theme[]; children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const setTheme = useCallback(
    (name: string, userInitiated = false) => {
      let selected = themes.find(t => t.name === name);

      if (!selected) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const fallback = themes.find(t => (prefersDark ? t.is_default_dark : t.is_default_light))?.name ?? '';

        selected = themes.find(t => t.name === fallback);
      }

      if (!selected) {
        return;
      }

      document.body.classList.add('transitioning');

      const rootStyle = document.documentElement.style;

      rootStyle.setProperty('--bg', selected.bg);
      rootStyle.setProperty('--bg-alt', selected.bg_alt);
      rootStyle.setProperty('--text', selected.text);
      rootStyle.setProperty('--text-muted', selected.text_muted);
      rootStyle.setProperty('--accent', selected.accent);

      setTimeout(() => {
        document.body.classList.remove('transitioning');
      });

      localStorage.setItem(THEME_KEY, selected.name);
      setCurrentTheme(selected.name);

      if (userInitiated) {
        localStorage.removeItem(THEME_MISMATCH_KEY);
      }
    },
    [themes]
  );

  useEffect(() => {
    setTheme(localStorage.getItem(THEME_KEY) ?? '');
  }, [setTheme]);

  const open = useCallback(() => {
    localStorage.setItem(THEMES_EXPLORED_KEY, 'true');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ThemeContext.Provider value={{ themes, currentTheme, isOpen, open, close, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
