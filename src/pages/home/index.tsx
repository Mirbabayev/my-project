import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight, Heart, ArrowRight, ArrowLeft, TrendingUp, Clock, Gift, Truck, Shield, Search, Filter } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';

// Yeni hero slide
const heroSlides = [
  {
    id: 1,
    title: "Ətirlərin Sirli Dünyası",
    subtitle: "Sizin üçün ən gözəl qoxuları kəşf edin",
    image: "https://images.unsplash.com/photo-1612207826827-ebfc4ad73166?auto=format&fit=crop&w=1400&q=80",
    ctaText: "İndi kəşf edin"
  },
  {
    id: 2,
    title: "Premium Parfümler",
    subtitle: "Sizin stilinizi tamamlayan ətirlər",
    image: "https://images.unsplash.com/photo-1601295452898-78a8dd904633?auto=format&fit=crop&w=1400&q=80",
    ctaText: "Kolleksiyaya baxın"
  },
  {
    id: 3,
    title: "Mövsümi Kolleksiyalar",
    subtitle: "Hər mövsümə uyğun ətir seçimləri",
    image: "https://images.unsplash.com/photo-1615036228987-50ee08bd7ff0?auto=format&fit=crop&w=1400&q=80",
    ctaText: "Mövsümi ətirlər"
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

// Yeni kategoriyalar
const categories = [
  { name: 'Qadın ətirləri', slug: 'qadin', image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kişi ətirləri', slug: 'kisi', image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=600&q=80' },
  { name: 'Uniseks ətirlər', slug: 'uniseks', image: 'https://images.unsplash.com/photo-1611401677282-be6594e6cbff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mövsümi kolleksiyalar', slug: 'movsumi', image: 'https://images.unsplash.com/photo-1590736969596-dd610e3e013f?auto=format&fit=crop&w=600&q=80' },
];

// Qoxu tipləri
const fragranceTypes = [
  { name: 'Çiçəkli', slug: 'floral' },
  { name: 'Odunsu', slug: 'woody' },
  { name: 'Sitrus', slug: 'citrus' },
  { name: 'Oriental', slug: 'oriental' },
  { name: 'Fougere', slug: 'fougere' }
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
    
  // Top satılan məhsullar
  const topSelling = [...products]
    .sort((a, b) => b.popularity - a.popularity)
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
    <div className="bg-white">
      {/* Hero section */}
      <section className="relative overflow-hidden shadow-md">
        <div 
          className={`relative h-[600px] transition-opacity duration-300 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-black/40 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-transform duration-500 ${animateHero ? 'translate-x-0' : '-translate-x-10'}`}>
                  {heroSlides[currentSlide].title}
                </h1>
                <p className={`text-xl mb-8 transition-transform duration-500 delay-100 ${animateHero ? 'translate-x-0' : '-translate-x-10'}`}>
                  {heroSlides[currentSlide].subtitle}
                </p>
                <Link
                  to="/products"
                  className={`parfumbar-btn inline-block transition-all duration-500 delay-200 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
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
                  currentSlide === index ? 'bg-primary scale-150' : 'bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slayder kontrolları */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-primary/80 p-3 rounded-full text-white transition-colors"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-primary/80 p-3 rounded-full text-white transition-colors"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Axtarış və Filter */}
      <section className="py-6 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Ətir axtarın..." 
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <button className="parfumbar-category whitespace-nowrap flex items-center gap-1">
                <Filter className="w-4 h-4" />
                Qiymət
              </button>
              <button className="parfumbar-category whitespace-nowrap">
                Marka
              </button>
              {fragranceTypes.map(type => (
                <button key={type.slug} className="parfumbar-category whitespace-nowrap">
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kateqoriyalar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="parfumbar-heading text-2xl">Kateqoriyalar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="parfumbar-card group overflow-hidden rounded-lg relative h-60 shadow-md"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm mt-1 opacity-90">Bütün kolleksiyaya baxın</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ən Populyar Ətirlər Bölməsi */}
      <section className="py-12 bg-gradient-to-r from-accent/20 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="parfumbar-heading text-3xl mb-2">Ən Populyar Ətirlər</h2>
              <p className="text-gray-600">Müştərilərimizin ən çox sevdiyi ətirlər</p>
            </div>
            <Link to="/products" className="parfumbar-btn-outline hidden md:flex items-center gap-2">
              Hamısına bax
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Cins filterləri */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
            <button 
              className={`parfumbar-category ${
                activeGender === 'all' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : ''
              }`}
              onClick={() => setActiveGender('all')}
            >
              Hamısı
            </button>
            <button 
              className={`parfumbar-category ${
                activeGender === 'kişi' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : ''
              }`}
              onClick={() => setActiveGender('kişi')}
            >
              Kişi
            </button>
            <button 
              className={`parfumbar-category ${
                activeGender === 'qadın' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : ''
              }`}
              onClick={() => setActiveGender('qadın')}
            >
              Qadın
            </button>
            <button 
              className={`parfumbar-category ${
                activeGender === 'uniseks' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : ''
              }`}
              onClick={() => setActiveGender('uniseks')}
            >
              Uniseks
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Link to="/products" className="parfumbar-btn-outline inline-flex items-center gap-2">
              Hamısına bax
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Orta banner - Mövsümi Kolleksiya */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">Mövsüm Trendi</span>
              <h2 className="text-3xl font-bold mb-4">Payız/Qış Kolleksiyası</h2>
              <p className="text-gray-600 mb-6">
                Payızın isti notları və qışın əsrarəngiz rayihələri ilə zənginləşdirilmiş yeni kolleksiyamızı kəşf edin. <span className="text-primary font-bold">Məhdud sayda</span> təklif edilir.
              </p>
              <Link
                to="/products?collection=seasonal"
                className="parfumbar-btn"
              >
                Kolleksiyaya baxın
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="parfumbar-card w-80 h-80 bg-gradient-to-br from-primary/5 to-primary/20 relative border border-white/20 shadow-lg transform rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1616704469824-55aa076c1322?auto=format&fit=crop&w=600&q=80" 
                  alt="Mövsümi kolleksiya" 
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-lg opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-tr from-primary/70 to-transparent rounded-lg">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-md">
                      <Star className="w-8 h-8 text-primary fill-primary/20" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">Mövsümi Qoxular</h3>
                    <p className="text-white/90 text-sm mb-4">Unudulmaz anlar üçün əsrarəngiz notlar</p>
                    <span className="inline-block bg-white/80 text-primary font-bold px-4 py-2 rounded-md text-sm">
                      YENİ KOLLEKSİYA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brendlər Bölməsi */}
      <section className="py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="parfumbar-heading text-3xl mb-2">Premium Brendlər</h2>
              <p className="text-gray-600">Dünyanın ən lüks ətir brendləri</p>
            </div>
          </div>
          
          <div className="relative">
            {/* Marquee effekti - daimi hərəkət edən brendlər */}
            <div 
              className="flex overflow-hidden py-6 brands-marquee"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex" style={marqueeStyle}>
                {brands.map((brand) => (
                  <Link 
                    key={brand.slug}
                    to={`/products?brand=${encodeURIComponent(brand.name)}`}
                    className="parfumbar-card mx-4 px-8 py-6 flex items-center justify-center min-w-[170px] border-2 border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="font-bold text-gray-800 text-lg">{brand.name}</span>
                  </Link>
                ))}
              </div>
              <div className="flex" style={marqueeStyle2} aria-hidden="true">
                {brands.map((brand) => (
                  <Link 
                    key={`${brand.slug}-dup`}
                    to={`/products?brand=${encodeURIComponent(brand.name)}`}
                    className="parfumbar-card mx-4 px-8 py-6 flex items-center justify-center min-w-[170px] border-2 border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="font-bold text-gray-800 text-lg">{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Kənar kölgələr */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
        </div>
      </section>

      {/* Yeni Gələnlər Bölməsi */}
      <section className="py-12 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="parfumbar-heading text-3xl mb-2">Yeni Gələnlər</h2>
              <p className="text-gray-600">Ən son əlavə edilən ətirlər</p>
            </div>
            <Link to="/products?sort=newest" className="parfumbar-btn-outline hidden md:flex items-center gap-2">
              Hamısına baxın
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Link to="/products?sort=newest" className="parfumbar-btn-outline inline-flex items-center gap-2">
              Hamısına baxın
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Üstünlüklərimiz */}
      <section className="py-16 bg-gradient-to-b from-white to-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="parfumbar-heading text-3xl text-center mb-12">Niyə bizi seçməlisiniz?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Orijinal</h3>
              <p className="text-gray-600">Bütün məhsullar orijinallığına zəmanət verilir və birbaşa rəsmi distribütorlardan tədarük olunur.</p>
            </div>
            
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sürətli Çatdırılma</h3>
              <p className="text-gray-600">Sifarişləriniz 1-3 iş günü ərzində ünvanınıza çatdırılır və çatdırılma prosesini izləyə bilərsiniz.</p>
            </div>
            
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <Gift className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pulsuz Nümunələr</h3>
              <p className="text-gray-600">Hər sifarişlə birlikdə yeni kolleksiyadan pulsuz ətir nümunələri hədiyyə edilir.</p>
            </div>
            
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Təhlükəsiz Ödəniş</h3>
              <p className="text-gray-600">Bütün ödənişlər təhlükəsiz şəkildə həyata keçirilir və şəxsi məlumatlarınız qorunur.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}