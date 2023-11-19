import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router
import useMovie from '../hooks/useMovie'; // Update with the correct path

import { Heading, Text, Image } from '@chakra-ui/react';

const MovieDetailsPage = () => {
  const { _id } = useParams();
  const { movie } = useMovie(_id);

  return (
    <>
      <Heading>{movie.title}</Heading>
      <Image src={movie.movieBanner} width={300} />
      {/* <Text>{movie.genre.name}</Text> */}
      <Text>Number in Stock: {movie.numberInStock}</Text>
      <Text>Daily Rental Rate: ${movie.dailyRentalRate}.00</Text>
    </>
  );
};

export default MovieDetailsPage;
