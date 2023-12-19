import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

const useAddMovie = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [createMovie, setCreateMovie] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const [editMovie, setEditMovie] = useState({});
  const [delMovie, setDeleteMovie] = useState({});
  const [genres, setGenres] = useState([]);

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

  const handleEditMovie = (_id, updatedMovie) => {
    setIsLoading(true);
    const res = apiClient
      .patch(`/movies/${_id}`, updatedMovie, config)
      .then((res) => {
        setEditMovie(res.data);
        console.log('updated movie from hook', updatedMovie);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error is:', error);
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

  const handleDeleteMovie = (_id) => {
    setIsLoading(true);
    const res = apiClient
      .delete(`/movies/${_id}`, config)
      .then((res) => {
        setIsLoading(false);
        setDeleteMovie(res.data);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setIsLoading(false);
        }
      });
  };

  //get the genres
  useEffect(() => {
    setIsLoading(true);
    const res = apiClient
      .get('/genres')
      .then((res) => {
        setGenres(res.data.genres);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setIsLoading(false);
        }
      });
  }, []);

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
  }, [createMovie, editMovie, genres, delMovie]);

  return {
    createMovie,
    isloading,
    error,
    moviesList,
    delMovie,
    editMovie,
    handleAdminSubmit,
    handleDeleteMovie,
    handleEditMovie,

    genres,
  };
};

export default useAddMovie;
