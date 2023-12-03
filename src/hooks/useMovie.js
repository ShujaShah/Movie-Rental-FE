// import { useEffect, useState } from 'react';
// import apiClient from '../services/api-client';
// import useRental from './useRental';

// const useMovie = (_id) => {
//   const [movie, setMovie] = useState({});
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   const { rental } = useRental();

//   const fetchMovieData = () => {
//     setLoading(true);

//     apiClient(`/movies/${_id}`)
//       .then((res) => {
//         setMovie(res.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         if (error.response) {
//           setError(error.response.data.message || 'An Error Occurred...');
//           setLoading(false);
//         }
//       });
//   };

//   useEffect(() => {
//     fetchMovieData();
//   }, [_id, rental?._id]);

//   return { movie, loading, error, fetchMovieData };
// };

// export default useMovie;

import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import useUser from './useUser';
import { useToast } from '@chakra-ui/react';

const useMovie = (_id) => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});

  const { user } = useUser();

  const customerId = user?.profile?._id;
  const movieId = movie?._id;
  const toast = useToast();

  useEffect(() => {
    setLoading(true);

    apiClient(`/movies/${_id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An Error Occurred...');
          setLoading(false);
        }
      });
  }, [_id]);

  // handle the rentals
  const token = localStorage.getItem('x-auth-token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const handleRental = () => {
    setLoading(true);
    apiClient
      .post('/rentals', { customerId, movieId }, config)
      .then((res) => {
        console.log('Post request for rentals', res.data);
        setRental(res.data);
        setLoading(false);
        toast({
          title: 'Success',
          description: `Order Successfully created...`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        apiClient(`/movies/${_id}`) // Get the latest response from the api to rerender the component
          .then((res) => {
            setMovie(res.data);
          })
          .catch((error) => {
            console.error(
              'Error fetching movie details:',
              error.response?.data || 'An Error Occurred...'
            );
          });
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error.response.data);
        toast({
          title: 'Error',
          description: `${error.response.data}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return { movie, error, loading, handleRental, rental };
};

export default useMovie;
