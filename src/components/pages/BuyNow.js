import React, { useEffect, useContext, useState } from 'react';
import Loader from '../layout/Loader';
import metaGif from '../../imgs/Delroy_Brown.gif';
import GithubContext from '../../context/metamovers/context';

export const BuyNow = () => {
  const githubContext = useContext(GithubContext);
  const { loading, metamoversInfo, getMetamoversInfo } = githubContext;
  useEffect(() => {
    getMetamoversInfo();
    //eslint-disable-next-line
  }, []);
  const { metamovers = [] } = metamoversInfo;
  const [buyNextClick, setbuyNextClick] = useState(false);

  const triggerNext = () => {
    const elem = document.getElementById('buyCourselNextBtn');
    if (elem) elem.click();
    setbuyNextClick(true);
  };

  if (loading) return <Loader />;
  return (
    <div
      className="container-fluid homeCoverImg p-5 "
      onMouseOver={() => !buyNextClick && triggerNext()}
    >
      <div className="row mx-auto buyNowContainer shadow rounded">
        <div className="col-md-5 p-0 d-flex align-items-center">
          <div
            id="buyMetaMoversCoursel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {metamovers.map((child2, idx) => {
                return (
                  <div className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                    <img
                      className="d-block img-fluid"
                      src={child2.gifUrl ? `${child2.gifUrl}` : metaGif}
                      alt={`${child2.name}`}
                      width="93%"
                    />
                  </div>
                );
              })}
            </div>
            <a
              class="carousel-control-prev invisible"
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
              class="carousel-control-next invisible"
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

        <div className="col-md-7">
          <div className="card-body font-weight-bold">
            <p className="card-text">
              Here you can mint your Metamovers! These are ERC-1155 tokens and
              there are 300 identical editions of each Metamover, so if you get
              more than one, it’s possible that you get 2 of the same
              characters. (total of 16 characters).
            </p>
            <hr />

            <p className="card-text">
              Disclaimer! These NFTs are not investments. Please only buy a
              Metamover if you believe in our vision and want to support this
              project.
            </p>
            <hr />
            <p className="card-text">
              Enter amount of metamovers you’d like to mint (3 max)
            </p>

            <div className="d-flex justify-content-between">
              <input
                type="number"
                className="form-control shadow-sm"
                id="basic-url"
                placeholder="Enter amount"
                aria-describedby="basic-addon3"
                style={{ width: '50%' }}
              />

              <button href="#" className="btn btn-info ml-3 shadow-sm font-weight-bold">
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
