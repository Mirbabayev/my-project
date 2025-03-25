import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type UserRole = 'admin' | 'vendor' | 'user';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectPath?: string;
}

/**
 * Rol əsaslı keçid qoruyan komponent
 * Yalnız göstərilən rollara sahib olan istifadəçilər routeları görə bilər
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = '/admin/login'
}) => {
  const { user, isAuthenticated } = useAuth();

  // İstifadəçi giriş etməyibsə, login səhifəsinə yönləndir
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // İstifadəçi rolu yoxlama
  if (user && !allowedRoles.includes(user.role)) {
    // İstifadəçinin rolu icazə verilən rollarda deyilsə
    return <Navigate to="/unauthorized" replace />;
  }

  // Rol yoxlaması keçdikdə, alt routeları render et
  return <Outlet />;
};

export default ProtectedRoute; 