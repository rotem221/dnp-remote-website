import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Vite plugin to rewrite clean URLs → .html files
function cleanUrlsPlugin(): any {
  const middleware = (req: any, _res: any, next: any) => {
    const url = req.url || '';
    const pathname = url.split('?')[0].split('#')[0];
    if (pathname !== '/' && !pathname.includes('.') && !pathname.startsWith('/@') && !pathname.startsWith('/src') && !pathname.startsWith('/node_modules')) {
      // Rewrite /about → /about/index.html (directory-based clean URLs)
      req.url = pathname + '/index.html' + url.slice(pathname.length);
    }
    next();
  };
  return {
    name: 'clean-urls',
    configureServer(server: any) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
  plugins: [cleanUrlsPlugin(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
