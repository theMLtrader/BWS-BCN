import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Center, Image } from '@chakra-ui/react';
import { useTokenDrop } from 'store/tokenDrop.store';
import { useQuery } from 'react-query';
import { Token } from 'types';
import { axiosClient } from 'utils/axiosClient';

const findImageSource = (tokens: Token[] | undefined, symbol: string) => {
  if (!tokens || tokens.length === 0) {
    return symbol;
  }

  const foundToken = tokens.find((token) => token.contractTickerSymbol === symbol);
  return foundToken?.logoUrl;
};

const DropTokens: React.FC<{ value: number }> = ({ value }) => {
  const { data } = useQuery<{ tokens: Token[] }>('tokens', () => axiosClient.get('/token/list').then((x) => x.data));
  const [_, drop] = useDrop(
    () =>
      ({
        accept: 'token',
        drop: () => ({ name: value, logoUrl: value }),
        collect: (monitor: Record<string, any>) => ({
          isOver: !!monitor.isOver(),
        }),
      } as any),
    []
  );

  const token: Record<string, any> = useTokenDrop((state) => state.token);
  const setToken = useTokenDrop((state) => state.setToken);

  const onRemoveToken = () => {
    if (!token[value]) {
      return;
    }

    setToken(value, '');
  };

  return (
    <Box
      onClick={onRemoveToken}
      cursor="pointer"
      width="60px"
      height="60px"
      borderRadius="99999px"
      border={`${token[value] ? '1px solid gray' : '1px dashed gray'}`}
      textAlign="center"
      bg={token[value] ? 'white' : 'lightgray'}
      color="white"
      fontWeight="600"
      ref={drop}
    >
      {token[value] ? (
        <Image borderRadius="999999px" loading="lazy" src={findImageSource(data?.tokens, token[value])} />
      ) : (
        <Center h="100%">{value}</Center>
      )}
    </Box>
  );
};

export default DropTokens;
