import { React, useEffect, useRef, useState } from 'react';
import useMovies from '../../hooks/useMovies';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
  Select,
} from '@chakra-ui/react';

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
import useGenre from '../../hooks/admin-hooks/useGenre';
import useAddMovie from '../../hooks/admin-hooks/useAddMovie';

const Movies = () => {
  const { movies, isLoading } = useMovies();
  const { genre } = useGenre();

  const [movieData, setMovieData] = useState({
    title: '',
    numberInStock: '',
    dailyRentalRate: '',
    slug: '',
    genre: '',
    movieBanner: '',
  });

  const { isloading, error, handleAdminSubmit, createMovie } = useAddMovie();

  //=========================================use below code for custom component=================================//
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose();
  }, [createMovie]);

  const initialRef = useRef();
  const finalRef = useRef();

  function handleMovieData(e) {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleAdminSubmit(movieData);
  };

  //==========================================end of code============================================================
  return (
    <>
      {isloading && <Spinner />}
      {error && <p>Something went wrong</p>}
      <Button onClick={onOpen}>Add Movies</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Enter Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleFormSubmit}>
              <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={movieData.title}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Slug</FormLabel>
                <Input
                  type="text"
                  name="slug"
                  value={movieData.slug}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                  type="number"
                  name="numberInStock"
                  value={movieData.numberInStock}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Rent</FormLabel>
                <Input
                  type="number"
                  name="dailyRentalRate"
                  value={movieData.dailyRentalRate}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Genre</FormLabel>
                <Select
                  placeholder="Select Genre"
                  onChange={(e) => handleMovieData(e)}
                  name="genre"
                  value={movieData.genre}
                >
                  {genre.map((genreItem) => (
                    <option key={genreItem._id} value={genreItem._id}>
                      {genreItem.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Banner</FormLabel>
                <Input
                  type="text"
                  name="movieBanner"
                  value={movieData.movieBanner}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl>
                <Button
                  mt={5}
                  variant="outline"
                  border="1px solid #8d2dab"
                  type="submit"
                >
                  {isLoading ? <Spinner /> : 'Submit'}
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
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
            {movies.map((movie) => (
              <Tr key={movie._id}>
                <Td>{movie.title}</Td>
                <Td>{movie.genre.name}</Td>
                <Td>{movie.numberInStock}</Td>
                <Td>{movie.dailyRentalRate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Movies;
