import React, { useEffect, useState } from 'react';
import { Farm, Token } from 'types';
import { axiosClient } from 'utils/axiosClient';
import { Box, Image, Table, Tbody, Td, Text, Th, Thead, Tr, Divider } from '@chakra-ui/react';
import { LineChart, Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  hash: string;
  userOptimization: any;
  portfolio: any;
  tokens: Token[];
}

const RISK_COLORS = {
  safest: 'rgb(146,182,48)',
  balanced: '#ffad16',
  riskon: 'rgba(239, 68, 68, 1)',
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

function HistoricalPerformanceWidget({ hash, userOptimization, portfolio, tokens }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [cum, setCum] = useState([]);
  useEffect(() => {
    if (!userOptimization.length) return;

    const first = userOptimization[0];

    console.log({ first: first.get('portfolioWeights') });

    const fetchData = async () => {
      const responsePerformanceData = await axiosClient.post(
        '/portfolio/historical-performance',
        first.get('portfolioWeights')
      );

      console.log(responsePerformanceData.data.data.cumulative);

      const cumulative = responsePerformanceData.data.data.cumulative;
      const { portfolio_cum } = cumulative;
      const plotArray = [];
      Object.keys(portfolio_cum).map((key) => {
        plotArray.push({
          date: key,
          portfolio: portfolio_cum[key],
          btc: cumulative['BTC.e'],
        });
      });

      setCum(plotArray);
    };

    fetchData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, [userOptimization]);

  return (
    <Box>
      <Box
        background="linear-gradient(to right, rgba(239, 68, 68, 1), rgba(247, 10, 100, 1))"
        borderRadius="20px"
        p={5}
        mb={5}
        display="flex"
      >
        <Box width="125px">
          <Image
            alignSelf="center"
            src="./assets/png/avatar.png"
            width="120px"
            position="absolute"
            transform="translate(-5%, -50%) scale(1.5)"
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Text color="white" fontSize="2xl" fontWeight="900" mb="2">
            Portfolio Performance
          </Text>
          <Box display="flex" gap={5} alignItems="center">
            <Box display="flex" gap={2} alignItems="center">
              <Image alignSelf="center" src="./assets/png/avatar-icon.png" width="12px" height="12px" />
              <Text color="white">ID#{`${hash.slice(0, 4)}...${hash.slice(-4)}`}</Text>
            </Box>
            <Divider backgroundColor="white" orientation="vertical" height="25px" />
            <Box display="flex" gap={2} alignItems="center">
              <Box
                display="block"
                background={RISK_COLORS[portfolio?.riskPreference]}
                borderRadius="50%"
                width="10px"
                height="10px"
              />
              <Text color="white">{portfolio?.riskPreference}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Text fontWeight={'semibold'} mb={3}>
        Historical Optimization
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th py={8} background="white" borderTopLeftRadius="20px" borderBottomLeftRadius="20px">
              Date
            </Th>
            <Th py={8} background="white">
              Securities
            </Th>
            <Th py={8} background="white">
              Preference
            </Th>
            <Th py={8} background="white" borderTopRightRadius="20px" borderBottomRightRadius="20px">
              Cumulative Return
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userOptimization.length > 0 &&
            userOptimization.map((opt, index) => {
              const optDate = new Date(opt.createdAt);
              const dd = String(optDate.getDate()).padStart(2, '0');
              const mm = String(optDate.getMonth() + 1).padStart(2, '0'); //January is 0!
              const yyyy = optDate.getFullYear();
              const date = mm + '/' + dd + '/' + yyyy;

              return (
                <Tr key={`historical-opt-${index}`}>
                  <Td>{date}</Td>
                  <Td>{opt.get('preference').ticks.map((tick) => `${renderTokenName([...tokens], tick)}, `)}</Td>
                  <Td>{opt.get('preference').riskPreference}</Td>
                  <Td>Cumulative Return X</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <Box>
        <ResponsiveContainer width="100%" height={700}>
          <LineChart
            width={500}
            height={300}
            data={cum}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default HistoricalPerformanceWidget;
