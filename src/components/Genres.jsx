import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { Text } from '@chakra-ui/react';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/genres')
      .then((res) => setGenres(res.data))
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // request other than 200
        }
      });
  }, []);

  return (
    <>
      {error && <Text>Error: {error}</Text>}
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Genres;
