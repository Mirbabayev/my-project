import { useState } from 'react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';
import { Star, Filter, ChevronDown, ChevronUp, Award, TrendingUp } from 'lucide-react';

export default function Bestsellers() {
  const [activeGender, setActiveGender] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating'>('popularity');
  
  // Məhsulları populyarlıq və reytinqə görə çeşidlə
  const sortedProducts = [...products]
    .sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularity - a.popularity;
      } else {
        return b.rating - a.rating;
      }
    });
    
  // Cinsə görə filtrələ
  const filteredProducts = activeGender === 'all'
    ? sortedProducts
    : sortedProducts.filter(product => product.gender === activeGender);
    
  // Top 16 məhsul
  const topProducts = filteredProducts.slice(0, 16);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-didot mb-4">Bestsellerlər</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kolleksiyamızın ən populyar və ən çox satılan ətirləri. Müştərilərimizin seçimi olan ətirlər ilə tanış olun.
        </p>
      </div>
      
      {/* Filtrlər */}
      <div className="mb-8">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 mx-auto mb-4 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filtrləri göstər
          {showFilters ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {showFilters && (
          <div className="mb-6 space-y-4">
            {/* Cins filtrləri */}
            <div className="flex justify-center">
              <div className="inline-flex flex-wrap sm:flex-nowrap justify-center border-b border-gold-200 p-1">
                <button
                  className={`px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider ${
                    activeGender === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                  }`}
                  onClick={() => setActiveGender('all')}
                >
                  Hamısı
                </button>
                <button
                  className={`px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider ${
                    activeGender === 'qadın' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                  }`}
                  onClick={() => setActiveGender('qadın')}
                >
                  Qadın
                </button>
                <button
                  className={`px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider ${
                    activeGender === 'kişi' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                  }`}
                  onClick={() => setActiveGender('kişi')}
                >
                  Kişi
                </button>
                <button
                  className={`px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider ${
                    activeGender === 'uniseks' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                  }`}
                  onClick={() => setActiveGender('uniseks')}
                >
                  Uniseks
                </button>
              </div>
            </div>
            
            {/* Sıralama tipləri */}
            <div className="flex justify-center gap-3">
              <button 
                className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                  sortBy === 'popularity' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSortBy('popularity')}
              >
                <TrendingUp className="w-4 h-4" />
                Ən populyar
              </button>
              <button 
                className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                  sortBy === 'rating' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSortBy('rating')}
              >
                <Star className="w-4 h-4" />
                Ən yüksək reytinq
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Məhsullar */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 mx-auto">
        {topProducts.map((product, index) => (
          <div key={product.id} className="relative">
            {/* Top 3 üçün badge */}
            {index < 3 && (
              <div className="absolute -top-2 -left-2 z-10 w-12 h-12 bg-primary text-white rounded-full flex flex-col items-center justify-center shadow-md">
                <Award className="w-5 h-5" />
                <span className="text-[10px] font-bold">TOP {index + 1}</span>
              </div>
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Məhsul sayı göstəricisi */}
      <div className="text-center mt-8 text-gray-600">
        <p>
          Göstərilən: {topProducts.length} məhsul {filteredProducts.length > topProducts.length && `(cəmi ${filteredProducts.length} məhsul)`}
        </p>
      </div>
    </div>
  );
} 