'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BaseComponentProps } from '@/types';

interface WalletConnectProps extends BaseComponentProps {}

export function WalletConnect({ className = '' }: WalletConnectProps) {
  return (
    <div className={className}>
      <ConnectButton
        label="Connect Wallet"
        showBalance={false}
        chainStatus="icon"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </div>
  );
}
