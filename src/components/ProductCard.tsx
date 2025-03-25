import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { cn } from '../utils/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className, 
  size = 'md'
}) => {
  const {
    id,
    name,
    brand,
    price,
    oldPrice,
    imageUrl,
    rating,
    discount,
    inStock,
    fragranceType,
    gender,
    volume
  } = product;

  // Dinamik stil ölçüləri
  const sizes = {
    sm: {
      container: 'h-[360px]',
      image: 'h-[180px]',
      title: 'text-sm',
      price: 'text-base'
    },
    md: {
      container: 'h-[420px]',
      image: 'h-[220px]',
      title: 'text-base',
      price: 'text-lg'
    },
    lg: {
      container: 'h-[480px]',
      image: 'h-[280px]',
      title: 'text-lg',
      price: 'text-xl'
    },
  };

  const selectedSize = sizes[size];

  return (
    <motion.div 
      className={cn(
        'relative group bg-white border border-gray-100 hover:border-amber-100 rounded-sm overflow-hidden shadow-subtle hover:shadow-soft transition-all duration-300',
        selectedSize.container,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      {/* Təxirə salınmış hover overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-amber-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      {/* Endirim nişanı */}
      {discount && discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <motion.div 
            className="flex items-center justify-center bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded-sm"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            -{discount}%
          </motion.div>
        </div>
      )}

      {/* Ətir tipi nişanı */}
      <div className="absolute top-3 right-3 z-10">
        <motion.div 
          className="flex items-center bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-sm border border-gray-100"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {gender} {fragranceType}
        </motion.div>
      </div>

      {/* Favoritlərə əlavə et düyməsi */}
      <motion.button 
        className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 bg-white rounded-full p-1.5 shadow-md hover:text-rose-500 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart size={16} />
      </motion.button>

      {/* Məhsul şəkili */}
      <Link to={`/product/${id}`} className="block">
        <div className={cn("relative w-full overflow-hidden bg-gray-50", selectedSize.image)}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
          />
          
          {/* Yeni məhsul indikatoru */}
          {product.id % 5 === 0 && (
            <div className="absolute bottom-2 left-2">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-1.5 py-0.5 text-xs rounded-sm">
                <Sparkles size={12} />
                <span className="font-medium">Yeni</span>
              </div>
            </div>
          )}
          
          {/* Stokda olmayan indikatoru */}
          {!inStock && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-gray-800/80 text-white font-medium text-xs px-3 py-1 rounded-sm">
                Stokda yoxdur
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Məhsul məlumatları */}
      <div className="flex flex-col justify-between p-4 h-[calc(100%-220px)]">
        <div className="space-y-2">
          <div className="text-gray-400 text-xs uppercase tracking-wider">{brand}</div>
          
          <Link to={`/product/${id}`} className="block group-hover:text-amber-800 transition-colors">
            <h3 className={cn("font-medium line-clamp-2", selectedSize.title)}>
              {name} ({volume}ml)
            </h3>
          </Link>
          
          {/* Reytinq */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  size={12} 
                  fill={star <= Math.round(rating) ? "currentColor" : "none"} 
                  className="text-amber-400"
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 flex justify-between items-end">
          {/* Qiymət */}
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {oldPrice.toFixed(2)} AZN
              </span>
            )}
            <span className={cn("font-medium text-gray-900", selectedSize.price)}>
              {price.toFixed(2)} AZN
            </span>
          </div>

          {/* Səbətə əlavə et düyməsi */}
          {inStock && (
            <motion.button
              className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-amber-100 p-2 rounded-full text-gray-800 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};