import { HStack, Image, Text } from '@chakra-ui/react';
import logo from '../assets/movie.png';
const NavBar = () => {
  return (
    <>
      <HStack>
        <Image src={logo} boxSize="60px" />
        <Text>Movie Rental</Text>
      </HStack>
    </>
  );
};

export default NavBar;
