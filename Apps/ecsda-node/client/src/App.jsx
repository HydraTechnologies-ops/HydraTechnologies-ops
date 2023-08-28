import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App(props) {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const name = '';

  return (
    <div className="app">
      <p>{props.name}</p>
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
