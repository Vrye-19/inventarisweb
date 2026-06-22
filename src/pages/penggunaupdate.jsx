import { 
    Box, 
    Button, 
    Card, 
    CardBody, 
    CardHeader, 
    CardTitle,
    Heading, 
    Input, 
    Text 
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";

const PenggunaUpdate = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id)

    const selectSatuPengguna = async () => {
        const url = `http://localhost/api/satupenggunaread.php?id=${id}`;

        try {
            const res = await axios.get(url);
            setNama(res.data["DATA"][0]["nama"]);
            setUsername(res.data["DATA"][0]["username"]);
            setPassword(res.data["DATA"][0]["password"]);
        } catch (error) {
            print(error);
        }
    }

    const handleUpdate = async () => {
        const url = "http://localhost/api/penggunaupdate.php";
        const body = { username: username, password: password, nama: nama, id: id };

        try {
            const res = await axios.post(url, body);

            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/pengguna");
                TampilPesan("Info", "Pengguna berhasil diupdate!");
            } else {
                navigate("/dashboard/pengguna/update");
                TampilPesan("Info", "Gagal mengupdate pengguna!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi kesalahan.");
        }
    }

    useEffect(() => {
        selectSatuPengguna();
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
                            <Text>Form Tambah Pengguna</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input onChange={(e) => {
                            setUsername(e.target.value);
                        }} 
                        placeholder="Username" 
                        type="text" 
                        value={username} 
                        />
                        <Input onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password" 
                        type="password" 
                        value={password}  
                        />
                        <Input onChange={(e) => {
                            setNama(e.target.value);
                        }}
                        placeholder="Nama" 
                        type="text" 
                        value={nama}  
                        />
                        <Button
                            onClick={() => {
                                handleUpdate();
                            }}
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"                         
                        >
                            <Text>Update Pengguna</Text>
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

export default PenggunaUpdate;