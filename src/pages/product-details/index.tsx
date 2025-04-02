import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight, Clock, Gift } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedConcentration, setSelectedConcentration] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // URL-dən gələn ID ilə məhsulu tap
  const product = products.find(p => p.id === id);
  
  // Əgər məhsul tapılmazsa Ana səhifəyə yönləndir
  useEffect(() => {
    if (!product) {
      console.log("Məhsul tapılmadı, ID:", id);
      navigate('/');
    }
  }, [product, navigate, id]);
  
  // Məhsul tapılmadığı halda
  if (!product) {
    return <div className="container mx-auto px-4 py-12 text-center">Məhsul tapılmadı</div>;
  }
  
  // Başlanğıcda məhsulun öz ölçüsü və konsentrasiyasını seç
  useEffect(() => {
    if (product) {
      setSelectedSize(product.size);
      setSelectedConcentration(product.concentration);
      setCalculatedPrice(product.price);
    }
  }, [product]);
  
  // Həcm və konsentrasiyaya görə qiyməti hesabla
  useEffect(() => {
    if (!product) return;
    
    let basePrice = product.price;
    let sizeMultiplier = 1;
    let concMultiplier = 1;
    
    // Həcm əmsalını təyin et
    switch (selectedSize) {
      case '30ml':
        sizeMultiplier = 0.7;
        break;
      case '50ml':
        sizeMultiplier = 1;
        break;
      case '100ml':
        sizeMultiplier = 1.8;
        break;
      case '200ml':
        sizeMultiplier = 3;
        break;
      default:
        sizeMultiplier = 1;
    }
    
    // Konsentrasiya əmsalını təyin et
    switch (selectedConcentration) {
      case 'EDT':
        concMultiplier = 0.8;
        break;
      case 'EDP':
        concMultiplier = 1.2;
        break;
      case 'Parfum':
        concMultiplier = 1.5;
        break;
      case 'Cologne':
        concMultiplier = 0.7;
        break;
      default:
        concMultiplier = 1;
    }
    
    // Yeni qiyməti hesabla və yuvarlaqlaşdır
    const newPrice = Math.round(basePrice * sizeMultiplier * concMultiplier);
    setCalculatedPrice(newPrice);
    
  }, [selectedSize, selectedConcentration, product]);
  
  // Eyni cinsdə olan məhsulları göstər (oxşar məhsullar)
  const similarProducts = products
    .filter(p => p.gender === product.gender && p.id !== product.id)
    .slice(0, 4);
  
  // Miqdarı artır
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Miqdarı azalt
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Seçilmişlərə əlavə et/çıxar
  const toggleWishlist = () => {
    setIsInWishlist(prev => !prev);
    // TODO: Faktiki əlavə etmə məntiqini əlavə et
  };
  
  // Səbətə əlavə et
  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: calculatedPrice,
      size: selectedSize,
      concentration: selectedConcentration,
      quantity: quantity
    };
    
    // Burada faktiki səbətə əlavə etmə məntiqini əlavə etmək olar
    console.log('Məhsul səbətə əlavə edildi:', cartItem);
    
    // Həmçinin burada kontekst/redux/local storage istifadə edə bilərsiniz
    alert(`${product.brand} ${product.name} səbətə əlavə edildi!`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-primary">Ana səhifə</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/products" className="hover:text-primary">Parfümlər</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-primary">{product.name}</span>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Məhsul şəkli */}
        <div>
          <div className="product-detail-image bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-2 flex items-center justify-center h-auto max-h-[400px] overflow-hidden transition-all duration-300 hover:shadow-md group">
            <img 
              src={product.image} 
              alt={`${product.brand} ${product.name} ətri`}
              title={`${product.brand} ${product.name}`}
              className="product-image max-h-[350px] max-w-[90%] h-auto w-auto object-contain transition-all duration-500 group-hover:scale-[1.05]" 
              style={{ mixBlendMode: 'multiply' }}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://dummyimage.com/400x400/f0f0f0/333333.png&text=Şəkil+yoxdur";
                target.onerror = null; // Prevent infinite fallback loop
              }}
            />
          </div>
        </div>
        
        {/* Məhsul detalları */}
        <div>
          <div className="mb-2 flex gap-2 flex-wrap">
            <span className="bg-accent/80 text-primary px-3 py-1 rounded-md text-xs font-medium inline-block">
              {product.gender === 'kişi' ? 'Kişi' : product.gender === 'qadın' ? 'Qadın' : 'Uniseks'}
            </span>
            {product.inStock ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium inline-block">
                Stokda var
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-medium inline-block">
                Stokda yoxdur
              </span>
            )}
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-medium inline-block">
              {product.concentration}
            </span>
          </div>
          
          <div className="text-lg text-primary font-medium mb-1">{product.brand}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-600">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-500">{product.popularity}% məşhurluq</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary mb-4">{calculatedPrice} ₼</div>
            {calculatedPrice !== product.price && (
              <div className="text-sm text-gray-500 mb-4">
                <span className="line-through">{product.price} ₼</span>
                <span className="ml-2 text-green-600 font-medium">
                  {calculatedPrice > product.price ? '+' : '-'}
                  {Math.abs(Math.round((calculatedPrice - product.price) / product.price * 100))}%
                </span>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <p className={`text-gray-700 leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
              {product.description}
            </p>
            <button 
              onClick={() => setShowFullDescription(!showFullDescription)} 
              className="text-primary hover:underline text-sm mt-1"
            >
              {showFullDescription ? 'Daha az göstər' : 'Daha ətraflı'}
            </button>
          </div>
          
          {/* Ölçü seçimi */}
          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Həcm seçimi</span>
            <div className="flex flex-wrap gap-2">
              {['30ml', '50ml', '100ml', '200ml'].map((size, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md px-4 py-1.5 text-sm transition-all ${
                    size === selectedSize 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Konsentrasiya seçimi */}
          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Konsentrasiya</span>
            <div className="flex flex-wrap gap-2">
              {['EDT', 'EDP', 'Parfum', 'Cologne'].map((conc, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedConcentration(conc)}
                  className={`border rounded-md px-4 py-1.5 text-sm transition-all ${
                    conc === selectedConcentration 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  {conc}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <span className="text-sm font-semibold text-gray-700 mr-4">Miqdar</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-1.5 border-r border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center py-1.5">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="px-3 py-1.5 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={addToCart}
                className="parfumbar-btn flex-1 flex items-center justify-center gap-2 py-2.5"
              >
                <ShoppingBag className="w-5 h-5" />
                Səbətə əlavə et
              </button>
              <button 
                onClick={toggleWishlist}
                className={`parfumbar-btn-outline flex items-center justify-center gap-2 py-2.5 ${
                  isInWishlist ? 'bg-primary/5 text-primary' : ''
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-primary' : ''}`} />
                {isInWishlist ? 'Seçilmişlərdədir' : 'Seçilmişlərə əlavə et'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Məhsul haqqında */}
      <section className="my-4 bg-gradient-to-r from-gray-50 to-accent/10 p-3 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <ShoppingBag className="h-4 w-4 text-primary" />
          </span>
          Parfüm Detayları
        </h2>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="bg-white p-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-accent/30 rounded-lg p-2">
                <h4 className="text-sm text-gray-500 mb-1">Həcm</h4>
                <p className="font-medium">{selectedSize}</p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2">
                <h4 className="text-sm text-gray-500 mb-1">Konsentrasiya</h4>
                <p className="font-medium">{selectedConcentration}</p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2">
                <h4 className="text-sm text-gray-500 mb-1">Brend</h4>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2">
                <h4 className="text-sm text-gray-500 mb-1">Əsas qrup</h4>
                <p className="font-medium">
                  {product.gender === 'kişi' ? 'Kişi ətirləri' : product.gender === 'qadın' ? 'Qadın ətirləri' : 'Uniseks ətirləri'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Xüsusiyyətlər */}
      <section className="my-4 bg-gradient-to-r from-accent/5 to-accent/20 p-3 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Star className="h-4 w-4 text-primary" />
          </span>
          Xüsusiyyətlər
        </h2>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="bg-white p-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <p className="text-gray-700 leading-relaxed mb-3">
              {product.gender === 'kişi' 
                ? `${product.brand} ${product.name} kişi ətirləri arasında özünəməxsus yeri olan, ${selectedConcentration} konsentrasiyasına sahib unikal bir parfümdür.` 
                : product.gender === 'qadın' 
                ? `${product.brand} ${product.name} qadın ətirləri arasında seçilən, ${selectedConcentration} konsentrasiyasına sahib zərif bir parfümdür.`
                : `${product.brand} ${product.name} uniseks ətirlər arasında öz yerini tutmuş, ${selectedConcentration} konsentrasiyasına sahib universal bir parfümdür.`}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-accent/30 rounded-lg p-2">
                <h4 className="text-sm text-gray-500 mb-1">Cins</h4>
                <p className="font-medium">
                  {product.gender === 'kişi' ? 'Kişi' : product.gender === 'qadın' ? 'Qadın' : 'Uniseks'}
                </p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2">
                <h4 className="text-sm text-gray-500 mb-1">Reytinq</h4>
                <p className="font-medium flex items-center">
                  {product.rating} <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-1" />
                </p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2 col-span-2">
                <h4 className="text-sm text-gray-500 mb-1">Populyarlıq</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${product.popularity}%` }}></div>
                </div>
                <p className="text-xs text-right mt-1 text-gray-500">{product.popularity}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ətir notları */}
      <section className="my-4 bg-gradient-to-r from-gray-50 to-accent/10 p-3 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Star className="h-4 w-4 text-primary" />
          </span>
          Ətir Notları
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400"></div>
            <div className="pl-3">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Üst Notlar</h3>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {product.notes.top.map((note, index) => (
                  <span 
                    key={`top-${index}`} 
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-gray-700 text-xs leading-relaxed">
                  Üst notlar ətirin ilk təəssüratını yaradır, 15-30 dəqiqə ərzində hiss olunur.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <div className="pl-3">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Orta Notlar</h3>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {product.notes.middle.map((note, index) => (
                  <span 
                    key={`mid-${index}`} 
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-gray-700 text-xs leading-relaxed">
                  Orta notlar ətirin "ürəyi" sayılır və 30 dəqiqə ilə 3-4 saat arasında hiss olunur.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gray-700"></div>
            <div className="pl-3">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Baza Notlar</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.notes.base.map((note, index) => (
                  <span 
                    key={`base-${index}`} 
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                Ətirin təməlini təşkil edən, ən uzun qalan dərin notlar. 4 saatdan 24 saata qədər davam edən bu notlar, ətirin yaddaqalan son akkordlarını müəyyən edir.
              </p>

              <div className="mt-3 bg-accent/30 rounded-lg p-2">
                <h4 className="text-sm text-gray-500 mb-1">Davamlılıq</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gray-700 h-2.5 rounded-full" style={{ width: `85%` }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>4 saat</span>
                  <span>24 saat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* İstifadə məsləhətləri */}
      <section className="my-4 bg-white p-3 rounded-xl shadow-sm border border-accent/30">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Clock className="h-4 w-4 text-primary" />
          </span>
          İstifadə Məsləhətləri
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-1">İstifadə Zamanı</h3>
              <p className="text-gray-700 text-sm">
                {product.gender === 'kişi' 
                  ? 'Axşam saatlarında istifadə üçün ideal seçimdir, xüsusilə rəsmi görüşlər və xüsusi gecələr üçün.' 
                  : product.gender === 'qadın' 
                  ? 'Həm gündüz həm də axşam istifadə üçün uyğundur, xüsusi gün və tədbirlər üçün ideal seçimdir.'
                  : 'Hər zaman istifadə edilə bilən universal bir ətrdir, gündəlik və xüsusi günlər üçün uyğundur.'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Mövsüm</h3>
              <p className="text-gray-700 text-sm">
                {[...product.notes.top, ...product.notes.middle, ...product.notes.base].some(note => 
                  ['Sitrus', 'Lavanda', 'Bergamot', 'Limon'].includes(note)
                ) 
                  ? 'Yaz və yay aylarında istifadə üçün ideal seçimdir, təravətli notları ilə ferahlıq bəxş edir.' 
                  : 'Payız və qış aylarında istifadə üçün uyğundur, isti və dərin notları ilə soyuq havalarda rahatlıq verir.'}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Oxşar məhsullar */}
      <section className="my-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Heart className="h-4 w-4 text-primary" />
          </span>
          Bənzər məhsullar
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;