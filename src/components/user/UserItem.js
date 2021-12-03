import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "../css/user.module.css";

const UserItem = ({
  user: {
    login,
    type,
    avatar_url,
    Info,
    html_url,
    url,
    subscriptions_url,
    organizations_url,
    repos_url
  }
}) => {
  // state = {
  //   Name: "Shubham Sunny",
  //   Age: "25",
  //   Avatar:
  //     "https://avatars0.githubusercontent.com/u/20963383?s=400&u=7fafd64df09ed08222527d35a9f29f74d2427d5e&v=4",
  //   Info:
  //     "Graduated from NIT kurukshetra with Information Technology stream.Frontend Developer at Tolexo india Pvt. ltd .(current)",
  //   Github_Profile: "https://github.com/ShubhamSahaniNitkkr"
  // };
  // render() {
  // const { Name, Age, Avatar, Info, Github_Profile } = this.state;
  // const { Name, Age, Avatar, Info, Github_Profile } = props.user;

  return (
    <div className={`card shadow-sm mb-5 bg-white rounded ${styles.cardhover}`}>
      <Link to={`/Profile/${login}`}>
        <img src={avatar_url} className="card-img-top" alt="..." />
      </Link>
      <div className="card-body">
        <h5 className="card-title">
          {login} ({type})
        </h5>
        <p className="card-text">{Info}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={subscriptions_url}
            className="card-link text-info"
          >
            {subscriptions_url}
          </a>
        </li>
        <li className="list-group-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={repos_url}
            className="card-link text-info"
          >
            {repos_url}
          </a>
        </li>
      </ul>
      <div className="card-body">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={html_url}
          className="card-link"
        >
          Github
        </a>
        <Link to={`/Profile/${login}`} className="card-link">
          Profile
        </Link>
      </div>
    </div>
  );
  // }
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};
export default UserItem;
