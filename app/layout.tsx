import type { Metadata } from 'next';
import { Inter, Lora, Source_Code_Pro } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/components/Header';
import RevealObserver from '@/components/RevealObserver';
import ScrollToTopBtn from '@/components/ScrollToTopBtn';
import ThemeDialog from '@/components/ThemeDialog';

import { getThemes } from '@/actions/themes.actions';

import ThemeProvider from '@/context/ThemeProvider';

import { getThemeVars, isDarkTheme, THEME_KEY, THEME_STARTER_KEY, type Theme } from '@/lib/themes';

import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const title = 'Priyank Patel';
const description = 'Full stack developer. I build end-to-end web applications.';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin']
});

const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin']
});

export const revalidate = 3600;

const themeScript = (themes: Theme[]) => {
  const scriptThemes = themes.map(theme => ({
    name: theme.name,
    isDark: isDarkTheme(theme.bg),
    isStarter: !theme.is_default_light && !theme.is_default_dark,
    isDefaultLight: theme.is_default_light,
    isDefaultDark: theme.is_default_dark,
    vars: getThemeVars(theme)
  }));

  return `(() => {
    const themes = ${JSON.stringify(scriptThemes).replace(/</g, '\\u003c')};
    let saved = null;

    try {
      saved = localStorage.getItem('${THEME_KEY}');
    } catch {}

    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;

    let theme = themes.find(t => t.name === saved);

    if (saved === null) {
      const starters = themes.filter(t => t.isStarter && t.isDark === prefersDark);

      theme = starters[Math.floor(Math.random() * starters.length)];

      if (theme) {
        try {
          localStorage.setItem('${THEME_KEY}', theme.name);
          localStorage.setItem('${THEME_STARTER_KEY}', 'true');
        } catch {}
      }
    }

    theme ??= themes.find(t => (prefersDark ? t.is_default_dark : t.is_default_light));

    if (!theme) return;

    Object.entries(theme.vars).forEach(([name, value]) => document.documentElement.style.setProperty(name, value));
  })();`;
};

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Priyank Patel',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Priyank Patel' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.jpg']
  }
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const themes = await getThemes();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${sourceCodePro.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript(themes) }} />
      </head>

      <body className="min-h-dvh bg-(--bg) text-(--text)">
        <ThemeProvider themes={themes}>
          <noscript className="fixed inset-0 p-4 grid place-items-center bg-[#1a1a1a] text-[#fafafa] text-center text-balance z-1300">
            Enable JavaScript to view this site.
          </noscript>

          <Header />

          {children}

          <RevealObserver />

          <ScrollToTopBtn />

          <ThemeDialog />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
