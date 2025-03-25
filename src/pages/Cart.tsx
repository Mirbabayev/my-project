import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  // Kartda heç bir məhsul olmadığı halda
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Səbətiniz boşdur</h1>
          <p className="text-gray-600 mb-8">
            Sizin səbətinizdə hazırda heç bir məhsul yoxdur. Məhsul əlavə etmək üçün məhsullar səhifəsinə keçin.
          </p>
          <Link to="/products">
            <Button variant="primary">
              Məhsullara baxın
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Toplam qiyməti hesablayın
  const deliveryCost = 5; // Standart çatdırılma qiyməti
  const total = totalPrice + deliveryCost;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row lg:gap-12">
        {/* Sol tərəf - məhsullar siyahısı */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Sizin Səbətiniz</h1>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={clearCart}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Səbəti təmizlə
            </Button>
          </div>

          {/* Məhsul siyahısı */}
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white rounded-lg shadow-sm"
              >
                <Link to={`/products/${item.id}`} className="sm:mr-4 mb-4 sm:mb-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </Link>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <Link to={`/products/${item.id}`} className="font-medium hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500 mb-2">{item.brand}</div>
                      
                      {/* Atomayzer-mi yoxsa tam şüşəmi */}
                      {item.hasAtomizer && item.volume !== item.atomizerVolume && (
                        <div className="text-xs text-gray-600 mb-2">
                          {item.volume === item.atomizerVolume 
                            ? `Mini Atomayzer ${item.atomizerVolume}ml` 
                            : `Tam Həcm ${item.volume}ml`}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 sm:mt-0 text-right">
                      <div className="font-bold text-primary">{item.price} ₼</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        className="px-2 py-1"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                      <button 
                        className="px-2 py-1"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link 
            to="/products" 
            className="inline-flex items-center mt-8 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Alış-verişə davam edin
          </Link>
        </div>
        
        {/* Sağ tərəf - xülasə */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-6">Sifariş Xülasəsi</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Məhsullar ({totalItems})</span>
                <span>{totalPrice.toFixed(2)} ₼</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Çatdırılma</span>
                <span>{deliveryCost.toFixed(2)} ₼</span>
              </div>
              <div className="border-t border-gray-200 my-4 pt-4 flex justify-between font-bold">
                <span>Ümumi</span>
                <span className="text-primary">{total.toFixed(2)} ₼</span>
              </div>
            </div>
            
            <Button variant="primary" className="w-full" onClick={() => alert('Sifarişiniz qeydə alındı!')}>
              Sifarişi tamamla
            </Button>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Sifarişi tamamlayaraq, <Link to="/terms" className="text-primary hover:underline">İstifadə şərtləri</Link> və <Link to="/privacy" className="text-primary hover:underline">Məxfilik siyasəti</Link> ilə razılaşmış olursunuz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 