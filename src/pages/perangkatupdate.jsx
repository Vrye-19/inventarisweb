import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, NativeSelect, Text } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TampilPesan } from "../components/ui/services";
import { useEffect, useState } from "react";
import axios from "axios";

const PerangkatUpdate = () => {
    const navigate = useNavigate();

    const [namaPerangkat, setNamaPerangkat] = useState("");
    const [jenisPerangkat, setJenisPerangkat] = useState("");
    const [posisi, setPosisi] = useState("");

    const { id } = useParams();
    const selectSatuPerangkat = async () => {
        const url = `http://localhost/api/satuperangkatread.php?id=${id}`;

        try {
            const res = await axios.get(url);
            const data = res.data["DATA"][0];
            setNamaPerangkat(data["nama_perangkat"]);
            setJenisPerangkat(data["jenis_perangkat"]);
            setPosisi(data["posisi"]);
        } catch (error) {
            console.log(error);
            TampilPesan("Info", "Gagal mengambil data!");
        }
    }

    const handleUpdate = async () => {
        const url = "http://localhost/api/perangkatupdate.php";
        const body = { nama_perangkat: namaPerangkat, jenis_perangkat: jenisPerangkat, posisi: posisi, id: id };

        try {
            const res = await axios.post(url, body);

            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/perangkat");
                TampilPesan("Info", "Perangkat berhasil diupdate!");
            } else {
                navigate("/dashboard/perangkat/update");
                TampilPesan("Info", "Gagal mengupdate perangkat!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi Kesalahan.");
        }
    }

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

    useEffect(() => {
        selectSatuPerangkat();
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
                            <Text>Form Ubah Perangkat</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input placeholder="Nama Perangkat" type="text" value={namaPerangkat} onChange={(e) => setNamaPerangkat(e.target.value)}></Input>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Jenis Perangkat" value={jenisPerangkat} onChange={(e) => setJenisPerangkat(e.target.value)}>
                                {jenisOptions.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                        <NativeSelect.Root>
                            <NativeSelect.Field placeholder="Pilih Posisi" value={posisi} onChange={(e) => setPosisi(e.target.value)}>
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
                            <Text>Update Perangkat</Text>
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

export default PerangkatUpdate;