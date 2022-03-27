import React, { useState } from 'react';
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr, Text, Input } from '@chakra-ui/react';
import FarmToken from 'components/FarmToken';
import { Farm } from 'types';

type FarmTable = {
  farms: Farm[];
};

const FarmTable: React.FC<FarmTable> = ({ farms }) => {
  const [valueEst, setValueEst] = useState('');

  const calculateBasedOnValueEst = (totalApy: number) => {
    if (!valueEst) {
      return 0;
    }

    return (+valueEst * (totalApy / 100)) / 12;
  };

  return (
    <>
      <Box bg={'white'} px={5} py={8} border="1px solid #E5E7EB" borderRadius="10px" mt={5}>
        <Flex w={'100%'} alignItems={'center'}>
          <Text mr={5} fontWeight={'semibold'}>
            Value estimated for
          </Text>
          <Input
            type="number"
            value={valueEst}
            onChange={(e) => setValueEst(e.target.value)}
            size={'lg'}
            placeholder={'USD'}
            width={'70%'}
          />
          <Text ml={3} fontWeight={'semibold'}>
            investment
          </Text>
        </Flex>
      </Box>
      <Box mt={5} border="1px solid #E5E7EB" borderTopLeftRadius="10px" borderTopRightRadius="10px">
        <Table>
          <Thead background="#E5E7EB" borderRadius="10px">
            <Tr>
              <Th borderTopLeftRadius="10px">FARM</Th>
              <Th>APR</Th>
              <Th>Per Epoch Return (USD)</Th>
              <Th isNumeric borderTopRightRadius="10px">
                Beach Ready
              </Th>
            </Tr>
          </Thead>
          <Tbody bg="white">
            {farms.map((farm, idx) => (
              <Tr key={idx}>
                <Td>
                  <FarmToken
                    tokenAName={farm.symbol0Name}
                    tokenBName={farm.symbol1Name}
                    tokenALogo={farm.symbol0Logo}
                    tokenBLogo={farm.symbol1Logo}
                  />
                </Td>
                <Td>{farm.totalApy.toFixed(2)}%</Td>
                <Td>${calculateBasedOnValueEst(farm.totalApy).toFixed(2)}</Td>
                <Td isNumeric fontWeight="600">
                  {farm.beachReadyScore}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default FarmTable;
