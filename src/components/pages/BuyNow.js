import React from 'react';
import loading_url from '../../imgs/loading2.gif';

export const BuyNow = () => {
  return (
    <div className="container-fluid  d-flex justify-content-center">
      <div class="card border-0">
        <div
          class="card-body row "
          style={{ width: '50rem', background: 'whitesmoke' }}
        >
          <div className="col-md-6">
            <img
              src={loading_url}
              alt="metamovers"
              height="410px"
              className="byNowImg"
            />
          </div>
          <div className="col-md-6">
            <div class="card-body p-0">
              <p class="card-text text-black" style={{ lineHeight: '25px' }}>
                Here you can mint your Metamovers! These are ERC-1155 tokens and
                there are 300 identical editions of each Metamover, so if you
                get more than one, it’s possible that you get 2 of the same
                characters
              </p>

              <button className="btn btn-outline-info font-weight-bold mr-2 ">
                <i class="fas fa-wallet"></i> Connect Wallet
              </button>

              <button className="btn btn-outline-success font-weight-bold mr-2 ">
              <i class="fas fa-shopping-cart"></i> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyNow;
