import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldOff, Home, ArrowLeft } from 'lucide-react';

const Unauthorized: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldOff className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">İcazə xətası</h1>
        <p className="text-gray-600 mb-6">
          Bu səhifəyə daxil olmaq üçün lazımi icazələrə sahib deyilsiniz.
        </p>
        
        {user && (
          <div className="mb-6 text-left bg-gray-50 p-4 rounded-lg">
            <h2 className="font-medium text-gray-800 mb-2">Giriş məlumatları:</h2>
            <p className="text-gray-600">İstifadəçi: {user.name}</p>
            <p className="text-gray-600">Rol: {user.role === 'admin' ? 'Admin' : user.role === 'vendor' ? 'Satıcı' : 'İstifadəçi'}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/admin"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin panelə qayıt
          </Link>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Home className="h-4 w-4" />
            Ana səhifəyə qayıt
          </Link>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-indigo-600 hover:underline transition-colors"
          >
            Çıxış et
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 