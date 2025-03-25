import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Activity } from 'lucide-react';

interface Recommendation {
  ageGroup: {
    min: number;
    max: number | string;
    description: string;
  };
  occasions: {
    name: string;
    suitability: number;
  }[];
  seasons: {
    name: 'Qış' | 'Yaz' | 'Yay' | 'Payız';
    suitability: number;
  }[];
  daytime: {
    name: 'Səhər' | 'Gündüz' | 'Axşam' | 'Gecə';
    suitability: number;
  }[];
  personality: string[];
}

interface UserGuideProps {
  recommendations: Recommendation;
}

export const UserGuide: React.FC<UserGuideProps> = ({ recommendations }) => {
  const renderSuitabilityBar = (value: number) => {
    return (
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-black rounded-full" 
          style={{ width: `${value * 20}%` }}
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 rounded-lg p-6 mt-8"
    >
      <h2 className="text-xl font-light mb-6">Kimə və nə zaman uyğundur?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Group */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User size={18} className="text-gray-600" />
            <h3 className="font-medium">Yaş Qrupu</h3>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="relative h-8 mb-4">
              <div className="absolute inset-x-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 rounded-full"></div>
              
              {/* Age marker */}
              <div 
                className="absolute h-4 w-4 bg-black rounded-full top-1/2 transform -translate-y-1/2"
                style={{
                  left: `${Math.min(Math.max((recommendations.ageGroup.min - 15) * 1.4, 0), 100)}%`
                }}
              >
                <div className="absolute -top-6 text-xs transform -translate-x-1/2 whitespace-nowrap">
                  {recommendations.ageGroup.min}
                </div>
              </div>
              
              <div 
                className="absolute h-4 w-4 bg-black rounded-full top-1/2 transform -translate-y-1/2"
                style={{
                  left: typeof recommendations.ageGroup.max === 'number' ?
                    `${Math.min((recommendations.ageGroup.max - 15) * 1.4, 100)}%` : '100%'
                }}
              >
                <div className="absolute -top-6 text-xs transform -translate-x-1/2 whitespace-nowrap">
                  {recommendations.ageGroup.max}
                </div>
              </div>
              
              {/* Fill between markers */}
              <div 
                className="absolute h-1 bg-black top-1/2 transform -translate-y-1/2 rounded-full"
                style={{
                  left: `${Math.min(Math.max((recommendations.ageGroup.min - 15) * 1.4, 0), 100)}%`,
                  width: typeof recommendations.ageGroup.max === 'number' ?
                    `${Math.min((recommendations.ageGroup.max - recommendations.ageGroup.min) * 1.4, 100)}%` :
                    `${100 - Math.min(Math.max((recommendations.ageGroup.min - 15) * 1.4, 0), 100)}%`
                }}
              />
            </div>
            
            <p className="text-sm text-gray-600">{recommendations.ageGroup.description}</p>
          </div>
        </div>
        
        {/* Occasions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-gray-600" />
            <h3 className="font-medium">Nə zaman istifadə etməli?</h3>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <ul className="space-y-2">
              {recommendations.occasions.map((occasion, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm">{occasion.name}</span>
                  {renderSuitabilityBar(occasion.suitability)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Seasons */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Activity size={18} className="text-gray-600" />
            <h3 className="font-medium">Mövsüm Uyğunluğu</h3>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="grid grid-cols-4 gap-2">
              {recommendations.seasons.map((season, index) => (
                <div key={index} className="text-center">
                  <div 
                    className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-1
                      ${season.suitability >= 4 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {season.name.charAt(0)}
                  </div>
                  <span className="text-xs block">{season.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Day time */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock size={18} className="text-gray-600" />
            <h3 className="font-medium">Gün Zamanı</h3>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="space-y-3">
              {recommendations.daytime.map((time, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{time.name}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black rounded-full" 
                      style={{ width: `${time.suitability * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Personality types */}
      <div className="mt-6">
        <h3 className="font-medium mb-3">Ən uyğun gəldiyi şəxsiyyət tipləri</h3>
        <div className="flex flex-wrap gap-2">
          {recommendations.personality.map((type, index) => (
            <span 
              key={index}
              className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 