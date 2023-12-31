import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { useToast } from '@chakra-ui/react';

const useUpdateUser = (_id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
  const [rentals, setRentals] = useState([]);

  const toast = useToast();

  const token = localStorage.getItem('x-auth-token');

  useEffect(() => {
    if (!_id) {
      return;
    }
    setIsLoading(true);
    const res = apiClient
      .get(`/customers/${_id}`)
      .then((res) => {
        setInitialUser(res.data);
        console.log('set initial user is : ', res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error:', error.response.data);
      });
  }, [_id]);

  useEffect(() => {
    if (!_id) {
      return;
    }
    setIsLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = apiClient
      .get(`/rentals/customer-rental/${_id}`, config)
      .then((res) => {
        setRentals(res.data);
        console.log('here is the data relate to rentals', res.data);
        setIsLoading(false);
      })
      .then((error) => {
        setIsLoading(false);
        console.error('Error:', error.response.data);
      });
  }, [_id]);

  const handleSubmit = (email, name, phone) => {
    setIsLoading(true);
    const res = apiClient
      .patch(`/customers/${_id}`, { email, name, phone })
      .then((res) => {
        console.log('Response is : ', res.data);
        setInitialUser(res.data);
        setIsLoading(false);
        toast({
          title: 'Success',
          description: 'Successfully updated...',
          status: 'success',
          duration: 3000,
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
  return {
    updateUser,
    initialUser,
    handleSubmit,
    isLoading,
    rentals,
  };
};

export default useUpdateUser;
