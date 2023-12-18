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

const EditMovie = ({
  isOpen,
  onClose,
  handleEditSubmit,
  handleEdit,
  isloading,
  error,
  movieData,
  selectedMovie,
  setSelectedMovie,
}) => {
  const { genre } = useGenre();

  const initialRef = useRef();
  const finalRef = useRef();

  function handleMovieData(e) {
    setSelectedMovie((prevMovie) => ({
      ...prevMovie,
      [e.target.name]: e.target.value,
    }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleEdit(selectedMovie);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
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
                  value={selectedMovie?.title}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Slug</FormLabel>
                <Input
                  type="text"
                  name="slug"
                  value={selectedMovie?.slug}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                  type="number"
                  name="numberInStock"
                  value={selectedMovie?.numberInStock}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Rent</FormLabel>
                <Input
                  type="number"
                  name="dailyRentalRate"
                  value={selectedMovie.dailyRentalRate}
                  onChange={handleMovieData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Genre</FormLabel>
                <Select
                  placeholder="Select Genre"
                  onChange={(e) => handleMovieData(e)}
                  name="genre"
                  value={genre?.name}
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
                  value={selectedMovie?.movieBanner}
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

export default EditMovie;
