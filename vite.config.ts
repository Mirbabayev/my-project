import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // SPA uygulamaları için tüm rotaları index.html'e yönlendir
      "^/products/.*": {
        target: "http://localhost:5173",
        rewrite: () => '/index.html'
      }
    }
  },
});
