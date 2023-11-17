import React from 'react';
import { Spinner, Text } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';

const Genres = () => {
  const { genres, error, loading } = useGenres();
  return (
    <>
      {error && <Text>Error: {error}</Text>}
      {loading && <Spinner />}
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Genres;
