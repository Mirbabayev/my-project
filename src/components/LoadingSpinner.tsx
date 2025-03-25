import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const colorClasses = {
    primary: 'text-indigo-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`
        animate-spin rounded-full 
        border-t-transparent border-solid border-4
        ${sizeClasses[size]} 
        ${colorClasses[color]}
      `}>
        <span className="sr-only">Yükleniyor...</span>
      </div>
    </div>
  );
}; 