export type Theme = {
  name: string;
  bg: string;
  bg_alt: string;
  text: string;
  text_muted: string;
  accent: string;
  is_default_light: boolean;
  is_default_dark: boolean;
};

export const THEME_KEY = 'portfolio-theme';
export const THEMES_EXPLORED_KEY = 'portfolio-themes-explored';
export const THEME_MISMATCH_KEY = 'portfolio-theme-mismatch';

export const isDarkTheme = (bgColor: string) => {
  const hex = bgColor.replace('#', '');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
};
