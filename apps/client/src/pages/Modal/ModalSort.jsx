import {
  Box,
  Text,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Select,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const ModalSort = (props) => {
  return (
    <Modal isOpen={props.isOpen} size={"lg"} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent height={"500px"}>
        <ModalBody>
          <Box
            display={"flex"}
            left={"2"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"absolute"}
            height={"50px"}
            width={"50px"}
            borderRadius={"100px"}
            fontSize={"20px"}
            _hover={{ bg: "rgb(240, 240, 240)", cursor: "pointer" }}
            onClick={props.onClose}
          >
            <IoMdClose />
          </Box>
          <Box
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"auto"}
            height={"490px"}
            gap={"20px"}
          >
            <Text fontSize={"30px"} fontWeight={"600"}>
              Sort Product
            </Text>
            <FormControl width={"400px"}>
              <FormLabel>Status Sort By:</FormLabel>
              <Select
                height={"50px"}
                placeholder={"Select Status"}
                onChange={props.onSelectStatus}
              >
                {props.mapStatus.map((dataStatus) => (
                  <option key={dataStatus.id} value={dataStatus.id}>
                    {dataStatus.nama_status}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Flex gap={"20px"}>
              <Button onClick={props.onClose} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={props.onClick} colorScheme="green">
                Sort
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalSort;
