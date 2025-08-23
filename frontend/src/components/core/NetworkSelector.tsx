'use client';

import React from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BaseComponentProps } from '@/types';
import { NETWORKS } from '@/lib/constants';

interface NetworkSelectorProps extends BaseComponentProps {}

export function NetworkSelector({ className = '' }: NetworkSelectorProps) {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  // Get network info from chainId
  const getNetworkInfo = (id: number) => {
    if (id === NETWORKS.mainnet.id) return NETWORKS.mainnet;
    if (id === NETWORKS.amoy.id) return NETWORKS.amoy;
    return { name: 'Unknown Network', currency: 'Unknown', currencySymbol: 'Unknown' };
  };

  const isCorrectNetwork = chainId === NETWORKS.mainnet.id || chainId === NETWORKS.amoy.id;

  const handleSwitchToMainnet = () => {
    if (switchChain) {
      switchChain({ chainId: NETWORKS.mainnet.id });
    }
  };

  const handleSwitchToAmoy = () => {
    if (switchChain) {
      switchChain({ chainId: NETWORKS.amoy.id });
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Network Selection</CardTitle>
        <CardDescription>
          Choose your preferred blockchain network
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Network Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Current Network:</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isCorrectNetwork ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {getNetworkInfo(chainId).name}
              </span>
            </div>
          </div>
          {!isCorrectNetwork && (
            <p className="text-xs text-red-600 mt-2">
              Please switch to a supported network
            </p>
          )}
        </div>

        {/* Network Options */}
        <div className="grid grid-cols-1 gap-3">
          <Button
            variant={chainId === NETWORKS.mainnet.id ? "default" : "outline"}
            onClick={handleSwitchToMainnet}
            disabled={isPending || chainId === NETWORKS.mainnet.id}
            className="justify-start"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">E</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Ethereum Mainnet</div>
                <div className="text-xs text-gray-500">Production network</div>
              </div>
              {chainId === NETWORKS.mainnet.id && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
          </Button>

          <Button
            variant={chainId === NETWORKS.amoy.id ? "default" : "outline"}
            onClick={handleSwitchToAmoy}
            disabled={isPending || chainId === NETWORKS.amoy.id}
            className="justify-start"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Polygon Amoy Testnet</div>
                <div className="text-xs text-gray-500">Testing network</div>
              </div>
              {chainId === NETWORKS.amoy.id && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
          </Button>
        </div>

        {/* Network Info */}
        {chainId && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-blue-800">
              <div className="font-medium">Network Details:</div>
              <div>Chain ID: {chainId}</div>
              <div>Currency: {getNetworkInfo(chainId).currencySymbol}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
