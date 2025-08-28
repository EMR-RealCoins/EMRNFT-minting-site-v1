const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HOENFT (HouseOfEmiratesNFTs)", function () {
  async function deployHOENFTFixture() {
    const [admin, minter, user1, user2, user3] = await ethers.getSigners();
    const HouseOfEmiratesNFTs = await ethers.getContractFactory("HouseOfEmiratesNFTs");
    const contract = await HouseOfEmiratesNFTs.deploy(admin.address, minter.address);
    return { contract, admin, minter, user1, user2, user3 };
  }

  describe("Deployment", function () {
    it("Should set the right admin and minter roles", async function () {
      const { contract, admin, minter } = await loadFixture(deployHOENFTFixture);
      expect(await contract.hasRole(await contract.DEFAULT_ADMIN_ROLE(), admin.address)).to.be.true;
      expect(await contract.hasRole(await contract.MINTER_ROLE(), minter.address)).to.be.true;
    });
  });

  describe("Minting", function () {
    it("Should allow minter to mint NFT with metadata URI", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      const uri = "ipfs://test-uri-1";
      await expect(contract.connect(minter).safeMint(user1.address, uri))
        .to.emit(contract, "Transfer")
        .withArgs(ethers.ZeroAddress, user1.address, 1);
      expect(await contract.ownerOf(1)).to.equal(user1.address);
      expect(await contract.tokenURI(1)).to.equal(uri);
    });
    it("Should not allow non-minter to mint", async function () {
      const { contract, user1 } = await loadFixture(deployHOENFTFixture);
      await expect(contract.connect(user1).safeMint(user1.address, "ipfs://fail"))
        .to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });
  });

  describe("Token URI Update", function () {
    it("Should allow minter to update token URI", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://old-uri");
      await contract.connect(minter).updateTokenURI(1, "ipfs://new-uri");
      expect(await contract.tokenURI(1)).to.equal("ipfs://new-uri");
    });
    it("Should not allow non-minter to update token URI", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://old-uri");
      await expect(contract.connect(user1).updateTokenURI(1, "ipfs://fail"))
        .to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });
    it("Should revert if new URI is empty", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://old-uri");
      await expect(contract.connect(minter).updateTokenURI(1, "")).to.be.revertedWith("Token URI cannot be empty");
    });
  });

  describe("Transfers", function () {
    it("Should allow owner to transfer NFT", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).transferFrom(user1.address, user2.address, 1);
      expect(await contract.ownerOf(1)).to.equal(user2.address);
    });
  });

  describe("Burning", function () {
    it("Should allow owner to burn NFT", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).burn(1))
        .to.emit(contract, "Transfer")
        .withArgs(user1.address, ethers.ZeroAddress, 1);
      await expect(contract.ownerOf(1)).to.be.revertedWithCustomError(contract, "ERC721NonexistentToken");
    });
    it("Should not allow non-owner to burn NFT", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user2).burn(1)).to.be.reverted;
    });
  });

  describe("Role Management", function () {
    it("Should allow admin to grant minter role", async function () {
      const { contract, admin, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(admin).grantRole(await contract.MINTER_ROLE(), user1.address);
      expect(await contract.hasRole(await contract.MINTER_ROLE(), user1.address)).to.be.true;
    });
    it("Should not allow non-admin to grant roles", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await expect(contract.connect(minter).grantRole(await contract.MINTER_ROLE(), user1.address)).to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });
  });

  // New comprehensive test sections
  describe("Advanced Role Management", function () {
    it("Should allow admin to revoke minter role", async function () {
      const { contract, admin, minter } = await loadFixture(deployHOENFTFixture);
      await contract.connect(admin).revokeRole(await contract.MINTER_ROLE(), minter.address);
      expect(await contract.hasRole(await contract.MINTER_ROLE(), minter.address)).to.be.false;
    });

    it("Should not allow non-admin to revoke roles", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await expect(contract.connect(minter).revokeRole(await contract.MINTER_ROLE(), user1.address))
        .to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });

    it("Should allow users to renounce their own roles", async function () {
      const { contract, admin, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(admin).grantRole(await contract.MINTER_ROLE(), user1.address);
      await contract.connect(user1).renounceRole(await contract.MINTER_ROLE(), user1.address);
      expect(await contract.hasRole(await contract.MINTER_ROLE(), user1.address)).to.be.false;
    });

    it("Should not allow users to renounce others' roles", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await expect(contract.connect(user1).renounceRole(await contract.MINTER_ROLE(), minter.address))
        .to.be.revertedWithCustomError(contract, "AccessControlBadConfirmation");
    });

    it("Should maintain admin role hierarchy", async function () {
      const { contract, admin, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(admin).grantRole(await contract.DEFAULT_ADMIN_ROLE(), user1.address);
      expect(await contract.hasRole(await contract.DEFAULT_ADMIN_ROLE(), user1.address)).to.be.true;
    });
  });

  describe("Transfer Security & Approvals", function () {
    it("Should allow owner to approve specific address", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).approve(user2.address, 1);
      expect(await contract.getApproved(1)).to.equal(user2.address);
    });

    it("Should allow approved address to transfer NFT", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).approve(user2.address, 1);
      await contract.connect(user2).transferFrom(user1.address, user3.address, 1);
      expect(await contract.ownerOf(1)).to.equal(user3.address);
    });

    it("Should allow owner to set approval for all", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).setApprovalForAll(user2.address, true);
      expect(await contract.isApprovedForAll(user1.address, user2.address)).to.be.true;
    });

    it("Should allow operator to transfer NFT after setApprovalForAll", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).setApprovalForAll(user2.address, true);
      await contract.connect(user2).transferFrom(user1.address, user3.address, 1);
      expect(await contract.ownerOf(1)).to.equal(user3.address);
    });

    it("Should support safeTransferFrom", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).safeTransferFrom(user1.address, user2.address, 1);
      expect(await contract.ownerOf(1)).to.equal(user2.address);
    });

    it("Should clear approval after transfer", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).approve(user2.address, 1);
      await contract.connect(user2).transferFrom(user1.address, user3.address, 1);
      expect(await contract.getApproved(1)).to.equal(ethers.ZeroAddress);
    });
  });

  describe("Contract State Validation", function () {
    it("Should increment _nextTokenId correctly", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      expect(await contract.ownerOf(1)).to.equal(user1.address);
      expect(await contract.ownerOf(2)).to.equal(user1.address);
    });

    it("Should emit Transfer event on mint", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await expect(contract.connect(minter).safeMint(user1.address, "ipfs://uri"))
        .to.emit(contract, "Transfer")
        .withArgs(ethers.ZeroAddress, user1.address, 1);
    });

    it("Should emit Transfer event on transfer", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).transferFrom(user1.address, user2.address, 1))
        .to.emit(contract, "Transfer")
        .withArgs(user1.address, user2.address, 1);
    });

    it("Should emit Approval event on approve", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).approve(user2.address, 1))
        .to.emit(contract, "Approval")
        .withArgs(user1.address, user2.address, 1);
    });

    it("Should emit ApprovalForAll event on setApprovalForAll", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).setApprovalForAll(user2.address, true))
        .to.emit(contract, "ApprovalForAll")
        .withArgs(user1.address, user2.address, true);
    });

    it("Should start token IDs from 1 (not 0)", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      
      // First mint should return token ID 1
      const firstTokenId = await contract.connect(minter).safeMint.staticCall(user1.address, "ipfs://uri1");
      expect(firstTokenId).to.equal(1);
      
      // Verify the first minted token has ID 1
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      expect(await contract.ownerOf(1)).to.equal(user1.address);
      
      // Second mint should return token ID 2
      const secondTokenId = await contract.connect(minter).safeMint.staticCall(user2.address, "ipfs://uri2");
      expect(secondTokenId).to.equal(2);
      
      // Verify the second minted token has ID 2
      await contract.connect(minter).safeMint(user2.address, "ipfs://uri2");
      expect(await contract.ownerOf(2)).to.equal(user2.address);
      
      // Verify that token ID 0 does not exist
      await expect(contract.ownerOf(0)).to.be.revertedWithCustomError(contract, "ERC721NonexistentToken");
      
      // Total supply should be 2
      expect(await contract.totalSupply()).to.equal(2);
    });
  });

  describe("Access Control Security", function () {
    it("Should prevent role escalation attacks", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      // User1 should not be able to grant themselves admin role
      await expect(contract.connect(user1).grantRole(await contract.DEFAULT_ADMIN_ROLE(), user1.address))
        .to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });

    it("Should maintain role isolation", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      // Having MINTER_ROLE should not grant DEFAULT_ADMIN_ROLE
      expect(await contract.hasRole(await contract.DEFAULT_ADMIN_ROLE(), minter.address)).to.be.false;
    });

    it("Should allow admin to manage all roles", async function () {
      const { contract, admin, user1 } = await loadFixture(deployHOENFTFixture);
      const customRole = ethers.keccak256(ethers.toUtf8Bytes("CUSTOM_ROLE"));
      await contract.connect(admin).grantRole(customRole, user1.address);
      expect(await contract.hasRole(customRole, user1.address)).to.be.true;
    });

    it("Should prevent non-admin from creating new roles", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      const customRole = ethers.keccak256(ethers.toUtf8Bytes("CUSTOM_ROLE"));
      await expect(contract.connect(minter).grantRole(customRole, user1.address))
        .to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });

    it("Should handle role revocation correctly", async function () {
      const { contract, admin, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(admin).grantRole(await contract.MINTER_ROLE(), user1.address);
      await contract.connect(admin).revokeRole(await contract.MINTER_ROLE(), user1.address);
      expect(await contract.hasRole(await contract.MINTER_ROLE(), user1.address)).to.be.false;
      // User1 should no longer be able to mint
      await expect(contract.connect(user1).safeMint(user1.address, "ipfs://uri"))
        .to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });
  });

  describe("Total Supply Functionality", function () {
    it("Should return 0 total supply initially", async function () {
      const { contract } = await loadFixture(deployHOENFTFixture);
      expect(await contract.totalSupply()).to.equal(0);
    });

    it("Should increment total supply after minting", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      
      // Initially 0
      expect(await contract.totalSupply()).to.equal(0);
      
      // After first mint
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      expect(await contract.totalSupply()).to.equal(1);
      
      // After second mint
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      expect(await contract.totalSupply()).to.equal(2);
      
      // After third mint
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri3");
      expect(await contract.totalSupply()).to.equal(3);
    });

    it("Should maintain correct total supply after multiple mints to different users", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      await contract.connect(minter).safeMint(user2.address, "ipfs://uri2");
      await contract.connect(minter).safeMint(user3.address, "ipfs://uri3");
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri4");
      
      expect(await contract.totalSupply()).to.equal(4);
    });

    it("Should not decrease total supply after transfers", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      
      // Mint 2 tokens
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      expect(await contract.totalSupply()).to.equal(2);
      
      // Transfer one token
      await contract.connect(user1).transferFrom(user1.address, user2.address, 1);
      
      // Total supply should remain the same
      expect(await contract.totalSupply()).to.equal(2);
      expect(await contract.ownerOf(1)).to.equal(user2.address);
      expect(await contract.ownerOf(2)).to.equal(user1.address);
    });

    it("Should not decrease total supply after burning", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      
      // Mint 3 tokens
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri3");
      expect(await contract.totalSupply()).to.equal(3);
      
      // Burn one token
      await contract.connect(user1).burn(1);
      
      // Total supply should remain the same (tracks minted, not existing tokens)
      expect(await contract.totalSupply()).to.equal(3);
      
      // Token should be burned
      await expect(contract.ownerOf(1)).to.be.revertedWithCustomError(contract, "ERC721NonexistentToken");
      
      // Other tokens should still exist
      expect(await contract.ownerOf(2)).to.equal(user1.address);
      expect(await contract.ownerOf(3)).to.equal(user1.address);
    });

    it("Should handle sequential token IDs correctly", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      
      // Mint tokens and verify IDs
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      expect(await contract.totalSupply()).to.equal(1);
      expect(await contract.ownerOf(1)).to.equal(user1.address);
      
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      expect(await contract.totalSupply()).to.equal(2);
      expect(await contract.ownerOf(2)).to.equal(user1.address);
      
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri3");
      expect(await contract.totalSupply()).to.equal(3);
      expect(await contract.ownerOf(3)).to.equal(user1.address);
    });

    it("Should maintain total supply consistency with safeMint return value", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      
      // Check that safeMint returns correct token ID
      expect(await contract.connect(minter).safeMint.staticCall(user1.address, "ipfs://uri1")).to.equal(1);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      expect(await contract.totalSupply()).to.equal(1);
      
      expect(await contract.connect(minter).safeMint.staticCall(user1.address, "ipfs://uri2")).to.equal(2);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      expect(await contract.totalSupply()).to.equal(2);
      
      expect(await contract.connect(minter).safeMint.staticCall(user1.address, "ipfs://uri3")).to.equal(3);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri3");
      expect(await contract.totalSupply()).to.equal(3);
    });

    it("Should be callable by any address (view function)", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      
      // Mint some tokens
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      await contract.connect(minter).safeMint(user2.address, "ipfs://uri2");
      
      // All users should be able to call totalSupply
      expect(await contract.connect(user1).totalSupply()).to.equal(2);
      expect(await contract.connect(user2).totalSupply()).to.equal(2);
      expect(await contract.connect(user3).totalSupply()).to.equal(2);
      expect(await contract.connect(minter).totalSupply()).to.equal(2);
    });

    it("Should handle edge case: mint, burn, mint again", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      
      // Mint token 1
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      expect(await contract.totalSupply()).to.equal(1);
      
      // Burn token 1
      await contract.connect(user1).burn(1);
      expect(await contract.totalSupply()).to.equal(1);
      
      // Mint token 2 (next available ID)
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      expect(await contract.totalSupply()).to.equal(2);
      expect(await contract.ownerOf(2)).to.equal(user1.address);
      
      // Token 1 should still be burned
      await expect(contract.ownerOf(1)).to.be.revertedWithCustomError(contract, "ERC721NonexistentToken");
    });

    it("Should maintain total supply accuracy in complex scenarios", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      
      // Complex scenario: mint, transfer, burn, mint more
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1"); // ID 1
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2"); // ID 2
      await contract.connect(minter).safeMint(user2.address, "ipfs://uri3"); // ID 3
      expect(await contract.totalSupply()).to.equal(3);
      
      // Transfer token 1 from user1 to user3
      await contract.connect(user1).transferFrom(user1.address, user3.address, 1);
      expect(await contract.totalSupply()).to.equal(3);
      
      // Burn token 2
      await contract.connect(user1).burn(2);
      expect(await contract.totalSupply()).to.equal(3);
      
      // Mint more tokens
      await contract.connect(minter).safeMint(user2.address, "ipfs://uri4"); // ID 4
      await contract.connect(minter).safeMint(user3.address, "ipfs://uri5"); // ID 5
      expect(await contract.totalSupply()).to.equal(5);
      
      // Verify ownership
      expect(await contract.ownerOf(1)).to.equal(user3.address);
      await expect(contract.ownerOf(2)).to.be.revertedWithCustomError(contract, "ERC721NonexistentToken");
      expect(await contract.ownerOf(3)).to.equal(user2.address);
      expect(await contract.ownerOf(4)).to.equal(user2.address);
      expect(await contract.ownerOf(5)).to.equal(user3.address);
    });
  });
});
