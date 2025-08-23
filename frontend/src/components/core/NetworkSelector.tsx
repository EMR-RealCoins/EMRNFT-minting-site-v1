'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function NetworkSelector() {
  const { isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected) {
    return null;
  }

  const handleSwitchToMainnet = () => {
    switchChain({ chainId: 1 });
  };

  const handleSwitchToAmoy = () => {
    switchChain({ chainId: 80002 });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Select Network
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleSwitchToMainnet}
          disabled={isPending}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3"
        >
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="text-center">
            <div className="font-medium text-sm">Ethereum</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Mainnet</div>
          </div>
        </Button>

        <Button
          onClick={handleSwitchToAmoy}
          disabled={isPending}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3"
        >
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-center">
            <div className="font-medium text-sm">Polygon</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Amoy Testnet</div>
          </div>
        </Button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          Switching network...
        </div>
      )}

      <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
        <p>Choose your preferred network for minting NFTs</p>
        <p className="mt-1">
          <Badge variant="outline" className="text-xs">
            Mainnet: Real transactions
          </Badge>
          {' '}
          <Badge variant="outline" className="text-xs">
            Testnet: Free testing
          </Badge>
        </p>
      </div>
    </div>
  );
}
