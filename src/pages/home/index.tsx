import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight, Heart, ArrowRight, ArrowLeft, TrendingUp, Clock, Gift, Truck, Shield } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';

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

const categories = [
  { name: 'Qadın', slug: 'qadin', image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kişi', slug: 'kisi', image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=600&q=80' },
  { name: 'Uniseks', slug: 'uniseks', image: 'https://images.unsplash.com/photo-1611401677282-be6594e6cbff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Setlər', slug: 'setler', image: 'https://images.unsplash.com/photo-1590736969596-dd610e3e013f?auto=format&fit=crop&w=600&q=80' },
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
          className={`relative h-[500px] transition-opacity duration-300 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-black/20 to-transparent">
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
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-primary scale-150' : 'bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slayder kontrolları */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-primary/80 p-2 rounded-full text-white transition-colors"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-primary/80 p-2 rounded-full text-white transition-colors"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Kateqoriyalar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="parfumbar-heading text-2xl">Kateqoriyalar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="parfumbar-card group overflow-hidden rounded-lg relative h-48"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brendlər */}
      <section className="py-12 bg-accent overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="parfumbar-heading text-2xl">Brendlər</h2>
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
                    className="parfumbar-card mx-4 px-8 py-4 flex items-center justify-center min-w-[150px] border-2 border-transparent hover:border-primary/30"
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
                    className="parfumbar-card mx-4 px-8 py-4 flex items-center justify-center min-w-[150px] border-2 border-transparent hover:border-primary/30"
                  >
                    <span className="font-bold text-gray-800">{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Kənar kölgələr */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-accent to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-accent to-transparent z-10"></div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/products" className="parfumbar-btn-outline">
              Bütün brendlərə bax
            </Link>
          </div>
        </div>
      </section>

      {/* Populyar məhsullar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="parfumbar-heading text-2xl mb-0">Populyar məhsullar</h2>
            <Link to="/products" className="flex items-center text-primary hover:underline">
              Hamısına bax
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {/* Cins filterləri */}
          <div className="flex gap-3 mb-6">
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
        </div>
      </section>

      {/* Orta banner */}
      <section className="py-12 bg-accent relative overflow-hidden">
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
                className="parfumbar-btn"
              >
                İndi alış-veriş edin
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="parfumbar-card w-80 h-80 bg-gradient-to-br from-primary/5 to-primary/20 relative">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-md">
                      <Star className="w-8 h-8 text-primary fill-primary/20" />
                    </div>
                    <h3 className="text-primary font-bold text-xl mb-2">Premium ətir kolleksiyası</h3>
                    <p className="text-gray-700 text-sm mb-4">Lüks və əl çatan qiymətlərlə unudulmaz qoxular</p>
                    <span className="inline-block bg-white/80 text-primary font-bold px-3 py-1 rounded-md text-sm">30% ENDİRİM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top satılan məhsullar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="parfumbar-heading text-2xl mb-0">Top satılan məhsullar</h2>
            <Link to="/products" className="flex items-center text-primary hover:underline">
              Hamısına bax
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {topSelling.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Yeni məhsullar */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="parfumbar-heading text-2xl mb-0">Yeni məhsullar</h2>
            <Link to="/products" className="flex items-center text-primary hover:underline">
              Hamısına bax
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Üstünlüklərimiz */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="parfumbar-heading text-2xl">Niyə bizi seçməlisiniz?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="parfumbar-card p-6 text-center hover:border-primary/20 border-2 border-transparent transition-colors">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4 transform transition-transform hover:scale-110">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Orijinal</h3>
              <p className="text-gray-600 text-sm">Bütün məhsullar orijinallığına zəmanət verilir və birbaşa rəsmi distribütorlardan tədarük olunur.</p>
            </div>
            
            <div className="parfumbar-card p-6 text-center hover:border-primary/20 border-2 border-transparent transition-colors">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4 transform transition-transform hover:scale-110">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sürətli Çatdırılma</h3>
              <p className="text-gray-600 text-sm">Sifarişləriniz 1-3 iş günü ərzində ünvanınıza çatdırılır və çatdırılma prosesini izləyə bilərsiniz.</p>
            </div>
            
            <div className="parfumbar-card p-6 text-center hover:border-primary/20 border-2 border-transparent transition-colors">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4 transform transition-transform hover:scale-110">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pulsuz Nümunələr</h3>
              <p className="text-gray-600 text-sm">Hər sifarişlə birlikdə yeni kolleksiyadan pulsuz ətir nümunələri hədiyyə edilir.</p>
            </div>
            
            <div className="parfumbar-card p-6 text-center hover:border-primary/20 border-2 border-transparent transition-colors">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4 transform transition-transform hover:scale-110">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Təhlükəsiz Ödəniş</h3>
              <p className="text-gray-600 text-sm">Bütün ödənişlər təhlükəsiz şəkildə həyata keçirilir və şəxsi məlumatlarınız qorunur.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}