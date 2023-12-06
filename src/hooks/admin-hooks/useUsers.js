import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

const useUser = () => {
  const toast = useToast();
  const [isloading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [register, setRegister] = useState({});
  const [error, setError] = useState('');

  const token = localStorage.getItem('x-auth-token');

  const handleSubmitAdmin = (email, name, password) => {
    setIsLoading(true);
    const res = apiClient
      .post('/users', { email, name, password })
      .then((res) => {
        console.log('Response is : ', res.data);
        setRegister(res.data);
        setIsLoading(false);
        toast({
          title: 'Success',
          description: 'User Created successfully...',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: `${error.response.data}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = apiClient
      .get('/users', config)
      .then((res) => {
        setUsers(res.data);
        console.log('here is the users data', res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
        console.error('Error:', error?.response?.data);
      });
  }, [token, register]);

  return { users, isloading, register, handleSubmitAdmin, error };
};

export default useUser;
