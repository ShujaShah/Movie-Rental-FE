import { HStack, Image, Text } from '@chakra-ui/react';
import logo from '../assets/movie.png';
import ColorModeSwitch from './ColorModeSwitch';
const NavBar = () => {
  return (
    <>
      <HStack justifyContent="space-between" padding="10px">
        <Image src={logo} boxSize="60px" />
        <Text>Movie Rental</Text>
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
