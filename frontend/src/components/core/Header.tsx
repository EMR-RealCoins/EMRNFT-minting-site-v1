'use client';

import WalletConnect from './WalletConnect';
import { APP_CONFIG } from '@/lib/constants';

export default function Header() {
  return (
    <header className="bg-[#0A1F44] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-[#0A1F44] font-bold text-lg">HOE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {APP_CONFIG.name}
              </h1>
              <p className="text-sm text-gray-300">
                NFT Collectibles
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#about"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
}
