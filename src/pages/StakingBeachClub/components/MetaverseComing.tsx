import React from 'react';
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';

export const MetaverseComing = () => (
  <Flex
    flexDir={'column'}
    pos="relative"
    justifyContent={'space-between'}
    height="600px"
    width="560px"
    p={5}
    bg="white"
    borderRadius="10px"
    pointerEvents={'none'}
  >
    <Center>
      <Text pb={3} fontSize={'20px'} fontWeight={'semibold'}>
        The metaverse is coming soon
      </Text>
    </Center>
    <Image
      src="./assets/png/metaverse_defi.png"
      width="250px"
      height="250px"
      position={'absolute'}
      bottom={'50%'}
      right="15%"
      zIndex="10"
    />
    <Box
      bgImage="url('./assets/png/metaverse_coming.png')"
      bgPosition="center"
      bgRepeat="no-repeat"
      height="300px"
      bgSize="cover"
      position="relative"
    />
  </Flex>
);
