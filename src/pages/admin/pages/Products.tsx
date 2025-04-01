import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, AlertCircle, CheckCircle, Edit, Trash } from 'lucide-react';
import { products as allProducts } from '../../../data/products';

const Products = () => {
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  // Filtrələnmiş məhsullar
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Axtarış sözünə görə filtrələ
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Kateqoriyaya görə filtrələ
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Brendə görə filtrələ
    if (selectedBrand !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.brand === selectedBrand
      );
    }
    
    setProducts(filteredProducts);
    setPage(1); // Hər dəfə filtr dəyişdikdə ilk səhifəyə qayıt
  }, [searchTerm, selectedCategory, selectedBrand]);

  // Unique kateqoriyalar və brendləri əldə et
  const categories = ['all', ...new Set(allProducts.map(product => product.category))];
  const brands = ['all', ...new Set(allProducts.map(product => product.brand))];

  // Cari səhifədəki məhsullar
  const currentProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // Səhifələmə üçün ümumi səhifə sayı
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1"></div>
        
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Məhsul axtar..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="px-3 py-2 border rounded-lg text-gray-700 w-full md:w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Bütün kateqoriyalar' : category}
              </option>
            ))}
          </select>
          
          <select 
            className="px-3 py-2 border rounded-lg text-gray-700 w-full md:w-auto"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'Bütün brendlər' : brand}
              </option>
            ))}
          </select>
          
          <Link 
            to="/admin/products/new"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center w-full md:w-auto"
          >
            <Plus size={18} className="mr-2" />
            Yeni məhsul
          </Link>
        </div>
      </div>
      
      {/* Məhsullar cədvəli */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Məhsul</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brend</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kateqoriya</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymət</th>
              <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">#{product.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  <div className="flex items-center">
                    <img 
                      src={product.image || "https://via.placeholder.com/40"} 
                      alt={product.name} 
                      className="h-10 w-10 rounded-md object-cover mr-3"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{product.brand}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{product.category}</td>
                <td className="py-3 px-4 text-sm text-gray-900 text-right">{product.price} ₼</td>
                <td className="py-3 px-4 text-sm text-center">
                  {product.inStock ? (
                    <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" /> Stokda
                    </span>
                  ) : (
                    <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      <AlertCircle size={12} className="mr-1" /> Bitib
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            {products.length} məhsuldan {(page - 1) * productsPerPage + 1}-{Math.min(page * productsPerPage, products.length)} arası göstərilir
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 border rounded-md text-sm ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Əvvəlki
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // İlk 5 səhifəni göstər və ya son 5 səhifəni göstər
              let pageNumber;
              if (page <= 3) {
                pageNumber = i + 1;
              } else if (page >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = page - 2 + i;
              }
              
              // Əgər səhifə nömrəsi 1-dən kiçik və ya totalPages-dən böyükdürsə, göstərmə
              if (pageNumber < 1 || pageNumber > totalPages) return null;
              
              return (
                <button 
                  key={pageNumber}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${pageNumber === page ? 'bg-primary text-white' : 'border text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button 
              className={`px-3 py-1 border rounded-md text-sm ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Sonrakı
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 