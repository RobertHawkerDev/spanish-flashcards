import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import companyName from './utils/company-name';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const isOnVercel = !!process.env.VERCEL;
const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  title: {
    default: `${companyName} | Spanish Vocabulary Flashcards with Pictures`,
    template: `%s | ${companyName}`,
  },
  description: `Learn Spanish faster with interactive flashcards, pictures, and audio. Improve vocabulary, track progress, and share results on ${companyName}.`,
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {isOnVercel && isProduction && <Analytics />}
        {isOnVercel && isProduction && <SpeedInsights />}
      </body>
    </html>
  );
}
