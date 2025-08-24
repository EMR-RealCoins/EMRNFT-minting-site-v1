'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
  Paper,
  Alert,
  Grow,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';
import {
  Upload as UploadIcon,
  Description as DescriptionIcon,
  AccountBalanceWallet as WalletIcon,
  RocketLaunch as RocketIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ImageUpload from './ImageUpload';
import MetadataForm from './MetadataForm';
import { uploadFileToIPFS, uploadJsonToIPFS } from '@/lib/pinata';
import { useContract } from './ContractProvider';

interface MintData {
  recipient: string;
  metadataURI: string;
}

interface NFTMintFormProps {
  onMint: (data: MintData) => void;
  isLoading?: boolean;
  metadata: {
    name: string;
    description: string;
    external_url: string;
    attributes: Array<{ trait_type: string; value: string }>;
  };
  onMetadataChange: (metadata: {
    name: string;
    description: string;
    external_url: string;
    attributes: Array<{ trait_type: string; value: string }>;
  }) => void;
  resetForm?: boolean;
}

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-2px)',
  },
}));

const StyledStepHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0A1F44 0%, #1a365d 100%)',
  color: 'white',
  padding: theme.spacing(3, 4),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0A1F44 0%, #0A1F44 100%)',
  color: 'white',
  borderRadius: theme.spacing(0.8),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1.1rem',
  padding: theme.spacing(1.4, 2.8),
  minHeight: '48px',
  boxShadow: '0 4px 15px rgba(10, 31, 68, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(135deg, #0A1F44 0%, #0A1F44 100%)',
    opacity: 0.9,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(10, 31, 68, 0.4)',
  },
  '&.MuiButton-outlined': {
    background: 'transparent',
    border: '2px solid #0A1F44',
    color: '#0A1F44',
    boxShadow: 'none',
    '&:hover': {
      background: 'rgba(10, 31, 68, 0.1)',
      border: '2px solid #0A1F44',
      color: '#0A1F44',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(10, 31, 68, 0.2)',
    },
    '&:disabled': {
      background: 'transparent',
      border: `2px solid ${theme.palette.grey[300]}`,
      color: theme.palette.grey[500],
      transform: 'none',
      boxShadow: 'none',
    },
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[600],
    transform: 'none',
    boxShadow: 'none',
  },
}));

const steps = [
  {
    label: 'Upload Image',
    description: 'Select a high-quality image of your coin',
    icon: <UploadIcon />,
  },
  {
    label: 'Metadata',
    description: 'Describe your coin and add attributes',
    icon: <DescriptionIcon />,
  },
  {
    label: 'Recipient',
    description: 'Select who will receive this NFT',
    icon: <WalletIcon />,
  },
  {
    label: 'Preview and Mint',
    description: 'Review your NFT before minting',
    icon: <RocketIcon />,
  },
];

export default function NFTMintForm({ onMint, isLoading, metadata, onMetadataChange, resetForm }: NFTMintFormProps) {
  const { address } = useAccount();
  const { totalSupply } = useContract();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [recipientAddress, setRecipientAddress] = useState(address || '');
  const [isUploading, setIsUploading] = useState(false);
  
  // Use passed metadata state
  const currentMetadata = metadata;
  const setCurrentMetadata = onMetadataChange;

  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return `${num}st`;
    if (j === 2 && k !== 12) return `${num}nd`;
    if (j === 3 && k !== 13) return `${num}rd`;
    return `${num}th`;
  };

  // Reset form when resetForm prop changes
  useEffect(() => {
    if (resetForm) {
      setActiveStep(0);
      setSelectedImage(null);
      setRecipientAddress(address || '');
      setIsUploading(false);
    }
  }, [resetForm, address]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // On the last step (preview), handle minting
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Validation
    if (!selectedImage) {
      alert('Please select an image for your NFT');
      return;
    }
    
    if (!currentMetadata.name.trim()) {
      alert('Please enter a name for your NFT');
      return;
    }
    
    if (!currentMetadata.description.trim()) {
      alert('Please enter a description for your NFT');
      return;
    }
    
    if (!recipientAddress || !recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload image to IPFS
      const imageHash = await uploadFileToIPFS(selectedImage);
      if (!imageHash) {
        throw new Error('Failed to upload image to IPFS');
      }
      const imageURI = `ipfs://${imageHash}`;

      // 2. Prepare and upload metadata to IPFS
      const metadataToUpload = {
        ...currentMetadata,
        image: imageURI,
      };
      const metadataHash = await uploadJsonToIPFS(metadataToUpload);
      if (!metadataHash) {
        throw new Error('Failed to upload metadata to IPFS');
      }
      const metadataURI = `ipfs://${metadataHash}`;

      // 3. Call the onMint function with the final data
      const mintData = {
        recipient: recipientAddress,
        metadataURI: metadataURI,
      };

      onMint(mintData);

    } catch (error: unknown) {
      console.error('Minting process failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Minting failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };



  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return selectedImage !== null;
      case 1:
        return currentMetadata.name.trim() && currentMetadata.description.trim();
      case 2:
        return recipientAddress.match(/^0x[a-fA-F0-9]{40}$/);
      case 3:
        return true; // Preview step - always can proceed
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grow in={true} timeout={500}>
            <StyledPaper>
              <StyledStepHeader>
                <Avatar sx={{ bgcolor: '#D4AF37', color: 'white' }}>
                  <UploadIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Upload Your Coin Image
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Start by selecting a high-quality image
                  </Typography>
                </Box>
              </StyledStepHeader>
              <Box sx={{ p: 3 }}>
                <ImageUpload
                  onImageSelect={setSelectedImage}
                  selectedImage={selectedImage}
                />
              </Box>
            </StyledPaper>
          </Grow>
        );

      case 1:
        return (
          <Grow in={true} timeout={500}>
            <StyledPaper>
              <StyledStepHeader>
                <Avatar sx={{ bgcolor: '#D4AF37', color: 'white' }}>
                  <DescriptionIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Metadata & Attributes
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Describe your coin and add relevant attributes
                  </Typography>
                </Box>
              </StyledStepHeader>
              <Box sx={{ p: 3 }}>
                <MetadataForm
                  metadata={currentMetadata}
                  onMetadataChange={setCurrentMetadata}
                />
              </Box>
            </StyledPaper>
          </Grow>
        );

      case 2:
        return (
          <Grow in={true} timeout={500}>
            <StyledPaper>
              <StyledStepHeader>
                <Avatar sx={{ bgcolor: '#D4AF37', color: 'white' }}>
                  <WalletIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Recipient Wallet
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Choose who will receive this NFT
                  </Typography>
                </Box>
              </StyledStepHeader>
              <Box sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Wallet Address"
                    placeholder="0x..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      style: { fontFamily: 'monospace' }
                    }}
                    error={recipientAddress !== '' && !recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)}
                    helperText={recipientAddress !== '' && !recipientAddress.match(/^0x[a-fA-F0-9]{40}$/) ? 'Invalid Ethereum address format' : ''}
                  />
                  
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <StyledButton
                      variant="outlined"
                      onClick={() => setRecipientAddress(address || '')}
                      disabled={!address}
                      startIcon={<CheckIcon />}
                    >
                      Use My Wallet
                    </StyledButton>
                    <StyledButton
                      variant="outlined"
                      onClick={() => setRecipientAddress('')}
                      startIcon={<DeleteIcon />}
                      sx={{
                        borderColor: 'grey.300',
                        color: 'grey.600',
                        '&:hover': {
                          bgcolor: 'grey.100',
                          borderColor: 'grey.400',
                        }
                      }}
                    >
                      Clear
                    </StyledButton>
                  </Stack>
                </Stack>
              </Box>
            </StyledPaper>
          </Grow>
        );

      case 3:
        return (
          <Grow in={true} timeout={500}>
            <StyledPaper>
              <StyledStepHeader>
                <Avatar sx={{ bgcolor: '#D4AF37', color: 'white' }}>
                  <RocketIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    NFT Preview
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Review your NFT details before minting
                  </Typography>
                </Box>
              </StyledStepHeader>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
                  {/* Left Column: Image and Basic Details */}
                  <Box>
                    {/* Image Preview */}
                    <Typography variant="h6" fontWeight={600} color="#0A1F44" gutterBottom>
                      Image Preview
                    </Typography>
                    {selectedImage && (
                      <Box
                        component="img"
                        src={URL.createObjectURL(selectedImage)}
                        alt="NFT Preview"
                        sx={{
                          width: '100%',
                          maxHeight: 300,
                          borderRadius: 2,
                          border: '2px solid #D4AF37',
                          objectFit: 'contain',
                          mb: 3,
                        }}
                      />
                    )}

                    {/* Basic Details Below Image */}
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Name
                        </Typography>
                        <Typography variant="body1" fontWeight={600} color="#0A1F44">
                          {currentMetadata.name || 'Not specified'}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body1">
                          {currentMetadata.description || 'Not specified'}
                        </Typography>
                      </Box>

                      {currentMetadata.external_url && (
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            External URL
                          </Typography>
                          <Typography variant="body1" color="primary">
                            {currentMetadata.external_url}
                          </Typography>
                        </Box>
                      )}

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Recipient
                        </Typography>
                        <Typography variant="body1" fontFamily="monospace">
                          {recipientAddress || 'Not specified'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Right Column: Attributes */}
                  <Box>
                    <Typography variant="h6" fontWeight={600} color="#0A1F44" gutterBottom>
                      Attributes ({currentMetadata.attributes.filter(attr => attr.value.trim()).length})
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                      {currentMetadata.attributes
                        .filter(attr => attr.value.trim())
                        .map((attribute, index) => (
                          <Paper
                            key={index}
                            elevation={1}
                            sx={{
                              p: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              bgcolor: 'background.paper',
                            }}
                          >
                            <Typography 
                              variant="subtitle2" 
                              color="text.secondary" 
                              gutterBottom
                              sx={{ fontWeight: 600 }}
                            >
                              {attribute.trait_type}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.primary"
                              sx={{ wordBreak: 'break-word' }}
                            >
                              {attribute.value}
                            </Typography>
                          </Paper>
                        ))}
                    </Box>
                    
                    {currentMetadata.attributes.filter(attr => attr.value.trim()).length === 0 && (
                      <Alert severity="info" sx={{ mt: 2 }}>
                        No attributes added yet. Add some attributes to make your NFT more valuable.
                      </Alert>
                    )}
                  </Box>
                </Box>
              </Box>
            </StyledPaper>
          </Grow>
        );

      default:
        return null;
    }
  };

  const nextNFTNumber = (totalSupply || 0) + 1;

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', width: '100%' }}>
      <form onSubmit={handleSubmit}>
        {/* Mint Title */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold" 
            color="#0A1F44"
            sx={{ mb: 2 }}
          >
            Mint your {getOrdinalSuffix(nextNFTNumber)} NFT
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Create a unique digital collectible from your precious coin collection
          </Typography>
        </Box>

        {/* Horizontal Stepper */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Avatar
                      sx={{
                        bgcolor: activeStep >= index ? '#D4AF37' : 'grey.300',
                        color: activeStep >= index ? 'white' : 'grey.600',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {step.icon}
                    </Avatar>
                  )}
                >
                  <Typography variant="subtitle2" fontWeight={600} color="#0A1F44">
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        <Box sx={{ mb: 4 }}>
          {renderStepContent()}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <StyledButton
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </StyledButton>
          
          <StyledButton
            variant="contained"
            onClick={handleNext}
            disabled={!canProceed() || isUploading || isLoading}
          >
            {isUploading || isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              activeStep === steps.length - 1 ? 'Mint NFT' : 'Continue'
            )}
          </StyledButton>
        </Box>
      </form>
    </Box>
  );
}
