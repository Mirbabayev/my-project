import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
// import Sidebar from '../components/admin/Sidebar.tsx'; // Sidebar importu silindi
import { ArrowLeft } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Əsas admin səhifəsində geri düyməsini göstərməmək üçün yoxlama
  const showBackButton = currentPath !== '/admin'; 

  // Səhifə başlığını avtomatik təyin etmək üçün sadə məntiq
  const getPageTitle = (path: string): string => {
    if (path.startsWith('/admin/products/new')) return 'Yeni Məhsul Əlavə Et';
    if (path.startsWith('/admin/products')) return 'Məhsullar';
    if (path.startsWith('/admin/orders')) return 'Sifarişlər'; // Gələcək üçün
    if (path.startsWith('/admin/categories')) return 'Kateqoriyalar'; // Gələcək üçün
    if (path.startsWith('/admin/users')) return 'İstifadəçilər'; // Gələcək üçün
    if (path.startsWith('/admin/settings')) return 'Parametrlər'; // Gələcək üçün
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
        <header className="bg-white shadow-sm p-4 h-[65px] flex items-center border-b border-gray-200 flex-shrink-0">
          {/* Geri Düyməsi */}
          {showBackButton && (
            <Link to="/admin" className="mr-4 p-2 text-gray-500 hover:text-primary">
              <ArrowLeft size={20} />
            </Link>
          )}
          
          {/* Səhifə Başlığı */}
          <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
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