import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

const useMovies = (selectedGenre) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log('i am here :', selectedGenre?._id);
    const queryParams = selectedGenre?._id ? { genre: selectedGenre._id } : {};
    apiClient
      .get('/movies', { params: queryParams })
      .then((res) => {
        setMovies(res.data.movies);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred');
          setIsLoading(false);
        }
      });
  }, [selectedGenre]);
  return { movies, error, isLoading };
};

export default useMovies;
