import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/react";

type Props = {
  error?: Error | null;
  isLoading?: boolean;
  isError?: boolean;
  children?: any;
  loadingMessage?: string;
};

const Loader = ({
  isLoading,
  loadingMessage,
  isError,
  error,
  children = null,
}: Props) => {
  if (isLoading) {
    return (
      <Flex
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={45} isIndeterminate color="orange.400" mb={2} />
        <Text fontSize="2xl">{loadingMessage || "Loading..."}</Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="xl" color="red">
          There was a problem loading this request - {error && error.message}
        </Text>
      </Flex>
    );
  }

  return children;
};

export default Loader;
