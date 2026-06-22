import { 
    Box, 
    Button, 
    Dialog, 
    Heading, 
    Portal, 
    Table, 
    Text,
    createListCollection 
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";

const Pengguna = () => {
    const navigate = useNavigate();
     
    const selectPengguna = async () => {
        const url = "http://localhost/api/penggunaread.php";
        try {
            const res = await axios.get(url);
            setUser(res.data["DATA"]);
        } catch (error) {
            TampilPesan("Info", "Terjadi kesalahan.");           
        }
    }
    
    const handleHapus = async (id) => {
        const url = "http://localhost/api/penggunadelete.php";
        const body = { id: id };
        
        try {
            const res = await axios.post(url, body);
            
            if(res.data.STATUS === "BERHASIL") {
                await selectPengguna();
                TampilPesan("Info", "Data berhasil dihapus!");
            } else {
                TampilPesan("Info", "Gagal menghapus data!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi kesalahan.");
        }
    }

    const [user, setUser] = useState([]);

    useEffect(() => {
        selectPengguna();
    }, []);

    return (
        <>
            <Toaster />
            <Heading size="xl" textAlign="center" padding="10px">
                Tabel Pengguna
            </Heading>
            <Box padding="10px">
                <Button as={Link} to="tambah" variant="solid" bgColor="teal">
                    Tambah Pengguna
                </Button>
            </Box>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>No</Table.ColumnHeader>
                        <Table.ColumnHeader>Nama</Table.ColumnHeader>
                        <Table.ColumnHeader>Username</Table.ColumnHeader>
                        <Table.ColumnHeader>Password</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {user.map((item, index) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{item.nama}</Table.Cell>
                            <Table.Cell>{item.username}</Table.Cell>
                            <Table.Cell>{item.password}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    as={Link}
                                    to={`update/${item.id}`}
                                    margin="2px"
                                    bgColor="blue.400"
                                >
                                    Ubah
                                </Button>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <Button
                                            margin="2px" bgColor="red.400">
                                            Hapus
                                        </Button>
                                    </Dialog.Trigger>
                                    <Portal>
                                        <Dialog.Backdrop>
                                            <Dialog.Positioner>
                                                <Dialog.Content>
                                                    <Dialog.Header>
                                                        <Dialog.Title>Konfirmasi Hapus</Dialog.Title>
                                                    </Dialog.Header>
                                                    <Dialog.Body>
                                                        <Text>
                                                            Apakah anda yakin hapus data {item.nama} ?
                                                        </Text>
                                                    </Dialog.Body>
                                                    <Dialog.Footer>
                                                        <Dialog.ActionTrigger asChild>
                                                            <Button variant="outline">Hapus</Button>
                                                        </Dialog.ActionTrigger>
                                                        <Button
                                                            bgColor="red.500"
                                                            onClick={() => {
                                                                handleHapus(item.id);
                                                            }}
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </Dialog.Footer>
                                                </Dialog.Content>
                                            </Dialog.Positioner>
                                        </Dialog.Backdrop>
                                    </Portal>
                                </Dialog.Root>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};

export default Pengguna;