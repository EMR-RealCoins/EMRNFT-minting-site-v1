import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/core/Layout";
import RainbowKitProviderWrapper from "@/components/core/RainbowKitProvider";
import { APP_CONFIG } from "@/lib/constants";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  keywords: ["NFT", "Ethereum", "Digital Collectibles", "House of Emirates", "Blockchain"],
  authors: [{ name: "House of Emirates" }],
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    type: "website",
    url: APP_CONFIG.url,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <RainbowKitProviderWrapper>
          <Layout>
            {children}
          </Layout>
        </RainbowKitProviderWrapper>
      </body>
    </html>
  );
}
