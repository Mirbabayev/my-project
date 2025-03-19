import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight } from 'lucide-react';
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
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Məhsul şəkli */}
        <div>
          <div className="product-detail-image bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow p-8 flex items-center justify-center h-[450px] overflow-hidden transition-all duration-300 hover:shadow-md group">
            <img 
              src={product.image} 
              alt={`${product.brand} ${product.name} ətri`}
              title={`${product.brand} ${product.name}`}
              className="product-image max-h-[400px] max-w-[90%] h-auto w-auto object-contain transition-all duration-500 group-hover:scale-[1.03]" 
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
            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-md text-xs font-medium inline-block">
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
          
          <div className="text-2xl font-bold text-primary mb-6">{product.price} ₼</div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Konsentrasiya</h3>
            <div className="text-sm text-gray-600 mb-4">{product.concentration}</div>
            
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Əsas notlar</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.notes.map((note, index) => (
                <span 
                  key={index} 
                  className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full text-xs"
                >
                  {note}
                </span>
              ))}
            </div>
            
            <p className="text-gray-600 mb-8">{product.description}</p>
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
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Məhsul haqqında</h2>
        <p className="text-gray-700">{product.description}</p>
      </section>
      
      {/* Oxşar məhsullar */}
      <div className="mt-16">
        <h2 className="parfumbar-heading text-2xl">Bənzər məhsullar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;