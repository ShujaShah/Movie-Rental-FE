import { useState } from 'react';
import apiClient from '../services/api-client';
import { useToast } from '@chakra-ui/react';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const handleSubmit = (email, password) => {
    setIsLoading(true);
    const res = apiClient
      .post('/auth', { email, password })
      .then((res) => {
        console.log('Response is : ', res.data);
        setIsLoading(false);
        toast({
          title: 'Success',
          description: 'You are through',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: `${error.response.data}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return { handleSubmit, isLoading };
};

export default useLogin;
