import { useCallback, useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import { useActiveWeb3React } from './useEagerConnect';
import { useReadContract } from './useRead';
import  whitelistFile  from "../../whitelist/approved_whitelist.csv";

export function useCsvWhitelist() {
  const { account } = useActiveWeb3React();

  const [state, setState] = useState({
    wl: null,
    error: null,
  })

  const [parsedCsvData, setParsedCsvData] = useState([]);

  const get = useCallback(async () => {
    Papa.parse(whitelistFile, {
      header: true,
      download: true,
      complete: results => {
        setParsedCsvData(results.data)
      },
    });
    if (!account || !parsedCsvData) return;

    try {
      for (const wl of parsedCsvData) {
        if (wl.wallet_address.toLowerCase() === account.toLowerCase()) {
          setState({...state, wl})
          break;
        }
      }
    } catch(error) {
      setState({...state, error});
      console.error(error)
    }
  }, [account])

  // Running get() on effect
  useEffect(() => {
    get();
  }, [get]);

  return useMemo(
    () => ({
      ...state,
      get,
    }),
    [state, get],
  );
}
