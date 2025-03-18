import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useEffect, useState } from 'react';

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'Chanel N°5',
    brand: 'Chanel',
    price: 299.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    price: 259.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'J\'adore',
    brand: 'Dior',
    price: 279.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1595425964272-5437c8a18780?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    price: 249.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Home() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <div className="relative h-[600px] mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1615713170963-2595d2c721a3?auto=format&fit=crop&q=80&w=1920')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div 
            className="container"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6 [text-shadow:_2px_2px_10px_rgb(0_0_0_/_40%)]">
                Premium Parfüm Kolleksiyası
              </h1>
              <p className="text-xl mb-8 text-gray-200 [text-shadow:_1px_1px_5px_rgb(0_0_0_/_40%)]">
                Dünyanın ən məşhur brendlərinin eksklüziv parfüm kolleksiyası ilə tanış olun
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Kataloqa keçid
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories with Parallax */}
      <div className="container mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="relative h-[300px] rounded-2xl overflow-hidden group"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 400) * 0.1)}px)`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
              alt="Qadın ətirləri"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Qadın Ətirləri</h3>
                <Link to="/products" className="text-sm hover:underline">
                  Daha çox →
                </Link>
              </div>
            </div>
          </div>
          
          <div 
            className="relative h-[300px] rounded-2xl overflow-hidden group"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 400) * 0.2)}px)`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
              alt="Kişi ətirləri"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Kişi Ətirləri</h3>
                <Link to="/products" className="text-sm hover:underline">
                  Daha çox →
                </Link>
              </div>
            </div>
          </div>
          
          <div 
            className="relative h-[300px] rounded-2xl overflow-hidden group"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 400) * 0.3)}px)`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
              alt="Unisex ətirləri"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Unisex Ətirləri</h3>
                <Link to="/products" className="text-sm hover:underline">
                  Daha çox →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div 
        className="container mb-16"
        style={{
          transform: `translateY(${Math.max(0, (scrollY - 800) * 0.1)}px)`,
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Seçilmiş Məhsullar</h2>
          <Link
            to="/products"
            className="text-primary hover:text-primary/80 font-medium flex items-center"
          >
            Hamısına bax
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
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
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
              <p className="font-semibold text-lg">{formatPrice(product.price)}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter with Parallax */}
      <div 
        className="container mb-16"
        style={{
          transform: `translateY(${Math.max(0, (scrollY - 1200) * 0.1)}px)`,
        }}
      >
        <div className="bg-primary/5 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Yeniliklərdən xəbərdar olun</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ən son məhsullar, xüsusi təkliflər və eksklüziv kampaniyalar haqqında məlumat almaq üçün qeydiyyatdan keçin
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-poçt ünvanınız"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-r-lg hover:bg-primary/90 transition-colors">
              Abunə ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}