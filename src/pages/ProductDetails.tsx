import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ArrowLeft, Check, Droplet, Share2, Gift, Truck, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';
import { products } from '../data/products';
import { ProductList } from '../components/ProductList';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<'full' | 'atomizer'>('full');
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'reviews'>('description');
  
  // Məhsul ID-sinə əsasən məhsulu tap
  const product = products.find(p => p.id === Number(id));
  
  // Əlaqəli məhsulları tap (eyni növdən)
  const relatedProducts = products
    .filter(p => p.fragranceType === product?.fragranceType && p.id !== product?.id)
    .slice(0, 4);
  
  // Səhifəyə girəndə yuxarıya scroll et
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Məlumat göstərmə effekti üçün
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showMessage]);
  
  // Məhsul tapılmadıqda
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-6">Məhsul tapılmadı</h1>
        <p className="text-gray-600 mb-8">İstədiyiniz məhsul mövcud deyil və ya silinmiş ola bilər.</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Bütün Məhsullara Qayıt
        </Button>
      </div>
    );
  }

  // Seçilmiş tipə görə qiymət
  const selectedPrice = selectedType === 'atomizer' && product.hasAtomizer && product.atomizerPrice 
    ? product.atomizerPrice 
    : product.price;

  // Seçilmiş tipə görə həcm
  const selectedVolume = selectedType === 'atomizer' && product.hasAtomizer && product.atomizerVolume 
    ? product.atomizerVolume 
    : product.volume;

  // Səbətə əlavə et
  const handleAddToCart = () => {
    setAnimation(true);
    setTimeout(() => setAnimation(false), 1000);
    
    addToCart({
      ...product,
      price: selectedPrice,
      volume: selectedVolume
    }, quantity);
    
    setShowMessage('Məhsul səbətə əlavə edildi!');
  };

  // Sevimlilərə əlavə/çıxar
  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setShowMessage('Məhsul sevimlilərdən çıxarıldı');
    } else {
      addToWishlist(product);
      setShowMessage('Məhsul sevimlilərə əlavə edildi!');
    }
  };

  // Ürəyə click olunduqda animasiya
  const handleHeartClick = () => {
    handleToggleWishlist();
  };
  
  // Paylaşma funksiyası
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.brand} - ${product.name}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Share error:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowMessage('Link kopyalandı!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Bildiriş mesajı */}
      {showMessage && (
        <div className="fixed top-24 right-4 z-50 bg-primary text-white py-2 px-4 rounded-md shadow-lg animate-fadeIn">
          {showMessage}
        </div>
      )}

      {/* Navigate back */}
      <div className="mb-6">
        <Button 
          onClick={() => navigate(-1)} 
          variant="ghost" 
          className="text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri qayıt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Məhsul şəkli */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-8 flex items-center justify-center h-[500px] border border-gray-100 shadow-sm relative group">
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`max-h-[400px] object-contain transition-transform duration-500 ${animation ? 'animate-pulse' : ''}`}
            />
            {/* Discount badge if any */}
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                -{product.discount}%
              </div>
            )}
            {/* Share button */}
            <button 
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
            >
              <Share2 size={18} />
            </button>
          </div>
          
          {/* Thumbnail gallery - birdən çox şəkil olsaydı */}
          {/* <div className="flex space-x-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((_, index) => (
              <button 
                key={index} 
                className={`w-20 h-20 rounded-md border ${index === activeImage ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={product.imageUrl} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-contain p-1" 
                />
              </button>
            ))}
          </div> */}
        </div>

        {/* Məhsul məlumatları */}
        <div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Link 
                to={`/brands/${product.brand.toLowerCase()}`} 
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                {product.brand}
              </Link>
              <span className="mx-2 text-gray-300">•</span>
              <Link 
                to={`/products?category=${product.gender.toLowerCase()}`} 
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                {product.gender}
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            {/* Reytinq */}
            <div className="flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "w-5 h-5",
                      index < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
            </div>

            {/* Qiymət hissəsi */}
            <div className="flex items-center mt-2 space-x-3">
              <span className="text-2xl font-bold">{selectedPrice.toFixed(2)} ₼</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">{product.oldPrice.toFixed(2)} ₼</span>
              )}
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-4 py-4 mt-2 border-t border-b border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <Truck size={16} className="mr-2 text-gray-400" />
                <span>Bakı daxili pulsuz çatdırılma</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Award size={16} className="mr-2 text-gray-400" />
                <span>100% Orijinal məhsul</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Gift size={16} className="mr-2 text-gray-400" />
                <span>Hədiyyə paketləmə</span>
              </div>
            </div>

            {/* Məhsul növü seçimi (Atomayzer/Tam şüşə) */}
            {product.hasAtomizer && (
              <div className="mt-4">
                <p className="font-medium mb-3">Məhsul növü:</p>
                <div className="flex space-x-4">
                  <button
                    className={`flex items-center px-4 py-2 border rounded-md transition-all duration-200 ${
                      selectedType === 'full'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedType('full')}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    <span>Tam ({product.volume}ml)</span>
                    {selectedType === 'full' && <Check className="w-4 h-4 ml-2" />}
                  </button>
                  
                  <button
                    className={`flex items-center px-4 py-2 border rounded-md transition-all duration-200 ${
                      selectedType === 'atomizer'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedType('atomizer')}
                  >
                    <Droplet className="w-4 h-4 mr-2" />
                    <span>Atomayzer ({product.atomizerVolume}ml)</span>
                    {selectedType === 'atomizer' && <Check className="w-4 h-4 ml-2" />}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Atomayzer versiyası orjinal ətrin EasyPerfume eksklüziv şüşəsində mini nümunəsidir.
                </p>
              </div>
            )}

            {/* Miqdar */}
            <div className="mt-4">
              <p className="font-medium mb-3">Miqdar:</p>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-50 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-50 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Səbət və sevimli düymələri */}
            <div className="flex flex-wrap gap-4 mt-6">
              <Button
                variant="primary"
                className="flex-1 py-3 transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.97]"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {product.inStock ? 'Səbətə Əlavə Et' : 'Stokda Yoxdur'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleHeartClick}
                className={`p-3 transition-all duration-200 ${isInWishlist?.(product.id) ? 'text-red-500 hover:bg-red-50' : 'hover:bg-gray-50'}`}
              >
                <Heart 
                  className={cn(
                    "w-5 h-5",
                    isInWishlist?.(product.id) ? "fill-red-500" : "",
                    isInWishlist?.(product.id) ? "animate-heartBeat" : ""
                  )} 
                />
              </Button>
            </div>

            {/* Stok vəziyyəti */}
            <div className="mt-6">
              <p className="font-medium mb-2">Vəziyyət:</p>
              <div className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm",
                product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              )}>
                <span className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  product.inStock ? "bg-green-500" : "bg-red-500"
                )}></span>
                {product.inStock ? 'Stokda Var' : 'Stokda Yoxdur'}
              </div>
            </div>

            {/* Ətir qrupları */}
            {product.group && (
              <div className="mt-4">
                <p className="font-medium mb-2">Ətir qrupu:</p>
                <Link 
                  to={`/products?group=${product.group}`} 
                  className="inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  {product.group}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tablar hissəsi */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8 -mb-px">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('description')}
            >
              Məhsul haqqında
            </button>
            
            {product.notes && (
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notes'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('notes')}
              >
                Ətir notları
              </button>
            )}
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('reviews')}
            >
              Rəylər
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="animate-fadeIn">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}
          
          {activeTab === 'notes' && product.notes && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Üst notlar */}
              {product.notes.top && product.notes.top.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium mb-4">Üst Notlar</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {product.notes.top.map((note, index) => (
                      <li key={index} className="text-gray-600">{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Orta notlar */}
              {product.notes.middle && product.notes.middle.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium mb-4">Orta Notlar</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {product.notes.middle.map((note, index) => (
                      <li key={index} className="text-gray-600">{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Baza notları */}
              {product.notes.base && product.notes.base.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium mb-4">Baza Notlar</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {product.notes.base.map((note, index) => (
                      <li key={index} className="text-gray-600">{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Bu məhsul haqqında hələ rəy yazılmayıb.</p>
              <Button 
                variant="outline" 
                className="hover:text-primary hover:border-primary transition-colors"
              >
                İlk rəyi siz yazın
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Əlaqəli məhsullar */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Əlaqəli Məhsullar</h2>
          <ProductList products={relatedProducts} />
        </div>
      )}
    </div>
  );
};