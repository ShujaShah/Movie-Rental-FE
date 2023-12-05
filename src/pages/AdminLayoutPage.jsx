import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin-components/sidebar';
import useUser from '../hooks/useUser';
import { Text } from '@chakra-ui/react';

const AdminLayoutPage = () => {
  const { user } = useUser();

  if (user?.role !== 'admin')
    return <Text>You donot have permission to view this page</Text>;
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '20px', flexGrow: 1 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayoutPage;
