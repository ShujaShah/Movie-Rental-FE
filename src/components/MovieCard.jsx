import { Card, Heading, Image } from '@chakra-ui/react';
import React from 'react';

//passing movie as props to the component
const MovieCard = ({ props: movie }) => {
  return (
    <>
      <Card borderRadius={10} overflow="hidden">
        <Image src={movie.movieBanner} />
        <Heading as="h6">{movie.title}</Heading>
      </Card>
    </>
  );
};

export default MovieCard;
