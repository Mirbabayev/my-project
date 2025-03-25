import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, User, UserCircle, ShieldCheck } from 'lucide-react';

// Rol tipi
type UserRole = 'admin' | 'vendor' | 'user';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Əgər istifadəçi artıq giriş edibsə, admin panelə yönləndir
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Seçilmiş rolü ötürürük
      await login(email, password, selectedRole);
      navigate('/admin');
    } catch (err) {
      setError('Email və ya şifrə yanlışdır');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo və Başlıq */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Panelə Daxil Ol</h2>
          <p className="text-gray-600">Xoş gəlmisiniz! Zəhmət olmasa məlumatlarınızı daxil edin.</p>
        </div>

        {/* Login Formu */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email sahəsi */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2.5 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Şifrə sahəsi */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifrə
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-4 py-2.5 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Rol seçimi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Giriş rolu seçin
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border transition-all ${
                    selectedRole === 'admin'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <ShieldCheck className={`h-5 w-5 mr-2 ${
                    selectedRole === 'admin' ? 'text-indigo-600' : 'text-gray-500'
                  }`} />
                  <span>Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('vendor')}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border transition-all ${
                    selectedRole === 'vendor'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <UserCircle className={`h-5 w-5 mr-2 ${
                    selectedRole === 'vendor' ? 'text-indigo-600' : 'text-gray-500'
                  }`} />
                  <span>Satıcı</span>
                </button>
              </div>
            </div>

            {/* Xəta mesajı */}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Daxil ol düyməsi */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 px-4 text-white text-base font-medium rounded-lg 
                ${isLoading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'
                }`}
            >
              {isLoading ? 'Daxil olunur...' : 'Daxil ol'}
            </button>

            {/* Əlavə məlumat */}
            <div className="text-center text-sm text-gray-600">
              <p>Test məlumatları:</p>
              <p>Email: {selectedRole === 'admin' ? 'admin@example.com' : 'vendor@example.com'}</p>
              <p>Şifrə: {selectedRole === 'admin' ? 'admin123' : 'vendor123'}</p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← Ana səhifəyə qayıt
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 