import apiClient from '../services/api-client';

const useLogin = () => {
  const handleSubmit = (email, password) => {
    const res = apiClient
      .post('/auth', { email, password })
      .then((res) => {
        console.log('Response is : ', res.data);
        toast('Success');
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        toast(`Error: ${error.response.data}`);
      });
  };
  return { handleSubmit };
};

export default useLogin;
