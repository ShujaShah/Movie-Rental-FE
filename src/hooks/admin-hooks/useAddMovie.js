import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

const useAddMovie = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [createMovie, setCreateMovie] = useState({});
  const [moviesList, setMoviesList] = useState([]);

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
        setCreateMovie(res.data);
        setIsLoading(false);
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
  useEffect(() => {
    setIsLoading(true);
    const res = apiClient
      .get('/movies')
      .then((res) => {
        setMoviesList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
        console.error('Error:', error?.response?.data);
      });
  }, [createMovie]);
  return { createMovie, isloading, error, moviesList, handleAdminSubmit };
};

export default useAddMovie;
