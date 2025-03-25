import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { cn } from '../utils/cn';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4 | 5;
  gap?: 'sm' | 'md' | 'lg';
  cardSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
  gap = 'md',
  cardSize = 'md',
  className
}) => {
  const gapSizes = {
    sm: 'gap-3',
    md: 'gap-5',
    lg: 'gap-8'
  };

  const colSizes = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
  };

  return (
    <div className={cn(
      'grid', 
      colSizes[columns], 
      gapSizes[gap],
      className
    )}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          size={cardSize}
        />
      ))}
    </div>
  );
}; 