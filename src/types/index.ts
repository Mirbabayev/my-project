export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl?: string;
  inStock: boolean;
  rating: number;
  volume: number;
  gender: 'Kişi' | 'Qadın' | 'Unisex';
  fragranceType: string;
  notes: string;
  features: string;
  usage: string;
  countryOfOrigin: string;
  yearOfRelease: string;
  discount: number;
  isNew: boolean;
  isPopular: boolean;
  isBestSeller: boolean;
  category: string;
  subCategory?: string;
  tags: string[];
  reviews: {
    id: number;
    userId: number;
    rating: number;
    comment: string;
    date: string;
  }[];
  specifications: {
    volume: string;
    concentration: string;
    shelfLife: string;
    ingredients: string;
  };
}

// Brendlərin tipi
export interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  countryOfOrigin?: string;
}

// Bloq məqalələrinin tipi
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  author?: string;
  tags?: string[];
}

// Sifarişlərin tipi
export interface Order {
  id: number;
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode?: string;
    phone: string;
  };
  paymentMethod: 'cash' | 'card' | 'transfer';
  orderDate: string;
}

// İstifadəçi tipi
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
  };
  wishlist?: number[]; // Sevimlilər siyahısı (məhsul id-ləri)
  orders?: number[]; // Sifarişlər siyahısı (sifariş id-ləri)
} 