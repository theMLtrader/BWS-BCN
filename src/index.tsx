import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './theme';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MoralisProvider } from 'react-moralis';
import { MORALIS } from 'constants/moralis';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ChakraProvider theme={theme} resetCSS>
        <DndProvider backend={HTML5Backend}>
          <MoralisProvider appId={MORALIS.appId} serverUrl={MORALIS.serverUrl}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </MoralisProvider>
        </DndProvider>
      </ChakraProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
