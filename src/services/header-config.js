const token = localStorage.getItem('x-auth-token');
const headerConfig = {
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
};

export default headerConfig;
