import React from 'react';
import useUser from '../hooks/useUser';
import { Spinner } from '@chakra-ui/react';

const Profile = () => {
  const { user } = useUser();
  if (!user) {
    return <Spinner />;
  }
  return (
    <>
      <h1>{user.profile.name}</h1>
      <h2>{user.profile.phone}</h2>
    </>
  );
};

export default Profile;
