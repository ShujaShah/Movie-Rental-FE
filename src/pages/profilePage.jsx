import React from 'react';
import Profile from '../components/Profile';
import NavBar from '../components/NavBar';
import useUser from '../hooks/useUser';

const ProfilePage = () => {
  const { onSearch, user, HandleLogout, HandleProfile } = useUser();
  return (
    <>
      <NavBar
        onSearch={onSearch}
        user={user}
        HandleLogout={HandleLogout}
        HandleProfile={HandleProfile}
      />
      <Profile />
    </>
  );
};

export default ProfilePage;
