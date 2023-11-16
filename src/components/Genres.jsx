import React from 'react';
import { Text } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';

const Genres = () => {
  const { genres, error } = useGenres();
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
