import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from "node:path";
import { buildSync } from "esbuild";

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-plugin',
      apply: 'build',
      enforce: 'post',
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), "service-worker.js")],
          outfile: join(process.cwd(), "dist", "service-worker.js"),
        });
      },
    }
  ],
  define: {
    'self.__BASE_URL__': JSON.stringify(process.env.REACT_APP_BASE_URL || '/')
  }
});