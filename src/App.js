import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import BuyNow from './components/pages/BuyNow';
import Admin from './components/pages/Admin';
import NotFound from './components/pages/NotFound';
import ComingSoon from './components/pages/ComingSoon';
import OurStory from './components/pages/OurStrory';

import GithubState from './context/metamovers/actions';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider, connector) {
  return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GithubState>
        <Router>
          <div className="App">
            <Navbar title="Metamovers" />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/buyNow" element={<BuyNow />} />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/comingSoon" element={<ComingSoon />} />
              <Route exact path="/OurStory" element={<OurStory />} />
              <Route element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </GithubState>
    </Web3ReactProvider>
  );
};

export default App;
