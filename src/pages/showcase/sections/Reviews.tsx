import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Play, User, VerifiedIcon } from 'lucide-react';

interface Review {
  id: number;
  user: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  rating: number;
  date: string;
  content: string;
  images?: string[];
  video?: string;
  pros?: string[];
  cons?: string[];
  helpful: number;
  isExpert?: boolean;
}

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showVideoModal, setShowVideoModal] = useState<string | null>(null);
  
  const expertReviews = reviews.filter(review => review.isExpert);
  const userReviews = reviews.filter(review => !review.isExpert);
  
  const filteredReviews = activeFilter === 'all' 
    ? reviews 
    : activeFilter === 'expert' 
      ? expertReviews 
      : userReviews;
  
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => Math.floor(review.rating) === rating).length,
    percentage: (reviews.filter(review => Math.floor(review.rating) === rating).length / reviews.length) * 100
  }));
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };
  
  return (
    <section>
      <h2 className="text-2xl font-light mb-8">İstifadəçi Rəyləri</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <div className="text-5xl font-light">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center my-2">
              {renderStars(averageRating)}
            </div>
            <div className="text-sm text-gray-500">{reviews.length} rəy əsasında</div>
          </div>
          
          <div className="space-y-2">
            {ratingCounts.map((item) => (
              <div key={item.rating} className="flex items-center">
                <div className="w-12 text-sm">{item.rating} ulduz</div>
                <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="w-8 text-xs text-right text-gray-500">{item.count}</div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 border border-black text-sm hover:bg-black hover:text-white transition-colors">
            Rəy yazın
          </button>
        </div>
        
        {/* Reviews list */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex mb-6 border-b">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === 'all' 
                  ? 'border-b-2 border-black' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Bütün rəylər
            </button>
            <button 
              onClick={() => setActiveFilter('expert')}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === 'expert' 
                  ? 'border-b-2 border-black' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Ekspert rəyləri
            </button>
            <button 
              onClick={() => setActiveFilter('user')}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === 'user' 
                  ? 'border-b-2 border-black' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              İstifadəçi rəyləri
            </button>
          </div>
          
          {/* Reviews */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b pb-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    {review.user.avatar ? (
                      <img 
                        src={review.user.avatar} 
                        alt={review.user.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={16} />
                      </div>
                    )}
                    
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{review.user.name}</span>
                        {review.user.verified && (
                          <VerifiedIcon size={14} className="text-blue-500" />
                        )}
                        {review.isExpert && (
                          <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded">
                            Ekspert
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">{review.content}</p>
                </div>
                
                {/* Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`Rəy şəkli ${index + 1}`}
                        className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-90"
                      />
                    ))}
                  </div>
                )}
                
                {/* Video */}
                {review.video && (
                  <div className="mb-3">
                    <div 
                      className="relative w-full h-48 bg-gray-100 rounded overflow-hidden cursor-pointer"
                      onClick={() => setShowVideoModal(review.video)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-black/70 flex items-center justify-center text-white">
                          <Play size={24} fill="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Pros & Cons */}
                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-2 gap-4 my-3">
                    {review.pros && (
                      <div>
                        <span className="text-sm font-medium text-green-600">Üstünlükləri</span>
                        <ul className="mt-1 text-sm">
                          {review.pros.map((pro, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1 text-green-600">+</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {review.cons && (
                      <div>
                        <span className="text-sm font-medium text-red-600">Çatışmazlıqları</span>
                        <ul className="mt-1 text-sm">
                          {review.cons.map((con, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1 text-red-600">-</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center mt-3">
                  <button className="flex items-center text-xs text-gray-500 hover:text-gray-800">
                    <ThumbsUp size={14} className="mr-1" />
                    Faydalı ({review.helpful})
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Video modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowVideoModal(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[80vh] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={showVideoModal}
              className="w-full h-full"
              title="Rəy videosu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setShowVideoModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}; 