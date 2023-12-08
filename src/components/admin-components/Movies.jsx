import { React, useRef } from 'react';
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

const Movies = () => {
  const { movies, isLoading } = useMovies();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  function handleName(e) {
    setName(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitAdmin(name);
  };
  console.log('here are the movies data', movies);
  return (
    <>
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
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
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
