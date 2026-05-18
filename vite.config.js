import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // IMPORTANT: Replace 'YOUR-REPO-NAME' with your exact GitHub repository name!
  // Example: if your repo is github.com/username/lata-yog, make this '/lata-yog/'
  // base: '/YOUR-REPO-NAME/', 
  base: '/V5GeminiYogguide/'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});