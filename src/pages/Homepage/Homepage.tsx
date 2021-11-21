import React from "react";
import { Grid } from "@chakra-ui/react";

import { MintingForm } from "components/MintingForm";

export const Homepage = () => {
  return (
    <Grid minH="100vh" p={3}>
      <MintingForm />
    </Grid>
  );
};
