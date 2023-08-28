const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  const merkleTree = new MerkleTree(niceList);

  const root = merkleTree.getRoot();
  const name = "HydraLabs";
  const index = niceList.findIndex((leaf) => leaf === name);

  const proof = merkleTree.getProof(index);

  // TODO: how do we prove to the server we're on the nice list?

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
    root,
  });

  console.log({ gift });
}

main();
