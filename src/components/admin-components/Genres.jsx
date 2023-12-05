import React from 'react';
import useGenres from '../../hooks/useGenres';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';

const Genres = () => {
  const { genres } = useGenres();

  return (
    <>
      <Button>Add Genre</Button>
      <TableContainer pt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Genres</Th>
              <Th>ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {genres.map((genre) => (
              <Tr key={genre._id}>
                <Td>{genre.name}</Td>
                <Td>{genre._id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Genres;
