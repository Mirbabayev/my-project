import React, { useState } from 'react';
import { Save, Bell, Lock, Globe, Shield, Database, Tag } from 'lucide-react';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Easy Parfum',
    siteDescription: 'Premium parfümeriya dükanı',
    contactEmail: 'info@easyparfum.az',
    contactPhone: '+994 50 123 45 67',
    currency: 'AZN',
    orderPrefix: 'EP'
  });
  
  const [activeTab, setActiveTab] = useState('general');

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada tənzimləmələrin saxlanması həyata keçirilir
    alert('Tənzimləmələr uğurla yadda saxlanıldı!');
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sistem Tənzimləmələri</h2>
        <p className="text-gray-600 mt-1">Saytın əsas tənzimləmələrini idarə edin</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-gray-50 rounded-md p-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'general'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Globe size={16} className="mr-2" />
                  Ümumi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'products'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag size={16} className="mr-2" />
                  Məhsullar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'notifications'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Bell size={16} className="mr-2" />
                  Bildirişlər
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'security'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Lock size={16} className="mr-2" />
                  Təhlükəsizlik
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('permissions')}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'permissions'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Shield size={16} className="mr-2" />
                  İcazələr
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('database')}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'database'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Database size={16} className="mr-2" />
                  Məlumat bazası
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Settings content */}
        <div className="md:w-3/4">
          {activeTab === 'general' && (
            <form onSubmit={handleSaveSettings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                    Sayt adı
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Sayt təsviri
                  </label>
                  <input
                    type="text"
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Əlaqə e-poçtu
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Əlaqə nömrəsi
                  </label>
                  <input
                    type="text"
                    id="contactPhone"
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                    Valyuta
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={generalSettings.currency}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="AZN">AZN (₼)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="orderPrefix" className="block text-sm font-medium text-gray-700 mb-1">
                    Sifariş prefiksi
                  </label>
                  <input
                    type="text"
                    id="orderPrefix"
                    name="orderPrefix"
                    value={generalSettings.orderPrefix}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  Tənzimləmələri yadda saxla
                </button>
              </div>
            </form>
          )}

          {activeTab === 'products' && (
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Məhsul Tənzimləmələri</h3>
              <p className="text-gray-600">Bu bölmə hazırlanır...</p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Bildiriş Tənzimləmələri</h3>
              <p className="text-gray-600">Bu bölmə hazırlanır...</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Təhlükəsizlik Tənzimləmələri</h3>
              <p className="text-gray-600">Bu bölmə hazırlanır...</p>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">İcazə Tənzimləmələri</h3>
              <p className="text-gray-600">Bu bölmə hazırlanır...</p>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Məlumat Bazası Tənzimləmələri</h3>
              <p className="text-gray-600">Bu bölmə hazırlanır...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 