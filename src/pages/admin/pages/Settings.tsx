import React, { useState, useEffect } from 'react';
import { Save, Bell, Lock, Globe, Shield, Database, Tag, Upload } from 'lucide-react';

const SETTINGS_STORAGE_KEY = 'adminSettings';

// Rol tipləri (daha aydın olması üçün)
type Role = 'admin' | 'seller' | 'user';

// İcazə strukturu
interface PermissionAccess {
  admin: boolean;
  seller: boolean;
  user: boolean;
}

// İcazələrin açarları (daha aydın olması üçün)
type PermissionKey = 
  | 'productsView' 
  | 'productsManage' // Əlavə/Redaktə/Silmə
  | 'ordersView' 
  | 'ordersManage'
  | 'usersView'
  | 'usersManage'
  | 'settingsManage';

// Parametrlər üçün ümumi tip (genişləndirilə bilər)
interface AppSettings {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    currency: string;
    orderPrefix: string;
    logo: string; // Fayl adı və ya URL
  };
  products: {
    allowReviews: boolean;
    defaultSort: string;
  };
  notifications: {
    notifyNewOrder: boolean;
    notifyOrderStatus: boolean;
    notifyLowStock: boolean;
  };
  security: {
    twoFactorAuth: boolean;
  };
  permissions: Record<PermissionKey, PermissionAccess>; // permissions əlavə edildi
}

const defaultSettings: AppSettings = {
  general: {
    siteName: 'Easy Parfum',
    siteDescription: 'Premium parfümeriya dükanı',
    contactEmail: 'info@easyparfum.az',
    contactPhone: '+994 50 123 45 67',
    currency: 'AZN',
    orderPrefix: 'EP',
    logo: ''
  },
  products: {
    allowReviews: true,
    defaultSort: 'Populyarlığa görə'
  },
  notifications: {
    notifyNewOrder: true,
    notifyOrderStatus: true,
    notifyLowStock: false
  },
  security: {
    twoFactorAuth: false
  },
  permissions: { // Default icazələr
    productsView: { admin: true, seller: true, user: true },
    productsManage: { admin: true, seller: true, user: false },
    ordersView: { admin: true, seller: true, user: true }, // İstifadəçi yalnız özününkünü görür (backend tərəfdə idarə olunmalıdır)
    ordersManage: { admin: true, seller: false, user: false },
    usersView: { admin: true, seller: false, user: false },
    usersManage: { admin: true, seller: false, user: false },
    settingsManage: { admin: true, seller: false, user: false },
  }
};

// İcazə adlarının Azərbaycan dilində qarşılığı
const permissionLabels: Record<PermissionKey, string> = {
  productsView: 'Məhsullar (Baxış)',
  productsManage: 'Məhsullar (İdarəetmə)',
  ordersView: 'Sifarişlər (Baxış)',
  ordersManage: 'Sifarişlər (İdarəetmə)',
  usersView: 'İstifadəçilər (Baxış)',
  usersManage: 'İstifadəçilər (İdarəetmə)',
  settingsManage: 'Parametrlər (İdarəetmə)',
};

const Settings = () => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedLogoName, setSelectedLogoName] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // localStorage-dan parametrləri yüklə
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings) as AppSettings;
        // Default dəyərlərlə birləşdirərək natamam saxlanmış datanı idarə et
        setSettings(prev => ({ ...prev, ...parsedSettings })); 
      } catch (error) {
        console.error("Saxlanmış parametrləri oxumaq mümkün olmadı:", error);
        localStorage.removeItem(SETTINGS_STORAGE_KEY); // Xətalı datanı sil
      }
    }
  }, []);

  // Dəyişiklikləri idarə etmək üçün ümumi funksiya
  const handleSettingChange = (tab: keyof Omit<AppSettings, 'permissions'>, name: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [name]: value
      }
    }));
    setSaveStatus('idle'); // Dəyişiklik olduqda statusu sıfırla
  };

  // Checkboxlar üçün xüsusi handler
  const handleCheckboxChange = (tab: keyof Omit<AppSettings, 'permissions'>, name: string, checked: boolean) => {
    handleSettingChange(tab, name, checked);
  };

  // İcazə checkboxları üçün yeni handler
  const handlePermissionChange = (permission: PermissionKey, role: Role, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: {
          ...prev.permissions[permission],
          [role]: checked
        }
      }
    }));
    setSaveStatus('idle');
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedLogoName(file.name);
      // Real tətbiqdə faylı yükləyib URL-i settings.general.logo-ya yazmaq lazımdır
      // Hələlik yalnız adı göstəririk və state-də logo adını saxlamırıq (əvvəlki kimi)
      setSaveStatus('idle');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      console.log("Yadda saxlanılan tənzimləmələr:", settings);
      if (selectedLogoName) {
         console.log("Seçilmiş logo faylı (yükləmə tətbiq edilməyib):", selectedLogoName);
         // Logo yükləmə məntiqi
      }
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000); // 2 saniyə sonra statusu sıfırla
    } catch (error) {
      console.error("Parametrləri yadda saxlayarkən xəta:", error);
      setSaveStatus('error');
    }
  };

  // Məlumat bazası düymələri üçün handlerlar
  const handleBackup = () => alert('Ehtiyat nüsxə çıxarma prosesi başladı... (Simulyasiya)');
  const handleRestore = () => alert('Nüsxədən bərpa prosesi başladı... (Simulyasiya)');

  // Yadda saxlama düyməsinin mətni və statusu
  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving': return <>Yadda saxlanılır...</>;
      case 'saved': return <>Yadda saxlanıldı!</>;
      case 'error': return <>Xəta baş verdi</>;
      default: return <><Save size={16} /> Tənzimləmələri yadda saxla</>;
    }
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
                    value={settings.general.siteName}
                    onChange={(e) => handleSettingChange('general', e.target.name, e.target.value)}
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
                    value={settings.general.siteDescription}
                    onChange={(e) => handleSettingChange('general', e.target.name, e.target.value)}
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
                    value={settings.general.contactEmail}
                    onChange={(e) => handleSettingChange('general', e.target.name, e.target.value)}
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
                    value={settings.general.contactPhone}
                    onChange={(e) => handleSettingChange('general', e.target.name, e.target.value)}
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
                    value={settings.general.currency}
                    onChange={(e) => handleSettingChange('general', e.target.name, e.target.value)}
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
                    value={settings.general.orderPrefix}
                    onChange={(e) => handleSettingChange('general', e.target.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700 mb-1">
                    Sayt Loqosu
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary inline-flex items-center">
                      <Upload size={16} className="mr-2" />
                      <span>Logo seçin</span>
                      <input id="logoUpload" name="logoUpload" type="file" className="sr-only" onChange={handleLogoChange} accept="image/*" />
                    </label>
                    {selectedLogoName && (
                      <span className="ml-3 text-sm text-gray-500">{selectedLogoName}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={saveStatus === 'saving'}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {getSaveButtonContent()}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'products' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Məhsul Tənzimləmələri</h3>
              <div className="space-y-4 bg-gray-50 p-4 rounded-md border">
                <div>
                  <label htmlFor="allowReviews" className="flex items-center">
                    <input id="allowReviews" name="allowReviews" type="checkbox" checked={settings.products.allowReviews} onChange={(e) => handleCheckboxChange('products', e.target.name, e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary mr-2" />
                    <span className="text-sm text-gray-700">Məhsul rəylərinə icazə ver</span>
                  </label>
                </div>
                <div>
                   <label htmlFor="defaultSort" className="block text-sm font-medium text-gray-700 mb-1">Standart çeşidləmə</label>
                   <select id="defaultSort" name="defaultSort" value={settings.products.defaultSort} onChange={(e) => handleSettingChange('products', e.target.name, e.target.value)} className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                     <option>Populyarlığa görə</option>
                     <option>Ən yeniyə görə</option>
                     <option>Qiymətə görə (artan)</option>
                     <option>Qiymətə görə (azalan)</option>
                   </select>
                </div>
              </div>
              <button type="submit" disabled={saveStatus === 'saving'} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
                {getSaveButtonContent()}
              </button>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Bildiriş Tənzimləmələri</h3>
              <div className="space-y-4 bg-gray-50 p-4 rounded-md border">
                <p className="text-sm text-gray-600 mb-2">Hansı hallarda e-poçt bildirişləri göndərilsin:</p>
                <div>
                  <label htmlFor="notifyNewOrder" className="flex items-center">
                    <input id="notifyNewOrder" name="notifyNewOrder" type="checkbox" checked={settings.notifications.notifyNewOrder} onChange={(e) => handleCheckboxChange('notifications', e.target.name, e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary mr-2" />
                    <span className="text-sm text-gray-700">Yeni sifariş daxil olduqda (Admin)</span>
                  </label>
                </div>
                 <div>
                  <label htmlFor="notifyOrderStatus" className="flex items-center">
                    <input id="notifyOrderStatus" name="notifyOrderStatus" type="checkbox" checked={settings.notifications.notifyOrderStatus} onChange={(e) => handleCheckboxChange('notifications', e.target.name, e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary mr-2" />
                    <span className="text-sm text-gray-700">Sifariş statusu dəyişdikdə (Müştəri)</span>
                  </label>
                </div>
                <div>
                  <label htmlFor="notifyLowStock" className="flex items-center">
                    <input id="notifyLowStock" name="notifyLowStock" type="checkbox" checked={settings.notifications.notifyLowStock} onChange={(e) => handleCheckboxChange('notifications', e.target.name, e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary mr-2" />
                    <span className="text-sm text-gray-700">Məhsulun stoku azaldıqda (Admin)</span>
                  </label>
                </div>
              </div>
              <button type="submit" disabled={saveStatus === 'saving'} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
                {getSaveButtonContent()}
              </button>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Təhlükəsizlik Tənzimləmələri</h3>
              <div className="space-y-4 bg-gray-50 p-4 rounded-md border">
                <div>
                   <label htmlFor="twoFactorAuth" className="flex items-center">
                    <input id="twoFactorAuth" name="twoFactorAuth" type="checkbox" checked={settings.security.twoFactorAuth} onChange={(e) => handleCheckboxChange('security', e.target.name, e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary mr-2" />
                    <span className="text-sm text-gray-700">İki faktorlu autentifikasiyanı aktivləşdir (Adminlər üçün)</span>
                  </label>
                </div>
                 <div>
                   <label htmlFor="passwordPolicy" className="block text-sm font-medium text-gray-700 mb-1">Şifrə Tələbləri</label>
                   <p className="text-sm text-gray-600">Minimum 8 simvol, böyük/kiçik hərf və rəqəm (tətbiq edilməyib).</p>
                </div>
              </div>
              <button type="submit" disabled={saveStatus === 'saving'} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
                {getSaveButtonContent()}
              </button>
            </form>
          )}

          {activeTab === 'permissions' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">İcazə Tənzimləmələri (Rollara görə)</h3>
              <div className="overflow-x-auto bg-gray-50 p-4 rounded-md border">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Bölmə / İcazə</th>
                      <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase">Admin</th>
                      <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase">Satıcı</th>
                      <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase">İstifadəçi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Object.keys(settings.permissions) as PermissionKey[]).map((permissionKey) => (
                      <tr key={permissionKey} className="border-b last:border-b-0 hover:bg-gray-100">
                        <td className="py-2 px-4 text-sm text-gray-700 font-medium">{permissionLabels[permissionKey]}</td>
                        {(Object.keys(settings.permissions[permissionKey]) as Role[]).map((role) => (
                          <td key={role} className="py-2 px-4 text-center">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                              checked={settings.permissions[permissionKey][role]}
                              onChange={(e) => handlePermissionChange(permissionKey, role, e.target.checked)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
               <button 
                 type="submit" 
                 disabled={saveStatus === 'saving'}
                 className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
               >
                  {getSaveButtonContent()}
               </button>
            </form>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Məlumat Bazası</h3>
              <div className="space-y-4 bg-gray-50 p-4 rounded-md border">
                 <p className="text-sm text-gray-600">Məlumat bazasının ehtiyat nüsxəsini çıxarmaq və ya bərpa etmək üçün seçimlər.</p>
                 <div className="flex gap-4">
                   <button onClick={handleBackup} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">Ehtiyat Nüsxə Çıxar</button>
                   <button onClick={handleRestore} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm">Nüsxədən Bərpa Et</button>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 