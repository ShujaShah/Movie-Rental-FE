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
  AlertDialog,
} from '@chakra-ui/react';

import CreateGenre from './CreateGenre';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import AlertDelete from './AlertDelete';

const Genres = () => {
  const {
    genre,
    isloading,
    addGenre,
    handleGenreSubmit,
    handleDeleteGenre,
    del,
  } = useGenre();

  // creating separate disclosures as we have to use more than one modal in this component..
  const addGenreModal = useDisclosure();
  const deleteGenreModal = useDisclosure();

  // used by delete genre for cancel button
  const cancelRef = React.useRef();

  const handleDelete = async (genreItemId) => {
    await handleDeleteGenre(genreItemId);
    console.log('genre deleted successfully');
  };

  useEffect(() => {
    addGenreModal.onClose(); //Close the modal after clicking on register
    deleteGenreModal.onClose(); // close the modal after clicking on delete
  }, [addGenre, del]);

  if (!genre) return <p>No genres</p>;

  if (genre.length === 0) return <p>No Genres found</p>;

  return (
    <>
      <Button onClick={addGenreModal.onOpen}>Add Genre</Button>
      <CreateGenre
        isOpen={addGenreModal.isOpen}
        onClose={addGenreModal.onClose}
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
                    colorScheme="red"
                    onClick={deleteGenreModal.onOpen}
                    leftIcon={<DeleteIcon />}
                    variant="solid"
                  >
                    Delete
                  </Button>
                  <AlertDialog
                    isOpen={deleteGenreModal.isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={deleteGenreModal.onClose}
                  >
                    {/* create a custom component for alert dialogue for delete genre */}
                    <AlertDelete
                      isOpen={deleteGenreModal.isOpen}
                      onClose={deleteGenreModal.onClose}
                      handleDelete={() => handleDelete(genreItem._id)}
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

export default Genres;
