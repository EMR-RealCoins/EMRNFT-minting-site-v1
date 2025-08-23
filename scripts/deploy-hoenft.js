const { ethers } = require("hardhat");

async function main() {
  // Accept admin and minter addresses from env or CLI
  const [deployer] = await ethers.getSigners();
  const admin = process.env.ADMIN || deployer.address;
  const minter = process.env.MINTER || deployer.address;

  console.log(`Deploying MyToken with admin: ${admin}, minter: ${minter}`);

  const MyToken = await ethers.getContractFactory("MyToken");
  const contract = await MyToken.deploy(admin, minter);
  await contract.deployed();

  console.log(`MyToken deployed to: ${contract.address}`);
  console.log(`Admin role: ${admin}`);
  console.log(`Minter role: ${minter}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
