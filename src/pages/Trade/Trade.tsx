import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Progress,
  Spinner,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Spacer,
  Divider,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import TradingDeskModal from 'components/TradingDeskModal';
import TransactionListModal from 'components/TransactionListModal';
import { ImageWithRedButton } from 'components/ImageWithRedButton';
import { SEO } from 'components/SEO';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAccount } from 'store/account.store';
import { useMoralis } from 'react-moralis';
import { Link as RLink } from 'react-router-dom';
// import { useQuery } from 'react-query';
import { Farm, Token } from 'types';
import { axiosClient } from 'utils/axiosClient';
import { VideoPlayerModal } from 'components/VideoPlayerModal';
import { BELLA, WILL } from 'constants/videoUrls';
import { Calculator } from 'components/Calculator';
import ReactPlayer from 'react-player/lazy';
import HistoricalPerformanceWidget from 'components/HistoricalPerformanceWidget';

const vaultBalance = 98593.12;
const vaultCapacity = 135000;

const StickyCallToActionBar = styled(Box)`
  box-shadow: rgba(151, 164, 175, 0.1) 0px -12px 10px;
`;

const InsuranceBox = styled(Box)`
  background: rgba(239, 68, 68, 1);
  background: -webkit-linear-gradient(left, rgba(239, 68, 68, 1), rgba(247, 10, 100, 1));
  background: -moz-linear-gradient(left, rgba(239, 68, 68, 1), rgba(247, 10, 100, 1));
  background: linear-gradient(to right, rgba(239, 68, 68, 1), rgba(247, 10, 100, 1));
  color: white;
  border-radius: 10px;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const riskPreferenceConversion: Record<any, any> = {
  balanced: {
    name: 'Will',
    profileSrc: 'svg/will-pfp.svg',
    thumbnailSrcTradeAction: WILL.thumbnailSrcTradeAction,
    thumbnailSrcTradeThanks: WILL.thumbnailSrcTradeThanks,
    videoActionSrc: WILL.tradeAction,
    videoThanksSrc: WILL.tradeThanks,
  },
  safest: {
    name: 'Bella',
    profileSrc: 'png/bella_profile.png',
    videoActionSrc: BELLA.tradeAction,
    videoThanksSrc: BELLA.tradeThanks,
    thumbnailSrcTradeAction: BELLA.thumbnailSrcTradeAction,
    thumbnailSrcTradeThanks: BELLA.thumbnailSrcTradeThanks,
  },
  riskon: {
    name: 'Sophie',
    profileSrc: 'svg/sophie_profile.svg',
    thumbnailSrc: 'video_2.png',
  },
};

const findTokenByContractAddress = (tokens: any[] | undefined, contractAddress: string) => {
  if (!tokens) {
    return;
  }
  return tokens.find((token) => token.contractAddress === contractAddress || token.lpAddress === contractAddress);
};

const renderTokenName = (tokens: any[] | undefined, contractAddress: string) => {
  if (!tokens) {
    return;
  }
  const foundToken = tokens.find(
    (token) => token.contractAddress === contractAddress || token.lpAddress === contractAddress
  );

  return foundToken?.name || foundToken?.contractTickerSymbol;
};

const Trade = () => {
  const [investAmount, setInvestAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolio, setPortfolio] = useState({ ticks: [], riskPreference: '' });
  const [userOptimization, setUserOptimization] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [portfolioOptimizedWeight, setPortfolioOptimizedWeight] = useState<any>([]);
  const [weightsValue, setWeightsValue] = useState({ avg: 0, max: 0 });
  const [tokens, setTokens] = useState<Token[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);

  const tradeModalDisclosure = useDisclosure();
  const transactionListModalDisclosure = useDisclosure();

  const vidModal = useDisclosure();

  const { Moralis } = useMoralis();
  const hash = useAccount((state) => state.hash);
  const account = useAccount((state) => state.account);
  const accountId = useAccount((state) => state.accountId);
  const optimizeCount = useAccount((state) => state.optimizeCount);

  useEffect(() => {
    if (!account) {
      return;
    }

    // Moralis User Query
    const User = Moralis.Object.extend('User');
    const query = new Moralis.Query(User);

    // Moralis Optimization Query
    const Optimization = Moralis.Object.extend('Optimization');
    const optimizationQuery = new Moralis.Query(Optimization);

    const fetchData = async () => {
      await query.get(accountId).then(async (user) => {
        const compositionRaw = await user.get('portfolioOptimizedWeights');

        // Get from performace api once we fetch the portfolio from Moralis
        const responsePerformanceData = await axiosClient.post('/portfolio/performance', compositionRaw);
        setWeightsValue({ avg: responsePerformanceData?.data?.avg, max: responsePerformanceData?.data?.max });

        // Set portfolio weight to state
        const transformedComposition = Object.keys(compositionRaw).map((x) => ({
          [x]: (compositionRaw[x] * 100).toFixed(2),
        }));
        setPortfolioOptimizedWeight(transformedComposition);

        // Get portfolio from Moralis
        const userPortfolio = await user.get('portfolio');
        if (userPortfolio?.ticks?.length > 0) {
          setPortfolio({
            ticks: userPortfolio.ticks,
            riskPreference: userPortfolio.riskPreference,
          });
        }
      });

      const responseTokens = await axiosClient.get('/token/list').then((x) => x.data);
      setTokens(responseTokens?.tokens);

      const responseFarms = await axiosClient.get('/farm/list').then((x) => x.data);
      setFarms(responseFarms?.tokens);

      optimizationQuery.equalTo('userId', accountId);
      optimizationQuery.limit(3);

      const optimizations = await optimizationQuery.find();

      setUserOptimization(optimizations);
    };

    fetchData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, [account]);

  if (!account) {
    return (
      <Box h="calc(100vh - 70px)">
        <Center h="100%" fontSize="20px">
          Please connect your wallet first
        </Center>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box h="calc(100vh - 100px)">
        <Center h="100%">
          <Spinner size="xl" color="flamingo.500" />
        </Center>
      </Box>
    );
  }

  if (portfolio?.ticks.length === 0) {
    return (
      <Box h="calc(100vh - 70px)">
        <Center h="100%" fontSize="20px">
          Please optimize your portfolio first in&nbsp;
          <RLink to="/optimizer" style={{ fontWeight: '600' }}>
            Optimize page
          </RLink>
        </Center>
      </Box>
    );
  }

  const playVid = (src: string) => {
    setVideoUrl(src);
    vidModal.onOpen();
  };

  const findMatchedPortfolio = (tokenName: string) => {
    const FOUND = '#00A3FF';
    const NOT_FOUND = '#EF4444';

    if (tokens.length === 0) return NOT_FOUND;

    const ticks = portfolio?.ticks || [];

    if (ticks.length === 0) return NOT_FOUND;

    const convertedAddressToName = ticks.map((contractAddress) => {
      const foundToken = tokens.find((token) => token['contractAddress'] === contractAddress);
      return foundToken!['contractTickerSymbol'];
    });
    const foundSelected = convertedAddressToName.find((tick) => tick === tokenName);

    return !!foundSelected ? FOUND : NOT_FOUND;
  };

  const dataSource = portfolioOptimizedWeight
    .map((x: any) => ({
      name: renderTokenName([...tokens, ...farms], Object.keys(x)[0]),
      pct: Number(x[Object.keys(x)[0]]),
    }))
    .filter((x: any) => x.name);

  const sortedTokens = dataSource?.sort((a: any, b: any) => b.pct - a.pct);
  const top3 = sortedTokens.slice(0, 3);

  console.log({ userOptimization });

  return (
    <Box mb={10}>
      <SEO title="BWS | Trade" description="Trade page of Bondi Wealth Security" />

      <Box px={28} pt={10} pb={20}>
        <Text fontSize="20px" fontWeight="600" color="accentOutlines">
          Trade
        </Text>

        <Box mt={3} bg="white" width="100%" p={5}>
          <Text fontSize="18px" fontWeight="600">
            Your user inputs
          </Text>

          <Grid gap={5} templateColumns="1fr 1fr" my={3}>
            <>
              <Flex border="1px solid #E5E7EB" borderRadius="10px" direction={'column'}>
                <Text fontSize="16px" fontWeight="600" px={3} py={2}>
                  Risk Preference
                </Text>
                <Flex alignItems="center" justifyContent="space-around" py={3}>
                  <Flex alignItems="center">
                    <Box
                      width="80px"
                      height="80px"
                      backgroundSize="cover"
                      overflow="hidden"
                      backgroundPosition="center"
                      backgroundImage={`url(./assets/${riskPreferenceConversion[portfolio.riskPreference].profileSrc})`}
                      borderRadius="50%"
                      border="1px solid #efefef"
                    />
                    <Text ml={3} fontWeight="600">
                      {riskPreferenceConversion[portfolio.riskPreference].name}
                    </Text>
                  </Flex>
                  <Box bg="#F9FAFB" p={3} borderRadius="99999px">
                    <Text fontWeight="600" fontSize="14px">
                      VS
                    </Text>
                  </Box>
                  <Box onClick={() => playVid(riskPreferenceConversion[portfolio.riskPreference].videoThanksSrc!)}>
                    <ImageWithRedButton
                      withOuterBox
                      width="140px"
                      height="87px"
                      buttonTop="25%"
                      src={riskPreferenceConversion[portfolio.riskPreference].thumbnailSrcTradeThanks}
                    />
                  </Box>
                </Flex>
              </Flex>
            </>

            <Flex border="1px solid #E5E7EB" borderRadius="10px" direction={'column'}>
              <Text fontSize="16px" fontWeight="600" px={3} py={2}>
                Token Preference
              </Text>
              <Flex alignSelf="center" justifyContent="center" gap={8} py={3}>
                {portfolio.ticks.map((contractAddress) => (
                  <Image
                    alignSelf={'center'}
                    borderRadius="50%"
                    key={contractAddress}
                    src={findTokenByContractAddress(tokens, contractAddress)?.logoUrl}
                    width="80px"
                    height="80px"
                  />
                ))}
              </Flex>
            </Flex>
          </Grid>

          <Grid templateColumns="1fr 200px" gap={5} my={10}>
            <Box>
              <Flex>
                <Text>
                  Your custom portfolio is optimized using an ensemble approach. It is a linear combinations of the
                  beach ready score, your risk preference, your coins preferences and a portfolio optimization
                  algorithm. Pls sign up at QV-LABS.com to get access to more advanced algorithms and analytics.
                </Text>
                <Select value={1}>
                  <option disabled value={1}>
                    Mean-variance optimization
                  </option>
                  <option disabled value={2}>
                    Vanilla Risk Parity
                  </option>
                  <option disabled value={3}>
                    Hierarchical Risk Parity
                  </option>
                  <option disabled value={4}>
                    Factor
                  </option>
                  <option disabled value={5}>
                    Mean Var + Factor models
                  </option>
                </Select>
              </Flex>
              <Text mt={8}>
                The subset of the portfolio that match the default portfolio in insurable by BWS protection.
              </Text>
            </Box>

            <Link href="https://qv-labs7.godaddysites.com/" target="_blank">
              <Image src="./assets/qvlabs.jpg" width="150px" />
            </Link>
          </Grid>

          <Box mt={5}>
            <Text fontSize="20px" fontWeight={'semibold'}>
              Your custom optimization
            </Text>

            <Box border="1px solid #E5E7EB" borderRadius="10px" px={5} py={6} mt={5}>
              <Text fontWeight={'semibold'}>
                Your Unique portfolio Identifier: {hash}
                {optimizeCount}
              </Text>

              <Flex mt={3} justifyContent={'space-between'}>
                <Text fontWeight={'semibold'}>Vault Balance:</Text>
                <Text fontWeight={'semibold'}>{vaultBalance} USD</Text>
              </Flex>

              <Box mt={3}>
                <Progress color="#00A3FF" value={(vaultBalance / vaultCapacity) * 100} borderRadius="3px" />
              </Box>

              <Flex mt={3} justifyContent={'space-between'}>
                <Text fontWeight={'semibold'}>Vault Capacity:</Text>
                <Text fontWeight={'semibold'}>{vaultCapacity}</Text>
              </Flex>
            </Box>
          </Box>

          <Box mt={5}>
            <Grid templateColumns="1fr 1fr" gap={5}>
              <Box>
                <Text fontSize="20px" fontWeight={'semibold'}>
                  Top 3 Weights
                </Text>
                <Table mt={5}>
                  <Thead background="#E5E7EB" borderRadius="10px">
                    <Tr>
                      <Th borderTopLeftRadius="10px">Asset</Th>
                      <Th borderTopRightRadius="10px">% weight</Th>
                    </Tr>
                  </Thead>
                  <Tbody bg={'white'}>
                    {top3.map((token: Record<string, any>) => (
                      <Tr key={token.name}>
                        <Td>{token.name}</Td>
                        <Td>{token.pct}%</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <InsuranceBox mt={7} mb={10}>
                  <Flex alignItems="center" gap={4}>
                    <Image src="./assets/png/rbws_logo.png" borderRadius={'10px'} width={'64px'} height={'64px'} />
                    <Text fontSize="1.25rem">
                      Your portfolio is eligible to be insured at <chakra.span fontWeight="600">100%</chakra.span>
                    </Text>
                    <Spacer />
                    <Image src="./assets/png/shirley_temple.png" />
                  </Flex>
                </InsuranceBox>

                <Grid templateColumns="1fr 1fr 1fr" py={3} mt={5} gap={'5'}>
                  <GridItem>
                    <Flex direction={'column'}>
                      <Text mr={3} fontSize={'14px'}>
                        Your worst case scenario
                      </Text>
                      <Text fontSize={'1.25rem'} fontWeight={'medium'} my={1}>
                        -10%
                      </Text>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex direction={'column'}>
                      <Text mr={3} fontSize={'14px'}>
                        Your portfolio average case on last 12 epochs
                      </Text>
                      <Text fontSize={'1.25rem'} fontWeight={'medium'} my={1}>
                        {Number(weightsValue.avg * 100).toFixed(2)}%
                      </Text>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex direction={'column'}>
                      <Text mr={3} fontSize={'14px'}>
                        Your portfolio best case in last 12 epochs
                      </Text>
                      <Text fontSize={'1.25rem'} fontWeight={'medium'} my={1}>
                        {Number(weightsValue.max * 100).toFixed(2)}%
                      </Text>
                    </Flex>
                  </GridItem>
                </Grid>

                <Box my={10} width={'100%'}>
                  <ReactPlayer width={'100%'} url={'https://youtu.be/wbcB62FCf3E'} />
                </Box>

                <Image
                  src={'./assets/png/payoff_chart.png'}
                  mt={5}
                  p={2}
                  border={'1px solid #ccc'}
                  borderRadius={'10px'}
                  marginX={'auto'}
                />

                <Box my={5} width={'100%'}>
                  <ReactPlayer width={'100%'} url={'https://youtu.be/SZeiZmJHito'} />
                </Box>

                <Box mt={5}>
                  <Calculator />
                </Box>
              </Box>

              <Box>
                <Text fontSize="20px" fontWeight={'semibold'}>
                  Detailed % Weights
                </Text>
                <Box border="1px solid #E5E7EB" borderRadius="10px" px={5} py={6} my={5} w="100%">
                  {tokens.length! > 0 && farms.length! > 0 && (
                    <ResponsiveContainer width="100%" height={700}>
                      <ComposedChart
                        layout="vertical"
                        height={900}
                        data={dataSource}
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 100,
                        }}
                      >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" scale="band" height={1000} />
                        <Tooltip />
                        <Bar dataKey="pct" barSize={20} fill="#EF4444" style={{ borderRadius: '10px' }}>
                          {dataSource.map((entry: any, idx: number) => (
                            <Cell fill={findMatchedPortfolio(entry.name)} key={`cell-${idx}`} />
                          ))}
                        </Bar>
                      </ComposedChart>
                    </ResponsiveContainer>
                  )}
                </Box>

                <Text fontSize="20px" fontWeight={'semibold'}>
                  Portfolio Performance Analysis
                </Text>
                <Box border="1px solid #E5E7EB" borderRadius="10px" px={5} py={10} my={5} w="100%" background="#f7fbfb">
                  <HistoricalPerformanceWidget
                    hash={hash}
                    userOptimization={userOptimization}
                    portfolio={portfolio}
                    tokens={tokens}
                  />
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>

        <TradingDeskModal
          isOpen={tradeModalDisclosure.isOpen}
          onClose={tradeModalDisclosure.onClose}
          investAmount={investAmount}
          setInvestAmount={setInvestAmount}
          toggleTransactionListModal={transactionListModalDisclosure.onOpen}
        />
      </Box>

      <TransactionListModal
        investAmount={investAmount}
        isOpen={transactionListModalDisclosure.isOpen}
        onClose={transactionListModalDisclosure.onClose}
        portfolio={dataSource}
        tokens={tokens}
        farms={farms}
      />

      <VideoPlayerModal src={videoUrl} isOpen={vidModal.isOpen} onClose={vidModal.onClose} />

      <StickyCallToActionBar px={5} py={3} position={'fixed'} bottom={'0'} right={'0'} bg="white" w={'100%'}>
        <Flex>
          <Flex direction={'row'}>
            <Flex direction={'column'} ml={2} mr={3} alignSelf={'center'}>
              <Text fontSize="1.375rem" fontWeight={'semibold'}>
                Do you know what is your biggest risk now?
              </Text>

              <Text fontSize="1rem" fontWeight={'semibold'}>
                The biggest risk is...
              </Text>
            </Flex>

            <Box onClick={() => playVid(riskPreferenceConversion[portfolio.riskPreference].videoActionSrc!)}>
              <ImageWithRedButton
                buttonSize="29px"
                src={riskPreferenceConversion[portfolio.riskPreference].thumbnailSrcTradeAction}
                height="74px"
                width="120px"
                buttonTop="33%"
                buttonRight="33%"
                withOuterBox
              />
            </Box>
          </Flex>
          <Spacer />
          <Flex alignSelf={'center'}>
            <Button
              colorScheme="flamingo"
              width="500px"
              fontSize="18px"
              size={'lg'}
              onClick={tradeModalDisclosure.onOpen}
            >
              Trade Now
            </Button>
          </Flex>
        </Flex>
      </StickyCallToActionBar>
    </Box>
  );
};

export default Trade;
