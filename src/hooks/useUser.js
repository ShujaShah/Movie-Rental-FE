import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('x-auth-token');

  const HandleLogout = () => {
    localStorage.removeItem('x-auth-token');
    toast({
      title: 'Logging Out...',
      description: 'Success',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/login');
  };

  const HandleProfile = () => {
    navigate('/profile');
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
      .get('/users/me', config)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
        console.error('Error:', error?.response?.data);
      });
  }, [token]);

  return { user, HandleLogout, isloading, HandleProfile, error };
};

export default useUser;
