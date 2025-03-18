import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, User, LogOut, LogIn, UserPlus } from 'lucide-react';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Çıxış zamanı xəta:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            E-Parfum
          </Link>

          <nav className="flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-primary">
              {t('header.products')}
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-600 hover:text-primary">
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-primary"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('header.login')}
                </Link>
                <Link
                  to="/auth/register"
                  className="flex items-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t('header.register')}
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};