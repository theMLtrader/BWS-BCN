import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { useTokenDrop } from 'store/tokenDrop.store';
import { useQuery } from 'react-query';
import { Token } from 'types';
import { axiosClient } from 'utils/axiosClient';

const itemTypes = {
  TOKEN: 'token',
};

const Logos = () => {
  const { data } = useQuery<{ tokens: Token[] }>('tokens', () => axiosClient.get('/token/list').then((x) => x.data));
  return (
    <>
      <Flex overflowY="auto" flexWrap="wrap" gap="3">
        {data?.tokens.map((token) => (
          <TokenImage image={token.logoUrl} key={token.contractAddress} name={token.contractTickerSymbol} />
        ))}
      </Flex>
    </>
  );
};

const TokenImage: React.FC<{ image: string; name: string }> = ({ image, name }) => {
  const setToken = useTokenDrop((state) => state.setToken);
  const [_, drag] = useDrag(() => ({
    type: itemTypes.TOKEN,
    item: { name, logoUrl: image },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ name: number }>();
      setToken(dropResult!.name, name);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return <Image borderRadius={'99999px'} loading="lazy" src={image} alt={name} width={70} cursor="grab" ref={drag} />;
};

export default Logos;
