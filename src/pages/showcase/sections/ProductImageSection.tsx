import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

interface Image {
  id: number;
  src: string;
  alt: string;
  isZoomable?: boolean;
}

interface ProductImageSectionProps {
  images: Image[];
}

export const ProductImageSection: React.FC<ProductImageSectionProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openZoomModal = () => {
    if (images[currentImage].isZoomable) {
      setShowModal(true);
    }
  };

  const closeZoomModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      {/* Main image container */}
      <div className="relative overflow-hidden product-image-container aspect-square mb-6">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            className="w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        {/* Zoom button */}
        {images[currentImage].isZoomable && (
          <button
            onClick={openZoomModal}
            className="absolute bottom-4 right-4 p-2 bg-background-dark/70 backdrop-blur-sm border border-border rounded-sm hover:bg-background-light transition-colors"
            aria-label="Yaxından baxış"
          >
            <Maximize size={16} className="text-accent" />
          </button>
        )}
        
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-background-dark/70 backdrop-blur-sm border border-border rounded-sm hover:bg-background-light transition-colors"
          aria-label="Əvvəlki şəkil"
        >
          <ChevronLeft size={18} className="text-accent" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-background-dark/70 backdrop-blur-sm border border-border rounded-sm hover:bg-background-light transition-colors"
          aria-label="Sonrakı şəkil"
        >
          <ChevronRight size={18} className="text-accent" />
        </button>
        
        {/* Image indicator dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-sm transition-all ${
                currentImage === index 
                  ? 'bg-accent w-4' 
                  : 'bg-border hover:bg-border-light'
              }`}
              aria-label={`Şəkil ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`product-thumbnail ${currentImage === index ? 'active' : ''}`}
          >
            <img
              src={image.src}
              alt={`${image.alt} - thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Zoom modal - Full screen with luxury styling */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/95 backdrop-blur-sm"
          onClick={closeZoomModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full mx-4">
            <div 
              className="overflow-auto p-4 rounded-sm border border-border bg-background-dark/80"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentImage].src}
                alt={images[currentImage].alt}
                className="w-full h-auto"
              />
              <button
                onClick={closeZoomModal}
                className="absolute top-4 right-4 p-2 bg-background-dark/80 backdrop-blur-sm border border-border rounded-sm hover:bg-background-light transition-colors"
              >
                <X size={20} className="text-accent" />
              </button>
              
              {/* Modal Navigation */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="p-3 bg-background-dark/80 backdrop-blur-sm border border-border rounded-sm hover:bg-background-light pointer-events-auto transition-colors"
                >
                  <ChevronLeft size={24} className="text-accent" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="p-3 bg-background-dark/80 backdrop-blur-sm border border-border rounded-sm hover:bg-background-light pointer-events-auto transition-colors"
                >
                  <ChevronRight size={24} className="text-accent" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageSection; 