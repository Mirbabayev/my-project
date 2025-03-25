import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface FilterOptions {
  brand: string;
  fragranceType: string;
  priceRange: [number, number];
  inStock: boolean | null;
  group: string;
  note: string;
}

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

export const ProductFilter = ({ products, onFilterChange }: ProductFilterProps) => {
  // Başlanğıc filtr dəyərləri
  const [filters, setFilters] = useState<FilterOptions>({
    brand: '',
    fragranceType: '',
    priceRange: [0, 1000],
    inStock: null,
    group: '',
    note: ''
  });

  // Təkrarlanan dəyərləri aradan qaldırmaq üçün brendləri və növləri toplama
  const brands = Array.from(new Set(products.map(p => p.brand))).sort();
  const fragranceTypes = Array.from(new Set(products.map(p => p.fragranceType))).sort();
  
  // Əlavə olaraq qrupları toplamaq
  const groups = Array.from(new Set(products.map(p => p.group).filter(Boolean))).sort();
  
  // Bütün notları toplamaq
  const allNotes = new Set<string>();
  products.forEach(product => {
    if (product.notes) {
      if (product.notes.top) product.notes.top.forEach(note => allNotes.add(note));
      if (product.notes.middle) product.notes.middle.forEach(note => allNotes.add(note));
      if (product.notes.base) product.notes.base.forEach(note => allNotes.add(note));
    }
  });
  const notes = Array.from(allNotes).sort();
  
  // Minimal və maksimal qiymətləri tapma
  const minPrice = Math.floor(Math.min(...products.map(p => p.price)));
  const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));

  // Filtr dəyişdikdə məhsulların filtrələnməsi
  useEffect(() => {
    let filteredProducts = [...products];
    
    // Brend üzrə filtrləmə
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === filters.brand);
    }
    
    // Ətir növü üzrə filtrləmə
    if (filters.fragranceType) {
      filteredProducts = filteredProducts.filter(p => p.fragranceType === filters.fragranceType);
    }
    
    // Qiymət aralığı üzrə filtrləmə
    filteredProducts = filteredProducts.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    
    // Stok vəziyyətinə görə filtrləmə
    if (filters.inStock !== null) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }
    
    // Qrupa görə filtrləmə
    if (filters.group) {
      filteredProducts = filteredProducts.filter(p => p.group === filters.group);
    }
    
    // Nota görə filtrləmə
    if (filters.note) {
      filteredProducts = filteredProducts.filter(p => {
        if (!p.notes) return false;
        const allProductNotes = [
          ...(p.notes.top || []),
          ...(p.notes.middle || []),
          ...(p.notes.base || [])
        ];
        return allProductNotes.includes(filters.note);
      });
    }
    
    // Filtrləmə nəticələrini yuxarı ötürün
    onFilterChange(filteredProducts);
  }, [filters, products, onFilterChange]);

  // Brend seçimi dəyişdikdə
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, brand: e.target.value }));
  };

  // Ətir növü seçimi dəyişdikdə
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, fragranceType: e.target.value }));
  };

  // Qiymət aralığı dəyişdikdə
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...filters.priceRange] as [number, number];
    newRange[index] = parseInt(e.target.value);
    setFilters(prev => ({ ...prev, priceRange: newRange }));
  };

  // Stok vəziyyəti dəyişdikdə
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === 'all' 
      ? null 
      : e.target.value === 'inStock';
    
    setFilters(prev => ({ ...prev, inStock: value }));
  };
  
  // Qrup dəyişikliyi
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, group: e.target.value }));
  };
  
  // Not dəyişikliyi
  const handleNoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, note: e.target.value }));
  };

  // Filtrləri sıfırlama
  const resetFilters = () => {
    setFilters({
      brand: '',
      fragranceType: '',
      priceRange: [minPrice, maxPrice],
      inStock: null,
      group: '',
      note: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h3 className="text-lg font-bold mb-4">Filtrləmə</h3>
      
      {/* Brend filtrləmə */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brend
        </label>
        <select
          value={filters.brand}
          onChange={handleBrandChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="">Bütün brendlər</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      
      {/* Ətir növü filtrləmə */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ətir növü
        </label>
        <select
          value={filters.fragranceType}
          onChange={handleTypeChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="">Bütün növlər</option>
          {fragranceTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      {/* Ətir qrupu filtrləmə */}
      {groups.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ətir qrupu
          </label>
          <select
            value={filters.group}
            onChange={handleGroupChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Bütün qruplar</option>
            {groups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Ətir notu filtrləmə */}
      {notes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ətir notu
          </label>
          <select
            value={filters.note}
            onChange={handleNoteChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Bütün notlar</option>
            {notes.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Qiymət aralığı filtrləmə */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qiymət aralığı (${filters.priceRange[0]} - ${filters.priceRange[1]})
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Stok vəziyyəti filtrləmə */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stok vəziyyəti
        </label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="stock"
              value="all"
              checked={filters.inStock === null}
              onChange={handleStockChange}
              className="form-radio text-primary focus:ring-primary"
            />
            <span className="ml-2">Hamısı</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="stock"
              value="inStock"
              checked={filters.inStock === true}
              onChange={handleStockChange}
              className="form-radio text-primary focus:ring-primary"
            />
            <span className="ml-2">Stokda</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="stock"
              value="outOfStock"
              checked={filters.inStock === false}
              onChange={handleStockChange}
              className="form-radio text-primary focus:ring-primary"
            />
            <span className="ml-2">Stokda yoxdur</span>
          </label>
        </div>
      </div>
      
      {/* Filtrləri sıfırlama */}
      <button
        onClick={resetFilters}
        className="bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors w-full"
      >
        Filtrləri sıfırla
      </button>
    </div>
  );
}; 