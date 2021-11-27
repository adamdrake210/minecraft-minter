import React from "react";
import { Grid, Text, Flex } from "@chakra-ui/react";
import { useMatch, Link } from "react-location";
import { useQuery } from "react-query";
import { getCurrentWalletConnected } from "services/web3";

export const Homepage = () => {
  const {
    data: { nfts },
  } = useMatch<any>();

  const {
    isLoading,
    error,
    data: walletInfo,
  } = useQuery("walletData", getCurrentWalletConnected);

  if (isLoading) return "Loading...";

  // @ts-ignore
  if (error) return "An error has occurred: " + error.message;

  return (
    <Grid p={3}>
      {walletInfo?.chainId !== 3 ? (
        <Text>
          You must be connected to the Ropsten Network to see this content.
        </Text>
      ) : (
        <>
          <Text mb={4}>Your Ether Balance: {walletInfo.balance}</Text>
          <Grid templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]} gap={6}>
            {nfts?.data?.map((nft: any) => {
              console.log("nft: ", nft);
              return (
                <Link
                  key={nft.metadata.name}
                  to={`/nftdetails/${nft.ipfs_pin_hash}`}
                  activeOptions={{ exact: true }}
                >
                  <Flex
                    w="100%"
                    bg="blue.500"
                    p={3}
                    justifyContent="center"
                    direction="column"
                  >
                    <Text>{nft.metadata.name}</Text>
                  </Flex>
                </Link>
              );
            })}
          </Grid>
        </>
      )}
    </Grid>
  );
};
