import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Chanel N°5',
    brand: 'Chanel',
    price: 299.99,
    size: '100ml',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    price: 259.99,
    size: '90ml',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'J\'adore',
    brand: 'Dior',
    price: 279.99,
    size: '100ml',
    image: 'https://images.unsplash.com/photo-1595425964272-5437c8a18780?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    price: 249.99,
    size: '80ml',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    price: 269.99,
    size: '100ml',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Libre',
    brand: 'Yves Saint Laurent',
    price: 289.99,
    size: '90ml',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Products() {
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      {/* Filters and Sort */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>{t('filter')}</span>
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{t('brand')}:</span>
            <select className="bg-white rounded-lg px-3 py-2 shadow-sm border-0">
              <option value="">Hamısı</option>
              <option value="chanel">Chanel</option>
              <option value="dior">Dior</option>
              <option value="ysl">YSL</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{t('size')}:</span>
            <select className="bg-white rounded-lg px-3 py-2 shadow-sm border-0">
              <option value="">Hamısı</option>
              <option value="50">50ml</option>
              <option value="100">100ml</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <select className="bg-white rounded-lg px-3 py-2 shadow-sm border-0">
            <option value="popular">Ən populyar</option>
            <option value="price-asc">Qiymət: Azdan çoxa</option>
            <option value="price-desc">Qiymət: Çoxdan aza</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SAMPLE_PRODUCTS.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
              <p className="text-gray-600 text-sm mb-3">{product.size}</p>
              <p className="font-semibold text-lg">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}