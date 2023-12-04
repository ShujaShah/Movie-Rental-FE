import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin-components/sidebar';

const AdminLayoutPage = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '20px', flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayoutPage;
