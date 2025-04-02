import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight, Heart, ArrowRight, ArrowLeft, TrendingUp, Clock, Gift, Truck, Shield, Search, Filter, User, Settings } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';
import { useAuth } from '../../lib/auth-context';

// Yeni hero slide
const heroSlides = [
  {
    title: "Prada Luna Rossa Black",
    subtitle: "Experience the elegance of Prada",
    image: "/images/perfumes/perfume1.jpg",
    cta: "Discover Now"
  },
  {
    title: "Jean Paul Gaultier Le Male Elixir",
    subtitle: "A bold fragrance for the modern man",
    image: "/images/perfumes/perfume2.jpg",
    cta: "View Collection"
  },
  {
    title: "Floris London",
    subtitle: "Timeless elegance from London",
    image: "/images/perfumes/perfume3.jpg",
    cta: "Seasonal Fragrances"
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
  { name: 'Qadın ətirləri', slug: 'qadin', image: '/images/perfumes/perfume1.jpg' },
  { name: 'Kişi ətirləri', slug: 'kisi', image: '/images/perfumes/perfume2.jpg' },
  { name: 'Uniseks ətirlər', slug: 'uniseks', image: '/images/perfumes/perfume3.jpg' },
  { name: 'Mövsümi kolleksiyalar', slug: 'movsumi', image: '/images/perfumes/perfume1.jpg' },
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
  const { user, isAdmin } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [adminCheckDone, setAdminCheckDone] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeGender, setActiveGender] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState<typeof products>([]);
  const [animateHero, setAnimateHero] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(true);
  
  // Admin rolunu yoxlayırıq
  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const admin = await isAdmin();
        setIsAdminUser(admin);
      } catch (error) {
        console.error('Admin rolu yoxlanılarkən xəta:', error);
        setIsAdminUser(false);
      } finally {
        setAdminCheckDone(true);
      }
    };
    
    if (user) {
      checkAdminRole();
    } else {
      setAdminCheckDone(true);
    }
  }, [isAdmin, user]);
  
  // Şəkillərin yüklənməsini yoxla
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = heroSlides.map(slide => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);
  
  // Parallax effekti üçün scroll pozisiyasını izləyirik
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      }, 5000);
    }, 5000);
    
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
      <section className="relative overflow-hidden">
        <div 
          className={`relative h-[70vh] transition-opacity duration-700 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${heroSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Admin icon - yalnız admin istifadəçilər üçün */}
          {isAdminUser && adminCheckDone && (
            <Link 
              to="/admin" 
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors"
              title="Admin Panel"
            >
              <Settings size={18} className="text-white" />
            </Link>
          )}
          
          {/* Daxil olmaq üçün ikona - yalnız daxil olmayanlar üçün */}
          {!user && adminCheckDone && (
            <Link 
              to="/auth/login" 
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors"
              title="Daxil ol"
            >
              <User size={18} className="text-white" />
            </Link>
          )}
          
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
            style={{ 
              transform: `translateY(${scrollPosition * 0.2}px)` 
            }}
          >
            <div className="max-w-4xl mx-auto">
              <h1 
                className="text-white text-3xl md:text-5xl font-didot uppercase tracking-wider mb-4"
                style={{ 
                  opacity: 1 - scrollPosition * 0.002,
                }}
              >
                {heroSlides[currentSlide].title}
              </h1>
              <p 
                className="text-white/90 text-lg md:text-xl font-light mb-8"
                style={{ 
                  opacity: 1 - scrollPosition * 0.003,
                }}
              >
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link 
                to="/products" 
                className="bvlgari-btn"
              >
                {heroSlides[currentSlide].cta}
              </Link>
            </div>
          </div>
          
          {/* Slide control buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
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
                className={`w-2 h-2 ${
                  currentSlide === index ? 'bg-white' : 'bg-white/40'
                } transition-colors duration-300`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Brendlər markaları */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="deluxe-section-title">
            Premium Brendlər
          </h2>
        </div>
        
        <div className="brands-marquee">
          <div 
            className="flex justify-around items-center py-6 gap-8"
            style={marqueeStyle}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {brands.concat(brands).map((brand, index) => (
              <Link 
                key={`${brand.slug}-${index}`}
                to={`/brands/${brand.slug}`}
                className="font-didot text-xl md:text-2xl uppercase text-gold-600 hover:text-primary transition-colors duration-300 tracking-widest px-6 whitespace-nowrap"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kategoriyalar */}
      <section className="py-16 bg-gold-100">
        <div className="container mx-auto px-4">
          <h2 className="deluxe-section-title">
            Ətir Kateqoriyaları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group relative overflow-hidden block h-[300px]"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <img 
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-didot uppercase tracking-widest bg-black/40 px-6 py-4 group-hover:bg-primary/80 transition-colors duration-500">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Populyar məhsullar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="deluxe-section-title">
            Populyar Ətirlər
          </h2>
          
          <div className="flex items-center justify-center mb-10">
            <div className="inline-flex border-b border-gold-200 p-1">
              <button
                className={`px-6 py-2 text-sm uppercase tracking-wider ${
                  activeGender === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                }`}
                onClick={() => setActiveGender('all')}
              >
                Hamısı
              </button>
              <button
                className={`px-6 py-2 text-sm uppercase tracking-wider ${
                  activeGender === 'qadın' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                }`}
                onClick={() => setActiveGender('qadın')}
              >
                Qadın
              </button>
              <button
                className={`px-6 py-2 text-sm uppercase tracking-wider ${
                  activeGender === 'kişi' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                }`}
                onClick={() => setActiveGender('kişi')}
              >
                Kişi
              </button>
              <button
                className={`px-6 py-2 text-sm uppercase tracking-wider ${
                  activeGender === 'uniseks' ? 'text-primary border-b-2 border-primary' : 'text-gold-700'
                }`}
                onClick={() => setActiveGender('uniseks')}
              >
                Uniseks
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="bvlgari-btn-outline">
              Bütün məhsulları kəşf et
            </Link>
          </div>
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