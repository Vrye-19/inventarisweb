import { Box } from "@chakra-ui/react"

const PenggunaCreate = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");
    const navigate = useNavigate();
    
    return (
        <>
            <Box
                display ="flex"
                flexDirection= "column"
                width= "100dvw"
                height= "100dvh"
                justifyContent= "center"
                alignItems= "center"
            >
                <Card.Root width= "50dvw" shadowColor="bg.emphasized" shadow="ig">
                    <CardHeader>
                        <CardTitle>
                            <Text>From Tambah Pengguna</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input placeholder="Username" type="text"/>
                        <Input placeholder="Password" type="passwrod"/>
                        <Input placeholder="nama" type="text"/>
                        <Button backgroundColor="Teal" color="white" borderRadius="white">
                            <Text>Tambah Pengguna</Text>
                        </Button>
                        <Button variant="outline" borderRadius="10px">
                            <Text>Kembali</Text>
                        </Button>
                    </CardBody>
                </Card.Root>
            </Box>
        </>
    );
};