import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('@react-three/fiber')) return 'r3f-vendor';
          if (id.includes('@react-three/drei')) return 'drei-vendor';
          if (id.includes('/three/')) return 'three-core';
          if (id.includes('framer-motion')) return 'motion-vendor';
          if (id.includes('react-router')) return 'router-vendor';
          if (id.includes('zustand')) return 'store-vendor';
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('react')) return 'react-vendor';
          return 'vendor';
        },
      },
    },
  },
});