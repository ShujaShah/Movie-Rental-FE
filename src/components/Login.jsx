import * as React from 'react';
import useLogin from '../hooks/useLogin';

import { Box, Button, HStack, Heading, Spinner, Text } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import movieBg from '../assets/movie-background.png';
import logo from '../assets/movie.png';
import { Link } from 'react-router-dom';

//Commented out code is implementation using the state

import {
  loginReducer,
  loginInitialState,
} from '../state-management/reducers/loginReducer';

export default function Login() {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  const [state, dispatch] = React.useReducer(loginReducer, loginInitialState);

  const { handleSubmit, isLoading } = useLogin();

  function handleEmail(e) {
    //setEmail(e.target.value);
    dispatch({ type: 'SET_EMAIL', payload: e.target.value });
  }

  function handlePassword(e) {
    // setPassword(e.target.value);
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(state.email, state.password);
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
            Log in to your account
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={state.email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl mt={4} mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={state.password}
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
          <Heading as="h2" fontSize="20px" mt={5} mb={3}>
            Don't have an account?
          </Heading>
          <Heading as="h5" size="md">
            <Link to="/register" style={{ color: '#8d2dab' }} fontSize="20px">
              Register{' '}
            </Link>{' '}
            Instead
          </Heading>
        </Box>
      </HStack>
    </>
  );
}
