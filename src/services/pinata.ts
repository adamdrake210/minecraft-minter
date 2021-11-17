import { MineCraftSkinNft } from "../types/types";
import axios from 'axios';

const SECRET = process.env.REACT_APP_PINATA_SECRET;
const KEY = process.env.REACT_APP_PINATA_KEY;

export const pinJSONToIPFS = async (JSONBody: MineCraftSkinNft) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: KEY || '',
        pinata_secret_api_key: SECRET || '',
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