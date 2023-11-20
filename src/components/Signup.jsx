import * as React from 'react';
import useLogin from '../hooks/useLogin';

import { Box, Button, HStack, Heading, Spinner, Text } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import movieBg from '../assets/movie-background.png';
import logo from '../assets/movie.png';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const { handleSubmit, isLoading } = useSignup();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, name, password);
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
          <Link to="/">
            <Image src={logo} mb={5} width={100} />
          </Link>
          <Heading as="h1" fontSize="25px">
            {' '}
            Create your account
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
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
                {isLoading ? <Spinner /> : 'Signup'}
              </Button>
            </FormControl>
          </form>
        </Box>
      </HStack>
    </>
  );
}
