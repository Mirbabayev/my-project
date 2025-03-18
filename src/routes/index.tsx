import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../lib/auth-context';

const Home = lazy(() => import('../pages/home'));
const Products = lazy(() => import('../pages/products'));
const ProductDetails = lazy(() => import('../pages/product-details'));
const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));

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

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}