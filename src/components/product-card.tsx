import { useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product-details/${product.id}`);
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
      className="group relative bg-white border border-gold-200 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer w-full min-w-[180px] max-w-[100%] mx-auto flex flex-col rounded-sm transform hover:-translate-y-1 hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      {/* Şəkil konteyner */}
      <div className="relative aspect-[1/1.1] overflow-hidden bg-gray-50 flex-grow-0">
        {/* Favori düyməsi */}
        <button 
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10 rounded-full shadow-md hover:shadow-lg"
          aria-label="Seçilmişlərə əlavə et"
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-5 w-5 transition-colors", 
            isFavorite ? "text-primary fill-primary" : "text-gold-700"
          )} />
        </button>

        {/* Endirim etiketləri */}
        {product.discount && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-white text-xs font-medium py-1.5 px-2.5 rounded-sm animate-pulse">
            -{product.discount}%
          </div>
        )}

        {/* Şəkil */}
        <div className="relative h-full w-full flex items-center justify-center p-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
            style={{ 
              maxHeight: '220px',
              maxWidth: '100%',
              margin: '0 auto'
            }}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://dummyimage.com/220x220/f0f0f0/333333.png&text=Şəkil+yoxdur";
              target.onerror = null;
            }}
          />
        </div>

        {/* Overlay ilə düymələr */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <button 
            className="bg-white text-dark px-4 py-2 text-sm font-didot uppercase tracking-wider flex items-center gap-2 hover:bg-primary hover:text-white transition-colors duration-300 z-10 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm shadow-md"
            onClick={addToCart}
          >
            <ShoppingBag className="h-4 w-4" />
            Səbətə əlavə et
          </button>
          <button 
            className="bg-transparent text-white border border-white px-4 py-2 text-sm font-didot uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-dark transition-colors duration-300 z-10 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 rounded-sm shadow-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/product-details/${product.id}`);
            }}
          >
            <Eye className="h-4 w-4" />
            Ətraflı bax
          </button>
        </div>
      </div>

      {/* Məhsul məlumatları */}
      <div className="p-3 px-4 text-center bg-white">
        {/* Brend */}
        <p className="text-sm font-didot text-primary uppercase tracking-wider mb-1">{product.brand}</p>
        
        {/* Məhsul adı */}
        <h3 className="text-sm font-medium text-dark uppercase tracking-wide line-clamp-2 mb-1.5 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Qiymət və Reytinq */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm text-gold-700">{product.rating}</span>
          </div>
          <p className="text-base font-didot text-dark group-hover:text-primary transition-colors font-medium">
            {product.price} ₼
            {product.oldPrice && (
              <span className="text-xs ml-1.5 text-gold-500 line-through">{product.oldPrice} ₼</span>
            )}
          </p>
        </div>
      </div>

      {/* Alt hissə - konsentrasiya və həcm */}
      <div className="border-t border-gold-200 py-2 px-4 text-center bg-white/80 group-hover:border-primary/20 transition-colors">
        <p className="text-sm text-gold-700 font-light">
          {product.concentration} • {product.size}
        </p>
      </div>
    </div>
  );
} 