import React from 'react';
import Signup from '../components/Signup';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (user) return navigate('/');
  return (
    <>
      <Signup />
    </>
  );
};

export default SignupPage;
