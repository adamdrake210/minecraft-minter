import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Skinview3d from "react-skinview3d";

import { getNFTMetaData } from "services/pinata";

import Loader from "./common/Loading";

type NFTSkinCardProps = {
  nftDetails: {
    ipfs_pin_hash: string;
    name: string;
  };
};

export const NFTSkinCard = ({ nftDetails }: NFTSkinCardProps) => {
  const {
    isFetching,
    isError,
    error,
    data: nftData,
  } = useQuery<any, Error>(["nftdetail", nftDetails.ipfs_pin_hash], () =>
    getNFTMetaData(nftDetails.ipfs_pin_hash)
  );

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Loader error={error} isError={isError} isLoading={isFetching}>
        {nftData && (
          <Box p={2} minHeight={350}>
            <Text fontSize="2xl" mb={4}>
              {nftData.data.name}
            </Text>
            <Flex justifyContent="center">
              <Skinview3d
                skinUrl={nftData.data.image_url}
                height={200}
                width={200}
              />
            </Flex>
            <Text fontSize="l" mb={4}>
              {nftData.data.description}
            </Text>
          </Box>
        )}
      </Loader>
    </Box>
  );
};
