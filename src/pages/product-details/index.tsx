import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag, ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { products } from '../../data/products';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Məhsulu ID-yə görə tapırıq
  const product = products.find(p => p.id === id);
  
  // Əgər məhsul tapılmasa geri qayıdırıq
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Məhsul tapılmadı</h2>
        <button 
          onClick={() => navigate('/products')}
          className="text-primary hover:underline"
        >
          Kataloqa qayıt
        </button>
      </div>
    );
  }

  // Oxşar məhsulları tapırıq (eyni cinsdən olan məhsullar)
  const similarProducts = products
    .filter(p => p.gender === product.gender && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1 && newQty <= 10) {
      setQuantity(newQty);
    }
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Naviqasiya */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kataloqa qayıt
        </button>
      </div>

      {/* Məhsul detalları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Məhsul şəkli */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center h-[450px] overflow-hidden border border-gray-100">
            <img 
              src={product.image} 
              alt={`${product.brand} ${product.name} ətri`}
              title={`${product.brand} ${product.name}`}
              className="max-h-[400px] max-w-[90%] h-auto w-auto object-contain transition-all duration-500 hover:scale-105" 
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://dummyimage.com/400x400/f0f0f0/333333.png&text=Şəkil+yoxdur";
                target.onerror = null; // Prevent infinite fallback loop
              }}
            />
          </div>
        </div>

        {/* Məhsul məlumatları */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl text-primary font-medium mb-2">{product.brand}</h3>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-600 capitalize">{product.gender} • {product.concentration}</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{product.price} ₼</p>
            {!product.inStock && (
              <p className="text-red-500 font-medium mb-4">Bu məhsul stokda yoxdur</p>
            )}
          </div>

          {/* Həcm */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Həcm</h3>
            <div className="inline-block border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
              {product.size}
            </div>
          </div>

          {/* Qoxu notları */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-2">Qoxu notları</h3>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note, index) => (
                <Link 
                  key={index} 
                  to={`/products?note=${encodeURIComponent(note)}`}
                  className="bg-gray-100 rounded-full px-3 py-1 text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  {note}
                </Link>
              ))}
            </div>
          </div>

          {/* Miqdar və əlavə etmə düymələri */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled={quantity >= 10 || !product.inStock}
              >
                +
              </button>
            </div>

            <button 
              className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg ${
                product.inStock 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Səbətə əlavə et
            </button>

            <button 
              onClick={toggleWishlist}
              className={`p-3 rounded-lg border ${
                isWishlist 
                  ? 'border-red-500 text-red-500' 
                  : 'border-gray-300 text-gray-500 hover:border-gray-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500' : ''}`} />
            </button>
          </div>
          
          {/* Çatdırılma */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start mb-2">
              <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium">Təhlükəsiz çatdırılma</h4>
                <p className="text-sm text-gray-500">Sifariş 1-3 iş günü ərzində çatdırılır</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium">Orijinal məhsullar</h4>
                <p className="text-sm text-gray-500">Bütün məhsullar 100% orijinaldır</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Oxşar məhsullar */}
      {similarProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Oxşar məhsullar</h2>
            <Link to="/products" className="flex items-center text-primary hover:underline">
              Hamısına bax
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <Link 
                to={`/products/${product.id}`} 
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="relative overflow-hidden bg-gray-50 h-52 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.name} ətri`}
                    title={`${product.brand} ${product.name}`}
                    className="max-h-44 max-w-[80%] h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=Şəkil+yoxdur";
                      target.onerror = null; // Prevent infinite fallback loop
                    }}
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Bitib
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-primary mb-1">{product.brand}</h3>
                  <h2 className="font-bold text-gray-800 text-lg mb-2">{product.name}</h2>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 capitalize">{product.gender} • {product.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-lg text-gray-900">{product.price} ₼</span>
                    <button className="flex items-center text-primary hover:text-primary/80">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}