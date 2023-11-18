import React from 'react';

import useMovies from '../hooks/useMovies';
import { SimpleGrid, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

const MovieGrid = ({ selectedGenre }) => {
  const { movies, error, isLoading } = useMovies(selectedGenre); //calling the custom hook for fetching the data
  const skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={10}>
        {isLoading &&
          skeletons.map((skeleton) => <MovieCardSkeleton key={skeleton} />)}
        {movies.map((movie) => (
          <MovieCard key={movie.id} props={movie} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
