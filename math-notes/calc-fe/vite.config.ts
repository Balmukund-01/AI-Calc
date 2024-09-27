import path from "path";
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist', // Specify the output directory for your build
    rollupOptions: {
      // You can customize the Rollup configuration here if needed
    },
  },
});
