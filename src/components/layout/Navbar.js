/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';
import loading_url from '../../imgs/Metamovers.png';
import desktop from '../../imgs/desktop.png';
import { useNavigate } from 'react-router-dom';
import { useEagerConnect } from '../hooks/useEagerConnect'
import { InjectedConnector } from '@web3-react/injected-connector';
import { truncateAccount } from "../utils/format.js";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const githubContext = useContext(GithubContext);
  const {
    connectionStatus,
    getConnectionStatus,
    walletLoading,
  } = githubContext;
  const scrollToSection = (elemId) => {
    var element = document.getElementById(elemId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };
  const [blcktxt, setBlacktxt] = useState(false);
  const [open, setNav] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState(false);

  const { account, activate } = useEagerConnect();
  const hasMetamask =
      typeof window !== 'undefined' &&
      !!window.ethereum &&
      !!window.ethereum.isMetaMask;

  const handleMetamaskClick = async () => {
    if (!account) {
      if (hasMetamask) {
        const injected = new InjectedConnector({
          supportedChainIds: [1, 4],
        });
        await activate(injected);
      } else {
        window.open('https://metamask.io/', '_blank');
      }
    }
  };

  useEffect(() => {
    setBlacktxt(
      ['/buyNow', '/comingSoon', '/OurStory'].includes(window.location.pathname)
    );
    //eslint-disable-next-line
  }, [window.location.pathname]);

  const redirectPage = (url, scrollTo) => {
    navigate(url);
    if (isMobile) setNav(!open);
    if (scrollTo) scrollToSection(scrollTo);
    if (['/buyNow', '/comingSoon', '/OurStory'].includes(url)) {
      setBlacktxt(true);
    } else {
      setBlacktxt(false);
    }
  };

  const setComingSoonModalFn = (status) => {
    if (isMobile) setNav(!open);
    setComingSoonModal(status);
  };

  const setConnectionStatusFn = async (status) => {
    getConnectionStatus(status);

    if (!account) {
      if (hasMetamask) {
        const injected = new InjectedConnector({
          supportedChainIds: [1, 4],
        });
        await activate(injected);
      } else {
        window.open('https://metamask.io/', '_blank');
      }
    }
  };

  return (
    <React.Fragment>
      <div
        id="comingSoonModal"
        className={`modal ${comingSoonModal ? 'd-block' : 'd-none'}`}
      >
        <div className={`modal-content w-75`}>
          <div className="modal-header">
            <span
              onClick={() => setComingSoonModal(false)}
              className="close text-dark"
            >
              &times;
            </span>
          </div>
          <div className="modal-body p-2 text-center">
            <img src={desktop} alt="desktop" height="150px" className="mb-2" />

            <h5 className="font-weight-bold">
              Please access website on desktop for buying metamovers.
            </h5>
          </div>
        </div>
      </div>
      <div id="myNav" className={`overlay ${open ? 'w-100' : ''}`}>
        <div className="overlay-content">
          <span
            onClick={() => redirectPage('/', 'aboutSection')}
            className="text-white font-weight-bold text-uppercase"
          >
            <span>About </span>
          </span>
          <span
            onClick={() => redirectPage('/', 'metamoversSection')}
            className="text-white font-weight-bold text-uppercase"
          >
            <span>Metamovers </span>
          </span>
          <span
            onClick={() => redirectPage('/', 'roadMapSection')}
            className="text-white font-weight-bold text-uppercase"
          >
            <span>Roadmap </span>
          </span>
          <span
            onClick={() => redirectPage('/', 'theTeamSection')}
            className="text-white font-weight-bold text-uppercase"
          >
            <span>The Team </span>
          </span>
          <span
            className={`navbarBtn shadow-sm overlayNavbarBtn`}
            // onClick={() => redirectPage('/comingSoon')}
            onClick={() => setComingSoonModalFn(true)}
          >
            Buy Now
          </span>
        </div>
      </div>
      <nav
        className={`navbar navbar-expand-lg navbar-light ${
          isMobile
            ? 'shadow-sm pl-3 pr-3 d-flex justify-content-between'
            : 'pl-5 pr-5 pb-5 pt-3'
        }`}
      >
        <span
          onClick={() => redirectPage('/', 'aboutSection')}
          className="navbar-brand text-info"
        >
          <img
            src={loading_url}
            alt="metamovers"
            style={isMobile ? null : { marginLeft: '10%' }}
            height="50px"
          />
        </span>
        <button
          className="navbar-toggler customToggler"
          type="button"
          data-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {open ? (
            <i
              className={`fas fa-times text-white`}
              onClick={() => setNav(!open)}
            ></i>
          ) : (
            <i
              className={`fas fa-bars ${blcktxt ? '' : 'text-dark'}`}
              onClick={() => setNav(!open)}
            ></i>
          )}
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <span
                onClick={() => redirectPage('/', 'aboutSection')}
                className={`nav-link hover-underline-animation pb25 ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                About
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('metamoversSection')}
                className={`nav-link hover-underline-animation pb25 ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                Metamovers
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('roadMapSection')}
                className={`nav-link hover-underline-animation pb25 ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                Roadmap
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={() => scrollToSection('theTeamSection')}
                className={`nav-link hover-underline-animation pb25 ${
                  blcktxt ? 'd-none' : 'text-white'
                }`}
              >
                The Team
              </span>
            </li>
            <li className="nav-item grow">
              {blcktxt ? (
                <div
                  className={
                    window.location.pathname.includes('/OurStory')
                      ? 'd-none'
                      : ''
                  }
                >
                  <span
                    className={`${walletLoading ? 'navLoader' : 'd-none'}`}
                  />
                  <span
                    className={`navbarBtn shadow-sm connectWallet ${
                      connectionStatus === 'success' ? 'connected' : ''
                    }`}
                    onClick={handleMetamaskClick}
                  >
                    <i className="fas fa-wallet"></i> &nbsp;{' '}
                    {account
                      ? truncateAccount(account)
                      : 'Connect Wallet'}
                  </span>
                </div>
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
