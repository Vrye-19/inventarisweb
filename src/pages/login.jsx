import {
    Box,
    Button,
    CardBody,
    CardHeader,
    CardRoot,
    CardTitle,
    Center,
    Image,
    Input,
    Text
} from "@chakra-ui/react";
import axios from "axios";

import logo from "../assets/box.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const url = "http://localhost/inventarisweb/proseslogin.php";
        const body = { username: username, password: password };
        
        
        try {
            const Response = await axios.post(url, body);
            if(Response.data.STATUS === "BERHASIL") {
                localStorage.setItem("usernameLS", Response.data.DATA[0]["username"]);
                localStorage.setItem("namaLS", Response.data.DATA[0]["nama"]);
                TampilPesan("Info", "Selamat Datang");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else {
                navigate("/");
                TampilPesan("Info", "Username atau Password salah!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const username = localStorage.getItem("usernameLS");
        if(username) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <>
            <Box
                backgroundColor="teal"
                width="100dvw"
                height="100dvh"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Toaster />
                <CardRoot
                    borderRadius="20px"
                    backgroundColor="white"
                    color="black"
                >
                    <CardHeader>
                        <CardTitle>
                            <Center>
                                <Image src={logo} width="100px" />
                            </Center>
                            <Text textAlign="center">My Inventory</Text>
                        </CardTitle>
                        <CardBody gapY="10px">
                            <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                            <Button
                                backgroundColor="teal"
                                color="white"
                                borderRadius="10px"
                                onClick={() => {
                                    handleLogin();
                                }}
                            >
                                <Text>LOGIN</Text>
                            </Button>
                        </CardBody>
                    </CardHeader>
                </CardRoot>
            </Box>
        </>
    );
}

export default Login;