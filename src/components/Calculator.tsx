import React, { useEffect } from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

export const Calculator = () => {
  const [depositAmount, setDepositAmount] = React.useState<number | undefined>(undefined);
  const [epochApr, setEpochApr] = React.useState(10);
  const [potentialReturn, setPotentialReturn] = React.useState(0);
  const [months, setMonths] = React.useState(0);

  useEffect(() => {
    if (!depositAmount || !epochApr || !months) {
      setPotentialReturn(0);
      return;
    }

    const a = epochApr / 100;
    const b = a + 1;
    const c = b ** months;
    const annualizedAPR = c - 1;
    setPotentialReturn(depositAmount * annualizedAPR);
  }, [depositAmount, epochApr, months]);
  return (
    <>
      <Box>
        <Box w="100%" bg="white" borderRadius="10px" p={5}>
          <Center mb={3}>
            <Text fontSize="20px" fontWeight={'semibold'}>
              Calculator
            </Text>
          </Center>
          <Grid templateColumns="1fr 1fr" gap={6}>
            <GridItem w="100%">
              <FormControl>
                <FormLabel>Deposited Amount in USD</FormLabel>
                <InputGroup size="sm">
                  <Input
                    placeholder="0"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(+e.target.value)}
                  />
                  <InputRightElement color="paleSky.500" w="20%">
                    Max
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>Time invested in the market is your best edge</FormHelperText>
              </FormControl>
            </GridItem>
            <GridItem w="100%">
              <FormControl>
                <FormLabel>APR (%)</FormLabel>
                <InputGroup size="sm">
                  <Input
                    placeholder="0"
                    type="number"
                    value={epochApr}
                    onChange={(e) => setEpochApr(+e.target.value)}
                  />
                  <InputRightElement color="paleSky.500" w="20%">
                    Current
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </GridItem>
          </Grid>

          <Box mt={5}>
            <Text>{months} months</Text>
            <Slider
              colorScheme="flamingo"
              aria-label="slider-ex-1"
              defaultValue={months}
              min={0}
              max={12}
              step={1}
              onChange={(e) => setMonths(e)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb borderColor="flamingo.500" />
            </Slider>
          </Box>
        </Box>
      </Box>

      <Box>
        <Divider />
      </Box>
      <Box>
        <Flex bg={'white'} justifyContent={'space-between'} alignItems={'center'} p={5}>
          <Text>Potential return</Text>
          <Text>${potentialReturn.toLocaleString()}</Text>
        </Flex>
      </Box>
    </>
  );
};
