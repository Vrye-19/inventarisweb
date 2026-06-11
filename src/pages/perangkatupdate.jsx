import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";

const PerangkatUpdate = () => {
    const [namaPerangkat, setNamaPerangkat] = useState("");
    const [jenisPerangkat, setJenisPerangkat] = useState("");
    const [posisi, setPosisi] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id)

    const selectSatuPerangkat = async () => {
        const url = `http://localhost/inventarisweb/satuperangkatread.php?id=${id}`;

        try {
            const res = await axios.get(url);
            setNamaPerangkat(res.data["DATA"][0]["nama_perangkat"]);
            setJenisPerangkat(res.data["DATA"][0]["jenis_perangkat"]);
            setPosisi(res.data["DATA"][0]["posisi"]);
        } catch (error) {
            print(error);
        }
    }

    const handleUpdate = async () => {
        const url = "http://localhost/inventarisweb/perangkatupdate.php";
        const body = { nama_perangkat: namaPerangkat, jenis_perangkat: jenisPerangkat, posisi: posisi, id: id };

        try {
            const res = await axios.post(url, body);
            // console.log(res);

            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/perangkat");
                TampilPesan("Info", "Perangkat berhasil diupdate!");
            } else {
                navigate("/dashboard/perangkat/update");
                TampilPesan("Info", "Gagal mengupdate Perangkat!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi kesalahan.");
        }
    }

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
                            <Text>Form Tambah Perangkat</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input onChange={(e) => {
                            setNamaPerangkat(e.target.value);
                        }} 
                        placeholder="Nama Perangkat" 
                        type="text" 
                        value={namaPerangkat} 
                        />
                        <Input onChange={(e) => {
                            setJenisPerangkat(e.target.value);
                        }}
                        placeholder="Jenis Perangkat" 
                        type="text" 
                        value={jenisPerangkat}  
                        />
                        <Input onChange={(e) => {
                            setPosisi(e.target.value);
                        }}
                        placeholder="Posisi" 
                        type="text" 
                        value={posisi}  
                        />
                        <Button
                            onClick={() => {
                                handleUpdate();
                            }}
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"                         
                        >
                            <Text>Update Perangkat</Text>
                        </Button>
                        <Button
                            as={Link}
                            to="/dashboard/Perangkat"
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