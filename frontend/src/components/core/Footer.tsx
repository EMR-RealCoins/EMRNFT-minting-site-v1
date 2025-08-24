'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Divider,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon
} from '@mui/icons-material';

// Custom styled components
const StyledFooter = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0A1F44 0%, #1a365d 100%)',
  color: 'white',
  padding: theme.spacing(4, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#D4AF37',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    color: '#C09B2D',
    textDecoration: 'underline',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: '#D4AF37',
  border: '2px solid #D4AF37',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: '#D4AF37',
    color: '#0A1F44',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
  },
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          {/* Main Footer Content */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
            {/* Company Info */}
            <Box>
              <Typography variant="h6" fontWeight={700} color="#D4AF37" gutterBottom>
                House of Emirates
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                Transforming physical and historical coins into unique digital collectibles on the Ethereum blockchain.
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Secure, audited smart contracts with role-based access control.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography variant="h6" fontWeight={700} color="#D4AF37" gutterBottom>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <FooterLink href="#home" variant="body2">
                  Home
                </FooterLink>
                <FooterLink href="#about" variant="body2">
                  About
                </FooterLink>
                <FooterLink href="#features" variant="body2">
                  Features
                </FooterLink>
                <FooterLink href="#contact" variant="body2">
                  Contact
                </FooterLink>
              </Stack>
            </Box>

            {/* Contact & Social */}
            <Box>
              <Typography variant="h6" fontWeight={700} color="#D4AF37" gutterBottom>
                Connect With Us
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: '#D4AF37', fontSize: 20 }} />
                  <FooterLink href="mailto:info@houseofemirates.com" variant="body2">
                    info@houseofemirates.com
                  </FooterLink>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <SocialIconButton size="small">
                    <TwitterIcon />
                  </SocialIconButton>
                  <SocialIconButton size="small">
                    <LinkedInIcon />
                  </SocialIconButton>
                  <SocialIconButton size="small">
                    <GitHubIcon />
                  </SocialIconButton>
                </Box>
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

          {/* Bottom Footer */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © 2024 House of Emirates. All rights reserved.
            </Typography>
            
            <Stack direction="row" spacing={3}>
              <FooterLink href="#privacy" variant="body2">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#terms" variant="body2">
                Terms of Service
              </FooterLink>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </StyledFooter>
  );
}
