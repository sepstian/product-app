import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { API_CALL } from "../../helper";
import ModalAdd from "../Modal/ModalAdd";
import { useDispatch, useSelector } from "react-redux";
import { setProduk } from "../../redux/slice/produkSlice";
import useToggleEdit from "../hooks/hooksEdit";
import ModalEdit from "../Modal/ModalEdit";
import useToggleDelete from "../hooks/hooksDelete";
import ModalDelete from "../Modal/ModalDelete";
import useToggleSort from "../hooks/hooksSort";
import ModalSort from "../Modal/ModalSort";
import useToggleReset from "../hooks/hooksReset";
import ModalReset from "../Modal/ModalReset";

const ManageProduk = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpenModalEdit, onToggleOpenEdit, onToggleCloseEdit } =
    useToggleEdit();
  const { isOpenModalDelete, onToggleOpenDelete, onToggleCloseDelete } =
    useToggleDelete();
  const { isOpenModalSort, onToggleOpenSort, onToggleCloseSort } =
    useToggleSort();
  const { isOpenModalReset, onToggleOpenReset, onToggleCloseReset } =
    useToggleReset();
  const dataProduk = useSelector((state) => {
    return state.produkSlice;
  });
  const [resetSort, setResetSort] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);
  const [deleteNamaProduk, setDeleteNamaProduk] = useState("");
  const [produks, setInProduks] = useState([]);
  const [editProduk, setEditProduk] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);
  const [namaProduk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState(0);
  const [kategori, setKategori] = useState("");
  const [selectKategori, setSelectKategori] = useState(0);
  const [status, setStatus] = useState("");
  const [selectStatus, setSelectStatus] = useState(0);
  const [selectStatusSort, setSelectStatusSort] = useState(0);

  console.log("INI SELECTED STATUS HARUS ANGKA", selectStatus);
  // console.log("INI HASIL DATA KATEGORI", dataKategori);
  // console.log("INI HASIL DATA STATUS", dataStatus.length);

  const getKategori = async () => {
    try {
      const getKategori = await API_CALL.get("/kategori");
      // console.log("INI GET KATEGORI", getKategori.data.length);
      setDataKategori(getKategori.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = async () => {
    try {
      const getStatus = await API_CALL.get("/status");
      // console.log("INI GET STATUS", getStatus.data);
      setDataStatus(getStatus.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataProduk = async () => {
    try {
      const dataproduk = await API_CALL.get("/api/produk");
      // console.log(dataproduk.data);
      setInProduks(dataproduk.data.message.result);
      dispatch(setProduk(dataproduk.data.message.result));
    } catch (error) {
      console.log(error);
    }
  };

  const addProduk = async () => {
    // const indexKategori = dataKategori.length - 1;
    // const indexStatus = dataStatus.length - 1;
    try {
      if (namaProduk === "" && harga == 0) {
        alert("Tabel Mohon di isi");
      } else if (namaProduk === "" && harga !== 0) {
        alert("Tabel Nama Produk Mohon di isi");
      } else if (harga == 0 && namaProduk !== "") {
        alert("Tabel Harga Mohon di isi");
      } else if (
        kategori !== "" &&
        status !== "" &&
        selectKategori == 0 &&
        selectStatus == 0
      ) {
        const addKategori = await API_CALL.post("/kategori/create", {
          nama_kategori: kategori,
        });
        const addStatus = await API_CALL.post("/status/create", {
          nama_status: status,
        });
        // console.log("COBA TES ADD KATEGORI", addKategori.data.result.id);
        // console.log("COBA TES ADD STATUS", addStatus.data.result.id);
        const addProduk = await API_CALL.post("/api/produk/create", {
          nama_produk: namaProduk,
          harga: harga,
          kategori_id: addKategori.data.result.id,
          status_id: addStatus.data.result.id,
        });
        alert("Add Produk Berhasil");
        onClose();
      } else if (
        kategori !== "" &&
        status === "" &&
        selectKategori == 0 &&
        selectStatus !== 0
      ) {
        const addKategori = await API_CALL.post("/kategori/create", {
          nama_kategori: kategori,
        });
        const addProduk = await API_CALL.post("/api/produk/create", {
          nama_produk: namaProduk,
          harga: harga,
          kategori_id: addKategori.data.result.id,
          status_id: selectStatus,
        });
        alert("Add Produk Berhasil");
        onClose();
      } else if (
        kategori === "" &&
        status !== "" &&
        selectKategori !== 0 &&
        selectStatus == 0
      ) {
        const addStatus = await API_CALL.post("/status/create", {
          nama_status: status,
        });
        // console.log("INI ADD STATUS", addStatus.data.result.id);
        const addProduk = await API_CALL.post("/api/produk/create", {
          nama_produk: namaProduk,
          harga: harga,
          kategori_id: selectKategori,
          status_id: addStatus.data.result.id,
        });
        alert("Add Produk Berhasil");
        onClose();
      } else if (
        kategori !== "" ||
        status !== "" &&
        selectKategori !== 0 ||
        selectStatus !== 0
      ) {
        const addKategori = await API_CALL.post("/kategori/create", {
          nama_kategori: kategori,
        });
        const addStatus = await API_CALL.post("/status/create", {
          nama_status: status,
        });
        const addProduk = await API_CALL.post("/api/produk/create", {
          nama_produk: namaProduk,
          harga: harga,
          kategori_id: addKategori ? addKategori.data.result.id : selectKategori,
          status_id: addStatus ? addStatus.data.result.id : selectStatus,
        });
        alert("Add Produk Berhasil");
        onClose();
      }
      await onSort()
    } catch (error) {
      console.log(error);
    }
  };

  const editSetProduk = (idProduk) => {
    onToggleOpenEdit();
    const produkToEdit = produks.findIndex((val) => val.id === idProduk);
    // console.log("INI PRODUK TO EDIT", produkToEdit);
    setEditProduk(produks[produkToEdit]);
    setNamaProduk(produks[produkToEdit].nama_produk);
    setHarga(produks[produkToEdit].harga);
    setKategori(produks[produkToEdit].Kategori.nama_kategori);
    setSelectKategori(produks[produkToEdit].kategori_id);
    setStatus(produks[produkToEdit].Status.nama_status);
    setSelectStatus(produks[produkToEdit].status_id);
    // console.log("INI PRODUK TO EDIT", produks[produkToEdit]);
  };
  // console.log("INI HASIL FIND PRODUK BREE", editProduk);

  const saveProduk = async () => {
    try {
      if (
        namaProduk === editProduk.nama_produk &&
        harga == editProduk.harga &&
        kategori === editProduk.Kategori.nama_kategori &&
        status === editProduk.Status.nama_status &&
        selectKategori == editProduk.kategori_id &&
        selectStatus == editProduk.status_id
      ) {
        alert("Tidak ada perubahan, Mohon ubah terlebih dahulu!");
      } else if (
        namaProduk === editProduk.nama_produk ||
        (harga === editProduk.harga && namaProduk !== editProduk.namaProduk) ||
        harga !== editProduk.harga
      ) {
        const addKategori = await API_CALL.post("/kategori/create", {
          nama_kategori: kategori,
        });
        const addStatus = await API_CALL.post("/status/create", {
          nama_status: status,
        });
        const dataUpdate = {
          nama_produk: namaProduk,
          harga: harga,
          kategori_id:
            kategori !== editProduk.Kategori.nama_kategori
              ? addKategori.data.result.id
              : selectKategori,
          status_id:
            status !== editProduk.Status.nama_status
              ? addStatus.data.result.id
              : selectStatus,
        };
        const result = await API_CALL.patch(
          `/api/produk/edit/${editProduk.id}`,
          { ...dataUpdate }
        );
        alert("Edit produk Berhasil");
        onToggleCloseEdit();
        await onSort()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSetProduk = (idProduk) => {
    onToggleOpenDelete();
    const produkToDelete = produks.findIndex((val) => val.id === idProduk);
    setDeleteIdx(produks[produkToDelete].id);
    setDeleteNamaProduk(produks[produkToDelete].nama_produk);
  };

  const deleteProduk = async () => {
    try {
      const resDelete = await API_CALL.delete(
        `/api/produk/delete/${parseInt(deleteIdx)}`
        );
        alert("Delete produk Berhasil");
        // window.location.reload();
        onToggleCloseDelete();
        await onSort()
    } catch (error) {
      console.log(error);
    }
  };

  const onSort = async () => {
    try {
      const sortProduk = await API_CALL.get(
        `/api/produk/sort-status/${selectStatusSort}`
      );
      console.log("INI SORT PRODUK", sortProduk.data.message.result);
      setInProduks(sortProduk.data.message.result);
      dispatch(setProduk(sortProduk.data.message.result));
      // alert("Sorting Status produk Berhasil");
      onToggleCloseSort();
    } catch (error) {
      console.log(error);
    }
  };
  
  const onReset = async () => {
    alert("Reset data produk Berhasil");
    window.location.reload();
    onToggleCloseReset()
  }

  console.log(namaProduk);
  console.log(harga);
  console.log(selectKategori);
  console.log(produks);

  if (!resetSort) {
    useEffect(() => {
      getDataProduk();
      getKategori();
      getStatus();
    }, [resetSort]);
  } else if (resetSort) {
    useEffect(() => {
      onSort();
      getKategori();
      getStatus();
    }, [resetSort]);
  }

  return (
    <>
      <Flex h={"83px"} justifyContent={"center"} bg={"#F2F2F2"} mb={"16"}>
        <Text
          display={"flex"}
          height={"80px"}
          width={"50%"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"20px"}
          boxShadow={
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
          }
          fontWeight={"bold"}
          bg={"rgb(247, 247, 247)"}
          fontSize={"24px"}
        >
          Manage Produk
        </Text>
      </Flex>

      <Button
        mb={"4"}
        justifyItems={"flex-end"}
        colorScheme="green"
        textColor={"white"}
        ml={"2"}
        onClick={onOpen}
      >
        Add +
      </Button>
      <Button
        mb={"4"}
        justifyItems={"flex-end"}
        colorScheme="green"
        textColor={"white"}
        ml={"2"}
        onClick={onToggleOpenSort}
      >
        Sort By
      </Button>
      <Button
        mb={"4"}
        justifyItems={"flex-end"}
        colorScheme="red"
        textColor={"white"}
        ml={"2"}
        onClick={onToggleOpenReset}
      >
        Reset Sort
      </Button>

      <Table borderWidth="1px" borderColor="gray.200">
        <Thead>
          <Tr>
            <Th
              textAlign={"center"}
              w={"5%"}
              borderWidth="1px"
              borderColor="gray.200"
            >
              NO
            </Th>
            <Th
              textAlign={"center"}
              w={"30%"}
              borderWidth="1px"
              borderColor="gray.200"
            >
              NAMA PRODUK
            </Th>
            <Th
              textAlign={"center"}
              w={"15%"}
              borderWidth="1px"
              borderColor="gray.200"
            >
              HARGA
            </Th>
            <Th
              textAlign={"center"}
              w={"15%"}
              borderWidth="1px"
              borderColor="gray.200"
            >
              KATEGORI
            </Th>
            <Th
              textAlign={"center"}
              w={"15%"}
              borderWidth="1px"
              borderColor="gray.200"
            >
              STATUS
            </Th>
            <Th
              textAlign={"center"}
              w={"20%"}
              borderWidth="1px"
              borderColor="gray.200"
            >
              ACTION
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {produks.map((produk, index) => (
            // console.log(produks)
            <Tr
              key={produk.id}
              height={"auto"}
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Td textAlign={"center"} borderWidth="1px" borderColor="gray.200">
                {index + 1}
              </Td>
              <Td
                textAlign={"center"}
                align="center"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Flex align="center" justify="center" flexDirection="column">
                  <Text
                    maxW="200px"
                    // overflow="hidden"
                    // textOverflow="ellipsis"
                    // whiteSpace="nowrap"
                  >
                    {produk.nama_produk}
                  </Text>
                </Flex>
              </Td>
              <Td textAlign={"center"} borderWidth="1px" borderColor="gray.200">
                <Text>Rp. {produk.harga.toLocaleString("id")}</Text>
              </Td>
              <Td textAlign={"center"} borderWidth="1px" borderColor="gray.200">
                <Text>{produk.Kategori.nama_kategori}</Text>
              </Td>
              <Td textAlign={"center"} borderWidth="1px" borderColor="gray.200">
                <Text>{produk.Status.nama_status}</Text>
              </Td>
              <Td textAlign={"center"} borderWidth="1px" borderColor="gray.200">
                <Button
                  onClick={() => deleteSetProduk(produk.id)}
                  marginRight={"5px"}
                  colorScheme="red"
                  textColor={"white"}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => editSetProduk(produk.id)}
                  marginLeft={"5px"}
                  colorScheme="green"
                  textColor={"white"}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <br />
      <br />
      {onOpen ? (
        <ModalAdd
          isOpen={isOpen}
          onClose={onClose}
          onClick={addProduk}
          mapKategori={dataKategori}
          mapStatus={dataStatus}
          onNamaproduk={(e) => setNamaProduk(e.target.value)}
          onHarga={(e) => setHarga(e.target.value)}
          onKategori={(e) => setKategori(e.target.value)}
          onSelectKategori={(e) => setSelectKategori(e.target.value)}
          onStatus={(e) => setStatus(e.target.value)}
          onSelectStatus={(e) => setSelectStatus(e.target.value)}
        />
      ) : (
        ""
      )}
      {onToggleOpenEdit ? (
        <ModalEdit
          isOpen={isOpenModalEdit}
          onClose={onToggleCloseEdit}
          onClick={saveProduk}
          valNamaProduk={namaProduk}
          valHarga={harga}
          valKategori={kategori}
          valStatus={status}
          mapKategori={dataKategori}
          mapStatus={dataStatus}
          onNamaproduk={(e) => setNamaProduk(e.target.value)}
          onHarga={(e) => setHarga(e.target.value)}
          onKategori={(e) => setKategori(e.target.value)}
          onSelectKategori={(e) => setSelectKategori(e.target.value)}
          onStatus={(e) => setStatus(e.target.value)}
          onSelectStatus={(e) => setSelectStatus(e.target.value)}
        />
      ) : (
        ""
      )}
      {onToggleOpenDelete ? (
        <ModalDelete
          isOpen={isOpenModalDelete}
          onClose={onToggleCloseDelete}
          onClick={deleteProduk}
          namaProduk={deleteNamaProduk}
        />
      ) : (
        ""
      )}
      {onToggleOpenSort ? (
        <ModalSort
          isOpen={isOpenModalSort}
          onClose={onToggleCloseSort}
          onClick={onSort}
          mapStatus={dataStatus}
          onSelectStatus={(e) => setSelectStatusSort(e.target.value)}
        />
      ) : (
        ""
      )}
      {onToggleOpenReset ? (
        <ModalReset
          isOpen={isOpenModalReset}
          onClose={onToggleCloseReset}
          onClick={onReset}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ManageProduk;
