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
} from '@chakra-ui/react';

import CreateGenre from './CreateGenre';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Genres = () => {
  const { genre, isloading, addGenre, handleGenreSubmit } = useGenre();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose(); //Close the modal after clicking on register
  }, [addGenre]);

  if (!genre) return <p>No genres</p>;

  if (genre.length === 0) return <p>No Genres found</p>;

  return (
    <>
      <Button onClick={onOpen}>Add Genre</Button>
      <CreateGenre
        isOpen={isOpen}
        onClose={onClose}
        handleSubmitAdmin={handleGenreSubmit}
        isloading={isloading}
      />

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

export default Genres;
