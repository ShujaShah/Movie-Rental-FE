import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router
import useMovie from '../hooks/useMovie'; // Update with the correct path

import {
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  Spinner,
  layout,
} from '@chakra-ui/react';

const MovieDetailsPage = () => {
  const { _id } = useParams();
  const { movie, loading, error } = useMovie(_id);
  console.log('i am here', movie.genre?.name);

  return (
    <>
      {loading && <Spinner />}
      <Grid margin={10} templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem>
          <Image src={movie.movieBanner} width={300} />
        </GridItem>

        <GridItem colSpan={2}>
          <Heading>{movie.title}</Heading>
          <Text>Genre: {movie.genre?.name}</Text>
          <Text>Number in Stock: {movie.numberInStock}</Text>
          <Text>Daily Rental Rate: ${movie.dailyRentalRate}.00</Text>
        </GridItem>
      </Grid>
    </>
  );
};

export default MovieDetailsPage;
