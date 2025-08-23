# House of Emirates NFT Minting Interface

A branded web application for House of Emirates (HOE) to mint NFT collectibles representing physical and historical coins on the Ethereum blockchain.

## 🚀 Features

- **Multi-Wallet Support**: RainbowKit integration (MetaMask, WalletConnect, Coinbase Wallet)
- **Multi-Network**: Ethereum Mainnet + Polygon Amoy Testnet
- **IPFS Storage**: Pinata integration for decentralized metadata storage
- **OpenSea Compliance**: Full metadata standards compliance
- **Role-Based Access**: Admin and minter role management
- **Dynamic Attributes**: Unlimited custom attributes for NFTs

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Web3**: Ethers.js + Wagmi + RainbowKit
- **Storage**: IPFS via Pinata
- **State Management**: React hooks + nuqs

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or other Web3 wallet
- Pinata account for IPFS storage

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd frontend
npm install
```

### 2. Environment Setup

```bash
cp env.local.example .env.local
```

Edit `.env.local` with your configuration:
- Add your Pinata JWT token
- Add contract addresses after deployment
- Configure RPC URLs

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (routes)/        # Route groups
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── core/           # Core layout components
│   ├── features/       # Feature-specific components
│   └── utils/          # Utility components
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌐 Networks

- **Ethereum Mainnet**: Production deployment
- **Polygon Amoy**: Testnet for development and testing

## 📱 Pages

1. **Homepage** (`/`) - Brand introduction and wallet connection
2. **Admin Dashboard** (`/admin`) - Role management and contract stats
3. **Minting Interface** (`/mint`) - NFT creation and minting

## 🔐 Security

- Role-based access control
- Input validation and sanitization
- Secure wallet connections
- Contract interaction validation

## 📄 License

This project is proprietary to House of Emirates.

## 🤝 Support

For technical support or questions, please contact the development team.
