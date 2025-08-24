'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  Computer as DesktopIcon,
  Smartphone as MobileIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0A1F44 0%, #1a365d 100%)',
  color: 'white',
  padding: theme.spacing(6),
  textAlign: 'center',
  borderRadius: theme.spacing(3),
  boxShadow: '0 20px 40px rgba(10, 31, 68, 0.3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
  color: '#0A1F44',
  fontWeight: 600,
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontSize: '1.1rem',
  '&:hover': {
    background: 'linear-gradient(135deg, #F4E976 0%, #D4AF37 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
  },
}));

export default function MobileNotSupported() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /mobile|android|iphone|ipad|tablet|ipod|blackberry|windows phone/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 1024; // Consider screens smaller than 1024px as mobile
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Container maxWidth="sm">
        <StyledPaper>
          <MobileIcon sx={{ fontSize: 80, color: '#D4AF37', mb: 3 }} />
          
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Desktop Experience Required
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            House of Emirates NFT Platform
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6, opacity: 0.8 }}>
            Our NFT minting platform is designed for desktop computers to provide the best user experience and security. 
            Mobile and tablet devices are not supported due to the complexity of blockchain transactions and wallet interactions.
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
              <strong>Why desktop only?</strong>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
              • Enhanced security for wallet connections
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
              • Better transaction management
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
              • Optimal image upload and preview experience
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              • Full feature access and better performance
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <StyledButton
              startIcon={<DesktopIcon />}
              onClick={() => window.open('https://houseofemirates.com', '_blank')}
            >
              Visit Our Website
            </StyledButton>
            
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              Please access this platform from a desktop computer for the full experience
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
}
