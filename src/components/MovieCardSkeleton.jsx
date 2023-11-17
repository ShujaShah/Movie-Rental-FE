import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react';
import React from 'react';

const MovieCardSkeleton = () => {
  return (
    <Card width="300px" borderRadius={10} overflow="hidden">
      <Skeleton height="400px" startColor="#dc52fb" endColor="#614eeb">
        <CardBody>
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </CardBody>
      </Skeleton>
    </Card>
  );
};

export default MovieCardSkeleton;
