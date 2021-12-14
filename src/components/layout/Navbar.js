/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { a } from 'react-router-dom';
import PropTypes from 'prop-types';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';
import loading_url from '../../imgs/Metamovers.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const githubContext = useContext(GithubContext);
  const scrollToSection = (elemId) => {
    var element = document.getElementById(elemId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const [blcktxt, setBlacktxt] = useState(false);

  const redirectPage = (url, scrollTo) => {
    navigate(url);
    if (scrollTo) scrollToSection(scrollTo);
    if (['/buyNow'].includes(url)) {
      setBlacktxt(true);
    } else {
      setBlacktxt(false);
    }
  };

  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg navbar-light p-5 ${
          blcktxt ? 'sticky-top' : ''
        }`}
      >
        <span
          onClick={() => redirectPage('/', 'aboutSection')}
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
                onClick={() => redirectPage('/', 'aboutSection')}
                className={`nav-link hover-underline-animation ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                About
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('metamoversSection')}
                className={`nav-link hover-underline-animation ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                Metamovers
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('roadMapSection')}
                className={`nav-link hover-underline-animation ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                Roadmap
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('theTeamSection')}
                className={`nav-link hover-underline-animation ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                The Team
              </span>
            </li>
            <li className="nav-item ">
              {blcktxt ? (
                <span
                  className={`navbarBtn shadow-sm`}
                  onClick={() => redirectPage('/', 'aboutSection')}
                >
                  <i className="fas fa-home"></i>
                </span>
              ) : (
                <span
                  className={`navbarBtn shadow-sm`}
                  onClick={() => redirectPage('/buyNow')}
                >
                  Buy Now
                </span>
              )}
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
