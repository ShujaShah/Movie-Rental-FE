import React, { useEffect, useState } from 'react';
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

  const addUserModal = useDisclosure();
  const updateUserModal = useDisclosure();
  const deleteUserModal = useDisclosure();

  const cancelRef = React.useRef();

  useEffect(() => {
    addUserModal.onClose(); //Close the modal after clicking on register
    deleteUserModal.onClose();
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
                  <EditUser
                    isOpen={updateUserModal.isOpen}
                    onClose={updateUserModal.onClose}
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    handleEdit={(updatedUser) => {
                      handleEditUser(editUser, updatedUser);
                      console.log(
                        'here is the selected user data:',
                        selectedUser
                      );
                    }}
                    isloading={isloading}
                  />
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
