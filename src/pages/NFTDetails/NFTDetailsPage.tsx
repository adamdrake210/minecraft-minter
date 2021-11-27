import React from "react";
import { useMatch } from "react-location";
import { List, ListItem, ListIcon, Text, Flex } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import Skinview3d from "react-skinview3d";

import { LocationGenerics } from "App";

export const NFTDetailsPage = () => {
  const {
    data: { nftDetails },
  } = useMatch<LocationGenerics>();

  return (
    <Flex w="100%" p={3} justifyContent="center" direction="column">
      {nftDetails?.data && nftDetails.data.name ? (
        <>
          <Text fontSize="4xl" mb={4}>
            {nftDetails.data.name}
          </Text>
          <Flex justifyContent="center">
            <Skinview3d
              skinUrl={nftDetails.data.image_url}
              height="500"
              width="500"
            />
          </Flex>

          <Text fontSize="xl" my={4}>
            {nftDetails.data.description}
          </Text>
          {nftDetails.data.attributes && (
            <>
              <Text fontSize="3xl" my={4} textDecoration="underline">
                Attributes
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Flexbility: {nftDetails.data.attributes.flexibility}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Toughness: {nftDetails.data.attributes.toughness}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Power: {nftDetails.data.attributes.power}
                </ListItem>
              </List>
            </>
          )}
        </>
      ) : (
        <Text fontSize="3xl" color="tomato">
          Sorry but this NFT couldn't be found
        </Text>
      )}
    </Flex>
  );
};
