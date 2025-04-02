import { faker } from '@faker-js/faker';

// Məhsul interfeysi
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  description: string;
  image: string;
  gender: 'male' | 'female' | 'unisex';
  rating: number;
  popularity: number;
  size: string;
  concentration: string;
  categories: string[];
}

// Konsentrasiya seçimləri
const concentrations = [
  'Eau de Parfum',
  'Eau de Toilette',
  'Parfum',
  'Eau de Cologne',
  'Eau Fraiche'
];

// Ölçü seçimləri
const sizes = [
  '30ml',
  '50ml',
  '75ml',
  '100ml',
  '125ml',
  '200ml'
];

// Brend seçimləri
const brands = [
  'Chanel',
  'Dior',
  'Tom Ford',
  'Gucci',
  'YSL',
  'Jo Malone',
  'Armani',
  'Hermès',
  'Versace',
  'Burberry',
  'Prada',
  'Bvlgari'
];

// Ətir adları
const perfumeNames = [
  'Black Opium',
  'Bleu de Chanel',
  'Sauvage',
  'La Vie Est Belle',
  'J\'adore',
  'Light Blue',
  'Acqua di Gio',
  'Good Girl',
  'Si',
  'Coco Mademoiselle',
  'Flowerbomb',
  'Eros',
  'Chance',
  'Le Male',
  'Black Orchid',
  'Aventus',
  'Boss Bottled',
  'Invictus',
  'L\'Interdit',
  'My Way',
  'Wood Sage & Sea Salt',
  'Libre',
  'Miss Dior',
  'Luna Rossa',
];

// Kateqoriya seçimləri
const categoryOptions = [
  'citrus',
  'floral',
  'woody',
  'oriental',
  'fresh',
  'spicy',
  'sweet',
  'aromatic',
  'fruity',
  'green',
  'bestseller',
  'new',
  'limited',
];

// Şəkil URL-ləri
const imageUrls = [
  '/images/perfumes/perfume1.jpg',
  '/images/perfumes/perfume2.jpg',
  '/images/perfumes/perfume3.jpg',
  '/images/perfumes/perfume4.jpg',
  '/images/perfumes/perfume5.jpg',
];

// Təsadüfi məhsul yaratmaq
function createRandomProduct(id: string): Product {
  const originalPrice = parseFloat(faker.commerce.price({ min: 50, max: 300 }));
  const hasDiscount = Math.random() > 0.7; // 30% şans ilə endirim
  const discountPercent = hasDiscount ? Math.floor(Math.random() * 25) + 5 : undefined; // 5% ilə 30% arası
  const discountedPrice = discountPercent 
    ? Number((originalPrice * (1 - discountPercent / 100)).toFixed(2)) 
    : originalPrice;

  return {
    id,
    name: `${faker.commerce.productAdjective()} ${perfumeNames[Math.floor(Math.random() * perfumeNames.length)]} ${faker.commerce.productMaterial()}`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    price: discountedPrice,
    oldPrice: hasDiscount ? originalPrice : undefined,
    discount: discountPercent,
    description: faker.commerce.productDescription(),
    image: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    gender: faker.helpers.arrayElement(['male', 'female', 'unisex']),
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0 arası
    popularity: Math.floor(Math.random() * 1000),
    size: sizes[Math.floor(Math.random() * sizes.length)],
    concentration: concentrations[Math.floor(Math.random() * concentrations.length)],
    categories: faker.helpers.arrayElements(categoryOptions, {
      min: 2,
      max: 5
    }),
  };
}

// Məhsul siyahısı
export const products: Product[] = Array.from({ length: 20 }, (_, i) => 
  createRandomProduct(String(i + 1))
);

// Məhsul axtarmaq funksiyası
export function findProduct(id: string): Product | undefined {
  return products.find(product => product.id === id);
}