# Frontend Development Plan - House of Emirates NFT Minting Interface

## Project Overview
A branded web application for House of Emirates (HOE) to mint NFT collectibles representing physical and historical coins on the Ethereum blockchain.

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Web3 Integration**: Ethers.js + Wagmi
- **Wallet Connection**: RainbowKit (MetaMask, WalletConnect, Coinbase Wallet, etc.)
- **Blockchain Networks**: Ethereum Mainnet + Polygon Amoy Testnet
- **Metadata Storage**: IPFS via Pinata (media files + metadata JSON)
- **State Management**: React hooks + URL state (nuqs)
- **Deployment**: Vercel/Netlify

## Page Structure

### 1. **Landing Page** (`/`)
**Purpose**: Brand introduction, wallet connection, and entry point
**Components**:
- Hero section with HOE branding
- Wallet connection interface (RainbowKit)
- Network selection (Ethereum Mainnet / Polygon Amoy Testnet)
- Role verification (admin/minter check)
- Feature highlights (NFT minting, secure, audited)
- Quick start guide
- Footer with links

### 2. **Admin Dashboard** (`/admin`)
**Purpose**: Administrative functions and overview
**Components**:
- Role management interface
- Minter role assignment/revocation
- Contract statistics
- System health monitoring

### 3. **Minting Interface** (`/mint`)
**Purpose**: Core NFT minting functionality
**Components**:
- Image upload (drag & drop + file picker) via Pinata
- Metadata form (OpenSea standards compliant)
- Recipient wallet input
- Minting transaction interface
- Success/error feedback

## Implementation Tasks

### **Task 1: Project Setup & Configuration**
**Dependencies**: None
**Deliverables**:
- Next.js 14 project with TypeScript
- Tailwind CSS + Shadcn UI setup
- ESLint and Prettier configuration
- Git repository setup
- Environment variables configuration

### **Task 2: Basic Layout & Navigation**
**Dependencies**: Task 1
**Deliverables**:
- `Layout.tsx` - Page wrapper with providers
- `Header.tsx` - Navigation and branding
- `Footer.tsx` - Links and branding
- Basic routing setup (/, /admin, /mint)
- Responsive navigation structure

### **Task 3: RainbowKit Integration**
**Dependencies**: Task 1, Task 2
**Deliverables**:
- `RainbowKitProvider.tsx` - Configuration and providers
- `WalletConnect.tsx` - Wallet connection interface
- `WalletStatus.tsx` - Connection status display
- `NetworkSelector.tsx` - Network switching
- Multi-chain support (Mainnet + Amoy Testnet)
- Wallet connection in homepage

### **Task 4: Pinata IPFS Integration**
**Dependencies**: Task 3
**Deliverables**:
- `PinataUpload.tsx` - IPFS upload interface
- Image upload functionality
- Metadata JSON upload
- IPFS gateway configuration
- Error handling for upload failures

### **Task 5: Metadata Form & Validation**
**Dependencies**: Task 4
**Deliverables**:
- `MetadataForm.tsx` - OpenSea compliant form
- `AttributeInput.tsx` - Dynamic attribute fields
- `MetadataValidator.tsx` - Validation logic
- Required field validation (name, description, image)
- Dynamic attribute management (unlimited)
- Live metadata preview

### **Task 6: Image Upload Component**
**Dependencies**: Task 4
**Deliverables**:
- `ImageUpload.tsx` - Drag & drop interface
- File type validation
- Image preview functionality
- Upload progress indicator
- Error handling and retry logic

### **Task 7: Minting Form Integration**
**Dependencies**: Task 5, Task 6
**Deliverables**:
- `NFTMintForm.tsx` - Complete minting form
- `RecipientInput.tsx` - Wallet address input
- Form validation and error handling
- Integration of all components
- Form state management

### **Task 8: Contract Provider Setup**
**Dependencies**: Task 3
**Deliverables**:
- `ContractProvider.tsx` - Smart contract context
- `Web3Provider.tsx` - Web3 connection management
- Contract ABI integration
- Network-specific contract addresses
- Contract interaction utilities

### **Task 9: Minting Transaction Logic**
**Dependencies**: Task 8, Task 7
**Deliverables**:
- `TransactionButton.tsx` - Minting action button
- `TransactionProvider.tsx` - Transaction state management
- Gas estimation and limits
- Transaction confirmation flows
- Error handling and user feedback
- Success confirmation

### **Task 10: Role Verification & Access Control**
**Dependencies**: Task 8
**Deliverables**:
- `RoleVerifier.tsx` - Admin/minter role checking
- Role-based component rendering
- Route protection for admin functions
- Access control validation
- Unauthorized access handling

### **Task 11: Admin Panel Components**
**Dependencies**: Task 10
**Deliverables**:
- `AdminPanel.tsx` - Main admin interface
- `RoleManager.tsx` - Role assignment interface
- `ContractStats.tsx` - Contract statistics display
- Admin-only route protection
- Responsive admin layout

### **Task 12: Role Management Functions**
**Dependencies**: Task 11
**Deliverables**:
- Grant minter role functionality
- Revoke minter role functionality
- Role assignment interface
- Role verification display
- Transaction handling for role changes

### **Task 13: Contract Statistics & Monitoring**
**Dependencies**: Task 11
**Deliverables**:
- Total NFTs minted counter
- Contract balance display
- Recent transactions list
- Network status monitoring
- System health indicators

### **Task 14: Testing & Bug Fixes**
**Dependencies**: All previous tasks
**Deliverables**:
- Component functionality testing
- Integration testing
- Wallet connection testing
- Minting flow testing
- Admin function testing
- Bug fixes and improvements

### **Task 15: Performance Optimization**
**Dependencies**: Task 14
**Deliverables**:
- Image optimization
- Code splitting implementation
- Lazy loading for heavy components
- Performance monitoring setup
- Bundle size optimization

### **Task 16: Deployment Preparation**
**Dependencies**: Task 15
**Deliverables**:
- Production build optimization
- Environment configuration
- Deployment scripts
- Documentation updates
- Final testing on staging

## Component Architecture

### **Core Components** (`/src/components/core/`)

#### **Layout Components**
- `Header.tsx` - Navigation and wallet connection
- `Footer.tsx` - Links and branding
- `Layout.tsx` - Page wrapper with providers
- `Sidebar.tsx` - Admin navigation (if applicable)

#### **Wallet Components**
- `RainbowKitProvider.tsx` - RainbowKit configuration and providers
- `WalletConnect.tsx` - Wallet connection interface
- `WalletStatus.tsx` - Connection status display
- `NetworkSelector.tsx` - Network switching (Mainnet/Testnet)
- `RoleVerifier.tsx` - Admin/minter role checking

#### **NFT Components**
- `NFTMintForm.tsx` - Complete minting form
- `ImageUpload.tsx` - Image upload with Pinata integration
- `MetadataForm.tsx` - OpenSea compliant metadata form
- `NFTCard.tsx` - Individual NFT display for preview
- `NFTModal.tsx` - Detailed NFT preview modal

#### **Form Components**
- `AttributeInput.tsx` - Dynamic attribute fields (unlimited)
- `RecipientInput.tsx` - Wallet address input with validation
- `TransactionButton.tsx` - Minting action button
- `MetadataPreview.tsx` - Live metadata preview

#### **UI Components**
- `Button.tsx` - Styled buttons (Shadcn)
- `Input.tsx` - Form inputs (Shadcn)
- `Card.tsx` - Content containers (Shadcn)
- `Modal.tsx` - Overlay dialogs (Shadcn)
- `Loading.tsx` - Loading states
- `ErrorBoundary.tsx` - Error handling

### **Feature Components** (`/src/components/features/`)

#### **Minting Feature**
- `MintingWizard.tsx` - Step-by-step minting process
- `MintingProgress.tsx` - Transaction progress indicator
- `MintingSuccess.tsx` - Success confirmation

#### **Admin Feature**
- `RoleManager.tsx` - Role assignment interface
- `ContractStats.tsx` - Contract statistics display
- `AdminPanel.tsx` - Administrative controls

### **Utility Components** (`/src/components/utils/`)

#### **Web3 Utilities**
- `ContractProvider.tsx` - Smart contract context
- `Web3Provider.tsx` - Web3 connection management
- `TransactionProvider.tsx` - Transaction state management
- `NetworkProvider.tsx` - Network switching and validation

#### **Metadata Utilities**
- `PinataUpload.tsx` - Pinata IPFS upload interface
- `MetadataValidator.tsx` - OpenSea metadata validation
- `AttributeBuilder.tsx` - Dynamic attribute creation
- `MetadataGenerator.tsx` - JSON metadata generation

## OpenSea Metadata Standards Compliance

### **Mandatory Metadata Fields**
```typescript
interface NFTMetadata {
  name: string;                    // NFT name (required)
  description: string;             // NFT description (required)
  image: string;                   // IPFS URI to image (required)
  external_url?: string;           // Project website (optional)
  attributes: Attribute[];         // Dynamic attributes array (required)
}

interface Attribute {
  trait_type: string;              // Attribute name (e.g., "Year", "Mint Mark")
  value: string | number;          // Attribute value
  display_type?: string;           // "boost_number", "boost_percentage", "number", "date"
}
```

### **Dynamic Attributes System**
- **Unlimited attributes**: Users can add as many custom attributes as needed
- **Attribute types**: String, number, date, percentage, boost values
- **Common coin attributes**: Year, Mint Mark, Condition, Rarity, Material, Weight, Diameter
- **Custom attributes**: Any additional metadata specific to the coin

### **Metadata Validation**
- Required field validation
- IPFS URI format validation
- Attribute format compliance
- OpenSea compatibility checks

## Pinata Integration

### **File Upload Process**
1. **Image Upload**: Direct upload to Pinata IPFS
2. **Metadata Generation**: Create JSON with IPFS image URI
3. **Metadata Upload**: Upload metadata JSON to Pinata IPFS
4. **Token URI**: Use metadata JSON IPFS URI for minting

### **Pinata Configuration**
```typescript
// Pinata SDK configuration
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL
});

// Upload functions
const uploadImageToIPFS = async (file: File) => {
  const upload = await pinata.upload.public.file(file);
  return `ipfs://${upload.cid}`;
};

const uploadMetadataToIPFS = async (metadata: NFTMetadata) => {
  const upload = await pinata.upload.public.json(metadata);
  return `ipfs://${upload.cid}`;
};
```

## Key Features Implementation

### **RainbowKit Wallet Integration**
```typescript
// RainbowKit configuration with multiple networks
const { chains, publicClient } = configureChains(
  [mainnet, polygonAmoy],
  [publicProvider()]
);

// Wallet connection with role verification
const { address, isConnected, chainId } = useAccount();
const { data: hasMinterRole } = useContractRead({
  address: contractAddress,
  abi: contractABI,
  functionName: 'hasRole',
  args: [MINTER_ROLE, address]
});
```

### **Network Switching**
```typescript
// Network selection and validation
const { switchNetwork } = useSwitchNetwork();
const isCorrectNetwork = chainId === mainnet.id || chainId === polygonAmoy.id;

// Auto-switch to mainnet for production minting
const switchToMainnet = () => switchNetwork(mainnet.id);
```

### **IPFS Integration via Pinata**
```typescript
// Complete minting flow with Pinata
const mintNFT = async (imageFile: File, metadata: NFTMetadata, recipient: string) => {
  // 1. Upload image to IPFS
  const imageURI = await uploadImageToIPFS(imageFile);
  
  // 2. Create metadata with image URI
  const completeMetadata = { ...metadata, image: imageURI };
  
  // 3. Upload metadata to IPFS
  const metadataURI = await uploadMetadataToIPFS(completeMetadata);
  
  // 4. Mint NFT with metadata URI
  const tx = await contract.safeMint(recipient, metadataURI);
  await tx.wait();
  
  return { tx, metadataURI };
};
```

### **Dynamic Attributes Management**
```typescript
// Dynamic attribute system
const [attributes, setAttributes] = useState<Attribute[]>([]);

const addAttribute = (trait_type: string, value: string | number, display_type?: string) => {
  const newAttribute: Attribute = { trait_type, value, display_type };
  setAttributes([...attributes, newAttribute]);
};

const removeAttribute = (index: number) => {
  setAttributes(attributes.filter((_, i) => i !== index));
};

const updateAttribute = (index: number, field: keyof Attribute, value: string | number) => {
  const updated = [...attributes];
  updated[index] = { ...updated[index], [field]: value };
  setAttributes(updated);
};
```

## Security Considerations

### **Access Control**
- Role-based component rendering
- Route protection for admin functions
- Contract interaction validation
- Network-specific access control

### **Input Validation**
- Wallet address format validation
- Image file type and size limits (Pinata constraints)
- Metadata sanitization and validation
- IPFS URI format verification

### **Transaction Security**
- Gas estimation and limits
- Transaction confirmation flows
- Network validation before minting
- Error handling and user feedback

## Responsive Design

### **Mobile-First Approach**
- Touch-friendly interfaces
- Optimized image handling
- Responsive form layouts
- Mobile wallet connection

### **Breakpoints**
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Performance Optimization

### **Image Optimization**
- WebP format support
- Lazy loading
- Responsive images
- Compression
- IPFS gateway optimization

### **Code Splitting**
- Dynamic imports for heavy components
- Route-based code splitting
- Lazy loading for non-critical features

## Testing Strategy

### **Unit Tests**
- Component functionality
- Utility functions
- Form validation
- Metadata compliance

### **Integration Tests**
- Wallet connection flows
- Minting processes
- Admin functions
- Pinata integration

### **E2E Tests**
- Complete user journeys
- Cross-browser compatibility
- Mobile responsiveness
- Network switching

## Deployment & Monitoring

### **Environment Configuration**
- Development: Local Hardhat network
- Staging: Polygon Amoy testnet
- Production: Ethereum mainnet

### **Monitoring**
- Transaction success rates
- User interaction analytics
- Error tracking and reporting
- IPFS upload success rates

## Future Enhancements

### **Phase 2 Features**
- Batch minting
- Advanced metadata editing
- NFT marketplace integration
- Analytics dashboard
- Multi-chain expansion

### **Scalability**
- Advanced role management
- Automated metadata generation
- Social features
- IPFS pinning management

---

This plan provides a comprehensive roadmap for implementing the HOE NFT minting interface with RainbowKit wallet support, Pinata IPFS integration, and full OpenSea metadata standards compliance, ensuring all requirements from the project scope document are met while maintaining security, performance, and user experience standards.
