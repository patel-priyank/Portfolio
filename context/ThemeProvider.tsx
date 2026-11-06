'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getThemeVars, THEME_KEY, THEMES_EXPLORED_KEY, THEME_MISMATCH_KEY, type Theme } from '@/lib/themes';

type ThemeContextValue = {
  themes: Theme[];
  currentThemeName: string;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setTheme: (name: string, userInitiated?: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

const ThemeProvider = ({ themes, children }: { themes: Theme[]; children: React.ReactNode }) => {
  const [currentThemeName, setCurrentThemeName] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const setTheme = useCallback(
    (themeName: string, userInitiated = false) => {
      let selectedTheme = themes.find(t => t.name === themeName);

      if (!selectedTheme) {
        const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
        const fallbackThemeName = themes.find(t => (prefersDark ? t.is_default_dark : t.is_default_light))?.name ?? '';

        selectedTheme = themes.find(t => t.name === fallbackThemeName);
      }

      if (!selectedTheme) return;

      document.body.classList.add('transitioning');

      Object.entries(getThemeVars(selectedTheme)).forEach(([name, value]) =>
        document.documentElement.style.setProperty(name, value)
      );

      setTimeout(() => document.body.classList.remove('transitioning'));

      setCurrentThemeName(selectedTheme.name);
      localStorage.setItem(THEME_KEY, selectedTheme.name);

      if (userInitiated) localStorage.removeItem(THEME_MISMATCH_KEY);
    },
    [themes]
  );

  useEffect(() => {
    setTheme(localStorage.getItem(THEME_KEY) ?? '');
  }, [setTheme]);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
    localStorage.setItem(THEMES_EXPLORED_KEY, 'true');
  }, []);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <ThemeContext.Provider value={{ themes, currentThemeName, isDrawerOpen, openDrawer, closeDrawer, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
