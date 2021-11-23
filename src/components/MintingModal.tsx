import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { MintingStatusType } from "pages/Minting/Mintingpage";

type MintingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mintingStatus: MintingStatusType | null;
};

export const MintingModal = ({
  isOpen,
  onClose,
  mintingStatus,
}: MintingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Minting Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {mintingStatus?.success ? (
            <Text>
              Success! Check out your transaction on{" "}
              <Link
                isExternal
                textDecoration="underline"
                fontWeight={700}
                target="_blank"
                rel="noreferrer"
                href={`https://ropsten.etherscan.io/tx/${mintingStatus.status}`}
              >
                Etherscan
              </Link>
            </Text>
          ) : (
            <Text color="tomato">{mintingStatus?.status}</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
