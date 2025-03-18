import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { LogIn, UserPlus, Grid } from 'lucide-react';

export const Header = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-primary">Easy</span>
              <span className="text-gray-800">Parfum</span>
            </Link>

            <Link to="/products" className="flex items-center text-gray-600 hover:text-primary">
              <Grid className="w-5 h-5 mr-2" />
              <span>Kataloq</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-6">
            {/* Səbət və profil hələlik gizlidir */}
            {/* <Link to="/cart" className="text-gray-600 hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
            </Link> */}

            {!user && (
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