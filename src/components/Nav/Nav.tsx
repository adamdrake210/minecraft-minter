import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-location";

import { ColorModeSwitcher } from "components/ColorModeSwitcher";
import { ConnectWallet } from "components/Wallet/ConnectWallet";

function getActiveProps() {
  return {
    style: {
      fontWeight: "bold",
      textDecoration: "underline",
    },
  };
}

export const Nav = () => {
  return (
    <Flex p={3}>
      <ColorModeSwitcher />
      <ChakraLink py={0.2} px={2} ml={3} fontSize="2xl">
        <Link
          to="/"
          getActiveProps={getActiveProps}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
      </ChakraLink>
      <ChakraLink py={0.2} px={2} fontSize="2xl">
        <Link
          to="/minting"
          getActiveProps={getActiveProps}
          activeOptions={{ exact: true }}
        >
          Mint
        </Link>
      </ChakraLink>
      <Text flexGrow={1} fontSize="6xl">
        <Link to="/" activeOptions={{ exact: true }}>
          Minecraft Skin NFTs
        </Link>
      </Text>
      <ConnectWallet />
    </Flex>
  );
};
