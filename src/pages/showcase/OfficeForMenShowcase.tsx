import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, ArrowLeft, 
  Heart, Star, ShoppingBag, Truck,
  Phone, Mail, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductImageSection from './sections/ProductImageSection';
import ProductInfo from './sections/ProductInfo';
import { SimilarProducts } from './sections/SimilarProducts';
import { Header } from '../../components/Header';
import { FragranceProfile } from './sections/FragranceProfile';
import { ProductStory } from './sections/ProductStory';
import { UserGuide } from './sections/UserGuide';
import { ShoppingExperience } from './sections/ShoppingExperience';
import { Reviews } from './sections/Reviews';

// Mock data for Office for Men
const perfumeData = {
  id: '100',
  brand: 'Fragrance One',
  name: 'Office for Men',
  description: 'Office for Men - Jeremy Fragrance-in yaratdığı əfsanəvi ətir. Office For Men, iş yerində və rəsmi tədbirlərdə istifadə üçün ideal olan müasir, işgüzar bir kişi ətridir. Özünəinamlı və uğurlu kişilər üçün yaradılmışdır. Ambergris və dərinin güclü hissləri ilə balanslı, təravətli citrus və ədviyyə notaları ilə qarışıq, müasir və işgüzar bir kompozisiyadır.',
  rating: 4.7,
  reviewCount: 42,
  price: {
    '30ml': 180,
    '50ml': 260,
    '100ml': 320
  },
  discount: 10,
  badges: ['Bestseller', 'Exclusive'],
  stock: true,
  images: [
    { id: 1, src: 'https://aromania.az/wp-content/uploads/2024/02/fragrance-one-office-for-men-edp-100ml-5.jpg', alt: 'Office for Men', isZoomable: true },
    { id: 2, src: 'https://aromania.az/wp-content/uploads/2024/02/fragrance-one-office-for-men-edp-100ml-1.jpg', alt: 'Office for Men', isZoomable: true },
    { id: 3, src: 'https://aromania.az/wp-content/uploads/2024/02/fragrance-one-office-for-men-edp-100ml-2.jpg', alt: 'Office for Men', isZoomable: true },
    { id: 4, src: 'https://aromania.az/wp-content/uploads/2024/02/fragrance-one-office-for-men-edp-100ml-3.jpg', alt: 'Office for Men', isZoomable: true }
  ],
  sizes: [
    { value: '30ml', label: '30 ml', price: 180 },
    { value: '50ml', label: '50 ml', price: 260 },
    { value: '100ml', label: '100 ml', price: 320 },
  ],
  characteristics: [
    { name: 'Dayanıqlıq', value: 95 },
    { name: 'Cazibədarlıq', value: 90 },
    { name: 'Təzəlik', value: 80 },
    { name: 'İşgüzarlıq', value: 100 },
    { name: 'İntensivlik', value: 85 },
  ],
  notes: {
    top: [
      { name: 'Bergamot' },
      { name: 'Ambroxan' },
    ],
    heart: [
      { name: 'Yaşıl alma' },
      { name: 'Darçın' },
      { name: 'Qara istiot' }
    ],
    base: [
      { name: 'Amber' },
      { name: 'Dəri' },
      { name: 'Musk' }
    ]
  },
  similarProducts: [
    { 
      id: 101, 
      name: 'Date for Men', 
      brand: 'Fragrance One', 
      price: 330, 
      image: 'https://aromania.az/wp-content/uploads/2024/02/fragrance-one-date-for-men-edp-50ml-2.jpg',
      rating: 4.5,
      category: 'brand',
      notesMatch: ['Amber', 'Musk']
    },
    { 
      id: 102, 
      name: 'Unisex for Everyone', 
      brand: 'Fragrance One', 
      price: 290, 
      image: 'https://aromania.az/wp-content/uploads/2024/02/fragrance-one-unisex-for-everyone-100ml.jpg',
      rating: 4.3,
      category: 'brand'
    },
    { 
      id: 103, 
      name: 'Sauvage', 
      brand: 'Dior', 
      price: 380, 
      image: 'https://aromania.az/wp-content/uploads/2023/02/dior-sauvage-elixir-edp-60ml.jpg',
      rating: 4.6,
      category: 'similar'
    },
    { 
      id: 104, 
      name: 'Bleu de Chanel', 
      brand: 'Chanel', 
      price: 390, 
      image: 'https://aromania.az/wp-content/uploads/2022/06/chanel-bleu-de-chanel-edp-100ml-3.jpg',
      rating: 4.7,
      category: 'similar'
    }
  ],
  story: {
    title: "Office for Men Hekayəsi",
    text: "Fragrance One'ın təsisçisi və YouTube ətir sahəsində tanınmış şəxsiyyət Jeremy Fragrance tərəfindən yaradılan Office for Men, yüksək keyfiyyətli, uzunömürlü və hər zaman uyğun olan ideal kişi ətrini yaratmaq məqsədi daşıyırdı. Müasir kişi büstünün əsas atributunu yaratmaq üçün illər ərzində qazandığı biliklərə əsaslanaraq, Jeremy peşəkar parfümerlərlə birlikdə təravətli, cəlbedici və özünəinamlı hiss yaradan unikal kompozisiya yaratdı. Office for Men iş yerində, görüşlərdə və ya axşam yeməyində geyinilmək üçün universal bir ətrdir, hər bir kişinin parfüm kolleksiyasında əsas bir elementdir.",
    image: "https://aromania.az/wp-content/uploads/2024/02/fragrance-one-office-for-men-edp-100ml-3.jpg",
  },
  uses: [
    { title: "İş üçün", text: "Office for Men iş mühiti üçün ideal seçimdir. Professional və özünəminli təəssürat yaratmaq üçün mükəmməldir." },
    { title: "Görüşlər üçün", text: "Rəsmi görüşlər və ya iş yeməkləri üçün mükəmməl seçimdir. Xoş və cəlbedici ətri ilə professional imicinizi tamamlayır." },
    { title: "Axşam tədbirləri", text: "Rəsmi axşam tədbirlərinə qatılarkən özünüzü əminli hiss etmək üçün ideal ətirdir." },
    { title: "Gündəlik istifadə", text: "Uzunömürlü və hər kəs tərəfindən sevilən ətri sayəsində gündəlik istifadə üçün də mükəmməldir." }
  ],
  reviews: [
    { id: 1, author: "Davud M.", rating: 5, date: "15.03.2024", text: "Bir ildir istifadə edirəm və hələ də məni heyrətləndirir. İş yoldaşlarım hər zaman kompliment verir. Dayanıqlığı əla səviyyədədir!" },
    { id: 2, author: "Orxan K.", rating: 4, date: "02.03.2024", text: "İş və rəsmi görüşlər üçün ideal bir seçimdir. Qoxusu çox cəlbedicidir və uzun müddət davam edir. Qiymət biraz bahadır, amma keyfiyyətinə dəyər." },
    { id: 3, author: "Rəşad H.", rating: 5, date: "18.02.2024", text: "Jeremy Fragrance'nin təsvir etdiyi qədər yaxşıdır! Komplimentlər almağa başladım və özümü daha özünəminli hiss edirəm." },
    { id: 4, author: "Tural Ş.", rating: 5, date: "05.02.2024", text: "Mükəmməl qoxu. İş və axşam görüşləri üçün ideal seçimdir. Yenidən alacağam!" }
  ]
};

const NotesSection: React.FC<{ notes: any }> = ({ notes }) => {
  const topNotes = notes?.top || [];
  const heartNotes = notes?.heart || [];
  const baseNotes = notes?.base || [];

  return (
    <div className="mt-12 mb-12">
      <h2 className="section-title text-xl mb-8">Not Piramidası</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card p-6">
          <h3 className="note-title mb-5">Üst Notlar</h3>
          <div className="space-y-3">
            {topNotes.map((note: any, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span className="body-text">{note.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="note-title mb-5">Orta Notlar</h3>
          <div className="space-y-3">
            {heartNotes.map((note: any, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span className="body-text">{note.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="note-title mb-5">Baza Notlar</h3>
          <div className="space-y-3">
            {baseNotes.map((note: any, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span className="body-text">{note.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabContent: React.FC<{ activeTab: string, perfume: any }> = ({ activeTab, perfume }) => {
  switch (activeTab) {
    case 'description':
      return (
        <div className="tab-content py-6">
          <p className="body-text text-lg leading-relaxed">{perfume.description}</p>
          <NotesSection notes={perfume.notes} />
        </div>
      );
    case 'characteristics':
      return (
        <div className="tab-content py-6">
          <div className="space-y-6">
            {perfume.characteristics.map((char: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{char.name}</span>
                  <span className="text-sm">{char.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${char.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'reviews':
      return (
        <div className="tab-content py-6">
          <div className="space-y-6">
            {perfume.reviews.map((review: any) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

const OfficeForMenShowcase: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('description');
  const [selectedSize, setSelectedSize] = useState<string>('100ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    setShowMessage("Məhsul səbətə əlavə edildi!");
    setTimeout(() => setShowMessage(null), 3000);
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    setShowMessage(isInWishlist ? "Məhsul sevimlilərdan çıxarıldı!" : "Məhsul sevimlilərə əlavə edildi!");
    setTimeout(() => setShowMessage(null), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowMessage('Link kopyalandı!');
    setTimeout(() => setShowMessage(null), 3000);
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const getSelectedPrice = () => {
    const size = perfumeData.sizes.find(s => s.value === selectedSize);
    return size ? size.price : perfumeData.sizes[0].price;
  };

  const getDiscountedPrice = () => {
    const price = getSelectedPrice();
    return perfumeData.discount
      ? Math.round(price - (price * perfumeData.discount / 100))
      : price;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-4/5 h-full bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b">
              <button 
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Menyu</h3>
                <div className="space-y-3">
                  <Link to="/" className="block py-2 hover:text-primary">Ana Səhifə</Link>
                  <Link to="/products" className="block py-2 hover:text-primary">Bütün Məhsullar</Link>
                  <Link to="/brands" className="block py-2 hover:text-primary">Brendlər</Link>
                  <Link to="/blog" className="block py-2 hover:text-primary">Blog</Link>
                </div>
              </div>
              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-lg">Bizimlə Əlaqə</h3>
                <div className="space-y-3">
                  <a href="tel:+994501234567" className="flex items-center py-2 hover:text-primary">
                    <Phone size={18} className="mr-3" />
                    <span>+994 50 123 45 67</span>
                  </a>
                  <a href="mailto:info@aromania.az" className="flex items-center py-2 hover:text-primary">
                    <Mail size={18} className="mr-3" />
                    <span>info@aromania.az</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification toast */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-primary text-white py-2 px-4 rounded-md shadow-lg"
          >
            {showMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-primary transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Geri qayıt</span>
          </button>
        </div>

        {/* Product main section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product images */}
          <ProductImageSection images={perfumeData.images} />
          
          {/* Product info */}
          <div className="space-y-6">
            {/* Brand and product name */}
            <div>
              <div className="text-sm text-accent uppercase tracking-wider mb-2 font-medium">
                {perfumeData.brand}
              </div>
              
              <h1 className="product-title text-3xl md:text-4xl mb-4">
                {perfumeData.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(perfumeData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <div className="ml-2 text-xs text-gray-500">
                  ({perfumeData.reviewCount} rəy)
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {perfumeData.badges.map((badge, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 bg-gray-50 border border-gray-200 text-xs text-primary rounded-sm font-medium"
                >
                  <Check size={12} className="mr-1" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-primary">
                  {getDiscountedPrice()}₼
                </span>
                
                {perfumeData.discount && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    {getSelectedPrice()}₼
                  </span>
                )}
                
                {perfumeData.discount && (
                  <span className="ml-3 bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                    {perfumeData.discount}% endirim
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-500 mt-2 flex items-center">
                <Truck size={14} className="mr-2 text-primary" />
                Çatdırılma pulsuz (Bakı daxili)
              </div>
            </div>

            {/* Size options */}
            <div className="pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Ölçü</h3>
              <div className="grid grid-cols-3 gap-3">
                {perfumeData.sizes.map(size => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`py-2 px-4 border rounded-md text-sm ${
                      selectedSize === size.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Miqdar</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-1/3">
                <button 
                  onClick={() => decrementQuantity()}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="px-3 py-2 text-center flex-1 text-gray-700">{quantity}</div>
                <button 
                  onClick={() => incrementQuantity()}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="pt-6 flex space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-md font-medium flex-1"
              >
                <ShoppingBag size={18} className="mr-2" />
                Səbətə əlavə et
              </button>
              
              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-md border ${
                  isInWishlist 
                    ? 'bg-red-50 border-red-200 text-red-500' 
                    : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Heart size={20} className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-3 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50"
              >
                <Share2 size={20} />
              </button>
            </div>
            
            {/* Stock status */}
            <div className="pt-6 flex items-center text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-700 font-medium">Stokda var</span>
              <span className="mx-2">•</span>
              <span className="text-gray-500">24 saat ərzində göndərilir</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 border-b-2 font-medium ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('description')}
              >
                Məhsul haqqında
              </button>
              <button
                className={`px-6 py-3 border-b-2 font-medium ${activeTab === 'characteristics' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('characteristics')}
              >
                Xarakteristikalar
              </button>
              <button
                className={`px-6 py-3 border-b-2 font-medium ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Rəylər ({perfumeData.reviews.length})
              </button>
            </div>
          </div>
          <TabContent activeTab={activeTab} perfume={perfumeData} />
        </div>

        {/* Product Story */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium">{perfumeData.story.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 leading-relaxed">{perfumeData.story.text}</p>
            </div>
            <div>
              <img 
                src={perfumeData.story.image} 
                alt="Office for Men Story" 
                className="rounded-lg w-full h-auto object-cover shadow-md" 
              />
            </div>
          </div>
        </div>

        {/* Fragrance Profile */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium">Ətir Xüsusiyyətləri</h2>
          </div>
          <div className="space-y-6">
            {perfumeData.characteristics.map((char, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{char.name}</span>
                  <span className="text-sm">{char.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${char.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uses */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium">İstifadə Tövsiyələri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {perfumeData.uses.map((use, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3">{use.title}</h3>
                <p className="text-gray-600">{use.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium">Oxşar Məhsullar</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perfumeData.similarProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-primary">{product.price}₼</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Experience */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium">Alış-veriş Təcrübəsi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Truck className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-medium mb-2">Sürətli Çatdırılma</h3>
              <p className="text-sm text-gray-600">Bakı daxili 24 saat ərzində pulsuz çatdırılma</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Star className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-medium mb-2">Orijinal Məhsullar</h3>
              <p className="text-sm text-gray-600">100% orijinal məhsullara zəmanət</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <ArrowLeft className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-medium mb-2">Asan Qaytarma</h3>
              <p className="text-sm text-gray-600">14 gün ərzində problemsiz qaytarma imkanı</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeForMenShowcase; 