import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@chakra-ui/react';

const useUser = () => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('x-auth-token');
  useEffect(() => {
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
        console.log(res.data);
      })
      .then((error) => console.error('Error:', error.response.data));
  }, [token]);

  return { user };
};

export default useUser;
