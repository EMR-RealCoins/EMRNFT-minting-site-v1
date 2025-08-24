const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const HouseOfEmiratesNFTs = await hre.ethers.getContractFactory("HouseOfEmiratesNFTs");

  // Get the default accounts
  const [deployer, minter] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // Deploy the contract, passing the deployer as the admin and a second account as the minter
  const contract = await HouseOfEmiratesNFTs.deploy(deployer.address, minter.address);

  // Wait for the contract to be deployed
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("HouseOfEmiratesNFTs deployed to:", contractAddress);
  console.log("----------------------------------------------------");
  console.log("Minter account:", minter.address);
  console.log("MINTER_ROLE has been granted to this account.");
  console.log("----------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

