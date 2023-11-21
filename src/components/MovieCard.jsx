import { Card, Heading, Image, transform } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

//passing movie as props to the component
const MovieCard = ({ props: movie }) => {
  return (
    <>
      <Card
        _hover={{
          transform: 'scale(1.03)',
          transition: 'transform .15s ease-in',
        }}
        borderRadius={10}
        overflow="hidden"
        mt={5}
      >
        <Link to={'/movies/' + movie._id}>
          <Image src={movie.movieBanner} height={400} width="100%" />
        </Link>

        <Heading as="h6" fontSize="24px" padding="0.5rem">
          <Link to={'/movies/' + movie._id}>{movie.title}</Link>
        </Heading>
      </Card>
    </>
  );
};

export default MovieCard;
