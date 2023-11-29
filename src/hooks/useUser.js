import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import headerConfig from '../services/header-config';

const useUser = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

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
    const res = apiClient
      .get('/users/me', headerConfig)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .then((error) => {
        setIsLoading(false);
        console.error('Error:', error.response.data);
      });
  }, [token]);

  return { user, HandleLogout, isloading, HandleProfile };
};

export default useUser;
