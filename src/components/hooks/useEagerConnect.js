import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';

export function useActiveWeb3React() {
  const context = useWeb3React();
  const contextNetwork = useWeb3React();
  return context.active ? context : contextNetwork;
}

export function useEagerConnect() {
  const { account, activate, active, error } = useWeb3React();
  const [tried, setTried] = useState(false);
  // Metamask
  const injected = new InjectedConnector({
    supportedChainIds: [1, 4],
  });

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the web3 worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return { account, activate, active, tried, error };
}
