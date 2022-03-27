import React from 'react';
import { useNavigate } from 'react-router';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  Text,
  Button
} from '@chakra-ui/react';
import ReactPlayer from 'react-player/lazy';

type VideoPlayerModal = {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  riskLabel?: string;
  modelLabel?: string;
};

export const VideoPlayerModal: React.FC<VideoPlayerModal> = ({
  src, isOpen, onClose, riskLabel, modelLabel
}) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody p={5}>
          <ReactPlayer url={src} pr={3} />
          {
            riskLabel && (
              <Flex direction="column" align="center" justifyContent="center">
                <Text fontSize="1.5rem" fontWeight="bold" py={4}>
                  {riskLabel}
                </Text>
                <Button
                  colorScheme="flamingo"
                  width="320px"
                  fontSize="18px"
                  size={'lg'}
                  onClick={() => navigate('/optimizer')}
                >
                  {modelLabel === "SOPHIE" ? "Optimize Now" : `Trade with ${modelLabel}`}
                </Button>
              </Flex>
            )
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
