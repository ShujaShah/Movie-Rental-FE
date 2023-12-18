import { React, useEffect, useRef, useState } from 'react';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import EditMovie from './EditMovie';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  AlertDialog,
} from '@chakra-ui/react';
import AlertDelete from './AlertDelete';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import useAddMovie from '../../hooks/admin-hooks/useMovies';
import CreateMovies from './CreateMovies';

const Movies = () => {
  const [movieData, setMovieData] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});

  const {
    isloading,
    error,
    handleAdminSubmit,
    moviesList,
    handleDeleteMovie,
    delMovie,
    editMovie,
  } = useAddMovie();

  //const { isOpen, onOpen, onClose } = useDisclosure();

  const addMovieModal = useDisclosure();
  const updateMovieModal = useDisclosure();
  const deleteMovieModal = useDisclosure();

  useEffect(() => {
    addMovieModal.onClose();
    deleteMovieModal.onClose();
  }, [moviesList, editMovie, delMovie]);

  const cancelRef = useRef();

  const handleDelete = async (movieId) => {
    await handleDeleteMovie(movieId);
  };

  if (!moviesList) return <p>Login to see users...</p>;

  if (moviesList.length === 0) return <p>No Movies found</p>;

  return (
    <>
      {isloading && <Spinner />}
      {error && <p>Something went wrong</p>}
      <Button onClick={addMovieModal.onOpen}>Add Movies</Button>
      <CreateMovies
        isOpen={addMovieModal.isOpen}
        onClose={addMovieModal.onClose}
        handleAdminSubmit={handleAdminSubmit}
        error={error}
        isloading={isloading}
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
                    onClick={() => {
                      updateMovieModal.onOpen();
                      setSelectedMovie(movie._id);
                    }}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
                  <EditMovie
                    isOpen={updateMovieModal.isOpen}
                    onClose={updateMovieModal.onClose}
                    //handleEditSubmit={handleEditSubmit}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={selectedMovie}
                    movieData={movieData}
                    error={error}
                    isloading={isloading}
                  />
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      deleteMovieModal.onOpen();
                      setMovieData(movie._id);
                    }}
                    leftIcon={<DeleteIcon />}
                    variant="solid"
                  >
                    Delete
                  </Button>
                  <AlertDialog
                    isOpen={deleteMovieModal.isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={deleteMovieModal.onClose}
                  >
                    <AlertDelete
                      isOpen={deleteMovieModal.isOpen}
                      onClose={deleteMovieModal.onClose}
                      handleDelete={() => handleDelete(movieData)}
                      cancelRef={cancelRef}
                    />
                  </AlertDialog>
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
