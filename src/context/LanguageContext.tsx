import React, { createContext, useState, useContext } from 'react';

type Language = 'az' | 'en' | 'ru';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  az: {
    dashboard: 'İdarə Paneli',
    products: 'Məhsullar',
    brands: 'Brendlər',
    blog: 'Bloq',
    orders: 'Sifarişlər',
    customers: 'Müştərilər',
    settings: 'Tənzimləmələr',
    search: 'Axtar...',
    notifications: 'Bildirişlər',
    profile: 'Profil',
    logout: 'Çıxış',
    totalSales: 'Ümumi Satış',
    totalOrders: 'Ümumi Sifariş',
    totalCustomers: 'Ümumi Müştəri',
    recentOrders: 'Son Sifarişlər',
    topProducts: 'Ən Çox Satılan',
    orderNumber: 'Sifariş №',
    date: 'Tarix',
    customer: 'Müştəri',
    status: 'Status',
    amount: 'Məbləğ',
    viewAll: 'Hamısına Bax',
    add: 'Əlavə et',
    edit: 'Redaktə et',
    delete: 'Sil',
    save: 'Yadda saxla',
    cancel: 'Ləğv et',
    confirm: 'Təsdiq et',
    pending: 'Gözləyir',
    processing: 'İcrada',
    completed: 'Tamamlandı',
    cancelled: 'Ləğv edildi'
  },
  en: {
    dashboard: 'Dashboard',
    products: 'Products',
    brands: 'Brands',
    blog: 'Blog',
    orders: 'Orders',
    customers: 'Customers',
    settings: 'Settings',
    search: 'Search...',
    notifications: 'Notifications',
    profile: 'Profile',
    logout: 'Logout',
    totalSales: 'Total Sales',
    totalOrders: 'Total Orders',
    totalCustomers: 'Total Customers',
    recentOrders: 'Recent Orders',
    topProducts: 'Top Products',
    orderNumber: 'Order #',
    date: 'Date',
    customer: 'Customer',
    status: 'Status',
    amount: 'Amount',
    viewAll: 'View All',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    cancelled: 'Cancelled'
  },
  ru: {
    dashboard: 'Панель управления',
    products: 'Продукты',
    brands: 'Бренды',
    blog: 'Блог',
    orders: 'Заказы',
    customers: 'Клиенты',
    settings: 'Настройки',
    search: 'Поиск...',
    notifications: 'Уведомления',
    profile: 'Профиль',
    logout: 'Выход',
    totalSales: 'Общие продажи',
    totalOrders: 'Всего заказов',
    totalCustomers: 'Всего клиентов',
    recentOrders: 'Последние заказы',
    topProducts: 'Топ продаж',
    orderNumber: 'Заказ №',
    date: 'Дата',
    customer: 'Клиент',
    status: 'Статус',
    amount: 'Сумма',
    viewAll: 'Показать все',
    add: 'Добавить',
    edit: 'Изменить',
    delete: 'Удалить',
    save: 'Сохранить',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    pending: 'В ожидании',
    processing: 'В обработке',
    completed: 'Завершен',
    cancelled: 'Отменен'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('az');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 