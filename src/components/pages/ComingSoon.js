import React from 'react';
import comingSoon from '../../imgs/comingSoon.gif';

export const ComingSoon = () => {
  return (
    <div className="container-fluid m-5 p-5">
      <h1 className="font-weight-bold">Coming Soon ...</h1>
      <img
        src={comingSoon}
        alt="metamovers"
        height="450px"
        className="loader"
      />
    </div>
  );
};
export default ComingSoon;
