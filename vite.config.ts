import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Keep React and its closely related runtime (scheduler, hooks shims, jsx-runtime)
        // together in a single chunk to avoid circular import/runtime ordering issues
        // that can lead to hooks (like useState) being undefined at module init.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // put all react packages and scheduler/shims in the same chunk
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('scheduler') ||
              id.includes('use-sync-external-store') ||
              id.includes('use-sync-external-store-shim') ||
              id.includes('react/jsx-runtime') ||
              id.includes('react/jsx-dev-runtime') ||
              // Also co-locate known React-using libraries so they don't run before React
              id.includes('wouter') ||
              id.includes('@floating-ui') ||
              id.includes('floating-ui') ||
              id.includes('clsx') ||
              id.includes('tiny-invariant') ||
              id.includes('tiny-warning') ||
              id.includes('popper') ||
              id.includes('@popperjs') ||
              id.includes('use-subscription')
            )
              return 'vendor-react';

            if (id.includes('@tanstack')) return 'vendor-query';
            if (id.includes('@radix-ui') || id.includes('lucide-react')) return 'vendor-ui';
            if (id.includes('recharts') || id.includes('framer-motion')) return 'vendor-charts';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
