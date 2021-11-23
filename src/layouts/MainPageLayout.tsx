import React from "react";
import { Container, VStack } from "@chakra-ui/layout";

type MainPageLayoutProps = {
  children: React.ReactNode;
};

export const MainPageLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <VStack>
      <Container maxW="container.md">{children}</Container>
    </VStack>
  );
};
