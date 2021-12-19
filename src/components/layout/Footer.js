/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import GithubContext from '../../context/metamovers/context';
// import logo from '../../imgs/Metamovers.png';
import { isMobile } from 'react-device-detect';

const Footer = ({ logo, social = [] }) => {
  const githubContext = useContext(GithubContext);
  const scrollToSection = (elemId) => {
    var element = document.getElementById(elemId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const updatedSocial = social[0] || {};
  const keySocialMap = {
    instagram: 'fab fa-instagram',
    behance: 'fab fa-behance',
    facebook: 'fab fa-facebook',
    youtube: 'fab fa-youtube',
    twitter: 'fab fa-twitter',
    spotify: 'fab fa-spotify',
    soundcloud: 'fab fa-soundcloud',
    tiktok: 'fab fa-youtube',
    youtubesecond: 'fab fa-youtube',
    id: 'fas fa-globe',
    personalweb: 'fas fa-globe',
  };

  return (
    <div className="row footer themeBgClr text-white">
      <div className="col-12 p-3">
        <div className="row d-flex justify-content-center align-items-center">
          <img src={logo} alt="metamovers" height="50px" />
        </div>
        {isMobile ? null : (
          <div
            className={`row d-flex justify-content-center align-items-center`}
          >
            <span
              className="navlinks"
              onClick={() => scrollToSection('aboutSection')}
            >
              About
            </span>
            <span
              className="navlinks"
              onClick={() => scrollToSection('metamoversSection')}
            >
              Metamovers
            </span>
            <span
              className="navlinks"
              onClick={() => scrollToSection('roadMapSection')}
            >
              Roadmap
            </span>
            <span
              className="navlinks"
              onClick={() => scrollToSection('theTeamSection')}
            >
              The Team
            </span>
          </div>
        )}

        <hr className={`border ${isMobile ? 'd-none' : ''}`} />
        <div className="d-flex justify-content-between align-items-center row">
          <div
            className={`col-md-6 col-xs-12 ${isMobile ? 'text-center' : ''}`}
          >
            Copyright © 2021 Metamovers. All right reserved.
          </div>
          <div
            className={`col-md-6 col-xs-12 ${
              isMobile ? 'text-center' : 'text-right'
            }`}
          >
            {Object.entries(updatedSocial).map(([key, value]) => (
              <a
                className={`btn btn-floating  m-1 text-white ${
                  value ? '' : 'd-none'
                }`}
                href={value || '#!'}
                role="button"
              >
                <i className={`${keySocialMap[key]}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
