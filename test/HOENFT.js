const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HOENFT (MyToken)", function () {
  async function deployHOENFTFixture() {
    const [admin, minter, user1, user2, user3] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const contract = await MyToken.deploy(admin.address, minter.address);
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
        .withArgs(ethers.ZeroAddress, user1.address, 0);
      expect(await contract.ownerOf(0)).to.equal(user1.address);
      expect(await contract.tokenURI(0)).to.equal(uri);
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
      await contract.connect(minter).updateTokenURI(0, "ipfs://new-uri");
      expect(await contract.tokenURI(0)).to.equal("ipfs://new-uri");
    });
    it("Should not allow non-minter to update token URI", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://old-uri");
      await expect(contract.connect(user1).updateTokenURI(0, "ipfs://fail"))
        .to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });
    it("Should revert if new URI is empty", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://old-uri");
      await expect(contract.connect(minter).updateTokenURI(0, "")).to.be.revertedWith("Token URI cannot be empty");
    });
  });

  describe("Transfers", function () {
    it("Should allow owner to transfer NFT", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).transferFrom(user1.address, user2.address, 0);
      expect(await contract.ownerOf(0)).to.equal(user2.address);
    });
  });

  describe("Burning", function () {
    it("Should allow owner to burn NFT", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).burn(0))
        .to.emit(contract, "Transfer")
        .withArgs(user1.address, ethers.ZeroAddress, 0);
      await expect(contract.ownerOf(0)).to.be.revertedWithCustomError(contract, "ERC721NonexistentToken");
    });
    it("Should not allow non-owner to burn NFT", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user2).burn(0)).to.be.reverted;
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
      await contract.connect(user1).approve(user2.address, 0);
      expect(await contract.getApproved(0)).to.equal(user2.address);
    });

    it("Should allow approved address to transfer NFT", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).approve(user2.address, 0);
      await contract.connect(user2).transferFrom(user1.address, user3.address, 0);
      expect(await contract.ownerOf(0)).to.equal(user3.address);
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
      await contract.connect(user2).transferFrom(user1.address, user3.address, 0);
      expect(await contract.ownerOf(0)).to.equal(user3.address);
    });

    it("Should support safeTransferFrom", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).safeTransferFrom(user1.address, user2.address, 0);
      expect(await contract.ownerOf(0)).to.equal(user2.address);
    });

    it("Should clear approval after transfer", async function () {
      const { contract, minter, user1, user2, user3 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await contract.connect(user1).approve(user2.address, 0);
      await contract.connect(user2).transferFrom(user1.address, user3.address, 0);
      expect(await contract.getApproved(0)).to.equal(ethers.ZeroAddress);
    });
  });

  describe("Contract State Validation", function () {
    it("Should increment _nextTokenId correctly", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri1");
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri2");
      expect(await contract.ownerOf(0)).to.equal(user1.address);
      expect(await contract.ownerOf(1)).to.equal(user1.address);
    });

    it("Should emit Transfer event on mint", async function () {
      const { contract, minter, user1 } = await loadFixture(deployHOENFTFixture);
      await expect(contract.connect(minter).safeMint(user1.address, "ipfs://uri"))
        .to.emit(contract, "Transfer")
        .withArgs(ethers.ZeroAddress, user1.address, 0);
    });

    it("Should emit Transfer event on transfer", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).transferFrom(user1.address, user2.address, 0))
        .to.emit(contract, "Transfer")
        .withArgs(user1.address, user2.address, 0);
    });

    it("Should emit Approval event on approve", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).approve(user2.address, 0))
        .to.emit(contract, "Approval")
        .withArgs(user1.address, user2.address, 0);
    });

    it("Should emit ApprovalForAll event on setApprovalForAll", async function () {
      const { contract, minter, user1, user2 } = await loadFixture(deployHOENFTFixture);
      await contract.connect(minter).safeMint(user1.address, "ipfs://uri");
      await expect(contract.connect(user1).setApprovalForAll(user2.address, true))
        .to.emit(contract, "ApprovalForAll")
        .withArgs(user1.address, user2.address, true);
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
});
