import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Aboutus from './components/pages/AboutUs';
import NotFound from './components/pages/NotFound';

import GithubState from './context/metamovers/actions';

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Metamovers" />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/AboutUs" element={<Aboutus />} />
            <Route element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
