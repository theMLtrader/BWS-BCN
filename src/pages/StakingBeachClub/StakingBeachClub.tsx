import React from 'react';
import { SEO } from 'components/SEO';
import { Box, Center, Flex } from '@chakra-ui/react';
import { BeachArea } from 'pages/StakingBeachClub/components/BeachArea';
import { Bridge } from './components/Bridge';
import { PoolSide } from 'pages/StakingBeachClub/components/PoolSide';
import { CocktailBar } from 'pages/StakingBeachClub/components/CocktailBar';
import { EnvyNightlife } from 'pages/StakingBeachClub/components/EnvyNightlife';
import { MetaverseComing } from 'pages/StakingBeachClub/components/MetaverseComing';
import { Dopex } from 'pages/StakingBeachClub/components/Dopex';
import { Joe } from './components/Joe';

const StakingBeachClub = () => {
  return (
    <Box bg="rgba(31, 41, 55, 0.3)" minH="calc(100vh - 70px)">
      <SEO title="BWS | Staking Beach Club" description="Staking beach club page of Bondi Wealth Security" />
      <Box px={52} py={10}>
        <Center mt={5}>
          <MetaverseComing />
        </Center>
        <Center mt={5}>
          <BeachArea />
        </Center>
        <Center mt={5}>
          <Bridge />
        </Center>
        <Center mt={5}>
          <PoolSide />
        </Center>
        <Center mt={5}>
          <Bridge />
        </Center>
        <Flex mt={5} gap={5} justifyContent="center">
          <Dopex />
          <Box mt="200px">
            <CocktailBar />
          </Box>
          <Joe />
        </Flex>

        <Center mt={5}>
          <Bridge />
        </Center>

        <Center mt={5}>
          <EnvyNightlife />
        </Center>
      </Box>
    </Box>
  );
};

export default StakingBeachClub;
