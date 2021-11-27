import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { MineCraftSkinNft } from "types/types";
import { pinJSONToIPFS } from "services/pinata";

import contractABI from "utils/contracts/contract-abi.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

let web3: any;

if (alchemyKey) {
  web3 = createAlchemyWeb3(alchemyKey);
}
declare let window: any;

export const mintNFT = async ({
  image_url,
  name,
  description,
  attributes,
}: MineCraftSkinNft) => {
  //error handling
  if (
    image_url.trim() === "" ||
    name.trim() === "" ||
    description.trim() === ""
  ) {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata: MineCraftSkinNft = {
    name: "",
    image_url: "",
    description: "",
    attributes: { flexibility: 0, toughness: 0, power: 0 },
  };
  metadata.name = name;
  metadata.image_url = image_url;
  metadata.description = description;
  metadata.attributes = attributes;

  const JSONBody = {
    pinataMetadata: {
      name: `minecraft_${name}`,
    },
    pinataContent: metadata,
  };

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(JSONBody);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "Something went wrong while uploading your tokenURI.",
    };
  }
  // @ts-ignore
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await new web3.eth.Contract(
    contractABI.abi,
    contractAddress
  );

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  };

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status: txHash,
    };
  } catch (error: any) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
    };
  }
};
