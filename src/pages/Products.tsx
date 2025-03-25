import React, { useState } from 'react';
import { Slider } from '../components/ui/Slider';
import { Button } from '../components/ui/Button';
import { ChevronDown, SlidersHorizontal, Grid2X2, List, Star, Heart } from 'lucide-react';

export const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const dummyProducts = [
    {
      id: 1,
      name: "Giorgio Armani My Way",
      brand: "Giorgio Armani",
      price: 104,
      oldPrice: 159,
      imageUrl: "",
      rating: 5,
      isNew: true,
      discount: 35,
      volume: "100ml",
      code: "C00011"
    },
    // ... more products
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <a href="/" className="text-gray-500 hover:text-primary">Ana Səhifə</a>
        <span className="mx-2 text-gray-400">/</span>
        <a href="/products" className="text-gray-500 hover:text-primary">Bütün ətirlər</a>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">Qadın ətirləri</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-4">Qiymət Aralığı</h3>
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>{priceRange[0]} ₼</span>
                <span>{priceRange[1]} ₼</span>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-medium mb-4">Brendlər</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {['Giorgio Armani', 'Chanel', 'Dior', 'Gucci', 'Tom Ford', 'Yves Saint Laurent', 'Versace'].map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-primary" />
                    <span className="ml-2 text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <h3 className="font-medium mb-4">Cins</h3>
              <div className="space-y-2">
                {['Kişi', 'Qadın', 'Uniseks'].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-primary" />
                    <span className="ml-2 text-sm">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div>
              <h3 className="font-medium mb-4">Həcm</h3>
              <div className="space-y-2">
                {['30ml', '50ml', '100ml', '200ml'].map((volume) => (
                  <label key={volume} className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-primary" />
                    <span className="ml-2 text-sm">{volume}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <Button 
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtrlər
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sırala:</span>
                <select className="form-select text-sm border-gray-200 rounded-md">
                  <option>Ən yenilər</option>
                  <option>Qiymət: Azdan çoxa</option>
                  <option>Qiymət: Çoxdan aza</option>
                  <option>Ən çox satılanlar</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button 
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {dummyProducts.map((product) => (
              <div key={product.id} className={`bg-white rounded-lg shadow-sm overflow-hidden group ${
                viewMode === 'list' ? 'flex gap-4' : ''
              }`}>
                {/* Product Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'aspect-square'}`}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">Yeni</span>
                  )}
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                  <button className="absolute bottom-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Product Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm text-gray-500">{product.brand}</h3>
                    <span className="text-xs text-gray-400">Kod: {product.code}</span>
                  </div>
                  <h2 className="font-bold mb-2">{product.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-lg">{product.price} ₼</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.oldPrice} ₼</span>
                    )}
                    <span className="text-sm text-gray-500 ml-auto">{product.volume}</span>
                  </div>
                  <Button variant="primary" className="w-full">Səbətə at</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};