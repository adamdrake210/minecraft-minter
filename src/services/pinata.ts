import { MineCraftSkinNft } from "../types/types";
import axios from "axios";

const SECRET = process.env.REACT_APP_PINATA_SECRET;
const KEY = process.env.REACT_APP_PINATA_KEY;

type PinaataPinJsonToIPFSType = {
  pinataMetadata: {
    name: string;
  };
  pinataContent: MineCraftSkinNft;
};

export const pinJSONToIPFS = async (JSONBody: PinaataPinJsonToIPFSType) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: KEY || "",
        pinata_secret_api_key: SECRET || "",
      },
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error: Error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const pinList = async (nftName: string) => {
  const url = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[name]=${nftName}`;

  return axios
    .get(url, {
      headers: {
        pinata_api_key: KEY || "",
        pinata_secret_api_key: SECRET || "",
      },
    })
    .then(function (response) {
      return {
        success: true,
        data: response.data.rows,
      };
    })
    .catch(function (error) {
      //handle error here
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const getNFTMetaData = async (hash: string) => {
  const url = `https://gateway.pinata.cloud/ipfs/${hash}`;

  return axios
    .get(url)
    .then((response) => {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(function (error) {
      //handle error here
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
