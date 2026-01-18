'use client';

import { useState, useEffect } from 'react';

const VAULT_PASSWORD = 'vault2024';
const VAULT_SESSION_KEY = 'vault_authenticated';
const VAULT_SESSION_TIMESTAMP = 'vault_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useVaultAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkAuth = () => {
      const authenticated = localStorage.getItem(VAULT_SESSION_KEY);
      const sessionTime = localStorage.getItem(VAULT_SESSION_TIMESTAMP);

      if (authenticated === 'true' && sessionTime) {
        const sessionAge = Date.now() - parseInt(sessionTime, 10);
        if (sessionAge < SESSION_DURATION) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(VAULT_SESSION_KEY);
          localStorage.removeItem(VAULT_SESSION_TIMESTAMP);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  const authenticate = (password: string): boolean => {
    if (password === VAULT_PASSWORD) {
      localStorage.setItem(VAULT_SESSION_KEY, 'true');
      localStorage.setItem(VAULT_SESSION_TIMESTAMP, Date.now().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(VAULT_SESSION_KEY);
    localStorage.removeItem(VAULT_SESSION_TIMESTAMP);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isChecking,
    authenticate,
    logout,
  };
}

