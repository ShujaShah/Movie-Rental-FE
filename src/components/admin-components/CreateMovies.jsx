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
  Button,
  Select,
} from '@chakra-ui/react';

import { useState, useRef } from 'react';
import useGenre from '../../hooks/admin-hooks/useGenre';

const CreateMovies = ({
  isOpen,
  onClose,
  handleAdminSubmit,
  isloading,
  error,
}) => {
  const { genre } = useGenre();

  const [movieData, setMovieData] = useState({
    title: '',
    numberInStock: '',
    dailyRentalRate: '',
    slug: '',
    genre: '',
    movieBanner: '',
  });
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
    setMovieData({
      title: '',
      numberInStock: '',
      dailyRentalRate: '',
      slug: '',
      genre: '',
      movieBanner: '',
    });
  };

  return (
    <>
      {isloading && <Spinner />}
      {error && <p>Something went wrong</p>}

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
                  {isloading ? <Spinner /> : 'Submit'}
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateMovies;
