import React, { useState } from 'react';
import Logos from 'pages/Optimizer/components/Logos';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import RedButton from 'components/RedButton';
import DropTokens from 'pages/Optimizer/components/DropTokens';
import { useTokenDrop } from 'store/tokenDrop.store';
import InsuranceSubscriptionModal from 'pages/Optimizer/components/InsuranceSubscriptionModal';
import { SEO } from 'components/SEO';
import { useQuery } from 'react-query';
import { Token } from 'types';
import { axiosClient } from 'utils/axiosClient';
import { useAccount } from 'store/account.store';
import { useMoralis } from 'react-moralis';
import { VideoPlayerModal } from 'components/VideoPlayerModal';
import { BELLA, SOPHIE, WILL } from 'constants/videoUrls';
import ReactPlayer from 'react-player/lazy';

const riskPortfolioConversion = ['safest', 'balanced', 'riskon'];

const findContractAddressBySymbol = (tokens: Token[] | undefined, symbol: string) => {
  if (!tokens || tokens.length === 0) {
    return;
  }

  const foundToken = tokens.find((token) => token.contractTickerSymbol === symbol)!;
  return foundToken?.contractAddress;
};

const Optimizer = () => {
  const navigate = useNavigate();
  const token = useTokenDrop((state) => state.token);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Moralis } = useMoralis();

  const account = useAccount((state) => state.account);
  const accountId = useAccount((state) => state.accountId);
  const setOptimizeCount = useAccount((state) => state.setOptimizeCount);

  const { data } = useQuery<{ tokens: Token[] }>('tokens', () => axiosClient.get('/token/list').then((x) => x.data));

  const [riskSlider, setRiskSlider] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const vidModal = useDisclosure();
  const [videoUrl, setVideoUrl] = React.useState('');
  const hasAllToken = token['1'] && token['2'] && token['3'];

  const onOptimize = async () => {
    if (!account) {
      toast({
        description: 'Please connect your wallet first',
        isClosable: true,
        duration: 3000,
        position: 'top',
        status: 'info',
      });
      return;
    }

    if (riskSlider === 2) {
      toast({
        description: 'Please select another risk tolerance. Risk-on is not available',
        isClosable: true,
        duration: 3000,
        position: 'top',
        status: 'error',
      });
      return;
    }

    const allTokens = [token['1'], token['2'], token['3']];
    const noDups = new Set(allTokens);

    if (noDups.size !== allTokens.length) {
      toast({
        description: 'You have duplicate tokens',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      return;
    }
    setIsSending(true);

    const contractAddresses = allTokens.map((token) => findContractAddressBySymbol(data?.tokens, token!));

    const sendData = {
      ticks: contractAddresses.join(','),
      riskPreference: riskPortfolioConversion[riskSlider],
    };

    const User = Moralis.Object.extend('User');
    const query = new Moralis.Query(User);
    const userQuery = await query.get(accountId);

    const OptimizationObject = Moralis.Object.extend('Optimization');
    const newOptimization = new OptimizationObject();

    axiosClient
      .post('/portfolio/optimize', sendData)
      .then(async (result: Record<string, any>) => {
        const optimizeCount = userQuery.get('optimizeCount');

        if (optimizeCount === undefined || optimizeCount === null) {
          userQuery.set('optimizeCount', 1);
          setOptimizeCount(1);
        } else {
          userQuery.set('optimizeCount', optimizeCount + 1);
          setOptimizeCount(optimizeCount + 1);
        }

        const preference = {
          ticks: contractAddresses,
          riskPreference: riskPortfolioConversion[riskSlider],
        };

        newOptimization.set('portfolioWeights', result.data);
        newOptimization.set('preference', preference);
        newOptimization.set('walletAddress', account);
        newOptimization.set('userId', accountId);

        await newOptimization.save();

        userQuery.set('portfolioOptimizedWeights', result.data);
        userQuery.set('portfolio', preference);

        await userQuery.save();

        toast({
          description: 'Optimized successfully',
          status: 'success',
          isClosable: true,
          duration: 3000,
          position: 'top',
        });

        navigate('/trade');
      })
      .catch((e) => {
        console.log(e);

        toast({
          description: 'Error',
          status: 'error',
          isClosable: true,
          duration: 3000,
          position: 'top',
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const playVid = (src: string) => {
    setVideoUrl(src);
    vidModal.onOpen();
  };

  return (
    <Box width="100%" minHeight="calc(100vh - 70px)">
      <SEO title="BWS | Optimizer" description="Optimizer page of Bondi Wealth Security" />
      <Box px={28} py={10}>
        <Text fontSize="20px" fontWeight="600" color="accentOutlines">
          Optimizer
        </Text>
        <Flex justifyContent="center" gap={5} mt={5}>
          <Box bg="white" width="560px" pl={5} pr={8} py={8} marginLeft="-45px">
            <Flex alignItems="start">
              <Box as="span" mr={3} p={3} px={5} bg="#F9FAFB" borderRadius="99999px" fontWeight="600">
                1
              </Box>
              <Text>
                Please select the risk tolerance through choosing a character. The character will explain the risk
                profile in layman's terms.{' '}
              </Text>
            </Flex>

            <Flex mt={3} border="1px solid #E5E7EB" borderRadius="10px" height="203px">
              <Box height="100%" width="33%" borderRight="1px solid #E5E7EB">
                <Flex height="100%" flexDirection="column" justifyContent="space-between">
                  <Box>
                    <Box position="relative" cursor="pointer" onClick={() => playVid(BELLA.optimizer)}>
                      <Image
                        loading="lazy"
                        src={BELLA.thumbnailSrcOptimizer}
                        width="140px"
                        height="100px"
                        margin="0 auto"
                        mt={3}
                      />
                      <RedButton position="absolute" top="31px" right="35%" />
                    </Box>
                    <Flex mt={3} alignItems="center" px={3}>
                      <Image
                        width={'40px'}
                        height={'40px'}
                        borderRadius={'50%'}
                        loading="lazy"
                        src="./assets/png/bella_profile.png"
                        mr={3}
                      />
                      <Text fontWeight="600">Bella</Text>
                    </Flex>
                  </Box>
                  <Box textAlign="center" bg="#00A3FF" borderBottomLeftRadius="10px" color="white" fontWeight="600">
                    SAFEST
                  </Box>
                </Flex>
              </Box>
              <Box height="100%" width="33%" borderRight="1px solid #E5E7EB">
                <Flex height="100%" flexDirection="column" justifyContent="space-between">
                  <Box>
                    <Box position="relative" cursor="pointer" onClick={() => playVid(WILL.optimizer)}>
                      <Image
                        loading="lazy"
                        src={WILL.thumbnailSrcOptimizer}
                        height="100px"
                        width="140px"
                        margin="0 auto"
                        mt={3}
                      />
                      <RedButton position="absolute" top="31px" right="35%" />
                    </Box>

                    <Flex mt={3} alignItems="center" px={3}>
                      <Box
                        width="40px"
                        height="40px"
                        backgroundSize="cover"
                        overflow="hidden"
                        backgroundPosition="center"
                        backgroundImage={'url(./assets/svg/will-pfp.svg)'}
                        borderRadius="50%"
                        border="1px solid #efefef"
                        mr={3}
                      />
                      <Text fontWeight="600">Will</Text>
                    </Flex>
                  </Box>
                  <Box textAlign="center" bg="#2C02FF" fontWeight="600" color="white">
                    BALANCED
                  </Box>
                </Flex>
              </Box>
              <Box height="100%" width="34%">
                <Tooltip
                  label="You need to stay invested at least 1 epoch to qualify to select Sophie 😉"
                  placement={'top'}
                >
                  <Flex height="100%" flexDirection="column" justifyContent="space-between">
                    <Box filter="grayscale(100%)">
                      <Box position="relative" cursor="pointer" onClick={() => playVid(SOPHIE.optimizer)}>
                        <Image
                          loading="lazy"
                          src={SOPHIE.thumbnailSrcOptimizer}
                          height="100px"
                          width="140px"
                          margin="0 auto"
                          mt={3}
                        />
                        <RedButton position="absolute" top="31px" right="35%" />
                      </Box>

                      <Flex mt={3} alignItems="center" px={3}>
                        <Image loading="lazy" src="./assets/svg/sophie_profile.svg" mr={3} />
                        <Text fontWeight="600">Sophie</Text>
                      </Flex>
                    </Box>
                    <Box textAlign="center" bg="#7F48FF" borderBottomRightRadius="10px" fontWeight="600" color="white">
                      RISK-ON
                    </Box>
                  </Flex>
                </Tooltip>
              </Box>
            </Flex>

            <Box mt="10" paddingLeft="80px" paddingRight="83px">
              <Slider defaultValue={riskSlider} onChange={(e) => setRiskSlider(e)} min={0} max={2} step={1}>
                <SliderMark value={0} mt="-4px" zIndex={10} ml="-2.5">
                  <Image loading="lazy" src="./assets/svg/rectangle.svg" />
                </SliderMark>
                <SliderMark value={1} mt="-4px" zIndex={10} ml="-2.5">
                  <Image loading="lazy" src="./assets/svg/rectangle.svg" />
                </SliderMark>
                <SliderMark value={2} mt="-4px" zIndex={10} ml="-2.5">
                  <Image loading="lazy" src="./assets/svg/rectangle.svg" />
                </SliderMark>
                <SliderTrack bg="#E5E7EB">
                  <Box position="relative" right={10} />
                </SliderTrack>
                <SliderThumb boxSize={10} boxShadow="none" bg="transparent" marginTop="-6px" ml="-6px">
                  <Image loading="lazy" src="./assets/svg/slider_mark.svg" />
                </SliderThumb>
              </Slider>
            </Box>

            <Box my={5} width={'100%'}>
              <ReactPlayer width={'100%'} url={'https://youtu.be/a6X4NKIM0DQ'} />
            </Box>

            <Box my={5}>
              <Center>
                <Button colorScheme="flamingo" onClick={onOpen}>
                  Protect
                </Button>
              </Center>
            </Box>

            <Box mt={3}>
              <Image loading="lazy" m="0 auto" src="./assets/png/bws_one_coin.png" cursor="pointer" onClick={onOpen} />
            </Box>
          </Box>

          <Box bg="white" width="560px" height="750px" pl={5} pr={8} py={8}>
            <Flex alignItems="start">
              <Box as="span" mr={3} p={3} px={5} bg="#F9FAFB" borderRadius="99999px" fontWeight="600">
                2
              </Box>
              <Text>
                Please drag and drop to your safe your top 3 assets. You will be automatically eligible to receive
                rewards if you choose the best 3 risk-adjusted assets in the next starting Epoch. Choose Wisely.
              </Text>
            </Flex>
            <Box mt={5}>
              <Logos />
            </Box>

            <Box mt={16} position="relative">
              <Image loading="lazy" src="./assets/svg/treasure.svg" margin="0 auto" width="60%" />
              <Box position="absolute" top="28px" right="66%">
                <DropTokens value={1} />
              </Box>
              <Box position="absolute" top="15px" right="52%">
                <DropTokens value={2} />
              </Box>
              <Box position="absolute" top="23px" right="38%">
                <DropTokens value={3} />
              </Box>
            </Box>
          </Box>
        </Flex>
        <Flex justifyContent="center" mt={5}>
          <Button
            isLoading={isSending}
            onClick={onOptimize}
            disabled={!hasAllToken}
            colorScheme={hasAllToken ? 'flamingo' : 'paleSky'}
            width="500px"
            fontSize="14px"
          >
            Optimize
          </Button>
        </Flex>
      </Box>

      <InsuranceSubscriptionModal isOpen={isOpen} onClose={onClose} />
      <VideoPlayerModal src={videoUrl} isOpen={vidModal.isOpen} onClose={vidModal.onClose} />
    </Box>
  );
};

export default Optimizer;
