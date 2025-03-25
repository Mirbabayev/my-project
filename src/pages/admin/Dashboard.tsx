import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Clock,
  ChevronRight
} from 'lucide-react';

// Nümunə məlumatlar
const mockData = {
  totalSales: '125,430.00',
  totalOrders: '1,234',
  totalCustomers: '5,678',
  recentOrders: [
    {
      id: 1,
      orderNumber: 'SİF-2024-001',
      date: '2024-03-20',
      customer: 'Əli Məmmədov',
      status: 'pending',
      amount: '230.00'
    },
    {
      id: 2,
      orderNumber: 'SİF-2024-002',
      date: '2024-03-19',
      customer: 'Aygün Həsənova',
      status: 'completed',
      amount: '450.00'
    },
    {
      id: 3,
      orderNumber: 'SİF-2024-003',
      date: '2024-03-19',
      customer: 'Nicat Əliyev',
      status: 'processing',
      amount: '180.00'
    },
    {
      id: 4,
      orderNumber: 'SİF-2024-004',
      date: '2024-03-18',
      customer: 'Səbinə Quliyeva',
      status: 'cancelled',
      amount: '320.00'
    }
  ],
  topProducts: [
    {
      id: 1,
      name: 'Chanel No 5',
      sales: 234,
      revenue: '23,400.00'
    },
    {
      id: 2,
      name: 'Dior Sauvage',
      sales: 189,
      revenue: '18,900.00'
    },
    {
      id: 3,
      name: 'Versace Eros',
      sales: 156,
      revenue: '15,600.00'
    }
  ]
};

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Statistika Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('totalSales')}</p>
              <p className="text-2xl font-semibold mt-1">{mockData.totalSales} ₼</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600">
            <TrendingUp size={16} />
            <span className="ml-1 text-sm">+12.5%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('totalOrders')}</p>
              <p className="text-2xl font-semibold mt-1">{mockData.totalOrders}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600">
            <TrendingUp size={16} />
            <span className="ml-1 text-sm">+8.2%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('totalCustomers')}</p>
              <p className="text-2xl font-semibold mt-1">{mockData.totalCustomers}</p>
            </div>
            <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600">
            <TrendingUp size={16} />
            <span className="ml-1 text-sm">+5.3%</span>
          </div>
        </div>
      </div>

      {/* Son Sifarişlər */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t('recentOrders')}</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              {t('viewAll')}
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">{t('orderNumber')}</th>
                <th className="px-6 py-3">{t('customer')}</th>
                <th className="px-6 py-3">{t('status')}</th>
                <th className="px-6 py-3">{t('amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockData.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                    <div className="text-xs text-gray-500">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {t(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.amount} ₼</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ən Çox Satılan Məhsullar */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t('topProducts')}</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              {t('viewAll')}
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="p-6">
          {mockData.topProducts.map((product, index) => (
            <div key={product.id} className={`flex items-center justify-between ${index !== mockData.topProducts.length - 1 ? 'mb-4' : ''}`}>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                  <Package size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} satış</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.revenue} ₼</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 