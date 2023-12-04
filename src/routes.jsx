import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import LayoutPage from './pages/LayoutPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import RentalsPage from './pages/RentalsPage';
import Dashboard from './pages/AdminPages/Dashboard';
import AdminLayoutPage from './pages/AdminLayoutPage';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movies/:_id', element: <MovieDetailPage /> },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <SignupPage />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: 'rentals',
    element: <RentalsPage />,
  },
  {
    path: 'admin-dashboard',
    element: <AdminLayoutPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);

export default router;
