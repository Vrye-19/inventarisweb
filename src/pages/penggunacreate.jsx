import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";

const PenggunaCreate = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");

    const handleTambah = async () => {
        const url = "http://localhost/inventarisweb/penggunainsert.php"
        const body = { username: username, password: password, nama: nama };

        try {
            const res = await axios.post(url, body);
            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/pengguna");
                TampilPesan("Info", "Pengguna berhasil ditambahkan!");
            } else {
                navigate("/dashboard/pengguna/tambah");
                TampilPesan("Info", "Gagal menambahkan pengguna!");
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
                            <Text>Form Tambah Pengguna</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input onChange={(e) => {
                            setUsername(e.target.value);
                        }}  
                        placeholder="Username" 
                        type="text" 
                        />
                        <Input 
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}  
                        placeholder="Password" 
                        type="password"
                        />
                        <Input onChange={(e) => {
                            setNama(e.target.value);
                        }}  
                        placeholder="Nama" 
                        type="text" 
                        />
                        <Button
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"
                            onClick={() => handleTambah()}
                        >
                            <Text>Tambah Pengguna</Text>
                        </Button>
                        <Button
                            as={Link}
                            to="/dashboard/pengguna"
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

export default PenggunaCreate;