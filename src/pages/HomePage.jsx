import { useState } from 'react';
import { Grid, GridItem, Show } from '@chakra-ui/react';
import '../App.css';
import NavBar from '../components/NavBar';
import MovieGrid from '../components/MovieGrid';
import Genres from '../components/Genres';
import useUser from '../hooks/useUser';

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { user, HandleLogout, isloading, HandleProfile } = useUser();

  console.log('here is the user....', user);

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, // greater than 1024
        }}
      >
        <GridItem area="nav">
          <NavBar
            onSearch={(search) => setSearchTerm(search)}
            user={user}
            HandleLogout={HandleLogout}
            HandleProfile={HandleProfile}
            isloading={isloading}
          />
        </GridItem>
        <Show above="lg">
          <GridItem
            area="aside"
            padding="2rem"
            margin="1rem"
            border="1px solid"
            borderRadius={20}
          >
            <Genres
              onSelectGenre={(genre) => setSelectedGenre(genre)}
              selectedGenre={selectedGenre}
            />
          </GridItem>
        </Show>
        <GridItem area="main">
          <MovieGrid selectedGenre={selectedGenre} setSearchTerm={searchTerm} />
        </GridItem>
      </Grid>
    </>
  );
}

export default HomePage;
