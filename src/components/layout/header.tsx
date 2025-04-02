import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu,
  ChevronDown,
  Settings,
  Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const hasAdminRole = await isAdmin();
      setIsAdminUser(hasAdminRole);
    };
    
    if (user) {
      checkAdminStatus();
    }
  }, [user, isAdmin]);

  return (
    <header className="bg-white border-b border-gold-200">
      {/* Top bar */}
      <div className="bg-gold-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-light tracking-wide text-gold-700">Bütün sifarişlər üçün çatdırılma pulsuzdur</p>
            <div className="flex items-center space-x-6">
              <Link to="/contact" className="text-xs uppercase tracking-wider text-gold-700 hover:text-primary transition-colors duration-300">Əlaqə</Link>
              <Link to="/faq" className="text-xs uppercase tracking-wider text-gold-700 hover:text-primary transition-colors duration-300">FAQ</Link>
              <Link 
                to="/admin/login" 
                className="text-xs uppercase tracking-wider text-gold-700 hover:text-primary transition-colors duration-300 flex items-center"
              >
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-didot tracking-widest">
              <span className="text-primary uppercase">Easy</span>
              <span className="text-dark uppercase">Parfum</span>
            </span>
          </Link>
          
          {/* Nav Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm uppercase tracking-wider text-dark hover:text-primary transition-colors duration-300 flex items-center">
              Kataloq
              <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
            <Link to="/brands" className="text-sm uppercase tracking-wider text-dark hover:text-primary transition-colors duration-300">
              Brendlər
            </Link>
            <Link to="/new" className="text-sm uppercase tracking-wider text-dark hover:text-primary transition-colors duration-300">
              Yeni
            </Link>
            <Link to="/bestsellers" className="text-sm uppercase tracking-wider text-dark hover:text-primary transition-colors duration-300">
              Bestsellerlər
            </Link>
          </nav>
          
          {/* User actions */}
          <div className="flex items-center space-x-6">
            <button className="text-dark hover:text-primary transition-colors duration-300">
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/wishlist" className="text-dark hover:text-primary transition-colors duration-300 relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">0</span>
            </Link>
            
            <Link to="/cart" className="text-dark hover:text-primary transition-colors duration-300 relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">0</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdminUser && (
                  <Link 
                    to="/admin" 
                    className="text-dark hover:text-primary transition-colors duration-300"
                    title="Admin Panel"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                )}
                <Link to="/profile" className="text-dark hover:text-primary transition-colors duration-300">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <Link 
                to="/auth/login"
                className="text-sm uppercase tracking-wider text-dark hover:text-primary transition-colors duration-300 hidden sm:flex items-center gap-1"
              >
                <User className="w-4 h-4 mr-1" />
                {t('header.login')}
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-dark hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Search bar - Expandable */}
      <div className="border-t border-gold-200 py-4 hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Axtarış..."
                className="w-full py-3 px-4 bg-transparent border-b border-gold-300 focus:outline-none focus:border-primary transition-colors text-dark placeholder-gold-400"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gold-500 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gold-200">
          <div className="container mx-auto">
            <nav className="py-4">
              <ul className="space-y-4">
                <li className="border-b border-gold-200 pb-3">
                  <Link 
                    to="/products"
                    className="block px-4 py-2 text-dark hover:text-primary transition-colors uppercase tracking-wider text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kataloq
                  </Link>
                </li>
                <li className="border-b border-gold-200 pb-3">
                  <Link 
                    to="/brands"
                    className="block px-4 py-2 text-dark hover:text-primary transition-colors uppercase tracking-wider text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Brendlər
                  </Link>
                </li>
                <li className="border-b border-gold-200 pb-3">
                  <Link 
                    to="/new"
                    className="block px-4 py-2 text-dark hover:text-primary transition-colors uppercase tracking-wider text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Yeni
                  </Link>
                </li>
                <li className="border-b border-gold-200 pb-3">
                  <Link 
                    to="/bestsellers"
                    className="block px-4 py-2 text-dark hover:text-primary transition-colors uppercase tracking-wider text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bestsellerlər
                  </Link>
                </li>
                <li className="border-b border-gold-200 pb-3">
                  <Link 
                    to="/admin/login"
                    className="block px-4 py-2 text-dark hover:text-primary transition-colors uppercase tracking-wider text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4 mr-1 inline-block" />
                    Admin Girişi
                  </Link>
                </li>
                {isAdminUser && (
                  <li className="border-b border-gold-200 pb-3">
                    <Link 
                      to="/admin"
                      className="block px-4 py-2 text-dark hover:text-primary transition-colors uppercase tracking-wider text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li className="border-b border-gold-200 pb-3">
                  <Link 
                    to="/auth/login"
                    className="block px-4 py-2 text-dark hover:text-primary transition-colors uppercase tracking-wider text-sm"
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