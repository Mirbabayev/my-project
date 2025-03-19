import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu
} from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-accent py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">Bütün sifarişlər üçün çatdırılma pulsuzdur</p>
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="text-xs text-gray-600 hover:text-primary">Əlaqə</Link>
              <Link to="/faq" className="text-xs text-gray-600 hover:text-primary">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold">
              <span className="text-primary">Easy</span>
              <span className="text-gray-800">Parfum</span>
            </span>
          </Link>
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md mx-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Axtarış..."
                className="w-full py-2 pl-4 pr-10 bg-accent/50 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-accent transition-colors relative">
              <Heart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">0</span>
            </Link>
            
            <Link to="/cart" className="p-2 rounded-full hover:bg-accent transition-colors relative">
              <ShoppingBag className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">0</span>
            </Link>
            
            {user ? (
              <Link to="/profile" className="p-2 rounded-full hover:bg-accent transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </Link>
            ) : (
              <Link 
                to="/auth/login"
                className="parfumbar-btn hidden sm:flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                {t('header.login')}
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="sm:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto">
            <nav className="py-4">
              <ul className="space-y-3">
                <li className="border-b border-gray-100 pb-2">
                  <Link 
                    to="/auth/login"
                    className="block px-4 py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('header.login')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};