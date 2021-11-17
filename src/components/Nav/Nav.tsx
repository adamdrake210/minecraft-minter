import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

import { ColorModeSwitcher } from "components/ColorModeSwitcher";
import { ConnectWallet } from "components/Wallet/ConnectWallet";

export const Nav = () => {
  return (
    <Flex p={3}>
      <ColorModeSwitcher />
      <Text flexGrow={1} fontSize="5xl">
        Minecraft Skin NFTs
      </Text>
      <ConnectWallet />
    </Flex>
  );
};
