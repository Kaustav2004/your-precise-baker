import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/", // Root-relative paths
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets", // Consistent directory name
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]", // Consistent path
        chunkFileNames: "assets/[name]-[hash].js", // Matches assetDir
        entryFileNames: "assets/[name]-[hash].js" // Matches assetDir
      }
    },
    // Enable if you need asset manifest
    // manifest: true
  }
}));