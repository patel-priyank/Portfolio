export type Theme = {
  name: string;
  bg: string;
  bg_alt: string;
  text: string;
  text_muted: string;
  accent: string;
  pattern_path_data?: string | null;
  is_default_light: boolean;
  is_default_dark: boolean;
};

export const THEME_KEY = 'portfolio:theme';
export const THEME_STARTER_KEY = 'portfolio:theme-starter';
export const THEMES_EXPLORED_KEY = 'portfolio:themes-explored';
export const THEME_MISMATCH_KEY = 'portfolio:theme-mismatch';

const getPattern = (pathData: string) => {
  const path = `<path d="${pathData}" fill-rule="evenodd"/>`;

  const tile = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <g transform="translate(8 8) rotate(-25 8 8) scale(.75)">${path}</g>
      <g transform="translate(56 56) rotate(25 8 8) scale(.75)">${path}</g>
    </svg>
  `;

  return `url("data:image/svg+xml,${encodeURIComponent(tile)}")`;
};

export const getThemeVars = (theme: Theme) => {
  let pattern = `radial-gradient(circle, ${theme.bg_alt} 6px, transparent 6px)`;
  let size = '80px 80px';

  if (theme.pattern_path_data) {
    pattern = getPattern(theme.pattern_path_data);
    size = '96px 96px';
  }

  return {
    '--bg': theme.bg,
    '--bg-alt': theme.bg_alt,
    '--text': theme.text,
    '--text-muted': theme.text_muted,
    '--accent': theme.accent,
    '--pattern': pattern,
    '--size': size
  };
};

export const isDarkTheme = (bgColor: string) => {
  const hex = bgColor.replace('#', '');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
};
