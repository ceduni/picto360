import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";


export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // loads .env.{mode}
  const enableAdmin = env.VITE_ENABLE_ADMIN === "true";
  const enableBeta = env.VITE_ENABLE_BETA === "true";

  return defineConfig({
    plugins: [react({})],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@ui": path.resolve(__dirname, "./src/components/ui"),
        "@css": path.resolve(__dirname, "./src/components/css"),
      },
    },
    define: {
      APP_NAME: JSON.stringify("Picto 360"),
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      __DEV__: process.env.NODE_ENV !== "production",
      __ENABLE_ADMIN__: JSON.stringify(enableAdmin),
      __ENABLE_BETA__: JSON.stringify(enableBeta),
    },
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "unsafe-none",
        "Cross-Origin-Embedder-Policy": "unsafe-none",
      },
      host: true,
      port: 3000,
      open: true,
      hmr: { overlay: false },
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
    },
    cacheDir: ".vite-cache",
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["@babel/runtime"],
    },
  });
};
