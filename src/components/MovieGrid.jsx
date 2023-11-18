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
          <MovieCard key={movie._id} props={movie} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;

//Steps
//In this Component we are rendering the movie grid.
//      We are using the Custom hook useMovies to call the api /movies
//      Returned data is then mapped to the movie card(component), to render the movie cards.
//      we are receiving the props selectedGenre here, to render the movies that belong to particular genre only.
