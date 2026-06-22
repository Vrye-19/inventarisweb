import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, NativeSelect, Text } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TampilPesan } from "../components/ui/services";
import axios from "axios";

const KaryawanCreate = () => {
    const navigate = useNavigate();

    const [namaKaryawan, setNamaKaryawan] = useState("");
    const [jabatanKaryawan, setJabatanKaryawan] = useState("");
    const [posisiKaryawan, setPosisiKaryawan] = useState("");

    const jabatanOptions = [
        {label: "CEO", value: "CEO"},
        {label: "DIREKTUR", value: "DIREKTUR"}
    ];

    const posisiOptions = [
        {label: "GEMINI", value: "GEMINI"},
        {label: "SCORPIO", value: "SCORPIO"},
        {label: "TAURUS", value: "TAURUS"}
    ];

    const tambahKaryawan = async () => {
        const url = "http://localhost/api/insertkaryawan.php";
        const body = { namakaryawan: namaKaryawan, jabatan: jabatanKaryawan, posisiKaryawan: posisiKaryawan};

        if(namaKaryawan === "") {
            TampilPesan("Info", "Nama karyawan tidak boleh kosong.");
            return;
        }

        if(jabatanKaryawan <= 0) {
            TampilPesan("Info", "Jabatan karyawan tidak boleh kosong.");
            return;
        }

        if(posisiKaryawan <= 0) {
            TampilPesan("Info", "Posisi karyawan tidak boleh kosong.");
            return;
        }
 
        try {
            const res = await axios.post(url, body);

            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/karyawan");
                TampilPesan("Info", "Karyawan berhasil ditambahkan!");
            } else {
                navigate("/dashboard/karyawan/tambah");
                TampilPesan("Info", "Gagal menambahkan karyawan!");
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
                            <Text>Form Tambah Karyawan</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input placeholder="Nama Karyawan" type="text" onChange={(e) => setNamaKaryawan(e.target.value)}></Input>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Jabatan" onChange={(e) => setJabatanKaryawan(e.target.value)}>
                                {jabatanOptions.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Posisi" onChange={(e) => setPosisiKaryawan(e.target.value)}>
                                {posisiOptions.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>

                        <Button
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"
                            onClick={() => tambahKaryawan()}
                        >
                            <Text>Tambah Karyawan</Text>
                        </Button>
                        <Button
                            as={Link}
                            to="/dashboard/karyawan"
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

export default KaryawanCreate;