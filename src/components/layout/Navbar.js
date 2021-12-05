/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { a } from 'react-router-dom';
import PropTypes from 'prop-types';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';
import loading_url from '../../imgs/Metamovers.png';

const Navbar = ({ title }) => {
  const githubContext = useContext(GithubContext);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top p-5">
        <a className="navbar-brand text-info" href="about">
          <img
            src={loading_url}
            alt="metamovers"
            style={{ marginLeft: '10%' }}
            height="50px"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <a href="about" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item ">
              <a href="metamovers" className="nav-link">
                Metamovers
              </a>
            </li>
            <li className="nav-item ">
              <a href="roadmap" className="nav-link">
                Roadmap
              </a>
            </li>
            <li className="nav-item ">
              <a href="theteam" className="nav-link">
                The Team
              </a>
            </li>
            <li className="nav-item ">
              <span className="nav-link">
                BUY NFT
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

Navbar.defaultProps = {
  title: 'Page Title',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
