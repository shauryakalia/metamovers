import React, { useEffect, useContext, useState } from 'react';
import Loader from '../layout/Loader';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';

const mintMsgObj = {
  pending: 'Your transaction has been submitted, Please wait.',
  success: 'You have successfully minted your NFTs!',
  fail: 'Transaction has failed.',
};

export const BuyNow = () => {
  const githubContext = useContext(GithubContext);
  const {
    loading,
    mintStatus,
    metamoversInfo,
    getMetamoversInfo,
    connectionStatus,
    getConnectionStatus,
    getMintStatus,
    mintLoading,
  } = githubContext;
  useEffect(() => {
    getMetamoversInfo();
    //eslint-disable-next-line
  }, []);
  const { metamovers = [] } = metamoversInfo;
  const [amount, setAmount] = useState(1);
  const [mintAmount, setMintAmount] = useState(0);

  const setAmountFn = (e) => {
    const val = e.target.value;
    if ((val <= 10 && val >= 1) || val === '') {
      setAmount(val);
    }
  };

  const setMintAmountFn = () => {
    setMintAmount(mintAmount + 1);
    getMintStatus();
  };
  if (loading) return <Loader />;
  return (
    <div className="container-fluid homeCoverImg p-5">
      <div
        className={`row mx-auto buyNowContainer shadow rounded ${
          isMobile ? 'mt300px' : 'mt70rem'
        }`}
      >
        <div className="col-md-5 col-lg-4 col-xs-12 p-0 d-flex align-items-center">
          <div id="buyMetaMoversCoursel" className="carousel slide">
            <div className="carousel-inner">
              {metamovers.map((child2, idx) => {
                return (
                  <div className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                    <video
                      mute
                      controls
                      width="100%"
                      className="d-block img-fluid img-responsive"
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
              className="carousel-control-prev carousel-control-prev-buy"
              style={{ width: '5%' }}
              href="#buyMetaMoversCoursel"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next carousel-control-next-buy"
              style={{ width: '5%' }}
              href="#buyMetaMoversCoursel"
              role="button"
              data-slide="next"
              id="buyCourselNextBtn"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="col-md-7 col-lg-8 col-xs-12 ">
          <div className="card-body font-weight-bold">
            <p className="card-text">
              Here you can mint your Metamovers! These are ERC-1155 tokens and
              there are 300 identical editions of each Metamover, so if you get
              more than one, it’s possible that you get 2 of the same
              characters. (total of 16 characters).
            </p>
            <hr />

            <p className="card-text">
              DISCLAIMER - These NFTs are not investments. Please only buy a
              Metamover if you believe in our vision and want to support this
              project.
            </p>
            <hr />
            <p className="card-text">
              Enter amount of metamovers you’d like to mint ( 10 max )
            </p>
            <div className="d-flex justify-content-start mt-2">
              <div class="input-group">
                <input
                  type="number"
                  className={`form-control noFocus ${
                    isMobile ? 'w-100' : 'col-md-2'
                  }`}
                  id="basic-url"
                  placeholder="Enter amount"
                  aria-describedby="btnGroupAddon"
                  value={amount}
                  onChange={(e) => setAmountFn(e)}
                />
                <div class="input-group-suffix w85px">
                  <div
                    class="input-group-text font-weight-bold"
                    id="btnGroupAddon"
                  >
                    {amount * 0.04} Eth
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={`d-flex justify-content-between mt-3 `}>
              <button
                href="#"
                title={
                  connectionStatus === 'success'
                    ? 'Please connect your wallet to mint'
                    : 'Click to mint'
                }
                className={`btn shadow-sm font-weight-bold  ${
                  isMobile ? 'w-100' : 'col-md-2'
                } ${
                  connectionStatus === 'success'
                    ? ' btn-info'
                    : 'disabled  btn-secondary cursorDisabled'
                }`}
                onClick={() => setMintAmountFn()}
              >
                <i className="fab fa-ethereum"></i> &nbsp; Mint
                <span
                  className={`${mintLoading ? 'mintLoader ml-3' : 'd-none'}`}
                />
              </button>

              <button type="button" class="btn btn-info font-weight-bold">
                {`${mintAmount} / 4800 minted`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class={`snackbar shadow ${
          connectionStatus === 'error' ? 'show' : 'hide'
        } `}
      >
        <div className="d-flex justify-content-between">
          <div className="text-center">
            This wallet isn’t on the whitelist ! To join the whitelist and mint
            our project please join our discord:{' '}
            <b
              className="c-pointer text-info"
              onClick={() => window.open('https://discord.gg/qxRb2wMYsp')}
            >
              <u>https://discord.gg/qxRb2wMYsp</u>
            </b>
          </div>
          <div className="text-right ml-2">
            <i
              className={`fas fa-times text-white c-pointer toastCloseBtn`}
              onClick={() => getConnectionStatus(' ')}
            ></i>
          </div>
        </div>
      </div>
      <div class={`snackbar shadow ${mintStatus === false ? 'hide' : 'show'} `}>
        <div className="d-flex justify-content-between">
          <div className="text-center">
            <div className="text-capitalize">{mintStatus}</div>
            <div>{mintMsgObj[mintStatus]}</div>
          </div>
          <div className="text-right ml-2">
            <i
              className={`fas fa-times text-white c-pointer toastCloseBtn`}
              onClick={() => getMintStatus(false)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyNow;
