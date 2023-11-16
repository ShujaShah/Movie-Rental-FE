import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/movies')
      .then((res) => setMovies(res.data))
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
        }
      });
  }, []);
  return { movies, error };
};

export default useMovies;
