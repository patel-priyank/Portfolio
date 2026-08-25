import type { Metadata } from 'next';
import { Arimo, Chiron_Sung_HK, Source_Code_Pro } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { getThemes } from '@/actions/themes.actions';

import ThemeProvider from '@/context/ThemeProvider';

import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const title = 'Priyank Patel';
const description = 'Full stack developer based in the UK. I build end-to-end web applications.';

const arimo = Arimo({
  variable: '--font-arimo',
  subsets: ['latin']
});

const chironSungHK = Chiron_Sung_HK({
  variable: '--font-chiron-sung-hk',
  subsets: ['latin']
});

const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin']
});

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
    <html lang="en" className={`${arimo.variable} ${chironSungHK.variable} ${sourceCodePro.variable}`}>
      <body className="min-h-dvh bg-(--bg) text-(--text) bg-center bg-fixed bg-size-[24px_24px] bg-[radial-gradient(circle,var(--bg-alt)_2px,transparent_2px)]">
        <ThemeProvider themes={themes}>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
