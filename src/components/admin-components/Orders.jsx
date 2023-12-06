import React from 'react';
import useRentals from '../../hooks/admin-hooks/useRentals';
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

const Orders = () => {
  const { rentals } = useRentals();
  console.log('here are the rentals', rentals);

  if (rentals.length === 0) return <p>No users found</p>;
  return (
    <>
      <TableContainer pt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Movie</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rentals.rentals.map((rental) => (
              <Tr key={rental._id}>
                <Td>{rental.customer.name}</Td>
                <Td>{rental.customer.email}</Td>
                <Td>{rental.customer.phone}</Td>
                <Td>{rental.movie.title}</Td>
                <Td>{rental.dateOut}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
