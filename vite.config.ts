import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Vite plugin to rewrite clean URLs → .html files
function cleanUrlsPlugin(): any {
  return {
    name: 'clean-urls',
    configureServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        const url = req.url || '';
        const pathname = url.split('?')[0].split('#')[0];
        // If path has no extension and isn't root, try .html
        if (pathname !== '/' && !pathname.includes('.') && !pathname.startsWith('/@') && !pathname.startsWith('/src') && !pathname.startsWith('/node_modules')) {
          req.url = pathname + '.html' + url.slice(pathname.length);
        }
        next();
      });
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
