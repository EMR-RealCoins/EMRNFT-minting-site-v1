'use client';

import React from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BaseComponentProps } from '@/types';
import { NETWORKS } from '@/lib/constants';

interface WalletStatusProps extends BaseComponentProps {}

export function WalletStatus({ className = '' }: WalletStatusProps) {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const chainId = useChainId();
  
  // Get network info from chainId
  const getNetworkInfo = (id: number) => {
    if (id === NETWORKS.mainnet.id) return NETWORKS.mainnet;
    if (id === NETWORKS.amoy.id) return NETWORKS.amoy;
    return { name: 'Unknown Network', currency: 'Unknown', currencySymbol: 'Unknown' };
  };
  
  const networkInfo = getNetworkInfo(chainId);

  if (isConnecting) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Connecting...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isDisconnected || !isConnected) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Wallet Status</CardTitle>
          <CardDescription>Connect your wallet to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">No wallet connected</p>
            <Button variant="outline" disabled>
              Connect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Wallet Connected</CardTitle>
        <CardDescription>Your wallet is ready for transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
                  <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Address:</span>
              <span className="text-sm font-mono text-gray-900">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Network:</span>
              <span className="text-sm text-gray-900">
                {networkInfo.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Chain ID:</span>
              <span className="text-sm text-gray-900">
                {chainId || 'Unknown'}
              </span>
            </div>
          </div>
        
        <div className="pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600 font-medium">Connected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
