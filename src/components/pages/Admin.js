import React, { useEffect, useContext, useState } from 'react';
import Loader from '../layout/Loader';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';

import { ethers } from "ethers";
import { useEagerConnect } from '../hooks/useEagerConnect'
import { truncateAccount } from "../utils/format.js";
import { useAdminContract, useContract } from "../hooks/useContract.js";
import { useReadAdminContract } from "../hooks/useRead.js";
import { useAdminRelease } from "../hooks/useAdmin.js";
import { InjectedConnector } from '@web3-react/injected-connector';


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

  const { account, activate } = useEagerConnect();
  const contractOS = useAdminContract();
  const contract = useContract();

  const { alreadyReleasedTotal, alreadyReleasedAccount, currentBalance } = useReadAdminContract(contract);

  const { alreadyReleasedTotal: alreadyReleasedTotalOS, alreadyReleasedAccount: alreadyReleasedAccountOS, currentBalance: currentBalanceOS  } = useReadAdminContract(contractOS);

  const { pending, receipt, error, release } = useAdminRelease();
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

  const renderAlert = () => {
    if (pending) {
      return "Transaction In Progress.."
    }
    if (error) {
      return "Error"
    }
    if (receipt) {
      return "Withdrawal Successfull"
    }
  }

  const handleReleasePrimary = async () => {
    await release(contract)
  }

  const handleReleaseOS = async () => {
    await release(contractOS)
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
            <h1> Primary Sales </h1>
            <p className="card-text">
              Current Balance in the contract: {currentBalance} ETH <br/>
              Total Withdraw (By Everyone): { alreadyReleasedTotal } ETH <br/>
              Total Withdraw by you ({truncateAccount(account)}): {alreadyReleasedAccount} ETH <br/>
            </p>
            <hr />

            <h1> Opensea Secondary Sales </h1>
            <p className="card-text">
              Current Balance in the contract: {currentBalanceOS} ETH <br/>
              Total Withdraw (By Everyone): { alreadyReleasedTotalOS } ETH <br/>
              Total Withdraw by you ({truncateAccount(account)}): {alreadyReleasedAccountOS} ETH <br/>
            </p>
            <hr />
            <div className={`d-flex justify-content-between mt-3 `}>
              <button
                href="#"
                className={`btn shadow-sm font-weight-bold btn-info ${
                  isMobile ? 'w-100' : 'col-md-2'
                }
                `}
                onClick={handleReleasePrimary}
              >
                <i className="fab fa-ethereum"></i> &nbsp; Withdraw Primary
                <span
                  className={`${mintLoading ? 'mintLoader ml-3' : 'd-none'}`}
                />
              </button>

              <button
                href="#"
                className={`btn shadow-sm font-weight-bold btn-info ${
                  isMobile ? 'w-100' : 'col-md-2'
                }
                `}
                onClick={handleReleaseOS}
              >
                <i className="fab fa-ethereum"></i> &nbsp; Withdraw Opensea
                <span
                  className={`${mintLoading ? 'mintLoader ml-3' : 'd-none'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class={`snackbar shadow ${!pending && !error && !receipt ? 'hide' : 'show'} `}>
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
