import { useEffect, useRef, useState } from "react";

const getOnlineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(getOnlineStatus());
  const wasOfflineRef = useRef(false);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js");
    });
  }

  useEffect(() => {
    const handleOnline = () => {
      wasOfflineRef.current = !isOnline;
      setIsOnline(true);
    };

    const handleOffline = () => {
      wasOfflineRef.current = true;
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  return {
    isOnline,
    wasOfflineRef
  };
};
