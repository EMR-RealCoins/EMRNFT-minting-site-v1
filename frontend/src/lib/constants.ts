// Network Configurations
export const NETWORKS = {
  mainnet: {
    id: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    explorer: 'https://etherscan.io',
    currency: 'Ether',
    currencySymbol: 'ETH',
  },
  sepolia: {
    id: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org',
    explorer: 'https://sepolia.etherscan.io',
    currency: 'Ether',
    currencySymbol: 'ETH',
  },
  amoy: {
    id: 80002,
    name: 'Polygon Amoy Testnet',
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC_URL || 'https://rpc-amoy.polygon.technology',
    explorer: 'https://www.oklink.com/amoy',
    currency: 'MATIC',
    currencySymbol: 'MATIC',
  },
} as const;

// Contract Addresses
export const CONTRACT_ADDRESSES = {
  mainnet: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || '',
  sepolia: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA || '0x4aaA77E971fc35Df46493F37D732B05461C17d2A',
  amoy: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_AMOY || '',
} as const;

// Pinata Configuration
export const PINATA_CONFIG = {
  gateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || 'https://gateway.pinata.cloud/ipfs/',
  jwt: process.env.PINATA_JWT || '',
} as const;

// App Configuration
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'House of Emirates NFT',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'NFT Collectibles for House of Emirates',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// Contract Roles
export const CONTRACT_ROLES = {
  DEFAULT_ADMIN_ROLE: '0x0000000000000000000000000000000000000000000000000000000000000000',
  MINTER_ROLE: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
} as const;

// File Upload Limits
export const UPLOAD_LIMITS = {
  maxImageSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxMetadataSize: 1024 * 1024, // 1MB
} as const;

// Common Coin Attributes
export const COMMON_COIN_ATTRIBUTES = [
  'Year',
  'Mint Mark',
  'Condition',
  'Rarity',
  'Material',
  'Weight',
  'Diameter',
  'Country',
  'Denomination',
  'Series',
] as const;

// Error Messages
export const ERROR_MESSAGES = {
  wallet: {
    notConnected: 'Please connect your wallet to continue',
    wrongNetwork: 'Please switch to the correct network',
    insufficientBalance: 'Insufficient balance for transaction',
  },
  upload: {
    fileTooLarge: 'File size exceeds the maximum limit',
    invalidFileType: 'Invalid file type. Please use JPEG, PNG, or WebP',
    uploadFailed: 'Upload failed. Please try again',
  },
  minting: {
    transactionFailed: 'Transaction failed. Please try again',
    gasEstimationFailed: 'Failed to estimate gas. Please try again',
    userRejected: 'Transaction was rejected by user',
  },
  validation: {
    requiredField: 'This field is required',
    invalidAddress: 'Please enter a valid wallet address',
    invalidUrl: 'Please enter a valid URL',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  wallet: {
    connected: 'Wallet connected successfully',
    networkSwitched: 'Network switched successfully',
  },
  upload: {
    imageUploaded: 'Image uploaded successfully',
    metadataUploaded: 'Metadata uploaded successfully',
  },
  minting: {
    nftMinted: 'NFT minted successfully!',
    transactionConfirmed: 'Transaction confirmed on blockchain',
  },
  role: {
    roleGranted: 'Role granted successfully',
    roleRevoked: 'Role revoked successfully',
  },
} as const;
