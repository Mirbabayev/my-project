import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Brands } from './pages/Brands';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { NotFound } from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { BrandProvider } from './context/BrandContext';
import { PageTransition } from './components/PageTransition';
import { ScrollToTop } from './components/ScrollToTop';
import PerfumePresentationPage from './pages/showcase/PerfumePresentationPage';
import OfficeForMenShowcase from './pages/showcase/OfficeForMenShowcase';
import FeaturedProducts from './pages/catalog/FeaturedProducts';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import AdminBrands from './pages/admin/AdminBrands';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSettings from './pages/admin/AdminSettings';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminOrders from './pages/admin/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  
  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <BrandProvider>
              <ScrollToTop />
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
              <Routes location={location}>
                {/* Public Routes */}
                <Route path="/" element={
                  <Layout>
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/products" element={
                  <Layout>
                    <PageTransition>
                      <Products />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/products/:id" element={
                  <Layout>
                    <PageTransition>
                      <ProductDetails />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/cart" element={
                  <Layout>
                    <PageTransition>
                      <Cart />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/wishlist" element={
                  <Layout>
                    <PageTransition>
                      <Wishlist />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/brands" element={
                  <Layout>
                    <PageTransition>
                      <Brands />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/blog" element={
                  <Layout>
                    <PageTransition>
                      <Blog />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/blog/:slug" element={
                  <Layout>
                    <PageTransition>
                      <BlogPost />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/showcase/perfume" element={
                  <Layout>
                    <PageTransition>
                      <PerfumePresentationPage />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/showcase/office-for-men" element={
                  <Layout>
                    <PageTransition>
                      <OfficeForMenShowcase />
                    </PageTransition>
                  </Layout>
                } />
                <Route path="/catalog/featured" element={
                  <Layout>
                    <PageTransition>
                      <FeaturedProducts />
                    </PageTransition>
                  </Layout>
                } />

                {/* İcazə səhifəsi */}
                <Route 
                  path="/unauthorized" 
                  element={<Unauthorized />} 
                />

                {/* Admin Login Route */}
                <Route path="/admin/login" element={
                  <Layout>
                    <PageTransition>
                      <AdminLogin />
                    </PageTransition>
                  </Layout>
                } />

                {/* Admin Panel Routes - Protected */}
                <Route path="/admin" element={<AdminLayout />}>
                  {/* Dashboard - Bütün rollar üçün */}
                  <Route index element={<Dashboard />} />

                  {/* Satıcı və Admin üçün - Məhsul və Sifariş əməliyyatları */}
                  <Route element={<ProtectedRoute allowedRoles={['admin', 'vendor']} />}>
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                  </Route>

                  {/* Yalnız Admin üçün - digər əməliyyatlar */}
                  <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="brands" element={<AdminBrands />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="customers" element={<AdminCustomers />} /> 
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Route>

                {/* 404 Route */}
                <Route path="*" element={
                  <Layout>
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  </Layout>
                } />
              </Routes>
            </BrandProvider>
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;