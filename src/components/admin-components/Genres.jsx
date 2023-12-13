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

  const initialRef = useRef();
  const finalRef = useRef();

  const [updateGenre, setUpdateGenre] = useState([]);

  // used by delete genre for cancel button
  const cancelRef = React.useRef();

  const handleEdit = async (genreItem) => {
    await handleEditGenre(genreItem._id, updateGenre);
  };

  const handleDelete = async (genreItem) => {
    await handleDeleteGenre(genreItem);
  };

  function handleUpdateGenre(e) {
    setUpdateGenre(e.target.value);
  }

  const handleFormSubmit = async (e, genreItem) => {
    e.preventDefault();
    await handleEdit(genreItem);
    editGenreModal.onClose(); // Close the modal after submitting
  };

  useEffect(() => {
    addGenreModal.onClose(); //Close the modal after clicking on register
    deleteGenreModal.onClose(); // close the modal after clicking on delete
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
                    onSubmit={(e) => handleFormSubmit(e, genreItem)}
                    updateGenre={updateGenre}
                    handleUpdateGenre={handleUpdateGenre}
                    isloading={isloading}
                  />
                  {/* <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={editGenreModal.isOpen}
                    onClose={editGenreModal.onClose}
                  >
                    <ModalOverlay
                      bg="blackAlpha.300"
                      backdropFilter="blur(10px) hue-rotate(90deg)"
                    />
                    <ModalContent>
                      <ModalHeader>Edit Genre</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <form onSubmit={(e) => handleFormSubmit(e, genreItem)}>
                          <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                              type="text"
                              name="name"
                              value={updateGenre}
                              onChange={handleUpdateGenre}
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
                  </Modal> */}
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
