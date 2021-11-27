import Web3 from "web3";

declare let window: any;

export async function getCurrentWalletConnected() {
  const { ethereum } = window;
  if (!ethereum) {
    throw new Error("Connect to Metamask using the top right button.");
  }
  try {
    const web3 = new Web3(ethereum);
    const accounts = await web3.eth.getAccounts();
    return {
      web3,
      account: accounts[0] || "",
    };
  } catch (error) {
    return {
      error,
      account: "No Account found",
    };
  }
}
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
