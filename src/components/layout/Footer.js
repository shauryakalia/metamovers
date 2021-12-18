/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import GithubContext from '../../context/metamovers/context';
// import logo from '../../imgs/Metamovers.png';

const Footer = ({ logo, social = [] }) => {
  const githubContext = useContext(GithubContext);
  const scrollToSection = (elemId) => {
    var element = document.getElementById(elemId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const updatedSocial = social[0] || {};

  return (
    <div className="row footer themeBgClr text-white">
      <div className="col-12 p-3">
        <div className="row d-flex justify-content-center align-items-center">
          <img src={logo} alt="metamovers" height="50px" />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
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
        <hr className="border" />
        <div className="d-flex justify-content-between align-items-center">
          <div className="col-md-6 col-xs-12">
            Copyright © 2021 Metamovers. All right reserved.
          </div>
          <div className="col-md-6 col-xs-12 text-right">
            {Object.entries(updatedSocial).map(([key, value]) => (
              <a
                className={`btn btn-floating  m-1 text-white ${
                  value ? '' : 'd-none'
                }`}
                href={value || '#!'}
                role="button"
              >
                <i className={`fab fa-${key}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
