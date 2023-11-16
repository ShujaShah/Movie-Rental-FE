import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/genres')
      .then((res) => setGenres(res.data))
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
        }
      });
  }, []);
  return { genres, error };
};

export default useGenres;
