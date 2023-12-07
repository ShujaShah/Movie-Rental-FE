import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { Toast, useToast } from '@chakra-ui/react';

const useGenre = () => {
  const [genre, setGenre] = useState([]);
  const [addGenre, setAddGenre] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toast = useToast();
  const token = localStorage.getItem('x-auth-token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const handleGenreSubmit = async (name) => {
    setIsLoading(true);
    const res = await apiClient
      .post('/genres', { name }, config)
      .then((res) => {
        console.log('response is ', res.data);
        setAddGenre(res.data);
        setIsLoading(false);
        console.log('this should work with genre', genre);
        toast({
          title: 'Success',
          description: `Genre Added Successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response?.data.message || 'An error occurred'); // response other than 200
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
    apiClient
      .get('/genres')
      .then((res) => {
        setIsLoading(false);
        setGenre(res.data.genres);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setIsLoading(false);
        }
      });
  }, [addGenre]);

  return { genre, isloading, error, addGenre, handleGenreSubmit };
};
export default useGenre;
