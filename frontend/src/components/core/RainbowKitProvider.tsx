'use client';

import { ReactNode } from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, hardhat, sepolia } from 'wagmi/chains';
import { isTestnetMode } from '@/lib/env';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, createConfig as createWagmiConfig } from 'wagmi';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { WagmiProvider } from 'wagmi';

// Create wagmi config with proper WalletConnect configuration
const config = createWagmiConfig({
  chains: [
    // Always include mainnet for reference
    mainnet,
    // Conditionally include testnet chains based on environment
    ...(isTestnetMode() ? [
      sepolia,
      {
        ...polygon,
        id: 80002, // Polygon Amoy Testnet
        name: 'Polygon Amoy Testnet',
        network: 'polygon-amoy',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ['https://rpc-amoy.polygon.technology'],
          },
          public: {
            http: ['https://rpc-amoy.polygon.technology'],
          },
        },
        blockExplorers: {
          default: {
            name: 'PolygonScan',
            url: 'https://www.oklink.com/amoy',
          },
        },
      },
      hardhat,
    ] : []),
  ],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
      showQrModal: true,
      metadata: {
        name: 'House of Emirates NFT',
        description: 'NFT Minting Interface',
        url: 'https://houseofemirates.com',
        icons: ['https://houseofemirates.com/icon.png']
      }
    }),
    coinbaseWallet({ 
      appName: 'House of Emirates NFT',
      appLogoUrl: 'https://houseofemirates.com/logo.png'
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    ...(isTestnetMode() ? {
      [sepolia.id]: http(),
      [80002]: http('https://rpc-amoy.polygon.technology'),
      [hardhat.id]: http(),
    } : {} as Record<number, ReturnType<typeof http>>),
  },
  ssr: false, // Disable SSR to prevent initialization issues
});

// Create React Query client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

interface RainbowKitProviderProps {
  children: ReactNode;
}

export default function RainbowKitProviderWrapper({ children }: RainbowKitProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          showRecentTransactions={true}
          coolMode={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
