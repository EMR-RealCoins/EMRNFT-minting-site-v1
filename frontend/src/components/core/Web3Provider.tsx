'use client';

import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { mainnet, sepolia, polygonAmoy, hardhat } from 'wagmi/chains';
import { isTestnetMode } from '@/lib/env';

// Supported networks based on environment
const SUPPORTED_NETWORKS = {
  [mainnet.id]: mainnet,
  ...(isTestnetMode() ? {
    [sepolia.id]: sepolia,
    [polygonAmoy.id]: polygonAmoy,
    [hardhat.id]: hardhat,
  } : {}),
} as const;

interface Web3ContextType {
  // Network state
  currentChainId: number | undefined;
  isSupportedNetwork: boolean;
  supportedNetworks: typeof SUPPORTED_NETWORKS;
  
  // Network switching
  switchToNetwork: (chainId: number) => Promise<void>;
  switchToMainnet: () => Promise<void>;
  switchToSepolia: () => Promise<void>;
  switchToTestnet: () => Promise<void>;
  switchToHardhat: () => Promise<void>;
  
  // Connection state
  isConnected: boolean;
  userAddress: string | undefined;
  
  // Utility functions
  getNetworkName: (chainId: number) => string;
  getNetworkIcon: (chainId: number) => string;
  isMainnet: boolean;
  isSepolia: boolean;
  isTestnet: boolean;
  isHardhat: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  // Check if current network is supported
  const isSupportedNetwork = useMemo(() => {
    if (!chainId) return false;
    return chainId in SUPPORTED_NETWORKS;
  }, [chainId]);
  
  // Get current network info
  const currentChainId = chainId;
  const isMainnet = chainId === mainnet.id;
  const isSepolia = chainId === sepolia.id;
  const isTestnet = chainId === polygonAmoy.id;
  const isHardhat = chainId === hardhat.id;
  
  // Network switching functions
  const switchToNetwork = useCallback(async (targetChainId: number) => {
    if (!isSupportedNetwork || targetChainId === chainId) return;
    
    try {
      await switchChain({ chainId: targetChainId });
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  }, [chainId, isSupportedNetwork, switchChain]);
  
  const switchToMainnet = useCallback(async () => {
    await switchToNetwork(mainnet.id);
  }, [switchToNetwork]);
  
  const switchToSepolia = useCallback(async () => {
    await switchToNetwork(sepolia.id);
  }, [switchToNetwork]);
  
  const switchToTestnet = useCallback(async () => {
    await switchToNetwork(polygonAmoy.id);
  }, [switchToNetwork]);
  
  const switchToHardhat = useCallback(async () => {
    await switchToNetwork(hardhat.id);
  }, [switchToNetwork]);
  
  // Utility functions
  const getNetworkName = useCallback((chainId: number) => {
    switch (chainId) {
      case mainnet.id:
        return 'Ethereum Mainnet';
      case sepolia.id:
        return 'Sepolia Testnet';
      case polygonAmoy.id:
        return 'Polygon Amoy Testnet';
      case hardhat.id:
        return 'Hardhat Localhost';
      default:
        return 'Unknown Network';
    }
  }, []);
  
  const getNetworkIcon = useCallback((chainId: number) => {
    switch (chainId) {
      case mainnet.id:
        return '🔵'; // Ethereum blue
      case sepolia.id:
        return '🟢'; // Sepolia green
      case polygonAmoy.id:
        return '🟣'; // Polygon purple
      case hardhat.id:
        return '🛠️'; // Tool emoji for Hardhat
      default:
        return '❓';
    }
  }, []);
  
  const contextValue: Web3ContextType = {
    currentChainId,
    isSupportedNetwork,
    supportedNetworks: SUPPORTED_NETWORKS,
    switchToNetwork,
    switchToMainnet,
    switchToSepolia,
    switchToTestnet,
    switchToHardhat,
    isConnected,
    userAddress: address,
    getNetworkName,
    getNetworkIcon,
    isMainnet,
    isSepolia,
    isTestnet,
    isHardhat,
  };
  
  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  );
}
