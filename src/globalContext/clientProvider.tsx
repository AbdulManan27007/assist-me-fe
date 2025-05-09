'use client'; // Mark this component as a Client Component

import { useEffect } from 'react';
import { IUser, useGlobalContext } from './globalContext'; // Adjust the path to your Zustand store

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useGlobalContext();

  useEffect(() => {
    // First check if the user data exists in localStorage (persisted by Zustand)
    const persistedUserData = localStorage.getItem('global-store'); // Fetch Zustand persisted store
    const parsedUser = persistedUserData ? JSON.parse(persistedUserData) : null;

    if (parsedUser && parsedUser.state?.user) {
      // If user data exists in persisted store, set it directly in Zustand
      const user: IUser = parsedUser.state.user; // Extract the user data
      setUser(user); // Set user data in Zustand store
    } else {
      // Fallback to cookies if no data is in localStorage
      const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken"))?.split("=").at(-1);
      const email = document.cookie.split("; ").find((cookie) => cookie.startsWith("email"))?.split("=").at(-1);
      const id = Number(document.cookie.split("; ").find((cookie) => cookie.startsWith("id"))?.split("=").at(-1));
      const is_verified = document.cookie.split("; ").find((cookie) => cookie.startsWith("is_verified"))?.split("=").at(-1);

      if (accessToken && email && id && is_verified) {
        // Create a user object and set it in Zustand
        const user: Partial<IUser> = {
          id,
          email,
        };
        
        // if (accessToken) user.accessToken = accessToken;
        if (email) user.email = email;
        if (id) user.id = id;
        // if (is_verified) user.is_verified = is_verified === 'true'; // Convert to boolean
        
        setUser(user as IUser); // Set user data in Zustand store
      }
    }
  }, [setUser]); // This effect runs only once on mount

  return <>{children}</>;
}
