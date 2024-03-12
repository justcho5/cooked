import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/recipes": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/api/generate": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
});
