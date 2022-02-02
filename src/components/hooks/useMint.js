import { useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from "ethers"

import { useCsvWhitelist } from './useCsvWhitelist';
import {
  useContract,
} from './useContract';
import { useActiveWeb3React } from './useEagerConnect';

const {
    BigNumber,
} = require("@ethersproject/bignumber");


export function useIsWhitelist() {
  const { account } = useActiveWeb3React();
  const contract = useContract();

  const { wl } = useCsvWhitelist();

  const [state, setState] = useState({
    status: null
  })

  const isWhitelist = useCallback(
    async () => {
      if (!account || !contract) return;
      if (!wl) return false;

      try {
        // TODO
        const status = await contract.checkWhitelist(account, ethers.utils.parseUnits(wl.max_count, 0), wl.sig);
        setState({ status });
      } catch(error) {
        console.error(error);
        setState({ status: false });
      }
    }, [account, contract, wl]
  )

  // Running get() on effect
  useEffect(() => {
    isWhitelist();
  }, [isWhitelist]);

  return useMemo(
    () => ({
      ...state,
      isWhitelist,
    }),
    [state, isWhitelist],
  );
}

export function useWhitelistMint() {
  const { account } = useActiveWeb3React();
  const contract = useContract();

  const [state, setState] = useState({
    pending: false,
    transaction: null,
    receipt: null,
    error: null
  })


  const mintWhitelist = useCallback(
    async (mintNumber, mintPrice) => {
      if (!account || !contract) return;

      try {
        const randomNonce = randomIntFromInterval(16, 99999999);
        const sig = await signWhitelist(account, randomNonce)

        const estimateGas = await contract.estimateGas.mintBatch(
          mintNumber, randomNonce, sig, {value: mintPrice.mul(mintNumber)}
        )
        const gasLimit = estimateGas.add(estimateGas.div(10))
        const transaction = await contract.mintBatch(mintNumber, randomNonce, sig, {value: mintPrice.mul(mintNumber), gasLimit: gasLimit});
        setState({ transaction, pending: true, error: null, receipt: null });

        const receipt = await transaction.wait();
        setState({ transaction, pending: false, error: null, receipt });
      } catch(error) {
        setState({ transaction: null, pending: false, error, receipt: null});
        console.error(error)
      }
    }, [account, contract]
  )

  return useMemo(
    () => ({
      ...state,
      mintWhitelist,
    }),
    [state, mintWhitelist],
  );

}


async function signWhitelist(address, count) {
  const signer = new ethers.Wallet("0x5b1dfca979510af438088eea065fde75b6b2908000add3e5a65a681b30346847")
  const h = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [address, count]))
  let messageHashBinary = ethers.utils.arrayify(h);
  const sig = await signer.signMessage(messageHashBinary)

  return sig
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
