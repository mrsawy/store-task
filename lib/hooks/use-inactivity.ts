import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setLocked } from '@/lib/store/slices/app.slice';

const INACTIVITY_TIMEOUT = 10000; // 10 seconds

export const useInactivity = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const isLocked = useAppSelector(state => state.app.isLocked);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef(AppState.currentState);

  const lockApp = useCallback(() => {
    if (isAuthenticated && !isLocked) {
      dispatch(setLocked(true));
    }
  }, [isAuthenticated, isLocked, dispatch]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isAuthenticated && !isLocked) {
      timeoutRef.current = setTimeout(() => {
        lockApp();
      }, INACTIVITY_TIMEOUT);
    }
  }, [isAuthenticated, isLocked, lockApp]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/active/) &&
        nextAppState === 'background'
      ) {
        // App went to background - lock immediately
        lockApp();
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App came to foreground - reset timer
        resetTimer();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [lockApp, resetTimer]);

  // Start timer when component mounts
  useEffect(() => {
    resetTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  return {
    resetTimer,
    lockApp,
  };
};