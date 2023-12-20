import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Spinner,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { TiShoppingCart } from 'react-icons/ti';
import { FaUsers } from 'react-icons/fa';
import { FaPhotoVideo } from 'react-icons/fa';
import { IoFilterCircleOutline } from 'react-icons/io5';

import useDashboard from '../../hooks/admin-hooks/useDashboard';

const Dashboard = () => {
  const { rentals, customers, isloading, movies, genres, error } =
    useDashboard();

  return (
    <>
      {isloading && <Spinner />}
      <Grid templateColumns="repeat(4, 1fr)" gap={30} mt={20}>
        <GridItem padding={5} className="dashboard-cards">
          <StatGroup>
            <Stat>
              <TiShoppingCart fontSize={50} />
              <StatLabel>Orders</StatLabel>
              <StatNumber>{rentals}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
              </StatHelpText>
            </Stat>
          </StatGroup>
        </GridItem>
        <GridItem w="60%" padding={5} className="dashboard-cards">
          <StatGroup>
            <Stat>
              <FaUsers fontSize={50} />
              <StatLabel>Customers</StatLabel>
              <StatNumber>{customers}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
              </StatHelpText>
            </Stat>
          </StatGroup>
        </GridItem>
        <GridItem padding={5} className="dashboard-cards">
          <StatGroup>
            <Stat>
              <FaPhotoVideo fontSize={50} />
              <StatLabel>Movies</StatLabel>
              <StatNumber>{movies}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
              </StatHelpText>
            </Stat>
          </StatGroup>
        </GridItem>
        <GridItem padding={5} className="dashboard-cards">
          <StatGroup>
            <Stat>
              <IoFilterCircleOutline fontSize={50} />

              <StatLabel>Genres</StatLabel>
              <StatNumber>{genres}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
              </StatHelpText>
            </Stat>
          </StatGroup>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
