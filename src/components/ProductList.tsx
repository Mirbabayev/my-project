import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  title?: string;
}

export const ProductList = ({ products, title = 'Məhsullar' }: ProductListProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Kateqoriyaları və brendləri topla
  const fragranceTypes = [...new Set(products.map(p => p.fragranceType))];
  const brands = [...new Set(products.map(p => p.brand))];

  // Fragrance type filtrini tətbiq et
  const filterByType = (type: string) => {
    setActiveFilter(type);
    if (type === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.fragranceType === type));
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => filterByType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hamısı
            </button>
            {fragranceTypes.map(type => (
              <button 
                key={type}
                onClick={() => filterByType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === type 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">Heç bir məhsul tapılmadı.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 