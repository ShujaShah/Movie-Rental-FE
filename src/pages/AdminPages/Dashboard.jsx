import { Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../../components/admin-components/sidebar';
import MovieGrid from '../../components/MovieGrid';

const Dashboard = () => {
  console.log('i am here');
  return (
    <Flex>
      {/* <Sidebar /> */}
      <MovieGrid />
    </Flex>
  );
};

export default Dashboard;
