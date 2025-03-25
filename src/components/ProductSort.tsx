import React from 'react';

export type SortOption = 'newest' | 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' | 'rating';

interface ProductSortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const ProductSort = ({ sortOption, onSortChange }: ProductSortProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };

  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Sırala:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
      >
        <option value="newest">Ən yenilər</option>
        <option value="priceAsc">Qiymət: Aşağıdan yuxarıya</option>
        <option value="priceDesc">Qiymət: Yuxarıdan aşağıya</option>
        <option value="nameAsc">Ad: A-Z</option>
        <option value="nameDesc">Ad: Z-A</option>
        <option value="rating">Reytinq</option>
      </select>
    </div>
  );
}; 