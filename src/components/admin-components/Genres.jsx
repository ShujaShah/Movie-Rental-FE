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
import EditGenre from './EditGenre';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import AlertDelete from './AlertDelete';

const Genres = () => {
  const {
    genre,
    isloading,
    addGenre,
    handleGenreSubmit,
    handleEditGenre,
    handleDeleteGenre,
    del,
    editGenre,
  } = useGenre();

  // creating separate disclosures as we have to use more than one modal in this component..
  const addGenreModal = useDisclosure();
  const deleteGenreModal = useDisclosure();
  const editGenreModal = useDisclosure();

  const [updateGenre, setUpdateGenre] = useState([]);

  // used by delete genre for cancel button
  const cancelRef = React.useRef();

  const handleDelete = async (genreItem) => {
    await handleDeleteGenre(genreItem);
  };

  useEffect(() => {
    addGenreModal.onClose(); //Close the modal after clicking on register
    deleteGenreModal.onClose(); // close the modal after clicking on delete
    editGenreModal.onClose();
  }, [addGenre, del, editGenre]);

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
                    onClick={() => {
                      setUpdateGenre(genreItem.name);
                      editGenreModal.onOpen();
                    }}
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
                  <EditGenre
                    isOpen={editGenreModal.isOpen}
                    onClose={editGenreModal.onClose}
                    genreItem={genreItem}
                    handleEdit={(updatedGenre) =>
                      handleEditGenre(genreItem._id, updatedGenre)
                    }
                    isloading={isloading}
                  />
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
