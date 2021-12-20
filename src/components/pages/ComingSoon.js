import React from 'react';
import comingSoon from '../../imgs/comingSoon.gif';

export const ComingSoon = () => {
  return (
    <div className="container-fluid m-5 p-5">
      <img
        src={comingSoon}
        alt="metamovers"
        height="450px"
        className="loader"
      />
      <h1 className="font-weight-bold loader" style={{ top: '85%' }}>
        Coming Soon ...
      </h1>
    </div>
  );
};
export default ComingSoon;
