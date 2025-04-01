import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../lib/auth-context';
import { ProtectedRoute } from '../components/protected-route';
import { UserRole } from '../lib/auth';

const Home = lazy(() => import('../pages/home'));
const Products = lazy(() => import('../pages/products'));
const ProductDetails = lazy(() => import('../pages/product-details'));
const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const AdminPanel = lazy(() => import('../pages/admin/AdminPanel'));
const AdminProducts = lazy(() => import('../pages/admin/pages/Products'));
const AdminOrders = lazy(() => import('../pages/admin/pages/Orders'));
const AdminCategories = lazy(() => import('../pages/admin/pages/Categories'));
const AdminUsers = lazy(() => import('../pages/admin/pages/Users'));
const AdminSettings = lazy(() => import('../pages/admin/pages/Settings'));
const Unauthorized = lazy(() => import('../pages/unauthorized'));

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div className="container py-8 text-center">Yüklənir...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Kataloq səhifələri */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        
        {/* Auth routes */}
        <Route 
          path="/auth/login" 
          element={user ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/auth/register" 
          element={user ? <Navigate to="/" replace /> : <Register />} 
        />
        
        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminProducts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminOrders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/categories" 
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminCategories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminSettings />
            </ProtectedRoute>
          } 
        />

        {/* İcazəsiz səhifəsi */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}