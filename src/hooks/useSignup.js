import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [register, setRegister] = useState({});
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('x-auth-token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const toast = useToast();
  const handleSubmit = (email, name, password) => {
    setIsLoading(true);
    const res = apiClient
      .post('/users', { email, name, password })
      .then((res) => {
        console.log('Response is : ', res.data);
        setRegister(res.data);
        setIsLoading(false);
        toast({
          title: 'Success',
          description: 'Signed up successfully...',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        //navigate('/');
        apiClient('/users', config) // Get the latest response from the api to rerender the component
          .then((res) => {
            setUsersData(res.data);
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
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error.response.data);
        toast({
          title: 'Error',
          description: `${error.response.data}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };
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
  return { handleSubmit, handleSubmitAdmin, register, usersData, isLoading };
};

export default useSignup;
