'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Stack,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WalletConnect from './WalletConnect';

// Custom styled components
const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(135deg, #0A1F44 0%, #1a365d 100%)',
  boxShadow: '0 4px 20px rgba(10, 31, 68, 0.15)',
});

const LogoText = styled(Typography)({
  background: 'linear-gradient(135deg, #D4AF37 0%, #C09B2D 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
});

export default function Header() {
  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo and Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src="/HOE_logo.png"
              alt="House of Emirates Logo"
              sx={{
                width: 50,
                height: 50,
                border: '2px solid #D4AF37',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              }}
            />
            <LogoText variant="h5">
              House of Emirates
            </LogoText>
          </Box>

          {/* Navigation and Wallet Connection */}
          <Stack direction="row" spacing={3} alignItems="center">
            {/* Wallet Connection */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              '& button': { // Target the button directly
                background: 'linear-gradient(135deg, #D4AF37 0%, #C09B2D 100%) !important',
                color: '#0A1F44 !important',
                borderRadius: '8px !important',
                fontWeight: '600 !important',
                textTransform: 'none !important',
                fontSize: '0.9rem !important',
                padding: '8px 16px !important',
                border: 'none !important',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3) !important',
                transition: 'all 0.3s ease-in-out !important',
                '&:hover': {
                  background: 'linear-gradient(135deg, #C09B2D 0%, #D4AF37 100%) !important',
                  transform: 'translateY(-2px) !important',
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4) !important',
                },
              },
            }}>
              <WalletConnect />
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
