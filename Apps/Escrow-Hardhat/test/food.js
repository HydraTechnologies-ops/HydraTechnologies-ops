const { ethers } = require("hardhat");
const { expect } = require("chai");
const {
  loadFixture,
  setBalance,
} = require("@nomicfoundation/hardhat-network-helpers");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("FoodList function testing", function () {
  async function deployContactAndVariables() {
      const food = await ethers.getContractFactory("CropListing");
      

    const foodDeploy = await food.deploy(
      "Corn",
      100,
      "Midland, TX",
      10000,
      1209600
    );
      
      const signer = await ethers.provider.getSigner(0);
      
      let newWallet = await ethers.Wallet.createRandom();


    newWallet = await newWallet.connect(ethers.provider);

    let walletAddress = await newWallet.address;

    await setBalance(walletAddress, 100n ** 18n);

    return { foodDeploy, newWallet };
  }

  it("Should return the new food", async function () {
    const { foodDeploy, newWallet } = await loadFixture(
      deployContactAndVariables
    );

    const cropType = await foodDeploy.getCropType();

    const details = await foodDeploy.getDetails();

    await foodDeploy.connect(newWallet).fund({ value: "2000" });

    const balance = await foodDeploy.getFundingPercentage();

    const contributions = await foodDeploy.getContributionsList();

    await console.log(
      `contributor: ${contributions[0][0]} with amount: ${contributions[0][1]} ethers!`
    );

    await console.log(balance);

    expect(cropType == "Corn", "The crop type was not returned correctly");
  });
});
