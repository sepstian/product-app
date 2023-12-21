import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useState } from 'react';

const ModalReset = (props) => {

  return (
    <>
      <Modal isOpen={props.isOpen} size={"xl"} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"24px"}>Reset Data Produk</ModalHeader>
          <ModalCloseButton height={"40px"} width={"40px"} borderRadius={"100px"}/>
          <ModalBody>
            <p style={{fontSize:"18px"}}>Anda yakin ingin mereset data produk ?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={props.onClick}>
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalReset;
