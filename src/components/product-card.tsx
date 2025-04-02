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
  const [isFavorite, setIsFavorite] = useState(false);
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
    const percentX = (x - centerX) / centerX * 15; // max 15% movement
    const percentY = (y - centerY) / centerY * 8; // max 8% movement
    
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
    navigate(`/products/${product.id}`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart functionality
  };

  return (
    <div 
      ref={cardRef}
      className="group relative bg-white border border-transparent hover:border-gold-300 transition-all duration-500 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ 
        transform: isHovering ? `perspective(1000px) rotateX(${-position.y}deg) rotateY(${position.x}deg) scale3d(1.01, 1.01, 1.01)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovering ? 'transform 0.2s ease' : 'transform 0.5s ease-out'
      }}
    >
      {/* Şəkil konteyner */}
      <div className="relative aspect-square overflow-hidden bg-gold-100">
        {/* Favori düyməsi */}
        <button 
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10"
          aria-label="Seçilmişlərə əlavə et"
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-5 w-5 transition-colors", 
            isFavorite ? "text-primary fill-primary" : "text-gold-700"
          )} />
        </button>

        {/* Şəkil */}
        <div 
          className="relative h-full w-full flex items-center justify-center p-6"
          style={{ 
            transform: isHovering ? `translate3d(${position.x * 0.7}px, ${position.y * 0.7}px, 0)` : '',
            transition: isHovering ? 'transform 0.2s ease' : 'transform 0.5s ease-out'
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              mixBlendMode: 'multiply',
              transform: isHovering ? `translate3d(${position.x * 1.2}px, ${position.y * 1.2}px, 30px)` : '',
              transition: isHovering ? 'transform 0.2s ease' : 'transform 0.5s ease-out'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=Şəkil+yoxdur";
              target.onerror = null;
            }}
          />
        </div>

        {/* Overlay ilə düymələr */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
          <button 
            className="bg-white text-dark px-5 py-2.5 text-sm font-didot uppercase tracking-wider flex items-center gap-2 hover:bg-primary hover:text-white transition-colors duration-300 z-10"
            style={{ 
              transform: isHovering ? `translate3d(${-position.x * 0.5}px, ${-position.y * 0.5}px, 40px)` : 'translateY(20px)',
              opacity: isHovering ? 1 : 0,
              transition: isHovering ? 'transform 0.3s ease, opacity 0.3s ease' : 'transform 0.5s ease-out, opacity 0.5s ease-out'
            }}
            onClick={addToCart}
          >
            <ShoppingBag className="h-4 w-4" />
            Səbətə əlavə et
          </button>
          <button 
            className="bg-transparent text-white border border-white px-5 py-2.5 text-sm font-didot uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-dark transition-colors duration-300 z-10"
            style={{ 
              transform: isHovering ? `translate3d(${position.x * 0.5}px, ${-position.y * 0.5}px, 40px)` : 'translateY(20px)',
              opacity: isHovering ? 1 : 0,
              transition: isHovering ? 'transform 0.4s ease 0.1s, opacity 0.4s ease 0.1s' : 'transform 0.5s ease-out, opacity 0.5s ease-out'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
          >
            <Eye className="h-4 w-4" />
            Ətraflı bax
          </button>
        </div>
      </div>

      {/* Məhsul məlumatları */}
      <div 
        className="p-4 text-center bg-white"
        style={{ 
          transform: isHovering ? `translate3d(${position.x * 0.2}px, ${position.y * 0.2}px, 10px)` : '',
          transition: isHovering ? 'transform 0.2s ease' : 'transform 0.5s ease-out'
        }}
      >
        {/* Brend */}
        <p className="text-sm font-didot text-primary uppercase tracking-wider mb-1">{product.brand}</p>
        
        {/* Məhsul adı */}
        <h3 className="text-sm font-medium text-dark uppercase tracking-wide line-clamp-2 mb-3">
          {product.name}
        </h3>

        {/* Qiymət və Reytinq */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-xs text-gold-700">{product.rating}</span>
          </div>
          <p className="text-base font-didot text-dark">{product.price} ₼</p>
        </div>
      </div>

      {/* Alt hissə - konsentrasiya və həcm */}
      <div className="border-t border-gold-200 py-2 px-4 text-center">
        <p className="text-xs text-gold-700 font-light">
          {product.concentration} • {product.size}
        </p>
      </div>
    </div>
  );
} 