import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { Spinner } from '@chakra-ui/react';

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    apiClient
      .get('/genres')
      .then((res) => {
        setGenres(res.data);
        setSpinner(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setSpinner(false);
        }
      });
  }, []);
  return { genres, error, spinner };
};

export default useGenres;
