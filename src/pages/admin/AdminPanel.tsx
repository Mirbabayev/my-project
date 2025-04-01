import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Package, 
  Tag,
  Home,
  LogOut,
  PlusCircle,
  Search,
  Eye
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

const AdminPanel = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Demo məlumatlar
  const stats = {
    totalSales: "18,543",
    totalOrders: 156,
    totalProducts: 89,
    totalUsers: 1234
  };

  // Son sifarişlər
  const recentOrders = [
    { id: "1", customer: "Anar Məmmədov", total: "150.00", date: "13.05.2024", status: "Tamamlanıb" },
    { id: "2", customer: "Nigar Əliyeva", total: "240.00", date: "12.05.2024", status: "Gözləmədə" },
    { id: "3", customer: "Orxan Həsənli", total: "280.00", date: "10.05.2024", status: "Hazırlanır" }
  ];

  // Son məhsullar
  const recentProducts = [
    { id: "1", name: "Bleu de Chanel", brand: "Chanel", price: "245.00", stock: 15 },
    { id: "2", name: "Sauvage", brand: "Dior", price: "220.00", stock: 8 },
    { id: "3", name: "Black Orchid", brand: "Tom Ford", price: "320.00", stock: 5 }
  ];

  // İstifadəçinin admin olduğunu yoxlayırıq
  useEffect(() => {
    const checkAdmin = async () => {
      const hasAdminRole = await isAdmin();
      setIsAdminUser(hasAdminRole);
      
      if (!hasAdminRole) {
        navigate('/unauthorized');
      }
    };
    
    checkAdmin();
  }, [isAdmin, navigate]);

  // Admin yoxlanılması hələ başa çatmayıbsa gözləyirik
  if (isAdminUser === null) {
    return <div className="flex justify-center items-center h-screen">Yüklənir...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Başlıq və axtarış */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">Admin İdarəetmə Paneli</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Axtar..." 
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {user?.email || 'Admin'}
              </span>
              <button 
                onClick={() => signOut()}
                className="text-gray-500 hover:text-red-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Əsas naviqasiya kartları */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Link to="/" className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:bg-gray-50 transition-colors">
          <Home className="h-8 w-8 text-gray-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Ana Səhifə</span>
        </Link>

        <Link to="/admin/products" className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:bg-gray-50 transition-colors">
          <Package className="h-8 w-8 text-green-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Məhsullar</span>
        </Link>

        <Link to="/admin/orders" className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:bg-gray-50 transition-colors">
          <ShoppingBag className="h-8 w-8 text-blue-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Sifarişlər</span>
        </Link>

        <Link to="/admin/categories" className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:bg-gray-50 transition-colors">
          <Tag className="h-8 w-8 text-purple-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Kateqoriyalar</span>
        </Link>

        <Link to="/admin/users" className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:bg-gray-50 transition-colors">
          <Users className="h-8 w-8 text-amber-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">İstifadəçilər</span>
        </Link>

        <Link to="/admin/settings" className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:bg-gray-50 transition-colors">
          <Settings className="h-8 w-8 text-gray-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Tənzimləmələr</span>
        </Link>
      </div>

      {/* Statistika kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sifarişlər</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalOrders}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Məhsullar</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalProducts}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">İstifadəçilər</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ümumi Satış</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalSales} ₼</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Əsas məzmun */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Son sifarişlər */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Son sifarişlər</h2>
            <Link to="/admin/orders" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Bütün sifarişlər
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Sifariş №</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Müştəri</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Məbləğ</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="py-3 px-4 text-sm">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium
                          ${order.status === 'Tamamlanıb' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Gözləmədə' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{order.total} ₼</td>
                    <td className="py-3 px-4 text-right">
                      <Link to={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900 text-sm">
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Son məhsullar */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Son məhsullar</h2>
            <div className="flex gap-2">
              <Link to="/admin/products" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Bütün məhsullar
              </Link>
              <Link to="/admin/products/new" className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                <PlusCircle size={16} className="mr-1" /> Əlavə et
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Məhsul №</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Ad</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Brend</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymət</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#{product.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.brand}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{product.price} ₼</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' : 
                        product.stock > 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link to={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-900 text-sm">
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 