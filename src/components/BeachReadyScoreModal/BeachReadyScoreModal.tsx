import React from 'react';
import {
  Center,
  chakra,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

type BeachReadyScoreModal = {
  isOpen: boolean;
  onClose: () => void;
};

const BeachReadyScoreModal: React.FC<BeachReadyScoreModal> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Beach Ready Score</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={10}>
          <Table mb={5} size="sm" variant="simple">
            <Thead background="#E5E7EB" borderRadius="10px">
              <Tr>
                <Th borderTopLeftRadius="10px">No enough data / Very Speculative</Th>
                <Th>Speculative</Th>
                <Th>Neutral</Th>
                <Th>Positive Dynamics</Th>
                <Th>Sound Money</Th>
                <Th>Ultrasound Project</Th>
                <Th borderTopRightRadius="10px">WAGMI</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>-10</Td>
                <Td>-5</Td>
                <Td>0</Td>
                <Td>5</Td>
                <Td>10</Td>
                <Td>15</Td>
                <Td>20</Td>
              </Tr>
            </Tbody>
          </Table>

          <Text>
            Beach ready score is a risk adjusted proprietary metric of BWS dapp provided by QV LABS. It is tilted to
            favorite safety instead of absolute returns and take into account quantitive and fundamental signals (TVL,
            user engagement.) using a set of on chan and off chain metrics.
          </Text>

          <Text mt={6}>
            Value are in range{' '}
            <chakra.span color="red" fontWeight="600">
              [-10,20]
            </chakra.span>
          </Text>

          <Text mt={5}>
            Beach ready score methodology is inspired by systematic trading (Carver, 2017). <br />
            For more details see https://www.systematicmoney.org/systematic-trading
          </Text>

          <Text mt={5}>
            Avax is consider 'sound money' as other stable coins and they will have default value of 10.
          </Text>

          <Text mt={5}>
            A negative value does not necessarily imply that the price of the asset is not attractive in absolute sense,
            but or that there is not enough or that should be modelled an speculative bet. Thus in advisable to be used
            accordingly.
          </Text>

          <Center>
            <Image mt={5} src="./assets/png/beach_ready.png" loading="lazy" />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BeachReadyScoreModal;
