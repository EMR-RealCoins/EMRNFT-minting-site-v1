'use client';

import { createContext, useContext, useCallback, useMemo, ReactNode, useEffect, useState } from 'react';
import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';

// HOE NFT Contract ABI
const HOE_NFT_ABI = [{"inputs":[{"internalType":"address","name":"defaultAdmin","type":"address"},{"internalType":"address","name":"minter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessControlBadConfirmation","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"neededRole","type":"bytes32"}],"name":"AccessControlUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"callerConfirmation","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"uri","type":"string"}],"name":"safeMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"newUri","type":"string"}],"name":"updateTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;

// Contract addresses for different networks
const CONTRACT_ADDRESSES = {
  1: '0x0000000000000000000000000000000000000000', // Ethereum Mainnet (placeholder)
  80002: '0x8040F5f215b76d619a6c4cBFc03c266258D96A19', // Polygon Amoy Testnet
  11155111: '0x4aaA77E971fc35Df46493F37D732B05461C17d2A', // Sepolia Testnet
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Hardhat Localhost
} as const;

// Contract configuration
const CONTRACT_CONFIG = {
  address: CONTRACT_ADDRESSES[1 as keyof typeof CONTRACT_ADDRESSES],
  abi: HOE_NFT_ABI,
} as const;

interface ContractContextType {
  // Contract state
  contractAddress: string | undefined;
  isContractReady: boolean;
  
  // Contract information
  contractOwner: string | undefined;
  totalSupply: number | undefined;
  isLoadingContractInfo: boolean;
  
  // Role checking
  hasMinterRole: boolean | undefined;
  isLoadingRole: boolean;
  
  // Minting functions
  mintNFT: (to: string, tokenURI: string) => Promise<{ hash: string } | null>;
  isMinting: boolean;
  mintTransactionHash: string | undefined;
  mintTransactionStatus: 'idle' | 'loading' | 'success' | 'error' | 'pending';
  mintError: Error | null;
  resetMintTransaction: () => void;
  
  // Utility functions
  formatAddress: (address: string) => string;
  parseEtherValue: (value: string) => bigint;
  formatEtherValue: (value: bigint) => string;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function useContract() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
}

interface ContractProviderProps {
  children: ReactNode;
}

export function ContractProvider({ children }: ContractProviderProps) {
  const { address } = useAccount();
  const chainId = useChainId();
  
  // Get contract address for current network
  const contractAddress = useMemo(() => {
    if (!chainId) return undefined;
    return CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  }, [chainId]);
  
  // Check if contract is ready (address exists and is on supported network)
  const isContractReady = useMemo(() => {
    return !!contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000';
  }, [contractAddress]);
  
  // Get DEFAULT_ADMIN_ROLE hash from contract
  const { data: defaultAdminRoleHash } = useReadContract({
    address: contractAddress,
    abi: HOE_NFT_ABI,
    functionName: 'DEFAULT_ADMIN_ROLE',
    query: {
      enabled: isContractReady,
    },
  });

  // Get MINTER_ROLE hash from contract
  const { data: minterRoleHash } = useReadContract({
    address: contractAddress,
    abi: HOE_NFT_ABI,
    functionName: 'MINTER_ROLE',
    query: {
      enabled: isContractReady,
    },
  });

  // Since we can't directly get role members from the standard AccessControl,
  // we'll use the deployed contract's known admin address for now
  // In a production environment, you might want to listen to RoleGranted events
  const contractOwner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as `0x${string}`; // Default admin from deployment
  const isLoadingOwner = false;

  // Get contract name to help with total supply calculation
  const { data: contractName } = useReadContract({
    address: contractAddress,
    abi: HOE_NFT_ABI,
    functionName: 'name',
    query: {
      enabled: isContractReady,
    },
  });

  // Check if user has minter role
  const { data: hasMinterRole, isLoading: isLoadingRole } = useReadContract({
    address: contractAddress,
    abi: HOE_NFT_ABI,
    functionName: 'hasRole',
    args: [minterRoleHash!, address!],
    query: {
      enabled: isContractReady && !!address && !!minterRoleHash,
    },
  });
  
  // Minting transaction
  const { writeContract, data: mintTransactionHash, isPending: isMinting, error: mintError, reset: resetMintTransaction } = useWriteContract();
  
  // Wait for transaction receipt
  const { status: mintTransactionStatus } = useWaitForTransactionReceipt({
    hash: mintTransactionHash,
  });

  // Get total supply directly from the contract
  const { data: totalSupplyData, isLoading: isLoadingTotalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: contractAddress,
    abi: HOE_NFT_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: isContractReady,
    },
  });

  // Convert totalSupply from BigInt to number
  const totalSupply = useMemo(() => {
    return totalSupplyData ? Number(totalSupplyData) : undefined;
  }, [totalSupplyData]);

  // Refetch total supply when a mint is successful
  useEffect(() => {
    if (mintTransactionStatus === 'success') {
      refetchTotalSupply();
    }
  }, [mintTransactionStatus, refetchTotalSupply]);
  
  // Mint NFT function
  const mintNFT = useCallback(async (to: string, tokenURI: string) => {
    if (!isContractReady || !contractAddress) {
      throw new Error('Contract not ready');
    }
    
    if (!hasMinterRole) {
      throw new Error('User does not have minter role');
    }
    
    try {
      const result = await writeContract({
        ...CONTRACT_CONFIG,
        address: contractAddress as `0x${string}`,
        functionName: 'safeMint',
        args: [to as `0x${string}`, tokenURI],
      });
      
      return { hash: (result as unknown) as string };
    } catch (error) {
      console.error('Minting failed:', error);
      return null;
    }
  }, [isContractReady, contractAddress, hasMinterRole, writeContract]);
  
  // Utility functions
  const formatAddress = useCallback((address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);
  
  const parseEtherValue = useCallback((value: string) => {
    return parseEther(value);
  }, []);
  
  const formatEtherValue = useCallback((value: bigint) => {
    return formatEther(value);
  }, []);
  
  const contextValue: ContractContextType = {
    contractAddress,
    isContractReady,
    contractOwner,
    totalSupply,
    isLoadingContractInfo: isLoadingOwner || isLoadingTotalSupply,
    hasMinterRole: hasMinterRole || false,
    isLoadingRole,
    mintNFT,
    isMinting,
    mintTransactionHash,
    mintTransactionStatus,
    mintError,
    resetMintTransaction,
    formatAddress,
    parseEtherValue,
    formatEtherValue,
  };
  
  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
}
