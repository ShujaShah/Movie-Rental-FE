import React from 'react';
import NavBar from '../components/NavBar';
import useUser from '../hooks/useUser';
import RentalList from '../components/RentalList';

const RentalsPage = () => {
  const { onSearch, user, HandleLogout, HandleProfile } = useUser();
  return (
    <>
      <NavBar
        onSearch={onSearch}
        user={user}
        HandleLogout={HandleLogout}
        HandleProfile={HandleProfile}
      />
      <RentalList />
    </>
  );
};

export default RentalsPage;
