import * as React from 'react';
import useLogin from '../hooks/useLogin';

import { Box, Button, HStack, Heading, Spinner, Text } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import movieBg from '../assets/movie-background.png';
import logo from '../assets/movie.png';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { handleSubmit, isLoading } = useLogin();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

  return (
    <>
      <HStack>
        <Box
          w="80%"
          h="100vh"
          backgroundImage={movieBg}
          backgroundSize="cover"
        ></Box>
        <Box width={300} ml={5}>
          <Image src={logo} mb={5} width={100} />
          <Heading as="h1" fontSize="25px">
            {' '}
            Log in to your account
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <FormControl mt={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl mt={4} mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </FormControl>
            <FormControl>
              <Button
                variant="outline"
                border="1px solid #8d2dab"
                type="submit"
              >
                {isLoading ? <Spinner /> : 'Login'}
              </Button>
            </FormControl>
          </form>
        </Box>
      </HStack>
    </>
  );
}
