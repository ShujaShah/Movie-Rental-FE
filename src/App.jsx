import './App.css';
import Home from './pages/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Home />
      </>
    </ThemeProvider>
  );
}

export default App;
