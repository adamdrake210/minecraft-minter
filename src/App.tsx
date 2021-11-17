import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { Homepage } from "./pages/Homepage/Homepage"
import { Nav } from "components/Nav/Nav"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center">
      <Nav />
      <Homepage />
    </Box>


  </ChakraProvider>
)
