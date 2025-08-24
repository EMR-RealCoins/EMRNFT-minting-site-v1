'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Chip,
  Button,
  Skeleton,
  Alert,
  Collapse,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  OpenInNew as OpenInNewIcon,
  Verified as VerifiedIcon,
  AccountBalanceWallet as WalletIcon,
  Token as TokenIcon,
  Link as LinkIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useContract } from './ContractProvider';
import { useWeb3 } from './Web3Provider';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0A1F44 0%, #1a365d 100%)',
  color: 'white',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(10, 31, 68, 0.3)',
  border: '1px solid rgba(212, 175, 55, 0.2)',
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(1),
  backdropFilter: 'blur(10px)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #D4AF37 0%, #C09B2D 100%)',
  color: '#0A1F44',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #C09B2D 0%, #D4AF37 100%)',
  },
}));

export default function ContractInfo() {
  const { 
    contractAddress, 
    isContractReady, 
    contractOwner, 
    totalSupply, 
    isLoadingContractInfo 
  } = useContract();
  const { currentChainId, getNetworkName, supportedNetworks } = useWeb3();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopyAddress = async () => {
    if (contractAddress) {
      try {
        await navigator.clipboard.writeText(contractAddress);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const getExplorerUrl = () => {
    if (!currentChainId || !contractAddress) return '';
    const network = Object.values(supportedNetworks).find(n => n.id === currentChainId);
    if (currentChainId === 31337) return ''; // No explorer for hardhat
    return network?.blockExplorers?.default.url ? `${network.blockExplorers.default.url}/address/${contractAddress}` : '';
  };

  const getOpenSeaUrl = () => {
    if (!contractAddress) return '';
    
    // OpenSea URLs for different networks
    switch (currentChainId) {
      case 1: // Ethereum Mainnet
        return `https://opensea.io/assets/ethereum/${contractAddress}`;
      case 80002: // Polygon Amoy Testnet
        return `https://testnets.opensea.io/assets/amoy/${contractAddress}`;
      case 31337: // Hardhat localhost
        return ''; // No OpenSea for local
      default:
        return '';
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isContractReady || !contractAddress) {
    return (
      <StyledPaper>
        <Alert severity="warning" sx={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', color: 'white' }}>
          <Typography variant="body2">
            Contract not available. Please ensure you&apos;re connected to a supported network.
          </Typography>
        </Alert>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper>
      {/* Header - Always Visible */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': { opacity: 0.9 }
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <VerifiedIcon sx={{ color: '#D4AF37', fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight={700} color="#D4AF37">
              House of Emirates NFT Contract
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {getNetworkName(currentChainId || 1)} • {totalSupply || 0} NFT{(totalSupply || 0) !== 1 ? 's' : ''} minted
            </Typography>
          </Box>
        </Box>
        <IconButton sx={{ color: '#D4AF37' }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Expandable Content */}
      <Collapse in={expanded}>
        <Box sx={{ mt: 3 }}>
          <Stack spacing={2}>
            {/* Contract Address */}
            <InfoItem>
              <LinkIcon sx={{ color: '#D4AF37' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                  Contract Address
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" fontFamily="monospace">
                    {formatAddress(contractAddress)}
                  </Typography>
                  <Tooltip title={copiedAddress ? 'Copied!' : 'Copy Address'}>
                    <IconButton
                      size="small"
                      onClick={handleCopyAddress}
                      sx={{ color: copiedAddress ? '#4caf50' : '#D4AF37' }}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {getExplorerUrl() && (
                    <Tooltip title="View on Blockchain Explorer">
                      <IconButton
                        size="small"
                        onClick={() => window.open(getExplorerUrl(), '_blank')}
                        sx={{ color: '#D4AF37' }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            </InfoItem>

            {/* Contract Owner */}
            <InfoItem>
              <WalletIcon sx={{ color: '#D4AF37' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                  Contract Owner
                </Typography>
                {isLoadingContractInfo || !contractOwner ? (
                  <Skeleton variant="text" width={120} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                ) : (
                  <Typography variant="body2" fontFamily="monospace">
                    {formatAddress(contractOwner)}
                  </Typography>
                )}
              </Box>
            </InfoItem>

            {/* Total Supply */}
            <InfoItem>
              <TokenIcon sx={{ color: '#D4AF37' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                  Total Supply
                </Typography>
                {totalSupply === undefined ? (
                  <Skeleton variant="text" width={80} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                ) : (
                  <Typography variant="body2" fontWeight={600}>
                    {totalSupply} NFT{totalSupply !== 1 ? 's' : ''}
                  </Typography>
                )}
              </Box>
            </InfoItem>

            {/* Action Buttons */}
            <Box sx={{ pt: 2, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              {/* OpenSea Link */}
              {getOpenSeaUrl() && (
                <StyledButton
                  variant="contained"
                  startIcon={<OpenInNewIcon />}
                  onClick={() => window.open(getOpenSeaUrl(), '_blank')}
                  sx={{ flex: 1 }}
                >
                  View on OpenSea
                </StyledButton>
              )}
              

            </Box>

            {/* Local Network Notice */}
            {currentChainId === 31337 && (
              <Box sx={{ pt: 1 }}>
                <Chip
                  label="Local Development Network"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    color: '#D4AF37',
                    border: '1px solid #D4AF37',
                  }}
                />
              </Box>
            )}
          </Stack>
        </Box>
      </Collapse>
    </StyledPaper>
  );
}
