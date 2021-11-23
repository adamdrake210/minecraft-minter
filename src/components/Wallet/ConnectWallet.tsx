import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

import { connectWallet } from "utils/wallets/connectWallet";
import { getCurrentWalletConnected } from "utils/wallets/getCurrentWalletConnected";

declare let window: any;

export const ConnectWallet = () => {
  const [walletAddress, setWallet] = useState("");

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    if (walletResponse) {
      // setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    }
  };

  const handleLogout = () => {};

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          // modal to show successful connection
        } else {
          setWallet("");
          // set modal to connect via top right button
        }
      });
    } else {
      // set modal to you must install metamask
    }
  };

  useEffect(() => {
    async function getCurrentWallet() {
      const wallet = await getCurrentWalletConnected();
      if (wallet) {
        setWallet(wallet.address);
      }
      addWalletListener();
    }
    getCurrentWallet();
  }, []);

  return (
    <Flex>
      <Button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Login</span>
        )}
      </Button>
      {/* <Button variant="outline" ml={2} onClick={handleLogout}>
        Logout
      </Button> */}
    </Flex>
  );
};
