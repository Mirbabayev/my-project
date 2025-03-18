import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';

const heroSlides = [
  {
    id: 1,
    title: "Premium parfümləri kəşf edin",
    subtitle: "EasyParfum ilə ən məşhur brendlərin orijinal ətirlərinə əlçatan qiymətlərlə sahib olun",
    image: "https://images.unsplash.com/photo-1592945403340-1ba1a4b7d934?auto=format&fit=crop&w=1400&q=80",
    ctaText: "İndi kəşf edin"
  },
  {
    id: 2,
    title: "Yeni gələn kolleksiyalar",
    subtitle: "2023-cü ilin ən yeni trendləri və ətirləri ilə tanış olun",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80",
    ctaText: "Yeni məhsullar"
  },
  {
    id: 3,
    title: "Hədiyyəlik setlər",
    subtitle: "Xüsusi günlər üçün ən yaxşı hədiyyə - seçilmiş ətir setləri",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=1400&q=80",
    ctaText: "Hədiyyələrə bax"
  }
];

const brands = [
  { name: 'Chanel', slug: 'chanel' },
  { name: 'Dior', slug: 'dior' },
  { name: 'Tom Ford', slug: 'tom-ford' },
  { name: 'Gucci', slug: 'gucci' },
  { name: 'YSL', slug: 'ysl' },
  { name: 'Jo Malone', slug: 'jo-malone' },
  { name: 'Armani', slug: 'armani' },
  { name: 'Hermès', slug: 'hermes' },
  { name: 'Versace', slug: 'versace' },
  { name: 'Burberry', slug: 'burberry' },
  { name: 'Prada', slug: 'prada' },
  { name: 'Bvlgari', slug: 'bvlgari' }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeGender, setActiveGender] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState<typeof products>([]);
  const [animateHero, setAnimateHero] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // CSS stili React-in içində təyin etmək üçün 
  const marqueeStyle = {
    animation: 'marquee 50s linear infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
  };
  
  const marqueeStyle2 = {
    animation: 'marquee2 50s linear infinite',
    animationDelay: '25s',
    animationPlayState: isPaused ? 'paused' : 'running',
  };
  
  // Keyframes üçün CSS əlavə et
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .brands-marquee {
        mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes marquee2 {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Slayd dəyişdirmə effektini idarə et
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateHero(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setAnimateHero(true);
      }, 300);
    }, 6000);
    setAnimateHero(true);
    return () => clearInterval(interval);
  }, []);
  
  // Cinsə görə məhsulları filtrləmə
  useEffect(() => {
    let filtered = [...products];
    
    if (activeGender !== 'all') {
      filtered = filtered.filter(product => product.gender === activeGender);
    }
    
    // Populyar məhsullar - reytinqə görə top 8
    filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 8);
    setVisibleProducts(filtered);
  }, [activeGender]);

  // Yeni məhsullar - ID'yə görə son əlavə olunmuş 4 məhsul
  const newProducts = [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 4);
    
  // Əvvəlki slayd
  const prevSlide = () => {
    setAnimateHero(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setAnimateHero(true);
    }, 300);
  };
  
  // Sonrakı slayd
  const nextSlide = () => {
    setAnimateHero(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setAnimateHero(true);
    }, 300);
  };

  return (
    <div>
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div 
          className={`relative h-[500px] transition-opacity duration-300 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-transform duration-500 ${animateHero ? 'translate-x-0' : '-translate-x-10'}`}>
                  {heroSlides[currentSlide].title}
                </h1>
                <p className={`text-lg mb-8 transition-transform duration-500 delay-100 ${animateHero ? 'translate-x-0' : '-translate-x-10'}`}>
                  {heroSlides[currentSlide].subtitle}
                </p>
                <Link
                  to="/products"
                  className={`inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-500 delay-200 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
                >
                  {heroSlides[currentSlide].ctaText}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Slayder naviqasiyası */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAnimateHero(false);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setAnimateHero(true);
                  }, 300);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slayder kontrolları */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Brendlər */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Brendlər</h2>
            <p className="text-gray-600">Dünyanın ən məşhur ətir brendləri</p>
          </div>
          <div className="relative">
            {/* Marquee effekti - daimi hərəkət edən brendlər */}
            <div 
              className="flex overflow-hidden py-4 brands-marquee"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex" style={marqueeStyle}>
                {brands.map((brand) => (
                  <Link 
                    key={brand.slug}
                    to={`/products?brand=${encodeURIComponent(brand.name)}`}
                    className="mx-4 px-8 py-4 bg-white shadow-sm hover:shadow-md rounded-lg transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center min-w-[150px]"
                  >
                    <span className="font-bold text-gray-800">{brand.name}</span>
                  </Link>
                ))}
              </div>
              <div className="flex" style={marqueeStyle2} aria-hidden="true">
                {brands.map((brand) => (
                  <Link 
                    key={`${brand.slug}-dup`}
                    to={`/products?brand=${encodeURIComponent(brand.name)}`}
                    className="mx-4 px-8 py-4 bg-white shadow-sm hover:shadow-md rounded-lg transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center min-w-[150px]"
                  >
                    <span className="font-bold text-gray-800">{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Kənar kölgələr */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/products" className="inline-block text-primary hover:underline font-medium">
              Bütün brendlərə bax
            </Link>
          </div>
        </div>
      </section>

      {/* Populyar məhsullar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Populyar məhsullar</h2>
            <Link to="/products" className="flex items-center text-primary hover:underline">
              Hamısına bax
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {/* Cins filterləri */}
          <div className="flex gap-3 mb-6">
            <Link 
              to="/products"
              className={`px-4 py-2 rounded-full text-sm ${
                activeGender === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveGender('all');
              }}
            >
              Hamısı
            </Link>
            <Link 
              to="/products?gender=kişi"
              className={`px-4 py-2 rounded-full text-sm ${
                activeGender === 'kişi' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveGender('kişi');
              }}
            >
              Kişi
            </Link>
            <Link 
              to="/products?gender=qadın"
              className={`px-4 py-2 rounded-full text-sm ${
                activeGender === 'qadın' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveGender('qadın');
              }}
            >
              Qadın
            </Link>
            <Link 
              to="/products?gender=uniseks"
              className={`px-4 py-2 rounded-full text-sm ${
                activeGender === 'uniseks' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveGender('uniseks');
              }}
            >
              Uniseks
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <Link 
                to={`/products/${product.id}`} 
                key={product.id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <div className="bg-gray-50 h-64 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-56 max-w-[80%] h-auto w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=Şəkil+yoxdur";
                        target.onerror = null; // Prevent infinite fallback loop
                      }}
                    />
                  </div>
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Bitib
                    </div>
                  )}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-primary mb-1">{product.brand}</h3>
                  <h2 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1">{product.name}</h2>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 capitalize">{product.gender} • {product.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-lg text-gray-900">{product.price} ₼</span>
                    <button className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 hover:bg-primary/90 transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Orta banner */}
      <section className="py-12 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">Limitli təklif</span>
              <h2 className="text-3xl font-bold mb-4">Xüsusi təkliflər</h2>
              <p className="text-gray-600 mb-6">
                Seçilmiş premium parfümlərə <span className="text-primary font-bold">30% endirim</span>. Məhdud sayda təklif, sadəcə bu həftə ərzində.
              </p>
              <Link
                to="/products"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                İndi alış-veriş edin
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg overflow-hidden shadow-lg relative">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-md">
                      <Star className="w-8 h-8 text-primary fill-primary/50" />
                    </div>
                    <h3 className="text-primary font-bold text-xl mb-2">Premium ətir kolleksiyası</h3>
                    <p className="text-gray-700 text-sm mb-4">Lüks və əl çatan qiymətlərlə unudulmaz qoxular</p>
                    <span className="inline-block bg-white/80 text-primary font-bold px-3 py-1 rounded-full text-sm">30% ENDİRİM</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yeni məhsullar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Yeni məhsullar</h2>
            <Link to="/products" className="flex items-center text-primary hover:underline">
              Hamısına bax
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <Link 
                to={`/products/${product.id}`} 
                key={product.id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <div className="bg-gray-50 h-64 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-56 max-w-[80%] h-auto w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=Şəkil+yoxdur";
                        target.onerror = null; // Prevent infinite fallback loop
                      }}
                    />
                  </div>
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Bitib
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                    Yeni
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-primary mb-1">{product.brand}</h3>
                  <h2 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1">{product.name}</h2>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 capitalize">{product.gender} • {product.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-lg text-gray-900">{product.price} ₼</span>
                    <button className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 hover:bg-primary/90 transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Üstünlüklərimiz */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Niyə EasyParfum seçməlisiniz?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4 transform transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Orijinal</h3>
              <p className="text-gray-600">Bütün məhsullar orijinallığına zəmanət verilir və birbaşa rəsmi distribütorlardan tədarük olunur.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4 transform transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sürətli Çatdırılma</h3>
              <p className="text-gray-600">Sifarişləriniz 1-3 iş günü ərzində ünvanınıza çatdırılır və çatdırılma prosesini izləyə bilərsiniz.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4 transform transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Təhlükəsiz Ödəniş</h3>
              <p className="text-gray-600">Bütün ödənişlər təhlükəsiz şəkildə həyata keçirilir və şəxsi məlumatlarınız qorunur.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}