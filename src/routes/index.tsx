import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../lib/auth-context';
import { ProtectedRoute } from '../components/protected-route';

const Home = lazy(() => import('../pages/home'));
const Products = lazy(() => import('../pages/products'));
const ProductDetails = lazy(() => import('../pages/product-details'));
const Cart = lazy(() => import('../pages/cart'));
const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Profile = lazy(() => import('../pages/profile'));

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div className="container py-8 text-center">Yüklənir...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Auth routes */}
        <Route 
          path="/auth/login" 
          element={user ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/auth/register" 
          element={user ? <Navigate to="/" replace /> : <Register />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}