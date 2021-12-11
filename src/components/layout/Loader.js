import React from 'react';
import loading_url from "../../imgs/loading.gif";

const Loader = () => {
  return (
    <img
      src={loading_url}
      alt="metamovers"
      height="200px"
      className="loader"
    />
  );
};
export default Loader;
