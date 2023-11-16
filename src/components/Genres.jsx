import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient('/genres')
      .then((res) => setGenres(res.data))
      .catch((error) => setError(error.response.data));
  }, []);

  return (
    <>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Genres;
