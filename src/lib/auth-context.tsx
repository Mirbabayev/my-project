import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from './supabase';
import { getCurrentUser, signOut as localSignOut } from './auth';

type User = {
  id: string;
  email?: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      // Try to get Supabase session
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        setIsLoading(false);
        return;
      }

      // Try local auth as fallback
      const localUser = await getCurrentUser();
      setUser(localUser);
    } catch (error) {
      console.error('Error getting user: ', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Try Supabase sign out first
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // If Supabase fails, try local sign out
      await localSignOut();
      
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    refreshUser();

    // Listen for auth changes with Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (session?.user) {
        setUser(session.user);
      }
      setIsLoading(false);
    });

    // Check local storage for auth changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'e-parfum-current-user' || event.key === 'supabase.auth.token') {
        refreshUser();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = {
    user,
    isLoading,
    refreshUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 