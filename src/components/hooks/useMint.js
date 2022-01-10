import { useCallback, useEffect, useMemo, useState } from 'react';

import { ethers } from "ethers"

import { useCsvWhitelist } from './useCsvWhitelist';
import {
  useContract,
} from './useContract';
import { useActiveWeb3React } from './useEagerConnect';

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

  const { wl } = useCsvWhitelist();

  const [state, setState] = useState({
    pending: false,
    transaction: null,
    receipt: null,
    error: null
  })

  const mintWhitelist = useCallback(
    async (mintNumber, mintPrice) => {
      if (!account || !contract) return;
      if (!wl) return;

      try {
        const transaction = await contract.mintBatch(mintNumber, wl.max_count, wl.sig, {value: mintPrice.mul(mintNumber)});
        setState({ transaction, pending: true, error: null, receipt: null });

        const receipt = await transaction.wait();
        setState({ transaction, pending: false, error: null, receipt });
      } catch(error) {
        setState({ transaction: null, pending: false, error, receipt: null});
        console.error(error)
      }
    }, [account, contract, wl]
  )

  return useMemo(
    () => ({
      ...state,
      mintWhitelist,
    }),
    [state, mintWhitelist],
  );

}
