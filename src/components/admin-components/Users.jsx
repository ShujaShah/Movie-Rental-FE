import React, { useEffect, useState } from 'react';
import useUsers from '../../hooks/admin-hooks/useUsers';

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
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

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
  SignupReducer,
  registerInitialState,
} from '../../state-management/reducers/signupReducer';

const Users = () => {
  const { users, isloading, error, handleSubmitAdmin } = useUsers();

  //==================================================Create user logic==============================================================

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [state, dispatch] = React.useReducer(
    SignupReducer,
    registerInitialState
  );

  useEffect(() => {
    onClose(); //Close the modal after clicking on register
  }, [users]);

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
    await handleSubmitAdmin(state.email, state.name, state.password);
  };

  //=============================================End of Create user logic==============================================================

  if (!users) return <p>Login to see users...</p>;

  if (users.length === 0) return <p>No users found</p>;

  return (
    <>
      {isloading && <Spinner />}
      {error && <Spinner />}
      {/* <Button>Add User</Button> */}

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
                  {isloading ? <Spinner /> : 'Submit'}
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* <CreateUser /> */}
      <TableContainer pt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.createdAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
