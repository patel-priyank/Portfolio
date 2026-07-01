'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { isDarkTheme, THEMES_EXPLORED_KEY, THEME_MISMATCH_KEY } from '@/lib/themes';

import { useTheme } from '@/context/ThemeProvider';

const SHOW_DELAY = 2500;
const VISIBLE_DURATION = 5000;

const ThemeToast = () => {
  const { currentTheme, isLoaderDismissed, isOpen, themes } = useTheme();

  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialized = useRef(false);
  const opened = useRef(false);

  const show = useCallback((toastMessage: string) => {
    setMessage(toastMessage);
    setVisible(true);

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    hideTimer.current = setTimeout(() => setVisible(false), VISIBLE_DURATION);
  }, []);

  const showMismatch = useCallback(() => {
    if (localStorage.getItem(THEME_MISMATCH_KEY) === 'true') {
      return;
    }

    const current = themes.find(theme => theme.name === currentTheme);

    if (!current) {
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark !== isDarkTheme(current.bg)) {
      const systemMode = prefersDark ? 'dark' : 'light';

      show(`Your system is in ${systemMode} mode. Try a ${systemMode} theme?`);

      localStorage.setItem(THEME_MISMATCH_KEY, 'true');
    }
  }, [themes, currentTheme, show]);

  useEffect(() => {
    if (initialized.current || !isLoaderDismissed || !currentTheme) {
      return;
    }

    initialized.current = true;

    const timer = setTimeout(() => {
      if (opened.current) {
        return;
      }

      if (localStorage.getItem(THEMES_EXPLORED_KEY) !== 'true') {
        show('Check out more themes!');
      } else {
        showMismatch();
      }
    }, SHOW_DELAY);

    return () => clearTimeout(timer);
  }, [isLoaderDismissed, currentTheme, show, showMismatch]);

  useEffect(() => {
    if (isOpen) {
      opened.current = true;

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      setVisible(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`absolute w-full pointer-events-none transition-[margin,opacity] ${
        visible ? 'mt-1 opacity-100' : 'mt-0 opacity-0'
      }`}
      onTransitionEnd={() => {
        if (!visible) {
          setMessage(null);
        }
      }}
    >
      {message && (
        <div className="relative w-full">
          <div className="absolute top-full inset-x-0 mx-auto w-0 h-0 [border-left:6px_solid_transparent] [border-right:6px_solid_transparent] [border-bottom:9px_solid_var(--text-muted)]" />

          <span className="absolute top-2.25 right-0 min-w-full w-max max-w-[calc(75vw-32px)] bg-(--text-muted) text-(--bg) px-4 py-2 rounded-md text-sm">
            {message}
          </span>
        </div>
      )}
    </div>
  );
};

export default ThemeToast;
