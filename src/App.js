import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/user/Users';
import Profile from './components/user/Profile';
import Aboutus from './components/pages/AboutUs';
import NotFound from './components/pages/NotFound';

import GithubState from './context/github_finder/actions';

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" />
          <Routes>
            <Route exact path="/" element={<Users />} />
            <Route exact path="/AboutUs" element={<Aboutus />} />
            <Route
              exact
              path="/Profile/:username"
              element={<Profile/>}
            />
            <Route element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
