import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';

const useRentals = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const res = apiClient
      .get('/rentals')
      .then((res) => {
        setRentals(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
        console.error('Error:', error?.response?.data);
      });
  }, []);

  return { rentals, isloading, error };
};

export default useRentals;
