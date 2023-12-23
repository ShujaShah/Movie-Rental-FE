import React, { useRef, useState } from 'react';
import {
  Button,
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

const CreateGenre = ({ isOpen, onClose, handleSubmitAdmin, isloading }) => {
  const [name, setName] = useState('');

  const initialRef = useRef();
  const finalRef = useRef();

  function handleName(e) {
    setName(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitAdmin(name);
    setName('');
  };

  return (
    <>
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
    </>
  );
};

export default CreateGenre;
