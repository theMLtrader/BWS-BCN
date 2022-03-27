import { Box, BoxProps, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

import RedButton from "./RedButton";

const Video: React.FC<BoxProps & {
  thumbnailSrc?: string,
  withOuterBox?: boolean,
  label?: string,
}> = ({
  thumbnailSrc,
  withOuterBox = false,
  label,
  ...props
}) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <Box
      position="absolute"
      border={withOuterBox ? '10px solid rgb(255, 255, 255, 0.2)' : 'none'}
      borderRadius={withOuterBox ? '5px' : 'none'}
      onMouseOver={() => {
        if (!isHovered) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (isHovered) {
          setHovered(false);
        }
      }}
      cursor="pointer"
      {...props}
    >
      <motion.img
        src={thumbnailSrc}
        alt="video"
        initial={{ width: "20vw" }}
        animate={{ width: isHovered ? "22vw" : "20vw" }}
        transition={{
          type: "tween",
          ease: "easeInOut",
        }}
      />
      <RedButton
        zIndex="4"
        position="absolute"
        top="50%"
        left="50%"
        transform={'translate(-50%, -50%)'}
        isHovered={isHovered}
      />
      {
        label && (
          <Text
            position={'absolute'}
            top={'-66px'}
            left={'50%'}
            transform={'translate(-50%, 0%)'}
            fontWeight={'700'}
            fontSize={'1rem'}
            color="#Ef4444"
            background="white"
            padding="10px 12px"
            width="160px"
            borderRadius="1.5rem"
            align={'center'}
          >
            {label}
          </Text>
        )
      }
    </Box>
  );
};

export default Video;
