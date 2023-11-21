import { useState } from 'react';
import { HStack, Image, Button, Text, useRadio } from '@chakra-ui/react';
import logo from '../assets/movie.png';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';

const NavBar = ({ onSearch }) => {
  // const isLoggedIn = !!user;
  return (
    <>
      <HStack padding="10px">
        <Link to="/">
          <Image src={logo} boxSize="60px" />
        </Link>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
        {/* {isLoggedIn ? (
          <Text>{user.name}</Text>
        ) : (
          <Link to="/login">
            <Button background="#8d2dab" size="md">
              Login
            </Button>
          </Link>
        )} */}

        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </HStack>
    </>
  );
};

export default NavBar;
