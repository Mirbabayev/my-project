import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Tags,
  FileText,
  ShoppingCart,
  Users,
  Settings,
  ChevronDown,
  Bell,
  Menu,
  X,
  Globe,
  LogOut,
  User,
  ChevronRight,
  AlertOctagon
} from 'lucide-react';

// Role-a görə naviqasiya obyekti
const roleBasedNavigation = {
  admin: [
    { path: '/admin', icon: LayoutDashboard, label: 'dashboard' },
    { path: '/admin/products', icon: Package, label: 'products' },
    { path: '/admin/brands', icon: Tags, label: 'brands' },
    { path: '/admin/blog', icon: FileText, label: 'blog' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'orders' },
    { path: '/admin/customers', icon: Users, label: 'customers' },
    { path: '/admin/settings', icon: Settings, label: 'settings' }
  ],
  vendor: [
    { path: '/admin', icon: LayoutDashboard, label: 'dashboard' },
    { path: '/admin/products', icon: Package, label: 'products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'orders' }
  ]
};

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAdmin, isVendor } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Klikdən kənar bağlamaq üçün referanslar
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Auth olmayan istifadəçiləri login səhifəsinə yönləndirmək
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // Rollara görə naviqasiya elemenlərini təyin edirik
  const navigationItems = isAdmin 
    ? roleBasedNavigation.admin 
    : isVendor 
      ? roleBasedNavigation.vendor
      : [];

  // Klikdən kənar bağlanma effekti
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isLanguageMenuOpen && 
        languageDropdownRef.current && 
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
      
      if (
        isNotificationsOpen && 
        notificationsDropdownRef.current && 
        !notificationsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
      
      if (
        isProfileMenuOpen && 
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageMenuOpen, isNotificationsOpen, isProfileMenuOpen]);

  const handleLogout = () => {
    // Çıxış funksiyası
    logout();
    navigate('/admin/login');
  };

  // İstifadəçi olmadığı halda loading göstər
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Yüklənir...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-gray-900 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          <Link to="/admin" className="flex items-center">
            {isSidebarOpen ? (
              <span className="text-xl font-semibold text-white">EASY · PERFUME</span>
            ) : (
              <span className="text-xl font-semibold text-white">EP</span>
            )}
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? <ChevronDown className="rotate-90" size={20} /> : <ChevronDown className="-rotate-90" size={20} />}
          </button>
        </div>

        {/* Scroll Container */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
          <nav className="px-2 py-4 flex flex-col h-full">
            {/* Navigation Links */}
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {isSidebarOpen && <span className="ml-3">{t(item.label)}</span>}
                </Link>
              ))}
            </div>
            
            {/* Rol Bildirişi */}
            {isSidebarOpen && (
              <div className="mt-6 px-4 py-3">
                <div className="bg-gray-800 rounded-lg px-3 py-2 flex items-center">
                  <AlertOctagon size={16} className="text-indigo-400 mr-2" />
                  <span className="text-sm text-gray-300">
                    {isAdmin ? 'Admin Rolu' : isVendor ? 'Satıcı Rolu' : 'Məhdud Giriş'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Bildiriş düyməsi */}
            <div ref={notificationsDropdownRef} className="mt-6">
              {isSidebarOpen ? (
                <div className="px-4 py-3">
                  <div className="text-xs font-medium text-gray-400 uppercase mb-2">Bildirişlər</div>
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Bell size={20} />
                    <span className="ml-3">Bildirişlər</span>
                    <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">2</span>
                    <ChevronRight size={16} className={`ml-1 transform transition-transform duration-300 ${isNotificationsOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <div className={`mt-2 overflow-hidden transition-all duration-300 ${isNotificationsOpen ? 'max-h-60' : 'max-h-0'}`}>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-white mb-2 pb-2 border-b border-gray-700">Yeni bildirişlər</div>
                      <div className="space-y-2">
                        <div className="p-2 bg-gray-700 rounded text-gray-200 text-sm">
                          <div className="font-medium">Yeni sifariş daxil oldu</div>
                          <div className="text-xs text-gray-400">2 dəqiqə əvvəl</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded text-gray-200 text-sm">
                          <div className="font-medium">Stok azalıb</div>
                          <div className="text-xs text-gray-400">1 saat əvvəl</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="flex justify-center items-center w-full p-3 my-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white relative"
                  title="Bildirişlər"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )}
            </div>
            
            {/* Dil seçimi */}
            <div ref={languageDropdownRef} className="mt-4">
              {isSidebarOpen ? (
                <div className="px-4 py-3">
                  <div className="text-xs font-medium text-gray-400 uppercase mb-2">Dil Seçimi</div>
                  <button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Globe size={20} />
                    <span className="ml-3">
                      {language === 'az' && 'Azərbaycan'}
                      {language === 'en' && 'English'}
                      {language === 'ru' && 'Русский'}
                    </span>
                    <ChevronRight size={16} className={`ml-auto transform transition-transform duration-300 ${isLanguageMenuOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <div className={`mt-2 overflow-hidden transition-all duration-300 ${isLanguageMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
                    <div className="bg-gray-800 rounded-lg">
                      <button
                        onClick={() => {
                          setLanguage('az');
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 text-left rounded-t-lg hover:bg-gray-700 ${
                          language === 'az' ? 'bg-gray-700 text-white' : 'text-gray-300'
                        }`}
                      >
                        <Globe size={16} className="mr-3" />
                        Azərbaycan
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('en');
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-700 ${
                          language === 'en' ? 'bg-gray-700 text-white' : 'text-gray-300'
                        }`}
                      >
                        <Globe size={16} className="mr-3" />
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('ru');
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 text-left rounded-b-lg hover:bg-gray-700 ${
                          language === 'ru' ? 'bg-gray-700 text-white' : 'text-gray-300'
                        }`}
                      >
                        <Globe size={16} className="mr-3" />
                        Русский
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex justify-center items-center w-full p-3 my-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                  title="Dil Seçimi"
                >
                  <Globe size={20} />
                </button>
              )}
            </div>
            
            {/* Admin profili və çıxış - sticky bottom */}
            <div ref={profileDropdownRef} className="mt-auto">
              {isSidebarOpen ? (
                <div className="px-4 py-3">
                  <div className="text-xs font-medium text-gray-400 uppercase mb-2">Profil</div>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <User size={20} />
                    <div className="ml-3 text-left">
                      <span className="block text-sm font-medium">{user?.name}</span>
                      <span className="block text-xs text-gray-500">{user?.email}</span>
                    </div>
                    <ChevronRight size={16} className={`ml-auto transform transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <div className={`mt-2 overflow-hidden transition-all duration-300 ${isProfileMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
                    <div className="bg-gray-800 rounded-lg">
                      <Link
                        to="/admin/profile"
                        className="flex items-center w-full px-4 py-3 text-left rounded-t-lg text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <User size={16} className="mr-3" />
                        Profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-left rounded-b-lg text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <LogOut size={16} className="mr-3" />
                        Çıxış
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex justify-center items-center w-full p-3 my-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <User size={20} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center w-full p-3 my-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                    title="Çıxış"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white h-16 shadow px-4 flex items-center sticky top-0 z-30">
          <div className="flex-1 flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {location.pathname === '/admin' && t('dashboard')}
              {location.pathname === '/admin/products' && t('products')}
              {location.pathname === '/admin/brands' && t('brands')}
              {location.pathname === '/admin/blog' && t('blog')}
              {location.pathname === '/admin/orders' && t('orders')}
              {location.pathname === '/admin/customers' && t('customers')}
              {location.pathname === '/admin/settings' && t('settings')}
              {location.pathname === '/admin/profile' && 'Profil'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center mr-2">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="font-medium hidden md:inline-block">{user?.name}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pb-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 