import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useContract,
} from './useContract';
import { ethers } from "ethers";
import { useActiveWeb3React } from './useEagerConnect';

export function useReadContract() {
  // State
  const [state, setState] = useState(
    {
      currentSupply: 0,
      mintPrice: null,
      maxSupply: 4444,
      whitelistStarted: false,
      error: null,
    }
  );

  const { account } = useActiveWeb3React();
  const contract = useContract();
  const get = useCallback(async () => {
    if (!account || !contract) return;

    try {
      const currentSupply = Number(ethers.utils.formatUnits(await contract._id(), 0));
      const whitelistStarted = await contract.saleStarted();
      const mintPrice = await contract.MINT_PRICE();
      setState({ ...state, currentSupply, whitelistStarted, mintPrice });
    } catch (error) {
      setState({ ...state, error });
      console.log(error)
    }
  }, [account, contract]);

  // Running get() on effect
  useEffect(() => {
    get();
  }, [get]);

  // Returning a new version of the state
  return useMemo(
    () => ({
      ...state,
      get,
    }),
    [state, get],
  );
}
