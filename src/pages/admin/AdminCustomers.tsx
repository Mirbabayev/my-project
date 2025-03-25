import React, { useState, useEffect } from 'react';
import { 
  Search, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  Mail 
} from 'lucide-react';
import { toast } from 'react-toastify';

// Müştəri interfeysi
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  lastOrder?: string;
  totalOrders: number;
  totalSpent: number;
  status: 'Aktiv' | 'Deaktiv' | 'Bloklanmış';
  address?: string;
}

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Müştəri statuslarını filtrləmək üçün seçimlər
  const statusOptions = [
    { value: 'all', label: 'Bütün statuslar' },
    { value: 'Aktiv', label: 'Aktiv' },
    { value: 'Deaktiv', label: 'Deaktiv' },
    { value: 'Bloklanmış', label: 'Bloklanmış' },
  ];

  // Nümunə müştəri məlumatları
  useEffect(() => {
    // Burada normalde API-dən məlumatlar yüklənəcək
    const mockCustomers: Customer[] = [
      {
        id: 1,
        name: 'Əli Məmmədov',
        email: 'ali.mammadov@gmail.com',
        phone: '(+994) 50 123 45 67',
        registrationDate: '2023-01-15',
        lastOrder: '2023-06-20',
        totalOrders: 8,
        totalSpent: 450,
        status: 'Aktiv',
        address: 'Bakı şəh., Nərimanov r., Atatürk pr. 19'
      },
      {
        id: 2,
        name: 'Səbinə Əliyeva',
        email: 'sabina.aliyeva@mail.ru',
        phone: '(+994) 55 987 65 43',
        registrationDate: '2023-02-23',
        lastOrder: '2023-07-05',
        totalOrders: 5,
        totalSpent: 280,
        status: 'Aktiv',
        address: 'Bakı şəh., Yasamal r., Şərifzadə küç. 42'
      },
      {
        id: 3,
        name: 'Rəşad Hüseynov',
        email: 'rashad.huseynov@inbox.az',
        phone: '(+994) 70 654 32 10',
        registrationDate: '2022-11-10',
        lastOrder: '2023-05-18',
        totalOrders: 12,
        totalSpent: 870,
        status: 'Aktiv',
        address: 'Sumqayıt şəh., 12-ci mikr.'
      },
      {
        id: 4,
        name: 'Aygün Kazımova',
        email: 'aygun.kazimova@yahoo.com',
        phone: '(+994) 77 345 67 89',
        registrationDate: '2023-03-08',
        lastOrder: '2023-04-12',
        totalOrders: 3,
        totalSpent: 150,
        status: 'Deaktiv',
        address: 'Gəncə şəh., Nizami r., Gülüstan küç. 8'
      },
      {
        id: 5,
        name: 'Elşən Nəsirov',
        email: 'elshen.nasirov@outlook.com',
        phone: '(+994) 51 234 56 78',
        registrationDate: '2022-09-30',
        totalOrders: 0,
        totalSpent: 0,
        status: 'Bloklanmış',
        address: 'Bakı şəh., Xətai r., Babək pr. 72'
      }
    ];

    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  // Axtarış və filtr funksiyaları
  useEffect(() => {
    let results = customers;

    // Status filtrləməsi
    if (statusFilter !== 'all') {
      results = results.filter(customer => customer.status === statusFilter);
    }

    // Axtarış termini ilə filtrləmə
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      results = results.filter(
        customer =>
          customer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          customer.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          customer.phone.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredCustomers(results);
  }, [searchTerm, customers, statusFilter]);

  // Müştəri əlavə etmə funksiyası (Mock)
  const addCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const customerToAdd = {
      ...newCustomer,
      id: customers.length + 1,
      registrationDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0
    };
    
    setCustomers([...customers, customerToAdd as Customer]);
    // Mock toast notification
    console.log("Müştəri uğurla əlavə edildi!");
  };

  // Müştəri redaktə etmə funksiyası (Mock)
  const editCustomer = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    
    setCustomers(updatedCustomers);
    setIsEditModalOpen(false);
    // Mock toast notification
    console.log("Müştəri məlumatları yeniləndi!");
  };

  // Müştəri silmə funksiyası (Mock)
  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    setFilteredCustomers(filteredCustomers.filter(customer => customer.id !== id));
    setIsDeleteModalOpen(false);
    // Mock toast notification
    console.log("Müştəri silindi!");
  };

  // Müştəriyə email göndərmə funksiyası (Mock)
  const sendEmail = () => {
    if (!emailSubject || !emailBody) {
      console.error("Mövzu və mətn daxil edilməlidir");
      return;
    }
    
    console.log(`Email ${selectedCustomer?.email} ünvanına göndərildi!`);
    setIsEmailModalOpen(false);
    setEmailSubject('');
    setEmailBody('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Müştərilər</h1>
      
      {/* Axtarış və Əlavə etmə */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center w-full md:w-1/2 relative">
          <input
            type="text"
            placeholder="Müştəri axtar..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            onClick={() => {
              setSelectedCustomer(null);
              setIsEditModalOpen(true);
            }}
          >
            <PlusCircle size={18} /> Müştəri əlavə et
          </button>
        </div>
      </div>
      
      {/* Müştəri cədvəli */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müştəri</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Əlaqə</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qeydiyyat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son sifariş</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sifarişlər</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xərclənən</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Müştəri tapılmadı
                </td>
              </tr>
            ) : (
              filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{customer.email}</div>
                    <div className="text-gray-500 text-sm">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.registrationDate).toLocaleDateString('az-AZ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastOrder 
                      ? new Date(customer.lastOrder).toLocaleDateString('az-AZ')
                      : 'Sifariş yoxdur'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.totalSpent.toFixed(2)} ₼
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${customer.status === 'Aktiv' 
                        ? 'bg-green-100 text-green-800' 
                        : customer.status === 'Deaktiv'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsViewModalOpen(true);
                        }}
                        title="Göstər"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsEmailModalOpen(true);
                        }}
                        title="Email göndər"
                      >
                        <Mail size={18} />
                      </button>
                      <button
                        className="text-yellow-600 hover:text-yellow-900"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsEditModalOpen(true);
                        }}
                        title="Redaktə et"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsDeleteModalOpen(true);
                        }}
                        title="Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Müştəri Baxış Modalı */}
      {isViewModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Müştəri məlumatları</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ad Soyad</h3>
                  <p className="mt-1">{selectedCustomer.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">E-poçt</h3>
                  <p className="mt-1">{selectedCustomer.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                  <p className="mt-1">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Qeydiyyat tarixi</h3>
                  <p className="mt-1">{new Date(selectedCustomer.registrationDate).toLocaleDateString('az-AZ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${selectedCustomer.status === 'Aktiv' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedCustomer.status === 'Deaktiv'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'}`}>
                      {selectedCustomer.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Son sifariş tarixi</h3>
                  <p className="mt-1">
                    {selectedCustomer.lastOrder 
                      ? new Date(selectedCustomer.lastOrder).toLocaleDateString('az-AZ')
                      : 'Sifariş yoxdur'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ümumi sifarişlər</h3>
                  <p className="mt-1">{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ümumi xərclənən</h3>
                  <p className="mt-1">{selectedCustomer.totalSpent.toFixed(2)} ₼</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500">Ünvan</h3>
                <p className="mt-1">{selectedCustomer.address || 'Ünvan qeyd edilməyib'}</p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Müştəri Redaktə/Əlavə Modalı */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedCustomer ? 'Müştərini redaktə et' : 'Yeni müştəri əlavə et'}
              </h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                // Burada form məlumatları toplanıb əlavə/redaktə ediləcək
                const formData = new FormData(e.target as HTMLFormElement);
                const customerData = {
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  status: formData.get('status') as 'Aktiv' | 'Deaktiv' | 'Bloklanmış',
                  address: formData.get('address') as string,
                };
                
                if (selectedCustomer) {
                  editCustomer({
                    ...selectedCustomer,
                    ...customerData
                  });
                } else {
                  addCustomer(customerData as any);
                  setIsEditModalOpen(false);
                }
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={selectedCustomer?.name || ''}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-poçt</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={selectedCustomer?.email || ''}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={selectedCustomer?.phone || ''}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      defaultValue={selectedCustomer?.status || 'Aktiv'}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Aktiv">Aktiv</option>
                      <option value="Deaktiv">Deaktiv</option>
                      <option value="Bloklanmış">Bloklanmış</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ünvan</label>
                  <textarea
                    name="address"
                    defaultValue={selectedCustomer?.address || ''}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {selectedCustomer ? 'Yadda saxla' : 'Əlavə et'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Müştəri Silmə Modalı */}
      {isDeleteModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Müştərini sil</h2>
              <p className="mb-6">
                <strong>{selectedCustomer.name}</strong> adlı müştərini silmək istədiyinizə əminsiniz?
                Bu əməliyyat geri qaytarıla bilməz.
              </p>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  onClick={() => deleteCustomer(selectedCustomer.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Göndərmə Modalı */}
      {isEmailModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Email göndər</h2>
              <p className="mb-4">
                <strong>{selectedCustomer.name}</strong> müştərisinə email göndərilir ({selectedCustomer.email})
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mövzu</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mətn</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={6}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  onClick={sendEmail}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Göndər
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers; 