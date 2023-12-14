import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

const useGenre = () => {
  const [genre, setGenre] = useState([]);
  const [addGenre, setAddGenre] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [del, setDel] = useState({});
  const [error, setError] = useState('');
  const [editGenre, setEditGenre] = useState({});

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

  const handleEditGenre = (_id, name) => {
    console.log('from hook genre id:', _id);
    setIsLoading(true);
    apiClient
      .put(`/genres/${_id}`, { name }, config)
      .then((res) => {
        console.log('here is the updated name', name);
        setEditGenre({ _id, name });
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setIsLoading(false);
        }
      });
  };

  const handleDeleteGenre = (_id) => {
    setIsLoading(true);
    console.log('here this id is getting deleted', _id);
    apiClient
      .delete(`/genres/${_id}`, config)
      .then((res) => {
        setIsLoading(false);
        setDel(res.data);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setIsLoading(false);
        }
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
  }, [addGenre, del, editGenre]);

  return {
    genre,
    del,
    isloading,
    error,
    addGenre,
    handleGenreSubmit,
    handleEditGenre,
    handleDeleteGenre,
    editGenre,
  };
};
export default useGenre;
