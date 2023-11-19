import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useMovie = (_id) => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('in the hook');
    apiClient(`/movies/${_id}`)
      .then((res) => {
        console.log('here is the id', _id);
        setMovie(res.data);
        setLoading(false);
        console.log('Calling from the useMovie HOOK', res.data);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message) || 'An Error Occurred...';
          setLoading(false);
        }
      });
  }, [_id]);
  console.log('useMovie hook', { movie, error });
  return { movie };
};

export default useMovie;
