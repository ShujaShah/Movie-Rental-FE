import { useState } from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';
import logo from '../assets/movie.png';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';

const NavBar = ({ onSearch }) => {
  return (
    <>
      <HStack padding="10px">
        <Link to="/">
          <Image src={logo} boxSize="60px" />
        </Link>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
        <Link to="/login">Login</Link>
      </HStack>
    </>
  );
};

export default NavBar;
