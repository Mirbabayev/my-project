import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Chanel N°5",
    subtitle: "Əfsanəvi ətir, müasir qadının seçimi",
    description: "Dünyaca məşhur Chanel N°5 ətri ilə özünüzü xüsusi hiss edin",
    price: 299.99,
    oldPrice: 399.99,
    image: "",  // Şəkil yolu boşdur
    cta: "İndi Al",
    badge: "Ən Çox Satan",
    link: "/products/1"
  }
];

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroHeight = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);
  
  // Hero elementinin hündürlüyünü müəyyən etmək
  useEffect(() => {
    if (heroRef.current) {
      heroHeight.current = heroRef.current.offsetHeight;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer Motion variants
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Müəyyən scroll məsafəsindən sonra parallax effekti dayandırmaq
  const maxScrollForEffect = heroHeight.current * 0.7; // Hero hündürlüyünün 70%-i qədər scroll
  const isScrollPastEffect = scrollY > maxScrollForEffect;
  
  // Parallax effektini hesablamaq
  const calculateParallax = () => {
    if (isScrollPastEffect) {
      return maxScrollForEffect * 0.3; // Maksimum hərəkət limitini tətbiq et
    }
    return scrollY * 0.3;
  };

  // Kontentin parallax effektini hesablamaq
  const calculateContentParallax = () => {
    if (isScrollPastEffect) {
      return maxScrollForEffect * -0.15; // Kontentin maksimum hərəkəti
    }
    return scrollY * -0.15;
  };

  return (
    <section ref={heroRef} className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      
      {/* Background Gradient instead of Image */}
      <div 
        className="absolute inset-0 w-full h-[120vh]"
        style={{ 
          transform: `translateY(${calculateParallax()}px)`
        }}
      >
        <div 
          className="absolute inset-0 transition-opacity duration-1500 ease-out opacity-100"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            backgroundSize: 'cover',  
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${1 + Math.min(scrollY, maxScrollForEffect) * 0.0005})`,
            transition: 'transform 0.5s ease-out',
            width: '100%',
            height: '120%'
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-20" />

      {/* Content with enhanced parallax */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 flex items-center z-30">
        <motion.div 
          className="max-w-xl text-white"
          style={{ transform: `translateY(${calculateContentParallax()}px)` }}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-block bg-primary px-4 py-1 rounded-sm text-sm font-medium mb-4 shadow-lg">
              {slides[0].badge}
            </span>
          </motion.div>

          {/* Title & Description */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
            variants={itemVariants}
          >
            {slides[0].title}
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl mb-2 text-gray-200 font-medium"
            variants={itemVariants}
          >
            {slides[0].subtitle}
          </motion.h2>
          
          <motion.div 
            className="w-20 h-1 bg-primary mb-4"
            variants={itemVariants}
          ></motion.div>
          
          <motion.p 
            className="text-base md:text-lg mb-6 text-gray-300 max-w-xl"
            variants={itemVariants}
          >
            {slides[0].description}
          </motion.p>

          {/* Price */}
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <div className="flex items-baseline">
              <span className="text-3xl font-bold mr-3">{slides[0].price}₼</span>
              {slides[0].oldPrice && (
                <span className="text-xl text-gray-400 line-through">{slides[0].oldPrice}₼</span>
              )}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex gap-4"
            variants={itemVariants}
          >
            <Link 
              to={slides[0].link} 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-sm font-medium flex items-center transition-all hover:translate-y-[-3px] hover:shadow-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {slides[0].cta}
            </Link>
            <Link 
              to={`/products`} 
              className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3 rounded-sm font-medium transition-all hover:translate-y-[-3px]"
            >
              Bütün Məhsullar
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};