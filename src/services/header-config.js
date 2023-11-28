const token = localStorage.getItem('x-auth-token');
export default headerConfig = {
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
};
