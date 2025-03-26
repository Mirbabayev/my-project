import React from 'react';
import { Hero } from '../components/Hero';
import { BrandSlider } from '../components/BrandSlider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBrands } from '../context/BrandContext';

export const Home = () => {
  const { brands, loading, error } = useBrands();

  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Brands Section */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16"
        >
          <div className="container mx-auto px-4">
            <BrandSlider brands={brands} />
          </div>
        </motion.div>
      )}
      
      {/* Showcase Page Link */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-md mx-auto my-12 text-center"
      >
        <Link 
          to="/showcase/perfume"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Ətir Tanıtım Nümunəsi
        </Link>
        <p className="mt-3 text-sm text-gray-500">
          Ən modern ətir təqdimat səhifəmizi ziyarət edin
        </p>
      </motion.div>
    </div>
  );
};

export default Home;