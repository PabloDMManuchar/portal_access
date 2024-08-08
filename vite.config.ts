import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  define: {
    'process.env': {}
  },
  base: '/',
  publicDir: 'public',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['manifest.webmanifest'],
      manifest: {
        name: 'Mi Aplicación PWA',
        short_name: 'MiApp',
        description: 'Descripción de mi aplicación PWA',
        theme_color: '#ffffff'
      }
    })
  ],
});
