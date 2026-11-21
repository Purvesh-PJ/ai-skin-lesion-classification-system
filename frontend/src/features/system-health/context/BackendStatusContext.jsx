import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import healthService from '../api/health.service';

const BackendStatusContext = createContext({
  backendHealthy: null,
  isWakingUp: false,
  pingBackend: () => {},
});

export const useBackendStatus = () => useContext(BackendStatusContext);

export const BackendStatusProvider = ({ children }) => {
  const [backendHealthy, setBackendHealthy] = useState(null);
  const [isWakingUp, setIsWakingUp] = useState(false);

  const pingBackend = useCallback(async () => {
    try {
      const res = await healthService.checkHealth();
      if (res && res.data && res.data.status === 'ok') {
        setBackendHealthy(true);
        setIsWakingUp(false);
      } else {
        setBackendHealthy(false);
      }
    } catch (err) {
      setBackendHealthy(false);
      setIsWakingUp(true);

      setTimeout(async () => {
        try {
          const retryRes = await healthService.checkHealth();
          if (retryRes && retryRes.data && retryRes.data.status === 'ok') {
            setBackendHealthy(true);
            setIsWakingUp(false);
          }
        } catch {
          // Still waiting for cold start container
        }
      }, 10000);
    }
  }, []);

  useEffect(() => {
    pingBackend();
  }, [pingBackend]);

  const contextValue = useMemo(() => ({
    backendHealthy,
    isWakingUp,
    pingBackend,
  }), [backendHealthy, isWakingUp, pingBackend]);

  return (
    <BackendStatusContext.Provider value={contextValue}>
      {children}
    </BackendStatusContext.Provider>
  );
};

export default BackendStatusProvider;
