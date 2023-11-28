import {
  HStack,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import logo from '../assets/movie.png';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ onSearch, user, HandleLogout, HandleProfile }) => {
  const isLoggedIn = !!user;
  const navigate = useNavigate();
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
              <MenuButton
                as={Button}
                display="flex"
                rightIcon={<ChevronDownIcon />}
              >
                {user.profile.name} {''}
              </MenuButton>
              <MenuList>
                {user.role === 'customer' && (
                  <MenuItem onClick={HandleProfile}>Profile</MenuItem>
                )}
                {user.role === 'customer' && (
                  <MenuItem onClick={() => navigate('/rentals')}>
                    Rentals
                  </MenuItem>
                )}
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
