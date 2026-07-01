'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { THEME_KEY, THEMES_EXPLORED_KEY, THEME_MISMATCH_KEY, type Theme } from '@/lib/themes';

type ThemeContextValue = {
  themes: Theme[];
  currentTheme: string;
  isOpen: boolean;
  isLoaderDismissed: boolean;
  open: () => void;
  close: () => void;
  setTheme: (name: string, userInitiated?: boolean) => void;
  dismissLoader: () => void;
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
  const [isLoaderDismissed, setIsLoaderDismissed] = useState(false);

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

      document.documentElement.style.setProperty('--bg', selected.bg);
      document.documentElement.style.setProperty('--bg-alt', selected.bg_alt);
      document.documentElement.style.setProperty('--text', selected.text);
      document.documentElement.style.setProperty('--text-muted', selected.text_muted);
      document.documentElement.style.setProperty('--accent', selected.accent);

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

  const dismissLoader = useCallback(() => setIsLoaderDismissed(true), []);

  return (
    <ThemeContext.Provider
      value={{ themes, currentTheme, isOpen, isLoaderDismissed, open, close, setTheme, dismissLoader }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
