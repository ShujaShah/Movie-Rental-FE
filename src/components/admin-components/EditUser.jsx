import React, { useState, useEffect, useRef } from 'react';
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

const EditUser = ({
  isOpen,
  onClose,
  handleEdit,
  isloading,
  user,
  selectedUser,
  setSelectedUser,
}) => {
  const initialRef = useRef();
  const finalRef = useRef();

  const handleUserData = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('here is the data from edit component ', selectedUser);
    await handleEdit(selectedUser);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalRef={finalRef}
      isOpen={isOpen}
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
          <form onSubmit={handleFormSubmit}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={selectedUser?.name}
                onChange={handleUserData}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={selectedUser?.email}
                onChange={handleUserData}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                // value={selectedUser?.password}
                placeholder={'password'}
                onChange={handleUserData}
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

export default EditUser;
