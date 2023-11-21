import { ToastContainer } from 'react-toastify';
import Login from '../components/Login';
import { useEffect, useState } from 'react';
import { Grid, GridItem, Show } from '@chakra-ui/react';
import '../App.css';
import NavBar from '../components/NavBar';
import MovieGrid from '../components/MovieGrid';
import Genres from '../components/Genres';
import useLogin from '../hooks/useLogin';
import apiClient from '../services/api-client';
import axios from 'axios';

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [user, setUser] = useState(null);

  const { result } = useLogin();
  console.log('here is the result', result);

  const token = localStorage.getItem('x-auth-token');
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = apiClient
      .get('/users/me', config)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .then((error) => console.error('Error:', error.response.data));
  }, [token]);

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, // greater than 1024
        }}
      >
        <GridItem area="nav">
          <NavBar onSearch={(search) => setSearchTerm(search)} user={user} />
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
