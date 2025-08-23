'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WalletConnect from '@/components/core/WalletConnect';
import WalletStatus from '@/components/core/WalletStatus';
import NFTMintForm from '@/components/core/NFTMintForm';

// Landing section component
const LandingSection = () => (
  <section className="py-20 text-center">
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
          House of Emirates
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            NFT Collectibles
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Transform your physical and historical coins into unique digital collectibles 
          on the Ethereum blockchain with secure, audited smart contracts.
        </p>
        <div className="flex justify-center">
          <WalletConnect />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <CardTitle className="text-slate-900 dark:text-white">Secure & Audited</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Built with OpenZeppelin audited contracts and role-based access control for maximum security.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <CardTitle className="text-slate-900 dark:text-white">IPFS Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Metadata stored on decentralized IPFS network ensuring long-term availability and immutability.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <CardTitle className="text-slate-900 dark:text-white">OpenSea Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Fully compliant with OpenSea metadata standards for seamless marketplace integration.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              1
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Connect Wallet</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Connect your MetaMask or other Web3 wallet
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              2
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Upload Image</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Upload your coin image to IPFS
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              3
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Add Metadata</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add description and attributes
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              4
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Mint NFT</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Mint your NFT on Ethereum
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Minting section component
const MintingSection = () => (
  <section className="py-16 bg-gradient-to-b from-white to-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#0A1F44] sm:text-5xl">
          Mint Your NFT Collectible
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Follow the steps below to turn your physical and historical coins into unique digital collectibles on the Ethereum blockchain.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Side Panel: Wallet Status */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <Card className="border-gray-200 shadow-md bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#0A1F44] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Wallet Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WalletStatus />
              </CardContent>
            </Card>
          </div>

          {/* Main Panel: Minting Form */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#0A1F44]">
                  Create a New Collectible
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill in the details below to mint your NFT.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NFTMintForm
                  onMint={(data) => {
                    console.log('Minting NFT with data:', data);
                    alert('Minting functionality will be implemented in later tasks!');
                  }}
                  isLoading={false}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showMinting, setShowMinting] = useState(false);

  useEffect(() => {
    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Use wagmi hooks only after mounting
  const { isConnected, isConnecting } = useAccount();

  // Automatically show minting form when wallet is connected
  useEffect(() => {
    if (mounted && isConnected && !isConnecting) {
      setShowMinting(true);
    } else {
      setShowMinting(false);
    }
  }, [mounted, isConnected, isConnecting]);

  // Show loading state during hydration
  if (!mounted) {
    return <LandingSection />;
  }

  // If wallet is connected, show minting form directly
  if (isConnected && showMinting) {
    return <MintingSection />;
  }

  // If wallet is not connected, show landing page
  return <LandingSection />;
}
