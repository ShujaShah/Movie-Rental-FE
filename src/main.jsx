import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import theme from './theme.js';
import './index.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </React.StrictMode>
  </ChakraProvider>
);
