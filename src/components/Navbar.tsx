import { Box, Flex, Image, Button, Link, Text, useToast, Tag, TagLabel } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAccount } from 'store/account.store';
import { AVAX_CHAIN_ID } from 'constants/avaxChainId';
import Blockies from 'react-blockies';
import { useChain, useMoralis } from 'react-moralis';
import { toSha256 } from 'utils/toSha256';

const CustomLink: React.FC<{ route: string; currentPath: string }> = ({ currentPath, route, children }) => (
  <NavLink to={route}>
    <Link fontWeight={currentPath === route ? '700' : '500'} color={currentPath === route ? 'red' : 'unset'}>
      {children}
    </Link>
  </NavLink>
);

const Navbar: React.FC = () => {
  const loc = useLocation();
  const account = useAccount((state) => state.account);
  const setAccount = useAccount((state) => state.setAccount);
  const setHash = useAccount((state) => state.setHash);
  const setAccountId = useAccount((state) => state.setAccountId);
  const setOptimizeCount = useAccount((state) => state.setOptimizeCount);

  const toast = useToast();
  const { Moralis, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user } = useMoralis();
  const { chainId } = useChain();

  const onConnectWallet = async () => {
    const locUser = await Moralis.authenticate({
      signingMessage: 'Please login to BWS',
      chainId: 43114,
      provider: 'metamask',
    });
    window.localStorage.setItem('connectorId', 'metamask');
    const address = locUser?.get('ethAddress');

    const User = Moralis.Object.extend('User');
    const query = new Moralis.Query(User);
    query.get(locUser.id).then(async (userData) => {
      const userHash = userData.get('hash');
      const userOptimizeCount = userData.get('optimizeCount');
      if (userHash && userHash.length > 3) {
        setHash(userHash);
      } else {
        const generatedHash = await toSha256(locUser.id);
        userData.set('hash', generatedHash);
        await userData.save();
        setHash(generatedHash);
      }

      setOptimizeCount(userOptimizeCount);
    });
    setAccountId(locUser.id);
    setAccount(address);
  };

  useEffect(() => {
    if (user) {
      const address = user?.get('ethAddress');

      const User = Moralis.Object.extend('User');
      const query = new Moralis.Query(User);
      query.get(user.id).then(async (userData) => {
        const userHash = userData.get('hash');
        const userOptimizeCount = userData.get('optimizeCount');
        if (userHash.length > 3) {
          setHash(userHash);
        } else {
          const generatedHash = await toSha256(user.id);
          userData.set('hash', generatedHash);
          await userData.save();
          setHash(generatedHash);
        }

        setOptimizeCount(userOptimizeCount);
      });
      setAccountId(user.id);
      setAccount(address);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3({ provider: 'metamask' });
    }
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    window?.ethereum?.on('accountsChanged', function () {
      void onConnectWallet();
    });
    window?.ethereum?.on('chainChanged', function () {
      void onConnectWallet();
    });
  }, []);

  const onSwitchAvaxNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0xA86A',
          chainName: 'Avalanche Mainnet C-Chain',
          nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18,
          },
          rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://snowtrace.io/'],
        },
      ],
    });
  };

  const isOnAvaxNetwork = chainId === AVAX_CHAIN_ID;

  const onCopyAddress = () => {
    void navigator.clipboard.writeText(account);
    toast({
      description: 'Address copied to clipboard',
      status: 'info',
      duration: 3000,
    });
  };

  return (
    <Box h="70px" boxShadow="0px 4px 4px rgba(196, 196, 196, 0.2)">
      <Flex fontWeight={500} color="accentOutlines" alignItems="center" h="full" justifyContent="space-between" mx={10}>
        <Box display="flex" alignItems="center">
          <NavLink to="/">
            <Image src="./assets/png/bws_logo.png" alt="bondiwealthsecurity" cursor="pointer" />
          </NavLink>
          <Tag colorScheme="flamingo" borderRadius="full" ml={2}>
            <TagLabel color="#2a2a2a">Coming Soon</TagLabel>
          </Tag>
        </Box>

        <Flex gap={14}>
          <CustomLink currentPath={loc.pathname} route="/analytics">
            Analytics
          </CustomLink>
          <CustomLink currentPath={loc.pathname} route="/optimizer">
            Optimizer
          </CustomLink>

          <CustomLink currentPath={loc.pathname} route="/trade">
            Trade
          </CustomLink>
          <CustomLink currentPath={loc.pathname} route="/staking-beach-club">
            Staking Beach Club
          </CustomLink>
        </Flex>

        <Box>
          <Flex alignItems="center">
            <Box
              fontSize="14px"
              color="flamingo.500"
              bg="rgba(254, 202, 202, 0.3)"
              py={3}
              px={5}
              mr={3}
              borderRadius="999px"
            >
              Avalanche
            </Box>
            {!isOnAvaxNetwork && account && (
              <Flex
                gap={1}
                alignItems="center"
                color="flamingo.500"
                bg="rgba(254, 202, 202, 0.3)"
                py={3}
                px={5}
                mr={3}
                borderRadius="999px"
                cursor="pointer"
                onClick={onSwitchAvaxNetwork}
              >
                <Image width={4} src="./assets/svg/network.svg" loading="lazy" />
                <Text fontSize="14px" fontWeight="600">
                  Switch to AVAX
                </Text>
              </Flex>
            )}
            {!account && (
              <Button fontSize="14px" colorScheme="flamingo" onClick={onConnectWallet}>
                Connect wallet
              </Button>
            )}
            {account && isOnAvaxNetwork && (
              <Flex
                alignItems="center"
                fontSize="14px"
                bg="white"
                py={2}
                px={3}
                mr={3}
                borderRadius="10px"
                border="1px solid #E5E7EB"
                onClick={onCopyAddress}
                cursor="pointer"
              >
                {account.substr(0, 6)}...{account.substr(account.length - 4, account.length)}
                <Box ml={2}>
                  <Blockies seed={account} size={5} scale={4} />
                </Box>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
