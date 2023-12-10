import { React, useEffect, useRef, useState } from 'react';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import useAddMovie from '../../hooks/admin-hooks/useAddMovie';
import CreateMovies from './CreateMovies';

const Movies = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    numberInStock: '',
    dailyRentalRate: '',
    slug: '',
    genre: '',
    movieBanner: '',
  });

  const { isloading, error, handleAdminSubmit, moviesList } = useAddMovie();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose();
  }, [moviesList]);

  if (!moviesList) return <p>Login to see users...</p>;

  if (moviesList.length === 0) return <p>No Movies found</p>;

  return (
    <>
      {isloading && <Spinner />}
      {error && <p>Something went wrong</p>}
      <Button onClick={onOpen}>Add Movies</Button>
      <CreateMovies
        handleAdminSubmit={handleAdminSubmit}
        error={error}
        isloading={isloading}
        isOpen={isOpen}
        onClose={onClose}
      />
      <TableContainer pt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Genre</Th>
              <Th>Stock</Th>
              <Th>Rental Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {moviesList.movies.map((movie) => (
              <Tr key={movie._id}>
                <Td>{movie.title}</Td>
                <Td>{movie.genre.name}</Td>
                <Td>{movie.numberInStock}</Td>
                <Td>{movie.dailyRentalRate}</Td>
                <Td>
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="solid"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Movies;
