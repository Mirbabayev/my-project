import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { compression } from 'vite-plugin-compression2';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    compression({
      include: [/\.(js|css|html|svg|json|xml|txt|ttf|otf|eot|woff|woff2)$/],
      exclude: [/\.(png|jpe?g|webp|gif|tiff)$/],
      algorithm: 'gzip',
    }),
  ],
  
  // Daha yaxşı performans üçün modulları önbelləkdə saxla
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@tanstack/react-query',
      'lucide-react'
    ],
    exclude: [],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  
  // Build zamanı optimallaşdırma
  build: {
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react'],
          'utils': ['@tanstack/react-query']
        }
      }
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Server
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    proxy: {
      "^/products/.*": {
        target: "http://localhost:5173",
        rewrite: () => '/index.html'
      },
      "^/admin/.*": {
        target: "http://localhost:5173",
        rewrite: () => '/index.html'
      }
    },
    // Cache'ləmə və əlavə optimallaşdırma
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    }
  },
  
  // Əlavə optimallaşdırmalar
  css: {
    devSourcemap: false,
  },
  
  // Şəkil optimallaşdırması üçün
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.webp'],
});
