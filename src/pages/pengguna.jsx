import { Box, Button, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Pengguna = () => {
    const [user, setUser] = useState([]);

    const selectPengguna = async () => {
        const url = "http://localhost/inventarisweb/penggunaread.php"
        try {
            const response = await axios.get(url);
            setUser(response.data["DATA"]);
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        selectPengguna();
    }, []);

    return (
        <>
        <Heading size="xl" textAlign="center" padding="10px" >
            Table Pengguna
        </Heading>
        <Box padding ="10px">
            <Button as={Link} to="tambah" variant="solid" bgColor="teal" >
                Tambah Pengguna
            </Button>
        </Box>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>No</Table.ColumnHeader>
                    <Table.ColumnHeader>Nama</Table.ColumnHeader>
                    <Table.ColumnHeader>Username</Table.ColumnHeader>
                    <Table.ColumnHeader>Password</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {user.map((item, index) => (
                    <Table.Row Key={item.id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{item.nama}</Table.Cell>
                        <Table.Cell>{item.username}</Table.Cell>
                        <Table.Cell>{item.password}</Table.Cell>
                        </Table.Row>
                ))}
            </Table.Body> 
        </Table.Root>
        </>
    );
};

export default Pengguna;