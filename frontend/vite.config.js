import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|tsx|js)$/,
    }),
  ],
  server: {
    port: 3000,
    open: false,
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  envPrefix: ['VITE_', 'REACT_APP_'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.jsx',
    css: false,
  },
});
