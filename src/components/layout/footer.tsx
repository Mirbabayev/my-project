import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, CreditCard, Truck, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white">
      {/* Üstünlüklər bölməsi */}
      <div className="border-t border-b border-gold-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="text-center">
              <Truck className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-didot text-base uppercase tracking-wider mb-2 text-dark">Pulsuz çatdırılma</h4>
              <p className="text-sm text-gold-700 font-light">Bütün sifarişlər üçün pulsuz çatdırılma</p>
            </div>
            
            <div className="text-center">
              <CreditCard className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-didot text-base uppercase tracking-wider mb-2 text-dark">Təhlükəsiz ödəniş</h4>
              <p className="text-sm text-gold-700 font-light">100% təhlükəsiz ödəmə sistemi</p>
            </div>
            
            <div className="text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-didot text-base uppercase tracking-wider mb-2 text-dark">24/7 Dəstək</h4>
              <p className="text-sm text-gold-700 font-light">Həftənin hər günü onlayn dəstək</p>
            </div>
            
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-didot text-base uppercase tracking-wider mb-2 text-dark">Mağaza ünvanı</h4>
              <p className="text-sm text-gold-700 font-light">Bakı şəhəri, Nizami küçəsi 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Əsas footer bölməsi */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Logo və Haqqımızda */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-didot tracking-widest uppercase">
                <span className="text-primary">Easy</span>
                <span className="text-dark">Parfum</span>
              </span>
            </Link>
            <p className="text-gold-700 text-sm mb-8 font-light leading-relaxed">
              EasyParfum - Azərbaycanın premium parfümeriya məhsulları platforması. Bütün məhsullar 100% orijinaldır və rəsmi distribütorlardan tədarük olunur.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold-400 flex items-center justify-center text-gold-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold-400 flex items-center justify-center text-gold-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold-400 flex items-center justify-center text-gold-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold-400 flex items-center justify-center text-gold-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Menyular */}
          <div className="md:col-span-2">
            <h3 className="font-didot text-lg uppercase tracking-wider mb-6 text-dark relative inline-block">
              Menyular
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Haqqımızda</Link>
              </li>
              <li>
                <Link to="/products" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Məhsullar</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Əlaqə</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Kateqoriyalar */}
          <div className="md:col-span-3">
            <h3 className="font-didot text-lg uppercase tracking-wider mb-6 text-dark relative inline-block">
              Kateqoriyalar
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=qadin" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Qadın ətirləri</Link>
              </li>
              <li>
                <Link to="/products?category=kisi" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Kişi ətirləri</Link>
              </li>
              <li>
                <Link to="/products?category=uniseks" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Uniseks ətirlər</Link>
              </li>
              <li>
                <Link to="/products?category=setler" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Ətir setləri</Link>
              </li>
              <li>
                <Link to="/products?category=ev-etirleri" className="text-gold-700 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wide">Ev ətirləri</Link>
              </li>
            </ul>
          </div>

          {/* Əlaqə */}
          <div className="md:col-span-3">
            <h3 className="font-didot text-lg uppercase tracking-wider mb-6 text-dark relative inline-block">
              Əlaqə
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gold-700">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <a href="tel:+994501234567" className="text-sm hover:text-primary transition-colors duration-300">+994 50 123 45 67</a>
              </li>
              <li className="flex items-center text-gold-700">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <a href="mailto:info@easyparfum.az" className="text-sm hover:text-primary transition-colors duration-300">info@easyparfum.az</a>
              </li>
              <li className="flex items-start text-gold-700">
                <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm font-light">Bakı şəhəri, Nizami küçəsi 5</span>
              </li>
              <li className="flex items-center text-gold-700">
                <Clock className="w-5 h-5 mr-3 text-primary" />
                <span className="text-sm font-light">Hər gün: 10:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Abunəlik bölməsi */}
        <div className="border-t border-b border-gold-200 py-12 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-didot text-xl uppercase tracking-wider mb-3 text-dark">Yeniliklərdən xəbərdar olun</h3>
            <p className="text-gold-700 mb-6 font-light">Ən son yeniliklərdən və xüsusi təkliflərdən xəbərdar olmaq üçün abunə olun</p>
            <form className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="E-poçt ünvanınız"
                className="flex-1 py-3 px-4 bg-transparent border-b border-gold-300 focus:outline-none focus:border-primary transition-colors text-dark placeholder-gold-400"
              />
              <button 
                type="submit" 
                className="bvlgari-btn ml-2"
              >
                Abunə olun
              </button>
            </form>
          </div>
        </div>

        {/* Copyright bölməsi */}
        <div className="text-center">
          <p className="text-sm text-gold-700 font-light">
            © {currentYear} EasyParfum. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
};