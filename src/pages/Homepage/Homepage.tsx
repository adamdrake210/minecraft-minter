import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import { useMatch, Link } from "react-location";
import { useQuery } from "react-query";

import { getCurrentWalletConnected } from "services/web3";
import Loader from "components/common/Loading";
import { WalletInfoLocalType } from "components/Wallet/ConnectWallet";
import { NFTSkinCard } from "components/NFTSkinCard";

export const Homepage = () => {
  const {
    data: { nfts },
  } = useMatch<any>();

  const {
    isFetching,
    isError,
    error,
    data: walletInfo,
  } = useQuery<WalletInfoLocalType, Error>(
    "walletData",
    getCurrentWalletConnected
  );

  return (
    <Loader error={error} isError={isError} isLoading={isFetching}>
      <Grid p={3}>
        {walletInfo?.chainId !== 3 ? (
          <Text color="red" fontSize="3xl">
            You must be connected to the Ropsten Network to see this content.
          </Text>
        ) : (
          <>
            <Text mb={4}>
              Your Ether Balance: {parseFloat(walletInfo.balance).toFixed(3)}
            </Text>
            <Grid
              templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
              gap={6}
            >
              {nfts?.data?.map((nft: any) => {
                console.log("nft: ", nft);
                return (
                  <Link
                    key={nft.metadata.name}
                    to={`/nftdetails/${nft.ipfs_pin_hash}`}
                    activeOptions={{ exact: true }}
                  >
                    <NFTSkinCard nftDetails={nft} />
                  </Link>
                );
              })}
            </Grid>
          </>
        )}
      </Grid>
    </Loader>
  );
};
