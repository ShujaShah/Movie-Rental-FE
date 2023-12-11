import React, { useEffect, useState } from 'react';
import useUsers from '../../hooks/admin-hooks/useUsers';
import CreateUser from './CreateUser';
import AlertDelete from './AlertDelete';
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
  } = useUsers();

  const addUserModal = useDisclosure();
  const deleteUserModal = useDisclosure();

  const cancelRef = React.useRef();

  useEffect(() => {
    addUserModal.onClose(); //Close the modal after clicking on register
    deleteUserModal.onClose();
  }, [users, deleteUser]);

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
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
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
