import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function vercelAiDevPlugin(): Plugin {
  return {
    name: 'vercel-ai-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/ai', async (req, res) => {
        try {
          const handlerModule = await server.ssrLoadModule('/api/ai.ts');
          await handlerModule.default(req, res);
        } catch (err: any) {
          console.error('Error en middleware local /api/ai:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'Internal Dev Server Error' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    vercelAiDevPlugin(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        id: '/',
        name: 'TrámiteFácil Hub',
        short_name: 'TrámiteFácil',
        description: 'Generador instantáneo de documentos y trámites legales, laborales e inmobiliarios.',
        theme_color: '#1d4ed8',
        background_color: '#f8fafc',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
