import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <HomePage />
        {/* <LoginPage /> */}
      </>
    </ThemeProvider>
  );
}

export default App;
