/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { a } from 'react-router-dom';
import PropTypes from 'prop-types';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';
import loading_url from '../../imgs/Metamovers.png';

const Navbar = ({ title }) => {
  const githubContext = useContext(GithubContext);
  const scrollToSection = (elemId) => {
    var element = document.getElementById(elemId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light p-5">
        <span
          onClick={() => scrollToSection('aboutSection')}
          className="navbar-brand text-info"
        >
          <img
            src={loading_url}
            alt="metamovers"
            style={{ marginLeft: '10%' }}
            height="50px"
          />
        </span>
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
              <span
                onClick={() => scrollToSection('aboutSection')}
                className="nav-link hover-underline-animation"
              >
                About
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('metamoversSection')}
                className="nav-link hover-underline-animation"
              >
                Metamovers
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('roadMapSection')}
                className="nav-link hover-underline-animation"
              >
                Roadmap
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('theTeamSection')}
                className="nav-link hover-underline-animation"
              >
                The Team
              </span>
            </li>
            <li className="nav-item ">
              <span className="navbarBtn shadow-sm">BUY NOW</span>
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
