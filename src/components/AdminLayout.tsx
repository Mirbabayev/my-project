import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, PenLine, Tag, LayoutDashboard, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Əgər istifadəçi authenticate olmayıbsa, login səhifəsinə yönləndir
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const NavItem: React.FC<{
    to: string;
    icon: React.ReactNode;
    label: string;
  }> = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 py-3 px-4 rounded-md 
         ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold text-indigo-700">Admin Panel</h1>
          </div>
          <nav className="space-y-2">
            <NavItem 
              to="/admin" 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
            />
            <NavItem 
              to="/admin/products" 
              icon={<ShoppingBag size={20} />} 
              label="Məhsullar" 
            />
            <NavItem 
              to="/admin/brands" 
              icon={<Tag size={20} />} 
              label="Brendlər" 
            />
            <NavItem 
              to="/admin/blog" 
              icon={<PenLine size={20} />} 
              label="Bloq" 
            />
          </nav>
        </div>
        <div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 py-3 px-4 rounded-md text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut size={20} />
            <span>Çıxış</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}; 