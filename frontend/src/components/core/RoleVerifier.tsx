'use client';

import { useMemo } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useContract } from './ContractProvider';
import { useWeb3 } from './Web3Provider';

export default function RoleVerifier() {
  const { 
    hasMinterRole, 
    isLoadingRole, 
    isContractReady,
    contractAddress 
  } = useContract();
  
  const { isConnected, userAddress, currentChainId } = useWeb3();

  // Role status
  const roleStatus = useMemo(() => {
    if (!isConnected) return 'not-connected';
    if (!isContractReady) return 'contract-not-ready';
    if (isLoadingRole) return 'loading';
    if (hasMinterRole) return 'has-role';
    return 'no-role';
  }, [isConnected, isContractReady, isLoadingRole, hasMinterRole]);

  if (!isConnected) {
    return (
      <Alert severity="info">
        Please connect your wallet to verify your role
      </Alert>
    );
  }

  if (!isContractReady) {
    return (
      <Alert severity="warning">
        Contract not ready. Please ensure you&apos;re on a supported network.
      </Alert>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} color="#0A1F44" gutterBottom>
        Role Verification
      </Typography>
      
      <Stack spacing={2}>
        {/* User Address */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Wallet Address:
          </Typography>
          <Typography variant="body2" fontFamily="monospace" color="#0A1F44">
            {userAddress}
          </Typography>
        </Box>

        {/* Network */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Network:
          </Typography>
          <Typography variant="body2" color="#0A1F44">
            Chain ID: {currentChainId}
          </Typography>
        </Box>

        {/* Contract Address */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Contract Address:
          </Typography>
          <Typography variant="body2" fontFamily="monospace" color="#0A1F44">
            {contractAddress}
          </Typography>
        </Box>

        {/* Role Status */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Minter Role:
          </Typography>
          
          {isLoadingRole ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Checking role...
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={hasMinterRole ? 'Has Minter Role' : 'No Minter Role'}
                color={hasMinterRole ? 'success' : 'error'}
                variant="outlined"
                sx={{
                  borderColor: hasMinterRole ? '#4caf50' : '#f44336',
                  color: hasMinterRole ? '#4caf50' : '#f44336',
                }}
              />
              
              {hasMinterRole ? (
                <Typography variant="body2" color="success.main">
                  ✅ You can mint NFTs
                </Typography>
              ) : (
                <Typography variant="body2" color="error.main">
                  ❌ You cannot mint NFTs
                </Typography>
              )}
            </Stack>
          )}
        </Box>

        {/* Instructions */}
        {roleStatus === 'no-role' && (
          <Alert severity="warning">
            You don&apos;t have the minter role. Please contact an administrator to grant you minting permissions.
          </Alert>
        )}
        
        {roleStatus === 'has-role' && (
          <Alert severity="success">
            You have the minter role! You can now mint NFTs using this interface.
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
