import { useParams } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import {
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  Spinner,
  Button,
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import useUser from '../hooks/useUser';

const MovieDetailsPage = () => {
  const { _id } = useParams();

  const { onSearch, user, HandleLogout, HandleProfile } = useUser();

  const { movie, error, loading, handleRental } = useMovie(_id);

  const handleRentNow = async () => {
    await handleRental();
  };

  return (
    <>
      <NavBar
        onSearch={onSearch}
        user={user}
        HandleLogout={HandleLogout}
        HandleProfile={HandleProfile}
      />
      {loading && <Spinner />}
      {error && <Spinner />}
      <Grid margin={10} templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem>
          <Image src={movie.movieBanner} width={300} />
        </GridItem>

        <GridItem colSpan={2}>
          <Heading>{movie.title}</Heading>
          <Text>Genre: {movie.genre?.name}</Text>
          <Text>Number in Stock: {movie.numberInStock}</Text>
          <Text>Daily Rental Rate: ${movie.dailyRentalRate}.00</Text>
          <Button mt={5} variant="outline" onClick={handleRentNow}>
            Rent Now
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};

export default MovieDetailsPage;
