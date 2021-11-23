import React, { useState } from "react";
import { Grid, useDisclosure } from "@chakra-ui/react";

import { MintingForm } from "components/MintingForm";
import { MintingModal } from "components/MintingModal";

export const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mintingStatus, setMintingStatus] = useState("");

  return (
    <Grid minH="100vh" p={3}>
      <MintingForm onOpen={onOpen} setMintingStatus={setMintingStatus} />
      <MintingModal
        isOpen={isOpen}
        onClose={onClose}
        mintingStatus={mintingStatus}
      />
    </Grid>
  );
};
