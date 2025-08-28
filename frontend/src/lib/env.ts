// Environment configuration
export const ENV_CONFIG = {
  // Set to 'mainnet' or 'testnet' in your .env.local file
  // Default to testnet for safety
  NETWORK_MODE: process.env.NEXT_PUBLIC_NETWORK_MODE || 'testnet',
  
  // Contract addresses based on network mode
  CONTRACT_ADDRESSES: {
    mainnet: {
      ethereum: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || '',
    },
    testnet: {
      sepolia: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA || '0x4aaA77E971fc35Df46493F37D732B05461C17d2A',
      amoy: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_AMOY || '0x8040F5f215b76d619a6c4cBFc03c266258D96A19',
      hardhat: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    }
  },
  
  // Supported networks based on mode
  SUPPORTED_NETWORKS: {
    mainnet: [1], // Only Ethereum Mainnet
    testnet: [11155111, 80002, 31337], // Sepolia, Polygon Amoy, Hardhat
  },
  
  // RPC URLs
  RPC_URLS: {
    1: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    11155111: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org',
    80002: process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC_URL || 'https://rpc-amoy.polygon.technology',
    31337: 'http://localhost:8545', // Hardhat local
  },
  
  // Block explorers
  EXPLORERS: {
    1: 'https://etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    80002: 'https://www.oklink.com/amoy',
    31337: undefined, // No explorer for local hardhat
  }
} as const;

// Helper functions
export const isMainnetMode = () => ENV_CONFIG.NETWORK_MODE === 'mainnet';
export const isTestnetMode = () => ENV_CONFIG.NETWORK_MODE === 'testnet';

export const getSupportedNetworks = () => ENV_CONFIG.SUPPORTED_NETWORKS[ENV_CONFIG.NETWORK_MODE as keyof typeof ENV_CONFIG.SUPPORTED_NETWORKS];

export const getContractAddress = (chainId: number) => {
  const mode = ENV_CONFIG.NETWORK_MODE;
  const addresses = ENV_CONFIG.CONTRACT_ADDRESSES[mode as keyof typeof ENV_CONFIG.CONTRACT_ADDRESSES];
  
  if (mode === 'mainnet') {
    return chainId === 1 ? (addresses as { ethereum: string }).ethereum : undefined;
  } else {
    return addresses[chainId as keyof typeof addresses] || undefined;
  }
};

export const getRpcUrl = (chainId: number) => ENV_CONFIG.RPC_URLS[chainId as keyof typeof ENV_CONFIG.RPC_URLS];
export const getExplorerUrl = (chainId: number) => ENV_CONFIG.EXPLORERS[chainId as keyof typeof ENV_CONFIG.EXPLORERS];
