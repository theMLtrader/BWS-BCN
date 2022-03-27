import React from 'react';
import { Box, Button, Divider, Flex, Grid, GridItem, Image, Input, Text } from '@chakra-ui/react';
import { ImageWithRedButton } from 'components/ImageWithRedButton';

export const EnvyNightlife = () => {
  return (
    <Box w="1000px" p={5} bg={'white'} borderRadius={'10px'}>
      <Grid templateColumns="1fr 1fr" gap={10}>
        <GridItem>
          <Box position={'relative'}>
            <Image src="./assets/png/envy_nightlife.png" />
            <Image src="./assets/png/bws_logo.png" position={'absolute'} top="25%" right={'35%'} width={32} />
            <Image src="./assets/png/will_whole_body.png" pos={'absolute'} zIndex={'1'} bottom="0" right="40px" />
            <Box pos={'absolute'} bottom={'0'} right={'20%'} zIndex={'2'}>
              <ImageWithRedButton src={'./assets/png/video_1.png'} />
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box border="1px solid #E5E7EB" borderRadius="10px" h="100%" px={5} py={5}>
            <Text fontWeight={'semibold'}>Get access to complex options strategies using BWS as Collateral</Text>

            <Box
              display={'inline-block'}
              border="1px solid #EF4444"
              color="flamingo.500"
              borderRadius="99999px"
              p={3}
              mt={5}
            >
              <Text fontWeight={'semibold'}>1 XBWS = 1.24365 BWS</Text>
            </Box>

            <Flex mt={8} justifyContent={'space-between'}>
              <Text fontWeight={'semibold'} color={'placeholder'}>
                Balance
              </Text>
              <Text fontWeight={'semibold'}>6.12747010</Text>
            </Flex>

            <Box mt={5}>
              <Box position="relative">
                <Input size={'lg'} h="70px" placeholder="0.0" />
                <Flex gap={2} position="absolute" alignItems="center" top="20px" right="10px">
                  <Button size={'sm'}>MAX</Button>
                  <Divider height="30px" orientation="vertical" />
                  <Text fontWeight={'semibold'}>BWS</Text>
                </Flex>
              </Box>
            </Box>
            <Box mt={5}>
              <Button colorScheme="flamingo" w={'100%'} fontSize="14px">
                Stake
              </Button>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
