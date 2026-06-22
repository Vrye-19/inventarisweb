import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, NativeSelect, Text } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TampilPesan } from "../components/ui/services";
import axios from "axios";

const PerangkatCreate = () => {
    const navigate = useNavigate();

    const [namaPerangkat, setNamaPerangkat] = useState("");
    const [jenisPerangkat, setJenisPerangkat] = useState("");
    const [posisi, setPosisi] = useState("");

    const jenisOptions = [
        {label: "MOUSE", value: "MOUSE"},
        {label: "KEYBOARD", value: "KEYBOARD"},
        {label: "CPU", value: "CPU"},
        {label: "MONITOR", value: "MONITOR"}
    ];

    const posisiOptions = [
        {label: "LAB A", value: "LAB A"},
        {label: "LAB B", value: "LAB B"},
        {label: "LAB C", value: "LAB C"},
        {label: "LAB D", value: "LAB D"}
    ];

    const tambahPerangkat = async () => {
        const url = "http://localhost/api/perangkatinsert.php";
        const body = {nama_perangkat: namaPerangkat, jenis_perangkat: jenisPerangkat, posisi: posisi};

        if(namaPerangkat === "") {
            TampilPesan("Info", "Nama perangkat tidak boleh kosong.");
            return;
        }

        if(jenisPerangkat <= 0) {
            TampilPesan("Info", "Jenis perangkat tidak boleh kosong.");
            return;
        }

        if(posisi <= 0) {
            TampilPesan("Info", "Posisi tidak boleh kosong.");
            return;
        }
 
        try {
            const res = await axios.post(url, body);

            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/perangkat");
                TampilPesan("Info", "Perangkat berhasil ditambahkan!");
            } else {
                navigate("/dashboard/perangkat/tambah");
                TampilPesan("Info", "Gagal menambahkan perangkat!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi Kesalahan");
        }
    }

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                width="100dvw"
                height="100dvh"
                justifyContent="center"
                alignItems="center"
            >
                <Toaster />
                <Card.Root
                    width="50dvw"
                    shadowColor="bg.emphasized"
                    shadow="lg"
                >
                    <CardHeader>
                        <CardTitle>
                            <Text>Form Tambah Perangkat</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input placeholder="Nama Perangkat" type="text" onChange={(e) => setNamaPerangkat(e.target.value)}></Input>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Jenis Perangkat" onChange={(e) => setJenisPerangkat(e.target.value)}>
                                {jenisOptions.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Posisi" onChange={(e) => setPosisi(e.target.value)}>
                                {posisiOptions.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>

                        <Button
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"
                            onClick={() => tambahPerangkat()}
                        >
                            <Text>Tambah Perangkat</Text>
                        </Button>
                        <Button
                            as={Link}
                            to="/dashboard/perangkat"
                            borderRadius="10px"
                            variant="outline"
                        >
                            <Text>Kembali</Text>
                        </Button>
                    </CardBody>
                </Card.Root>
            </Box>
        </>
    );
}

export default PerangkatCreate;