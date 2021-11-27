import Web3 from "web3";

declare let window: any;

export async function getCurrentWalletConnected() {
  const { ethereum } = window;
  if (!ethereum) {
    throw new Error("You must install MetaMask to use this app!");
  }
  try {
    const web3 = new Web3(ethereum);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const chainId = await web3.eth.getChainId();
    const balance = await web3.eth.getBalance(address);
    return {
      web3,
      address: address || "",
      chainId: chainId || "",
      balance: web3.utils.fromWei(balance) || "",
    };
  } catch (error: any) {
    return {
      error: error.message,
      address: "",
      chainId: "",
      balance: "",
    };
  }
}

export const connectWallet = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    throw new Error("You must install MetaMask to use this app!");
  }
  if (ethereum) {
    try {
      const web3 = new Web3(ethereum);
      const addressArray = await web3.eth.requestAccounts();
      const obj = {
        address: addressArray[0],
        chainId: "",
        balance: "",
      };
      return obj;
    } catch (error: any) {
      return {
        error: error.message,
        address: "",
        chainId: "",
        balance: "",
      };
    }
  }
};

export function subscribeToAccount(
  web3: Web3,
  callback: (error: Error | null, account: string | null) => any
) {
  const id = setInterval(async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      callback(null, accounts[0]);
    } catch (error: any) {
      callback(error, null);
    }
  }, 1000);
  return () => {
    clearInterval(id);
  };
}
export function subscribeToNetId(
  web3: Web3,
  callback: (error: Error | null, netId: number | null) => any
) {
  const id = setInterval(async () => {
    try {
      const netId = await web3.eth.net.getId();
      callback(null, netId);
    } catch (error: any) {
      callback(error, null);
    }
  }, 1000);
  return () => {
    clearInterval(id);
  };
}
