import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

const useMovies = (selectedGenre) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // console.log('i am here :', selectedGenre?._id);
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

// Steps
//      In this custom hook we are calling the api /movies to get the list of all the movies.
//      Since the movies can also be filtered, thus we use query paramaters
//      Query params are used to get the movies as per the the genre ids as defined in the api endpoint
//      It constructs query parameters based on the selectedGenre (if available) and sends a GET request to the /movies endpoint using the apiClient
//      /api/movies ----- gets all the movies.
//      /api/movies?genre=genreid ----- gets the movies as per the genre id.
//      In the useEffect dependency array, we are passing the selectedGenre so that it will rerun whenever selectedGenre changes
