import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Coco Mademoiselle',
      brand: 'Chanel',
      category: 'Parfum',
      price: 350.00,
      stock: 15,
      orders: 28
    },
    {
      id: '2',
      name: 'Sauvage',
      brand: 'Dior',
      category: 'Parfum',
      price: 320.00,
      stock: 10,
      orders: 42
    },
    {
      id: '3',
      name: 'Black Opium',
      brand: 'Yves Saint Laurent',
      category: 'Parfum',
      price: 290.00,
      stock: 8,
      orders: 36
    },
    {
      id: '4',
      name: 'La Vie Est Belle',
      brand: 'Lancôme',
      category: 'Parfum',
      price: 280.00,
      stock: 12,
      orders: 22
    },
    {
      id: '5',
      name: 'Acqua di Giò',
      brand: 'Armani',
      category: 'Parfum',
      price: 260.00,
      stock: 18,
      orders: 34
    }
  ];

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Məhsullar</h2>
        <div className="flex gap-2">
          <button className="px-3 py-2 flex items-center text-sm gap-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
            <Filter size={16} />
            Filtrlə
          </button>
          <Link
            to="/admin/products/new"
            className="px-3 py-2 flex items-center text-sm gap-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            Yeni Məhsul
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Məhsul
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kateqoriya
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qiymət
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stok
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sifarişlər
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.brand}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {product.price.toFixed(2)} ₼
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {product.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-900">Düzəliş et</button>
                    <button className="text-red-600 hover:text-red-900">Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          5 məhsuldan 1-5 arası göstərilir
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md text-sm text-gray-600 bg-white disabled:opacity-50">
            Əvvəlki
          </button>
          <button className="px-3 py-1 border rounded-md text-sm text-gray-600 bg-white disabled:opacity-50">
            Sonrakı
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products; 