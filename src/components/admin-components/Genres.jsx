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
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
} from '@chakra-ui/react';

import CreateGenre from './CreateGenre';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Genres = () => {
  const {
    genre,
    isloading,
    addGenre,
    handleGenreSubmit,
    handleDeleteGenre,
    del,
  } = useGenre();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addGenreModal = useDisclosure();
  const deleteGenreModal = useDisclosure();

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
                    onClick={() => handleDelete(genreItem._id)}
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="solid"
                  >
                    Delete
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
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Delete
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(genreItem._id)}
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
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
