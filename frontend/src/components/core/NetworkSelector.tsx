'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Chip,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useWeb3 } from './Web3Provider';
import { isMainnetMode, isTestnetMode } from '@/lib/env';

export default function NetworkSelector() {
  const { 
    currentChainId, 
    isSupportedNetwork, 
    switchToMainnet, 
    switchToSepolia,
    switchToTestnet,
    getNetworkName,
    getNetworkIcon,
    isMainnet,
    isSepolia,
    isTestnet
  } = useWeb3();
  
  const [isSwitching, setIsSwitching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNetworkSwitch = async (targetChainId: number) => {
    if (targetChainId === currentChainId) return;
    
    setIsSwitching(true);
    setError(null);
    
    try {
      if (targetChainId === 1) {
        await switchToMainnet();
      } else if (targetChainId === 11155111) {
        await switchToSepolia();
      } else if (targetChainId === 80002) {
        await switchToTestnet();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch network');
    } finally {
      setIsSwitching(false);
    }
  };

  if (!currentChainId) {
    return (
      <Alert severity="info">
        Please connect your wallet to view network options
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} color="#0A1F44" gutterBottom>
        Network Selection
      </Typography>
      
      {/* Current Network Status */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="subtitle2" color="text.secondary">
            Current Network:
          </Typography>
          <Chip
            label={`${getNetworkIcon(currentChainId)} ${getNetworkName(currentChainId)}`}
            color={isSupportedNetwork ? 'success' : 'error'}
            variant="outlined"
            sx={{
              borderColor: isSupportedNetwork ? '#4caf50' : '#f44336',
              color: isSupportedNetwork ? '#4caf50' : '#f44336',
            }}
          />
        </Stack>
        
        {!isSupportedNetwork && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {isMainnetMode() 
              ? "You're on an unsupported network. Please switch to Ethereum Mainnet."
              : "You're on an unsupported network. Please switch to Ethereum Mainnet, Sepolia Testnet, or Polygon Amoy Testnet."
            }
          </Alert>
        )}
      </Box>

      {/* Network Options */}
      <Stack spacing={2}>
        {/* Ethereum Mainnet - Always visible */}
        <Box
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: isMainnet ? '#D4AF37' : 'divider',
            borderRadius: 2,
            bgcolor: isMainnet ? 'rgba(212, 175, 55, 0.05)' : 'background.paper',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" color="#0A1F44">
                🔵 Ethereum Mainnet
              </Typography>
              <Chip
                label="Production"
                size="small"
                color="primary"
                variant="outlined"
              />
            </Stack>
            
            <Button
              variant={isMainnet ? 'outlined' : 'contained'}
              onClick={() => handleNetworkSwitch(1)}
              disabled={isMainnet || isSwitching}
              sx={{
                borderColor: '#D4AF37',
                color: isMainnet ? '#D4AF37' : 'white',
                bgcolor: isMainnet ? 'transparent' : '#0A1F44',
                '&:hover': {
                  bgcolor: isMainnet ? 'rgba(212, 175, 55, 0.1)' : '#1a365d',
                },
              }}
            >
              {isMainnet ? 'Connected' : 'Switch to Mainnet'}
            </Button>
          </Stack>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Mint NFTs on the main Ethereum blockchain. Gas fees apply.
          </Typography>
        </Box>

        {/* Testnet Networks - Only visible in testnet mode */}
        {isTestnetMode() && (
          <>
            {/* Sepolia Testnet */}
            <Box
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: isSepolia ? '#D4AF37' : 'divider',
                borderRadius: 2,
                bgcolor: isSepolia ? 'rgba(212, 175, 55, 0.05)' : 'background.paper',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h6" color="#0A1F44">
                    🟢 Sepolia Testnet
                  </Typography>
                  <Chip
                    label="Testnet"
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Stack>
                
                <Button
                  variant={isSepolia ? 'outlined' : 'contained'}
                  onClick={() => handleNetworkSwitch(11155111)}
                  disabled={isSepolia || isSwitching}
                  sx={{
                    borderColor: '#D4AF37',
                    color: isSepolia ? '#D4AF37' : 'white',
                    bgcolor: isSepolia ? 'transparent' : '#0A1F44',
                    '&:hover': {
                      bgcolor: isSepolia ? 'rgba(212, 175, 55, 0.1)' : '#1a365d',
                    },
                  }}
                >
                  {isSepolia ? 'Connected' : 'Switch to Sepolia'}
                </Button>
              </Stack>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Test your NFTs on Ethereum Sepolia testnet. Free test ETH available.
              </Typography>
            </Box>

            {/* Polygon Amoy Testnet */}
            <Box
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: isTestnet ? '#D4AF37' : 'divider',
                borderRadius: 2,
                bgcolor: isTestnet ? 'rgba(212, 175, 55, 0.05)' : 'background.paper',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h6" color="#0A1F44">
                    🟣 Polygon Amoy Testnet
                  </Typography>
                  <Chip
                    label="Testnet"
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Stack>
                
                <Button
                  variant={isTestnet ? 'outlined' : 'contained'}
                  onClick={() => handleNetworkSwitch(80002)}
                  disabled={isTestnet || isSwitching}
                  sx={{
                    borderColor: '#D4AF37',
                    color: isTestnet ? '#D4AF37' : 'white',
                    bgcolor: isTestnet ? 'transparent' : '#0A1F44',
                    '&:hover': {
                      bgcolor: isTestnet ? 'rgba(212, 175, 55, 0.1)' : '#1a365d',
                    },
                  }}
                >
                  {isTestnet ? 'Connected' : 'Switch to Testnet'}
                </Button>
              </Stack>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Test your NFTs on Polygon Amoy testnet. Free test tokens available.
              </Typography>
            </Box>
          </>
        )}
      </Stack>

      {/* Loading State */}
      {isSwitching && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">
            Switching network...
          </Typography>
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
