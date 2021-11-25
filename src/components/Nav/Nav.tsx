import React from "react";
import { Flex, Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
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
    <Flex direction="column">
      <Flex p={3} justifyContent="space-between">
        <Flex>
          <Box py={0.2} px={2} ml={3} fontSize="2xl">
            <Link
              to="/"
              getActiveProps={getActiveProps}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
          </Box>
          <Box py={0.2} px={2} fontSize="2xl">
            <Link
              to="/minting"
              getActiveProps={getActiveProps}
              activeOptions={{ exact: true }}
            >
              Mint
            </Link>
          </Box>
        </Flex>
        <Flex>
          <ColorModeSwitcher />
          <ConnectWallet />
        </Flex>
      </Flex>
      <Flex>
        <Text flexGrow={1} fontSize={["3xl", "6xl"]}>
          <Link to="/" activeOptions={{ exact: true }}>
            Minecraft Skin NFTs
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

// TODO
// Pull data to render skins in 3d
// Put on vercel
// Wallet to connect even on mobile to mobile app ? https://pretagteam.com/question/how-to-detectlaunch-and-connect-to-metamask-mobile-app-by-clicking-on-a-button-on-the-webapp-like-on-opensea
