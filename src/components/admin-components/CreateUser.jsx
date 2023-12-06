import React, { useRef, useReducer } from 'react';
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

import {
  SignupReducer,
  registerInitialState,
} from '../../state-management/reducers/signupReducer';

const CreateUser = ({ isOpen, onClose, handleSubmitAdmin, isloading }) => {
  const initialRef = useRef();
  const finalRef = useRef();

  const [state, dispatch] = useReducer(SignupReducer, registerInitialState);

  function handleEmail(e) {
    dispatch({ type: 'SET_EMAIL', payload: e.target.value });
  }

  function handlePassword(e) {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  }

  function handleName(e) {
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitAdmin(state.email, state.name, state.password);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleFormSubmit}>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleEmail}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleName}
                />
              </FormControl>
              <FormControl mt={4} mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handlePassword}
                />
              </FormControl>
              <FormControl>
                <Button
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

export default CreateUser;
