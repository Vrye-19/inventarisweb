import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";


const PerangkatCreate = () => {
    const navigate = useNavigate();

    const [namaPerangkat, setNamaPerangkat] = useState("");
    const [jenisPerangkat, setJenisPerangkat] = useState("");
    const [posisi, setPosisi] = useState("");
    

    const handleTambah = async () => {
        const url = "http://localhost/inventarisweb/perangkatinsert.php"
        const body = { namaPerangkat: namaPerangkat, jenisPerangkat: jenisPerangkat, posisi: posisi };

        try {
            const res = await axios.post(url, body);
            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/perangkat");
                TampilPesan("Info", "Perangkat berhasil ditambahkan!");
            } else {
                navigate("/dashboard/perangkat/tambah");
                TampilPesan("Info", "Gagal menambahkan Perangkat!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi kesalahan.");
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
                        <Input onChange={(e) => {
                            setNamaPerangkat(e.target.value);
                        }}  
                        placeholder="Nama Perangkat" 
                        type="text" 
                        />
                        <Input 
                    
                        onChange={(e) => {
                            setJenisPerangkat(e.target.value);
                        }}  
                        placeholder="Jenis Perangkat" 
                        type="select"
                        />        
                        <Input onChange={(e) => {
                            setPosisi(e.target.value);
                        }}  
                        placeholder="Posisi" 
                        type="text" 
                        />
                        <Button
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"
                            onClick={() => handleTambah()}
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