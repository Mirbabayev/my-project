import { useState } from 'react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';
import { Star, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function NewProducts() {
  const [activeGender, setActiveGender] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Məhsulları ID-yə görə çeşidlə (ən yeni məhsullar)
  const sortedProducts = [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
  // Cinsə görə filtrələ
  const filteredProducts = activeGender === 'all'
    ? sortedProducts
    : sortedProducts.filter(product => product.gender === activeGender);
    
  // Son əlavə edilmiş top 16 məhsul
  const newProducts = filteredProducts.slice(0, 16);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-didot mb-4">Yeni Gələnlər</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kolleksiyamıza ən son əlavə edilmiş ətirlər. Daim yenilənən və həmişə trend olan ətirlər ilə fərqlənin.
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
          <div className="flex justify-center mb-6">
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
        )}
      </div>
      
      {/* Məhsullar */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 mx-auto">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Məhsul sayı göstəricisi */}
      <div className="text-center mt-8 text-gray-600">
        <p>
          Göstərilən: {newProducts.length} məhsul {filteredProducts.length > newProducts.length && `(cəmi ${filteredProducts.length} məhsul)`}
        </p>
      </div>
      
      {/* Səhifələmə (əgər lazım olarsa gələcəkdə) */}
      {/* <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:border-primary hover:text-primary">1</button>
          <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded">2</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:border-primary hover:text-primary">3</button>
        </div>
      </div> */}
    </div>
  );
} 