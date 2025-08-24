'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, bgcolor: 'background.default' }}>
        {children}
      </Box>
    </Box>
  );
}
