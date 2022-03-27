import React from 'react';
import {
  Box,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';

type InsuranceSubscriptionModal = {
  isOpen: boolean;
  onClose: () => void;
};

const InsuranceSubscriptionModal: React.FC<InsuranceSubscriptionModal> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Insurance as Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={5} alignItems="center" justifyContent="space-between">
            <Text>
              rBWS is a token minted and distributed for any losses incurred by pool participants. A percentage of the
              losses, after the epoch has ended, is rebated to the Insurance holders.
            </Text>
            <Image src="./assets/png/beach_with_peach.png" width="250px" loading="lazy" />
          </Flex>
          <Box mt={3}>
            <Text>TVL:</Text>
          </Box>
          <Box mt={5}>
            <Text>
              rBWS is given has default options in the optimization and Model Portfolio. Part of your AMM and Farm yield
              is used to keep you safe without incurring in any extra-cost
            </Text>
          </Box>

          <Flex justifyContent="space-between">
            <Flex flexDir="column" justifyContent={'space-between'} my={5}>
              <Stack spacing={3} mt={3}>
                <Text>
                  At the current epoch: <b>#1</b>
                </Text>
                <Text>
                  If you lose: <b>20%</b>
                </Text>
                <Text>
                  BWS reimburse you: <b>10%</b>
                </Text>
              </Stack>

              <Text>
                *We use part of your yield coming from other asset to buy an insurance from a market marker to protect
                you.
              </Text>
            </Flex>

            <Box my={3}>
              <Text fontWeight="600">How it works</Text>
              <Center>
                <iframe
                  width="300"
                  height="250"
                  src="https://www.youtube.com/embed/i65NIcnHS9Y"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Center>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InsuranceSubscriptionModal;
