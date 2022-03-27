import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export const CocktailBar = () => {
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
      <Box
        bgImage="url('./assets/png/cocktail_bar.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
        height="100%"
        bgSize="cover"
        position="relative"
      >
        <Button size="sm" color="flamingo.500" bg="white" position="absolute" top={'20px'} right="30%">
          Cocktail Bar
        </Button>
        <Flex
          justifyContent="space-between"
          alignItems={'center'}
          bg="white"
          opacity="0.7"
          height="70px"
          width="200px"
          position={'absolute'}
          bottom="20px"
          right="11%"
          borderRadius="10px"
          px={5}
        >
          <Text fontWeight={'600'}>Total APR</Text>
          <Text fontWeight={'600'}>30%</Text>
        </Flex>
      </Box>
    </Box>
  );
};
