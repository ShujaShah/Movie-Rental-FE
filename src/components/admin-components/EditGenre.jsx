import React, { useState, useEffect, useRef } from 'react';
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
  Button,
  Spinner,
} from '@chakra-ui/react';

const EditGenre = ({
  isOpen,
  onClose,
  handleEdit,
  isloading,
  genreItem,
  selectedGenre,
}) => {
  const initialRef = useRef();
  const finalRef = useRef();

  const [updateGenre, setUpdateGenre] = useState(selectedGenre);

  const handleUpdateGenre = (e) => {
    setUpdateGenre(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleEdit(updateGenre);
    console.log('from the EditGenre Component:', updateGenre);
  };

  useEffect(() => {
    setUpdateGenre(genreItem.name);
  }, [genreItem.name]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        setUpdateGenre(genreItem.name);
        onClose();
      }}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Edit Genre</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleFormSubmit}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder={selectedGenre}
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
    </Modal>
  );
};

export default EditGenre;
