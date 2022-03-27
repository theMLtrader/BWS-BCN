import React from 'react';
import {Box, Image} from "@chakra-ui/react";
import {BELLA} from "constants/videoUrls";

export const Bridge = () => {
    return (
        <Box position="relative">
            <Box height="300px" width="560px" p={5} bg="white" borderRadius="10px" filter="grayscale(70%)" pointerEvents={'none'}>
                <Box
                    bgImage="url('./assets/png/level_2.png')"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    height="100%"
                    bgSize="cover"

                >
                </Box>
            </Box>
            <a href="https://bondibellasurfcamp.vercel.app/" target="_blank">
                <Image src={BELLA.thumbnailSrcOptimizer} pos={'absolute'} width="180px" left="60px" bottom="100px" />
            </a>
            <a href="https://bondipeachqueen.vercel.app/" target="_blank">
                <Image src="./assets/png/peach.png" pos={'absolute'} width="120px" right="60px" bottom="100px" />
            </a>
        </Box>
    )
}