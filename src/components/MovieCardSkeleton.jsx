import {
  Card,
  Box,
  SkeletonCircle,
  CardBody,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const MovieCardSkeleton = () => {
  return (
    <Card width="300px" borderRadius={10} overflow="hidden">
      <Skeleton height="400px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default MovieCardSkeleton;
