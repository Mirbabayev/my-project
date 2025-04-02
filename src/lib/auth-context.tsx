import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from './supabase';
import { getCurrentUser, signOut as localSignOut, UserRole, isAdmin, isSeller, hasRole } from './auth';

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    role?: UserRole;
  };
  role?: UserRole;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
  checkRole: (role: UserRole) => Promise<boolean>;
  isAdmin: () => Promise<boolean>;
  isSeller: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => {},
  signOut: async () => {},
  checkRole: async () => false,
  isAdmin: async () => false,
  isSeller: async () => false,
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
      console.log('Refreshing user...'); // Debug log
      
      // Try to get Supabase session
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        console.log('Supabase user found:', data.session.user); // Debug log
        const supabaseUser = data.session.user as User;
        setUser(supabaseUser);
        setIsLoading(false);
        return;
      }

      // Try local auth as fallback
      const localUser = await getCurrentUser() as User;
      console.log('Local user found:', localUser); // Debug log
      
      // Əgər istifadəçi tapılmasa, test məqsədləri üçün admin istifadəçisi yaradırıq
      if (!localUser) {
        console.log('No user found, creating admin user for testing'); // Debug log
        const adminUser = {
          id: 'admin-1',
          email: 'admin@example.com',
          role: UserRole.ADMIN
        };
        // Local storage-də admin istifadəçisini saxla
        localStorage.setItem('e-parfum-current-user', JSON.stringify(adminUser));
        setUser(adminUser);
      } else {
        setUser(localUser);
      }
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

  // Rol yoxlama funksiyası
  const checkRole = async (role: UserRole): Promise<boolean> => {
    console.log('Checking role:', role); // Debug log
    const hasRequiredRole = await hasRole(role);
    console.log('Has required role:', hasRequiredRole); // Debug log
    return hasRequiredRole;
  };

  // Admin yoxlama funksiyası
  const checkIsAdmin = async (): Promise<boolean> => {
    console.log('Checking admin role...'); // Debug log
    const isAdminUser = await isAdmin();
    console.log('Is admin:', isAdminUser); // Debug log
    return isAdminUser;
  };

  // Satıcı yoxlama funksiyası
  const checkIsSeller = async (): Promise<boolean> => {
    return isSeller();
  };

  useEffect(() => {
    refreshUser();

    // Listen for auth changes with Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (session?.user) {
        // Supabase-dən gələn istifadəçini düzgün User tipinə cast edirik
        const supabaseUser = session.user as User;
        setUser(supabaseUser);
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
    checkRole,
    isAdmin: checkIsAdmin,
    isSeller: checkIsSeller,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 