import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme.js';
import './index.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import router from './routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);
