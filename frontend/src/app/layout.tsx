import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { APP_CONFIG } from '@/lib/constants';
import Web3ProvidersWrapper from '@/components/core/Web3ProvidersWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Web3ProvidersWrapper>
          {children}
        </Web3ProvidersWrapper>
      </body>
    </html>
  );
}
