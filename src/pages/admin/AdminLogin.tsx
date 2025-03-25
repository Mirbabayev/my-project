import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
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
              <p>Email: admin@example.com</p>
              <p>Şifrə: admin123</p>
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