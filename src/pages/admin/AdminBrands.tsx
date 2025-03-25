import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Pencil, Trash2, Plus, Search, X } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  productCount: number;
  status: 'active' | 'inactive';
}

const AdminBrands: React.FC = () => {
  const { t } = useLanguage();
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: 1,
      name: 'Chanel',
      description: 'Lüks Fransız moda evi',
      logoUrl: '/images/brands/chanel.png',
      productCount: 25,
      status: 'active',
    },
    {
      id: 2,
      name: 'Dior',
      description: 'Fransız lüks mallar şirkəti',
      logoUrl: '/images/brands/dior.png',
      productCount: 20,
      status: 'active',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Partial<Brand> | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBrand = () => {
    setCurrentBrand({
      id: brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1,
      name: '',
      description: '',
      logoUrl: '',
      productCount: 0,
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setCurrentBrand({ ...brand });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (brand: Brand) => {
    setBrandToDelete(brand);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBrand = () => {
    if (brandToDelete) {
      setBrands(brands.filter(b => b.id !== brandToDelete.id));
      setIsDeleteModalOpen(false);
      setBrandToDelete(null);
    }
  };

  const handleSaveBrand = () => {
    if (currentBrand) {
      if (!currentBrand.name || !currentBrand.description) {
        alert('Ad və təsvir tələb olunur');
        return;
      }

      const isNewBrand = !brands.some(b => b.id === currentBrand.id);
      
      if (isNewBrand) {
        setBrands([...brands, currentBrand as Brand]);
      } else {
        setBrands(
          brands.map(b => (b.id === currentBrand.id ? currentBrand as Brand : b))
        );
      }
      
      setIsModalOpen(false);
      setCurrentBrand(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentBrand(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t('brands')}</h1>
        <button
          onClick={handleAddBrand}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5 mr-2" />
          Brend əlavə et
        </button>
      </div>

      {/* Axtarış Paneli */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Brend axtar..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Brendlər Cədvəli */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Təsvir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Məhsullar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {brand.logoUrl ? (
                          <img
                            className="h-10 w-10 object-contain"
                            src={brand.logoUrl}
                            alt={brand.name}
                          />
                        ) : (
                          <span className="text-gray-500 text-xs">{brand.name.substring(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{brand.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{brand.productCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full 
                      ${brand.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {brand.status === 'active' ? 'Aktiv' : 'Deaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditBrand(brand)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Redaktə et"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(brand)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brend Əlavə/Redaktə Modalı */}
      {isModalOpen && currentBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {brands.some(b => b.id === currentBrand.id) ? 'Brendi Redaktə Et' : 'Yeni Brend Əlavə Et'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <input
                  type="text"
                  name="name"
                  value={currentBrand.name || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Təsvir</label>
                <textarea
                  name="description"
                  value={currentBrand.description || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  type="text"
                  name="logoUrl"
                  value={currentBrand.logoUrl || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={currentBrand.status || 'active'}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Aktiv</option>
                  <option value="inactive">Deaktiv</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Ləğv et
                </button>
                <button
                  type="button"
                  onClick={handleSaveBrand}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Yadda saxla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Silmə Təsdiq Modalı */}
      {isDeleteModalOpen && brandToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Silməyi təsdiqləyin</h2>
            <p className="text-gray-600 mb-6">
              <span className="font-medium">{brandToDelete.name}</span> brendini silmək istədiyinizə əminsiniz?
              Bu əməliyyat geri qaytarıla bilməz.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={handleDeleteBrand}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrands; 