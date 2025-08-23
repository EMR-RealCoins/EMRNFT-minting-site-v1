import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/lib/polyfills';
import { Header } from '@/components/core/Header';
import { Footer } from '@/components/core/Footer';
import { RainbowKitProvider } from '@/components/core/RainbowKitProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'House of Emirates NFT',
  description: 'NFT Collectibles for House of Emirates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitProvider>
          <Header />
          {children}
          <Footer />
        </RainbowKitProvider>
      </body>
    </html>
  );
}
