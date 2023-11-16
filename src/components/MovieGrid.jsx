import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/movies')
      .then((res) => {
        console.log(res);
        setMovies(res.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, []);

  return (
    <>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default MovieGrid;
