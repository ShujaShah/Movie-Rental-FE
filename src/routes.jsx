import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import LayoutPage from './pages/LayoutPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

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
    path: 'signup',
    element: <SignupPage />,
  },
]);

export default router;
