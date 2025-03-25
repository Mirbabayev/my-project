import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-100">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Səhifə tapılmadı</h2>
        <p className="text-gray-600 mb-6">
          Axtardığınız səhifə mövcud deyil və ya başqa bir ünvana köçürülüb.
        </p>
        <Link 
          to="/" 
          className="easyperfume-btn inline-block"
        >
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}; 