import { Button, ButtonProps } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import React from 'react';

const RedButton: React.FC<ButtonProps & { isHovered?: boolean; height?: string; width?: string }> = ({
  isHovered,
  height = '40px',
  width = '40px',
  ...props
}) => (
  <Button
    h={height}
    w={width}
    borderRadius="full"
    backgroundColor={isHovered ? 'red.400' : 'errorDark'}
    _hover={{
      backgroundColor: 'red.400',
    }}
    _active={{
      backgroundColor: 'errorDark',
    }}
    {...props}
  >
    <FaPlay color="white" />
  </Button>
);

export default RedButton;
