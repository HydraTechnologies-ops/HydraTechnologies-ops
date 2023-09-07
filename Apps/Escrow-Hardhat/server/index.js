// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const walletAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.WALLET_KEY;
const mumbaiApi = process.env.MUMBAI_API;

console.log(walletAddress);

const app = express();

app.use(express.json());

app.get("/api/arbiter", (req, res) => {
  res.json({ message: `${walletAddress}` });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
