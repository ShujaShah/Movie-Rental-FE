import React, { useEffect, useState } from 'react';
import useUsers from '../../hooks/admin-hooks/useUsers';
import CreateUser from './CreateUser';
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
} from '@chakra-ui/react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Users = () => {
  const { users, isloading, error, handleSubmitAdmin } = useUsers();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose(); //Close the modal after clicking on register
  }, [users]);

  if (!users) return <p>Login to see users...</p>;

  if (users.length === 0) return <p>No users found</p>;

  return (
    <>
      {isloading && <Spinner />}
      {error && <p>Something went wrong...</p>}
      <Button onClick={onOpen}>Add User</Button>
      <CreateUser
        isOpen={isOpen}
        onClose={onClose}
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
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="solid"
                  >
                    Delete
                  </Button>
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
