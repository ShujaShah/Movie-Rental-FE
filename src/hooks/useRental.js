import apiClient from '../services/api-client';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useUser from './useUser';
import useMovie from './useMovie';

const useRental = () => {
  const [movie, setMovie] = useState({});
  const [rental, setRental] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const token = localStorage.getItem('x-auth-token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const handleRental = () => {
    setLoading(true);
    apiClient
      .post('/rentals', { customerId, movieId }, config)
      .then((res) => {
        console.log('Post request for rentals', res.data);
        setRental(res.data);
        setLoading(false);
        toast({
          title: 'Success',
          description: `Order Successfully created...`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        apiClient(`/movies/${_id}`)
          .then((res) => {
            console.log('i am here', _id);
            setMovie(res.data);
          })
          .catch((error) => {
            console.error(
              'Error fetching movie details:',
              error.response?.data || 'An Error Occurred...'
            );
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
  return { movie, error, loading, handleRental, rental };
};

export default useRental;
