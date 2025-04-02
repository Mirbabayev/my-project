import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
// import Sidebar from '../components/admin/Sidebar.tsx'; // Sidebar importu silindi
import { ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth-context';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const currentPath = location.pathname;

  // Əsas admin səhifəsində geri düyməsini göstərməmək üçün yoxlama
  const showBackButton = currentPath !== '/admin'; 

  // Çıxış funksiyası
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Səhifə başlığını avtomatik təyin etmək üçün sadə məntiq
  const getPageTitle = (path: string): string => {
    if (path.startsWith('/admin/products/new')) return 'Yeni Məhsul Əlavə Et';
    if (path.startsWith('/admin/products')) return 'Məhsullar';
    if (path.startsWith('/admin/orders')) return 'Sifarişlər';
    if (path.startsWith('/admin/categories')) return 'Kateqoriyalar';
    if (path.startsWith('/admin/users')) return 'İstifadəçilər';
    if (path.startsWith('/admin/settings')) return 'Parametrlər';
    if (path.startsWith('/admin/catalog')) return 'Kataloq Məlumatları';
    return 'Admin Panel'; // Default başliq
  };

  const pageTitle = getPageTitle(currentPath);

  return (
    // flex silindi, çünki sidebar yoxdur
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Sidebar silindi */}
      
      {/* Əsas Məzmun (ml-64 silindi) */}
      <div className={`flex-1 flex flex-col overflow-hidden`}>
        {/* Header */}
        <header className="bg-white shadow-sm p-4 h-[65px] flex items-center justify-between border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            {/* Geri Düyməsi */}
            {showBackButton && (
              <Link to="/admin" className="mr-4 p-2 text-gray-500 hover:text-primary">
                <ArrowLeft size={20} />
              </Link>
            )}
            
            {/* Səhifə Başlığı */}
            <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
          </div>
          
          {/* Çıxış düyməsi */}
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-500 flex items-center"
          >
            <LogOut size={20} className="mr-1" />
            <span>Çıxış</span>
          </button>
        </header>

        {/* Səhifə məzmunu */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet /> {/* Alt routların komponentləri burada göstəriləcək */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 