import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'primary', children, className }: BadgeProps) => {
  const variants = {
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-accent/20 text-accent',
    success: 'bg-green-600/20 text-green-600',
    warning: 'bg-yellow-500/20 text-yellow-600',
    outline: 'bg-white border border-gray-200 text-gray-700'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};