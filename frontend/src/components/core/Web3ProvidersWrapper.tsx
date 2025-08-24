'use client';

import { Suspense } from 'react';
import RainbowKitProviderWrapper from './RainbowKitProvider';
import { ContractProvider } from './ContractProvider';
import { Web3Provider } from './Web3Provider';
import Layout from './Layout';

interface Web3ProvidersWrapperProps {
  children: React.ReactNode;
}

export default function Web3ProvidersWrapper({ children }: Web3ProvidersWrapperProps) {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '18px',
        color: '#0A1F44'
      }}>
        Loading House of Emirates NFT Platform...
      </div>
    }>
      <RainbowKitProviderWrapper>
        <ContractProvider>
          <Web3Provider>
            <Layout>{children}</Layout>
          </Web3Provider>
        </ContractProvider>
      </RainbowKitProviderWrapper>
    </Suspense>
  );
}
