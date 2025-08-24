'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Security as SecurityIcon,
  Storage as StorageIcon,
  ShoppingCart as ShoppingCartIcon,
  CloudUpload as UploadIcon,
  Description as DescriptionIcon,
  AccountBalanceWallet as WalletIcon,
  RocketLaunch as RocketIcon
} from '@mui/icons-material';
import WalletConnect from '@/components/core/WalletConnect';
import NFTMintForm from '@/components/core/NFTMintForm';
import ContractInfo from '@/components/core/ContractInfo';
import { useContract } from '@/components/core/ContractProvider';
import TransactionProgressModal from '@/components/core/TransactionProgressModal';
import { useWeb3 } from '@/components/core/Web3Provider';
import MobileNotSupported from '@/components/core/MobileNotSupported';

// Custom styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
  },
}));

const StepCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
  border: '2px solid #0A1F44',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(10, 31, 68, 0.15)',
  },
}));

// Landing section component
const LandingSection = () => (
  <Box>
      {/* Hero Section */}
    <HeroSection>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          fontWeight="bold" 
          color="#0A1F44" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          House of Emirates NFT Coin Collectibles
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          Transform your physical and historical coins into unique digital collectibles on the Ethereum blockchain
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <WalletConnect />
        </Box>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Connect your wallet to start minting your precious coin collection as NFTs
        </Typography>
      </Container>
    </HeroSection>

    {/* Features Section */}
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          fontWeight="bold" 
          color="#0A1F44" 
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose House of Emirates?
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          <FeatureCard>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: '#0A1F44', color: 'white' }}>
                  <SecurityIcon />
                </Avatar>
              }
              title={
                <Typography variant="h6" fontWeight={600} color="#0A1F44">
                  Secure & Audited
                </Typography>
              }
            />
          <CardContent>
              <Typography variant="body2" color="text.secondary">
              Built with OpenZeppelin audited contracts and role-based access control for maximum security.
              </Typography>
          </CardContent>
          </FeatureCard>
          
          <FeatureCard>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: '#0A1F44', color: 'white' }}>
                  <StorageIcon />
                </Avatar>
              }
              title={
                <Typography variant="h6" fontWeight={600} color="#0A1F44">
                  IPFS Storage
                </Typography>
              }
            />
          <CardContent>
              <Typography variant="body2" color="text.secondary">
              Metadata stored on decentralized IPFS network ensuring long-term availability and immutability.
              </Typography>
          </CardContent>
          </FeatureCard>
          
          <FeatureCard>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: '#0A1F44', color: 'white' }}>
                  <ShoppingCartIcon />
                </Avatar>
              }
              title={
                <Typography variant="h6" fontWeight={600} color="#0A1F44">
                  OpenSea Ready
                </Typography>
              }
            />
          <CardContent>
              <Typography variant="body2" color="text.secondary">
              Fully compliant with OpenSea metadata standards for seamless marketplace integration.
              </Typography>
          </CardContent>
          </FeatureCard>
        </Box>
      </Container>
    </Box>

    {/* How It Works Section */}
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          fontWeight="bold" 
          color="#0A1F44" 
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          How It Works
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
          {[
            { icon: <WalletIcon />, title: 'Connect Wallet', desc: 'Connect your MetaMask or other Web3 wallet' },
            { icon: <UploadIcon />, title: 'Upload Image', desc: 'Upload your coin image to IPFS' },
            { icon: <DescriptionIcon />, title: 'Add Metadata', desc: 'Add description and attributes' },
            { icon: <RocketIcon />, title: 'Mint NFT', desc: 'Mint your NFT on Ethereum' }
          ].map((step, index) => (
            <StepCard key={index}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: '#D4AF37',
                  color: '#0A1F44',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '1.5rem',
                }}
              >
                {step.icon}
              </Avatar>
              <Typography variant="h6" fontWeight={600} color="#0A1F44" gutterBottom>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.desc}
              </Typography>
            </StepCard>
          ))}
        </Box>
      </Container>
    </Box>
  </Box>
);

// Minting section component
const MintingSection = ({ 
  metadata, 
  onMetadataChange 
}: { 
  metadata: {
    name: string;
    description: string;
    external_url: string;
    attributes: Array<{ trait_type: string; value: string }>;
  }; 
  onMetadataChange: (data: {
    name: string;
    description: string;
    external_url: string;
    attributes: Array<{ trait_type: string; value: string }>;
  }) => void; 
}) => {
  const { mintNFT, isMinting, mintTransactionHash, mintTransactionStatus, mintError, resetMintTransaction } = useContract();
  const { supportedNetworks, currentChainId } = useWeb3();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldResetForm, setShouldResetForm] = useState(false);

  const handleMint = async (data: { recipient: string; metadataURI: string }) => {
    setIsModalOpen(true);
    await mintNFT(data.recipient, data.metadataURI);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (mintTransactionStatus === 'success') {
      // Reset the form and go back to first step after successful transaction
      onMetadataChange({
        name: '',
        description: '',
        external_url: '',
        attributes: []
      });
      setShouldResetForm(true);
      resetMintTransaction();
    } else if (mintTransactionStatus === 'error') {
      resetMintTransaction();
    }
  };

  // Reset the shouldResetForm flag after the form has been reset
  useEffect(() => {
    if (shouldResetForm) {
      const timer = setTimeout(() => setShouldResetForm(false), 100);
      return () => clearTimeout(timer);
    }
  }, [shouldResetForm]);

  const getExplorerUrl = () => {
    const network = Object.values(supportedNetworks).find(n => n.id === currentChainId);
    // For hardhat local network, we don't have a block explorer
    if (currentChainId === 31337) {
      return undefined; // No explorer for local hardhat
    }
    return network?.blockExplorers?.default.url;
  };

  const getModalStatus = () => {
    if (isMinting) return 'pending';
    if (mintTransactionStatus === 'loading') return 'confirming';
    return mintTransactionStatus;
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <TransactionProgressModal
        open={isModalOpen}
        status={getModalStatus()}
        transactionHash={mintTransactionHash}
        errorMessage={mintError?.message}
        onClose={handleCloseModal}
        networkExplorerUrl={getExplorerUrl()}
      />
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          {/* Contract Information Panel */}
          <Box sx={{ mb: 4 }}>
            <ContractInfo />
          </Box>
          
          {/* Main Panel: Minting Form - Full Width */}
          <Box sx={{ width: '100%' }}>
            <NFTMintForm
              onMint={handleMint}
              isLoading={isMinting || mintTransactionStatus === 'loading'}
              metadata={metadata}
              onMetadataChange={onMetadataChange}
              resetForm={shouldResetForm}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { isConnected, address } = useAccount();
  const { hasMinterRole, isLoadingRole } = useContract();
  const [metadata, setMetadata] = useState({
    name: '',
    description: '',
    external_url: '',
    attributes: [] as Array<{ trait_type: string; value: string }>,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Show loading state while checking role
  if (isConnected && isLoadingRole) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="#0A1F44" gutterBottom>
              Checking Permissions...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Verifying your minting permissions...
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Show error if connected but no minter role
  if (isConnected && !hasMinterRole) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, textAlign: 'center', border: '2px solid #f44336' }}>
            <Typography variant="h5" color="#f44336" gutterBottom>
              ⚠️ Access Denied
            </Typography>
            <Typography variant="h6" color="#0A1F44" gutterBottom>
              Connected wallet does not have minting permission
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Your connected wallet address does not have the required MINTER_ROLE to create NFTs.
              Please contact an administrator to grant you minting permissions, or connect a wallet that has the minter role.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                Current wallet: {address || 'Unknown'}
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <MobileNotSupported />
      {!isConnected ? <LandingSection /> : <MintingSection metadata={metadata} onMetadataChange={setMetadata} />}
    </Box>
  );
}
