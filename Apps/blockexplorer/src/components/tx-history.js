import { Alchemy, Network } from "alchemy-sdk";
import React from "react";

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

export const getData = async (address) => {
  const response = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    [address]: "/*Fill in*/",
    category: ["external", "internal", "erc20", "erc721", "erc1155"],
  });

  console.log(response);

  return response.transfers;
};
