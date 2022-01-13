import { useActiveWeb3React } from './useEagerConnect';
import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';

import ABI from "../../abis/Metamovers.json";
import OPENSEA_SPLIT_ABI from "../../abis/OpenseaSplit.json";

const RINKEBY_ADDRESS = "0x63e6d5Ee456836aa62CCe1cf1E20b612Df99Bda0";
const MAINNET_ADDRESS = "0x0f308b379a9Bc997f5B252E31AC59f30D19F8D8f";

const OPENSEA_SPLIT_RINKEBY_ADDRESS = "0x426707F991CFa69feC10cA1DbC4E770C048Aff5F";
const OPENSEA_SPLIT_MAINNET_ADDRESS = "0x0f308b379a9Bc997f5B252E31AC59f30D19F8D8f";

// account is optional
function getContract({
  account,
  library,
  address,
}) {
  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account),
  );
}

function getProviderOrSigner(
  library,
  account,
) {
  return account ? getSigner(library, account) : library;
}

function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function useContract(
  withSignerIfPossible = true,
) {
  const { library, account } = useActiveWeb3React();
  return useMemo(() => {
    if (!ABI || !library) return null;

    try {
      const address = library.provider.chainId === "0x1" ? MAINNET_ADDRESS : RINKEBY_ADDRESS;
      return getContract({
        address,
        library,
        account: withSignerIfPossible && account ? account : undefined,
      });
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [
    library,
    withSignerIfPossible,
    account,
  ]);
}


export function useAdminContract(
  withSignerIfPossible = true,
) {
  const { library, account } = useActiveWeb3React();
  return useMemo(() => {
    if (!ABI || !library) return null;

    try {
      const address = library.provider.chainId === "0x1" ? OPENSEA_SPLIT_MAINNET_ADDRESS : OPENSEA_SPLIT_RINKEBY_ADDRESS;
      return new Contract(
        address,
        OPENSEA_SPLIT_ABI,
        getProviderOrSigner(library, account),
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [
    library,
    withSignerIfPossible,
    account,
  ]);
}
