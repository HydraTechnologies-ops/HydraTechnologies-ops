import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { Network, Alchemy } from "alchemy-sdk";


// const settings = {
//   apiKey: `${process.env.ALCHEMY_API_KEY}}`,
//   network: Network.MATIC_MUMBAI,
// };

// const alchemy = new Alchemy(settings);

// // Get the latest block
// const latestBlock = alchemy.core.getBlockNumber();

// // Get all outbound transfers for a provided address
// alchemy.core
//   .getTokenBalances("0x994b342dd87fc825f66e51ffa3ef71ad818b6893")
//   .then(console.log);

// // Get all the NFTs owned by an address
// const nfts = alchemy.nft.getNftsForOwner("");

// // Listen to all new pending transactions
// alchemy.ws.on(
//   {
//     method: "alchemy_pendingTransactions",
//     fromAddress: `${process.env.WALLET_ADDRESS}`,
//   },
//   (res) => console.log(res)
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

if (!window.ethereum) {
  root.render(
    <React.StrictMode>
      You need to install a browser wallet to build the escrow dapp
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
