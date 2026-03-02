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
      req.url = pathname + '.html' + url.slice(pathname.length);
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
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [cleanUrlsPlugin(), react(), mode === "development" && componentTagger()].filter(Boolean),
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        newlanding: path.resolve(__dirname, 'newlanding.html'),
        about: path.resolve(__dirname, 'about.html'),
        pricing: path.resolve(__dirname, 'pricing.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
        terms: path.resolve(__dirname, 'terms.html'),
        accessibility: path.resolve(__dirname, 'accessibility.html'),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
