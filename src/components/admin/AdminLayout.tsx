import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
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
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Klikdən kənar bağlamaq üçün referanslar
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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

  const navigationItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'dashboard' },
    { path: '/admin/products', icon: Package, label: 'products' },
    { path: '/admin/brands', icon: Tags, label: 'brands' },
    { path: '/admin/blog', icon: FileText, label: 'blog' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'orders' },
    { path: '/admin/customers', icon: Users, label: 'customers' },
    { path: '/admin/settings', icon: Settings, label: 'settings' }
  ];

  const handleLogout = () => {
    // Çıxış funksiyası
    navigate('/admin/login');
  };

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
                      <div className="text-sm font-medium text-gray-300">Admin</div>
                      <div className="text-xs text-gray-400">admin@example.com</div>
                    </div>
                    <ChevronRight size={16} className={`ml-auto transform transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <div className={`mt-2 overflow-hidden transition-all duration-300 ${isProfileMenuOpen ? 'max-h-24' : 'max-h-0'}`}>
                    <div className="bg-gray-800 rounded-lg">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-lg"
                      >
                        <LogOut size={18} className="mr-3" />
                        {t('logout')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex justify-center items-center w-full p-3 my-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                  title="Profil"
                >
                  <User size={20} />
                </button>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="text-xl font-medium text-gray-800">
              {navigationItems.find(item => location.pathname === item.path)?.label && t(navigationItems.find(item => location.pathname === item.path)?.label || '')}
            </div>

            <div className="w-10"> {/* Boş sahə tarazlıq üçün */}
            </div>
          </div>
        </header>

        {/* Dil seçimi drop-down (kiçik sidebar vəziyyətində) */}
        {isLanguageMenuOpen && !isSidebarOpen && (
          <div 
            className="fixed left-20 top-[120px] bg-gray-800 rounded-lg shadow-lg py-1 z-50 w-48 animate-slideIn"
          >
            <button
              onClick={() => {
                setLanguage('az');
                setIsLanguageMenuOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-700 ${
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
              className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-700 ${
                language === 'ru' ? 'bg-gray-700 text-white' : 'text-gray-300'
              }`}
            >
              <Globe size={16} className="mr-3" />
              Русский
            </button>
          </div>
        )}
        
        {/* Bildiriş drop-down (kiçik sidebar vəziyyətində) */}
        {isNotificationsOpen && !isSidebarOpen && (
          <div className="fixed left-20 top-[170px] bg-gray-800 rounded-lg shadow-lg py-1 z-50 w-64 animate-slideIn">
            <div className="p-3 border-b border-gray-700">
              <h3 className="font-medium text-white">Bildirişlər</h3>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              <div className="p-2 bg-gray-700 rounded text-gray-200 text-sm mb-2">
                <div className="font-medium">Yeni sifariş daxil oldu</div>
                <div className="text-xs text-gray-400">2 dəqiqə əvvəl</div>
              </div>
              <div className="p-2 bg-gray-700 rounded text-gray-200 text-sm">
                <div className="font-medium">Stok azalıb</div>
                <div className="text-xs text-gray-400">1 saat əvvəl</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Profil drop-down (kiçik sidebar vəziyyətində) */}
        {isProfileMenuOpen && !isSidebarOpen && (
          <div className="fixed left-20 top-[220px] bg-gray-800 rounded-lg shadow-lg py-1 z-50 w-48 animate-slideIn">
            <div className="p-3 border-b border-gray-700 flex items-center">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <div className="font-medium text-white">Admin</div>
                <div className="text-xs text-gray-400">admin@example.com</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700"
            >
              <LogOut size={16} className="mr-2" />
              {t('logout')}
            </button>
          </div>
        )}

        {/* Main Content */}
        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>

      {/* Global styles for scrollbar and animations */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1f2937;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4b5563;
            border-radius: 20px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #6b7280;
          }
          
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4b5563 #1f2937;
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          .animate-slideIn {
            animation: slideIn 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout; 