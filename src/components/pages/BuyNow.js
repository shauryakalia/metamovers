import React, { useEffect, useContext } from 'react';
import Loader from '../layout/Loader';
import GithubContext from '../../context/metamovers/context';

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
    <div className="container-fluid homeCoverImg p-5">
      <div className="row mx-auto buyNowContainer shadow rounded">
        <div className="col-md-5 col-lg-4 p-0 d-flex align-items-center">
          <div id="buyMetaMoversCoursel" className="carousel slide">
            <div className="carousel-inner">
              {metamovers.map((child2, idx) => {
                return (
                  <div className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                    <video
                      mute
                      controls
                      width="100%"
                      className="d-block img-fluid"
                      id={`video-${idx}`}
                    >
                      <source
                        src={child2.videourl}
                        type="video/mp4"
                        title={`${child2.name}`}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              })}
            </div>
            <a
              class="carousel-control-prev carousel-control-prev-buy"
              style={{ width: '5%' }}
              href="#buyMetaMoversCoursel"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next carousel-control-next-buy"
              style={{ width: '5%' }}
              href="#buyMetaMoversCoursel"
              role="button"
              data-slide="next"
              id="buyCourselNextBtn"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="col-md-7 col-lg-8 ">
          <div className="card-body font-weight-bold">
            <p className="card-text">
              Here you can mint your Metamovers! These are ERC-1155 tokens and
              there are 300 identical editions of each Metamover, so if you get
              more than one, it’s possible that you get 2 of the same
              characters. (total of 16 characters).
            </p>
            <hr />

            <p className="card-text">
              Disclaimer - These NFTs are not investments. Please only buy a
              Metamover if you believe in our vision and want to support this
              project.
            </p>
            <hr />
            <p className="card-text">
              Enter amount of metamovers you’d like to mint (3 max)
            </p>

            <div className="d-flex justify-content-between">
              <input
                type="text"
                className="form-control shadow-sm"
                id="basic-url"
                placeholder="Enter amount"
                aria-describedby="basic-addon3"
                style={{ width: '50%' }}
                maxLength="3"
              />

              <button
                href="#"
                className="btn btn-info ml-3 shadow-sm font-weight-bold"
              >
                <i className="fas fa-wallet"></i> &nbsp; Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyNow;
