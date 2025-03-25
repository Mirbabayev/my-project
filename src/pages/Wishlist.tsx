import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Product } from '../types';

export const Wishlist = () => {
  const { items, removeFromWishlist, totalItems } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Sevimlilər siyahınız boşdur</h1>
          <p className="text-gray-600 mb-8">
            Sizin sevimlilər siyahınızda hazırda heç bir məhsul yoxdur. Sevimli məhsulları əlavə etmək üçün məhsullar səhifəsinə keçin.
          </p>
          <Link to="/products">
            <Button variant="primary">
              Məhsullara baxın
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Sevimlilər ({totalItems})</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white transition-colors"
                aria-label="Sevimlilərdən sil"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium">
                <Link
                  to={`/products/${product.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <p className="text-sm text-gray-500 mb-3">{product.volume}ml</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-lg">{product.price} ₼</span>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                  onClick={() => handleAddToCart(product)}
                >
                  Səbətə at
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 