import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react({})],
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
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none',
      'Cross-Origin-Embedder-Policy': 'unsafe-none', // Also good to add this one
    },    
    host: true, // Enables LAN access
    port: 3000, // Default port
    open: true, // Automatically opens the browser
    hmr: {
      overlay: false, // Avoid HMR overlay issues on slower systems
    },
  },
  build: {
    sourcemap: false, // Disable sourcemaps for production
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    cssCodeSplit: true, // Enable CSS code splitting
  },
  cacheDir: ".vite-cache", // Cache directory for faster rebuilds
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle frequently used dependencies
    exclude: ["@babel/runtime"], // Exclude heavy dependencies if not required
  },
});
