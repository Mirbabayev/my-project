import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  X, 
  Check, 
  Calendar,
  Clock,
  ShoppingBag,
  User,
  MapPin,
  CreditCard,
  AlertTriangle,
  Package,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone
} from 'lucide-react';

// Sifariş statusları
type OrderStatus = 'Yeni' | 'İşlənir' | 'Göndərilib' | 'Çatdırılıb' | 'Ləğv edilib' | 'Geri qaytarılıb';

// Ödəmə metodları
type PaymentMethod = 'Kart' | 'Nağd' | 'Bank köçürməsi';

// Sifariş interfeysi
interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Ödənilib' | 'Ödənilməyib' | 'Gözləmədədir';
  shippingMethod: 'Standart' | 'Ekspress';
  shippingCost: number;
  notes?: string;
  trackingNumber?: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>('İşlənir');
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  // Status filter seçimləri
  const statusOptions = [
    { value: 'all', label: 'Bütün statuslar' },
    { value: 'Yeni', label: 'Yeni' },
    { value: 'İşlənir', label: 'İşlənir' },
    { value: 'Göndərilib', label: 'Göndərilib' },
    { value: 'Çatdırılıb', label: 'Çatdırılıb' },
    { value: 'Ləğv edilib', label: 'Ləğv edilib' },
    { value: 'Geri qaytarılıb', label: 'Geri qaytarılıb' },
  ];

  // Tarix filteri seçimləri
  const dateOptions = [
    { value: 'all', label: 'Bütün tarixlər' },
    { value: 'today', label: 'Bu gün' },
    { value: 'yesterday', label: 'Dünən' },
    { value: 'week', label: 'Bu həftə' },
    { value: 'month', label: 'Bu ay' },
  ];

  // Nümunə sifarişlər
  useEffect(() => {
    // Gerçək sistemdə API-dan gələcək
    const mockOrders: Order[] = [
      {
        id: 1,
        orderNumber: 'EP-20230515-001',
        customerId: 1,
        customerName: 'Əli Məmmədov',
        customerEmail: 'ali.mammadov@gmail.com',
        customerPhone: '(+994) 50 123 45 67',
        date: '2023-05-15',
        status: 'Çatdırılıb',
        items: [
          {
            id: 1,
            productId: 101,
            productName: 'Bleu de Chanel Parfum',
            productImage: '/images/products/bleu-de-chanel.jpg',
            quantity: 1,
            price: 180,
            total: 180
          }
        ],
        totalAmount: 180,
        shippingAddress: 'Bakı şəh., Nərimanov r., Atatürk pr. 19',
        billingAddress: 'Bakı şəh., Nərimanov r., Atatürk pr. 19',
        paymentMethod: 'Kart',
        paymentStatus: 'Ödənilib',
        shippingMethod: 'Standart',
        shippingCost: 5,
        trackingNumber: 'AZ9834567'
      },
      {
        id: 2,
        orderNumber: 'EP-20230518-002',
        customerId: 2,
        customerName: 'Səbinə Əliyeva',
        customerEmail: 'sabina.aliyeva@mail.ru',
        customerPhone: '(+994) 55 987 65 43',
        date: '2023-05-18',
        status: 'Göndərilib',
        items: [
          {
            id: 2,
            productId: 102,
            productName: 'Chanel No 5 Eau de Parfum',
            productImage: '/images/products/chanel-no5.jpg',
            quantity: 1,
            price: 150,
            total: 150
          },
          {
            id: 3,
            productId: 103,
            productName: 'Dior Sauvage Eau de Parfum',
            productImage: '/images/products/dior-sauvage.jpg',
            quantity: 1,
            price: 160,
            total: 160
          }
        ],
        totalAmount: 310,
        shippingAddress: 'Bakı şəh., Yasamal r., Şərifzadə küç. 42',
        billingAddress: 'Bakı şəh., Yasamal r., Şərifzadə küç. 42',
        paymentMethod: 'Nağd',
        paymentStatus: 'Ödənilib',
        shippingMethod: 'Ekspress',
        shippingCost: 10,
        trackingNumber: 'AZ9834568'
      },
      {
        id: 3,
        orderNumber: 'EP-20230520-003',
        customerId: 3,
        customerName: 'Rəşad Hüseynov',
        customerEmail: 'rashad.huseynov@inbox.az',
        customerPhone: '(+994) 70 654 32 10',
        date: '2023-05-20',
        status: 'İşlənir',
        items: [
          {
            id: 4,
            productId: 104,
            productName: 'Armani Code Absolu',
            productImage: '/images/products/armani-code.jpg',
            quantity: 2,
            price: 140,
            total: 280
          }
        ],
        totalAmount: 280,
        shippingAddress: 'Sumqayıt şəh., 12-ci mikr.',
        billingAddress: 'Sumqayıt şəh., 12-ci mikr.',
        paymentMethod: 'Kart',
        paymentStatus: 'Ödənilib',
        shippingMethod: 'Standart',
        shippingCost: 5
      },
      {
        id: 4,
        orderNumber: 'EP-20230522-004',
        customerId: 4,
        customerName: 'Aygün Kazımova',
        customerEmail: 'aygun.kazimova@yahoo.com',
        customerPhone: '(+994) 77 345 67 89',
        date: '2023-05-22',
        status: 'Yeni',
        items: [
          {
            id: 5,
            productId: 105,
            productName: 'Versace Eros',
            productImage: '/images/products/versace-eros.jpg',
            quantity: 1,
            price: 130,
            total: 130
          }
        ],
        totalAmount: 130,
        shippingAddress: 'Gəncə şəh., Nizami r., Gülüstan küç. 8',
        billingAddress: 'Gəncə şəh., Nizami r., Gülüstan küç. 8',
        paymentMethod: 'Bank köçürməsi',
        paymentStatus: 'Gözləmədədir',
        shippingMethod: 'Standart',
        shippingCost: 7
      },
      {
        id: 5,
        orderNumber: 'EP-20230525-005',
        customerId: 5,
        customerName: 'Elşən Nəsirov',
        customerEmail: 'elshen.nasirov@outlook.com',
        customerPhone: '(+994) 51 234 56 78',
        date: '2023-05-25',
        status: 'Ləğv edilib',
        items: [
          {
            id: 6,
            productId: 106,
            productName: 'Tom Ford Tobacco Vanille',
            productImage: '/images/products/tom-ford-tobacco.jpg',
            quantity: 1,
            price: 320,
            total: 320
          }
        ],
        totalAmount: 320,
        shippingAddress: 'Bakı şəh., Xətai r., Babək pr. 72',
        billingAddress: 'Bakı şəh., Xətai r., Babək pr. 72',
        paymentMethod: 'Kart',
        paymentStatus: 'Gözləmədədir',
        shippingMethod: 'Ekspress',
        shippingCost: 10,
        notes: 'Müştəri sifarişi ləğv etdi'
      }
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Sifariş genişləndirmə/bağlama
  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  // Axtarış və filtrləmə
  useEffect(() => {
    let results = orders;

    // Status filteri
    if (statusFilter !== 'all') {
      results = results.filter(order => order.status === statusFilter);
    }

    // Tarix filteri
    if (dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      
      results = results.filter(order => {
        const orderDate = new Date(order.date);
        orderDate.setHours(0, 0, 0, 0);
        
        switch(dateFilter) {
          case 'today':
            return orderDate.getTime() === today.getTime();
          case 'yesterday':
            return orderDate.getTime() === yesterday.getTime();
          case 'week':
            return orderDate >= weekStart && orderDate <= today;
          case 'month':
            return orderDate >= monthStart && orderDate <= today;
          default:
            return true;
        }
      });
    }

    // Axtarış
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      results = results.filter(order => 
        order.orderNumber.toLowerCase().includes(lowercaseSearchTerm) ||
        order.customerName.toLowerCase().includes(lowercaseSearchTerm) ||
        order.customerEmail.toLowerCase().includes(lowercaseSearchTerm) ||
        order.customerPhone.includes(searchTerm)
      );
    }

    setFilteredOrders(results);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  // Status günləşdirmə
  const updateOrderStatus = () => {
    if (selectedOrder && newStatus) {
      const updatedOrders = orders.map(order => 
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      );
      
      setOrders(updatedOrders);
      setFilteredOrders(
        filteredOrders.map(order => 
          order.id === selectedOrder.id ? { ...order, status: newStatus } : order
        )
      );
      
      setIsUpdateStatusModalOpen(false);
      console.log(`Sifariş ${selectedOrder.orderNumber} statusu yeniləndi: ${newStatus}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Sifarişlər</h1>
      
      {/* Filtrlər və Axtarış */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center w-full md:w-1/2 relative">
          <input
            type="text"
            placeholder="Sifariş nömrəsi, müştəri adı və ya əlaqə..."
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
          
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            {dateOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setDateFilter('all');
            }}
          >
            <Filter size={18} /> Sıfırla
          </button>
        </div>
      </div>
      
      {/* Sifarişlər siyahısı */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Sifariş tapılmadı
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sifariş №
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Müştəri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Məbləğ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ödəmə
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Əməliyyatlar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleOrderExpand(order.id)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {expandedOrders.includes(order.id) ? <ChevronUp size={16} className="mr-2" /> : <ChevronDown size={16} className="mr-2" />}
                          <span className="font-medium">{order.orderNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('az-AZ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerPhone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(order.totalAmount + order.shippingCost).toFixed(2)} ₼
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Yeni' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'İşlənir' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Göndərilib' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'Çatdırılıb' ? 'bg-green-100 text-green-800' :
                          order.status === 'Ləğv edilib' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.paymentStatus === 'Ödənilib' ? 'bg-green-100 text-green-800' :
                          order.paymentStatus === 'Ödənilməyib' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                              setIsViewModalOpen(true);
                            }}
                            title="Sifarişə bax"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className="text-purple-600 hover:text-purple-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                              setNewStatus(order.status);
                              setIsUpdateStatusModalOpen(true);
                            }}
                            title="Statusu yenilə"
                          >
                            <Truck size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrders.includes(order.id) && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Sifariş məlumatları</h4>
                              <div className="space-y-1 text-sm">
                                <p className="flex items-center text-gray-600">
                                  <Calendar size={16} className="mr-2" /> Tarix: {new Date(order.date).toLocaleDateString('az-AZ')}
                                </p>
                                <p className="flex items-center text-gray-600">
                                  <ShoppingBag size={16} className="mr-2" /> Məhsullar: {order.items.length} ədəd
                                </p>
                                <p className="flex items-center text-gray-600">
                                  <CreditCard size={16} className="mr-2" /> Ödəmə: {order.paymentMethod}
                                </p>
                                <p className="flex items-center text-gray-600">
                                  <Truck size={16} className="mr-2" /> Çatdırılma: {order.shippingMethod}
                                </p>
                                {order.trackingNumber && (
                                  <p className="flex items-center text-gray-600">
                                    <Package size={16} className="mr-2" /> İzləmə: {order.trackingNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Müştəri məlumatları</h4>
                              <div className="space-y-1 text-sm">
                                <p className="flex items-center text-gray-600">
                                  <User size={16} className="mr-2" /> {order.customerName}
                                </p>
                                <p className="flex items-center text-gray-600">
                                  <Mail size={16} className="mr-2" /> {order.customerEmail}
                                </p>
                                <p className="flex items-center text-gray-600">
                                  <Phone size={16} className="mr-2" /> {order.customerPhone}
                                </p>
                                <p className="flex items-center text-gray-600">
                                  <MapPin size={16} className="mr-2" /> {order.shippingAddress}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Məhsullar</h4>
                              <div className="space-y-2">
                                {order.items.map(item => (
                                  <div key={item.id} className="flex items-center text-sm">
                                    <div className="w-8 h-8 bg-gray-200 rounded mr-2 flex-shrink-0"></div>
                                    <div className="flex-1">
                                      <p className="text-gray-900">{item.productName}</p>
                                      <p className="text-gray-500">{item.quantity} x {item.price.toFixed(2)} ₼</p>
                                    </div>
                                    <div className="text-gray-900 font-medium">{item.total.toFixed(2)} ₼</div>
                                  </div>
                                ))}
                                <div className="border-t pt-2 mt-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Məhsullar:</span>
                                    <span className="font-medium">{order.totalAmount.toFixed(2)} ₼</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Çatdırılma:</span>
                                    <span className="font-medium">{order.shippingCost.toFixed(2)} ₼</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold mt-1">
                                    <span>Cəmi:</span>
                                    <span>{(order.totalAmount + order.shippingCost).toFixed(2)} ₼</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Sifariş baxış modalı */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Sifariş #{selectedOrder.orderNumber}</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Sifariş məlumatları</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Sifariş tarixi</p>
                          <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString('az-AZ')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              selectedOrder.status === 'Yeni' ? 'bg-blue-100 text-blue-800' :
                              selectedOrder.status === 'İşlənir' ? 'bg-yellow-100 text-yellow-800' :
                              selectedOrder.status === 'Göndərilib' ? 'bg-purple-100 text-purple-800' :
                              selectedOrder.status === 'Çatdırılıb' ? 'bg-green-100 text-green-800' :
                              selectedOrder.status === 'Ləğv edilib' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {selectedOrder.status}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ödəmə metodu</p>
                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ödəmə statusu</p>
                          <p>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              selectedOrder.paymentStatus === 'Ödənilib' ? 'bg-green-100 text-green-800' :
                              selectedOrder.paymentStatus === 'Ödənilməyib' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {selectedOrder.paymentStatus}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Çatdırılma</p>
                          <p className="font-medium">{selectedOrder.shippingMethod}</p>
                        </div>
                        {selectedOrder.trackingNumber && (
                          <div>
                            <p className="text-sm text-gray-500">İzləmə nömrəsi</p>
                            <p className="font-medium">{selectedOrder.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Müştəri məlumatları</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900 mb-1">{selectedOrder.customerName}</p>
                      <p className="text-gray-600 mb-3">
                        <a href={`mailto:${selectedOrder.customerEmail}`} className="text-indigo-600 hover:text-indigo-800">
                          {selectedOrder.customerEmail}
                        </a>
                        <br />
                        {selectedOrder.customerPhone}
                      </p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Çatdırılma ünvanı</h4>
                        <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Faktura ünvanı</h4>
                        <p className="text-gray-600">{selectedOrder.billingAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Məhsullar</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {selectedOrder.items.map(item => (
                        <div key={item.id} className="flex items-start border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <div className="w-16 h-16 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.productName}</h4>
                            <p className="text-gray-500 text-sm mt-1">
                              {item.quantity} x {item.price.toFixed(2)} ₼
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{item.total.toFixed(2)} ₼</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Ara cəm:</span>
                        <span className="font-medium">{selectedOrder.totalAmount.toFixed(2)} ₼</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Çatdırılma:</span>
                        <span className="font-medium">{selectedOrder.shippingCost.toFixed(2)} ₼</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
                        <span>Cəmi:</span>
                        <span>{(selectedOrder.totalAmount + selectedOrder.shippingCost).toFixed(2)} ₼</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedOrder.notes && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Qeydlər</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">{selectedOrder.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Bağla
                </button>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setNewStatus(selectedOrder.status);
                    setIsUpdateStatusModalOpen(true);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Statusu yenilə
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Status yeniləmə modalı */}
      {isUpdateStatusModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Sifariş statusunu yenilə</h2>
                <button
                  onClick={() => setIsUpdateStatusModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p className="mb-4">
                <strong>#{selectedOrder.orderNumber}</strong> nömrəli sifariş statusunu dəyişdirilir.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Yeni status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Yeni">Yeni</option>
                  <option value="İşlənir">İşlənir</option>
                  <option value="Göndərilib">Göndərilib</option>
                  <option value="Çatdırılıb">Çatdırılıb</option>
                  <option value="Ləğv edilib">Ləğv edilib</option>
                  <option value="Geri qaytarılıb">Geri qaytarılıb</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsUpdateStatusModalOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  onClick={updateOrderStatus}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Statusu yenilə
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders; 