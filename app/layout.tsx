import type { Metadata } from 'next';
import { Inter, Lora, Source_Code_Pro } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Navbar from '@/components/Navbar';
import RevealObserver from '@/components/RevealObserver';
import ScrollToTopBtn from '@/components/ScrollToTopBtn';
import ThemeDialog from '@/components/ThemeDialog';

import { getThemes } from '@/actions/themes.actions';

import ThemeProvider from '@/context/ThemeProvider';

import { THEME_KEY, type Theme } from '@/lib/themes';

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

const themeScript = (themes: Theme[]) => `(() => {
  const themes = ${JSON.stringify(themes).replace(/</g, '\\u003c')};
  let saved = null;

  try {
    saved = localStorage.getItem('${THEME_KEY}');
  } catch {}

  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;

  const theme = themes.find(t => t.name === saved) ?? themes.find(t => (prefersDark ? t.is_default_dark : t.is_default_light));

  if (!theme) {
    return;
  }

  const rootStyle = document.documentElement.style;

  rootStyle.setProperty('--bg', theme.bg);
  rootStyle.setProperty('--bg-alt', theme.bg_alt);
  rootStyle.setProperty('--text', theme.text);
  rootStyle.setProperty('--text-muted', theme.text_muted);
  rootStyle.setProperty('--accent', theme.accent);
})();`;

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

      <body className="min-h-dvh bg-(--bg) text-(--text) bg-center bg-fixed bg-size-[16px_16px] bg-[radial-gradient(circle,var(--bg-alt)_2px,transparent_2px)]">
        <ThemeProvider themes={themes}>
          <noscript className="fixed inset-0 p-4 grid place-items-center bg-[#1a1a1a] text-[#fafafa] text-center text-balance z-1300">
            Enable JavaScript to view this site.
          </noscript>

          <Navbar />

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
