import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../context/BrandContext';

interface BrandSliderProps {
  brands: Brand[];
}

export const BrandSlider: React.FC<BrandSliderProps> = ({ brands }) => {
  // Limit to first 6 brands
  const limitedBrands = brands.slice(0, 6);
  
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  // Calculate dynamic width based on brand name length
  const getItemWidth = (brandName: string) => {
    // Base width + additional width per character
    const baseWidth = 70; // Increased base width
    const charWidth = 12; // Increased width per character
    // Give more space for longer names
    const width = baseWidth + (brandName.length * charWidth);
    return Math.max(width, 160); // Increased minimum width
  };
  
  // Clone elements for infinite effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || limitedBrands.length === 0) return;
    
    // Clear existing cloned items first (in case of rerenders)
    const existingItems = slider.querySelectorAll('.brand-item');
    if (existingItems.length > limitedBrands.length) {
      // Remove previously cloned items
      for (let i = limitedBrands.length; i < existingItems.length; i++) {
        existingItems[i].remove();
      }
    }
    
    // Get original items
    const items = Array.from(slider.children).slice(0, limitedBrands.length) as HTMLElement[];
    
    // Create and append clones
    items.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement;
      slider.appendChild(clone);
    });
    
    return () => {
      // Clean up clones when component unmounts
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [limitedBrands]);
  
  // Animation with requestAnimationFrame for smoother performance
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || limitedBrands.length === 0) return;
    
    let animationFrame: number;
    const SPEED = 0.5; // Pixels per frame
    
    // Calculate when to reset (when first set of items is completely off-screen)
    const itemWidth = slider.scrollWidth / (limitedBrands.length * 2);
    const resetPoint = itemWidth * limitedBrands.length;
    
    // Remove any transition to prevent jumps
    slider.style.transition = 'none';
    
    const animate = (timestamp: number) => {
      // Calculate time delta for smooth animation
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      // Only move if not hovered
      if (!isHovered) {
        // Continue moving from current position
        positionRef.current += SPEED * (deltaTime / 16);
        
        // When first set is completely off-screen, reset position
        if (positionRef.current >= resetPoint) {
          positionRef.current = 0;
        }
      }
      
      // Always update transform even when hovered (position doesn't change when hovered)
      slider.style.transform = `translateX(-${positionRef.current}px)`;
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrame = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      lastTimeRef.current = 0;
    };
  }, [isHovered, limitedBrands.length]);
  
  return (
    <div className="w-full overflow-hidden bg-white py-6">
      <div 
        className="relative mx-auto max-w-6xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fixed width container with horizontally scrolling content */}
        <div 
          ref={sliderRef}
          className="flex"
          style={{ willChange: 'transform' }} // Performance optimization
        >
          {limitedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="brand-item flex-shrink-0 px-2"
              style={{ width: `${getItemWidth(brand.name)}px` }}
            >
              <Link
                to={`/brands/${brand.id}`}
                className="block mx-1"
              >
                <div className="py-3 px-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-center text-2xl font-semibold text-gray-900 hover:text-primary whitespace-nowrap overflow-visible">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 