import * as React from 'react';
import useLogin from '../hooks/useLogin';
import { Button, Spinner } from '@chakra-ui/react';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

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
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </FormControl>
        <FormControl>
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
            loadingText="Loading"
            colorScheme="teal"
            variant="outline"
            spinnerPlacement="end"
            type="submit"
          >
            {isLoading ? <Spinner /> : 'Submit'}
          </Button>
        </FormControl>
      </form>
    </>
  );
}
