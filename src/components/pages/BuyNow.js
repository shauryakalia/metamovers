import React, { useEffect, useContext } from 'react';
import Loader from '../layout/Loader';
import metaGif from '../../imgs/Delroy_Brown.gif';
import GithubContext from '../../context/metamovers/context';
const innerHeight = window.innerHeight;

export const BuyNow = () => {
  const githubContext = useContext(GithubContext);
  const { loading, metamoversInfo, getMetamoversInfo } = githubContext;
  useEffect(() => {
    getMetamoversInfo();
    //eslint-disable-next-line
  }, []);
  const { metamovers = [] } = metamoversInfo;

  if (loading) return <Loader />;
  return (
    <div
      className="container-fluid homeCoverImg p-5"
      style={{ height: innerHeight }}
    >
      <div className="row mx-auto buyNowContainer shadow rounded">
        <div className="col-md-5 p-0 d-flex align-items-center">
          <div id="crossfade">
            {metamovers.map((child2, idx) => {
              return (
                <img
                  className="d-block mx-auto img-fluid"
                  src={child2.gifUrl ? `${child2.gifUrl}` : metaGif}
                  alt={`${child2.name}`}
                />
              );
            })}
          </div>
        </div>

        <div className="col-md-7">
          <div class="card-body font-weight-bold">
            <p class="card-text">
              Here you can mint your Metamovers! These are ERC-1155 tokens and
              there are 300 identical editions of each Metamover, so if you get
              more than one, it’s possible that you get 2 of the same
              characters. (total of 16 characters).
            </p>
            <hr />

            <p class="card-text">
              Disclaimer! These NFTs are not investments. Please only buy a
              Metamover if you believe in our vision and want to support this
              project.
            </p>
            <hr />
            <p class="card-text">
              Enter amount of metamovers you’d like to mint (3 max)
            </p>

            <div className="d-flex justify-content-between">
              <input
                type="number"
                class="form-control shadow-sm"
                id="basic-url"
                placeholder="Enter amount"
                aria-describedby="basic-addon3"
                style={{ width: '50%' }}
              />

              <button href="#" class="btn btn-info ml-3 shadow-sm">
                <i class="fas fa-wallet"></i> &nbsp; Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyNow;
