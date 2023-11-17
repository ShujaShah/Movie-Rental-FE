import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get('/movies')
      .then((res) => {
        setMovies(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setIsLoading(false);
        }
      });
  }, []);
  return { movies, error, isLoading };
};

export default useMovies;
