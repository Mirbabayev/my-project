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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Ana səhifə</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/products" className="hover:text-primary">Parfümlər</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-primary">{product.name}</span>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Məhsul şəkli */}
        <div>
          <div className="product-detail-image bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-10 flex items-center justify-center h-[500px] overflow-hidden transition-all duration-300 hover:shadow-md group">
            <img 
              src={product.image} 
              alt={`${product.brand} ${product.name} ətri`}
              title={`${product.brand} ${product.name}`}
              className="product-image max-h-[450px] max-w-[90%] h-auto w-auto object-contain transition-all duration-500 group-hover:scale-[1.05]" 
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
          <div className="mb-2">
            <span className="bg-accent/80 text-primary px-3 py-1 rounded-md text-xs font-medium inline-block">
              {product.gender === 'kişi' ? 'Kişi' : product.gender === 'qadın' ? 'Qadın' : 'Uniseks'}
            </span>
            {product.inStock ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium inline-block ml-2">
                Stokda var
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-medium inline-block ml-2">
                Stokda yoxdur
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
          <div className="text-lg text-primary font-medium mb-4">{product.brand}</div>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-600">{product.rating}</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-primary mb-8">{product.price} ₼</div>
          
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Ətir haqqında:</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-accent/30 rounded-lg p-4 text-center">
              <h4 className="text-sm text-gray-500 mb-1">Həcm</h4>
              <p className="font-medium">{product.size}</p>
            </div>
            <div className="bg-accent/30 rounded-lg p-4 text-center">
              <h4 className="text-sm text-gray-500 mb-1">Konsentrasiya</h4>
              <p className="font-medium">{product.concentration}</p>
            </div>
            <div className="bg-accent/30 rounded-lg p-4 text-center">
              <h4 className="text-sm text-gray-500 mb-1">Cins</h4>
              <p className="font-medium">
                {product.gender === 'kişi' ? 'Kişi' : product.gender === 'qadın' ? 'Qadın' : 'Uniseks'}
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-sm font-semibold text-gray-700 mr-4">Miqdar</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-2 border-r border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center py-2">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="px-3 py-2 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="parfumbar-btn flex-1 flex items-center justify-center gap-2 py-3">
                <ShoppingBag className="w-5 h-5" />
                Səbətə əlavə et
              </button>
              <button 
                onClick={toggleWishlist}
                className={`parfumbar-btn-outline flex items-center justify-center gap-2 py-3 ${
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
      <section className="my-12 bg-gradient-to-r from-gray-50 to-accent/10 p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <ShoppingBag className="h-4 w-4 text-primary" />
          </span>
          Məhsul haqqında
        </h2>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex flex-col">
              <h3 className="text-lg font-medium text-primary mb-3 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-primary/70" />
                Parfüm Detayları
              </h3>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-accent/30 rounded-lg p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Həcm</h4>
                    <p className="font-medium">{product.size}</p>
                  </div>
                  <div className="bg-accent/30 rounded-lg p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Konsentrasiya</h4>
                    <p className="font-medium">{product.concentration}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex flex-col">
              <h3 className="text-lg font-medium text-primary mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary/70" />
                Xüsusiyyətlər
              </h3>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.gender === 'kişi' 
                    ? `${product.brand} ${product.name} kişi ətirləri arasında özünəməxsus yeri olan, ${product.concentration} konsentrasiyasına sahib unikal bir parfümdür.` 
                    : product.gender === 'qadın' 
                    ? `${product.brand} ${product.name} qadın ətirləri arasında seçilən, ${product.concentration} konsentrasiyasına sahib zərif bir parfümdür.`
                    : `${product.brand} ${product.name} uniseks ətirlər arasında öz yerini tutmuş, ${product.concentration} konsentrasiyasına sahib universal bir parfümdür.`}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-accent/30 rounded-lg p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Cins</h4>
                    <p className="font-medium">
                      {product.gender === 'kişi' ? 'Kişi' : product.gender === 'qadın' ? 'Qadın' : 'Uniseks'}
                    </p>
                  </div>
                  <div className="bg-accent/30 rounded-lg p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Reytinq</h4>
                    <p className="font-medium flex items-center">
                      {product.rating} <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-1" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex flex-col">
              <h3 className="text-lg font-medium text-primary mb-3 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-primary/70" />
                Əsas Üstünlüklər
              </h3>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bu parfüm öz kateqoriyasında {product.popularity}% məşhurluq dərəcəsinə malikdir. {product.brand} markalı bu ətir uzunömürlü və cəlbedici aromata sahibdir.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-accent/30 rounded-lg p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Populyarlıq</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${product.popularity}%` }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500">{product.popularity}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ətir notları */}
      <section className="my-12 bg-gradient-to-r from-gray-50 to-accent/10 p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Star className="h-4 w-4 text-primary" />
          </span>
          Ətir Notları
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400"></div>
            <div className="pl-3">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Üst Notlar</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.notes.top.map((note, index) => (
                  <span 
                    key={`top-${index}`} 
                    className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                Ətirin ilk təəssüratını yaradan, dərhal hiss edilən, lakin tez uçan notlar. İlk spreyləndikdən sonra 15-30 dəqiqə ərzində hiss olunan bu notlar ətirin başlanğıc təəssüratını formalaşdırır.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <div className="pl-3">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Orta Notlar</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.notes.middle.map((note, index) => (
                  <span 
                    key={`mid-${index}`} 
                    className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                Ətirin "ürəyi" sayılan, üst notlar uçduqdan sonra ortaya çıxan əsas notlar. Təxminən 30 dəqiqə ilə 3-4 saat arasında hiss olunan bu notlar ətirin əsas xarakterini formalaşdırır.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gray-700"></div>
            <div className="pl-3">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Baza Notlar</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.notes.base.map((note, index) => (
                  <span 
                    key={`base-${index}`} 
                    className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                Ətirin təməlini təşkil edən, ən uzun qalan dərin notlar. 4 saatdan 24 saata qədər davam edən bu notlar, ətirin yaddaqalan son akkordlarını müəyyən edir və dərinizdə ən uzun müddət qalan qoxudur.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* İstifadə məsləhətləri */}
      <section className="my-12 bg-white p-8 rounded-xl shadow-sm border border-accent/30">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">İstifadə Məsləhətləri</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">İstifadə Zamanı</h3>
              <p className="text-gray-700">
                {product.gender === 'kişi' 
                  ? 'Axşam saatlarında istifadə üçün ideal seçimdir, xüsusilə rəsmi görüşlər və xüsusi gecələr üçün.' 
                  : product.gender === 'qadın' 
                  ? 'Həm gündüz həm də axşam istifadə üçün uyğundur, xüsusi gün və tədbirlər üçün ideal seçimdir.'
                  : 'Hər zaman istifadə edilə bilən universal bir ətrdir, gündəlik və xüsusi günlər üçün uyğundur.'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mövsüm</h3>
              <p className="text-gray-700">
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
      <div className="my-16">
        <h2 className="parfumbar-heading text-2xl mb-8">Bənzər məhsullar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;