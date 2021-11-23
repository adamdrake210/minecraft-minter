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
} from "@chakra-ui/react";

type MintingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mintingStatus: string;
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
          <Text>{mintingStatus}</Text>
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
