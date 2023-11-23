import * as React from 'react';
import useLogin from '../hooks/useLogin';

import { Box, Button, HStack, Heading, Spinner, Text } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import movieBg from '../assets/movie-background.png';
import logo from '../assets/movie.png';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import {
  SignupReducer,
  registerInitialState,
} from '../state-management/reducers/signupReducer';

export default function Signup() {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [name, setName] = React.useState('');

  const [state, dispatch] = React.useReducer(
    SignupReducer,
    registerInitialState
  );

  const { handleSubmit, isLoading } = useSignup();

  function handleEmail(e) {
    //setEmail(e.target.value);
    dispatch({ type: 'SET_EMAIL', payload: e.target.value });
  }

  function handlePassword(e) {
    //setPassword(e.target.value)
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  }

  function handleName(e) {
    //setName(e.target.value)
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(state.email, state.name, state.password);
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
                value={state.email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleName}
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
                {isLoading ? <Spinner /> : 'Register'}
              </Button>
            </FormControl>
          </form>
          <Heading as="h2" fontSize="20px" mt={5} mb={3}>
            Already have an account?
          </Heading>
          <Heading as="h5" size="md">
            <Link to="/login" style={{ color: '#8d2dab' }} fontSize="20px">
              Login{' '}
            </Link>{' '}
            Instead
          </Heading>
        </Box>
      </HStack>
    </>
  );
}
