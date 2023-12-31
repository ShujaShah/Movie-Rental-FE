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
    handleEditMovie,
    delMovie,
    editMovie,
    genres,
  } = useAddMovie();

  //const { isOpen, onOpen, onClose } = useDisclosure();

  const addMovieModal = useDisclosure();
  const updateMovieModal = useDisclosure();
  const deleteMovieModal = useDisclosure();

  useEffect(() => {
    addMovieModal.onClose();
    updateMovieModal.onClose();
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
      <Button className="add-button" onClick={addMovieModal.onOpen}>
        Add Movies
      </Button>
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
                      setMovieData(movie._id);
                      console.log('here is the genre', movie.genre);
                      setSelectedMovie({
                        title: movie.title,
                        numberInStock: movie.numberInStock,
                        dailyRentalRate: movie.dailyRentalRate,
                        slug: movie.slug,
                        genre: movie.genre.name,
                        movieBanner: movie.movieBanner,
                      });
                      updateMovieModal.onOpen();
                      console.log(selectedMovie);
                    }}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button
                    className="delete-button"
                    onClick={() => {
                      setMovieData(movie._id);
                      deleteMovieModal.onOpen();
                    }}
                    leftIcon={<DeleteIcon />}
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
      {/* Modal : Edit movie component  */}
      <EditMovie
        isOpen={updateMovieModal.isOpen}
        onClose={updateMovieModal.onClose}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        movieData={movieData}
        handleEdit={(updatedMovie) => {
          console.log('here is the movie data sent', updatedMovie);
          handleEditMovie(movieData, updatedMovie);
        }}
        genres={genres}
        error={error}
        isloading={isloading}
      />
      {/* Modal: Delete movie */}
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
    </>
  );
};

export default Movies;
