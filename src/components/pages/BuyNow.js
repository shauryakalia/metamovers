import React, { useEffect, useContext, useState } from 'react';
import Loader from '../layout/Loader';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';

import { ethers } from "ethers";
import { useEagerConnect } from '../hooks/useEagerConnect'
import { truncateAccount } from "../utils/format.js";
import { useContract } from "../hooks/useContract.js";
import { useReadContract } from "../hooks/useRead.js";
import { usePublicMint, useIsWhitelist, useWhitelistMint } from "../hooks/useMint.js";
import { InjectedConnector } from '@web3-react/injected-connector';

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

  const setAmountFn = (e) => {
    const val = e.target.value;
    if ((val <= 16 && val >= 1) || val === '') {
      setAmount(val);
    }
  };

  const { account, activate } = useEagerConnect();
  const contract = useContract();

  const { currentSupply, mintPrice, maxSupply, whitelistStarted, error: readError } = useReadContract();

  const {pending: wlPending, receipt: wlReceipt, error: wlTxError, mintWhitelist} = useWhitelistMint()

  const hasMetamask =
      typeof window !== 'undefined' &&
      !!window.ethereum &&
      !!window.ethereum.isMetaMask;

  const handleMetamaskClick = async () => {
    if (!account) {
      if (hasMetamask) {
        const injected = new InjectedConnector({
          supportedChainIds: [1, 4],
        });
        await activate(injected);
      } else {
        window.open('https://metamask.io/', '_blank');
      }
    }
  };

  const handleMint = async () => {
    if (whitelistStarted) {
      await mintWhitelist(amount, mintPrice);
    }
  }

  const renderAlert = () => {
    if (wlPending) {
      return "Transaction In Progress.."
    }
    if (wlTxError) {
      return "Error"
    }
    if (wlReceipt) {
      return "Mint Successful"
    }
  }

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
              Here you can mint your Metamovers! These are ERC-1155 tokens and there are 300 identical editions of each Metamover (total of 16 Metamovers). If you wish to mint more than 1 Metamover, you are guaranteed to get a set of different characters. So if you mint 5, you will get 5 different characters. If you mint 16.. you will get all 16 characters  &#128521;
            </p>
            <hr />

            <p className="card-text">
              DISCLAIMER - These NFTs are not investments. Please only buy a
              Metamover if you believe in our vision and want to support this
              project.
            </p>
            <hr />
            <hr />
            <p className="card-text">
              Enter amount of metamovers you’d like to mint ( 16 max )
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
                    {ethers.utils.formatEther(ethers.utils.parseEther("0.045").mul(amount))} Eth
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {whitelistStarted ? <div /> : (
              <div className={`d-flex justify-content-between mt-3 `}>Please connect your wallet</div>
            )}
            <div className={`d-flex justify-content-between mt-3 `}>
              <button
                href="#"
                className={`btn shadow-sm font-weight-bold  ${
                  isMobile ? 'w-100' : 'col-md-2'
                } ${
                 whitelistStarted
                    ? ' btn-info'
                    : 'disabled  btn-secondary cursorDisabled'
                }`}
                onClick={handleMint}
              >
                <i className="fab fa-ethereum"></i> &nbsp; {whitelistStarted ? "Mint" : "Closed"}
                <span
                  className={`${mintLoading ? 'mintLoader ml-3' : 'd-none'}`}
                />
              </button>

              {account ? (
                <button type="button" class="btn btn-info font-weight-bold">
                  {`${currentSupply} / 4800 minted`}
                </button>
              ) : <div/>
              }
            </div>
          </div>
        </div>
      </div>
      <div class={`snackbar shadow ${!wlPending && !wlTxError && !wlReceipt ? 'hide' : 'show'} `}>
        <div className="d-flex justify-content-between">
          <div className="text-center">
            <div className="text-capitalize">{renderAlert()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyNow;
