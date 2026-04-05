import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://www.cristiandrc.dev',
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: [path.resolve(__dirname, 'src/scss')],
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
    },
  },
});
