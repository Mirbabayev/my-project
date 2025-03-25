import React, { createContext, useContext, useState } from 'react';

// Mövcud olan role tipini genişləndirək
type UserRole = 'admin' | 'vendor' | 'user';

interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isAdmin: boolean; // legacy field - will keep for compatibility
  vendorId?: number; // vendor user may have specific ID
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  hasAccess: (requiredRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login funksiyasını genişləndirək ki, müxtəlif rolları dəstəkləsin
  const login = async (email: string, password: string, role: UserRole = 'user') => {
    // TODO: Implement actual login logic
    // Mock user based on provided role
    const mockUser: User = {
      id: 1,
      email,
      name: role === 'admin' ? 'Admin İstifadəçi' : role === 'vendor' ? 'Satıcı İstifadəçi' : 'Müştəri',
      role: role,
      isAdmin: role === 'admin',
      ...(role === 'vendor' && { vendorId: 101 }), // vendor üçün ID əlavə edirik
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  // Müəyyən rollara giriş icazəsini yoxlamaq üçün funksiya
  const hasAccess = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isVendor: user?.role === 'vendor',
        hasAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 