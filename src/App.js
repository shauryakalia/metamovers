import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import BuyNow from './components/pages/BuyNow';
import NotFound from './components/pages/NotFound';
import ComingSoon from './components/pages/ComingSoon';

import GithubState from './context/metamovers/actions';

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Metamovers" />
          <Routes>
            <Route exact path="/" element={<BuyNow />} />
            {/* <Route exact path="/buyNow" element={<BuyNow />} /> */}
            {/* <Route exact path="/comingSoon" element={<ComingSoon />} /> */}
            {/* <Route element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
