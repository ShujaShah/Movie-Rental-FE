import React from 'react';
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
  onSubmit,
  updateGenre,
  handleUpdateGenre,
  isloading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Edit Genre</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={onSubmit}>
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
    </Modal>
  );
};

export default EditGenre;
