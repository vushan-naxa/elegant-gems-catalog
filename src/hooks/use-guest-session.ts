
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'hamro_gahana_guest_id';

export function useGuestSession() {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing guest ID in localStorage
    const storedGuestId = localStorage.getItem(GUEST_ID_KEY);
    
    if (storedGuestId) {
      setGuestId(storedGuestId);
    } else {
      // Create a new guest ID if none exists
      const newGuestId = uuidv4();
      localStorage.setItem(GUEST_ID_KEY, newGuestId);
      setGuestId(newGuestId);
    }
  }, []);

  const clearGuestSession = () => {
    localStorage.removeItem(GUEST_ID_KEY);
    setGuestId(null);
  };

  return {
    guestId,
    clearGuestSession
  };
}
