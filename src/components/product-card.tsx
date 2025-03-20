import { useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '../lib/utils';
import { useEffect, useState, useRef } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    // Calculate percentage position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Get distance from center in percentage
    const percentX = (x - centerX) / centerX * 20; // max 20% movement
    const percentY = (y - centerY) / centerY * 10; // max 10% movement
    
    setPosition({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset position with animation when mouse leaves
    setPosition({ x: 0, y: 0 });
  };
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Use navigate from react-router-dom to programmatically navigate
    navigate(`/products/${product.id}`);
  };

  return (
    <div 
      ref={cardRef}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ 
        transform: isHovering ? `perspective(1000px) rotateX(${-position.y}deg) rotateY(${position.x}deg) scale3d(1.02, 1.02, 1.02)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovering ? 'transform 0.1s ease' : 'transform 0.3s ease-out'
      }}
    >
      {/* Şəkil konteyner */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Favori düyməsi */}
        <button 
          className="absolute top-3 right-3 z-[10] p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
          aria-label="Seçilmişlərə əlavə et"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Burada favorilərə əlavə etmə funksiyası çağırıla bilər
          }}
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-primary transition-colors" />
        </button>

        {/* Şəkil */}
        <div 
          className="relative h-full w-full"
          style={{ 
            transform: isHovering ? `translate3d(${position.x * 0.5}px, ${position.y * 0.5}px, 0)` : '',
            transition: isHovering ? 'transform 0.1s ease' : 'transform 0.3s ease-out'
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
            style={{ 
              mixBlendMode: 'multiply',
              transform: isHovering ? `translate3d(${position.x * 1.5}px, ${position.y * 1.5}px, 30px)` : '',
              transition: isHovering ? 'transform 0.1s ease' : 'transform 0.3s ease-out'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=Şəkil+yoxdur";
              target.onerror = null;
            }}
          />
        </div>

        {/* Səbətə əlavə et overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button 
            className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary hover:text-white transition-colors z-[10]"
            style={{ 
              transform: isHovering ? `translate3d(${-position.x * 0.8}px, ${-position.y * 0.8}px, 40px)` : '',
              transition: isHovering ? 'transform 0.1s ease' : 'transform 0.3s ease-out'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Burada səbətə əlavə etmə funksiyası çağırıla bilər
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            Səbətə əlavə et
          </button>
          <button 
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-primary hover:text-white transition-colors z-[10]"
            style={{ 
              transform: isHovering ? `translate3d(${position.x * 0.8}px, ${-position.y * 0.8}px, 40px)` : '',
              transition: isHovering ? 'transform 0.1s ease' : 'transform 0.3s ease-out'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Sürətli baxış funksiyası
            }}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Məhsul məlumatları */}
      <div 
        className="p-4"
        style={{ 
          transform: isHovering ? `translate3d(${position.x * 0.3}px, ${position.y * 0.3}px, 20px)` : '',
          transition: isHovering ? 'transform 0.1s ease' : 'transform 0.3s ease-out'
        }}
      >
        {/* Brend */}
        <p className="text-xs font-medium text-primary/80 mb-1">{product.brand}</p>
        
        {/* Məhsul adı */}
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2 relative z-0">
          {product.name}
        </h3>

        {/* Qiymət və Reytinq */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <p className="text-base font-semibold text-primary">{product.price} ₼</p>
        </div>
      </div>
    </div>
  );
} 