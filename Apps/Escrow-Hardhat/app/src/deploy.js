import { ethers } from "ethers";
import Escrow from "./artifacts/contracts/Escrow.sol/Escrow";
import CropListing from "./artifacts/contracts/CropListing.sol/CropListing";

export async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}

export async function deployCrop(
  signer,
  croptype,
  minimumBuy,
  location,
  fundingGoal,
  deadline
) {
  const factory = new ethers.ContractFactory(
    CropListing.abi,
    CropListing.bytecode,
    signer
  );
  return factory.deploy(croptype, minimumBuy, location, fundingGoal, deadline);
}
