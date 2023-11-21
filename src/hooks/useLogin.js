import { useState } from 'react';
import apiClient from '../services/api-client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [token, setToken] = useState(null);

  const toast = useToast();
  const handleSubmit = (email, password) => {
    setIsLoading(true);
    const res = apiClient
      .post('/auth', { email, password })
      .then((res) => {
        console.log('Response is : ', res.data);
        localStorage.setItem('x-auth-token', res.data.token);
        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${res['token']}`;
        setToken(res.data.token);
        setUser(res.data.user);
        setIsLoading(false);
        toast({
          title: 'Success',
          description: 'You are through',
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
  console.log(user);

  return { handleSubmit, isLoading, user, token };
};

export default useLogin;
