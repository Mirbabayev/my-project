import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-sans transition-all',
          'focus-visible:outline-none focus-visible:ring-1',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-gray-900 text-white hover:bg-black border-none': variant === 'primary',
            'border border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900': variant === 'outline',
            'hover:bg-gray-100 text-gray-600': variant === 'ghost',
            'bg-gray-100 text-gray-700 hover:bg-gray-200 border-none': variant === 'secondary',
            'h-9 px-4 text-xs tracking-wider uppercase': size === 'sm',
            'h-11 px-6 text-sm': size === 'md',
            'h-12 px-8 text-sm': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);