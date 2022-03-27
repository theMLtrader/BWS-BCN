import React from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { ImageWithRedButton } from 'components/ImageWithRedButton';

export const BeachArea = () => (
  <Box p={5} borderRadius="10px" width="1000px" height="600px" bg="white" filter="grayscale(70%)" pointerEvents={'none'}>
    <Box
      bgImage="url('./assets/png/level_1.png')"
      bgPosition="center"
      bgRepeat="no-repeat"
      height="100%"
      bgSize="cover"
      position="relative"
    >
      <Button fontSize="14px" position="absolute" top="20px" right="45%" color="flamingo.500" bg="white">
        Beach area
      </Button>
      <Image height="400px" src="./assets/png/level_1_girls.png" position="absolute" bottom="0px" right="30%" />
      <Box position="absolute" bottom="20px" left="20%">
        <ImageWithRedButton src="./assets/png/video.png" />
      </Box>
      <Flex
        justifyContent="space-between"
        alignItems={'center'}
        bg="white"
        opacity="0.7"
        height="70px"
        width="200px"
        position={'absolute'}
        bottom="20px"
        right="40%"
        borderRadius="10px"
        px={5}
      >
        <Text fontWeight={'600'}>Total APR</Text>
        <Text fontWeight={'600'}>50%</Text>
      </Flex>
      <Box position="absolute" bottom="20px" right="20%">
        <ImageWithRedButton src="./assets/png/video_2.png" />
      </Box>
    </Box>
  </Box>
);
