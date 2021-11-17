import React from 'react'
import {
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from "@chakra-ui/react"

export const Homepage = () => {
  return (
    <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
  )
}
