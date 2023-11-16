import { Button, ButtonGroup, Grid, GridItem, Show } from '@chakra-ui/react';
import './App.css';
import NavBar from './components/NavBar';
import MovieGrid from './components/MovieGrid';

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
          <GridItem area="aside">Sidebar</GridItem>
        </Show>
        <GridItem area="main">
          <MovieGrid />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
