const { ethers } = require('ethers');

// Mainnet contract details
const CONTRACT_ADDRESS = '0xA5E0766Cd0578A4512412D705eEfF68615EF5713';
const OWNER_ADDRESS = '0xf4AD2f29cb8EC96e5c4cF6e7c1376fB4159563cF';

// Contract ABI for role checking
const CONTRACT_ABI = [
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function MINTER_ROLE() view returns (bytes32)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function totalSupply() view returns (uint256)',
  'function name() view returns (string)',
  'function symbol() view returns (string)'
];

async function debugMainnetContract() {
  try {
    // Connect to mainnet (you'll need an RPC URL)
    const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY');
    
    console.log('🔍 Debugging Mainnet Contract...');
    console.log('Contract Address:', CONTRACT_ADDRESS);
    console.log('Owner Address:', OWNER_ADDRESS);
    console.log('');

    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // Get role hashes
    console.log('📋 Getting Role Hashes...');
    const defaultAdminRole = await contract.DEFAULT_ADMIN_ROLE();
    const minterRole = await contract.MINTER_ROLE();
    
    console.log('DEFAULT_ADMIN_ROLE hash:', defaultAdminRole);
    console.log('MINTER_ROLE hash:', minterRole);
    console.log('');

    // Check owner's roles
    console.log('🔐 Checking Owner Roles...');
    const hasAdminRole = await contract.hasRole(defaultAdminRole, OWNER_ADDRESS);
    const hasMinterRole = await contract.hasRole(minterRole, OWNER_ADDRESS);
    
    console.log('Owner has DEFAULT_ADMIN_ROLE:', hasAdminRole);
    console.log('Owner has MINTER_ROLE:', hasMinterRole);
    console.log('');

    // Get contract info
    console.log('📊 Contract Information...');
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    
    console.log('Contract Name:', name);
    console.log('Contract Symbol:', symbol);
    console.log('Total Supply:', totalSupply.toString());
    console.log('');

    // Summary
    console.log('📝 Summary:');
    if (hasAdminRole && hasMinterRole) {
      console.log('✅ Owner has both ADMIN and MINTER roles - should be able to mint!');
    } else if (hasMinterRole) {
      console.log('✅ Owner has MINTER role - should be able to mint!');
    } else if (hasAdminRole) {
      console.log('⚠️  Owner has ADMIN role but not MINTER role - cannot mint!');
    } else {
      console.log('❌ Owner has neither ADMIN nor MINTER role - cannot mint!');
    }

  } catch (error) {
    console.error('❌ Error debugging contract:', error.message);
    
    if (error.message.includes('YOUR_API_KEY')) {
      console.log('');
      console.log('💡 To use this script:');
      console.log('1. Get an Alchemy API key from https://alchemy.com');
      console.log('2. Replace YOUR_API_KEY in the script');
      console.log('3. Run: node debug-mainnet-roles.js');
    }
  }
}

// Run the debug function
debugMainnetContract();
