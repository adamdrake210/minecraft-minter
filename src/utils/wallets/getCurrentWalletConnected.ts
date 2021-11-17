declare let window: any;

type ReturnType = {
  address: string;
  status: string;
};

export const getCurrentWalletConnected = async (): Promise<
  ReturnType | undefined
> => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err: any) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  }
};
