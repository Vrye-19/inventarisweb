import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import person from "../assets/person.png";

const Profil = () => {
    const [nama, setNama] = useState("");

    useEffect(() => {
        setNama(localStorage.getItem("namaLS"));
    }, []);

    return (
        <>
            <Heading size="2xl" textAlign="center" marginBottom={5}>
                Profil Saya
            </Heading>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Image src={person} width="10dvw" />
            </Box>
            <Text fontWeight="bold" textAlign="center" marginTop={5}>
                Nama Saya {nama}
            </Text>
            <Text fontWeight="bold" textAlign="center">
                Saya adalah seorang programmer junior yang suka belajar hal-hal baru mengenai bahasa pemrograman react. Bagi saya coding itu mirip sebuah game online.
            </Text>
        </>
    );
};

export default Profil;