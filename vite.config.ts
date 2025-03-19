import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.includes('/products/') && !req.url.includes('.')) {
            req.url = '/';
          }
          next();
        });
      }
    }
  ],
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
