'use client';

import React from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Badge } from '@/components/ui/badge';

export default function WalletStatus() {
  const { address, isConnected, isConnecting } = useAccount();
  const chainId = useChainId();

  if (isConnecting) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Connecting...
        </span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          Please connect your wallet to continue
        </p>
      </div>
    );
  }

  const getChainName = (id: number) => {
    switch (id) {
      case 1:
        return 'Ethereum Mainnet';
      case 80002:
        return 'Polygon Amoy Testnet';
      default:
        return 'Unknown Network';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Wallet Address:
        </span>
        <Badge variant="secondary" className="font-mono text-xs">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Network:
        </span>
        <Badge 
          variant={chainId === 1 || chainId === 80002 ? "default" : "destructive"}
          className="text-xs"
        >
          {getChainName(chainId)}
        </Badge>
      </div>

      {chainId !== 1 && chainId !== 80002 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Please switch to Ethereum Mainnet or Polygon Amoy Testnet to mint NFTs.
          </p>
        </div>
      )}
    </div>
  );
}
