import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, CreditCard, Truck, Facebook, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white border-t">
      {/* Üstünlüklər */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start space-x-4">
              <Truck className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Pulsuz çatdırılma</h4>
                <p className="text-sm text-gray-600">Bütün sifarişlər üçün pulsuz çatdırılma</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CreditCard className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Təhlükəsiz ödəniş</h4>
                <p className="text-sm text-gray-600">100% təhlükəsiz ödəmə sistemi</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">24/7 Dəstək</h4>
                <p className="text-sm text-gray-600">Həftənin hər günü onlayn dəstək</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Mağaza ünvanı</h4>
                <p className="text-sm text-gray-600">Bakı şəhəri, Nizami küçəsi 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Haqqımızda */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-extrabold">
                <span className="text-primary">Easy</span>
                <span className="text-gray-800">Parfum</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-6">
              EasyParfum - Azərbaycanın premium parfümeriya məhsulları platforması. Bütün məhsullar 100% orijinaldır və rəsmi distribütorlardan tədarük olunur.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Menyular */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menyular</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary text-sm">Haqqımızda</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary text-sm">Məhsullar</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Əlaqə</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary text-sm">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Kateqoriyalar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kateqoriyalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=qadin" className="text-gray-600 hover:text-primary text-sm">Qadın ətirləri</Link>
              </li>
              <li>
                <Link to="/products?category=kisi" className="text-gray-600 hover:text-primary text-sm">Kişi ətirləri</Link>
              </li>
              <li>
                <Link to="/products?category=uniseks" className="text-gray-600 hover:text-primary text-sm">Uniseks ətirlər</Link>
              </li>
              <li>
                <Link to="/products?category=setler" className="text-gray-600 hover:text-primary text-sm">Ətir setləri</Link>
              </li>
              <li>
                <Link to="/products?category=ev-etirleri" className="text-gray-600 hover:text-primary text-sm">Ev ətirləri</Link>
              </li>
            </ul>
          </div>

          {/* Əlaqə */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Əlaqə</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <a href="tel:+994501234567" className="text-sm hover:text-primary">+994 50 123 45 67</a>
              </li>
              <li className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <a href="mailto:info@parfumbar.az" className="text-sm hover:text-primary">info@parfumbar.az</a>
              </li>
              <li className="flex items-start text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-sm">Bakı şəhəri, Nizami küçəsi 5</span>
              </li>
              <li className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-primary" />
                <span className="text-sm">Hər gün: 10:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} EasyParfum. Bütün hüquqlar qorunur.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};