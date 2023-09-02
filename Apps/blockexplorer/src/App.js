import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { getData } from "./components/tx-history";

import "./App.css";
import { colors } from "@mui/material";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [transactionData, setTransactionData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const findData = async () => {
    const myData = await getData("fromAddress");
    setTransactionData(await myData);
  };

  const findSent = async () => {
    const data = await getData("toAddress");
    setTransferData(data);
  };
  useEffect(() => {
    findSent();
    findData();
    const intervalId = setInterval(() => {
      findData();
      findSent();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="Wallet">
      <div>
        <h1>ETHEREUM BLOCKCHAIN</h1>
      </div>
      <div className="App-Wrapper">
        <div className="App">
          <div>
            <h2>Sent</h2>
          </div>
          {transactionData.length > 0 ? (
            transactionData.map((transaction, index) => (
              <div key={index} className="transactions">
                <span>
                  {transaction.value} {transaction.asset}{" "}
                </span>
                Recipient: {transaction.to}
              </div>
            ))
          ) : (
            <div>No transactions found.</div>
          )}
        </div>
        <div className="App">
          <div>
            <h2>Received</h2>
          </div>
          {transferData.length > 0 ? (
            transferData.map((transaction, index) => (
              <div key={index} className="transactions">
                <span>
                  {transaction.value} {transaction.asset}
                </span>
                From: {transaction.from}
              </div>
            ))
          ) : (
            <div>No transactions found.</div>
          )}
        </div>
      </div>
      <div>
        <h1>POLYGON BLOCKCHAIN</h1>
      </div>
      <div className="App-Wrapper">
        <div className="App">
          <div>
            <h2>Sent</h2>
          </div>
          {transactionData.length > 0 ? (
            transactionData.map((transaction, index) => (
              <div key={index} className="transactions">
                <span>
                  {transaction.value} {transaction.asset}{" "}
                </span>
                Recipient: {transaction.to}
              </div>
            ))
          ) : (
            <div>No transactions found.</div>
          )}
        </div>
        <div className="App">
          <div>
            <h2>Received</h2>
          </div>
          {transferData.length > 0 ? (
            transferData.map((transaction, index) => (
              <div key={index} className="transactions">
                <span>
                  {transaction.value} {transaction.asset}
                </span>
                From: {transaction.from}
              </div>
            ))
          ) : (
            <div>No transactions found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
