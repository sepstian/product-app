import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useState } from 'react';

const ModalDelete = (props) => {

  return (
    <>
      <Modal isOpen={props.isOpen} size={"xl"} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"24px"}>Verifikasi Delete</ModalHeader>
          <ModalCloseButton height={"40px"} width={"40px"} borderRadius={"100px"}/>
          <ModalBody>
            <p style={{fontSize:"18px"}}>Anda yakin ingin menghapus produk <span style={{fontWeight:"bold"}}>{props.namaProduk}</span>?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={props.onClick}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDelete;
