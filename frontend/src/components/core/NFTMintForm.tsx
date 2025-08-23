'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from './ImageUpload';
import MetadataForm from './MetadataForm';

interface MintData {
  image: File;
  metadata: {
    name: string;
    description: string;
    attributes: Array<{ trait_type: string; value: string; display_type?: string }>;
  };
  recipient: string;
}

interface NFTMintFormProps {
  onMint: (data: MintData) => void;
  isLoading?: boolean;
}

export default function NFTMintForm({ onMint, isLoading = false }: NFTMintFormProps) {
  const { address } = useAccount();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [recipientAddress, setRecipientAddress] = useState(address || '');
  const [metadata, setMetadata] = useState({
    name: '',
    description: '',
    attributes: [] as Array<{ trait_type: string; value: string; display_type?: string }>,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedImage) {
      alert('Please select an image for your NFT');
      return;
    }
    
    if (!metadata.name.trim()) {
      alert('Please enter a name for your NFT');
      return;
    }
    
    if (!metadata.description.trim()) {
      alert('Please enter a description for your NFT');
      return;
    }
    
    if (!recipientAddress || !recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    const mintData = {
      image: selectedImage,
      metadata,
      recipient: recipientAddress,
    };

    onMint(mintData);
  };

  const isFormValid = selectedImage && metadata.name.trim() && metadata.description.trim() && recipientAddress.match(/^0x[a-fA-F0-9]{40}$/);

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A1F44] to-[#1a365d] px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0A1F44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Step 1: Upload Coin Image</h3>
                <p className="text-sm text-gray-200">Select a high-quality image of your coin</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ImageUpload
              onImageSelect={setSelectedImage}
              selectedImage={selectedImage}
            />
          </div>
        </div>

        {/* Metadata Form Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A1F44] to-[#1a365d] px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0A1F44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Step 2: Metadata & Attributes</h3>
                <p className="text-sm text-gray-200">Describe your coin and add relevant attributes</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <MetadataForm
              metadata={metadata}
              onMetadataChange={setMetadata}
            />
          </div>
        </div>

        {/* Recipient Address Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A1F44] to-[#1a365d] px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0A1F44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Step 3: Recipient Wallet</h3>
                <p className="text-sm text-gray-200">Choose who will receive this NFT</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet Address
                </label>
                <Input
                  type="text"
                  placeholder="0x..."
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full font-mono border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-colors"
                />
                {recipientAddress && !recipientAddress.match(/^0x[a-fA-F0-9]{40}$/) && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Invalid Ethereum address format
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRecipientAddress(address || '')}
                  disabled={!address}
                  className="border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors disabled:opacity-50"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Use My Wallet
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRecipientAddress('')}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mint Button Section */}
        <div className="bg-gradient-to-br from-[#D4AF37]/5 to-[#C09B2D]/10 rounded-xl border border-[#D4AF37]/20 p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Ready to Mint Your NFT?</h3>
            <p className="text-gray-600">
              Complete the form above and click the button below to create your digital collectible
            </p>
          </div>
          
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C09B2D] hover:from-[#C09B2D] hover:to-[#D4AF37] text-[#0A1F44] py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-[#0A1F44] border-t-transparent rounded-full animate-spin"></div>
                <span>Minting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Mint NFT</span>
              </div>
            )}
          </Button>
          
          {!isFormValid && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 text-amber-800 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Please complete all required fields to enable minting</span>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
