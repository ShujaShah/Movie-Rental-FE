import { useState } from 'react';
import {
  HStack,
  Image,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import logo from '../assets/movie.png';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const NavBar = ({ onSearch, user }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const HandleLogout = () => {
    localStorage.removeItem('x-auth-token');
    toast({
      title: 'Logging Out...',
      description: 'Success',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/');
  };

  return (
    <>
      <HStack padding="10px">
        <Link to="/">
          <Image src={logo} boxSize="60px" />
        </Link>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
        {isLoggedIn ? (
          <>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {user.name}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={HandleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Link to="/login">
            <Button background="#8d2dab" size="md">
              Login
            </Button>
          </Link>
        )}
      </HStack>
    </>
  );
};

export default NavBar;
