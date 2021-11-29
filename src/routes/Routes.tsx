import React from "react";
import { Outlet } from "react-location";
import { useQuery } from "react-query";

import { ConnectMetaMask } from "components/Wallet/ConnectMetaMask";
import { getCurrentWalletConnected } from "services/web3";
import { WalletInfoLocalType } from "components/Wallet/ConnectWallet";
import Loader from "components/common/Loading";

export const Routes = () => {
  const {
    isLoading,
    isError,
    error,
    data: connectedWallet,
  } = useQuery<WalletInfoLocalType, Error>(
    "walletData",
    getCurrentWalletConnected
  );
  return (
    <Loader error={error} isError={isError} isLoading={isLoading}>
      {connectedWallet &&
      connectedWallet.address &&
      connectedWallet.address.length > 0 ? (
        <Outlet />
      ) : (
        <ConnectMetaMask />
      )}
    </Loader>
  );
};
