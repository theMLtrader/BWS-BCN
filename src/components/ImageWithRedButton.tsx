import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import RedButton from 'components/RedButton';

type ImageWithRedButton = {
  src: string;
  height?: string;
  width?: string;
  buttonTop?: string;
  buttonRight?: string;
  buttonSize?: string;
  withOuterBox?: boolean;
};

export const ImageWithRedButton: React.FC<ImageWithRedButton> = ({
  src,
  height = '100px',
  width = '140px',
  buttonTop = '31px',
  buttonRight = '35%',
  buttonSize = '40px',
  withOuterBox = false,
}) => (
  <Box
    position="relative"
    cursor="pointer"
    border={withOuterBox ? '10px solid rgb(239, 68, 68, 0.1)' : 'none'}
    borderRadius={withOuterBox ? '5px' : 'none'}
  >
    <Image loading="lazy" src={src} height={height} width={width} />
    <RedButton height={buttonSize} width={buttonSize} position="absolute" top={buttonTop} right={buttonRight} />
  </Box>
);
