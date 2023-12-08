import { useState } from 'react';
import apiClient from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

const useAddMovie = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [createMovie, setCreateMovie] = useState({});

  const toast = useToast();

  const token = localStorage.getItem('x-auth-token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const handleAdminSubmit = ({
    title,
    slug,
    dailyRentalRate,
    numberInStock,
    genre,
    movieBanner,
  }) => {
    setIsLoading(true);
    const res = apiClient
      .post(
        '/movies',
        { title, slug, dailyRentalRate, numberInStock, genre, movieBanner },
        config
      )
      .then((res) => {
        setIsLoading(false);
        setCreateMovie(res.data);
        console.log('posted movie is:', res.data);
        toast({
          title: 'Success',
          description: 'Movie addded successfully...',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setError(error.response.data);
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
  return { createMovie, isloading, error, handleAdminSubmit };
};

export default useAddMovie;
