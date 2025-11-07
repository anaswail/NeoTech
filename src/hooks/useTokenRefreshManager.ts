// hooks/useTokenRefreshManager.ts (Enhanced version)
import { useEffect, useRef, useCallback } from "react";
import { actRefreshToken } from "@/store/slices/auth/act/actRefreshToken";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "@/store/store";

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 5000; // 5 seconds

export const useTokenRefreshManager = (isAuthenticated: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  const refreshToken = useCallback(async () => {
    try {
      await dispatch(actRefreshToken()).unwrap();
      retryCountRef.current = 0; // Reset retry count on success
    } catch (error) {
      console.error("Token refresh failed:", error);

      // Retry logic
      if (retryCountRef.current < MAX_RETRY_ATTEMPTS) {
        retryCountRef.current++;
        setTimeout(() => {
          console.log(
            `Retrying token refresh (${retryCountRef.current}/${MAX_RETRY_ATTEMPTS})...`
          );
          refreshToken();
        }, RETRY_DELAY);
      } else {
        console.error(
          "Max retry attempts reached. User may need to re-authenticate."
        );
        // Optionally dispatch logout action here
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      retryCountRef.current = 0;
      return;
    }

    // Initial refresh
    refreshToken();

    // Set up interval
    intervalRef.current = setInterval(() => {
      console.log("Auto-refreshing token...");
      refreshToken();
    }, REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, refreshToken]);
};
