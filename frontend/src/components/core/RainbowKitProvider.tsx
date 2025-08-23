'use client';

import React from 'react';
import { RainbowKitProvider as RainbowKitProviderBase } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygonAmoy } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { BaseComponentProps } from '@/types';

interface RainbowKitProviderProps extends BaseComponentProps {
  children: React.ReactNode;
}

// Configure chains for the app
const chains = [mainnet, polygonAmoy];

// Set up wagmi config
const config = getDefaultConfig({
  appName: 'House of Emirates NFT',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains,
  ssr: true,
});

// Create a client
const queryClient = new QueryClient();

export function RainbowKitProvider({ children, className = '' }: RainbowKitProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProviderBase
          chains={chains}
          locale="en-US"
          modalSize="wide"
        >
          <div className={className}>
            {children}
          </div>
        </RainbowKitProviderBase>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
