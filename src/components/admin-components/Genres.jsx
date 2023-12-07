import React from 'react';
import useGenre from '../../hooks/admin-hooks/useGenre';
import { useEffect, useState, useRef } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
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
} from '@chakra-ui/react';

// import CreateGenre from './CreateGenre';

const Genres = () => {
  const { genre, isloading, error, addGenre, handleGenreSubmit } = useGenre();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose(); //Close the modal after clicking on register
  }, [addGenre]);

  //===================================embedding the Genre Component code here for sometime====================================
  const [name, setName] = useState('');

  const initialRef = useRef();
  const finalRef = useRef();

  function handleName(e) {
    setName(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleGenreSubmit(name);
  };

  if (!genre) return <p>No genres</p>;

  if (genre.length === 0) return <p>No Genres found</p>;

  return (
    <>
      <Button onClick={onOpen}>Add Genre</Button>
      {/* <CreateGenre
        isOpen={isOpen}
        onClose={onClose}
        handleSubmitAdmin={handleGenreSubmit}
        isloading={isloading}
      /> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Genres</ModalHeader>
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
                  mt={4}
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
      {isloading && <Spinner />}
      {error && <p>Something went wrong</p>}

      <TableContainer pt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Genres</Th>
              <Th>ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {genre.map((genreItem) => (
              <Tr key={genreItem?._id}>
                <Td>{genreItem?.name}</Td>
                <Td>{genreItem?._id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Genres;
