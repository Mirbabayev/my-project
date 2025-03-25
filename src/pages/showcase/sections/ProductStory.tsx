import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Award } from 'lucide-react';

type StoryProps = {
  story: {
    brandPhilosophy: string;
    perfumerInfo: {
      name: string;
      bio: string;
      image: string;
    };
    ingredientMap: {
      title: string;
      description: string;
      locations: Array<{
        name: string;
        position: { x: number; y: number };
        ingredient: string;
      }>;
      mapImage: string;
    };
  };
};

export const ProductStory: React.FC<StoryProps> = ({ story }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16"
    >
      <h2 className="text-3xl font-serif font-medium mb-16 text-center">Məhsulun Hekayəsi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        {/* Brand Philosophy */}
        <div>
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-amber-600" />
            Brendin Fəlsəfəsi
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">{story.brandPhilosophy}</p>
        </div>
        
        {/* Perfumer Info */}
        <div>
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 text-amber-600" />
            Parfümerin Profili
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={story.perfumerInfo.image} 
              alt={story.perfumerInfo.name} 
              className="w-32 h-32 object-cover rounded-full"
            />
            <div>
              <h4 className="font-medium text-lg mb-2">{story.perfumerInfo.name}</h4>
              <p className="text-gray-600 leading-relaxed">{story.perfumerInfo.bio}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ingredients Map */}
      <div className="mb-16">
        <h3 className="text-xl font-medium mb-6 flex items-center justify-center">
          <MapPin className="mr-2 h-5 w-5 text-amber-600" />
          {story.ingredientMap.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
          {story.ingredientMap.description}
        </p>
        
        <div className="relative">
          <img 
            src={story.ingredientMap.mapImage} 
            alt="İnqredient xəritəsi" 
            className="w-full h-auto rounded-lg"
          />
          
          {story.ingredientMap.locations.map((location, index) => (
            <div
              key={index}
              className="absolute w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
              style={{ 
                left: `${location.position.x}%`, 
                top: `${location.position.y}%` 
              }}
              title={`${location.name}: ${location.ingredient}`}
            >
              <span className="flex h-4 w-4 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-2 rounded text-xs min-w-max opacity-0 group-hover:opacity-100 transition-opacity">
                <strong>{location.name}</strong>: {location.ingredient}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductStory; 