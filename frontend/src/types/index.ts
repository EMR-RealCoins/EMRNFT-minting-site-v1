// NFT Metadata Types (OpenSea Standards Compliant)
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: string | number;
  display_type?: 'boost_number' | 'boost_percentage' | 'number' | 'date';
}

// Contract Types
export interface ContractConfig {
  address: string;
  abi: unknown[];
  network: 'mainnet' | 'amoy';
}

// Wallet Types
export interface WalletInfo {
  address: string;
  isConnected: boolean;
  chainId: number;
  hasMinterRole: boolean;
  hasAdminRole: boolean;
}

// Network Types
export type NetworkType = 'mainnet' | 'amoy';

export interface NetworkConfig {
  id: number;
  name: string;
  rpcUrl: string;
  explorer: string;
  currency: string;
  currencySymbol: string;
}

// Minting Types
export interface MintingFormData {
  name: string;
  description: string;
  image: File | null;
  recipient: string;
  attributes: Attribute[];
}

export interface MintingResult {
  success: boolean;
  tokenId?: number;
  transactionHash?: string;
  metadataURI?: string;
  error?: string;
}

// Pinata Types
export interface PinataUploadResult {
  success: boolean;
  cid?: string;
  error?: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'select';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}
