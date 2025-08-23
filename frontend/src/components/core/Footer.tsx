'use client';

import { APP_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <span className="text-[#0A1F44] font-bold text-sm">HOE</span>
              </div>
              <div>
                <h3 className="font-bold text-white">
                  {APP_CONFIG.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {APP_CONFIG.description}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 max-w-md">
              Transform your physical and historical coins into unique digital collectibles 
              on the Ethereum blockchain with secure, audited smart contracts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#mint"
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  Mint NFT
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#contact"
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 {APP_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="#privacy"
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
