import { Box, Button, Dialog, Heading, Portal, Table, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";

const Perangkat = () => {
    const [perangkat, setPerangkat] = useState([]);

    const selectPerangkat = async () => {
        const url = "http://localhost/api/perangkatread.php";

        try {
            const res = await axios.get(url);
            setPerangkat(res.data['DATA'])
        } catch (error) {
            TampilPesan("Info", "Terjadi Kesalahan");
        }
    }

    const handleHapus = async (id) => {
        const url = "http://localhost/api/perangkatdelete.php";
        const body = { id: id};

        try {
            const res = await axios.post(url, body);

            if(res.data.STATUS === "BERHASIL") {
                await selectPerangkat();
                TampilPesan("Info", "Perangkat berhasil dihapus!");
            } else {
                TampilPesan("Info", "Gagal menghapus perangkat!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi Kesalahan");
        }
    }

    useEffect(() => {
        selectPerangkat();
    }, []);

    return (
        <>
            <Toaster />
            <Heading size="xl" textAlign="center" padding="10px">
                Tabel Perangkat
            </Heading>
            <Box padding="10px">
                <Button as={Link} to="tambah" variant="solid" bgColor="teal">
                    Tambah Perangkat
                </Button>
            </Box>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>No</Table.ColumnHeader>
                        <Table.ColumnHeader>Nama</Table.ColumnHeader>
                        <Table.ColumnHeader>Jenis</Table.ColumnHeader>
                        <Table.ColumnHeader>Posisi</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {perangkat.map((item, index) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{item.nama_perangkat}</Table.Cell>
                            <Table.Cell>{item.jenis_perangkat}</Table.Cell>
                            <Table.Cell>{item.posisi}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    as={Link}
                                    to={`update/${item.id}`}
                                    margin="2px"
                                    bgColor="blue.400"
                                >
                                    <Text>Ubah</Text>
                                </Button>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <Button
                                            margin="2px"
                                            bgColor="red.400"
                                        >
                                            <Text>Hapus</Text>
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
                                                            Apakah anda yakin hapus data {item.nama_perangkat} ?
                                                        </Text>
                                                    </Dialog.Body>
                                                    <Dialog.Footer>
                                                        <Dialog.ActionTrigger asChild>
                                                            <Button variant="outline">Batal</Button>
                                                        </Dialog.ActionTrigger>
                                                        <Button
                                                            bgColor="red.500"
                                                            onClick={() => handleHapus(item.id)}
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
}

export default Perangkat;