import React from 'react';

import useMovies from '../hooks/useMovies';
import { Text } from '@chakra-ui/react';

const MovieGrid = () => {
  const { movies, error } = useMovies();
  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default MovieGrid;
