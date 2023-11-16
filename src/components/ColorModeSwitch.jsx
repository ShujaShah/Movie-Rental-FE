import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      <HStack>
        <MoonIcon />
        <Switch
          colorScheme="green"
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
        ></Switch>
      </HStack>
    </>
  );
};

export default ColorModeSwitch;
