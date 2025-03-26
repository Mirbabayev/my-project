import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { products as initialProducts } from '../../data/products';
import { 
  Search, 
  Plus, 
  X, 
  Pencil, 
  Trash2, 
  ArrowUpDown,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdminProducts: React.FC = () => {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    brand: '',
    status: '',
    inStock: ''
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // İlkin məlumatları yüklə
  useEffect(() => {
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  // Axtarış və filtirləmə
  useEffect(() => {
    let result = [...products];

    // Axtarış
    if (searchTerm) {
      result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrlər
    if (selectedFilters.category) {
      result = result.filter(product => product.category === selectedFilters.category);
    }
    if (selectedFilters.brand) {
      result = result.filter(product => product.brand === selectedFilters.brand);
    }
    if (selectedFilters.status) {
      switch (selectedFilters.status) {
        case 'new':
          result = result.filter(product => product.isNew);
          break;
        case 'popular':
          result = result.filter(product => product.isPopular);
          break;
        case 'bestseller':
          result = result.filter(product => product.isBestSeller);
          break;
      }
    }
    if (selectedFilters.inStock) {
      result = result.filter(product => 
        selectedFilters.inStock === 'true' ? product.inStock : !product.inStock
      );
    }

    // Sıralama
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredProducts(result);
  }, [searchTerm, products, selectedFilters, sortConfig]);

  // Sıralama funksiyası
  const handleSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  // Məhsul əlavə et
  const handleAddProduct = () => {
    setCurrentProduct({
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: '',
      brand: '',
      price: 0,
      inStock: true,
      isNew: false,
      isPopular: false,
      isBestSeller: false
    });
    setIsModalOpen(true);
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ['ID', 'Ad', 'Brend', 'Qiymət', 'Stok', 'Status'];
    const data = filteredProducts.map(p => [
      p.id,
      p.name,
      p.brand,
      p.price,
      p.inStock ? 'Var' : 'Yoxdur',
      p.isNew ? 'Yeni' : p.isPopular ? 'Populyar' : p.isBestSeller ? 'Bestseller' : '-'
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products.csv';
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Yuxarı Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Axtarış */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          <input
            type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          </div>

          {/* Filtr düyməsi */}
            <button
            onClick={() => setIsFilterModalOpen(true)}
            className="p-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
            <Filter size={20} />
            </button>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={handleAddProduct}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} />
            <span>{t('add')}</span>
          </button>
          
          <button 
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>{t('export')}</span>
        </button>
          
          <label className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Upload size={20} />
            <span>{t('import')}</span>
            <input type="file" accept=".csv" className="hidden" />
          </label>
        </div>
      </div>

      {/* Məhsul cədvəli */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center gap-1"
                  onClick={() => handleSort('name')}
                >
                  {t('product')}
                  <ArrowUpDown size={16} className="text-gray-400" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center gap-1"
                  onClick={() => handleSort('price')}
                >
                  {t('price')}
                  <ArrowUpDown size={16} className="text-gray-400" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center gap-1"
                  onClick={() => handleSort('category')}
                >
                  {t('category')}
                  <ArrowUpDown size={16} className="text-gray-400" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center gap-1"
                  onClick={() => handleSort('inStock')}
                >
                  {t('stock')}
                  <ArrowUpDown size={16} className="text-gray-400" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  {product.discount && (
                    <div className="text-xs text-green-600">
                      {product.discount}% {t('discount')}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                  {product.subCategory && (
                    <div className="text-xs text-gray-500">{product.subCategory}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {product.isNew && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {t('new')}
                      </span>
                    )}
                    {product.isPopular && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {t('popular')}
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {t('bestseller')}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? t('inStock') : t('outOfStock')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3">
                  <button 
                    onClick={() => {
                      setCurrentProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Redaktə et"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      setProductToDelete(product);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t('filters')}</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('category')}
                </label>
                <select
                  value={selectedFilters.category}
                  onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">{t('all')}</option>
                  <option value="men">{t('men')}</option>
                  <option value="women">{t('women')}</option>
                  <option value="unisex">{t('unisex')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('status')}
                </label>
                <select
                  value={selectedFilters.status}
                  onChange={(e) => setSelectedFilters({...selectedFilters, status: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">{t('all')}</option>
                  <option value="new">{t('new')}</option>
                  <option value="popular">{t('popular')}</option>
                  <option value="bestseller">{t('bestseller')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('stock')}
                </label>
                <select
                  value={selectedFilters.inStock}
                  onChange={(e) => setSelectedFilters({...selectedFilters, inStock: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">{t('all')}</option>
                  <option value="true">{t('inStock')}</option>
                  <option value="false">{t('outOfStock')}</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedFilters({
                    category: '',
                    brand: '',
                    status: '',
                    inStock: ''
                  });
                }}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t('reset')}
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {t('apply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && currentProduct && (
        // Məhsullar modal kodları
        <div>
          {/* Modal kodu buraya əlavə olunacaq */}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && productToDelete && (
        // Təsdiqləmə modal kodları
        <div>
          {/* Təsdiqləmə modal kodu buraya əlavə olunacaq */}
        </div>
      )}
    </div>
  );
}; 