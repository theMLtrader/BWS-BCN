import { Box, Flex, Image, Text, Tooltip, useDisclosure, Spacer } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import Video from '../components/Video';
import { SEO } from 'components/SEO';
import { useAccount } from 'store/account.store';
import { useMoralis } from 'react-moralis';
import React, { useEffect, useState } from 'react';
import { VideoPlayerModal } from 'components/VideoPlayerModal';
import { BELLA, SOPHIE, WILL } from 'constants/videoUrls';

const items = [
  {
    image: 'data_analytics.svg',
    name: 'Analytics',
    bg: '#E6FFE8',
    route: '/analytics',
  },
  {
    image: 'optimizer.svg',
    name: 'Optimizer',
    bg: '#DCFBFF',
    route: '/optimizer',
  },
  {
    image: 'model_portfolio.svg',
    name: 'Trade',
    bg: '#FFF6E5',
    route: '/trade',
  },
  {
    image: 'staking_beach_club.svg',
    name: 'Staking Beach Club',
    bg: '#FFE9EF',
    route: '/staking-beach-club',
  },
];

const InsuranceBox = styled(Box)`
  background: rgba(239, 68, 68, 1);
  background: -webkit-linear-gradient(left, rgba(239, 68, 68, 1), rgba(247, 10, 100, 1));
  background: -moz-linear-gradient(left, rgba(239, 68, 68, 1), rgba(247, 10, 100, 1));
  background: linear-gradient(to right, rgba(239, 68, 68, 1), rgba(247, 10, 100, 1));
  color: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  position: absolute;
  margin: 2rem auto;
  left: 50%;
  transform: translate(-50%, 0);
`;

const BannerBox = styled(Box)`
  background: #ef4444;
  background: -webkit-radial-gradient(bottom, #ef4444, #e67f7f);
  background: -moz-radial-gradient(bottom, #ef4444, #e67f7f);
  background: radial-gradient(to top, #ef4444, #e67f7f);
  color: white;
`;

const ImageComeToBWS = styled(Image)`
  max-width: 768px;
  bottom: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const ImageMemePepe = styled(Image)`
  bottom: 0;
  position: absolute;
  left: 5vw;
  width: 255px;
`;

const ImageMemeTJ = styled(Image)`
  bottom: 4vh;
  position: absolute;
  right: 50%;
  height: 230px;
  transform: translate(325%, 0%);
`;

const TradeItem: React.FC<any> = ({ item }) => (
  <Flex
    filter="grayscale(100%)"
    zIndex="2"
    width="270px"
    height="170px"
    borderRadius="10px"
    bg={item.bg}
    flexDir="column"
    justifyContent="center"
  >
    <Tooltip label="Please optimize your portfolio first" placement="top">
      <Box cursor={'not-allowed'}>
        <Flex justifyContent="center" mb="5">
          <Image loading="lazy" src={`./assets/svg/${item.image}`} />
        </Flex>
        <Flex justifyContent="center">
          <Text fontSize="16px" fontWeight="700">
            {item.name}
          </Text>
        </Flex>
      </Box>
    </Tooltip>
  </Flex>
);

const HomepageItem: React.FC<any> = ({ item }) => (
  <Flex
    zIndex="2"
    key={item.name}
    width="270px"
    height="170px"
    borderRadius="10px"
    bg={item.bg}
    flexDir="column"
    justifyContent="center"
  >
    <NavLink to={item.route}>
      <Box cursor="pointer">
        <Flex justifyContent="center" mb="5">
          <Image loading="lazy" src={`./assets/svg/${item.image}`} />
        </Flex>
        <Flex justifyContent="center">
          <Text fontSize="16px" fontWeight="700">
            {item.name}
          </Text>
        </Flex>
      </Box>
    </NavLink>
  </Flex>
);

const Landing: React.FC = () => {
  const [riskLevel, setRiskLevel] = useState('');
  const [model, setModel] = useState('');
  const account = useAccount((state) => state.account);
  const accountId = useAccount((state) => state.accountId);
  const { Moralis } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [hasPortfolio, setHasPortfolio] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState('');

  useEffect(() => {
    if (!account) {
      return;
    }

    const init = async () => {
      const User = Moralis.Object.extend('User');
      const query = new Moralis.Query(User);
      const userQuery = await query.get(accountId);
      const portfolio = userQuery.get('portfolio');

      if (portfolio?.ticks?.length > 0) {
        setHasPortfolio(true);
      } else {
        setHasPortfolio(false);
      }
    };

    init();
  }, [account]);

  const openVid = (src: string) => {
    setVideoUrl(src);
    onOpen();
  };

  return (
    <Box>
      <SEO title="Bondi Wealth Security" description="BWS landing page" />

      <Box position="relative" height="calc(100vh - 70px)">
        <InsuranceBox>
          <Flex alignItems="center" gap={4}>
            <Image
              src="./assets/png/construction-vector-free-icon-set-39.png"
              borderRadius={'10px'}
              width={'64px'}
              height={'64px'}
              background="white"
              p={1}
            />
            <Text fontSize="1.25rem">New UI under construction, launching mid summer!</Text>
          </Flex>
        </InsuranceBox>
        {/* <Image src="./assets/jpg/background-1920.jpg" position="absolute" right="38%" bottom="20%" zIndex="1" /> */}
        <Box
          bgImage="url('./assets/png/meme-version.png')"
          bgPosition="center"
          bgRepeat="no-repeat"
          height={'100%'}
          bgSize="cover"
        >
          <Video
            bottom="-12%"
            left="4vw"
            thumbnailSrc={BELLA.thumbnailSrcHome}
            onClick={() => {
              openVid(BELLA.home);
              setRiskLevel('Risk Level: Safest');
              setModel('BELLA');
            }}
            label="MEET BELLA"
            withOuterBox
          />
          <Video
            bottom="-12%"
            left="50%"
            transform="translate(-50%, 0)"
            thumbnailSrc={WILL.thumbnailSrcHome}
            onClick={() => {
              openVid(WILL.home);
              setRiskLevel('Risk Level: Balanced');
              setModel('WILL');
            }}
            label="MEET WILL"
            withOuterBox
          />
          <Video
            bottom="-12%"
            right="4vw"
            thumbnailSrc={SOPHIE.thumbnailSrcHome}
            onClick={() => {
              openVid(SOPHIE.home);
              setRiskLevel('Risk Level: Risk On');
              setModel('SOPHIE');
            }}
            label="MEET SOPHIE 🔒"
            withOuterBox
          />
          {/*
          <ImageComeToBWS
            src="./assets/png/come-to-bws-models.png"
            width={'calc(65vw)'}
            zIndex={3}
          />
          <ImageMemePepe
            src="./assets/png/meme-pepe-table-slam.png"
            zIndex={2}
          />
          <ImageMemeTJ
            src="./assets/png/meme-tj-shoot.png"
            zIndex={2}
          /> */}
        </Box>

        <Flex p={15} mt={'8rem'} mb={5} justifyContent="center" alignItems="flex-end" gap="10">
          <HomepageItem item={items[0]} />
          <HomepageItem item={items[1]} />
          {hasPortfolio ? <HomepageItem item={items[2]} /> : <TradeItem item={items[2]} />}
          <HomepageItem item={items[3]} />
        </Flex>
      </Box>

      <VideoPlayerModal src={videoUrl} isOpen={isOpen} onClose={onClose} riskLabel={riskLevel} modelLabel={model} />
    </Box>
  );
};

export default Landing;
