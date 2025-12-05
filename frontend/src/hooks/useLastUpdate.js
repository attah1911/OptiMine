import { useState, useCallback } from "react";

export const useLastUpdate = (initialDate = null) => {
  const [lastUpdate, setLastUpdate] = useState(initialDate || new Date());

  const updateLastUpdate = useCallback(() => {
    setLastUpdate(new Date());
  }, []);

  return { lastUpdate, updateLastUpdate };
};
