import React from 'react';
import { List, ListItem, Spinner, Text, Button } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';

const Genres = ({ onSelectGenre, selectedGenre }) => {
  const { genres, error, loading } = useGenres();
  return (
    <>
      {error && <Text>Error: {error}</Text>}
      {loading && <Spinner />}
      <List>
        {genres.map((genre) => (
          <ListItem key={genre._id} paddingY="5px">
            <Button
              whiteSpace="normal"
              textAlign="left"
              fontSize="20px"
              fontWeight={genre._id === selectedGenre?._id ? 'bold' : 'normal'}
              onClick={() => {
                onSelectGenre(genre);
              }}
              variant="link"
            >
              {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Genres;

//Steps to get the list of Genres
//1. Get the Genres.
//      === We created a custom hook, useGenres in which the call to the api is defined.
//      === The returned genres are then used to map on the array and get the list of genres.

//Steps to handle the click Event of the Individual Genres
//2. When clicking on the genre button, get the genre object
//      ==== For that we create a function onSelectGenre which takes an genre object and pass it as props.
//      ==== Then we use the onclick to call the function on the button click.
