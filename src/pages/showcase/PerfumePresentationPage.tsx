import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Heart, Star, ShoppingBag } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Perfume data based on the provided structure
const perfumeData = {
  name: "Giorgio Armani My Way",
  description: "Giorgio Armani My Way ətri sizin ən dəyərli və heç kimlə bölüşmək istəmədiyiniz xatirələri özündə gizlədən bir ətirdir. Qayğısız və eleqant bu ətir parlaq berqamot, incə tuberoza və isti vanil notunu özündə əks etdirir. Bu güclü və parlaq ətir sizə əminlik və azadlıq hissini yaşadacaqdır.",
  notes: {
    top: ["Berqamot", "Portağal çiçəyi"],
    heart: ["Tuberoza", "Ərəb jasmini"],
    base: ["Müşk", "Sidr", "Vanil"]
  },
  type: "Qadın üçün",
  sizes: ["30 ml", "50 ml", "100 ml"],
  prices: {
    "30 ml": { regular: 75, discounted: 49, points: 4 },
    "50 ml": { regular: 109, discounted: 71, points: 7 },
    "100 ml": { regular: 159, discounted: 104, points: 10 }
  },
  brand: "Giorgio Armani",
  country: "İtaliya",
  group: "Gül",
  releaseYear: "2020",
  wearTime: "Gündüz",
  parfumer: "Alberto Morillas",
  additionalInfo: {
    delivery: "Pulsuz çatdırılma",
    authenticity: "Orijinal ətirlər",
    payment: "Təhlükəsiz ödəniş",
    cashOnDelivery: "Çatdırılmada ödəmə"
  },
  contact: {
    phone: "+994 12 345 67 89",
    email: "info@easyperfume.az",
    support: "Canlı chat və WhatsApp dəstəyi"
  },
  rating: 4.8,
  reviewCount: 32,
  images: [
    "https://placehold.co/500x500/f8fafc/64748b?text=Giorgio+Armani+My+Way",
    "https://placehold.co/500x500/f8fafc/64748b?text=My+Way+2",
    "https://placehold.co/500x500/f8fafc/64748b?text=My+Way+3",
  ],
};

// Product Images Component
const ProductImages = ({ images }: { images: string[] }) => {
  const imageRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      console.log('Şəkil panelinin koordinatları:', {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        center: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      });
    }
  }, []);
  
  return (
    <motion.div 
      ref={imageRef}
      className="relative overflow-hidden bg-white h-[580px] w-[580px] flex items-center justify-center border border-gray-100 rounded-sm shadow-sm mx-auto"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {images[0] ? (
        <motion.img 
          src={images[0]} 
          alt={perfumeData.name} 
          className="object-contain w-full h-full p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <div className="flex items-center justify-center h-full flex-col">
          <div className="w-24 h-24 border-2 border-amber-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-amber-700 text-4xl font-serif">GA</span>
          </div>
          <p className="text-gray-400 font-light">{perfumeData.name}</p>
        </div>
      )}
    </motion.div>
  );
};

// Perfume Characteristics Component
const PerfumeCharacteristics = () => {
  const noteStyles = [
    { borderColor: "border-emerald-100", hoverBorder: "hover:border-emerald-300", textColor: "text-emerald-800", bgColor: "bg-emerald-50" },
    { borderColor: "border-amber-100", hoverBorder: "hover:border-amber-300", textColor: "text-amber-800", bgColor: "bg-amber-50" },
    { borderColor: "border-rose-100", hoverBorder: "hover:border-rose-300", textColor: "text-rose-800", bgColor: "bg-rose-50" }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-amber-600 mr-3"></div>
        <h3 className="text-xl font-semibold text-gray-900">Xüsusiyyətlər</h3>
      </div>
      
      {/* Notes Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Yuxarı notlar", notes: perfumeData.notes.top, description: "İlk təəssürat" },
          { title: "Orta notlar", notes: perfumeData.notes.heart, description: "Ətrin ürəyi" },
          { title: "Baza notlar", notes: perfumeData.notes.base, description: "Davamlı iz" }
        ].map((section, index) => (
          <motion.div 
            key={index} 
            className={`border-l-2 ${noteStyles[index].borderColor} ${noteStyles[index].hoverBorder} pl-4 py-3 transition-colors h-full bg-white shadow-sm rounded-sm border-t border-r border-b border-gray-50`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <div className={`${noteStyles[index].bgColor} -ml-4 px-4 py-2 mb-3 flex flex-col`}>
              <h4 className={`font-semibold text-base ${noteStyles[index].textColor} tracking-wider`}>{section.title}</h4>
              <p className="text-sm text-gray-500 italic mt-1">{section.description}</p>
            </div>
            <div className="flex flex-col space-y-1">
              {section.notes.map((note, noteIndex) => (
                <span key={noteIndex} className="text-base font-light text-gray-700">
                  {note}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Characteristics Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
        {[
          { label: "Brend", value: perfumeData.brand },
          { label: "Təyinat", value: perfumeData.type },
          { label: "Ətir qrupu", value: perfumeData.group },
          { label: "İstehsal ili", value: perfumeData.releaseYear },
          { label: "İstifadə vaxtı", value: perfumeData.wearTime },
          { label: "Parfümer", value: perfumeData.parfumer }
        ].map((item, index) => (
          <motion.div 
            key={index} 
            className="border border-gray-50 shadow-sm bg-white p-3 rounded-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <h4 className="font-semibold text-base text-amber-800 mb-1 tracking-wider">{item.label}</h4>
            <p className="text-base font-light text-gray-700">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Product Details Component
const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = React.useState("50 ml");
  const [quantity, setQuantity] = React.useState(1);
  
  return (
    <div className="flex flex-col gap-5">
      <motion.div 
        className="flex items-start justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-extralight text-gray-900 tracking-tight">
          {perfumeData.name}
        </h1>
        <div className="flex items-center gap-1 mt-1">
          <motion.button 
            className="p-1.5 rounded-none text-gray-400 hover:text-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 size={18} />
          </motion.button>
          <motion.button 
            className="p-1.5 rounded-none text-gray-400 hover:text-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Heart size={18} />
          </motion.button>
        </div>
      </motion.div>
      
      <div className="flex items-center gap-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              size={18} 
              fill={star <= Math.round(perfumeData.rating) ? "currentColor" : "none"} 
              className="text-amber-400"
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-1 font-extralight">{perfumeData.reviewCount} rəy</span>
      </div>
      
      <motion.p 
        className="text-gray-600 text-base leading-relaxed font-extralight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {perfumeData.description}
      </motion.p>
      
      <div className="mt-1">
        <h3 className="font-extralight text-xs uppercase tracking-wide mb-3 text-gray-600">Ölçü</h3>
        <div className="flex gap-4">
          {perfumeData.sizes.map((size) => (
            <motion.button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-2 border-b transition-all text-base font-extralight ${
                selectedSize === size 
                  ? 'border-gray-900 text-gray-900' 
                  : 'border-gray-200 hover:border-gray-400 text-gray-500'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="flex items-end gap-2 mt-1">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400 line-through font-extralight">
            {perfumeData.prices[selectedSize as keyof typeof perfumeData.prices]?.regular} AZN
          </span>
          <span className="text-2xl font-extralight text-gray-900">
            {perfumeData.prices[selectedSize as keyof typeof perfumeData.prices]?.discounted} AZN
          </span>
        </div>
        <span className="text-sm bg-amber-50 text-amber-700 px-3 py-1 font-extralight">
          +{perfumeData.prices[selectedSize as keyof typeof perfumeData.prices]?.points} bonus
        </span>
      </div>
      
      <div className="flex gap-6 items-center mt-1">
        <div className="flex items-center border-b border-gray-200">
          <motion.button 
            className="px-4 py-2 text-lg text-gray-500 hover:text-gray-700"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            whileTap={{ scale: 0.95 }}
          >
            -
          </motion.button>
          <span className="px-4 py-1 font-light text-base">{quantity}</span>
          <motion.button 
            className="px-4 py-2 text-lg text-gray-500 hover:text-gray-700"
            onClick={() => setQuantity(quantity + 1)}
            whileTap={{ scale: 0.95 }}
          >
            +
          </motion.button>
        </div>
        
        <motion.div
          className="flex-1 ml-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button className="w-full max-w-[280px] gap-2 py-3 px-8 bg-amber-700 hover:bg-amber-800 text-white font-extralight rounded-md text-base ml-auto">
            <ShoppingBag size={18} />
            Səbətə əlavə et
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

// Product Info Component
const ProductInfo = () => {
  return (
    <div className="py-6 border-t border-gray-100 mt-6">
      {/* Characteristics Section */}
      <div className="mb-8">
        <PerfumeCharacteristics />
      </div>
      
      {/* Delivery Info Section */}
      <div className="mt-8">
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-amber-600 mr-3"></div>
          <h3 className="text-xl font-semibold text-gray-900">Çatdırılma və ödəniş</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(perfumeData.additionalInfo).map(([key, value], index) => (
            <motion.div 
              key={key} 
              className="flex flex-col p-4 border border-gray-50 shadow-sm rounded-sm bg-white hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 flex items-center justify-center text-amber-700 bg-amber-50 rounded-full">
                  {key === 'delivery' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1v-3a1 1 0 00-.293-.707l-2-2A1 1 0 0012 9h-1V5a1 1 0 00-1-1H3z" />
                    </svg>
                  )}
                  {key === 'authenticity' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {key === 'payment' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {key === 'cashOnDelivery' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <h4 className="font-semibold text-base text-gray-800 tracking-wide">
                  {key === 'delivery' && 'Pulsuz çatdırılma'}
                  {key === 'authenticity' && 'Orijinallıq zəmanəti'}
                  {key === 'payment' && 'Təhlükəsiz ödəniş'}
                  {key === 'cashOnDelivery' && 'Çatdırılmada ödəmə'}
                </h4>
              </div>
              <p className="text-sm text-gray-600 ml-10">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Perfume Presentation Page
const PerfumePresentationPage = () => {
  return (
    <motion.div 
      className="container mx-auto px-4 py-8 max-w-6xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="md:w-1/2 flex items-start pt-4 md:sticky md:top-4" style={{ minHeight: '580px', height: 'fit-content' }}>
          <ProductImages images={perfumeData.images} />
        </div>
        
        <div className="md:w-1/2">
          <ProductDetails />
          <ProductInfo />
        </div>
      </div>
    </motion.div>
  );
};

export default PerfumePresentationPage; 