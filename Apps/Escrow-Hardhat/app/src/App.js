import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { deploy, deployCrop } from "./deploy";
import Escrow from "./Escrow";
import React from "react";
import "./App.scss";
import "./palette.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import MakeToast from "./Components/toast";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [transactions, setTransations] = useState(0);
  const [toast, setToaster] = useState(false);

  const [crop, setCrops] = useState([]);

  const [data, setData] = useState(null);
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  const toasterSettings = () => setToaster(!toast);
  const addTransaction = () => setTransations(transactions + 1);

  useEffect(() => {
    fetch("/api/arbiter")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  async function newEscrowContract() {
    const beneficiary = document.getElementById("beneficiary").value;
    const arbiter = document.getElementById("arbiter").value;
    const value = ethers.BigNumber.from(document.getElementById("wei").value);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on("Approved", () => {
          document.getElementById(escrowContract.address).className =
            "complete";
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  return (
    <>
      <div className="app-body">
        <header className="app-header">
          <div className="logo-wrapper">
            <Player
              src="https://lottie.host/9082f036-2ad7-4c89-93bf-e7ae950b2793/CvV7ky4kuk.json"
              className="player"
              loop
              autoplay
            />
          </div>
        </header>
        <div className="contract-container">
          <div className="contract">
            <h1> New Escrow Contract </h1>
            <label>
              Arbiter Address
              <input
                type="text"
                id="arbiter"
                defaultValue={"0x15d34aaf54267db7d7c367839aaf71a00a2c6a65"}
              />
            </label>

            <label>
              Beneficiary Address
              <input
                type="text"
                id="beneficiary"
                defaultValue={"0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"}
              />
            </label>

            <label>
              Deposit Amount (in Wei)
              <input type="text" id="wei" defaultValue={1000000000000000000} />
            </label>

            <div
              className="button"
              id="deploy"
              onClick={(e) => {
                e.preventDefault();

                newEscrowContract();

                addTransaction();

                toasterSettings();
              }}
            >
              Deploy
            </div>
          </div>
          <div className="existing-contracts">
            <h1> Existing Contracts </h1>

            <div id="container">
              {escrows.map((escrow) => {
                return <Escrow key={escrow.address} {...escrow} />;
              })}
              <p>Arbiter: {!data ? "Loading..." : data}</p>
            </div>
          </div>
        </div>
        <MakeToast
          transaction={transactions || "Loading..."}
          show={!toast}
          onClose={toasterSettings}
        />
      </div>
    </>
  );
}

export default App;
