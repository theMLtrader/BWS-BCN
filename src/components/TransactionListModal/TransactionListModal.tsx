import React from 'react';
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  ListItem,
  Text,
} from '@chakra-ui/react';

type TransactionListModal = {
  isOpen: boolean;
  onClose: () => void;
  investAmount: number;
  tokens: any[];
  farms: any[];
  portfolio: any;
};

type PortfolioList = {
  name: string;
  pct: number;
};

const TransactionListModal: React.FC<TransactionListModal> = ({
  isOpen,
  onClose,
  investAmount,
  tokens,
  farms,
  portfolio,
}) => {
  const flatternPortfolio: any = {};
  portfolio.forEach((item: PortfolioList) => {
    flatternPortfolio[item.name] = item.pct;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Required Transactions</ModalHeader>
        <ModalCloseButton />
        <Box>
          <Box my={5} px={5}>
            <Text>
              These are the required trasaction for investing <chakra.span>{investAmount} USD</chakra.span>
            </Text>
          </Box>

          <Divider />

          <Flex p={5} direction="column">
            <Text fontSize="1.25rem" fontWeight="700">
              Tokens
            </Text>
            <OrderedList pl={3}>
              {tokens.map((token: any) => (
                <ListItem key={token.contractTickerSymbol} py={2}>
                  <Text>
                    Swap ${(flatternPortfolio[token.contractTickerSymbol] * investAmount) / 100} for $
                    {token.contractTickerSymbol}
                  </Text>
                </ListItem>
              ))}
            </OrderedList>
          </Flex>

          <Divider />

          <Flex p={5} direction="column">
            <Text fontSize="1.25rem" fontWeight="700">
              Farms
            </Text>
            <OrderedList pl={3}>
              {farms.map((farm: any) => (
                <ListItem key={farm.name} py={2}>
                  <Text>
                    Zap ${(flatternPortfolio[farm.name] * investAmount) / 100} to ${farm.name} Pool
                  </Text>
                </ListItem>
              ))}
            </OrderedList>
          </Flex>

          <Divider />
          <Box p={5} textAlign="center">
            <Button disabled width="300px" colorScheme="cod-gray" fontSize="14px">
              Route All TXs (Coming Soon)
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default TransactionListModal;
