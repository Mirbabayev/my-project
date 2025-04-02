import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight, Heart, ArrowRight, ArrowLeft, TrendingUp, Clock, Gift, Truck, Shield, Search, Filter, User, Settings } from 'lucide-react';
import { products } from '../../data/products';
import { useAuth } from '../../lib/auth-context';

// Komponentləri lazy load ilə yükləyək
const ProductCard = lazy(() => import('../../components/product-card').then(mod => ({ default: mod.ProductCard })));

// Hero slide-ların şəkil yollarını və ölçülərini optimallaşdıraq
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

// Kategoriyaları kiçik şəkillərlə yükləyək
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
        if (user) {
          const admin = await isAdmin();
          setIsAdminUser(admin);
        }
      } catch (error) {
        console.error('Admin rolu yoxlanılarkən xəta:', error);
        setIsAdminUser(false);
      } finally {
        setAdminCheckDone(true);
      }
    };
    
    checkAdminRole();
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
      <section className="relative overflow-hidden h-[40vh] sm:h-[45vh] md:h-[50vh]">
        <div 
          className={`relative h-full w-full transition-opacity duration-500 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${heroSlides[currentSlide].image})`,
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
          
          {/* Hero məzmunu */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-xl px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-didot font-thin text-white mb-1 sm:mb-2">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 font-light max-w-md mx-auto">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link 
                to="/products" 
                className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 px-4 sm:px-6 py-2 text-sm sm:text-base uppercase tracking-wider transition-colors"
              >
                {heroSlides[currentSlide].cta}
              </Link>
            </div>
          </div>
          
          {/* Slayd indikatorları */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
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
      
      {/* Premium Brendlər Bölməsi */}
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <h2 className="deluxe-section-title text-2xl sm:text-3xl">
            Premium Brendlər
          </h2>
          
          <div className="brands-marquee overflow-hidden">
            <div 
              className="flex justify-around items-center py-4 gap-8 sm:gap-10"
              style={marqueeStyle}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {brands.concat(brands).map((brand, index) => (
                <Link 
                  key={`${brand.slug}-${index}`}
                  to={`/products?brand=${brand.slug}`}
                  className="font-didot text-xl sm:text-2xl font-bold uppercase text-gold-600 hover:text-primary transition-colors duration-300 tracking-widest whitespace-nowrap hover:scale-110 transition-transform"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kateqoriyalar */}
      <section className="container mx-auto py-3 sm:py-4">
        <h2 className="text-lg md:text-xl font-didot text-center uppercase mb-2 sm:mb-3">Kateqoriyalar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 xs:gap-1 md:gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative h-[150px] xs:h-[180px] rounded-sm overflow-hidden group"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                <h3 className="text-white font-didot tracking-wide uppercase text-sm sm:text-base">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top satılan məhsullar */}
      <section className="container mx-auto py-3 sm:py-4">
        <h2 className="text-lg md:text-xl font-didot text-center uppercase mb-2 sm:mb-3">Top satılanlar</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5 xs:gap-1 md:gap-2 mx-auto">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bonus banner */}
      <section className="container mx-auto py-3 sm:py-4">
        <div className="bg-primary/10 py-4 sm:py-6 px-4 sm:px-8 rounded-sm">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-2">
            <h2 className="text-xl md:text-2xl font-didot text-primary">Bonus proqramına qoşulun</h2>
            <p className="text-sm md:text-base text-dark">Hər alış-verişdən bonus toplayın və növbəti sifarişlərinizdə istifadə edin</p>
            <button className="mt-2 bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-sm text-sm md:text-base transition-colors">Qoşulun</button>
          </div>
        </div>
      </section>

      {/* Yeni məhsullar */}
      <section className="container mx-auto py-3 sm:py-4">
        <h2 className="text-lg md:text-xl font-didot text-center uppercase mb-2 sm:mb-3">Yeni gələnlər</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5 xs:gap-1 md:gap-2 mx-auto">
          {products.slice(8, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brendlər */}
      <section className="container mx-auto py-3 sm:py-4">
        <h2 className="text-lg md:text-xl font-didot text-center uppercase mb-2 sm:mb-3">Brendlər</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-0.5 xs:gap-1 md:gap-2">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center bg-gold-50 border border-gold-100 hover:border-primary/30 transition-colors h-14 sm:h-16 rounded-sm px-2"
            >
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="max-w-full max-h-10 object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Axtarış və Filter */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
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

      {/* Blog & Məqalələr Bölməsi */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="parfumbar-heading text-2xl mb-4">Blog & Məqalələr</h2>
          
          {/* Blog postları burada göstəriləcək */}
        </div>
      </section>
    </div>
  );
}