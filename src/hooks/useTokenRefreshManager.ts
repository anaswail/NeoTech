import { useEffect, useRef, useCallback } from "react";
import { actRefreshToken } from "@/store/slices/auth/act/actRefreshToken";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "@/store/store";
import { logout } from "@/store/slices/auth/registerSlice";

const REFRESH_INTERVAL =
  Number(import.meta.env.VITE_REFRESH_INTERVAL) || 15 * 60 * 1000;
const MAX_RETRY_ATTEMPTS = Number(import.meta.env.VITE_MAX_RETRY_ATTEMPTS) || 3;
const RETRY_DELAY = Number(import.meta.env.VITE_RETRY_DELAY) || 5000;

export const useTokenRefreshManager = (isAuthenticated: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const refreshToken = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      await dispatch(actRefreshToken()).unwrap();
      retryCountRef.current = 0;
    } catch (error) {
      console.error("Token refresh failed:", error);

      if (!isMountedRef.current) return;

      if (retryCountRef.current < MAX_RETRY_ATTEMPTS) {
        retryCountRef.current++;
        console.log(
          `Retrying token refresh (${retryCountRef.current}/${MAX_RETRY_ATTEMPTS})...`,
        );
        // Fix #3: Store timeout ref so it can be cleared on unmount
        retryTimeoutRef.current = setTimeout(() => {
          refreshToken();
        }, RETRY_DELAY);
      } else {
        console.error("Max retry attempts reached. Logging out.");
        retryCountRef.current = 0;
        dispatch(logout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    isMountedRef.current = true;

    if (!isAuthenticated) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      retryCountRef.current = 0;
      return;
    }

    // Initial refresh on login
    refreshToken();

    intervalRef.current = setInterval(() => {
      console.log("Auto-refreshing token...");
      refreshToken();
    }, REFRESH_INTERVAL);

    return () => {
      // Fix #3: Full cleanup on unmount
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [isAuthenticated, refreshToken]);
};
