import React from 'react';

import useMovies from '../hooks/useMovies';
import { SimpleGrid, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';

const MovieGrid = () => {
  const { movies, error } = useMovies(); //calling the custom hook for fetching the data
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={10}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} props={movie} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
