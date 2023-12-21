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
} from "@chakra-ui/react";
import React from "react";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const ModalEdit = (props) => {
  const [selectKategori, setInSelectKategori] = React.useState(false);
  const [selectStatus, setInSelectStatus] = React.useState(false);
  const dataProduk = useSelector((state) => {
    return state.produkSlice;
  });

  return (
    <Modal isOpen={props.isOpen} size={"xl"} onClose={props.onClose}>
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
            // backgroundColor={"red"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"auto"}
            height={"490px"}
            gap={"20px"}
          >
            <Text fontSize={"30px"} fontWeight={"600"}>
              Edit Product
            </Text>
            <Box>
              <Input
                height={"50px"}
                onChange={props.onNamaproduk}
                type="text"
                style={{ width: "400px" }}
                value={props.valNamaProduk}
              ></Input>
            </Box>
            <Box>
              <Input
                height={"50px"}
                onChange={props.onHarga}
                type="number"
                style={{ width: "400px" }}
                value={props.valHarga}
              ></Input>
            </Box>
            <Box display={"flex"} width={"400px"}>
              {selectKategori === true ? (
                <>
                  <Input
                    height={"50px"}
                    onChange={props.onKategori}
                    type="text"
                    value={props.valKategori}
                  ></Input>
                  <Button
                    height={"50px"}
                    onClick={() => setInSelectKategori(!selectKategori)}
                  >
                    <FaArrowLeft />
                  </Button>
                </>
              ) : (
                <>
                  <Select
                    height={"50px"}
                    placeholder={props.valKategori}
                    onChange={props.onSelectKategori}
                  >
                    {props.mapKategori.map((dataKategori) => {
                      console.log(dataKategori);
                      return (
                        <option key={dataKategori.id} value={dataKategori.id}>
                          {dataKategori.nama_kategori}
                        </option>
                      );
                    })}
                  </Select>
                  <Button
                    height={"50px"}
                    onClick={() => setInSelectKategori(!selectKategori)}
                  >
                    <FaPlus />
                  </Button>
                </>
              )}
            </Box>
            <Box display={"flex"} width={"400px"}>
              {selectStatus === true ? (
                <>
                  <Input
                    height={"50px"}
                    onChange={props.onStatus}
                    type="text"
                    value={props.valStatus}
                  ></Input>
                  <Button
                    height={"50px"}
                    onClick={() => setInSelectStatus(!selectStatus)}
                  >
                    <FaArrowLeft />
                  </Button>
                </>
              ) : (
                <>
                  <Select
                    height={"50px"}
                    placeholder={props.valStatus}
                    onChange={props.onSelectStatus}
                  >
                    {props.mapStatus.map((dataStatus) => {
                      return (
                        <option key={dataStatus.id} value={dataStatus.id}>
                          {dataStatus.nama_status}
                        </option>
                      );
                    })}
                  </Select>
                  <Button
                    height={"50px"}
                    onClick={() => setInSelectStatus(!selectStatus)}
                  >
                    <FaPlus />
                  </Button>
                </>
              )}
            </Box>
            <Flex gap={"20px"}>
              <Button onClick={props.onClose} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={props.onClick} colorScheme="green">
                Save
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEdit;
