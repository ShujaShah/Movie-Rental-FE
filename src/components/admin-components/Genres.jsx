import React from 'react';
import useGenre from '../../hooks/admin-hooks/useGenre';
import { useEffect, useState } from 'react';
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

  const [modifyGenre, setModifyGenre] = useState();
  const [selectedGenre, setSelectedGenre] = useState();

  // creating separate disclosures as we have to use more than one modal in this component..
  const addGenreModal = useDisclosure();
  const deleteGenreModal = useDisclosure();
  const editGenreModal = useDisclosure();

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
      <Button className="add-button" onClick={addGenreModal.onOpen}>
        Add Genre
      </Button>
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
                    onClick={() => {
                      setModifyGenre(genreItem._id);
                      setSelectedGenre(genreItem.name);
                      editGenreModal.onOpen();
                    }}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
                  <EditGenre
                    isOpen={editGenreModal.isOpen}
                    onClose={editGenreModal.onClose}
                    genreItem={genreItem}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    handleEdit={(updatedGenre) =>
                      handleEditGenre(modifyGenre, updatedGenre)
                    }
                    isloading={isloading}
                  />
                </Td>
                <Td>
                  <Button
                    className="delete-button"
                    onClick={() => {
                      setSelectedGenre(genreItem._id);
                      deleteGenreModal.onOpen();
                    }}
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
                      handleDelete={() => handleDelete(selectedGenre)}
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
