import React from 'react';
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { HiDotsHorizontal, HiInformationCircle } from 'react-icons/hi';

type TradingDeskModal = {
  isOpen: boolean;
  onClose: () => void;
  toggleTransactionListModal: () => void;
  investAmount: number;
  setInvestAmount: (value: number) => void;
};

const TradingDeskModal: React.FC<TradingDeskModal> = ({
  isOpen,
  onClose,
  toggleTransactionListModal,
  setInvestAmount,
  investAmount,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Trading Desk</ModalHeader>
        <ModalCloseButton />
        <Box>
          <Box my={5} px={5}>
            <Text>
              At this epoch <chakra.span>36406 USD</chakra.span> are still available. How much space you want to claim
              in the vault?
            </Text>

            <Grid mt={5} alignItems="center" templateColumns="50px 1fr">
              <Text>USD</Text>
              <Input
                type={'number'}
                value={investAmount}
                placeholder="Enter amount"
                onChange={e => {
                  setInvestAmount(parseInt(e.target.value, 10));
                }}
              />
            </Grid>
          </Box>

          <Divider />

          <Flex alignItems="center" px={5}>
            <Box mr={5}>
              <Image src="./assets/svg/will_profile.svg" boxSize="135px" />
            </Box>
            <Flex flexDirection="column" justifyContent="space-between" gap={3}>
              <Text>We bundle the transaction for you, but you are subjects to Trader Joe fees and slippage</Text>
              <Button
                disabled={!(investAmount > 0)}
                width="300px"
                colorScheme="cod-gray"
                fontSize="14px"
                onClick={() => {
                  if (investAmount) {
                    toggleTransactionListModal();
                  }
                }}
              >
                Trader Joe Transactions
              </Button>
            </Flex>
          </Flex>

          <Divider />

          <Box mt={5} px={5}>
            <Text color="accentOutlines" fontWeight="600">
              OTC Desk
            </Text>

            <Text mt={5}>
              Execute your portfolio with our OTC desk at <b>ZERO fees</b>
            </Text>
          </Box>
          <Divider mt={5} />

          <Box px={5}>
            <Tabs isFitted variant={'unstyled'} colorScheme="flamingo" mt={5}>
              <TabList mb="1em" border="1px solid #E5E7EB" borderRadius="5px">
                <Tab
                  py={3}
                  borderRadius={'5px'}
                  _selected={{ color: 'flamingo.500', bg: '#FECACA', fontWeight: '600' }}
                >
                  Deposit
                </Tab>
                <Tab
                  py={3}
                  borderRadius={'5px'}
                  _selected={{ color: 'flamingo.500', bg: '#FECACA', fontWeight: '600' }}
                >
                  <Tooltip
                    label={
                      'Half of the withdrawal penalty (up to 5%) is going to finance the insurance cost of users who stick with the strategy until the end of the epoch.'
                    }
                  >
                    <Box>Withdraw</Box>
                  </Tooltip>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={1} pt={1}>
                  <Box>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontSize="14px" fontWeight={'600'}>
                        Deposit amount
                      </Text>
                      <Button size={'sm'}>MAX</Button>
                    </Flex>
                  </Box>

                  <Box mt={5}>
                    <Input placeholder="0.0" size={'lg'} height="70px" />
                  </Box>

                  <Box mt={3}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontSize="14px" fontWeight={'600'}>
                        Available
                      </Text>
                      <HiDotsHorizontal color="#718096" />
                    </Flex>
                  </Box>

                  <Grid templateColumns="1fr 1fr" gap={5} mt={5}>
                    <GridItem>
                      <Flex
                        py={2}
                        borderRadius="6px"
                        border="1px solid gray"
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Image src="./assets/svg/discord.svg" mr={3} />
                        <Text fontSize="14px">Discord</Text>
                      </Flex>
                    </GridItem>
                    <GridItem>
                      <Flex
                        py={2}
                        borderRadius="6px"
                        border="1px solid gray"
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Image src="./assets/svg/telegram.svg" mr={3} />
                        <Text fontSize="14px">Telegram</Text>
                      </Flex>
                    </GridItem>
                  </Grid>

                  <Box mt={3}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Flex alignItems={'center'}>
                        <Text mr={1} fontSize="14px" fontWeight={'600'}>
                          Claimable xBWS:
                        </Text>
                        <HiInformationCircle fontSize="14px" color="#6B7280" />
                      </Flex>

                      <HiDotsHorizontal color="#718096" />
                    </Flex>
                  </Box>

                  <Divider mt={5} />

                  <Box mt={3}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Flex alignItems={'center'}>
                        <Text mr={1} fontSize="14px" fontWeight={'600'}>
                          Index Value:
                        </Text>
                        <HiInformationCircle fontSize="14px" color="#6B7280" />
                        <Text ml={3} fontSize="14px" fontWeight={'semibold'}>
                          100
                        </Text>
                      </Flex>

                      <HiDotsHorizontal color="#718096" />
                    </Flex>
                  </Box>

                  <Button mt={5} w="100%" colorScheme={'cod-gray'} disabled>
                    Claim Shares
                  </Button>
                </TabPanel>
                <TabPanel>
                  <Box>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontSize="14px" fontWeight={'600'}>
                        Withdraw amount
                      </Text>
                      <Button size={'sm'}>MAX</Button>
                    </Flex>
                  </Box>

                  <Box mt={5}>
                    <Input placeholder="0.0" size={'lg'} height="70px" />
                  </Box>

                  <Box mt={3}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontSize="14px" fontWeight={'600'}>
                        Available
                      </Text>
                      <HiDotsHorizontal color="#718096" />
                    </Flex>
                  </Box>

                  <Flex
                    py={2}
                    borderRadius="6px"
                    border="1px solid gray"
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Image src="./assets/svg/chainlink_link_logo.svg" width="18px" mr={2} />
                    <Text fontSize="14px" color="#2a5ada" fontWeight="600">
                      Chainlink
                    </Text>
                  </Flex>

                  <Box mt={3}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Flex alignItems={'center'}>
                        <Text mr={1} fontSize="14px" fontWeight={'600'}>
                          Claimable xBWS:
                        </Text>
                        <HiInformationCircle fontSize="14px" color="#6B7280" />
                      </Flex>

                      <HiDotsHorizontal color="#718096" />
                    </Flex>
                  </Box>

                  <Divider mt={5} />

                  <Box mt={3}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Flex alignItems={'center'}>
                        <Text mr={1} fontSize="14px" fontWeight={'600'}>
                          Index Value:
                        </Text>
                        <HiInformationCircle fontSize="14px" color="#6B7280" />
                        <Text ml={3} fontSize="14px" fontWeight={'semibold'}>
                          100
                        </Text>
                      </Flex>

                      <HiDotsHorizontal color="#718096" />
                    </Flex>
                  </Box>

                  <Button mt={5} w="100%" colorScheme={'cod-gray'} disabled>
                    Claim Shares
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box my={3} px={5}>
            <Text>
              💡 Your <b>XBWS</b> tokens grow as the <b>XBWS</b> multiplier goes up.
            </Text>

            <Text mt={5}>
              Multiplier is changing daily according the value of the underlying portfolio. You can request an unwind
              quote from OTC desk anytime.
            </Text>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default TradingDeskModal;
