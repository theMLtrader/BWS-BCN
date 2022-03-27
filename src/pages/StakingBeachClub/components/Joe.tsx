import React from 'react';
import {Box, Image, Text} from '@chakra-ui/react';

export const Joe = () => {
  return (
    <Box
      height="300px"
      width="300px"
      p={5}
      bg="white"
      borderRadius="10px"
      filter="grayscale(70%)"
      pointerEvents={'none'}
    >
      <Text textAlign="center" fontWeight={'semibold'}>
        Joe's "double reward" lifeguard
      </Text>
      <Image loading="lazy" mt={3} src="./assets/png/joe_bodyguard.png" />
    </Box>
  );
};
