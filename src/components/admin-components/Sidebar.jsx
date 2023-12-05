import React, { useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Button,
} from '@chakra-ui/react';
import { FiMenu, FiSquare } from 'react-icons/fi';

import { BiCameraMovie } from 'react-icons/bi';
import { CiFilter } from 'react-icons/ci';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { PiUsersFour } from 'react-icons/pi';

import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ HandleLogout, user }) {
  const [navSize, changeNavSize] = useState('large');
  const navigate = useNavigate();
  const handleNavItemClick = (path) => {
    navigate(path);
  };
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == 'small' ? '15px' : '30px'}
      w={navSize == 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FiSquare}
          title="Dashboard"
          onClick={() => handleNavItemClick('/admin-dashboard')}
          active={location.pathname === '/admin-dashboard'}
        />
        <NavItem
          navSize={navSize}
          icon={PiUsersFour}
          title="Users"
          onClick={() => handleNavItemClick('/admin-dashboard/users')}
          active={location.pathname === '/admin-dashboard/users'}
        />
        <NavItem
          navSize={navSize}
          icon={BiCameraMovie}
          title="Movies"
          onClick={() => handleNavItemClick('/admin-dashboard/movies')}
          active={location.pathname === '/admin-dashboard/movies'}
        />
        <NavItem
          navSize={navSize}
          icon={CiFilter}
          title="Genres"
          onClick={() => handleNavItemClick('/admin-dashboard/genres')}
          active={location.pathname === '/admin-dashboard/genres'}
        />
        <NavItem
          navSize={navSize}
          icon={MdProductionQuantityLimits}
          title="Orders"
          onClick={() => handleNavItemClick('/admin-dashboard/orders')}
          active={location.pathname === '/admin-dashboard/orders'}
        />
      </Flex>
      <Button onClick={HandleLogout}>Logout</Button>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as="h3" size="sm">
              {user.name}
            </Heading>
            <Text color="gray">{user.role}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
