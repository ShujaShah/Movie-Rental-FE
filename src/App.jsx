import './App.css';
import LoginPage from './pages/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <LoginPage />
      </>
    </ThemeProvider>
  );
}

export default App;
