import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

const useUser = () => {
  const toast = useToast();
  const [isloading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('x-auth-token');

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
  }, [token]);

  return { users, isloading, error };
};

export default useUser;
