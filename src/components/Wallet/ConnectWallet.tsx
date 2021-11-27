import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import Web3 from "web3";

import { getCurrentWalletConnected, connectWallet } from "services/web3";

type WalletInfoLocalType = {
  web3?: Web3;
  address: string;
  chainId: string | number;
  balance: string;
  error?: any;
};

export const ConnectWallet = () => {
  const [walletInfoLocal, setWalletInfoLocal] = useState<
    WalletInfoLocalType | undefined
  >(undefined);
  const {
    isLoading,
    error,
    data: walletInfo,
  } = useQuery("walletData", getCurrentWalletConnected);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    if (walletResponse) {
      setWalletInfoLocal(walletResponse);
    }
  };

  useEffect(() => {
    console.log("walletInfo: ", walletInfo);
    if (walletInfo) {
      setWalletInfoLocal(walletInfo);
    }
  }, [walletInfo]);

  if (isLoading) return "Loading...";

  // @ts-ignore
  if (error) return "An error has occurred: " + error.message;

  return (
    <Flex>
      <Button id="walletButton" onClick={connectWalletPressed}>
        {walletInfoLocal &&
        walletInfoLocal.address &&
        walletInfoLocal.address.length > 0 ? (
          "Connected: " +
          String(walletInfoLocal.address).substring(0, 6) +
          "..." +
          String(walletInfoLocal.address).substring(38)
        ) : (
          <span>Login</span>
        )}
      </Button>
    </Flex>
  );
};
