import React from "react";
import { Grid, Text, Flex } from "@chakra-ui/react";
import { useMatch, Link } from "react-location";

export const Homepage = () => {
  const {
    data: { nfts },
  } = useMatch();

  //@ts-ignore
  console.log("nfts: ", nfts.data.rows[0].ipfs_pin_hash);

  return (
    <Grid p={3}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* @ts-ignore */}
        {nfts?.data?.rows?.map((nft: any) => {
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
