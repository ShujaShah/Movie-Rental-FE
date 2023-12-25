import React from 'react';
import useUpdateUser from '../hooks/useUpdateUser';
import useUser from '../hooks/useUser';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  HStack,
  Box,
} from '@chakra-ui/react';

const RentalList = () => {
  const { user } = useUser();
  const _id = user?.profile._id;
  const { rentals } = useUpdateUser(_id);
  console.log(rentals);

  if (!user) return <p>Login to check your rentals</p>;

  if (rentals.length === 0) return <p>No Rentals found</p>;

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Rentals</TableCaption>
          <Thead>
            <Tr>
              <Th>Movie Title</Th>
              <Th>Genre</Th>
              <Th>Daily Rental</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rentals.map((rentals) => (
              <Tr key={rentals._id}>
                <Td>
                  <HStack>
                    <Box>
                      {' '}
                      <Image
                        src={rentals.movie.movieBanner}
                        height={10}
                        width={10}
                      />
                    </Box>
                    <Box>{rentals.movie.title}</Box>
                  </HStack>
                </Td>
                <Td>{rentals.movie.genre?.name}</Td>
                <Td>{rentals.movie.dailyRentalRate}</Td>
                <Td>{rentals.dateOut}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RentalList;
