import React, { useEffect } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from '@chakra-ui/react';
import {
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

import useSignup from '../../hooks/useSignup';
import {
  SignupReducer,
  registerInitialState,
} from '../../state-management/reducers/signupReducer';

const CreateUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [state, dispatch] = React.useReducer(
    SignupReducer,
    registerInitialState
  );

  const { handleSubmit, register, handleSubmitAdmin, isLoading, usersData } =
    useSignup();

  useEffect(() => {
    console.log('user registered successfullyyyy.....');
    onClose(); //Close the modal after clicking on register
  }, [register]);

  function handleEmail(e) {
    //setEmail(e.target.value);
    dispatch({ type: 'SET_EMAIL', payload: e.target.value });
  }

  function handlePassword(e) {
    //setPassword(e.target.value)
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  }

  function handleName(e) {
    //setName(e.target.value)
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //handleSubmitAdmin(state.email, state.name, state.password);
    await handleSubmit(state.email, state.name, state.password);
  };

  return (
    <>
      <Button onClick={onOpen}>Add User</Button>
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
                  {isLoading ? <Spinner /> : 'Submit'}
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
