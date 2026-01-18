'use client';

import { useState, useEffect } from 'react';

const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || '123456';
const ADMIN_SESSION_KEY = 'admin_authenticated';
const ADMIN_SESSION_TIMESTAMP = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkAuth = () => {
      const authenticated = localStorage.getItem(ADMIN_SESSION_KEY);
      const sessionTime = localStorage.getItem(ADMIN_SESSION_TIMESTAMP);

      if (authenticated === 'true' && sessionTime) {
        const sessionAge = Date.now() - parseInt(sessionTime, 10);
        if (sessionAge < SESSION_DURATION) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY);
          localStorage.removeItem(ADMIN_SESSION_TIMESTAMP);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  const authenticate = (passcode: string): boolean => {
    // Remove any non-digit characters and ensure it's 6 digits
    const cleanPasscode = passcode.replace(/\D/g, '');
    if (cleanPasscode.length !== 6) {
      return false;
    }
    
    if (cleanPasscode === ADMIN_PASSCODE) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(ADMIN_SESSION_TIMESTAMP, Date.now().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_SESSION_TIMESTAMP);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isChecking,
    authenticate,
    logout,
  };
}

