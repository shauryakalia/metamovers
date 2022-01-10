import { useCallback, useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React } from './useEagerConnect';

export function useAdminRelease() {
  const { account } = useActiveWeb3React();
  const [state, setState] = useState({
    pending: false,
    transaction: null,
    receipt: null,
    error: null
  })

  const release = useCallback(
    async (contract) => {
      if (!account || !contract) return;
      try {
        const transaction = await contract.release(account);
        setState({ transaction, pending: true, error: null, receipt: null });

        const receipt = await transaction.wait();
        setState({ transaction, pending: false, error: null, receipt });
      } catch(error) {
        setState({ transaction: null, pending: false, error, receipt: null});
        console.error(error)
      }
    }, [account]
  )

  return useMemo(
    () => ({
      ...state,
      release,
    }),
    [state, release],
  );

}
