import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { ReactLocation, Router, Outlet } from "react-location";
import { ReactLocationDevtools } from "react-location-devtools";

import { Homepage } from "./pages/Homepage/Homepage";
import { Nav } from "components/Nav/Nav";
import { Mintingpage } from "pages/Minting/Mintingpage";
import { getNFTMetaData, pinList } from "services/pinata";
import { NFTDetailsPage } from "pages/NFTDetails/NFTDetailsPage";

const nftName = "minecraft";

const routes = [
  {
    path: "/",
    element: <Homepage />,
    loader: async () => {
      return {
        nfts: await pinList(nftName),
      };
    },
  },
  {
    path: "nftdetails/:nftHash",
    element: <NFTDetailsPage />,
    // @ts-ignore
    loader: async ({ params: { nftHash } }) => {
      return {
        nftDetails: await getNFTMetaData(nftHash),
      };
    },
  },
  {
    path: "/minting",
    element: <Mintingpage />,
  },
];

// Set up a ReactLocation instance
const location = new ReactLocation();

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router location={location} routes={routes}>
      <Box textAlign="center">
        <Nav />
        <Outlet />
      </Box>
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  </ChakraProvider>
);
