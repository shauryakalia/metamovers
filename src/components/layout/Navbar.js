/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';
import loading_url from '../../imgs/Metamovers.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const githubContext = useContext(GithubContext);
  const scrollToSection = (elemId) => {
    var element = document.getElementById(elemId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };
  const [blcktxt, setBlacktxt] = useState(false);
  useEffect(() => {
    setBlacktxt(['/buyNow', '/comingSoon'].includes(window.location.pathname));
    //eslint-disable-next-line
  }, [window.location.pathname]);

  const redirectPage = (url, scrollTo) => {
    navigate(url);
    if (scrollTo) scrollToSection(scrollTo);
    if (['/buyNow', '/comingSoon'].includes(url)) {
      setBlacktxt(true);
    } else {
      setBlacktxt(false);
    }
  };

  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg navbar-light ${
          isMobile ? 'p-1 d-flex justify-content-center' : 'p-5'
        } ${blcktxt ? 'sticky-top' : ''}`}
      >
        <span
          onClick={() => redirectPage('/', 'aboutSection')}
          className="navbar-brand text-info"
        >
          <img
            src={loading_url}
            alt="metamovers"
            style={isMobile ? { marginTop: '5%' } : { marginLeft: '10%' }}
            height="50px"
          />
        </span>
        <button
          className="navbar-toggler d-none"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul
          className={`navbar-nav ${isMobile ? 'd-flex flex-row' : 'ml-auto'} `}
        >
          <li className={`${isMobile ? 'mobile-nav-item' : 'nav-item'}`}>
            <span
              onClick={() => redirectPage('/', 'aboutSection')}
              className={`nav-link hover-underline-animation ${
                blcktxt ? 'd-none' : 'text-white'
              }`}
            >
              About
            </span>
          </li>
          <li className={`${isMobile ? 'mobile-nav-item' : 'nav-item'}`}>
            <span
              onClick={() => scrollToSection('metamoversSection')}
              className={`nav-link hover-underline-animation ${
                blcktxt ? 'd-none' : 'text-white'
              }`}
            >
              Metamovers
            </span>
          </li>
          <li className={`${isMobile ? 'mobile-nav-item' : 'nav-item'}`}>
            <span
              onClick={() => scrollToSection('roadMapSection')}
              className={`nav-link hover-underline-animation ${
                blcktxt ? 'd-none' : 'text-white'
              }`}
            >
              Roadmap
            </span>
          </li>
          <li className={`${isMobile ? 'mobile-nav-item' : 'nav-item'}`}>
            <span
              onClick={() => scrollToSection('theTeamSection')}
              className={`nav-link hover-underline-animation ${
                blcktxt ? 'd-none' : 'text-white'
              }`}
            >
              The Team
            </span>
          </li>
          <li className={`${isMobile ? 'd-none' : 'nav-item'}`}>
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
                onClick={() => redirectPage('/comingSoon')}
              >
                Buy Now
              </span>
            )}
          </li>
        </ul>
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
