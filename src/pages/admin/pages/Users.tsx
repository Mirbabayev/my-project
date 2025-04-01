import React from 'react';
import { Filter, Shield, Users as UsersIcon, User, Mail, Phone, Calendar } from 'lucide-react';
import { UserRole } from '../../../lib/auth';

const Users = () => {
  const mockUsers = [
    {
      id: '1',
      name: 'Anar Məmmədov',
      email: 'anar@example.com',
      role: UserRole.ADMIN,
      registered: '12.01.2024',
      orders: 5,
      status: 'active'
    },
    {
      id: '2',
      name: 'Nigar Əliyeva',
      email: 'nigar@example.com',
      role: UserRole.USER,
      registered: '15.02.2024',
      orders: 3,
      status: 'active'
    },
    {
      id: '3',
      name: 'Orxan Həsənli',
      email: 'orxan@example.com',
      role: UserRole.SELLER,
      registered: '20.03.2024',
      orders: 0,
      status: 'active'
    },
    {
      id: '4',
      name: 'Lalə Quliyeva',
      email: 'lale@example.com',
      role: UserRole.USER,
      registered: '05.04.2024',
      orders: 2,
      status: 'active'
    },
    {
      id: '5',
      name: 'Elçin Nəsirov',
      email: 'elcin@example.com',
      role: UserRole.USER,
      registered: '10.04.2024',
      orders: 1,
      status: 'inactive'
    }
  ];

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            <Shield size={12} className="mr-1" /> Admin
          </span>
        );
      case UserRole.SELLER:
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            <UsersIcon size={12} className="mr-1" /> Satıcı
          </span>
        );
      case UserRole.USER:
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            <User size={12} className="mr-1" /> İstifadəçi
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">İstifadəçilər</h2>
        <div className="flex gap-2">
          <button className="px-3 py-2 flex items-center text-sm gap-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
            <Filter size={16} />
            Filtrlə
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İstifadəçi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-poçt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qeydiyyat tarixi
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sifarişlər
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail size={14} className="mr-1 text-gray-400" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1 text-gray-400" />
                    {user.registered}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  {user.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'active' ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-900">Düzəliş</button>
                    <button className="text-red-600 hover:text-red-900">Blokla</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          5 istifadəçidən 1-5 arası göstərilir
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

export default Users; 