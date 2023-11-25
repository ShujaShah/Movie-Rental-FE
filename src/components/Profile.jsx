import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import { GridItem, Spinner, Grid } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
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

  const [isFormDisabled, setIsFormDisabled] = useState(true);

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
  const handleEditClick = () => {
    setIsFormDisabled(false);
  };

  if (!user) return <p>Login to view your profile</p>;

  return (
    <>
      {isLoading && <Spinner />}
      <HStack>
        <Box width={350} ml={5}>
          <Grid templateColumns="repeat(2, 1fr)" gap={1}>
            <GridItem width="100%">
              {' '}
              <Heading as="h1" fontSize="25px">
                Account Details
              </Heading>
            </GridItem>
            <GridItem>
              {' '}
              <Button style={{ textAlign: 'right' }} onClick={handleEditClick}>
                <EditIcon />
              </Button>
            </GridItem>
          </Grid>
          <form onSubmit={handleFormSubmit}>
            <fieldset disabled={isFormDisabled}>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder={initialEmail}
                  value={email}
                  onChange={handleEmail}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder={initialName}
                  value={name}
                  onChange={handleName}
                />
              </FormControl>
              <FormControl mt={4} mb={4}>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="number"
                  placeholder={initialPhone}
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
            </fieldset>
          </form>{' '}
        </Box>
      </HStack>
    </>
  );
};

export default Profile;
