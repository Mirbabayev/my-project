import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Share2, ShoppingCart, Star } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

// Nümunə məhsul məlumatları
const SAMPLE_PRODUCT = {
  id: 1,
  name: 'Chanel N°5',
  brand: 'Chanel',
  price: 299.99,
  sizes: ['50ml', '100ml'],
  description: 'Chanel N°5, dünyaca məşhur Chanel brendinin əfsanəvi ətridir. 1921-ci ildə yaradılan bu ətir, müasir parfümeriya tarixində dönüş nöqtəsi oldu. Jasmin, May qızılgülü, sitrус və aldehidlərin harmonik birləşməsi ilə yaradılan bu ətir, əsl Fransız zərifliyini təcəssüm etdirir.',
  details: [
    'Ətir ailəsi: Çiçəkli aldehid',
    'Əsas notalar: Jasmin, May qızılgülü, Sitrус',
    'Yaradıcı: Ernest Beaux',
    'Buraxılış ili: 1921'
  ],
  rating: 4.8,
  reviews: 128,
  images: [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595425964272-5437c8a18780?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80'
  ]
};

export default function ProductDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={SAMPLE_PRODUCT.images[0]}
              alt={SAMPLE_PRODUCT.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {SAMPLE_PRODUCT.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${SAMPLE_PRODUCT.name} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{SAMPLE_PRODUCT.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{SAMPLE_PRODUCT.brand}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{SAMPLE_PRODUCT.rating}</span>
                <span className="ml-1 text-gray-600">
                  ({SAMPLE_PRODUCT.reviews} rəy)
                </span>
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5 mr-1" />
                Paylaş
              </button>
            </div>
            <p className="text-2xl font-bold">{formatPrice(SAMPLE_PRODUCT.price)}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">{t('size')}</h3>
            <div className="flex gap-3">
              {SAMPLE_PRODUCT.sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button className="flex-1 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <ShoppingCart className="w-5 h-5 inline-block mr-2" />
              {t('addToCart')}
            </button>
            <button className="p-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-medium mb-2">Məhsul haqqında</h3>
            <p className="text-gray-600 mb-4">{SAMPLE_PRODUCT.description}</p>
            
            <h3 className="text-lg font-medium mb-2">Detallar</h3>
            <ul className="list-disc list-inside text-gray-600">
              {SAMPLE_PRODUCT.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}