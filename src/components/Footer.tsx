import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-serif text-xl tracking-wide font-normal mb-6">Əlaqə</h3>
            <div className="space-y-4">
              <a href="tel:+994123456789" className="flex items-center text-gray-500 hover:text-gray-900">
                <Phone size={14} className="mr-2" />
                +994 12 345 67 89
              </a>
              <a href="mailto:info@easyperfume.az" className="flex items-center text-gray-500 hover:text-gray-900">
                <Mail size={14} className="mr-2" />
                info@easyperfume.az
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-serif text-xl tracking-wide font-normal mb-6">Ətirlər</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/brands" className="text-gray-500 hover:text-gray-900 font-sans text-sm">Brendlər</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-500 hover:text-gray-900 font-sans text-sm">Kateqoriyalar</Link>
              </li>
              <li>
                <Link to="/new" className="text-gray-500 hover:text-gray-900 font-sans text-sm">Yeni</Link>
              </li>
              <li>
                <Link to="/discounts" className="text-gray-500 hover:text-gray-900 font-sans text-sm">Endirimlər</Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-gray-900 font-serif text-xl tracking-wide font-normal mb-6">Məlumat</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-gray-900 font-sans text-sm">Haqqımızda</Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-500 hover:text-gray-900 font-sans text-sm">Çatdırılma</Link>
              </li>
              <li>
                <Link to="/payment" className="text-gray-500 hover:text-gray-900 font-sans text-sm">Ödəmə</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-500 hover:text-gray-900 font-sans text-sm">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-gray-900 font-serif text-xl tracking-wide font-normal mb-6">Bizi izləyin</h3>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-gray-900">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} EASY · PERFUME. Bütün hüquqlar qorunur.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-gray-900">Məxfilik</Link>
              <Link to="/terms" className="text-xs text-gray-400 hover:text-gray-900">İstifadə şərtləri</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};