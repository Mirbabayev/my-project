import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../../components/ProductGrid';
import { Button } from '../../components/ui/Button';
import { Product } from '../../types';

// Test üçün nümunə məlumatlar
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Giorgio Armani My Way",
    brand: "Giorgio Armani",
    description: "Qayğısız və eleqant bu ətir parlaq berqamot, incə tuberoza və isti vanil notunu özündə əks etdirir.",
    price: 71,
    oldPrice: 109,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=Giorgio+Armani+My+Way",
    inStock: true,
    rating: 4.8,
    volume: 50,
    fragranceType: "Eau de Parfum",
    gender: "Qadın",
    group: "Gül",
    discount: 35,
    notes: {
      top: ["Berqamot", "Portağal çiçəyi"],
      middle: ["Tuberoza", "Ərəb jasmini"],
      base: ["Müşk", "Vanil"]
    }
  },
  {
    id: 2,
    name: "Dior Sauvage",
    brand: "Dior",
    description: "Güclü və çoxşahəli kompozisiya, bergamotun təravəti ilə ambroks notasının istilik birləşməsi.",
    price: 85,
    oldPrice: 120,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=Dior+Sauvage",
    inStock: true,
    rating: 4.9,
    volume: 100,
    fragranceType: "Eau de Toilette",
    gender: "Kişi",
    group: "Ədviyyat",
    discount: 29,
    notes: {
      top: ["Berqamot"],
      middle: ["Bibər", "Lavanda"],
      base: ["Ambroxan", "Sidr"]
    }
  },
  {
    id: 3,
    name: "Chanel Coco Mademoiselle",
    brand: "Chanel",
    description: "Cürətli, güclü və yaxşı düşünülmüş parfüm, narıncı və jasmin arasında əla tarazlıq yaradır.",
    price: 95,
    oldPrice: 130,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=Chanel+Coco+Mademoiselle",
    inStock: false,
    rating: 4.7,
    volume: 50,
    fragranceType: "Eau de Parfum",
    gender: "Qadın",
    group: "Sitrus",
    discount: 27,
    notes: {
      top: ["Portağal", "Berqamot"],
      middle: ["Jasmin", "Qızılgül"],
      base: ["Paçuli", "Vanil"]
    }
  },
  {
    id: 4,
    name: "Tom Ford Tobacco Vanille",
    brand: "Tom Ford",
    description: "Şərqlü ətirli ətir tütün yarpaqları və isti vanili birləşdirərək şirinlik və ədviyyat arasında təzad yaradır.",
    price: 180,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=Tom+Ford+Tobacco+Vanille",
    inStock: true,
    rating: 4.6,
    volume: 50,
    fragranceType: "Eau de Parfum",
    gender: "Unisex",
    group: "Şərq",
    notes: {
      top: ["Tütün yarpaqları", "Ədviyyəli notlar"],
      middle: ["Vanil", "Kakao"],
      base: ["Quru meyvələr", "Ağac notları"]
    }
  },
  {
    id: 5,
    name: "Yves Saint Laurent Black Opium",
    brand: "Yves Saint Laurent",
    description: "Qəhvə və vanil ilə enerji verən, müasir və cəzbedici ətir.",
    price: 75,
    oldPrice: 110,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=YSL+Black+Opium",
    inStock: true,
    rating: 4.5,
    volume: 50,
    fragranceType: "Eau de Parfum",
    gender: "Qadın",
    group: "Şərq",
    discount: 32,
    notes: {
      top: ["Armud", "Narıncı çiçəyi"],
      middle: ["Qəhvə", "Jasmin"],
      base: ["Vanil", "Paçuli"]
    }
  },
  {
    id: 6,
    name: "Creed Aventus",
    brand: "Creed",
    description: "Meyvə və ağac notları harmoniyası ilə kişilər üçün lüks və köhnə dünya ruhunu ifadə edən ətir.",
    price: 220,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=Creed+Aventus",
    inStock: true,
    rating: 4.9,
    volume: 50,
    fragranceType: "Eau de Parfum",
    gender: "Kişi",
    group: "Meyvə",
    notes: {
      top: ["Ananas", "Berqamot", "Qara qarağat", "Alma"],
      middle: ["Ağcaqayın", "Jasmin", "Qızılgül"],
      base: ["Müşk", "Ağac notları", "Vanil"]
    }
  },
  {
    id: 7,
    name: "Versace Eros",
    brand: "Versace",
    description: "Nanə, alma və limon ilə oyanış yaradan, sonradan ağac notları ilə dərinləşən ətir.",
    price: 65,
    oldPrice: 90,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=Versace+Eros",
    inStock: true,
    rating: 4.4,
    volume: 100,
    fragranceType: "Eau de Toilette",
    gender: "Kişi",
    group: "Ədviyyat",
    discount: 28,
    notes: {
      top: ["Nanə", "Alma", "Limon"],
      middle: ["Tonka paxlası", "Ambroxan"],
      base: ["Sidr", "Vanil", "Vetiver"]
    }
  },
  {
    id: 8,
    name: "Kilian Love Don't Be Shy",
    brand: "Kilian",
    description: "Şirin, ballı və incə ətir, şəkərli marshmallow və vanil notlarını birləşdirir.",
    price: 195,
    imageUrl: "https://placehold.co/400x400/f8fafc/64748b?text=Kilian+Love",
    inStock: false,
    rating: 4.7,
    volume: 50,
    fragranceType: "Eau de Parfum",
    gender: "Unisex",
    group: "Gül",
    notes: {
      top: ["Neroli", "Bergamot", "Bibər"],
      middle: ["Şirniyyat notları", "Jasmin", "Qızılgül"],
      base: ["Vanil", "Müşk", "Karamel"]
    }
  }
];

const categories = [
  { id: 1, name: 'Kişi ətirləri', count: 42 },
  { id: 2, name: 'Qadın ətirləri', count: 56 },
  { id: 3, name: 'Unisex ətirlər', count: 18 },
  { id: 4, name: 'Premium kolleksiyalar', count: 32 },
  { id: 5, name: 'Məhdud buraxılış', count: 9 },
  { id: 6, name: 'Travel-size', count: 15 },
];

const brands = [
  { id: 1, name: 'Chanel', count: 25 },
  { id: 2, name: 'Dior', count: 32 },
  { id: 3, name: 'Tom Ford', count: 21 },
  { id: 4, name: 'Giorgio Armani', count: 18 },
  { id: 5, name: 'Jo Malone', count: 14 },
  { id: 6, name: 'Versace', count: 16 },
  { id: 7, name: 'Lancôme', count: 12 },
  { id: 8, name: 'Gucci', count: 19 },
];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'new' | 'discounts'>('bestsellers');
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Real həyatda, burada fərqli API sorğuları edə bilərik
    // Sadəlik üçün eyni məhsulları istifadə edək, amma müxtəlif sırayla
    if (activeTab === 'bestsellers') {
      setProducts([...sampleProducts].sort((a, b) => b.rating - a.rating));
    } else if (activeTab === 'new') {
      setProducts([...sampleProducts].sort((a, b) => b.id - a.id));
    } else if (activeTab === 'discounts') {
      setProducts([...sampleProducts]
        .filter(p => p.discount)
        .sort((a, b) => (b.discount || 0) - (a.discount || 0)));
    }
  }, [activeTab]);

  const tabButtonClass = (tab: 'bestsellers' | 'new' | 'discounts') => 
    `py-2 px-3 font-medium text-sm rounded-sm transition-colors ${
      activeTab === tab 
        ? 'bg-amber-50 text-amber-800 border-b-2 border-amber-500' 
        : 'text-gray-600 hover:text-amber-700 hover:bg-gray-50'
    }`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <motion.h1 
          className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tövsiyə edilən ətirlər
        </motion.h1>
        
        <Link to="/catalog" className="text-amber-700 hover:text-amber-800 flex items-center gap-1 group">
          <span>Bütün məhsullar</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filtrlər paneli */}
        <div className="md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-sm border border-gray-100 shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center md:hidden" 
              onClick={() => setShowFilters(!showFilters)}>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-600" />
                <span className="font-medium">Filtrlər</span>
              </div>
              <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden md:block'} p-4`}>
              {/* Ətir kateqoriyaları */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Kateqoriyalar</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center justify-between group cursor-pointer">
                      <span className="text-sm text-gray-600 group-hover:text-amber-700">{category.name}</span>
                      <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-sm">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brendlər */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Brendlər</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" id={`brand-${brand.id}`} className="rounded-sm text-amber-600 focus:ring-amber-500" />
                      <label htmlFor={`brand-${brand.id}`} className="text-sm text-gray-600 flex-1 group-hover:text-amber-700">{brand.name}</label>
                      <span className="text-xs text-gray-400">{brand.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Məhsullar bölməsi */}
        <div className="md:w-3/4 lg:w-4/5">
          <div className="bg-white rounded-sm border border-gray-100 shadow-subtle mb-6 p-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                className={tabButtonClass('bestsellers')}
                onClick={() => setActiveTab('bestsellers')}
              >
                Ən çox satılanlar
              </button>
              <button
                className={tabButtonClass('new')}
                onClick={() => setActiveTab('new')}
              >
                Yeni gələnlər
              </button>
              <button
                className={tabButtonClass('discounts')}
                onClick={() => setActiveTab('discounts')}
              >
                Endirimdə
              </button>
            </div>
          </div>
          
          <ProductGrid 
            products={products} 
            columns={3} 
            gap="md" 
            cardSize="md" 
          />
          
          <div className="flex justify-center mt-8">
            <Button className="px-6 py-2 bg-white text-gray-800 hover:bg-amber-50 hover:text-amber-800 border border-gray-200">
              Daha çox göstər
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts; 