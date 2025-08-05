import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:8000', // phải là TÊN service trong docker-compose
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-prod', // ✅ Tên thư mục output của bản build
    rollupOptions: {
      input: {
        // ✅ Entry point của bản build sẽ là file main-prod-preview.jsx
        main: path.resolve(__dirname, 'src/main-prod-preview.jsx'),
      },
    },
  },
});