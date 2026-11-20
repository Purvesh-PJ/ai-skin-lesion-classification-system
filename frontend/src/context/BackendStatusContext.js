import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { healthService } from '../services/api';

const BackendStatusContext = createContext({
  status: 'checking', // 'checking' | 'waking_up' | 'ready' | 'offline'
  isWakingUp: false,
  isReady: false,
  checkBackendHealth: () => {},
});

export const BackendStatusProvider = ({ children }) => {
  const [status, setStatus] = useState('checking');

  const checkBackendHealth = useCallback(async () => {
    // If it takes more than 2.5s to respond, mark as waking_up
    const wakeTimer = setTimeout(() => {
      setStatus((prev) => (prev !== 'ready' ? 'waking_up' : prev));
    }, 2500);

    const isOnline = await healthService.checkHealth();
    clearTimeout(wakeTimer);

    if (isOnline) {
      setStatus('ready');
    } else {
      // If failed initially, set waking_up and poll again in 4 seconds
      setStatus('waking_up');
      setTimeout(async () => {
        const retryOnline = await healthService.checkHealth();
        setStatus(retryOnline ? 'ready' : 'offline');
      }, 4000);
    }
  }, []);

  // Proactive silent ping on initial application mount
  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  const value = {
    status,
    isWakingUp: status === 'waking_up',
    isReady: status === 'ready',
    checkBackendHealth,
  };

  return (
    <BackendStatusContext.Provider value={value}>
      {children}
    </BackendStatusContext.Provider>
  );
};

export const useBackendStatus = () => useContext(BackendStatusContext);
export default BackendStatusContext;
