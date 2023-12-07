import apiClient from '../../services/api-client';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const useDashboard = () => {
  const [rentals, setRentals] = useState('');
  const [customers, setCustomers] = useState('');
  const [movies, setMovies] = useState('');
  const [genres, setGenres] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const toast = useToast();
  const token = localStorage.getItem('x-auth-token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  useEffect(() => {
    const res = apiClient.get('/rentals', config).then((res) => {
      setRentals(res.data.RentalsCount);
      setIsLoading(false);
    });
    apiClient.get('/customers', config).then((res) => {
      setCustomers(res.data.CustomersCount);
    });
    apiClient.get('/movies', config).then((res) => {
      setMovies(res.data.movieCount);
    });
    apiClient
      .get('/genres')
      .then((res) => {
        setGenres(res.data.genreCount);
      })
      .catch((error) => {
        setError(error.response?.data.message || 'An error occurred'); // response other than 200
      });
  }, []);
  return { rentals, customers, movies, genres, isloading, error };
};

export default useDashboard;
