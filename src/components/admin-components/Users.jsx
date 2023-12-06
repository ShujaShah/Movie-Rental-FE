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
} from '@chakra-ui/react';
import CreateUser from './CreateUser';
import useSignup from '../../hooks/useSignup';

const Users = () => {
  const { users } = useUsers();
  const { loading, error } = useSignup();

  if (!users) return <p>Login to see users...</p>;

  if (users.length === 0) return <p>No users found</p>;

  return (
    <>
      {loading && <Spinner />}
      {error && <Spinner />}
      {/* <Button>Add User</Button> */}
      <CreateUser />
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
