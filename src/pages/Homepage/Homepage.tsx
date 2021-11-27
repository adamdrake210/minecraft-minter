import React, { useEffect, useState } from "react";
import { Grid, Text, Flex } from "@chakra-ui/react";
import { useMatch, Link } from "react-location";
import Web3 from "web3";

type WalletInfo = {
  address: string;
  balance?: string;
  chainId: number;
  status: boolean;
};

declare let window: any;

export const Homepage = () => {
  const {
    data: { nfts },
  } = useMatch<any>();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    async function getWalletInfo() {
      const chainId = await web3.eth.getChainId();
      const addressArray = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(addressArray[0]);

      setWalletInfo({
        address: addressArray[0],
        balance: web3.utils.fromWei(balance),
        chainId,
        status: true,
      });
    }
    getWalletInfo();
    // eslint-disable-next-line
  }, []);

  console.log("walletInfo: ", walletInfo);

  return (
    <Grid p={3}>
      {walletInfo?.chainId !== 3 ? (
        <Text>
          You must be connected to the Ropsten Network to see this content.
        </Text>
      ) : (
        <>
          <Text mb={4}>Your Ether Balance: {walletInfo.balance}</Text>
          <Grid templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]} gap={6}>
            {nfts?.data?.map((nft: any) => {
              console.log("nft: ", nft);
              return (
                <Link
                  key={nft.metadata.name}
                  to={`/nftdetails/${nft.ipfs_pin_hash}`}
                  activeOptions={{ exact: true }}
                >
                  <Flex
                    w="100%"
                    bg="blue.500"
                    p={3}
                    justifyContent="center"
                    direction="column"
                  >
                    <Text>{nft.metadata.name}</Text>
                  </Flex>
                </Link>
              );
            })}
          </Grid>
        </>
      )}
    </Grid>
  );
};
