# House of Emirates NFT Minting Platform

A comprehensive NFT minting platform built with Hardhat (smart contracts) and Next.js (frontend), featuring multi-network support, role-based access control, and professional UI/UX.

## 🏗️ Project Structure

```
NftMintingHardhatNode/
├── contracts/           # Smart contracts (Solidity)
├── frontend/           # Next.js frontend application
├── scripts/            # Deployment scripts
├── test/               # Smart contract tests
├── ignition/           # Hardhat Ignition deployment modules
└── Plan/               # Project planning documents
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or compatible Web3 wallet
- Git

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/EMR-RealCoins/EMRNFT-minting-site-v1.git
cd EMRNFT-minting-site-v1

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## 🔧 Smart Contract Setup

### Local Development Network

```bash
# Start local Hardhat node
npx hardhat node

# In a new terminal, deploy contracts
npx hardhat run scripts/deploy-hoenft.js --network localhost

# Run tests
npx hardhat test
```

### Testnet Deployment

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy-hoenft.js --network sepolia

# Deploy to Polygon Amoy testnet  
npx hardhat run scripts/deploy-hoenft.js --network amoy
```

### Environment Configuration

Create `.env` file in the root directory:

```bash
# Network Configuration
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=your_sepolia_rpc_url
AMOY_RPC_URL=your_amoy_rpc_url

# Contract Configuration
CONTRACT_NAME="House of Emirates NFT"
CONTRACT_SYMBOL="HOENFT"
```

## 🌐 Frontend Setup

### Environment Configuration

Create `.env.local` file in the `frontend/` directory:

```bash
# Network Mode (mainnet or testnet)
NEXT_PUBLIC_NETWORK_MODE=testnet

# Contract Addresses
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x... # Your mainnet contract address
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xf397340552D0A4630975850fE4007D5d7426AdE9
NEXT_PUBLIC_CONTRACT_ADDRESS_AMOY=0x8040F5f215b76d619a6c4cBFc03c266258D96A19

# RPC URLs
NEXT_PUBLIC_ETHEREUM_MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://rpc.sepolia.org
NEXT_PUBLIC_POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology

# Pinata Configuration (for IPFS)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret_key
```

### Development

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Production Deployment

```bash
cd frontend

# Build the application
npm run build

# Deploy to your hosting platform (Vercel, Netlify, etc.)
# The build output will be in the .next/ directory
```

## 🎯 Features

### Smart Contract Features
- **ERC721 Standard**: Compliant with OpenZeppelin standards
- **Role-Based Access Control**: MINTER_ROLE for controlled minting
- **Multi-Network Support**: Local, Sepolia, Polygon Amoy, and Mainnet
- **Flexible Metadata**: Dynamic token URI updates
- **Gas Optimization**: Efficient contract design

### Frontend Features
- **Multi-Network Support**: Automatic network detection and switching
- **Role Verification**: Only users with MINTER_ROLE can mint
- **Professional UI/UX**: Material-UI with custom styling
- **Mobile Responsive**: Desktop-optimized with mobile detection
- **Transaction Tracking**: Real-time transaction status and progress
- **IPFS Integration**: Decentralized metadata storage via Pinata
- **Wallet Integration**: MetaMask, WalletConnect, and Coinbase Wallet support

### Network Support
- **Mainnet Mode**: Only Ethereum Mainnet
- **Testnet Mode**: Ethereum Mainnet + Sepolia + Polygon Amoy + Hardhat Local

## 🔐 Access Control

### Minter Role
Only wallets with the `MINTER_ROLE` can mint NFTs. To grant minting permissions:

```solidity
// Call this function from the contract owner
grantRole(MINTER_ROLE, wallet_address);
```

### Default Admin
The deployer automatically gets the `DEFAULT_ADMIN_ROLE` and can:
- Grant/revoke minter roles
- Update contract parameters
- Manage access control

## 📱 User Experience

### Desktop-Only Platform
The frontend is designed for desktop computers to ensure:
- Enhanced security for wallet connections
- Better transaction management
- Optimal image upload and preview experience
- Full feature access and performance

### Transaction Flow
1. **Connect Wallet**: MetaMask or compatible wallet
2. **Upload Image**: Drag & drop or file picker
3. **Enter Metadata**: Name, description, and attributes
4. **Review & Mint**: Preview NFT before minting
5. **Confirm Transaction**: Approve in wallet
6. **Track Progress**: Real-time transaction status
7. **Success**: NFT minted and viewable on blockchain

## 🧪 Testing

### Smart Contract Tests
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/HOENFT.js

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```

### Frontend Tests
```bash
cd frontend

# Run linting
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

## 🚀 Deployment

### Smart Contract Deployment
```bash
# Local network
npx hardhat run scripts/deploy-hoenft.js --network localhost

# Sepolia testnet
npx hardhat run scripts/deploy-hoenft.js --network sepolia

# Polygon Amoy testnet
npx hardhat run scripts/deploy-hoenft.js --network amoy

# Mainnet (be careful!)
npx hardhat run scripts/deploy-hoenft.js --network mainnet
```

### Frontend Deployment
The frontend can be deployed to any static hosting platform:

- **Vercel**: Automatic deployment from Git
- **Netlify**: Drag & drop or Git integration
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for open source projects

## 🔧 Configuration

### Network Configuration
Update `hardhat.config.js` to add your RPC endpoints:

```javascript
networks: {
  sepolia: {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: [process.env.PRIVATE_KEY]
  },
  amoy: {
    url: process.env.AMOY_RPC_URL,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

### Frontend Configuration
The frontend automatically adapts based on `NEXT_PUBLIC_NETWORK_MODE`:
- `mainnet`: Shows only Ethereum Mainnet
- `testnet`: Shows all supported networks

## 📚 Documentation

- **Smart Contracts**: See `contracts/` directory for Solidity code
- **Frontend Components**: See `frontend/src/components/` for React components
- **Deployment Scripts**: See `scripts/` directory for deployment logic
- **Testing**: See `test/` directory for contract tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in the `Plan/` directory

## 🔗 Links

- **Contract Addresses**: See `frontend/src/lib/env.ts`
- **Network RPC URLs**: See `hardhat.config.js`
- **Project Planning**: See `Plan/` directory for detailed project scope and execution plans

---

**Built with ❤️ for House of Emirates**
