import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

type FarmToken = {
  tokenALogo: string;
  tokenBLogo: string;
  tokenAName: string;
  tokenBName: string;
};

const FarmToken: React.FC<FarmToken> = ({ tokenALogo, tokenBLogo, tokenAName,tokenBName }) => (
  <Flex alignItems="center">
    <Flex mr={3}>
      <Image width="30px" height="30px" src={tokenALogo} />
      {tokenBLogo && <Image width="30px" height="30px" src={tokenBLogo} />}
    </Flex>
    <Box fontWeight={600}>
      {tokenAName} {tokenBName ? `- ${tokenBName}` : ''}
    </Box>
  </Flex>
);

export default FarmToken;
