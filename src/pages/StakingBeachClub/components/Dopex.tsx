import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

export const Dopex = () => {
  return (
    <Box
      height="380px"
      width="400px"
      p={5}
      bg="white"
      borderRadius="10px"
      filter="grayscale(70%)"
      pointerEvents={'none'}
    >
      <Text textAlign="center" fontWeight={'semibold'}>
        Get access to complex options strategies
      </Text>
      <Flex mt={2} justifyContent={'space-around'} alignItems={'center'}>
        <Image mt={2} src="./assets/png/dopex_logo.png" />
        <Text color="flamingo.500">Dancefloor</Text>
      </Flex>
      <Box position={'relative'}>
        <Image mt={3} src="./assets/png/dopex_dance.gif" />
      </Box>
    </Box>
  );
};
