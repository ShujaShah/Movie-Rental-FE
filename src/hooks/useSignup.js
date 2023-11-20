import { useState } from 'react';
import apiClient from '../services/api-client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();
  const handleSubmit = (email, name, password) => {
    setIsLoading(true);
    const res = apiClient
      .post('/users', { email, name, password })
      .then((res) => {
        console.log('Response is : ', res.data);
        setIsLoading(false);
        toast({
          title: 'Success',
          description: 'Signed up successfully...',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
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

export default useSignup;
