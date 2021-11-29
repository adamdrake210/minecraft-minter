import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const ConnectMetaMask = () => {
  return (
    <Box>
      <Text color="red" fontSize="3xl">
        You must connect this App to MetaMask to use it.
      </Text>
    </Box>
  );
};
