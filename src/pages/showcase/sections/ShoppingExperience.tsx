import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Truck, Clock, Tag, Copy, Check } from 'lucide-react';

interface Offer {
  discountCodes: {
    code: string;
    discount: string;
    description: string;
  }[];
  bundles: {
    id: number;
    name: string;
    items: string[];
    regularPrice: number;
    bundlePrice: number;
    image: string;
  }[];
  delivery: {
    express: {
      available: boolean;
      time: string;
      cost: number;
    };
    standard: {
      available: boolean;
      time: string;
      cost: number;
    };
    freeShippingThreshold: number;
  };
  guarantee: string;
}

interface ShoppingExperienceProps {
  offers: Offer;
}

export const ShoppingExperience: React.FC<ShoppingExperienceProps> = ({ offers }) => {
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };
  
  const handleSelectBundle = (id: number) => {
    setSelectedBundle(id === selectedBundle ? null : id);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 mt-8"
    >
      {/* Discount codes section */}
      {offers.discountCodes.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <Tag size={18} className="text-gray-600 mr-2" />
              <h3 className="font-medium">Endirim Kodları</h3>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              {offers.discountCodes.map((discount, index) => (
                <div 
                  key={index}
                  className="flex flex-wrap gap-3 items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <div className="font-medium">{discount.discount} endirim</div>
                    <div className="text-sm text-gray-600">{discount.description}</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-white border border-gray-200 px-3 py-1.5 text-sm font-medium rounded mr-2">
                      {discount.code}
                    </div>
                    <button 
                      onClick={() => handleCopyCode(discount.code)}
                      className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50"
                    >
                      {copiedCode === discount.code ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Bundle offers section */}
      {offers.bundles.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <Gift size={18} className="text-gray-600 mr-2" />
              <h3 className="font-medium">Bonus Paketlər</h3>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {offers.bundles.map((bundle) => (
                <div 
                  key={bundle.id}
                  className={`border rounded-md p-4 transition-all cursor-pointer ${
                    selectedBundle === bundle.id 
                      ? 'border-black bg-black/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectBundle(bundle.id)}
                >
                  <div className="flex flex-wrap gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                      <img 
                        src={bundle.image} 
                        alt={bundle.name} 
                        className="w-full h-full object-cover rounded" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium">{bundle.name}</div>
                      <ul className="mt-1 text-sm text-gray-600">
                        {bundle.items.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-2 flex items-baseline">
                        <span className="text-lg font-medium mr-2">
                          {bundle.bundlePrice.toFixed(2)}₼
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {bundle.regularPrice.toFixed(2)}₼
                        </span>
                        <span className="ml-2 text-xs text-red-500 font-medium">
                          {Math.round((1 - bundle.bundlePrice / bundle.regularPrice) * 100)}% endirim
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-auto">
                      <div className={`w-5 h-5 rounded-full border ${
                        selectedBundle === bundle.id 
                          ? 'border-black bg-black' 
                          : 'border-gray-300'
                      }`}>
                        {selectedBundle === bundle.id && (
                          <Check size={16} className="text-white m-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedBundle && (
              <div className="mt-4">
                <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                  Paketi səbətə əlavə et
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Delivery information */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Truck size={18} className="text-gray-600 mr-2" />
            <h3 className="font-medium">Çatdırılma</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {offers.delivery.express.available && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="flex items-start">
                  <Clock size={16} className="text-red-500 mt-0.5 mr-2" />
                  <div>
                    <div className="font-medium">Sürətli Çatdırılma</div>
                    <div className="text-sm text-gray-600">{offers.delivery.express.time}</div>
                  </div>
                </div>
                <div className="font-medium">
                  {offers.delivery.express.cost === 0 ? 'Pulsuz' : `${offers.delivery.express.cost.toFixed(2)}₼`}
                </div>
              </div>
            )}
            
            {offers.delivery.standard.available && (
              <div className="flex justify-between items-center py-2">
                <div className="flex items-start">
                  <Truck size={16} className="text-gray-600 mt-0.5 mr-2" />
                  <div>
                    <div className="font-medium">Standart Çatdırılma</div>
                    <div className="text-sm text-gray-600">{offers.delivery.standard.time}</div>
                  </div>
                </div>
                <div className="font-medium">
                  {offers.delivery.standard.cost === 0 ? 'Pulsuz' : `${offers.delivery.standard.cost.toFixed(2)}₼`}
                </div>
              </div>
            )}
          </div>
          
          {offers.delivery.freeShippingThreshold > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
              <p>
                {offers.delivery.freeShippingThreshold.toFixed(2)}₼ və daha yuxarı sifarişlərdə çatdırılma pulsuzdur.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Guarantee */}
      {offers.guarantee && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm border-l-4 border-black">
          <div className="font-medium mb-1">Zəmanət</div>
          <p>{offers.guarantee}</p>
        </div>
      )}
    </motion.div>
  );
}; 