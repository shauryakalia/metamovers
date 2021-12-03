import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GithubContext from "../../context/github_finder/context";

const Navbar = ({ title }) => {
  const githubContext = useContext(GithubContext);
  const [searchUserText, setsearchUserText] = useState("");
  const [errorpage, seterrorpage] = useState(false);

  const onChange = e => {
    setsearchUserText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (searchUserText !== "") {
      githubContext.searchUsers(searchUserText);
    } else {
      seterrorpage(true);
      setTimeout(function() {
        seterrorpage(false);
      }, 1500);
    }
  };

  return (
    <React.Fragment>
      {errorpage && (
        <div className="alert alert-danger mt-5" role="alert">
          Please specify the user name.
        </div>
      )}

      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Link className="navbar-brand text-info" to="/">
          <i className="fas fa-user-circle fa-lg"></i>
          &nbsp;
          {title}
        </Link>
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
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link" to="AboutUs">
                About us
              </Link>
            </li>
          </ul>
          <form
            className="form-inline my-2 my-lg-0 ml-auto col-md-10"
            onSubmit={onSubmit}
          >
            <input
              className="form-control mr-sm-2 col-md-8 ml-auto"
              type="search"
              placeholder="Enter Name"
              aria-label="Search"
              name="searchUserText"
              value={searchUserText}
              onChange={onChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search Github Users
            </button>
          </form>
        </div>
      </nav>
    </React.Fragment>
  );
};

Navbar.defaultProps = {
  title: "Page Title"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

export default Navbar;
