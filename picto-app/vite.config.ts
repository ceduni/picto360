import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  define: {
    APP_NAME: JSON.stringify("Picto 360"),
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
