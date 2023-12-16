import React, { useEffect, useState, useRef } from 'react';
import useUsers from '../../hooks/admin-hooks/useUsers';
import CreateUser from './CreateUser';
import AlertDelete from './AlertDelete';
import EditUser from './EditUser';
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
  Spinner,
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
} from '@chakra-ui/react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Users = () => {
  const {
    users,
    isloading,
    error,
    handleSubmitAdmin,
    deleteUser,
    handleDeleteUser,
    handleEditUser,
    updateUser,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [editUser, setEditUser] = useState({});

  //=================================================start of edit user code====================================================

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialRef = useRef();
  const finalRef = useRef();

  // const handleUserData = (e) => {
  //   setSelectedUser({
  //     ...selectedUser,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFormEditSubmit = async (e) => {
    e.preventDefault();
    console.log('here is the data from edit component ', selectedUser);
    await handleEditUser(editUser, name, email, password);
  };
  //===================================================end of edit user===============================================
  const addUserModal = useDisclosure();
  const updateUserModal = useDisclosure();
  const deleteUserModal = useDisclosure();

  const cancelRef = React.useRef();

  useEffect(() => {
    addUserModal.onClose(); //Close the modal after clicking on register
    deleteUserModal.onClose();
    updateUserModal.onClose();
  }, [users, deleteUser, updateUser]);

  const handleDelete = async (userId) => {
    await handleDeleteUser(userId);
  };

  if (!users) return <p>Login to see users...</p>;

  if (users.length === 0) return <p>No users found</p>;

  return (
    <>
      {isloading && <Spinner />}
      {error && <p>Something went wrong...</p>}
      <Button onClick={addUserModal.onOpen}>Add User</Button>
      <CreateUser
        isOpen={addUserModal.isOpen}
        onClose={addUserModal.onClose}
        handleSubmitAdmin={handleSubmitAdmin}
        isloading={isloading}
      />

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
                <Td>
                  <Button
                    onClick={() => {
                      console.log(user._id);
                      setEditUser(user._id);
                      setSelectedUser({
                        name: user.name,
                        email: user.email,
                        password: user.password,
                      });
                      updateUserModal.onOpen();
                    }}
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
                  {/* <EditUser
                    isOpen={updateUserModal.isOpen}
                    onClose={updateUserModal.onClose}
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    handleEdit={(updatedUser) => {
                      handleEditUser(editUser, updatedUser); // edit user sends the id and updated user sends the entire user
                      console.log(
                        'here is the selected user data:',
                        selectedUser
                      );
                    }}
                    isloading={isloading}
                  /> */}
                  <Modal
                    initialFocusRef={initialRef}
                    finalRef={finalRef}
                    isOpen={updateUserModal.isOpen}
                    onClose={() => {
                      setSelectedUser({
                        name: user?.name,
                        email: user?.email,
                        password: user?.password,
                      });
                      onClose();
                    }}
                  >
                    <ModalOverlay
                      bg="blackAlpha.300"
                      backdropFilter="blur(10px) hue-rotate(90deg)"
                    />
                    <ModalContent>
                      <ModalHeader>Edit User</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <form onSubmit={handleFormEditSubmit}>
                          <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                              type="text"
                              name="name"
                              //value={selectedUser?.name}
                              onChange={handleName}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input
                              type="email"
                              name="email"
                              // value={selectedUser?.email}
                              onChange={handleEmail}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                              type="password"
                              name="password"
                              // value={selectedUser?.password}
                              placeholder={'password'}
                              onChange={handlePassword}
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
                </Td>

                <Td>
                  <Button
                    colorScheme="red"
                    onClick={deleteUserModal.onOpen}
                    leftIcon={<DeleteIcon />}
                    variant="solid"
                  >
                    Delete
                  </Button>
                  <AlertDialog
                    isOpen={deleteUserModal.isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={deleteUserModal.onClose}
                  >
                    <AlertDelete
                      isOpen={deleteUserModal.isOpen}
                      onClose={deleteUserModal.onClose}
                      handleDelete={() => handleDelete(user._id)}
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

export default Users;
