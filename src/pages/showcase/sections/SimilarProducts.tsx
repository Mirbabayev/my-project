import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  brand: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  category: 'similar' | 'brand' | 'recommended';
  notesMatch?: string[];
}

interface SimilarProductsProps {
  products: Product[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  const [activeTab, setActiveTab] = React.useState<'similar' | 'brand' | 'recommended'>('similar');
  
  const filteredProducts = products.filter(product => product.category === activeTab);
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={12} 
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };
  
  return (
    <section>
      <h2 className="text-2xl font-light mb-8">Bənzər Məhsullar</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('similar')}
            className={`py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'similar' 
                ? 'border-black text-black' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bənzər notlu ətirlər
          </button>
          
          <button
            onClick={() => setActiveTab('brand')}
            className={`py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'brand' 
                ? 'border-black text-black' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Eyni brenddən
          </button>
          
          <button
            onClick={() => setActiveTab('recommended')}
            className={`py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'recommended' 
                ? 'border-black text-black' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tövsiyə edilənlər
          </button>
        </div>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/products/${product.id}`} className="block">
              <div className="bg-gray-50 aspect-square rounded-md overflow-hidden mb-3 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {product.notesMatch && activeTab === 'similar' && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 px-2">
                    <div className="flex items-center justify-between">
                      <span>Oxşar notlar:</span>
                      <span className="font-medium">{product.notesMatch.length}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-0.5">{product.brand}</div>
                <h3 className="font-medium mb-1 group-hover:text-gray-700">{product.name}</h3>
                
                <div className="flex items-center mb-1">
                  {renderStars(product.rating)}
                </div>
                
                <div className="text-sm font-medium">
                  {product.price.toFixed(2)}₼
                </div>
                
                {product.notesMatch && activeTab === 'similar' && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.notesMatch.slice(0, 2).map((note, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {note}
                      </span>
                    ))}
                    {product.notesMatch.length > 2 && (
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        +{product.notesMatch.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* View all link */}
      <div className="mt-8 text-center">
        <Link to="/products" className="inline-flex items-center text-sm text-gray-600 hover:text-black">
          Bütün məhsullara baxın
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}; 