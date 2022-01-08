import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useContract,
  useAdminContract,
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


export function useReadAdminContract(contract) {
  // State
  const [state, setState] = useState(
    {
      alreadyReleasedAccount: 0,
      alreadyReleasedTotal: 0,
      currentBalance: 0,
    }
  );

  const { account } = useActiveWeb3React();
  const get = useCallback(async () => {
    if (!account || !contract) return;
    console.log(contract.address)

    try {
      const alreadyReleasedTotal = ethers.utils.formatEther(await contract.totalReleased());
      const alreadyReleasedAccount = ethers.utils.formatEther(await contract.released(account));
      const currentBalance = ethers.utils.formatEther(await contract.provider.getBalance(contract.address));
      console.log({currentBalance})
      setState({ ...state, currentBalance, alreadyReleasedTotal, alreadyReleasedAccount });
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
