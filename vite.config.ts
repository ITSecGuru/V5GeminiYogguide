import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const deployDate = process.env.VITE_DEPLOY_DATE || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });

export default defineConfig({
  plugins: [react()],
  base: '/V5GeminiYogguide/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __DEPLOY_DATE__: JSON.stringify(deployDate)
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js'
  }
});
