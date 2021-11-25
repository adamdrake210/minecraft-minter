import React, { useEffect, useState } from "react";
import { Grid, Text, Flex } from "@chakra-ui/react";
import { useMatch, Link } from "react-location";

declare let window: any;

type WalletInfo = {
  address: string;
  status: boolean;
};

export const Homepage = () => {
  const {
    data: { nfts },
  } = useMatch<any>();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  useEffect(() => {
    async function getCurrentWallet() {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletInfo({ address: addressArray[0], status: true });
    }
    getCurrentWallet();
  }, []);

  console.log("walletInfo: ", walletInfo);

  return (
    <Grid p={3}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
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
    </Grid>
  );
};
