import React from 'react';
import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react';

export default function NavItem({ icon, title, active, navSize, onClick }) {
  const handleItemClick = () => {
    onClick && onClick();
  };
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && '#bf58df'}
          color={active && '#fff '}
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: 'none',
            color: '#fff',
            backgroundColor: '#bf58df',
          }}
          w={navSize == 'large' && '100%'}
          onClick={handleItemClick}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? '#fff' : '#000'}
                _hover={{ textDecor: 'none', color: '#fff' }}
              />
              <Text ml={5} display={navSize == 'small' ? 'none' : 'flex'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
