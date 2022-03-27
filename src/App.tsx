import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { useMediaQuery } from 'react-responsive';

import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

import ErrorHandler from './components/ErrorHandler';
import Navbar from 'components/Navbar';

const Analytics = React.lazy(() => import('pages/Analytics'));
const Optimizer = React.lazy(() => import('pages/Optimizer'));
const Trade = React.lazy(() => import('pages/Trade'));
const StakingBeachClub = React.lazy(() => import('pages/StakingBeachClub'));

const ScreenSizeDetector = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 1rem 3rem;
  font-size: 1.75rem;
  bottom: 0;
  color: white;
  background-color: #ef4444;
  z-index: 100;
  width: 100%;
  text-align: center;
`;

const App: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  return (
    <ErrorHandler>
      {
        isTabletOrMobile ? (
          <ScreenSizeDetector>
            Mobile & Tablet are currently not supported, please use Desktop browser to view BWS
          </ScreenSizeDetector>
        ) : null
      }
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/optimizer" element={<Optimizer />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/staking-beach-club" element={<StakingBeachClub />} />
          <Route element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorHandler>
  );
};

export default App;
