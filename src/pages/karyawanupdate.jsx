import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, NativeSelect, Text } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TampilPesan } from "../components/ui/services";
import { useEffect, useState } from "react";
import axios from "axios";

const KaryawanUpdate = () => {
    const navigate = useNavigate();

    const [namaKaryawan, setNamaKaryawan] = useState("");
    const [jabatanKaryawan, setJabatanKaryawan] = useState("");
    const [posisiKaryawan, setPosisiKaryawan] = useState("");

    const { idKaryawan } = useParams();
    const selectSatuKaryawan = async () => {
        const url = `http://localhost/api/satukaryawanread.php?idKaryawan=${idKaryawan}`;

        try {
            const res = await axios.get(url);
            const data = res.data["DATA"][0];
            setNamaKaryawan(data["namaKaryawan"]);
            setJabatanKaryawan(data["jabatanKaryawan"]);
            setPosisiKaryawan(data["posisiKaryawan"]);
        } catch (error) {
            console.log(error);
            TampilPesan("Info", "Gagal mengambil data!");
        }
    }

    const handleUpdate = async () => {
        const url = "http://localhost/api/updatekaryawan.php";
        const body = { namaKaryawan: namaKaryawan, jabatqanKaryawan: jabatanKaryawan, posisiKaryawan: posisiKaryawan, idKaryawan: idKaryawan };

        try {
            const res = await axios.post(url, body);

            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/karyawan");
                TampilPesan("Info", "Karyawan berhasil diupdate!");
            } else {
                navigate("/dashboard/karyawan/update");
                TampilPesan("Info", "Gagal mengupdate karyawan!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi Kesalahan.");
        }
    }

    const jabatanOptions = [
        {label: "CEO", value: "CEO"},
        {label: "DIREKTUR", value: "DIREKTUR"}
    ];

    const posisiOptions = [
        {label: "GEMINI", value: "GEMINI"},
        {label: "SCORPIO", value: "SCORPIO"},
        {label: "TAURUS", value: "TAURUS"}
    ];

    useEffect(() => {
        selectSatuKaryawan();
    }, []);

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
                            <Text>Form Ubah Karyawan</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input placeholder="Nama Karyawan" type="text" value={namaKaryawan} onChange={(e) => setNamaKaryawan(e.target.value)}></Input>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Jabatan" value={jabatanKaryawan} onChange={(e) => setJabatanKaryawan(e.target.value)}>
                                {jabatanOptions.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Posisi" value={posisiKaryawan} onChange={(e) => setPosisiKaryawan(e.target.value)}>
                                {posisiOptions.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>

                        <Button
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"
                            onClick={() => handleUpdate()}
                        >
                            <Text>Update Karyawan</Text>
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

export default KaryawanUpdate;