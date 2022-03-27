import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export const PoolSide = () => (
  <Box height="600px" width="1000px" p={5} bg="white" borderRadius="10px" filter="grayscale(70%)" pointerEvents={'none'}>
    <Box
      bgImage="url('./assets/png/pool_side.png')"
      bgPosition="center"
      bgRepeat="no-repeat"
      height="100%"
      bgSize="cover"
      position="relative"
    >
      <Button fontSize="14px" color="flamingo.500" bg="white" top="20px" right="48%" position="absolute">
        Pool side
      </Button>
      <Flex
        justifyContent="space-between"
        alignItems={'center'}
        bg="white"
        opacity="0.7"
        height="70px"
        width="250px"
        position={'absolute'}
        bottom="20px"
        right="40%"
        borderRadius="10px"
        px={5}
      >
        <Text fontWeight={'600'}>Total APR</Text>
        <Text fontWeight={'600'}>40%</Text>
      </Flex>
    </Box>
  </Box>
);
