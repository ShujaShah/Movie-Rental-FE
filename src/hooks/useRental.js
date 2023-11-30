import apiClient from '../services/api-client';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const useRental = (customerId, movieId) => {
  const [movie, setMovie] = useState({});
  const [rental, setRental] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('x-auth-token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const toast = useToast();

  const handleRental = () => {
    setIsLoading(true);
    const res = apiClient
      .post('/rentals', { customerId, movieId }, config)
      .then((res) => {
        console.log('Post request for rentals', res.data);
        setRental(res.data);
        apiClient(`/movies/${movieId}`).then((res) => {
          setMovie(res.data);
          setIsLoading(false);
        });
        setIsLoading(false);
        toast({
          title: 'Success',
          description: `Order Successfully created...`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
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
  return { handleRental, rental, isLoading };
};

export default useRental;
