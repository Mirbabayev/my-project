import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Award, Check, Truck, Clock } from 'lucide-react';

interface PerfumeInfo {
  brand: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: {
    [key: string]: number;
  };
  discount?: number;
  badges: string[];
  stock: boolean;
}

interface ProductInfoProps {
  perfume: PerfumeInfo;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 } 
  }
};

export const ProductInfo: React.FC<ProductInfoProps> = ({ perfume }) => {
  const [selectedSize, setSelectedSize] = useState<string>(Object.keys(perfume.price)[1] || "50ml");
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  const getSizePrice = () => {
    return perfume.price[selectedSize] || 0;
  };

  const getDiscountedPrice = () => {
    const originalPrice = getSizePrice();
    if (perfume.discount) {
      return originalPrice - (originalPrice * perfume.discount / 100);
    }
    return originalPrice;
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? "star-active" : "star-inactive"} 
      />
    ));
  };
  
  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="space-y-6">
      {/* Brand and product name */}
      <div>
        <motion.div 
          variants={fadeInUp}
          className="text-sm text-accent uppercase tracking-wider mb-2 font-medium"
        >
          {perfume.brand}
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp}
          className="product-title text-3xl md:text-4xl mb-4"
        >
          {perfume.name}
        </motion.h1>
        
        {/* Rating */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center"
        >
          <div className="flex">
            {renderStars(perfume.rating)}
          </div>
          <div className="ml-2 text-xs text-text-light">
            ({perfume.reviewCount} rəy)
          </div>
        </motion.div>
      </div>

      {/* Badges - luxury style */}
      <motion.div 
        variants={fadeInUp}
        className="flex flex-wrap gap-2"
      >
        {perfume.badges.map((badge, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-3 py-1 bg-background-light border border-border text-xs text-accent rounded-sm font-medium"
          >
            <Award size={12} className="mr-1" />
            {badge}
          </span>
        ))}
      </motion.div>

      {/* Price */}
      <motion.div variants={fadeInUp} className="pt-4 border-t border-border">
        <div className="flex items-baseline">
          <span className="price">
            {getDiscountedPrice().toFixed(2)}₼
          </span>
          
          {perfume.discount && (
            <span className="price-discounted">
              {getSizePrice().toFixed(2)}₼
            </span>
          )}
          
          {perfume.discount && (
            <span className="discount-badge ml-3">
              {perfume.discount}% endirim
            </span>
          )}
        </div>
        
        <div className="text-sm text-text-light mt-2 flex items-center">
          <Truck size={14} className="mr-2 text-accent" />
          Çatdırılma pulsuz (Bakı daxili)
        </div>
      </motion.div>

      {/* Size options - luxury style */}
      <motion.div variants={fadeInUp} className="pt-6">
        <h3 className="text-sm font-medium text-text mb-3 uppercase tracking-wider">Ölçü</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.keys(perfume.price).map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`size-option ${selectedSize === size ? 'active' : ''}`}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-text-light">
          *Qeyd: Flakon həcmi böyüdükcə, ml başına qiymət daha sərfəli olur
        </div>
      </motion.div>

      {/* Quantity selector - luxury style */}
      <motion.div variants={fadeInUp} className="pt-6">
        <h3 className="text-sm font-medium text-text mb-3 uppercase tracking-wider">Miqdar</h3>
        <div className="flex w-32 h-10">
          <button 
            onClick={decrementQuantity}
            className="w-10 h-full border border-border flex items-center justify-center hover:bg-background-light text-text-light transition-colors"
          >
            -
          </button>
          <div className="flex-1 h-full border-t border-b border-border flex items-center justify-center text-text">
            {quantity}
          </div>
          <button 
            onClick={incrementQuantity}
            className="w-10 h-full border border-border flex items-center justify-center hover:bg-background-light text-text-light transition-colors"
          >
            +
          </button>
        </div>
      </motion.div>

      {/* Availability */}
      <motion.div variants={fadeInUp} className="flex items-center pt-3">
        {perfume.stock ? (
          <div className="flex items-center text-accent text-sm">
            <Check size={16} className="mr-2" />
            Stokda var - <Clock size={14} className="mx-2" /> Sürətli çatdırılma (24 saat ərzində)
          </div>
        ) : (
          <div className="text-error text-sm flex items-center">
            <span className="inline-block w-2 h-2 bg-error rounded-full mr-2"></span>
            Stokda yoxdur
          </div>
        )}
      </motion.div>

      {/* Add to cart and wishlist - luxury style */}
      <motion.div 
        variants={fadeInUp}
        className="flex gap-3 mt-8"
      >
        <button 
          disabled={!perfume.stock}
          className={`btn btn-primary flex-1 ${!perfume.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ShoppingBag size={18} className="mr-2" />
          Səbətə əlavə et
        </button>
        
        <button 
          onClick={toggleWishlist}
          className={`btn btn-outline p-3 flex items-center justify-center`}
        >
          <Heart 
            size={20} 
            className={wishlist ? "fill-accent" : ""} 
          />
        </button>
      </motion.div>
      
      {/* Product highlights - luxury style */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border mt-8"
      >
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-sm bg-background-light border border-border flex items-center justify-center flex-shrink-0">
            <Check size={14} className="text-accent" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-text">100% Orijinal</h4>
            <p className="text-xs text-text-light mt-1">Bütün məhsullar rəsmi distribütor mənbələrindən alınır</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-sm bg-background-light border border-border flex items-center justify-center flex-shrink-0">
            <Check size={14} className="text-accent" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-text">Pulsuz Çatdırılma</h4>
            <p className="text-xs text-text-light mt-1">Bakı daxili 24 saat ərzində pulsuz çatdırılma</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo; 