import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { useToast } from '@chakra-ui/react';

const useUser = () => {
  const toast = useToast();
  const [isloading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [register, setRegister] = useState({});
  const [error, setError] = useState('');
  const [deleteUser, setDelUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});

  const token = localStorage.getItem('x-auth-token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const handleSubmitAdmin = (email, name, password) => {
    setIsLoading(true);
    const res = apiClient
      .post('/users', { email, name, password })
      .then((res) => {
        console.log('Response is : ', res.data);
        setRegister(res.data);
        setIsLoading(false);
        toast({
          title: 'Success',
          description: 'User Created successfully...',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: `${error.response.data}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleEditUser = (_id, email, name, password) => {
    setIsLoading(true);
    const res = apiClient
      .patch(`/users/${_id}`, { email, name, password }, config)
      .then((res) => {
        console.log('here is an updated user from hook', name);
        setUpdateUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: `${error.response.data}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleDeleteUser = (_id) => {
    setIsLoading(true);
    const res = apiClient
      .delete(`/users/${_id}`, config)
      .then((res) => {
        console.log('here is the deleted user', res.data);
        setDelUser(res.data);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred'); // response other than 200
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const res = apiClient
      .get('/users', config)
      .then((res) => {
        setUsers(res.data);
        console.log('here is the users data', res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
        console.error('Error:', error?.response?.data);
      });
  }, [register, deleteUser, updateUser]);

  return {
    users,
    isloading,
    register,
    deleteUser,
    handleSubmitAdmin,
    handleDeleteUser,
    error,
    updateUser,
    handleEditUser,
  };
};

export default useUser;
