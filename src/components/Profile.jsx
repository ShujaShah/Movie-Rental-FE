import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import { Spinner } from '@chakra-ui/react';
import {
  HStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import useUpdateUser from '../hooks/useUpdateUser';

const Profile = () => {
  const { user } = useUser();

  const _id = user?.profile._id;
  const { handleSubmit, initialUser, isLoading } = useUpdateUser(_id);

  const initialEmail = initialUser?.email;
  const initialName = initialUser?.name;
  const initialPhone = initialUser?.phone;

  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  console.log('update email:', initialUser?.email);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePhone(e) {
    setPhone(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, name, phone);
  };

  if (!user) return <p>Login to view your profile</p>;

  return (
    <>
      {isLoading && <Spinner />}
      <HStack>
        <Box width={300} ml={5}>
          <Heading as="h1" fontSize="25px">
            {' '}
            Account Details
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                defaultValue="shuja.shah@iquasar.com"
                value={email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                defaultValue={initialName}
                value={name}
                onChange={handleName}
              />
            </FormControl>
            <FormControl mt={4} mb={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                type="number"
                defaultValue={initialPhone}
                name="phone"
                value={phone}
                onChange={handlePhone}
              />
            </FormControl>
            <FormControl>
              <Button
                variant="outline"
                border="1px solid #8d2dab"
                type="submit"
              >
                {isLoading ? <Spinner /> : 'Update'}
              </Button>
            </FormControl>
          </form>{' '}
        </Box>
      </HStack>
    </>
  );
};

export default Profile;
