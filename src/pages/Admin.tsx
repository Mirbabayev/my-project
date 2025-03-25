import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, PenLine, Tag } from 'lucide-react';
import { products } from '../data/products';
import { brands } from '../data/brands';
import { blogPosts } from '../data/blog-posts';
import { AdminLayout } from '../components/AdminLayout';

// Admin Dashboard komponenti
export const Admin: React.FC = () => {
  const navigate = useNavigate();

  // Dashboard kartı komponenti
  const DashboardCard: React.FC<{
    title: string;
    count: number;
    icon: React.ReactNode;
    url: string;
    color: string;
  }> = ({ title, count, icon, url, color }) => (
    <div
      className={`cursor-pointer bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105`}
      onClick={() => navigate(url)}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{count}</h3>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Məhsullar"
          count={products.length}
          icon={<ShoppingBag className="text-white" size={24} />}
          url="/admin/products"
          color="bg-blue-500"
        />
        <DashboardCard
          title="Brendlər"
          count={brands.length}
          icon={<Tag className="text-white" size={24} />}
          url="/admin/brands"
          color="bg-purple-500"
        />
        <DashboardCard
          title="Bloq Yazıları"
          count={blogPosts.length}
          icon={<PenLine className="text-white" size={24} />}
          url="/admin/blog"
          color="bg-green-500"
        />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Admin Panel İstifadə Qaydaları</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Məhsullar bölməsində yeni məhsul əlavə edə, mövcud məhsulları redaktə edə və ya silə bilərsiniz.</li>
          <li>Brendlər bölməsində brend məlumatlarını idarə edə bilərsiniz.</li>
          <li>Bloq yazıları bölməsində bloq kontentini idarə edə bilərsiniz.</li>
          <li>Hər hansı bir dəyişiklik etdikdən sonra "Yadda saxla" düyməsini vurmağı unutmayın.</li>
          <li>Çıxış etmək üçün yuxarı sağ küncdəki "Çıxış" düyməsini istifadə edin.</li>
        </ol>
      </div>
    </AdminLayout>
  );
}; 