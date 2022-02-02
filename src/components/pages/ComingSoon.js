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
        style={{ top: '35%' }}
      />
      <h3 className="font-weight-bold loader" style={{ top: '70%' }}>
        Under Maintenance ...
      </h3>
      <h6 className="font-weight-bold loader" style={{ top: '75%' }}>
        Minting is temporarily paused and will resume before 7th February !
      </h6>
    </div>
  );
};
export default ComingSoon;
