'use client';

import { useAccount, useChainId } from 'wagmi';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Avatar,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccountBalanceWallet as WalletIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

// Custom styled components
const StatusCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
}));

const NetworkChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  fontWeight: 600,
  '&.connected': {
    background: '#10b981',
    color: 'white',
  },
  '&.disconnected': {
    background: '#ef4444',
    color: 'white',
  },
}));

export default function WalletStatus() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const getChainName = (id: number) => {
    switch (id) {
      case 1:
        return 'Ethereum Mainnet';
      case 80002:
        return 'Polygon Amoy Testnet';
      default:
        return 'Unknown Network';
    }
  };

  if (!isConnected || !address) {
    return (
      <StatusCard>
        <Stack spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: '#ef4444',
              color: 'white',
              width: 48,
              height: 48,
            }}
          >
            <WarningIcon />
          </Avatar>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Wallet not connected
          </Typography>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            Connect your wallet to start minting NFTs
          </Typography>
        </Stack>
      </StatusCard>
    );
  }

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const isSupportedNetwork = chainId === 1 || chainId === 80002;

  return (
    <StatusCard>
      <Stack spacing={2}>
        {/* Connection Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckIcon sx={{ color: '#10b981', fontSize: 20 }} />
          <Typography variant="body2" fontWeight={600} color="#10b981">
            Connected
          </Typography>
        </Box>

        {/* Wallet Address */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: '#D4AF37',
              color: '#0A1F44',
              width: 32,
              height: 32,
            }}
          >
            <WalletIcon />
          </Avatar>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Wallet Address
            </Typography>
            <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
              {shortAddress}
            </Typography>
          </Box>
        </Box>

        {/* Network Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NetworkChip
            label={getChainName(chainId)}
            className={isSupportedNetwork ? 'connected' : 'disconnected'}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            {isSupportedNetwork ? 'Network Supported' : 'Network Not Supported'}
          </Typography>
        </Box>

        {/* Network Warning */}
        {!isSupportedNetwork && (
          <Box sx={{ 
            p: 1.5, 
            bgcolor: '#fef3c7', 
            borderRadius: 1, 
            border: '1px solid #f59e0b' 
          }}>
            <Typography variant="caption" color="#92400e" textAlign="center">
              ⚠️ Please switch to Ethereum Mainnet or Polygon Amoy Testnet to mint NFTs.
            </Typography>
          </Box>
        )}

        {/* Additional Info */}
        <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            Ready to mint your NFT collectibles
          </Typography>
        </Box>
      </Stack>
    </StatusCard>
  );
}
