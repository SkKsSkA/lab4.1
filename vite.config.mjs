import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API = 'http://localhost:8000';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // две HTML-страницы: вход/регистрация и личный кабинет
      input: {
        index: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html')
      }
    }
  },
  server: {
    port: 5173,
    // в режиме разработки запросы к бэкенду уходят на Node-сервер
    proxy: {
      '/api': API,
      '/login': API,
      '/register': API,
      '/logout': API
    }
  }
});
