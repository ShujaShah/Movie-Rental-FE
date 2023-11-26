import Login from '../components/Login';
import useUser from '../hooks/useUser';
import { Navigate, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  if (user) return navigate('/');
  return (
    <>
      <Login />
    </>
  );
}

export default LoginPage;
