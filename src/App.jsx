import { Button, ButtonGroup, Grid, GridItem, Show } from '@chakra-ui/react';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, // greater than 1024
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" bg="green">
            Sidebar
          </GridItem>
        </Show>
        <GridItem area="main" bg="blue">
          Main area
        </GridItem>
      </Grid>
      {/* <HomePage /> */}
      {/* <LoginPage /> */}
    </>
  );
}

export default App;
