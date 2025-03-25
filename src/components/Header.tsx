import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Heart, ShoppingBag, Search, Menu, X, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-50 py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+994123456789" className="flex items-center text-gray-500 hover:text-gray-900">
              <Phone size={14} className="mr-2" />
              +994 12 345 67 89
            </a>
            <a href="mailto:info@easyperfume.az" className="flex items-center text-gray-500 hover:text-gray-900">
              <Mail size={14} className="mr-2" />
              info@easyperfume.az
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-gray-500 hover:text-gray-900">Haqqımızda</Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-900">Əlaqə</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif tracking-wider text-gray-900 font-normal">
            EASY · PERFUME
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/brands" className="text-gray-600 hover:text-gray-900 font-sans text-sm uppercase tracking-wide">Brendlər</Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-900 font-sans text-sm uppercase tracking-wide">Kateqoriyalar</Link>
            <Link to="/new" className="text-gray-600 hover:text-gray-900 font-sans text-sm uppercase tracking-wide">Yeni</Link>
            <Link to="/discounts" className="text-gray-600 hover:text-gray-900 font-sans text-sm uppercase tracking-wide">Endirimlər</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Məhsul axtarışı..."
                className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-600 font-sans text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/admin/login" className="relative p-2 text-gray-500 hover:text-gray-900" title="Admin Panel">
              <Settings size={20} />
            </Link>
            <Link to="/wishlist" className="relative p-2 text-gray-500 hover:text-gray-900">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 text-gray-500 hover:text-gray-900">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/admin/login" className="text-gray-600 hover:text-gray-900 py-2 font-sans text-sm uppercase tracking-wide flex items-center">
                <Settings size={18} className="mr-2" />
                Admin Panel
              </Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Məhsul axtarışı..."
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-600 font-sans text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <Link to="/brands" className="text-gray-600 hover:text-gray-900 py-2 font-sans text-sm uppercase tracking-wide">Brendlər</Link>
              <Link to="/categories" className="text-gray-600 hover:text-gray-900 py-2 font-sans text-sm uppercase tracking-wide">Kateqoriyalar</Link>
              <Link to="/new" className="text-gray-600 hover:text-gray-900 py-2 font-sans text-sm uppercase tracking-wide">Yeni</Link>
              <Link to="/discounts" className="text-gray-600 hover:text-gray-900 py-2 font-sans text-sm uppercase tracking-wide">Endirimlər</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};