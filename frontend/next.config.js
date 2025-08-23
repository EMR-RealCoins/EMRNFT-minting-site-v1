/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable webpack cache to prevent file system issues
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }
    
    // Handle webpack cache directory issues
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/node_modules', '**/.next', '**/.git'],
    };
    
    return config;
  },
  
  // Improve build performance
  experimental: {
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', '@tanstack/react-query'],
  },
  
  // Handle environment variables
  env: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  },
  
  // Disable image optimization for development
  images: {
    unoptimized: true,
  },
  
  // Handle output file tracing root warning
  outputFileTracingRoot: process.cwd(),
  
  // Improve error handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
