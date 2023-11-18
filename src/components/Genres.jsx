import React from 'react';
import { List, ListItem, Spinner, Text, Button } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';

const Genres = ({ onSelectGenre }) => {
  const { genres, error, loading } = useGenres();
  return (
    <>
      {error && <Text>Error: {error}</Text>}
      {loading && <Spinner />}
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <Button onClick={() => onSelectGenre(genre)} variant="link">
              {genre.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Genres;
