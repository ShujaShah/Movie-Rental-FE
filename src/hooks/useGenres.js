import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/genres')
      .then((res) => {
        setGenres(res.data.genres);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setLoading(false);
        }
      });
  }, []);
  return { genres, error, loading };
};

export default useGenres;
