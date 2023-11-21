import React from 'react';
import { useParams } from 'react-router-dom';
import useMovie from '../hooks/useMovie';

import {
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  Spinner,
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import useUser from '../hooks/useUser';

const MovieDetailsPage = () => {
  const { _id } = useParams();
  const { movie, loading, error } = useMovie(_id);

  const { onSearch, user, HandleLogout } = useUser();
  return (
    <>
      <NavBar onSearch={onSearch} user={user} HandleLogout={HandleLogout} />
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
