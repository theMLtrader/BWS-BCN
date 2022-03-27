import React, { useEffect } from 'react';
import {
  Box,
  Center,
  Flex,
  Image,
  Link,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import FarmTable from 'pages/Analytics/components/FarmTable';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import BeachReadyScoreModal from 'components/BeachReadyScoreModal';
import { SEO } from 'components/SEO';
import { useQuery } from 'react-query';
import { axiosClient } from 'utils/axiosClient';
import { Farm, Token } from 'types';
import { VideoPlayerModal } from 'components/VideoPlayerModal';

const Analytics = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const vidModal = useDisclosure();

  const { data, isLoading } = useQuery<{ tokens: Token[]; farms: Farm[] }>('analytics', () =>
    axiosClient.get('/analytics').then((resp) => resp.data)
  );

  useEffect(() => {
    vidModal.onOpen();
  }, []);

  const sortedTokens = data?.tokens?.sort((a, b) => b.beachReadyScore - a.beachReadyScore) || [];
  const sortedFarms = data?.farms?.sort((a, b) => b.beachReadyScore - a.beachReadyScore) || [];

  return (
    <Box px={28} py={10}>
      <SEO title="BWS | Analytics" description="Analytics page of Bondi Wealth Security" />
      <Text fontSize="20px" fontWeight="600" color="accentOutlines">
        Analytics
      </Text>

      <Box mt={5}>
        <Flex justifyContent={'space-between'}>
          <Stack spacing={5} mb={5}>
            <Text>
              BWS dapp makes use of MONTHLY "epochs" for accounting assets, distribute prizes and reward/rebate
              distribution of BWS and rBWS tokens.
            </Text>
            <Text>
              A new epoch start at the third Friday of the expiration month at 9:30 am EST to match SPX Index Options
              Monthly Expiry.
            </Text>
          </Stack>

          <Box>
            <Image src="./assets/qvlabs.jpg" width="100px" />
            <Text fontSize="12px" width="150px">
              Access to advance analytics at{' '}
              <Link color="blue.500" href="https://qv-labs7.godaddysites.com/">
                qv-labs.com
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>

      {isLoading && (
        <Box h="calc(100vh - 100px)">
          <Center h="100%">
            <Spinner size="xl" color="flamingo.500" />
          </Center>
        </Box>
      )}

      {!isLoading && data && (
        <>
          <Box mt={3} border="1px solid #E5E7EB" borderTopLeftRadius="10px" borderTopRightRadius="10px">
            <Table>
              <Thead background="#E5E7EB" borderRadius="10px">
                <Tr>
                  <Th borderTopLeftRadius="10px">Token</Th>
                  <Th>Price</Th>
                  <Th isNumeric>Return from last epoch</Th>
                  <Th isNumeric>Volatility from last epoch</Th>
                  <Th isNumeric borderTopRightRadius="10px">
                    <Flex alignItems="center" justifyContent="end">
                      <Box mr={2}>Beach Ready Score</Box>
                      <HiOutlineInformationCircle cursor="pointer" fontSize="18px" onClick={onOpen} />
                    </Flex>
                  </Th>
                </Tr>
              </Thead>
              <Tbody bg="white">
                {sortedTokens.map((token) => (
                  <Tr key={token.contractName}>
                    <Td>
                      <Flex alignItems={'center'}>
                        <Box mr={3}>
                          <Image width="40px" height="40px" loading="lazy" src={token.logoUrl} />
                        </Box>
                        <Box>
                          <Text fontWeight="600">{token.contractTickerSymbol}</Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>
                      <Box fontWeight="600">{Number(token.price).toFixed(2)}</Box>
                    </Td>
                    <Td isNumeric fontWeight="600">
                      {(token.returnLastEpoch * 100).toFixed(2)}%
                    </Td>
                    <Td isNumeric fontWeight="600">
                      {(Number(token.volitilityLastEpoch) * 100).toFixed(2)}%
                    </Td>
                    <Td isNumeric fontWeight="600">
                      {token.beachReadyScore}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box mt={10}>
            <FarmTable farms={sortedFarms || []} />
          </Box>
        </>
      )}

      <BeachReadyScoreModal isOpen={isOpen} onClose={onClose} />
      <VideoPlayerModal src={'https://youtu.be/P5VSlMKxFlg'} isOpen={vidModal.isOpen} onClose={vidModal.onClose} />
    </Box>
  );
};

export default Analytics;
