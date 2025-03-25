import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Sinifleri birləşdirmək üçün utility funksiya
 * clsx və tailwind-merge istifadə edərək çağırışları birləşdirir
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}