import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";

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
            <Text>Ini Halaman Pengguna</Text>
        </>
    );
};

export default Pengguna;