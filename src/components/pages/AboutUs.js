import React, { Component } from "react";

export class AboutUs extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hello!</h1>
        <p className="lead">
          This is a simple Github User App, a simple react App for Searching
          github User ,extra feature like You can see content or information
          about the user.
        </p>
        <hr className="my-4" />
        <p>This is still in Development Stage, More feature to come.</p>
        <a className="btn btn-primary btn-lg" href="!#" role="button">
          Free Free to Contact. Design and Developed By
          {process.env.REACT_APP_MY_NAME}
        </a>
      </div>
    );
  }
}

export default AboutUs;
