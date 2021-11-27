import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import Web3 from "web3";

import { getCurrentWalletConnected, connectWallet } from "services/web3";
import Loader from "components/common/Loading";

export type WalletInfoLocalType = {
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
    isFetching,
    isError,
    error,
    data: walletInfo,
  } = useQuery<WalletInfoLocalType, Error>(
    "walletData",
    getCurrentWalletConnected
  );

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

  return (
    <Loader error={error} isError={isError} isLoading={isFetching}>
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
    </Loader>
  );
};
